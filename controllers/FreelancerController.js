/**
 * This controller provides the following functionalities for a freelancer: registering, logging in, and logging out.
 * 
 * For storing the password, bcrypt is used to hash and jwt (jsonwebtoken) is used to sign a token and store it as cookie.
 * 
 * Freelancers create DIY content (videos/articles) for appliance repairs and are paid per content.
 * New freelancers start with isActive = 0 and Rate_Per_Content = 0, requiring admin approval.
 */

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// sql needed for the type definitions in .input
// getPool is to do queries
const { getPool, sql } = require("../config/database");

// Import validation utilities
const { isValidEmail, isValidPhone, isValidPassword, isValidName, sanitizeString } = require("../utils/validators");


// Handles the freelancer registering functionality
const registerFreelancer = asyncHandler(async (req, res) => {
    // Getting the needed data from the request body
    const { firstName, lastName, email, phone, password, content_type_specialty, portfolio_url} = req.body;

    // Checking if required fields are empty, if yes then we throw a 400
    if (!firstName || !lastName || !email || !phone || !password || !content_type_specialty) {
        return res.status(400).json({message: "Required fields are missing."});
    }

    // Validate first name format
    if (!isValidName(firstName)) {
        return res.status(400).json({message: "First name must be 2-30 characters and contain only letters."});
    }

    // Validate last name format
    if (!isValidName(lastName)) {
        return res.status(400).json({message: "Last name must be 2-30 characters and contain only letters."});
    }

    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({message: "Please enter a valid email address."});
    }

    // Validate phone format
    if (!isValidPhone(phone)) {
        return res.status(400).json({message: "Please enter a valid phone number."});
    }

    // Validate password strength
    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
        return res.status(400).json({message: passwordValidation.message});
    }

    // Validate content type specialty - must be either 'video' or 'article'
    if (!['video', 'article'].includes(content_type_specialty)) {
        return res.status(400).json({message: "Content type specialty must be either 'video' or 'article'."});
    }

    // Validate portfolio URL length if provided
    if (portfolio_url && portfolio_url.length > 255) {
        return res.status(400).json({message: "Portfolio URL cannot exceed 255 characters."});
    }

    try {
        const pool = getPool();

        // Hashing the password before storing
        const hashedPassword = await bcrypt.hash(password, 11);

        // By default no rate and freelancer unverified until admin approves and sets a rate.
        // Inserting the freelancer into the database Freelancer table
        const result = await pool.request()
            .input("firstName", sql.VarChar, sanitizeString(firstName))
            .input("lastName", sql.VarChar, sanitizeString(lastName))
            .input("email", sql.VarChar, sanitizeString(email).toLowerCase())
            .input("phone", sql.VarChar, sanitizeString(phone))
            .input("hashedPassword", sql.VarChar, hashedPassword)
            .input("contentTypeSpecialty", sql.VarChar, content_type_specialty)
            .input("portfolioUrl", sql.VarChar, portfolio_url ? sanitizeString(portfolio_url) : null)
            .query(`
            INSERT INTO Freelancer (First_Name, Last_Name, Email, Phone, Password_Hash, Content_Type_Specialty, Rate_Per_Content, Payment_Currency, Portfolio_URL, isActive)
            VALUES(@firstName, @lastName, @email, @phone, @hashedPassword, @contentTypeSpecialty, 0.00, 'USD', @portfolioUrl, 0)
            `);

        // Sending success message
        res.status(201).json({message: "Freelancer registered successfully! Please wait for admin approval."});
    } catch (error) {
        // Handling the unique constraints for email and phone numbers
        // 2627 is for violation of the unique key constraint, and 2601 is for unique index violation
        if (error.number === 2627 || error.number === 2601) {
            return res.status(409).json({message: "Another account exists already either with this email address or phone number. If you have another account, please use that one instead."});
        }

        // Throwing the console error and 500 status in case something goes wrong
        console.error("Unexpected error registering a new freelancer's account: ", error);
        res.status(500).json({message: "An unexpected error occurred while registering the freelancer."});
    }
});

// Handling the logging in functionality for freelancers
const loginFreelancer = asyncHandler(async (req,res) => {
    // Getting the email and password that the freelancer is trying to login with
    const {email, password} = req.body;

    // Input validation, if either empty then send 400 error
    if (!email || !password) {
        return res.status(400).json({message: "You have to enter both your email and your password"});
    }

    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({message: "Please enter a valid email address."});
    }

    try {
        const pool = getPool();

        // Searching in the database for a freelancer with the same email passed to check if exists
        const result = await pool.request()
            .input("email", sql.VarChar, sanitizeString(email).toLowerCase())
            .query(`
                SELECT Freelancer_ID, First_Name, Last_Name, Email, Password_Hash, isActive
                FROM Freelancer
                WHERE Email = @email
                `);

        // If no results returned from the query, then the email entered is invalid
        if (result.recordset.length === 0) {
            return res.status(401).json({message: "Invalid email address or password."});
        }

        // Now we are getting the first freelancer that we got having the same email address
        const freelancer = result.recordset[0];

        // Check if the freelancer account is active (approved by admin)
        if (!freelancer.isActive) {
            return res.status(403).json({message: "Your account is not activated yet. Please wait till you receive the approval/denial email to know if you can start working with us."});
        }

        // Using bcrypt to check if the password passed is the same as the hashed one stored in the database
        // If no, throw a 401 error
        const isPasswordValid = await bcrypt.compare(password, freelancer.Password_Hash);
        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid email address or password."});
        }

        // If the password matches, then create a freelancer token using jwt by signing it with the FREELANCER_ACCESS_TOKEN
        // stored in the .env file. The token expires in 1 day.
        const freelancerToken = jwt.sign({
            id: freelancer.Freelancer_ID,
            firstName: freelancer.First_Name,
            lastName: freelancer.Last_Name,
            email: freelancer.Email
        },
            process.env.FREELANCER_ACCESS_TOKEN,
            {expiresIn: "1d"}
        );

        // If a cookie exists already for the freelancer, clear it
        if (req.cookies.freelancer_access_token) {
            res.clearCookie('freelancer_access_token');
        }

        // Store the new cookie such that it lasts 1 day, and throw a 200 success message with some data about the freelancer
        // (id, firstName, lastName, email)
        res.cookie('freelancer_access_token', freelancerToken, 
            {httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000});
        res.status(200).json({
            message: "Successfully logged in.",
            freelancer: {
                id: freelancer.Freelancer_ID,
                firstName: freelancer.First_Name,
                lastName: freelancer.Last_Name,
                email: freelancer.Email
            }
        })

        // If anything goes wrong, throw an error
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({message: "An error occurred during login."});
    }
});

// Logging out functionality by clearing the freelancer's cookie and sending a success message
const logoutFreelancer = asyncHandler(async (req, res) => {
    res.clearCookie('freelancer_access_token');
    res.status(200).json({message: "Successfully logged out."});
})

module.exports = {registerFreelancer, loginFreelancer, logoutFreelancer};