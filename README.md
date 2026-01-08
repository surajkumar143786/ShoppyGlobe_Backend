# ShoppyGlobe_Backend
Backend APIs for ShoppyGlobe E-commerce App

# ShoppyGlobe Backend

This repository contains the backend implementation of the ShoppyGlobe e-commerce application.

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication

## 📦 Features
- User Registration & Login
- JWT Authentication
- Product Management APIs
- Cart Management APIs

## 🚀 API Endpoints

### Authentication
- POST /api/register
- POST /api/login

### Products
- POST /api/products
- GET /api/products
- GET /api/products/:id

### Cart (Protected Routes)
- POST /api/cart
- GET /api/cart
- PUT /api/cart/:productId
- DELETE /api/cart/:productId

## 🔐 Authentication
All cart APIs are protected using JWT.
Token must be passed in headers as:

Authorization: Bearer <JWT_TOKEN>

## 🧪 API Testing
All APIs were tested using Thunder Client.
Screenshots of all API testing are available in the `screenshots` folder.

## ▶️ How to Run Project

1. Clone repository
2. Install dependencies
   npm install
3. Create .env file
4. Run server
   npm start

## 📸 Screenshots
Please refer to the `screenshots` folder for API testing proof.

