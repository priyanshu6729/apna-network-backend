const express = require("express");
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, phone, subject, message, serviceType, companyEmail } = req.body;

    console.log("Received contact form submission:", req.body);

    // --- Input Validation ---
    if (!name || !email || !subject || !message || !companyEmail || !serviceType) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields: name, email, subject, message, and companyEmail are required.'
        });
    }

    try {
        // --- Nodemailer Transport Configuration ---
        // Configure the email transport using Gmail service.
        // Credentials should be stored securely in environment variables.
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        // --- Email Content ---
        const emailSubject = `New Contact Form Submission: ${subject}`;

        // Create a well-formatted HTML body for the email.
        const htmlBody = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>${serviceType}</h2>
                <p>You have received a new message from your website's contact form.</p>
                <hr>
                <h3>Sender's Details:</h3>
                <ul>
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
                    ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
                </ul>
                <h3>Message:</h3>
                <p style="padding: 10px; border-left: 4px solid #ccc; background-color: #f9f9f9;">
                    ${message.replace(/\n/g, '<br>')}
                </p>
                <hr>
                <p style="font-size: 0.9em; color: #555;">
                    This email was sent from the contact form on your website. You can reply directly to the sender's email address.
                </p>
            </div>
        `;

        // --- Mail Options ---
        
        await transporter.sendMail({
            from: `Swabhiman Foundation <${process.env.EMAIL_USER}>`,
            to: companyEmail, 
            replyTo: email, 
            subject: emailSubject,
            html: htmlBody,
        });

        // --- Success Response ---
        return res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });

    } catch (error) {
        // --- Error Handling ---
        console.error('Error sending contact form email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send the message. Please try again later.' });
    }
});

module.exports = router;
