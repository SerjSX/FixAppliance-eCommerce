/**
 * AdminController
 * 
 * Handles all admin operations including:
 * 0. Admin authentication (login, logout)
 * 1. Managing appliance categories and types
 * 2. Monitoring bookings (completed unpaid, accepted incomplete, overdue)
 * 3. Technician management (verification, ratings, performance)
 * 4. Financial reporting (revenue, commissions)
 * 5. Analytics (booking counts by type, user/technician info)
 */

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getPool, sql } = require("../config/database");
const { isValidEmail, sanitizeString } = require("../utils/validators");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

// Configure multer for category icon uploads
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../public/images/appliance-categories');
        try {
            await fs.mkdir(uploadPath, { recursive: true });
            cb(null, uploadPath);
        } catch (error) {
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        // Generate filename: first 3 chars + random digits + extension (max 20 chars)
        const originalName = path.parse(file.originalname).name;
        const prefix = originalName.substring(0, 3).toLowerCase();
        const randomNum = Math.random().toString(36).substring(2, 10); // 8 chars
        const ext = path.extname(file.originalname);
        cb(null, `${prefix}_${randomNum}${ext}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|svg|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files (jpeg, jpg, png, svg, webp) are allowed'));
        }
    }
}).single('icon');

// ========================================
// ADMIN AUTHENTICATION
// ========================================

/**
 * Admin login
 * POST /api/admin/login
 */
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ message: "You have to enter both your email and your password." });
    }

    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid email address." });
    }

    try {
        const pool = getPool();

        // Search for admin with the provided email
        const result = await pool.request()
            .input("email", sql.VarChar, sanitizeString(email).toLowerCase())
            .query(`
                SELECT Admin_ID, Username, Email, Password_Hash
                FROM Admin
                WHERE Email = @email
            `);

        // If no admin found
        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "Invalid email address or password." });
        }

        const admin = result.recordset[0];

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.Password_Hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email address or password." });
        }

        // Create admin token
        const adminToken = jwt.sign(
            {
                id: admin.Admin_ID,
                username: admin.Username,
                email: admin.Email,
                role: 'admin'
            },
            process.env.ADMIN_ACCESS_TOKEN,
            { expiresIn: "1d" }
        );

        // Clear existing cookie if any
        if (req.cookies.admin_access_token) {
            res.clearCookie('admin_access_token');
        }

        // Set new cookie
        res.cookie('admin_access_token', adminToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'strict' : 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(200).json({
            message: "Successfully logged in.",
            admin: {
                id: admin.Admin_ID,
                username: admin.Username,
                email: admin.Email
            }
        });

    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ message: "An error occurred during login." });
    }
});

/**
 * Admin logout
 * POST /api/admin/logout
 */
const logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie('admin_access_token');
    res.status(200).json({ message: "Successfully logged out." });
});

// ========================================
// APPLIANCE CATEGORY & TYPE MANAGEMENT
// ========================================

/**
 * Add a new appliance category with icon upload
 * POST /api/admin/categories
 */
const addCategory = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: `Upload error: ${err.message}` });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { nameEN, nameAR } = req.body;

        if (!nameEN) {
            return res.status(400).json({ message: "Category name in English is required." });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Category icon is required." });
        }

        try {
            const pool = getPool();
            const logoFileName = req.file.filename;

            const result = await pool.request()
                .input("nameEN", sql.VarChar, nameEN)
                .input("nameAR", sql.NVarChar, nameAR)
                .input("logoFileName", sql.VarChar, logoFileName)
                .query(`
                    INSERT INTO Appliance_Category (NameEN, NameAR, logoFileName, isActive)
                    OUTPUT INSERTED.Category_ID, INSERTED.NameEN, INSERTED.NameAR, INSERTED.logoFileName
                    VALUES (@nameEN, @nameAR, @logoFileName, 1)
                `);

            res.status(201).json({
                message: "Category added successfully.",
                data: result.recordset[0]
            });
        } catch (error) {
            // Delete uploaded file if database insertion fails
            if (req.file) {
                await fs.unlink(req.file.path).catch(console.error);
            }

            if (error.number === 2627 || error.number === 2601) {
                return res.status(409).json({ message: "A category with this name already exists." });
            }

            console.error("Error adding category:", error);
            res.status(500).json({ message: "An unexpected error occurred while adding the category." });
        }
    });
});

/**
 * Add a new appliance type under a category
 * POST /api/admin/categories/:categoryId/types
 */
const addApplianceType = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { nameEN, nameAR, basePrice, averageRepairTimeMin, descriptionEN, descriptionAR } = req.body;

    if (!nameEN || !basePrice || !averageRepairTimeMin) {
        return res.status(400).json({ 
            message: "Type name (EN), base price, and average repair time are required." 
        });
    }

    if (basePrice <= 0 || averageRepairTimeMin <= 0) {
        return res.status(400).json({ 
            message: "Base price and repair time must be positive numbers." 
        });
    }

    try {
        const pool = getPool();

        // Verify category exists
        const categoryCheck = await pool.request()
            .input("categoryId", sql.Int, categoryId)
            .query(`SELECT Category_ID FROM Appliance_Category WHERE Category_ID = @categoryId`);

        if (categoryCheck.recordset.length === 0) {
            return res.status(404).json({ message: "Category not found." });
        }

        const result = await pool.request()
            .input("categoryId", sql.Int, categoryId)
            .input("nameEN", sql.VarChar, nameEN)
            .input("nameAR", sql.NVarChar, nameAR)
            .input("basePrice", sql.Decimal(10, 2), basePrice)
            .input("averageRepairTimeMin", sql.Int, averageRepairTimeMin)
            .input("descriptionEN", sql.VarChar, descriptionEN || null)
            .input("descriptionAR", sql.NVarChar, descriptionAR || null)
            .query(`
                INSERT INTO Appliance_Type (Category_ID, nameEN, nameAR, Base_Price, Average_Repair_Time_Min, DescriptionEN, DescriptionAR, isActive)
                OUTPUT INSERTED.Appliance_Type_ID, INSERTED.Category_ID, INSERTED.nameEN, INSERTED.nameAR, INSERTED.Base_Price, INSERTED.Average_Repair_Time_Min
                VALUES (@categoryId, @nameEN, @nameAR, @basePrice, @averageRepairTimeMin, @descriptionEN, @descriptionAR, 1)
            `);

        res.status(201).json({
            message: "Appliance type added successfully.",
            data: result.recordset[0]
        });
    } catch (error) {
        if (error.number === 2627 || error.number === 2601) {
            return res.status(409).json({ message: "An appliance type with this name already exists in this category." });
        }

        console.error("Error adding appliance type:", error);
        res.status(500).json({ message: "An unexpected error occurred while adding the appliance type." });
    }
});

/**
 * Update base price for an appliance type
 * PATCH /api/admin/types/:typeId/price
 */
const updateApplianceTypePrice = asyncHandler(async (req, res) => {
    const { typeId } = req.params;
    const { basePrice } = req.body;

    if (!basePrice || basePrice <= 0) {
        return res.status(400).json({ message: "Valid base price is required." });
    }

    try {
        const pool = getPool();

        const result = await pool.request()
            .input("typeId", sql.Int, typeId)
            .input("basePrice", sql.Decimal(10, 2), basePrice)
            .query(`
                UPDATE Appliance_Type
                SET Base_Price = @basePrice
                OUTPUT INSERTED.Appliance_Type_ID, INSERTED.nameEN, INSERTED.Base_Price
                WHERE Appliance_Type_ID = @typeId
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Appliance type not found." });
        }

        res.status(200).json({
            message: "Base price updated successfully.",
            data: result.recordset[0]
        });
    } catch (error) {
        console.error("Error updating base price:", error);
        res.status(500).json({ message: "An unexpected error occurred while updating the base price." });
    }
});

// ========================================
// BOOKING MONITORING
// ========================================

/**
 * Get bookings that are completed but not paid for a long time
 * GET /api/admin/bookings/completed-unpaid?days=7
 */
const getCompletedUnpaidBookings = asyncHandler(async (req, res) => {
    const { days = 7 } = req.query;

    try {
        const pool = getPool();

        const result = await pool.request()
            .input("days", sql.Int, parseInt(days))
            .query(`
                SELECT 
                    b.Booking_ID,
                    b.Booking_Date,
                    b.Booking_Time,
                    b.Total_Price,
                    b.completedAt,
                    DATEDIFF(day, b.completedAt, GETDATE()) AS Days_Since_Completion,
                    u.User_ID,
                    u.First_Name + ' ' + u.Last_Name AS User_Name,
                    u.Email AS User_Email,
                    u.Phone AS User_Phone,
                    t.Technician_ID,
                    t.First_Name + ' ' + t.Last_Name AS Technician_Name,
                    at.nameEN AS Appliance_Type,
                    p.[Status] AS Payment_Status,
                    p.Payment_Method
                FROM Booking b
                JOIN [User] u ON b.UserID = u.User_ID
                JOIN Technician t ON b.Technician_ID = t.Technician_ID
                JOIN Appliance_Type at ON b.Appliance_Type_ID = at.Appliance_Type_ID
                LEFT JOIN Payment p ON b.Booking_ID = p.Booking_ID
                WHERE b.[Status] = 'completed'
                    AND (p.[Status] IS NULL OR p.[Status] = 'pending')
                    AND DATEDIFF(day, b.completedAt, GETDATE()) >= @days
                ORDER BY b.completedAt ASC
            `);

        res.status(200).json({
            message: `Found ${result.recordset.length} completed bookings unpaid for ${days}+ days.`,
            count: result.recordset.length,
            data: result.recordset
        });
    } catch (error) {
        console.error("Error fetching completed unpaid bookings:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
});

/**
 * Get bookings accepted but not completed for a long time
 * GET /api/admin/bookings/accepted-incomplete?days=3
 */
const getAcceptedIncompleteBookings = asyncHandler(async (req, res) => {
    const { days = 3 } = req.query;

    try {
        const pool = getPool();

        const result = await pool.request()
            .input("days", sql.Int, parseInt(days))
            .query(`
                SELECT 
                    b.Booking_ID,
                    b.Booking_Date,
                    b.Booking_Time,
                    b.Total_Price,
                    b.[Status],
                    b.modifiedAt,
                    DATEDIFF(day, b.modifiedAt, GETDATE()) AS Days_Since_Acceptance,
                    u.User_ID,
                    u.First_Name + ' ' + u.Last_Name AS User_Name,
                    u.Email AS User_Email,
                    u.Phone AS User_Phone,
                    t.Technician_ID,
                    t.First_Name + ' ' + t.Last_Name AS Technician_Name,
                    t.Phone AS Technician_Phone,
                    at.nameEN AS Appliance_Type
                FROM Booking b
                JOIN [User] u ON b.UserID = u.User_ID
                JOIN Technician t ON b.Technician_ID = t.Technician_ID
                JOIN Appliance_Type at ON b.Appliance_Type_ID = at.Appliance_Type_ID
                WHERE b.[Status] IN ('confirmed', 'in_progress')
                    AND b.modifiedAt IS NOT NULL
                    AND DATEDIFF(day, b.modifiedAt, GETDATE()) >= @days
                ORDER BY b.modifiedAt ASC
            `);

        res.status(200).json({
            message: `Found ${result.recordset.length} accepted bookings incomplete for ${days}+ days.`,
            count: result.recordset.length,
            data: result.recordset
        });
    } catch (error) {
        console.error("Error fetching accepted incomplete bookings:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
});

/**
 * Get bookings that are paid but not completed and past scheduled date
 * GET /api/admin/bookings/paid-overdue
 */
const getPaidOverdueBookings = asyncHandler(async (req, res) => {
    try {
        const pool = getPool();

        const result = await pool.request()
            .query(`
                SELECT 
                    b.Booking_ID,
                    b.Booking_Date,
                    b.Booking_Time,
                    b.Total_Price,
                    b.[Status],
                    DATEDIFF(day, b.Booking_Date, GETDATE()) AS Days_Overdue,
                    u.User_ID,
                    u.First_Name + ' ' + u.Last_Name AS User_Name,
                    u.Email AS User_Email,
                    u.Phone AS User_Phone,
                    t.Technician_ID,
                    t.First_Name + ' ' + t.Last_Name AS Technician_Name,
                    t.Phone AS Technician_Phone,
                    at.nameEN AS Appliance_Type,
                    p.Amount AS Paid_Amount,
                    p.Payment_Method,
                    p.Transaction_ID
                FROM Booking b
                JOIN [User] u ON b.UserID = u.User_ID
                LEFT JOIN Technician t ON b.Technician_ID = t.Technician_ID
                JOIN Appliance_Type at ON b.Appliance_Type_ID = at.Appliance_Type_ID
                JOIN Payment p ON b.Booking_ID = p.Booking_ID
                WHERE b.[Status] != 'completed'
                    AND b.[Status] != 'cancelled'
                    AND p.[Status] = 'completed'
                    AND b.Booking_Date < CAST(GETDATE() AS DATE)
                ORDER BY b.Booking_Date ASC
            `);

        res.status(200).json({
            message: `Found ${result.recordset.length} paid bookings that are overdue.`,
            count: result.recordset.length,
            data: result.recordset
        });
    } catch (error) {
        console.error("Error fetching paid overdue bookings:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
});

// ========================================
// TECHNICIAN MANAGEMENT
// ========================================

/**
 * Get technicians with low ratings (<=3 stars)
 * GET /api/admin/technicians/low-rated?threshold=3
 */
const getLowRatedTechnicians = asyncHandler(async (req, res) => {
    const { threshold = 3 } = req.query;

    try {
        const pool = getPool();

        const result = await pool.request()
            .input("threshold", sql.Decimal(3, 2), parseFloat(threshold))
            .query(`
                SELECT 
                    t.Technician_ID,
                    t.First_Name + ' ' + t.Last_Name AS Technician_Name,
                    t.Email,
                    t.Phone,
                    ISNULL(AVG(CAST(r.Rating_Score AS DECIMAL(3,2))), 0) AS Average_Rating,
                    t.Total_Jobs,
                    t.Verified,
                    t.isActive,
                    COUNT(r.Rating_ID) AS Total_Reviews
                FROM Technician t
                LEFT JOIN Rating r ON t.Technician_ID = r.Technician_ID
                GROUP BY t.Technician_ID, t.First_Name, t.Last_Name, t.Email, t.Phone, 
                         t.Total_Jobs, t.Verified, t.isActive
                HAVING ISNULL(AVG(CAST(r.Rating_Score AS DECIMAL(3,2))), 0) <= @threshold
                    AND ISNULL(AVG(CAST(r.Rating_Score AS DECIMAL(3,2))), 0) > 0
                ORDER BY AVG(CAST(r.Rating_Score AS DECIMAL(3,2))) ASC
            `);

        res.status(200).json({
            message: `Found ${result.recordset.length} technicians with rating ≤ ${threshold} stars.`,
            count: result.recordset.length,
            data: result.recordset
        });
    } catch (error) {
        console.error("Error fetching low-rated technicians:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
});

/**
 * Get high-performance technicians (>3 stars)
 * GET /api/admin/technicians/high-performers?threshold=3
 */
const getHighPerformanceTechnicians = asyncHandler(async (req, res) => {
    const { threshold = 3 } = req.query;

    try {
        const pool = getPool();

        const result = await pool.request()
            .input("threshold", sql.Decimal(3, 2), parseFloat(threshold))
            .query(`
                SELECT 
                    t.Technician_ID,
                    t.First_Name + ' ' + t.Last_Name AS Technician_Name,
                    t.Email,
                    t.Phone,
                    ISNULL(AVG(CAST(r.Rating_Score AS DECIMAL(3,2))), 0) AS Average_Rating,
                    t.Total_Jobs,
                    t.Verified,
                    COUNT(r.Rating_ID) AS Total_Reviews
                FROM Technician t
                LEFT JOIN Rating r ON t.Technician_ID = r.Technician_ID
                GROUP BY t.Technician_ID, t.First_Name, t.Last_Name, t.Email, t.Phone, 
                         t.Total_Jobs, t.Verified
                HAVING ISNULL(AVG(CAST(r.Rating_Score AS DECIMAL(3,2))), 0) > @threshold
                ORDER BY AVG(CAST(r.Rating_Score AS DECIMAL(3,2))) DESC, t.Total_Jobs DESC
            `);

        res.status(200).json({
            message: `Found ${result.recordset.length} high-performing technicians (> ${threshold} stars).`,
            count: result.recordset.length,
            data: result.recordset
        });
    } catch (error) {
        console.error("Error fetching high-performance technicians:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
});

/**
 * Get unverified technicians
 * GET /api/admin/technicians/unverified
 */
const getUnverifiedTechnicians = asyncHandler(async (req, res) => {
    try {
        const pool = getPool();

        const result = await pool.request()
            .query(`
                SELECT 
                    t.Technician_ID,
                    t.First_Name,
                    t.Last_Name,
                    t.Email,
                    t.Phone,
                    ISNULL(AVG(CAST(r.Rating_Score AS DECIMAL(3,2))), 0) AS Average_Rating,
                    t.Total_Jobs,
                    t.Verified,
                    t.isActive,
                    t.createdAt AS Registration_Date,
                    DATEDIFF(day, t.createdAt, GETDATE()) AS Days_Since_Registration
                FROM Technician t
                LEFT JOIN Rating r ON t.Technician_ID = r.Technician_ID
                WHERE t.Verified = 0
                GROUP BY t.Technician_ID, t.First_Name, t.Last_Name, t.Email, t.Phone, 
                         t.Total_Jobs, t.Verified, t.isActive, t.createdAt
                ORDER BY t.createdAt ASC
            `);

        res.status(200).json({
            message: `Found ${result.recordset.length} unverified technicians.`,
            count: result.recordset.length,
            data: result.recordset
        });
    } catch (error) {
        console.error("Error fetching unverified technicians:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
});

/**
 * Verify a technician
 * PATCH /api/admin/technicians/:technicianId/verify
 */
const verifyTechnician = asyncHandler(async (req, res) => {
    const { technicianId } = req.params;

    try {
        const pool = getPool();

        const result = await pool.request()
            .input("technicianId", sql.Int, technicianId)
            .query(`
                UPDATE Technician
                SET Verified = 1
                OUTPUT INSERTED.Technician_ID, INSERTED.First_Name, INSERTED.Last_Name, INSERTED.Email, INSERTED.Verified
                WHERE Technician_ID = @technicianId
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Technician not found." });
        }

        res.status(200).json({
            message: "Technician verified successfully.",
            data: result.recordset[0]
        });
    } catch (error) {
        console.error("Error verifying technician:", error);
        res.status(500).json({ message: "An unexpected error occurred while verifying the technician." });
    }
});

/**
 * Revoke technician verification
 * PATCH /api/admin/technicians/:technicianId/revoke-verification
 */
const revokeVerification = asyncHandler(async (req, res) => {
    const { technicianId } = req.params;

    try {
        const pool = getPool();

        const result = await pool.request()
            .input("technicianId", sql.Int, technicianId)
            .query(`
                UPDATE Technician
                SET Verified = 0
                OUTPUT INSERTED.Technician_ID, INSERTED.First_Name, INSERTED.Last_Name, INSERTED.Email, INSERTED.Verified
                WHERE Technician_ID = @technicianId
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Technician not found." });
        }

        res.status(200).json({
            message: "Technician verification revoked.",
            data: result.recordset[0]
        });
    } catch (error) {
        console.error("Error revoking verification:", error);
        res.status(500).json({ message: "An unexpected error occurred while revoking verification." });
    }
});

/**
 * Deactivate a technician account
 * PATCH /api/admin/technicians/:technicianId/deactivate
 */
const deactivateTechnician = asyncHandler(async (req, res) => {
    const { technicianId } = req.params;

    try {
        const pool = getPool();

        const result = await pool.request()
            .input("technicianId", sql.Int, technicianId)
            .query(`
                UPDATE Technician
                SET isActive = 0
                OUTPUT INSERTED.Technician_ID, INSERTED.First_Name, INSERTED.Last_Name, INSERTED.Email, INSERTED.isActive
                WHERE Technician_ID = @technicianId
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Technician not found." });
        }

        res.status(200).json({
            message: "Technician account deactivated successfully.",
            data: result.recordset[0]
        });
    } catch (error) {
        console.error("Error deactivating technician:", error);
        res.status(500).json({ message: "An unexpected error occurred while deactivating the technician." });
    }
});

/**
 * Activate a technician account
 * PATCH /api/admin/technicians/:technicianId/activate
 */
const activateTechnician = asyncHandler(async (req, res) => {
    const { technicianId } = req.params;

    try {
        const pool = getPool();

        const result = await pool.request()
            .input("technicianId", sql.Int, technicianId)
            .query(`
                UPDATE Technician
                SET isActive = 1
                OUTPUT INSERTED.Technician_ID, INSERTED.First_Name, INSERTED.Last_Name, INSERTED.Email, INSERTED.isActive
                WHERE Technician_ID = @technicianId
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Technician not found." });
        }

        res.status(200).json({
            message: "Technician account activated successfully.",
            data: result.recordset[0]
        });
    } catch (error) {
        console.error("Error activating technician:", error);
        res.status(500).json({ message: "An unexpected error occurred while activating the technician." });
    }
});

// ========================================
// FINANCIAL REPORTING
// ========================================

/**
 * Get platform financial summary
 * GET /api/admin/financials?startDate=2024-01-01&endDate=2024-12-31
 */
const getFinancialSummary = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const pool = getPool();
        let dateFilter = '';
        const request = pool.request();

        if (startDate) {
            dateFilter += ' AND b.completedAt >= @startDate';
            request.input("startDate", sql.Date, startDate);
        }

        if (endDate) {
            dateFilter += ' AND b.completedAt <= @endDate';
            request.input("endDate", sql.Date, endDate);
        }

        const result = await request.query(`
            SELECT 
                COUNT(b.Booking_ID) AS Total_Completed_Bookings,
                SUM(p.Amount) AS Total_Revenue,
                SUM(p.Platform_Fee) AS Total_Platform_Commission,
                SUM(p.Amount - p.Platform_Fee) AS Total_Technician_Earnings,
                AVG(p.Amount) AS Average_Booking_Value,
                AVG(p.Platform_Fee) AS Average_Commission_Per_Booking
            FROM Booking b
            JOIN Payment p ON b.Booking_ID = p.Booking_ID
            WHERE b.[Status] = 'completed'
                AND p.[Status] = 'completed'
                ${dateFilter}
        `);

        // Get monthly breakdown
        const monthlyResult = await request.query(`
            SELECT 
                FORMAT(b.completedAt, 'yyyy-MM') AS Month,
                COUNT(b.Booking_ID) AS Bookings_Count,
                SUM(p.Amount) AS Revenue,
                SUM(p.Platform_Fee) AS Commission
            FROM Booking b
            JOIN Payment p ON b.Booking_ID = p.Booking_ID
            WHERE b.[Status] = 'completed'
                AND p.[Status] = 'completed'
                ${dateFilter}
            GROUP BY FORMAT(b.completedAt, 'yyyy-MM')
            ORDER BY Month DESC
        `);

        const summary = result.recordset[0];

        res.status(200).json({
            message: "Financial summary retrieved successfully.",
            summary: {
                totalCompletedBookings: summary.Total_Completed_Bookings || 0,
                totalRevenue: parseFloat(summary.Total_Revenue || 0).toFixed(2),
                totalPlatformCommission: parseFloat(summary.Total_Platform_Commission || 0).toFixed(2),
                totalTechnicianEarnings: parseFloat(summary.Total_Technician_Earnings || 0).toFixed(2),
                averageBookingValue: parseFloat(summary.Average_Booking_Value || 0).toFixed(2),
                averageCommissionPerBooking: parseFloat(summary.Average_Commission_Per_Booking || 0).toFixed(2)
            },
            monthlyBreakdown: monthlyResult.recordset.map(record => ({
                month: record.Month,
                bookingsCount: record.Bookings_Count,
                revenue: parseFloat(record.Revenue).toFixed(2),
                commission: parseFloat(record.Commission).toFixed(2)
            })),
            filters: {
                startDate: startDate || null,
                endDate: endDate || null
            }
        });
    } catch (error) {
        console.error("Error fetching financial summary:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
});

// ========================================
// ANALYTICS
// ========================================

/**
 * Get user details with contact info
 * GET /api/admin/users/:userId
 */
const getUserDetails = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
        const pool = getPool();

        const result = await pool.request()
            .input("userId", sql.Int, userId)
            .query(`
                SELECT 
                    u.User_ID,
                    u.First_Name,
                    u.Last_Name,
                    u.Email,
                    u.Phone,
                    u.City,
                    u.Building_Name,
                    u.Building_Floor,
                    u.Postal_Code,
                    u.isActive,
                    u.createdAt,
                    COUNT(b.Booking_ID) AS Total_Bookings,
                    SUM(CASE WHEN b.[Status] = 'completed' THEN 1 ELSE 0 END) AS Completed_Bookings,
                    SUM(CASE WHEN b.[Status] = 'cancelled' THEN 1 ELSE 0 END) AS Cancelled_Bookings
                FROM [User] u
                LEFT JOIN Booking b ON u.User_ID = b.UserID
                WHERE u.User_ID = @userId
                GROUP BY u.User_ID, u.First_Name, u.Last_Name, u.Email, u.Phone, 
                         u.City, u.Building_Name, u.Building_Floor, u.Postal_Code, u.isActive, u.createdAt
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({
            message: "User details retrieved successfully.",
            data: result.recordset[0]
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
});

/**
 * Get technician details with contact info
 * GET /api/admin/technicians/:technicianId
 */
/**
 * Get all technicians with filtering and search capabilities
 * GET /api/admin/technicians?status=all&verified=all&search=&page=1&limit=20
 */
const getAllTechnicians = asyncHandler(async (req, res) => {
    const { 
        status = 'all',      // 'all', 'active', 'inactive'
        verified = 'all',    // 'all', 'verified', 'unverified'
        search = '',         // Search by name or email
        page = 1,
        limit = 20
    } = req.query;

    try {
        const pool = getPool();
        const offset = (parseInt(page) - 1) * parseInt(limit);

        // Build WHERE clauses
        let whereConditions = [];
        const request = pool.request();

        if (status !== 'all') {
            whereConditions.push(status === 'active' ? 't.isActive = 1' : 't.isActive = 0');
        }

        if (verified !== 'all') {
            whereConditions.push(verified === 'verified' ? 't.Verified = 1' : 't.Verified = 0');
        }

        if (search) {
            whereConditions.push(`(t.First_Name LIKE @search OR t.Last_Name LIKE @search OR t.Email LIKE @search)`);
            request.input("search", sql.VarChar, `%${search}%`);
        }

        const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

        // Get total count
        const countResult = await request.query(`
            SELECT COUNT(*) as total
            FROM Technician t
            ${whereClause}
        `);
        const totalCount = countResult.recordset[0].total;

        // Get technicians with details
        request.input("limit", sql.Int, parseInt(limit));
        request.input("offset", sql.Int, offset);

        const result = await request.query(`
            SELECT 
                t.Technician_ID,
                t.First_Name,
                t.Last_Name,
                t.Email,
                t.Phone,
                ISNULL(AVG(CAST(r.Rating_Score AS DECIMAL(3,2))), 0) AS Average_Rating,
                t.Total_Jobs,
                t.Verified,
                t.isActive,
                t.createdAt,
                COUNT(DISTINCT b.Booking_ID) AS Total_Bookings,
                COUNT(DISTINCT CASE WHEN b.[Status] = 'completed' THEN b.Booking_ID END) AS Completed_Bookings,
                COUNT(DISTINCT ts.Category_ID) AS Specialties_Count,
                COUNT(DISTINCT tsa.Area_ID) AS Service_Areas_Count
            FROM Technician t
            LEFT JOIN Booking b ON t.Technician_ID = b.Technician_ID
            LEFT JOIN Technician_Category ts ON t.Technician_ID = ts.Technician_ID
            LEFT JOIN Technician_Service_Area tsa ON t.Technician_ID = tsa.Technician_ID
            LEFT JOIN Rating r ON t.Technician_ID = r.Technician_ID
            ${whereClause}
            GROUP BY t.Technician_ID, t.First_Name, t.Last_Name, t.Email, t.Phone, 
                     t.Total_Jobs, t.Verified, t.isActive, t.createdAt
            ORDER BY t.createdAt DESC
            OFFSET @offset ROWS
            FETCH NEXT @limit ROWS ONLY
        `);

        res.status(200).json({
            message: "Technicians retrieved successfully.",
            data: result.recordset,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: totalCount,
                pages: Math.ceil(totalCount / parseInt(limit))
            }
        });
    } catch (error) {
        console.error("Error fetching all technicians:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
});

const getTechnicianDetails = asyncHandler(async (req, res) => {
    const { technicianId } = req.params;

    try {
        const pool = getPool();

        const result = await pool.request()
            .input("technicianId", sql.Int, technicianId)
            .query(`
                SELECT 
                    t.Technician_ID,
                    t.First_Name,
                    t.Last_Name,
                    t.Email,
                    t.Phone,
                    ISNULL(AVG(CAST(r.Rating_Score AS DECIMAL(3,2))), 0) AS Average_Rating,
                    t.Total_Jobs,
                    t.Verified,
                    t.isActive,
                    t.createdAt,
                    COUNT(DISTINCT b.Booking_ID) AS Total_Bookings,
                    COUNT(DISTINCT CASE WHEN b.[Status] = 'completed' THEN b.Booking_ID END) AS Completed_Bookings,
                    COUNT(DISTINCT ts.Category_ID) AS Specialties_Count,
                    COUNT(DISTINCT tsa.Area_ID) AS Service_Areas_Count
                FROM Technician t
                LEFT JOIN Booking b ON t.Technician_ID = b.Technician_ID
                LEFT JOIN Technician_Category ts ON t.Technician_ID = ts.Technician_ID
                LEFT JOIN Technician_Service_Area tsa ON t.Technician_ID = tsa.Technician_ID
                LEFT JOIN Rating r ON t.Technician_ID = r.Technician_ID
                WHERE t.Technician_ID = @technicianId
                GROUP BY t.Technician_ID, t.First_Name, t.Last_Name, t.Email, t.Phone, 
                         t.Total_Jobs, t.Verified, t.isActive, t.createdAt
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Technician not found." });
        }

        res.status(200).json({
            message: "Technician details retrieved successfully.",
            data: result.recordset[0]
        });
    } catch (error) {
        console.error("Error fetching technician details:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
});

/**
 * Get booking counts by appliance type
 * GET /api/admin/analytics/bookings-by-type?startDate=2024-01-01&endDate=2024-12-31
 */
const getBookingCountsByType = asyncHandler(async (req, res) => {
    const { startDate, endDate, status } = req.query;

    try {
        const pool = getPool();
        let dateFilter = '';
        let statusFilter = '';
        const request = pool.request();

        if (startDate) {
            dateFilter += ' AND b.Booking_Date >= @startDate';
            request.input("startDate", sql.Date, startDate);
        }

        if (endDate) {
            dateFilter += ' AND b.Booking_Date <= @endDate';
            request.input("endDate", sql.Date, endDate);
        }

        if (status) {
            statusFilter = ' AND b.[Status] = @status';
            request.input("status", sql.VarChar, status);
        }

        const result = await request.query(`
            SELECT 
                ac.Category_ID,
                ac.NameEN AS Category_Name,
                at.Appliance_Type_ID,
                at.nameEN AS Type_Name,
                at.Base_Price,
                COUNT(b.Booking_ID) AS Total_Bookings,
                SUM(CASE WHEN b.[Status] = 'completed' THEN 1 ELSE 0 END) AS Completed_Bookings,
                SUM(CASE WHEN b.[Status] = 'cancelled' THEN 1 ELSE 0 END) AS Cancelled_Bookings,
                AVG(b.Total_Price) AS Average_Price
            FROM Appliance_Type at
            JOIN Appliance_Category ac ON at.Category_ID = ac.Category_ID
            LEFT JOIN Booking b ON at.Appliance_Type_ID = b.Appliance_Type_ID
                ${dateFilter}
                ${statusFilter}
            GROUP BY ac.Category_ID, ac.NameEN, at.Appliance_Type_ID, at.nameEN, at.Base_Price
            ORDER BY Total_Bookings DESC
        `);

        res.status(200).json({
            message: "Booking counts by type retrieved successfully.",
            count: result.recordset.length,
            data: result.recordset,
            filters: {
                startDate: startDate || null,
                endDate: endDate || null,
                status: status || 'all'
            }
        });
    } catch (error) {
        console.error("Error fetching booking counts by type:", error);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
});

module.exports = {
    // Authentication
    loginAdmin,
    logoutAdmin,
    
    // Appliance management
    addCategory,
    addApplianceType,
    updateApplianceTypePrice,
    
    // Booking monitoring
    getCompletedUnpaidBookings,
    getAcceptedIncompleteBookings,
    getPaidOverdueBookings,
    
    // Technician management
    getAllTechnicians,
    getLowRatedTechnicians,
    getHighPerformanceTechnicians,
    getUnverifiedTechnicians,
    verifyTechnician,
    revokeVerification,
    deactivateTechnician,
    activateTechnician,
    
    // Financial reporting
    getFinancialSummary,
    
    // Analytics
    getUserDetails,
    getTechnicianDetails,
    getBookingCountsByType
};
