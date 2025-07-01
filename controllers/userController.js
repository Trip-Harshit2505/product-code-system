const User = require('../models/User');
const Product = require('../models/Product');
const Code = require('../models/Code');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if user already exists
        let user = await User.find({ username });
        if (user.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        user = new User({
            username,
            password: hashedPassword,
            role: 'user'
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user
        const user = await User.findOne({ username, role: 'user' });
        if (!user || user.role !== 'user') {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        } 

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Login successful' });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Search products by Code
exports.searchByCode = async (req, res) => {
    try {
        const { code } = req.query;

        // Find the code in the database
        const foundCode = await Code.findOne({ code }).populate('productId');
        if (!foundCode) {
            return res.status(404).json({ message: 'Code not found' });
        }

        // Check if the code is expired
        const currentDate = new Date();
        if (foundCode.expiryDate && foundCode.expiryDate < currentDate) {
            return res.status(400).json({ message: 'Code has expired' });
        }

        // Find the product associated with the code
        const product = await Product.findById(foundCode.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }   

        res.status(200).json({ message: 'Product found',
            productName: product.name,
            batchNumber: foundCode.batchNumber,
            code: foundCode.code,
            image: `http://localhost:5000/uploads/${product.image}` // image path
         });
    }
    catch (error) {
        console.error('Error searching by code:', error);
        res.status(500).json({ message: 'Server error' });
    }
}