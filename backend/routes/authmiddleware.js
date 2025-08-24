const jwt = require('jsonwebtoken');

// Middleware สำหรับยืนยัน JWT Token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // ดึง Token จาก Header แบบ "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }

        // ใส่ userId ที่ถูก decode ลงใน req
        req.userId = decoded.userId;
        next();
    });
};

module.exports = authenticateToken;