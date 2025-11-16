const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// sql needed for the type definitions in .input
// getPool is to do queries
const { getPool, sql } = require("../config/database");


const registerTechnician = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, password} = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
        return res.status(400).send("You have to insert all data to register.");
    }

    try {
        const pool = getPool();
        const hashedPassword = await bcrypt.hash(password, 11);

        const result = await pool.request()
            .input("firstName", sql.VarChar, firstName)
            .input("lastName", sql.VarChar, lastName)
            .input("email", sql.VarChar, email)
            .input("phone", sql.VarChar, phone)
            .input("hashedPassword", sql.VarChar, hashedPassword)
            .query(`
            INSERT INTO Technician (First_Name, Last_Name, Email, Phone, Password_Hash)
            VALUES(@firstName, @lastName, @email, @phone, @hashedPassword)
            `);

        res.status(201).send("Technician registered successfully!");
    } catch (error) {
        // Handling the unique constraints for email and phone numbers
        // 2627 is for violation of the unique key constraint, and 2601 is for unique index violation
        if (error.number === 2627 || error.number === 2601) {
            return res.status(409).send("Another account exists already either with this email address or phone number. If you have another account, please use that one instead.");
        }

        console.error("Unexpected error registering a new technician account: ", error);
        res.status(500).send("An unexpected error occurred while registering the technician.");
    }
});

const loginTechnician = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send("You have to enter both your email and your password");
    }

    try {
        const pool = getPool();

        const result = await pool.request()
            .input("email", sql.VarChar, email)
            .query(`
                SELECT Technician_ID, First_Name, Last_Name, Email, Password_Hash, isActive, Verified
                FROM Technician
                WHERE Email = @email
                `);

        if (result.recordset.length === 0) {
            return res.status(401).send("Invalid email address or password.");
        }

        const technician = result.recordset[0];
        if (!technician.isActive) {
            return res.status(403).send("Your account is deactivated. Please contact us to resolve this issue.");
        }

        if (!technician.Verified) {
            return res.status(403).send("Your account is not verified yet. Please wait for admin approval.");
        }

        const isPasswordValid = await bcrypt.compare(password, technician.Password_Hash);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid email address or password.");
        }

        const technicianToken = jwt.sign({
            id: technician.Technician_ID,
            firstName: technician.First_Name,
            lastName: technician.Last_Name,
            email: technician.Email
        },
            process.env.TECHNICIAN_ACCESS_TOKEN,
            {expiresIn: "1d"}
        );

        if (req.cookies.technician_access_token) {
            res.clearCookie('technician_access_token');
        }

        res.cookie('technician_access_token', technicianToken, 
            {httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000});
        res.status(200).json({
            message: "Successfully logged in.",
            technician: {
                id: technician.Technician_ID,
                firstName: technician.First_Name,
                lastName: technician.Last_Name,
                email: technician.Email
            }
        })
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("An error occurred during login.");
    }
});

const logoutTechnician = asyncHandler(async (req, res) => {
    res.clearCookie('technician_access_token');
    res.status(200).send("Successfully logged out.");
})

module.exports = {registerTechnician, loginTechnician, logoutTechnician};