const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1]; // Extract token from Authorization header
    // Authorization header should be in the format "Bearer <token>"
    
    // Check if token is provided
    if(!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;

// This middleware checks for a JWT token in the request headers, verifies it, and attaches the user information to the request object if valid. If the token is missing or invalid, it responds with an error message. This is useful for protecting routes that require authentication.