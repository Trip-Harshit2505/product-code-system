# 🛠️ Product Code Management System (Node.js + Express)

## 📌 Objective
Backend system to manage product catalog and generate unique product codes for tracking.

---

## 🧪 Technologies Used
- Node.js (LTS)
- Express.js
- MongoDB (via Mongoose)
- JWT (for authentication)
- Multer (image uploads)
- UUID (code generation)

---

## 👤 Roles

### 👨‍💼 Admin
- Register/Login
- Add Product (name, batchSize, MRP, image)
- Generate UUID codes for a batch

### 👥 General User
- Register/Login
- Search for product info using UUID code

---

## 🗂️ Folder Structure

product-code-system/
├── routes/
│ ├── admin.js
│ └── user.js
├── controllers/
│ ├── adminController.js
│ └── userController.js
├── models/
│ ├── Product.js
│ ├── Code.js
│ └── User.js
├── middleware/
│ ├── auth.js
│ └── upload.js
├── uploads/
├── app.js
├── .env
├── README.md
└── package.json


---

## ⚙️ Setup Instructions

### 📥 Clone & Install

```bash
git clone <your-repo-url>
cd product-code-system
npm install
```

### 🔧 Set Environment Variables in .env

```bash
PORT=YOUR_SERVER_PORT
MONGO_URI=YOUR_MONGODB_URL
JWT_SECRET=YOUR_JWT_SECRET
```
### 🚀 Start the Server

```bash
npm run dev
```
