const asyncHandler = require("express-async-handler");


// sql needed for the type definitions in .input
// getPool is to do queries
const { getPool, sql } = require("../config/database");


const userRequestBooking = asyncHandler(async (req, res) => {
    const { applianceTypeID, issueDescription, bookingDate, bookingTime } = req.body;
    const userID = req.userID;

    if (!applianceTypeID || !issueDescription || !bookingDate || !bookingTime) {
        return res.status(400).send("All booking details are required: the appliance, a description for the issue, date and time.");
    }

    //Validating the time format
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    const cleanTime = bookingTime.trim();

    if (!timeRegex.test(cleanTime)) {
        return res.status(400).send("Invalid time format. Use HH:MM:SS (e.g., 14:30:00)");
    }

    try {
        const pool = getPool();

        const applianceType = await pool.request()
            .input("applianceTypeID", sql.Int, applianceTypeID)
            .query(`
                SELECT Base_Price 
                FROM Appliance_Type
                WHERE Appliance_Type_ID = @applianceTypeID AND isActive = 1
                `);

        
        if (applianceType.recordset.length === 0) {
            return res.status(404).send("Invalid appliance type chosen.");
        }

        const basePrice = applianceType.recordset[0].Base_Price;
       
        const result = await pool.request()
            .input("userID", sql.Int, userID)
            .input("applianceTypeID", sql.Int, applianceTypeID)
            .input("issueDescription", sql.NVarChar, issueDescription)
            .input("bookingDate", sql.Date, bookingDate)
            .input("bookingTime", sql.VarChar(8), cleanTime)
            .input("basePrice", sql.Decimal(8,2), basePrice)
            .query(`
            INSERT INTO Booking (UserID, Appliance_Type_ID, Issue_Description, Booking_Date, Booking_Time, [Status], Total_Price)
            VALUES(@userID, @applianceTypeID, @issueDescription, @bookingDate, CAST(@bookingTime AS TIME), 'pending', @basePrice)
            `);

        res.status(201).json({
            message: "Successfully booked! A technician will be assigned soon.",
            totalPrice: basePrice
        });
    } catch (error) {
        console.error("Unexpected error occured when booking:", error);

        // Foreign key constraint check
        if (error.number === 547) {
            return res.status(400).send("Invalid appliance type or user ID.");
        }


        // Date related error check
        if (error.message.includes("chk_booking_future_date")) {
            return res.status(400).send("Booking date must be today or in the future.");
        }

        res.status(500).send("An unexpected error occurred while booking. Make sure the booking date/time is either today or in the future.");

    }
});


module.exports = {userRequestBooking};