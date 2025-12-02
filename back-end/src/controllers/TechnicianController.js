/**
 * This controller provides the following functionalities for a technician: registering, logging in, logging out,
 * setting specialty (appliance categories they work with), and setting service areas.
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


// Handles the technician registering functionality
const registerTechnician = asyncHandler(async (req, res) => {
    // Getting the needed data from the request body
    const { firstName, lastName, email, phone, password} = req.body;

    // Checking if any of them is empty, if yes then we throw a 400
    if (!firstName || !lastName || !email || !phone || !password) {
        return res.status(400).json({message: "You have to insert all data to register."});
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

    // We now try to access the database to insert the technician
    try {
        const pool = getPool();

        // Hashing the password before storing
        const hashedPassword = await bcrypt.hash(password, 11);

        // Inserting the technician into the database Technician table
        const result = await pool.request()
            .input("firstName", sql.VarChar, sanitizeString(firstName))
            .input("lastName", sql.VarChar, sanitizeString(lastName))
            .input("email", sql.VarChar, sanitizeString(email).toLowerCase())
            .input("phone", sql.VarChar, sanitizeString(phone))
            .input("hashedPassword", sql.VarChar, hashedPassword)
            .query(`
            INSERT INTO Technician (First_Name, Last_Name, Email, Phone, Password_Hash)
            VALUES(@firstName, @lastName, @email, @phone, @hashedPassword)
            `);

        // Sending success message
        res.status(201).json({message: "Technician registered successfully!"});
    } catch (error) {
        // Handling the unique constraints for email and phone numbers
        // 2627 is for violation of the unique key constraint, and 2601 is for unique index violation
        if (error.number === 2627 || error.number === 2601) {
            return res.status(409).json({message: "Another account exists already either with this email address or phone number. If you have another account, please use that one instead."});
        }

        // Throwing the console error and 500 status in case something goes wrong
        console.error("Unexpected error registering a new technician account: ", error);
        res.status(500).json({message: "An unexpected error occurred while registering the technician."});
    }
});

// Handling the logging in functionality for technicians
const loginTechnician = asyncHandler(async (req,res) => {
    // Getting the email and password that the technician is trying to login with
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

        // Searching in the database for a technician with the same email passed to check if exists
        const result = await pool.request()
            .input("email", sql.VarChar, sanitizeString(email).toLowerCase())
            .query(`
                SELECT Technician_ID, First_Name, Last_Name, Email, Password_Hash, isActive, Verified
                FROM Technician
                WHERE Email = @email
                `);

        // If no results returned from the query, then the email entered is invalid
        if (result.recordset.length === 0) {
            return res.status(401).json({message: "Invalid email address or password."});
        }

        // Now we are getting the first technician that we got having the same email address
        const technician = result.recordset[0];

        // Check if the technician account is active
        if (!technician.isActive) {
            return res.status(403).json({message: "Your account is deactivated. Please contact us to resolve this issue."});
        }

        // Check if the technician account is verified by admin
        if (!technician.Verified) {
            return res.status(403).json({message: "Your account is not verified yet. Please wait for admin approval."});
        }

        // Using bcrypt to check if the password passed is the same as the hashed one stored in the database
        // If no, throw a 401 error
        const isPasswordValid = await bcrypt.compare(password, technician.Password_Hash);
        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid email address or password."});
        }

        // If the password matches, then create a technician token using jwt by signing it with the TECHNICIAN_ACCESS_TOKEN
        // stored in the .env file. The token expires in 1 day.
        const technicianToken = jwt.sign({
            id: technician.Technician_ID,
            firstName: technician.First_Name,
            lastName: technician.Last_Name,
            email: technician.Email
        },
            process.env.TECHNICIAN_ACCESS_TOKEN,
            {expiresIn: "1d"}
        );

        // If a cookie exists already for the technician, clear it
        if (req.cookies.technician_access_token) {
            res.clearCookie('technician_access_token');
        }

        // Store the new cookie such that it lasts 1 day, and throw a 200 success message with some data about the technician
        // (id, firstName, lastName, email)
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

        // If anything goes wrong, throw an error
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({message: "An error occurred during login."});
    }
});

// Logging out functionality by clearing the technician's cookie and sending a success message
const logoutTechnician = asyncHandler(async (req, res) => {
    res.clearCookie('technician_access_token');
    res.status(200).json({message: "Successfully logged out."});
})

// Getting technician's profile
const getProfile = asyncHandler(async (req, res) => {
    const technicianID = req.technicianID;

    try {
        const pool = getPool();

        const technicianResult = await pool.request()
            .input("technicianId", sql.Int, technicianID)
            .query(`
            SELECT tec.Technician_ID, tec.First_Name, tec.Last_Name, tec.Email, tec.Phone, tec.isActive, tec.Verified, tec.Average_Rating, tec.Total_Jobs
            FROM [Technician] AS tec
            WHERE tec.Technician_ID = @technicianId
            `);


        if (technicianResult.recordset.length === 0) {
            return res.status(404).json({message: "Technician not found."});
        }

        const applianceResult = await pool.request()
            .input("technicianId", sql.Int, technicianID)
            .query(`
            SELECT tec_cat.Category_ID, cat.NameEN, cat.NameAR, cat.Description, tec_cat.Years_Of_Experience, tec_cat.Certification_Date
            FROM Technician_Category AS tec_cat
            JOIN Appliance_Category AS cat ON tec_cat.Category_ID = cat.Category_ID
            WHERE tec_cat.Technician_ID = @technicianId
            `);

        const serviceAreaResult = await pool.request()
            .input("technicianId", sql.Int, technicianID)
            .query(`
            SELECT area.Area_ID, area.NameEN, area.NameAR, area.Region, tec_area.Priority_Order
            FROM Technician_Service_Area AS tec_area
            JOIN Service_Area AS area ON tec_area.Area_ID = area.Area_ID
            WHERE tec_area.Technician_ID = @technicianId
            ORDER BY tec_area.Priority_Order ASC, area.NameEN ASC
            `);

        const technicianData = technicianResult.recordset[0];

        const applianceCategories = applianceResult.recordset.map(record => ({
            categoryId: record.Category_ID,
            nameEN: record.NameEN,
            nameAR: record.NameAR,
            description: record.Description,
            yearsOfExperience: record.Years_Of_Experience,
            certificationDate: record.Certification_Date
        }));

        const serviceAreas = serviceAreaResult.recordset.map(record => ({
            areaId: record.Area_ID,
            nameEN: record.NameEN,
            nameAR: record.NameAR,
            region: record.Region,
            priority: record.Priority_Order
        }));

        res.status(200).json({ 
            firstName: technicianData.First_Name,
            lastName: technicianData.Last_Name,
            email: technicianData.Email,
            phone: technicianData.Phone,
            isActive: technicianData.isActive,
            verified: technicianData.Verified,
            averageRating: technicianData.Average_Rating,
            totalJobs: technicianData.Total_Jobs,
            applianceCategories: applianceCategories,
            serviceAreas: serviceAreas,
        });
    } catch (error) {
        // Throwing the console error and 500 status in case something goes wrong.
        console.error("Unexpected error occurred when trying to get profile: ", error);
        res.status(500).json({ message: "An unexpected error occurred while getting profile." });
    }
})

// Updating technician's profile information
const updateProfile = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone } = req.body;
    const technicianID = req.technicianID;

    // Checking if any of them is empty, if yes then we throw a 400
    if (!firstName || !lastName || !email || !phone) {
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

    try {
        const pool = getPool();

        // Updating the technician data
        const result = await pool.request()
            .input("technicianId", sql.Int, technicianID)
            .input("firstName", sql.VarChar, sanitizeString(firstName))
            .input("lastName", sql.VarChar, sanitizeString(lastName))
            .input("email", sql.VarChar, sanitizeString(email).toLowerCase())
            .input("phone", sql.VarChar, sanitizeString(phone))
            .query(`
                UPDATE [Technician] 
                SET First_Name = @firstName, Last_Name = @lastName, Email = @email, 
                    Phone = @phone, modifiedAt = GETDATE()
                WHERE Technician_ID = @technicianId
            `);

        // Check if update affected any rows
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Technician not found or no changes made." });
        }

        // Sending success message
        res.status(200).json({ message: "Technician profile updated successfully!" });
    } catch (error) {
        // Handling the unique constraints for email and phone numbers
        if (error.number === 2627 || error.number === 2601) {
            return res.status(409).json({ message: "Another account exists already either with this email address or phone number. If you have another account, please use that one instead." });
        }

        // Throwing the console error and 500 status in case something goes wrong
        console.error("Unexpected error when updating technician profile: ", error);
        res.status(500).json({ message: "An unexpected error occurred while updating the technician's profile." });
    }
});

// Getting technician's specialties (appliance categories)
const getSpecialties = asyncHandler(async (req, res) => {
    const technicianID = req.technicianID;

    try {
        const pool = getPool();

        // Get all specialties for this technician
        const result = await pool.request()
            .input("technicianId", sql.Int, technicianID)
            .query(`
                SELECT 
                    tec_cat.Category_ID, 
                    cat.NameEN, 
                    cat.NameAR, 
                    cat.Description,
                    tec_cat.Years_Of_Experience, 
                    tec_cat.Certification_Date,
                    tec_cat.createdAt
                FROM Technician_Category AS tec_cat
                JOIN Appliance_Category AS cat ON tec_cat.Category_ID = cat.Category_ID
                WHERE tec_cat.Technician_ID = @technicianId
                ORDER BY cat.NameEN ASC
            `);

        // Format the response by camelCase
        const specialties = result.recordset.map(record => ({
            categoryId: record.Category_ID,
            nameEN: record.NameEN,
            nameAR: record.NameAR,
            description: record.Description,
            yearsOfExperience: record.Years_Of_Experience,
            certificationDate: record.Certification_Date,
            addedAt: record.createdAt
        }));

        res.status(200).json({
            message: "Specialties retrieved successfully.",
            count: specialties.length,
            specialties: specialties
        });
    } catch (error) {
        console.error("Unexpected error occurred when trying to get specialties: ", error);
        res.status(500).json({ message: "An unexpected error occurred while retrieving specialties." });
    }
});

// Setting technician specialty - allows technicians to add appliance categories they specialize in
const settingTechnicianSpecialty = asyncHandler(async (req,res) => {
    // Getting the specialty data from the body and the technicianID passed from the middleware
    const {applianceCategoryID, yearsOfExperience, certificateDate} = req.body;
    const technicianID = req.technicianID;

    // If required fields are missing, throw a 400 error
    // Note: yearsOfExperience uses !== undefined to allow 0 as a valid value
    if (!applianceCategoryID || yearsOfExperience === undefined || yearsOfExperience === null) {
        return res.status(400).json({message: "Category ID and years of experience are required for you to pass!"});
    }

    // Validating years of experience - must be an integer between 0 and 50
    if (!Number.isInteger(yearsOfExperience) || yearsOfExperience < 0 || yearsOfExperience > 50) {
        return res.status(400).json({message: "Your years of experience should be between 0 and 50."});
    }

    // If certificate date is provided, validate it
    if (certificateDate) {
        const certDate = new Date(certificateDate);
        const today = new Date();
        today.setHours(0,0,0,0);

        // Certificate date cannot be in the future
        if (certDate > today) {
            return res.status(400).json({message: "Certification date cannot be in the future!"});
        }

        // Certificate date cannot be more than 50 years ago
        const fiftyYearsAgo = new Date();
        fiftyYearsAgo.setFullYear(fiftyYearsAgo.getFullYear() - 50);

        if (certDate < fiftyYearsAgo) {
            return res.status(400).json({message: "Certification date cannot be more than 50 years ago!"});
        }
    }

    try {
        const pool = getPool();

        // Check if the appliance category exists and is active
        const checkCategory = await pool.request()
            .input("applianceCategoryID", sql.Int, applianceCategoryID)
            .query(`
                SELECT Category_ID, NameEN, NameAR, isActive
                FROM Appliance_Category
                WHERE Category_ID = @applianceCategoryID
                `);

        // If no result returned, the category ID is invalid
        if (checkCategory.recordset.length === 0) {
            return res.status(404).json({message: "Invalid category passed! You should pick one of the available category IDs only."});
        }

        const category = checkCategory.recordset[0];

        // Check if the category is active
        if (!category.isActive) {
            return res.status(400).json({message: "The category chosen is currently not active!"});
        }

        // Checking for duplicate specialty - technician cannot add same category twice
        const checkDuplicate = await pool.request()
            .input("technicianID", sql.Int, technicianID)
            .input("applianceCategoryID", sql.Int, applianceCategoryID)
            .query(`
                SELECT Technician_ID
                FROM Technician_Category
                WHERE Technician_ID = @technicianID AND Category_ID = @applianceCategoryID
                `);

        // If duplicate found, throw a 409 conflict error
        if (checkDuplicate.recordset.length > 0) {
            return res.status(409).json({message: "You already have this specialty added."});
        }

        // Insert the new specialty into Technician_Category table
        await pool.request()
            .input("technicianID", sql.Int, technicianID)
            .input("applianceCategoryID", sql.Int, applianceCategoryID)
            .input("yearsOfExperience", sql.SmallInt, yearsOfExperience)
            .input("certificateDate", sql.Date, certificateDate || null)
            .query(`
                INSERT INTO Technician_Category (Technician_ID, Category_ID, Years_of_Experience, Certification_Date)
                VALUES (@technicianID, @applianceCategoryID, @yearsOfExperience, @certificateDate)
                `);

        // Return success response with specialty details
        res.status(201).json({
            message: "Successfully set your specialty.",
            categoryID: category.Category_ID,
            categoryNameEN: category.NameEN,
            categoryNameAR: category.NameAR,
            yearsOfExperience: yearsOfExperience,
            certificateDate: certificateDate || null
        });

    } catch (error) {
        console.error("An unexpected error occurred when trying to set your specialty:", error);

        // Foreign key constraint violation
        if (error.number === 547) {
            return res.status(400).json({message: "Invalid technician or category ID."});
        }

        // Unique constraint violation (duplicate entry)
        if (error.number === 2627) {
            return res.status(409).json({message: "You already have this specialty added!"});
        }

        res.status(500).json({message: "An unexpected error occurred when trying to set your specialty."});
    }
})

// Removing a specialty from technician's profile
const removeSpecialty = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;  // Get from URL parameter
    const technicianID = req.technicianID;

    // Validate categoryId
    const parsedCategoryId = parseInt(categoryId, 10);
    if (isNaN(parsedCategoryId)) {
        return res.status(400).json({ message: "Invalid category ID. Must be a number." });
    }

    try {
        const pool = getPool();

        // Check if the specialty exists before deleting
        const checkExists = await pool.request()
            .input("technicianId", sql.Int, technicianID)
            .input("categoryId", sql.Int, parsedCategoryId)
            .query(`
                SELECT Category_ID
                FROM Technician_Category
                WHERE Technician_ID = @technicianId AND Category_ID = @categoryId
            `);

        if (checkExists.recordset.length === 0) {
            return res.status(404).json({ message: "Specialty not found or not assigned to you." });
        }

        // Delete the specialty
        const result = await pool.request()
            .input("technicianId", sql.Int, technicianID)
            .input("categoryId", sql.Int, parsedCategoryId)
            .query(`
                DELETE FROM Technician_Category
                WHERE Technician_ID = @technicianId AND Category_ID = @categoryId
            `);

        res.status(200).json({ message: "Specialty removed successfully." });
    } catch (error) {
        console.error("Unexpected error occurred when trying to remove specialty: ", error);
        res.status(500).json({ message: "An unexpected error occurred while removing the specialty." });
    }
});

// Getting technician's service areas
const getServiceAreas = asyncHandler(async (req, res) => {
    const technicianID = req.technicianID;

    try {
        const pool = getPool();

        // Get all service areas for this technician, sorted by priority
        const result = await pool.request()
            .input("technicianId", sql.Int, technicianID)
            .query(`
                SELECT 
                    tec_area.Area_ID,
                    area.NameEN,
                    area.NameAR,
                    area.Region,
                    tec_area.Priority_Order,
                    tec_area.createdAt
                FROM Technician_Service_Area AS tec_area
                JOIN Service_Area AS area ON tec_area.Area_ID = area.Area_ID
                WHERE tec_area.Technician_ID = @technicianId
                ORDER BY tec_area.Priority_Order ASC, area.NameEN ASC
            `);

        // Format the response with consistent camelCase
        const serviceAreas = result.recordset.map(record => ({
            areaId: record.Area_ID,
            nameEN: record.NameEN,
            nameAR: record.NameAR,
            region: record.Region,
            priority: record.Priority_Order,
            addedAt: record.createdAt
        }));

        res.status(200).json({
            message: "Service areas retrieved successfully.",
            count: serviceAreas.length,
            serviceAreas: serviceAreas
        });
    } catch (error) {
        console.error("Unexpected error occurred when trying to get service areas: ", error);
        res.status(500).json({ message: "An unexpected error occurred while retrieving service areas." });
    }
});

// Setting technician service area - allows technicians to add areas they work in with priority
const settingTechnicianServiceArea = asyncHandler(async (req,res) => {
    // Getting the service area data from the body and the technicianID passed from the middleware
    const {serviceAreaID, priority} = req.body;
    const technicianID = req.technicianID;

    // If required fields are missing, throw a 400 error
    if (!serviceAreaID || !priority) {
        return res.status(400).json({message: "You have to specify from which service area you are and the priority of it."});
    }

    // Validating priority - must be an integer between 1 and 100
    if (!Number.isInteger(priority) || priority < 1 || priority > 100) {
        return res.status(400).json({message: "Priority must be an integer between 1 and 100."});
    }

    try {
        const pool = getPool();

        // Check if the service area exists
        const checkArea = await pool.request()
            .input("serviceAreaID", sql.Int, serviceAreaID)
            .query(`
                SELECT Area_ID, NameEN, NameAR, Region, isActive
                FROM Service_Area
                WHERE Area_ID = @serviceAreaID
                `);

        // If no result returned, the service area ID is invalid
        if (checkArea.recordset.length === 0) {
            return res.status(404).json({message: "Invalid service area chosen! You have to choose one of the available ones."});
        }

        const serviceArea = checkArea.recordset[0];

        // Check if the service area is active
        if (!serviceArea.isActive) {
            return res.status(400).json({message: "Currently this service area is not active."});
        }

        // Checking for duplicate service area - technician cannot add same area twice
        const checkDuplicate = await pool.request()
            .input("technicianID", sql.Int, technicianID)
            .input("serviceAreaID", sql.Int, serviceAreaID)
            .query(`
                SELECT Technician_ID
                FROM Technician_Service_Area
                WHERE Technician_ID = @technicianID AND Area_ID = @serviceAreaID
                `);

        // If duplicate found, throw a 409 conflict error
        if (checkDuplicate.recordset.length > 0) {
            return res.status(409).json({message: "You already have set this service area!"});
        }

        // Insert the new service area into Technician_Service_Area table
        await pool.request()
            .input("technicianID", sql.Int, technicianID)
            .input("serviceAreaID", sql.Int, serviceAreaID)
            .input("priority", sql.Int, priority)
            .query(`
                INSERT INTO Technician_Service_Area (Technician_ID, Area_ID, Priority_Order)
                VALUES (@technicianID, @serviceAreaID, @priority)
                `);

        // Return success response with service area details
        res.status(201).json({
            message: "Successfully set your service area.",
            areaID: serviceArea.Area_ID,
            areaNameEN: serviceArea.NameEN,
            areaNameAR: serviceArea.NameAR,
            areaRegion: serviceArea.Region,
            priority: priority
        });
        
    } catch (error) {
        console.error("An unexpected error occurred when trying to set your service area:", error);

        // Foreign key constraint violation
        if (error.number === 547) {
            return res.status(400).json({message: "Invalid technician or service area ID."});
        }

        // Unique constraint violation (duplicate entry)
        if (error.number === 2627) {
            return res.status(409).json({message: "You already have this service area set!"});
        }

        res.status(500).json({message: "An unexpected error occurred when trying to set your service area."});
    }
})

// Removing a service area from technician's profile
const removeServiceArea = asyncHandler(async (req, res) => {
    const { areaId } = req.params;  // Get from URL parameter
    const technicianID = req.technicianID;

    // Validate areaId
    const parsedAreaId = parseInt(areaId, 10);
    if (isNaN(parsedAreaId)) {
        return res.status(400).json({ message: "Invalid area ID. Must be a number." });
    }

    try {
        const pool = getPool();

        // Check if the service area exists before deleting
        const checkExists = await pool.request()
            .input("technicianId", sql.Int, technicianID)
            .input("areaId", sql.Int, parsedAreaId)
            .query(`
                SELECT Area_ID
                FROM Technician_Service_Area
                WHERE Technician_ID = @technicianId AND Area_ID = @areaId
            `);

        if (checkExists.recordset.length === 0) {
            return res.status(404).json({ message: "Service area not found or not assigned to you." });
        }

        // Delete the service area
        const result = await pool.request()
            .input("technicianId", sql.Int, technicianID)
            .input("areaId", sql.Int, parsedAreaId)
            .query(`
                DELETE FROM Technician_Service_Area
                WHERE Technician_ID = @technicianId AND Area_ID = @areaId
            `);

        res.status(200).json({ message: "Service area removed successfully." });
    } catch (error) {
        console.error("Unexpected error occurred when trying to remove service area: ", error);
        res.status(500).json({ message: "An unexpected error occurred while removing the service area." });
    }
});


module.exports = {registerTechnician, loginTechnician, logoutTechnician, getProfile, updateProfile, settingTechnicianSpecialty, getSpecialties, removeSpecialty, settingTechnicianServiceArea, getServiceAreas, removeServiceArea}; 