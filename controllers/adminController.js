const User = require('../models/User');
const Product = require('../models/Product');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); 
const Code = require('../models/Code');

// Register a new admin
exports.registerAdmin = async (req, res) => {
    try{
        const { username, password } = req.body;

        // Check if admin already exists
        let admin = await User.findOne({ username });  

        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin user
        admin = new User({
            username,
            password: hashedPassword,
            role: 'admin'
        });
        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    }
    catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Login admin
exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the admin user
        const admin = await User.findOne({ username, role: 'admin' });
        if (!admin || admin.role !== 'admin') {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Login successful' });
    }
    catch (error) {
        console.error('Error logging in admin:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, batchSize, mrp } = req.body;
        const image = req.file ? req.file.path : null; // Assuming image is uploaded via multer

        // Create a new product
        const product = new Product({
            name,
            batchSize,
            mrp,
            image
        });

        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    }
    catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Generate codes for a product
exports.generateCodes = async (req, res) => {
    try {
        const { productId, batchNumber} = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const codes = [];
        for (let i = 0; i < product.batchSize; i++) {
            const newCode = new Code({
                productId,
                batchNumber,
                code: uuidv4(), // Generate a unique code
            });

            await newCode.save();
            codes.push(newCode.code); // Store the generated code
        }

        res.status(201).json({ message: `${codes.length} codes generated for product ${product.name}`, codes });
    }
    catch (error) {
        console.error('Error generating codes:', error);
        res.status(500).json({ message: 'Server error' });
    }
}