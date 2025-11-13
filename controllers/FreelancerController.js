const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// sql needed for the type definitions in .input
// getPool is to do queries
const { getPool, sql } = require("../config/database");


const registerFreelancer = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, password, content_type_specialty, portfolio_url} = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !content_type_specialty) {
        return res.status(400).send("Required fields are missing.");
    }

    if (!['video', 'article'].includes(content_type_specialty)) {
        return res.status(400).send("Content type specialty must be either 'video' or 'article'.");
    }

    try {
        const pool = getPool();
        const hashedPassword = await bcrypt.hash(password, 11);

        // By default no rate and freelancer unverified until admin approves and sets a rate.
        const result = await pool.request()
            .input("firstName", sql.VarChar, firstName)
            .input("lastName", sql.VarChar, lastName)
            .input("email", sql.VarChar, email)
            .input("phone", sql.VarChar, phone)
            .input("hashedPassword", sql.VarChar, hashedPassword)
            .input("contentTypeSpecialty", sql.VarChar, content_type_specialty)
            .input("portfolioUrl", sql.VarChar, portfolio_url || null)
            .query(`
            INSERT INTO Freelancer (First_Name, Last_Name, Email, Phone, Password_Hash, Content_Type_Specialty, Rate_Per_Content, Payment_Currency, Portfolio_URL, isActive)
            VALUES(@firstName, @lastName, @email, @phone, @hashedPassword, @contentTypeSpecialty, 0.00, 'USD', @portfolioUrl, 0)
            `);

        res.status(201).send("Freelancer registered successfully! Please wait for admin approval.");
    } catch (error) {
        // Handling the unique constraints for email and phone numbers
        // 2627 is for violation of the unique key constraint, and 2601 is for unique index violation
        if (error.number === 2627 || error.number === 2601) {
            if (error.message.includes("Email")) {
                return res.status(409).send("Another account already exists with this email.");
            }

            if (error.message.includes("Phone")) {
                return res.status(409).send("Another account already has this phone number.");
            }

            return res.status(409).send("Another freelancer already exists with these details.");
        }

        console.error("Unexpected error registering a new freelancer's account: ", error);
        res.status(500).send("An unexpected error occurred while registering the freelancer.");
    }
});

const loginFreelancer = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send("You have to enter both your email and your password");
    }

    try {
        const pool = getPool();

        const result = await pool.request()
            .input("email", sql.VarChar, email)
            .query(`
                SELECT Freelancer_ID, First_Name, Last_Name, Email, Password_Hash, isActive
                FROM Freelancer
                WHERE Email = @email
                `);

        if (result.recordset.length === 0) {
            return res.status(401).send("Invalid email address or password.");
        }

        const freelancer = result.recordset[0];
        if (!freelancer.isActive) {
            return res.status(403).send("Your account is not activated yet. Please wait till you receive the approval/denial email to know if you can start working with us.");
        }

        const isPasswordValid = await bcrypt.compare(password, freelancer.Password_Hash);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid email address or password.");
        }

        const freelancerToken = jwt.sign({
            id: freelancer.Freelancer_ID,
            firstName: freelancer.First_Name,
            lastName: freelancer.Last_Name,
            email: freelancer.Email
        },
            process.env.FREELANCER_ACCESS_TOKEN,
            {expiresIn: "1d"}
        );

        if (req.cookies.freelancer_access_token) {
            res.clearCookie('freelancer_access_token');
        }

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
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("An error occurred during login.");
    }
});

const logoutFreelancer = asyncHandler(async (req, res) => {
    res.clearCookie('freelancer_access_token');
    res.status(200).send("Successfully logged out.");
})

module.exports = {registerFreelancer, loginFreelancer, logoutFreelancer};