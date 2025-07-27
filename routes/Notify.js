    // routes/emailRouter.js
    const express = require("express");
    const nodemailer = require('nodemailer');

    const router = express.Router();

    router.post('/', async (req, res) => {
    const { name, phone, email, category, now, userEmail } = req.body;

    console.log(req.body);

    if (!name || !phone || !email || !category || !now || !userEmail) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Format date to DD/MM/YYYY
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const requestDate = formatDate(now);

    try {
        const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        });

        const subject = `New Service Request from ${name}`;
        const htmlBody = `
        <p>Dear Service Provider,</p>

        <p>We are pleased to inform you of a new service request that matches your expertise on <strong>Aapna Network</strong>. Please find the details below:</p>

        <h3>Client Information:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Service Category:</strong> ${category}</p>
        <p><strong>Requested Date:</strong> ${requestDate}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Email Address:</strong> ${userEmail}</p>

        <p>We recommend reaching out to the client as soon as possible to confirm availability and discuss further requirements.</p>

        <p>If you have any questions or face any issues, feel free to get in touch with us.</p>

        <p>Thank you for being part of <strong>Aapna Network</strong> – Empowering Rural Talent.</p>

        <p>
            <strong>Aapna Network</strong><br />
            🌐 <a href="https://www.aapnanetwork.in">www.aapnanetwork.in</a><br />
            📧 support@aapnanetwork.in<br />
            📞 +91-XXXXXXXXXX
        </p>

        <p><em>This is an automated message. Please do not reply to this email directly.</em></p>

        <p style="font-size: 0.9em;">© Aapna Network. All rights reserved.</p>
        `;

        await transporter.sendMail({
        from: `"Aapna Network" <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        html: htmlBody,
        });

        return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email send error:', error);
        return res.status(500).json({ success: false, message: 'Email sending failed' });
    }
    });

    module.exports = router;
