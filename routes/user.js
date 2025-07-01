const express = require('express');
const router = express.Router();
const { registerUser, loginUser, searchByCode } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', registerUser); // User registration
router.post('/login', loginUser); // User login
router.get('/search', auth, searchByCode); // Search for product by code (protected route)


module.exports = router;

// This code defines the user routes for registration, login, and searching for products by code.