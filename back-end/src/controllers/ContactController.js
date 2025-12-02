/**
 * ContactController
 * 
 * Handles contact form submissions from the website.
 */

const asyncHandler = require("express-async-handler");
const { getPool, sql } = require("../config/database");
const { isValidEmail, sanitizeString } = require("../utils/validators");

// Handle contact form submission
const submitContactForm = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required: name, email, subject, and message." });
    }

    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid email address." });
    }

    // Validate field lengths
    if (name.trim().length < 2 || name.trim().length > 100) {
        return res.status(400).json({ message: "Name must be between 2 and 100 characters." });
    }

    if (subject.trim().length < 5 || subject.trim().length > 200) {
        return res.status(400).json({ message: "Subject must be between 5 and 200 characters." });
    }

    if (message.trim().length < 20) {
        return res.status(400).json({ message: "Message must be at least 20 characters long." });
    }

    try {
        const pool = getPool();

        // Insert contact form as a support ticket with 'open' status
        await pool.request()
            .input("subject", sql.NVarChar, sanitizeString(subject))
            .input("message", sql.NVarChar, `Contact Form Submission\n\nName: ${sanitizeString(name)}\nEmail: ${sanitizeString(email)}\n\nMessage:\n${sanitizeString(message)}`)
            .input("userID", sql.Int, 1) // Default 1 for now
            .query(`
                INSERT INTO Support_Ticket (UserID, [Subject], [Message], [Status], Priority)
                VALUES (@userID, @subject, @message, 'open', 'medium')
            `);

        res.status(201).json({
            message: "Thank you for contacting us! We will get back to you soon."
        });

    } catch (error) {
        console.error("Unexpected error occurred when submitting contact form: ", error);
        res.status(500).json({ message: "An unexpected error occurred while submitting your message. Please try again later." });
    }
});

module.exports = { submitContactForm };