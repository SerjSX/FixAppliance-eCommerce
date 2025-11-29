/**
 * This controller handles everything related to booking and the technician:
 *  1. Technician accepting a pending booking
 *  2. Technician getting all pending bookings available to accept
 */

const asyncHandler = require("express-async-handler");


// sql needed for the type definitions in .input
// getPool is to do queries
const { getPool, sql } = require("../config/database");


// Technician accepting a pending booking
const acceptPendingBooking = asyncHandler(async (req, res) => {
        // Getting the booking ID from the body and the technician ID passed from the middleware
        const { bookingID } = req.body;
        const technicianID = req.technicianID;

        // If no booking ID is passed, throw a 400 error
        if (!bookingID) {
            return res.status(400).json({message: "You need to pass a booking ID."});
        }

        try {
            const pool = getPool();

            // Check if the booking exists and get its current status and assigned technician
            const checkBooking = await pool.request()
                .input("bookingID", sql.Int, bookingID)
                .query(`
                    SELECT Booking_ID, [Status], Technician_ID
                    FROM Booking
                    WHERE Booking_ID = @bookingID
                    `);

            // If no result returned, the booking doesn't exist
            if (checkBooking.recordset.length === 0) {
                return res.status(404).json({message: "Booking not found."});
            }

            const booking = checkBooking.recordset[0];

            // Check if booking is already assigned to another technician
            if (booking.Technician_ID !== null) {
                return res.status(409).json({message: "This booking is already assigned to another technician."});
            }

            // Check if booking status is pending - only pending bookings can be accepted
            if (booking.Status !== 'pending') {
                return res.status(400).json({message: `This booking is ${booking.Status} and cannot be accepted.`});
            }

            // Update the booking - assign technician and change status to confirmed
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

            // Return success response with booking and technician details
            res.status(200).json({
                message: "Booking accepted successfully.",
                bookingID: bookingID,
                technicianID: technicianID
            });

            
        } catch (error) {
            console.error("Unexpected error occurred when trying to apply booking to technician: ", error);
            
            // Foreign key constraint violation
            if (error.number === 547) {
                return res.status(400).json({message: "Invalid booking or technician ID."});
            }

            res.status(500).json({message: "Unexpected error occurred when trying to set booking to technician."});
        }
})


// Get all pending bookings available for technicians to accept
const getPendingBookings = asyncHandler(async (req, res) => {
    try {
        const pool = getPool();
       
        // Query all pending bookings with user and appliance details
        // Ordered by date and time (earliest first)
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

        // If no pending bookings found, return empty array with informative message
        if (result.recordset.length === 0) {
            return res.status(200).json({
                message: "No pending bookings found.",
                bookings: []
            });
        }

        // Return pending bookings with count
        res.status(200).json({
            message: "There are pending bookings.",
            count: result.recordset.length,
            bookings: result.recordset
        });
    } catch (error) {
        console.error("Unexpected error occurred while fetching pending bookings:", error);
        res.status(500).json({message: "An unexpected error occurred while fetching pending bookings."});
    }
})


module.exports = {getPendingBookings, acceptPendingBooking};