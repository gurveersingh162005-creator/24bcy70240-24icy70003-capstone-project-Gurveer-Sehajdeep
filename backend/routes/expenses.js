const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const authMiddleware = require('../middleware/auth');

// All routes below require login
router.use(authMiddleware);

// GET /api/expenses — get all expenses for logged-in user
router.get('/', async (req, res) => {
  try {
    const { type, category, month } = req.query;
    let filter = { user: req.user.userId };

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (month) {
      const start = new Date(month + '-01');
      const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
      filter.date = { $gte: start, $lte: end };
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/expenses/summary — totals and category breakdown
router.get('/summary', async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.userId });

    const totalIncome = expenses
      .filter(e => e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0);

    const totalExpense = expenses
      .filter(e => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);

    // Category breakdown for expenses only
    const categoryBreakdown = {};
    expenses
      .filter(e => e.type === 'expense')
      .forEach(e => {
        categoryBreakdown[e.category] = (categoryBreakdown[e.category] || 0) + e.amount;
      });

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      categoryBreakdown
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/expenses — add new expense/income
router.post('/', async (req, res) => {
  try {
    const { title, amount, type, category, note, date } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({ message: 'Title, amount, type, and category are required' });
    }
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    const expense = new Expense({
      user: req.user.userId,
      title, amount, type, category,
      note: note || '',
      date: date || Date.now()
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/expenses/:id — update an expense
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user.userId });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { title, amount, type, category, note, date } = req.body;
    if (title) expense.title = title;
    if (amount) expense.amount = amount;
    if (type) expense.type = type;
    if (category) expense.category = category;
    if (note !== undefined) expense.note = note;
    if (date) expense.date = date;

    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/expenses/:id — delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
