/**
 * The below controller provides the following functionalities for a user: registering, logging in and logging out.
 * 
 * For storing the password, bcrypt is used to hash and jwt (jsonwebtoken) is used to sign a token and store it as cookie.
 */

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// sql needed for the type definitions in .input
// getPool is to do queries
const { getPool, sql } = require("../config/database");


// Handles the registering functionality
const registerUser = asyncHandler(async (req, res) => {
    // Getting the needed data from the request body
    const { firstName, lastName, email, phone, password, streetAddress, buildingName, floor, city, postalCode } = req.body;

    // Checking if any of them is empty, if yes then we throw a 400 
    if (!firstName || !lastName || !email || !phone || !password || !streetAddress || !buildingName || !floor || !city || !postalCode) {
        return res.status(400).send("You have to insert all data to register.");
    }

    // We now try to access the database to insert the user
    try {
        const pool = getPool();

        // Hashing the password before storing
        const hashedPassword = await bcrypt.hash(password, 11);

        // Inserting the user into the database User table
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

        // Sending success message
        res.status(201).send("User registered successfully!");
    } catch (error) {
        // Handling the unique constraints for email and phone numbers
        // 2627 is for violation of the unique key constraint, and 2601 is for unique index violation
        if (error.number === 2627 || error.number === 2601) {            
            return res.status(409).send("Another account exists already either with this email address or phone number. If you have another account, please use that one instead.");
        }

        // Throwing the console error and 500 status in case something goes wrong.
        console.error("Unexpected error registering a new user account: ", error);
        res.status(500).send("An unexpected error occurred while registering the user.");
    }
});


// Handling the logging in functionality
const loginUser = asyncHandler(async (req,res) => {
    // Getting the email and password that the user is trying to login with.
    const {email, password} = req.body;

    // Input validation, if either empty then send 400 error
    if (!email || !password) {
        return res.status(400).send("You have to enter both your email and your password");
    }

    try {
        const pool = getPool();

        // Searching in the database for a user with the same email passed to check if exists
        const result = await pool.request()
            .input("email", sql.VarChar, email)
            .query(`
                SELECT User_ID, First_Name, Last_Name, Email, Password_Hash, isActive
                FROM [User]
                WHERE Email = @email
                `);

        // If no results returned from the query, then the email entered is invalid
        if (result.recordset.length === 0) {
            return res.status(401).send("Invalid email address or password.");
        }

        // Now we are getting the first user that we got having the same email address
        const user = result.recordset[0];
        if (!user.isActive) {
            return res.status(403).send("Your account is deactivated. Please contact us to resolve this issue.");
        }

        // Using bcrypt to check if the email passed is the same as the hashed one stored in the database
        // If no, throw a 401 error
        const isPasswordValid = await bcrypt.compare(password, user.Password_Hash);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid email address or password.");
        }

        // If the password matches, then create a user token using jwt by signing it with the USER_ACCESS_TOKEN
        // stored in the .env file. The token expires in 1 day.
        const userToken = jwt.sign({
            id: user.User_ID,
            firstName: user.First_Name,
            lastName: user.Last_Name,
            email: user.Email
        },
            process.env.USER_ACCESS_TOKEN,
            {expiresIn: "1d"}
        );

        // If a cookie exists already for the user, clear it.
        if (req.cookies.user_access_token) {
            res.clearCookie('user_access_token');
        }

        // Store the new cookie such that it lasts 1 day, and throw a 200 success message with some data about the user
        // (id, firstName, lastName, email)
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

        // If anything goes wrong, ex duplicate email, then throw an error.
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("An error occurred during login.");
    }
});

// Logging out functionality by clearing the user's cooking and sending a success message
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('user_access_token');
    res.status(200).send("Successfully logged out.");
})

module.exports = {registerUser, loginUser, logoutUser};