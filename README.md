# 🛒 E-commerce Backend API (Ongoing)

A modular and fully backend-focused E-commerce RESTful API built using **Node.js**, **Express.js**, and **MongoDB**.  
It includes JWT-based user authentication, product and order management, role-based access control, and full cart functionality.  
All endpoints are tested with Postman for reliability.

---

## 📘 Project Overview

This project serves as the **backend server** for an e-commerce platform. Developed following **MVC architecture** and REST principles, it enables robust features for both **users** and **administrators**.

### Core Functionalities:

- 👤 User Signup/Login (with JWT)
- 🔐 Role-based Access (Admin vs Customer)
- 🛍️ Product CRUD (Admin only)
- 🛒 Cart Operations (Add, Update, Remove items)
- 📦 Order Management
- 🧑‍💼 Admin-Only Controls

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment variables
- **cors**, **morgan** for middleware and logging

---

## 📁 Project Structure


---

## 🔗 API Endpoints

### 🧑‍💻 Auth Routes

| Method | Endpoint             | Description           |
|--------|----------------------|-----------------------|
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login`    | Log in with credentials |

---

### 🛍️ Product Routes

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/api/products`       | Get all products             |
| GET    | `/api/products/:id`   | Get product by ID            |
| POST   | `/api/products`       | Add new product *(admin)*    |
| PUT    | `/api/products/:id`   | Update product *(admin)*     |
| DELETE | `/api/products/:id`  | Delete product *(admin)*     |

---

### 🛒 Cart Routes

| Method | Endpoint               | Description                        |
|--------|------------------------|------------------------------------|
| POST   | `/api/cart`            | Add product to user's cart         |
| GET    | `/api/cart`            | View current user's cart           |
| PUT    | `/api/cart/:itemId`    | Update quantity of cart item       |
| DELETE | `/api/cart/:itemId`    | Remove item from cart              |

---

### 📦 Order Routes

| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| POST   | `/api/orders`           | Place a new order *(from cart)*      |
| GET    | `/api/orders`           | View logged-in user's orders         |
| GET    | `/api/admin/orders`     | View all orders *(admin only)*       |

---

### 🔐 Admin Routes

| Method | Endpoint                | Description                    |
|--------|-------------------------|--------------------------------|
| GET    | `/api/admin/users`      | View all registered users      |
| GET    | `/api/admin/orders`     | View all orders                |
| GET    | `/api/admin/products`   | View all products              |

---

## 🧪 API Testing with Postman

All routes have been tested using Postman.  
Use **Bearer Token** for authentication on protected routes:

```http
Authorization: Bearer <your_token_here>
