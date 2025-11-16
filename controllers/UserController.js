const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// sql needed for the type definitions in .input
// getPool is to do queries
const { getPool, sql } = require("../config/database");


const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, password, streetAddress, buildingName, floor, city, postalCode } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !streetAddress || !buildingName || !floor || !city || !postalCode) {
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
            .input("streetAddress", sql.VarChar, streetAddress)
            .input("buildingName", sql.VarChar, buildingName)
            .input("floor", sql.VarChar, floor)
            .input("city", sql.VarChar, city)
            .input("postalCode", sql.VarChar, postalCode)
            .query(`
            INSERT INTO [User] (First_Name, Last_Name, Email, Phone, Password_Hash, Street_Address, Building_Name, Floor, City, Postal_Code)
            VALUES(@firstName, @lastName, @email, @phone, @hashedPassword, @streetAddress, @buildingName, @floor, @city, @postalCode)
            `);

        res.status(201).send("User registered successfully!");
    } catch (error) {
        // Handling the unique constraints for email and phone numbers
        // 2627 is for violation of the unique key constraint, and 2601 is for unique index violation
        if (error.number === 2627 || error.number === 2601) {            
            return res.status(409).send("Another account exists already either with this email address or phone number. If you have another account, please use that one instead.");
        }

        console.error("Unexpected error registering a new user account: ", error);
        res.status(500).send("An unexpected error occurred while registering the user.");
    }
});

const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send("You have to enter both your email and your password");
    }

    try {
        const pool = getPool();

        const result = await pool.request()
            .input("email", sql.VarChar, email)
            .query(`
                SELECT User_ID, First_Name, Last_Name, Email, Password_Hash, isActive
                FROM [User]
                WHERE Email = @email
                `);

        if (result.recordset.length === 0) {
            return res.status(401).send("Invalid email address or password.");
        }

        const user = result.recordset[0];
        if (!user.isActive) {
            return res.status(403).send("Your account is deactivated. Please contact us to resolve this issue.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.Password_Hash);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid email address or password.");
        }

        const userToken = jwt.sign({
            id: user.User_ID,
            firstName: user.First_Name,
            lastName: user.Last_Name,
            email: user.Email
        },
            process.env.USER_ACCESS_TOKEN,
            {expiresIn: "1d"}
        );

        if (req.cookies.user_access_token) {
            res.clearCookie('user_access_token');
        }

        res.cookie('user_access_token', userToken, 
            {httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000});
        res.status(200).json({
            message: "Successfully logged in.",
            user: {
                id: user.User_ID,
                firstName: user.First_Name,
                lastName: user.Last_Name,
                email: user.Email
            }
        })
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("An error occurred during login.");
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('user_access_token');
    res.status(200).send("Successfully logged out.");
})

module.exports = {registerUser, loginUser, logoutUser};