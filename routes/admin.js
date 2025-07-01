const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, addProduct, generateCodes } = require('../controllers/adminController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');

router.post('/register', registerAdmin); //For initial setup of admin account
router.post('/login', loginAdmin); //For admin login

// Admin-only routes to add product
router.post('/add-product', auth, upload.single('image'), addProduct); // Admin adds a product with an image upload

router.post('/generate-codes', auth, generateCodes); // Admin generates codes for a product

module.exports = router;