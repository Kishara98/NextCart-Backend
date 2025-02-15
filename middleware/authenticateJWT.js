const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Access Denied: No Token Provided' });
    }

    const token = authHeader.split(' ') [1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or Expired Token' });
        }
        req.user = decoded; // Attach user data to request object
        next();
    })

}

module.exports = authenticateJWT;