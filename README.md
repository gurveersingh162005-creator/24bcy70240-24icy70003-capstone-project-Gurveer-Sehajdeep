#  Expense Tracker

A full-stack Expense Tracker web application that allows users to manage their income and expenses, track financial activity, and maintain balance efficiently.

🔗 **Live App:** https://capstone-project-fs.vercel.app/

---

##  Project Overview

This project was developed as part of a capstone project. It provides a complete solution for tracking personal finances with secure authentication and real-time data handling.

---

##  Features

* User Authentication (Register & Login)
* Add, edit, and delete transactions
* Track income and expenses separately
* Real-time balance calculation
* Persistent data storage using database
* Responsive and clean UI

---

##  Tech Stack

**Frontend:**

* HTML
* CSS
* JavaScript

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB

**Deployment:**

* Vercel

---

##  Project Structure

```bash id="4v6t7n"
.
├── frontend/
├── backend/
│   ├── routes/
│   ├── models/
│   └── server.js
├── public/
├── package.json
└── README.md
```

---

##  How to Run Locally

1. Clone the repository
   
2. Navigate into the project folder:

```bash id="fj8odt"
cd 24bcy70240-24icy70003-capstone-project-Gurveer-Sehajdeep
```

3. Install dependencies:

```bash id="0qvxaf"
npm install
```

4. Set up environment variables:
   Create a `.env` file and add:

```env id="8rnhxj"
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

5. Run the server:

```bash id="l2t3rs"
npm start
```

6. Open in browser:

```id="rztqlf"
http://localhost:5000
```

---

##  Environment Variables

* `MONGO_URI` → MongoDB connection string
* `PORT` → Server port

---

##  Future Improvements

* Data visualization (charts & analytics)
* Export reports (PDF/Excel)
* Advanced filtering & search
* Mobile app version

---

##  Authors

* Gurveer Singh
* Sehajdeep
