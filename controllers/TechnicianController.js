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

const settingTechnicianSpecialty = asyncHandler(async (req,res) => {
    const {applianceCategoryID, yearsOfExperience, certificateDate} = req.body;
    const technicianID = req.technicianID;

    if (!applianceCategoryID || !yearsOfExperience) {
        return res.status(400).send("Category ID and years of experience are required for you to pass!");
    }

    if (!Number.isInteger(yearsOfExperience) || yearsOfExperience < 0 || yearsOfExperience > 50) {
        return res.status(400).send("Your years of experience should be between 0 and 50.");
    }

    if (certificateDate) {
        const certDate = new Date(certificateDate);
        const today = new Date();
        today.setHours(0,0,0,0);

        if (certDate > today) {
            return res.status(400).send("Certification date cannot be in the future!");
        }

        const fiftyYearsAgo = new Date();
        fiftyYearsAgo.setFullYear(fiftyYearsAgo.getFullYear() - 50);

        if (certDate < fiftyYearsAgo) {
            return res.status(400).send("Certification date cannot be more than 50 years ago!");
        }
    }

    try {
        const pool = getPool();

        const checkCategory = await pool.request()
            .input("applianceCategoryID", sql.Int, applianceCategoryID)
            .query(`
                SELECT Category_ID, NameEN, NameAR, isActive
                FROM Appliance_Category
                WHERE Category_ID = @applianceCategoryID
                `);

        if (checkCategory.recordset.length === 0) {
            return res.status(404).send("Invalid category passed! You should pick one of the available category IDs only.");
        }

        const category = checkCategory.recordset[0];

        if (!category.isActive) {
            return res.status(400).send("The category chosen is currently not active!");
        }

        // Checking for duplicate specialty set for the technician
        const checkDuplicate = await pool.request()
            .input("technicianID", sql.Int, technicianID)
            .input("applianceCategoryID", sql.Int, applianceCategoryID)
            .query(`
                SELECT Technician_ID
                FROM Technician_Category
                WHERE Technician_ID = @technicianID AND Category_ID = @applianceCategoryID
                `);

        if (checkDuplicate.recordset.length > 0) {
            return res.status(409).send("You already have this specialty added.");
        }

        const specialtySet = await pool.request()
            .input("technicianID", sql.Int, technicianID)
            .input("applianceCategoryID", sql.Int, applianceCategoryID)
            .input("yearsOfExperience", sql.SmallInt, yearsOfExperience)
            .input("certificateDate", sql.Date, certificateDate)
            .query(`
                INSERT INTO Technician_Category (Technician_ID, Category_ID, Years_of_Experience, Certification_Date)
                VALUES (@technicianID, @applianceCategoryID, @yearsOfExperience, @certificateDate)
                `);

        res.status(201).json({
            message: "Successfully set your specialty.",
            categoryID: category.Category_ID,
            categoryNameEN: category.NameEN,
            categoryNameAR: category.NameAR,
            yearsOfExperience: yearsOfExperience,
            certificateDate: certificateDate || null
        })

    } catch (error) {
        console.log("An unexpected error occurred when trying to set your specialty:", error);

        // constraint violation
        if (error.number === 547) {
            return res.status(400).send("Invalid technician or category ID.");
        }

        // duplicates
        if (error.number === 2627) {
            return res.status(409).send("You already have this specialty added!");
        }

        res.status(500).send("An unexpected error occurred when trying to set your specialty.");
    }
})

module.exports = {registerTechnician, loginTechnician, logoutTechnician, settingTechnicianSpecialty}; 