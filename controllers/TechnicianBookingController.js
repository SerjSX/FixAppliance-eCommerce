const asyncHandler = require("express-async-handler");


// sql needed for the type definitions in .input
// getPool is to do queries
const { getPool, sql } = require("../config/database");


const acceptPendingBooking = asyncHandler(async (req, res) => {
        const { bookingID } = req.body;
        const technicianID = req.technicianID;

        if (!bookingID) {
            return res.status(400).send("You need to pass a booking ID.");
        }

        try {
            const pool = getPool();

            const checkBooking = await pool.request()
                .input("bookingID", sql.Int, bookingID)
                .query(`
                    SELECT Booking_ID, [Status], Technician_ID
                    FROM Booking
                    WHERE Booking_ID = @bookingID
                    `);

            if (checkBooking.recordset.length === 0) {
                return res.status(404).send("Booking not found.");
            }

            const booking = checkBooking.recordset[0];
            if (booking.Technician_ID !== null) {
                return res.status(409).send("This booking is already assigned to another technician.");
            }

            if (booking.Status !== 'pending') {
                return res.status(400).send(`This booking is ${booking.Status} and cannot be accepted.`);
            }

            const result = await pool.request()
                .input("bookingID", sql.Int, bookingID)
                .input("technicianID", sql.Int, technicianID)
                .query(`
                    UPDATE Booking
                    SET Technician_ID = @technicianID,
                        [Status] = 'confirmed',
                        modifiedAt = GETDATE()
                    WHERE Booking_ID = @bookingID
                    `);

            res.status(200).json({
                message: "Booking accepted successfully.",
                bookingID: bookingID,
                technicianID: technicianID
            });

            
        } catch (error) {
            console.error("Unexpected error occurred when trying to apply booking to technician: ", error);
            
            if (error.number === 547) {
                return res.status(400).send("Invalid booking or technician ID.");
            }

            res.status(500).send("Unexpected error occurred when trying to set booking to technician.");
        }
})


const getPendingBookings = asyncHandler(async (req, res) => {
    try {
        const pool = getPool();
       
        const result = await pool.request()
            .query(`
                SELECT 
                    Booking.Booking_ID, 
                    Booking.Booking_Date AS "Scheduled Date", 
                    Booking.Booking_Time AS "Scheduled Time", 
                    Booking.Total_Price AS "Total Price", 
                    Appliance_Type.nameEN AS "Appliance's Name (EN)", 
                    Appliance_Type.nameAR AS "Appliance's Name (AR)",
                    Booking.Issue_Description AS "Issue Description",
                    [User].First_Name AS "First Name",
                    [User].Last_Name AS "Last Name", 
                    [User].Phone AS "Phone Number",
                    [User].City AS "City",
                    [User].Street_Address AS "Street Address", 
                    [User].Building_Name AS "Building Name", 
                    [User].Floor AS "Building Floor", 
                    [User].Postal_Code AS "Postal Code"
                FROM Booking
                JOIN [User] ON Booking.UserID = [User].User_ID
                JOIN Appliance_Type ON Booking.Appliance_Type_ID = Appliance_Type.Appliance_Type_ID
                WHERE Booking.[Status] = 'pending'
                ORDER BY Booking.Booking_Date ASC, Booking.Booking_Time ASC
            `);

        if (result.recordset.length === 0) {
            return res.status(200).json({
                message: "No pending bookings found.",
                bookings: []
            });
        }

        res.status(200).json({
            message: "There are pending bookings.",
            count: result.recordset.length,
            bookings: result.recordset
        });
    } catch (error) {
        console.error("Unexpected error occurred while fetching pending bookings:", error);
        res.status(500).send("An unexpected error occurred while fetching pending bookings.");
    }
})


module.exports = {getPendingBookings, acceptPendingBooking};