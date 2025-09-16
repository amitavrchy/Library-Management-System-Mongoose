Library Management API

A simple Library Management System API built with Express, TypeScript, and MongoDB (Mongoose).
It allows managing books in a library (add, update, delete, search) and borrowing with proper availability checks.

Features:

Manage books (create, update, delete, fetch)

Borrow books with availability control

Auto-update availability when copies run out

Borrowed books summary using aggregation

Filtering, sorting, and pagination on book lists

Validation, middleware hooks, and error handling with Mongoose

API Overview:

Books

POST /api/books → Create a new book

GET /api/books → Get all books (filter, sort, limit)

GET /api/books/:bookId → Get a book by ID

PUT /api/books/:bookId → Update book details

DELETE /api/books/:bookId → Delete a book

Borrow

POST /api/borrow → Borrow a book (with copies check)

GET /api/borrow → Get borrowed books summary (aggregation)

Getting Started:

Clone the repo & install dependencies

Create a .env file with your MongoDB connection

Run the project with npm run dev

API runs at http://localhost:5000/api

Error Handling:

All errors follow a consistent format with success: false, a message, and error details.

Notes:

Responses strictly follow the given format

MongoDB must be running locally or on the cloud

This project demonstrates Express + TypeScript + MongoDB best practices
