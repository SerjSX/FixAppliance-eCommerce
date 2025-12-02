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

// Import validation utilities
const { isValidEmail, isValidPhone, isValidPassword, isValidName, sanitizeString } = require("../utils/validators");


// Handles the registering functionality
const registerUser = asyncHandler(async (req, res) => {
    // Getting the needed data from the request body
    const { firstName, lastName, email, phone, password, streetAddress, buildingName, floor, city, postalCode } = req.body;

    // Checking if any of them is empty, if yes then we throw a 400 
    if (!firstName || !lastName || !email || !phone || !password || !streetAddress || !buildingName || !floor || !city || !postalCode) {
        return res.status(400).json({ message: "You have to insert all data to register." });
    }

    // Validate first name format
    if (!isValidName(firstName)) {
        return res.status(400).json({ message: "First name must be 2-30 characters and contain only letters." });
    }

    // Validate last name format
    if (!isValidName(lastName)) {
        return res.status(400).json({ message: "Last name must be 2-30 characters and contain only letters." });
    }

    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid email address." });
    }

    // Validate phone format
    if (!isValidPhone(phone)) {
        return res.status(400).json({ message: "Please enter a valid phone number." });
    }

    // Validate password strength
    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
        return res.status(400).json({ message: passwordValidation.message });
    }

    // Validate address fields length
    if (streetAddress.length > 200) {
        return res.status(400).json({ message: "Street address cannot exceed 200 characters." });
    }

    if (buildingName && buildingName.length > 100) {
        return res.status(400).json({ message: "Building name cannot exceed 100 characters." });
    }

    if (city.length > 50) {
        return res.status(400).json({ message: "City name cannot exceed 50 characters." });
    }

    // We now try to access the database to insert the user
    try {
        const pool = getPool();

        // Hashing the password before storing
        const hashedPassword = await bcrypt.hash(password, 11);

        // Inserting the user into the database User table (sanitize inputs)
        const result = await pool.request()
            .input("firstName", sql.VarChar, sanitizeString(firstName))
            .input("lastName", sql.VarChar, sanitizeString(lastName))
            .input("email", sql.VarChar, sanitizeString(email).toLowerCase())
            .input("phone", sql.VarChar, sanitizeString(phone))
            .input("hashedPassword", sql.VarChar, hashedPassword)
            .input("streetAddress", sql.VarChar, sanitizeString(streetAddress))
            .input("buildingName", sql.VarChar, sanitizeString(buildingName))
            .input("floor", sql.VarChar, sanitizeString(floor))
            .input("city", sql.VarChar, sanitizeString(city))
            .input("postalCode", sql.VarChar, sanitizeString(postalCode))
            .query(`
            INSERT INTO [User] (First_Name, Last_Name, Email, Phone, Password_Hash, Street_Address, Building_Name, Floor, City, Postal_Code)
            VALUES(@firstName, @lastName, @email, @phone, @hashedPassword, @streetAddress, @buildingName, @floor, @city, @postalCode)
            `);

        // Sending success message
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        // Handling the unique constraints for email and phone numbers
        // 2627 is for violation of the unique key constraint, and 2601 is for unique index violation
        if (error.number === 2627 || error.number === 2601) {
            return res.status(409).json({ message: "Another account exists already either with this email address or phone number. If you have another account, please use that one instead." });
        }

        // Throwing the console error and 500 status in case something goes wrong.
        console.error("Unexpected error registering a new user account: ", error);
        res.status(500).json({ message: "An unexpected error occurred while registering the user." });
    }
});


// Handling the logging in functionality
const loginUser = asyncHandler(async (req, res) => {
    // Getting the email and password that the user is trying to login with.
    const { email, password } = req.body;

    // Input validation, if either empty then send 400 error
    if (!email || !password) {
        return res.status(400).json({ message: "You have to enter both your email and your password" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid email address." });
    }

    try {
        const pool = getPool();

        // Searching in the database for a user with the same email passed to check if exists
        const result = await pool.request()
            .input("email", sql.VarChar, sanitizeString(email).toLowerCase())
            .query(`
                SELECT User_ID, First_Name, Last_Name, Email, Password_Hash, isActive
                FROM [User]
                WHERE Email = @email
                `);

        // If no results returned from the query, then the email entered is invalid
        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "Invalid email address or password." });
        }

        // Now we are getting the first user that we got having the same email address
        const user = result.recordset[0];
        if (!user.isActive) {
            return res.status(403).json({ message: "Your account is deactivated. Please contact us to resolve this issue." });
        }

        // Using bcrypt to check if the email passed is the same as the hashed one stored in the database
        // If no, throw a 401 error
        const isPasswordValid = await bcrypt.compare(password, user.Password_Hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email address or password." });
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
            { expiresIn: "1d" }
        );

        // If a cookie exists already for the user, clear it.
        if (req.cookies.user_access_token) {
            res.clearCookie('user_access_token');
        }

        // Store the new cookie such that it lasts 1 day, and throw a 200 success message with some data about the user
        // (id, firstName, lastName, email)
        res.cookie('user_access_token', userToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            });
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
        res.status(500).json({ message: "An error occurred during login." });
    }
});

// Retrieving user's profile information
const getProfile = asyncHandler(async (req, res) => {
    const userID = req.userID;

    try {
        const pool = getPool();


        const result = await pool.request()
            .input("userId", sql.Int, userID)
            .query(`
            SELECT User_ID, First_Name, Last_Name, Email, Phone, Street_Address, Building_Name, Floor, City, Postal_Code, isActive
            FROM [User]
            WHERE User_ID = @userId
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({message: "User not found."});
        }

        const userData = result.recordset[0];

        res.status(200).json({ 
            firstName: userData.First_Name,
            lastName: userData.Last_Name,
            email: userData.Email,
            phone: userData.Phone,
            streetAddress: userData.Street_Address,
            buildingName: userData.Building_Name,
            floor: userData.Floor,
            city: userData.City,
            postalCode: userData.Postal_Code,
            isActive: userData.isActive
        });
    } catch (error) {
        // Throwing the console error and 500 status in case something goes wrong.
        console.error("Unexpected error occurred when trying to get profile: ", error);
        res.status(500).json({ message: "An unexpected error occurred while getting profile." });
    }
});

// Updating user's profile information
const updateProfile = asyncHandler(async (req, res) => {
    const {firstName, lastName, email, phone, streetAddress, buildingName, floor, city, postalCode} = req.body;
    const userID = req.userID;


    // Checking if any of them is empty, if yes then we throw a 400 
    if (!firstName || !lastName || !email || !phone || !streetAddress || !buildingName || !floor || !city || !postalCode) {
        return res.status(400).json({ message: "You have to insert all profile data to update." });
    }

    // Validate first name format
    if (!isValidName(firstName)) {
        return res.status(400).json({ message: "First name must be 2-30 characters and contain only letters." });
    }

    // Validate last name format
    if (!isValidName(lastName)) {
        return res.status(400).json({ message: "Last name must be 2-30 characters and contain only letters." });
    }

    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid email address." });
    }

    // Validate phone format
    if (!isValidPhone(phone)) {
        return res.status(400).json({ message: "Please enter a valid phone number." });
    }

    // Validate address fields length
    if (streetAddress.length > 200) {
        return res.status(400).json({ message: "Street address cannot exceed 200 characters." });
    }

    if (buildingName && buildingName.length > 100) {
        return res.status(400).json({ message: "Building name cannot exceed 100 characters." });
    }

    if (city.length > 50) {
        return res.status(400).json({ message: "City name cannot exceed 50 characters." });
    }

    // We now try to access the database to insert the user
    try {
        const pool = getPool();

        // Updating the user data 
        const result = await pool.request()
            .input("userId", sql.Int, userID)
            .input("firstName", sql.VarChar, sanitizeString(firstName))
            .input("lastName", sql.VarChar, sanitizeString(lastName))
            .input("email", sql.VarChar, sanitizeString(email).toLowerCase())
            .input("phone", sql.VarChar, sanitizeString(phone))
            .input("streetAddress", sql.VarChar, sanitizeString(streetAddress))
            .input("buildingName", sql.VarChar, sanitizeString(buildingName))
            .input("floor", sql.VarChar, sanitizeString(floor))
            .input("city", sql.VarChar, sanitizeString(city))
            .input("postalCode", sql.VarChar, sanitizeString(postalCode))
            .query(`
            UPDATE [User] 
            SET First_Name = @firstName, Last_Name = @lastName, Email = @email, Phone = @phone, Street_Address = @streetAddress, Building_Name = @buildingName,
                Floor = @floor, City = @city, Postal_Code = @postalCode, modifiedAt = GETDATE()
            WHERE User_ID = @userId
                `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({message: "User not found or no changes made."});
        }

        // Sending success message
        res.status(200).json({ message: "User profile updated successfully!" });
    } catch (error) {
        // Handling the unique constraints for email and phone numbers
        // 2627 is for violation of the unique key constraint, and 2601 is for unique index violation
        if (error.number === 2627 || error.number === 2601) {
            return res.status(409).json({ message: "Another account exists already either with this email address or phone number. If you have another account, please use that one instead." });
        }

        // Throwing the console error and 500 status in case something goes wrong.
        console.error("Unexpected error when updating profile: ", error);
        res.status(500).json({ message: "An unexpected error occurred while updating the user's profile." });
    }

});

// Logging out functionality by clearing the user's cooking and sending a success message
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('user_access_token');
    res.status(200).json({ message: "Successfully logged out." });
})

module.exports = { registerUser, loginUser, logoutUser, getProfile, updateProfile };