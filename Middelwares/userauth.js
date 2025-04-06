const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET_KEY_USER;

function userauth(req, res, next) {
    try {
        // Correct way to get token
        const token  = req.header.token;

        if (!token) {
            return res.status(403).json({ message: "Access denied. No token provided." });
        }
        const response = jwt.verify(token, JWT_SECRET);
        req.userid = response.id;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token.", error: error.message });
    }
}

module.exports = userauth;  
