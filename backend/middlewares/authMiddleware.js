const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const SECRET_KEY = process.env.SECRET_KEY;

// JWT Authentication Middleware
const authMiddleware = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No token provided, authorization denied' });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Attach user to request
        req.user = await User.findById(decoded.id).select('-password'); // Exclude password from user info

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not found, authorization denied' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Auth Middleware Error:', error.message);
        return res.status(401).json({ success: false, message: 'Token is not valid', error: error.message });
    }
};

module.exports = authMiddleware;
