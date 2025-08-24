const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');


// POST: Register User
router.post('/register', async (req, res) => {
    const { full_name, birth_date, phone, email, password } = req.body;

    try {
        // ตรวจสอบว่าอีเมลซ้ำหรือไม่
        const existingUser = await User.findOne(email);
        if (existingUser) {
            return res.status(400).json({ error: 'อีเมลนี้ถูกใช้งานไปเเล้ว' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { full_name, birth_date, phone, email, password: hashedPassword };

        // ใช้ async/await กับ User.create
        const result = await User.create(userData);

        // ส่งข้อมูลกลับไปยัง Client
        res.status(201).json({
            message: 'ลงทะเบียนสำเร็จ!',
            userId: result.insertId
        });
    } catch (error) {
        console.error('❌ Register Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // ค้นหาผู้ใช้จากอีเมล
        const user = await User.findOne(email);
        if (!user) {
            return res.status(400).json({ error: 'อีเมลไม่ถูกต้อง' });
        }

        // ตรวจสอบรหัสผ่าน
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'รหัสผ่านไม่ถูกต้อง' });
        }

        // สร้าง JWT Token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, userId: user.id });
    } catch (error) {
        console.error('❌ Login Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




//-------------------------------------------------------------resetpassword---------------------------------------------------------------------------------------------------------------
// เก็บ PIN ชั่วคราวในหน่วยความจำ
let resetPins = {};

// ฟังก์ชันส่งอีเมล
const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // หรือใช้ SMTP Server อื่น
        auth: {
            user: process.env.EMAIL_USER, // อีเมลของคุณ
            pass: process.env.EMAIL_PASS, // รหัสผ่าน หรือ App Password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
};

// POST: Request Reset PIN
router.post('/request-reset', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const pin = crypto.randomInt(100000, 999999).toString(); // สร้าง PIN 6 หลัก
        resetPins[email] = { pin, timestamp: Date.now() };

        // ส่งอีเมล
        await sendEmail(
            email,
            'Your Password Reset PIN',
            `Your PIN for resetting your password is: ${pin}`
        );

        res.status(200).json({ message: 'PIN sent to your email' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST: Reset Password
router.post('/reset-password', async (req, res) => {
    const { email, pin, newPassword } = req.body;

    try {
        if (!resetPins[email] || resetPins[email].pin !== pin) {
            return res.status(400).json({ error: 'Invalid or expired PIN' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updatePassword(email, hashedPassword);

        delete resetPins[email]; // ลบ PIN หลังใช้งาน

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST: Verify PIN
router.post('/verify-pin', (req, res) => {
    const { email, pin } = req.body;

    try {
        // ตรวจสอบว่ามี PIN อยู่หรือไม่
        if (!resetPins[email]) {
            return res.status(404).json({ error: 'No reset request found for this email' });
        }

        // ตรวจสอบว่า PIN ตรงกันหรือไม่
        if (resetPins[email].pin !== pin) {
            return res.status(400).json({ error: 'Invalid PIN' });
        }

        // ตรวจสอบว่า PIN หมดอายุหรือยัง (สมมติว่า PIN หมดอายุใน 10 นาที)
        const PIN_EXPIRATION_TIME = 10 * 60 * 1000; // 10 นาที
        const isExpired = Date.now() - resetPins[email].timestamp > PIN_EXPIRATION_TIME;

        if (isExpired) {
            delete resetPins[email];
            return res.status(400).json({ error: 'PIN expired' });
        }

        // หาก PIN ถูกต้องและไม่หมดอายุ
        res.status(200).json({ message: 'PIN verified successfully' });
    } catch (error) {
        console.error('Error verifying PIN:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
