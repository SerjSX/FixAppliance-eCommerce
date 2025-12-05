/**
 * This controller handles everything related to booking and the user:
 *  1. User requesting a booking
 *  2. User paying a booking
 *  3. User rating a booking
 *  4. user getting their bookings (pending/confirmed/in progress/completed/cancelled)
 */

const asyncHandler = require("express-async-handler");


// sql needed for the type definitions in .input
// getPool is to do queries
const { getPool, sql } = require("../config/database");


/**
 * Helper function to get bookings by status for a user
 * Reduces code duplication across the 5 getXBookings functions
 * @param {number} userID - The user's ID
 * @param {string} status - The booking status to filter by
 * @param {string} statusDisplayName - Human-readable status name for messages
 * @returns {Promise<{success: boolean, data?: object, error?: string, statusCode: number}>}
 */
const getBookingsByStatus = async (userID, status, statusDisplayName) => {
    try {
        const pool = getPool();

        const bookings = await pool.request()
            .input("userID", sql.Int, userID)
            .input("status", sql.VarChar, status)
            .query(`
                SELECT 
                    Booking.Booking_ID, 
                    Booking.Booking_Date AS "Scheduled Date", 
                    Booking.Booking_Time AS "Scheduled Time", 
                    Booking.Total_Price AS "Total Price", 
                    Booking.createdAt AS "Created At",
                    Appliance_Type.nameEN AS "Appliance's Name (EN)", 
                    Appliance_Type.nameAR AS "Appliance's Name (AR)",
                    Booking.Issue_Description AS "Issue Description",
                    Technician.First_Name AS "Technician's First Name",
                    Technician.Last_Name AS "Technician's Last Name",
                    Technician.Phone AS "Technician's Phone Number",
                    Payment.[Status] AS "Payment Status",
                    Payment.Payment_Method AS "Payment Method",
                    Rating.Rating_Score AS "Rating Score",
                    Rating.Review_Text AS "Review Text"
                FROM Booking
                LEFT JOIN Technician ON Booking.Technician_ID = Technician.Technician_ID
                LEFT JOIN Payment ON Booking.Booking_ID = Payment.Booking_ID
                LEFT JOIN Rating ON Booking.Booking_ID = Rating.Booking_ID
                JOIN Appliance_Type ON Booking.Appliance_Type_ID = Appliance_Type.Appliance_Type_ID
                WHERE Booking.UserID = @userID AND Booking.[Status] = @status
                ORDER BY Booking.Booking_Date ASC, Booking.Booking_Time ASC
            `);

        if (bookings.recordset.length === 0) {
            return {
                success: true,
                statusCode: 200,
                data: {
                    message: `You don't have any ${statusDisplayName} bookings.`,
                    count: 0,
                    bookings: []
                }
            };
        }

        return {
            success: true,
            statusCode: 200,
            data: {
                message: `You have ${statusDisplayName} bookings!`,
                count: bookings.recordset.length,
                bookings: bookings.recordset
            }
        };
    } catch (error) {
        console.error(`Unexpected error occurred when trying to fetch ${statusDisplayName} bookings:`, error);
        return {
            success: false,
            statusCode: 500,
            error: `Unexpected error occurred when trying to fetch your ${statusDisplayName} bookings.`
        };
    }
};


// User requesting a new booking
const userRequestBooking = asyncHandler(async (req, res) => {
    // Getting all user input from the request's body and the userID as well passed by the middleware that validates user's login credentials
    const { applianceTypeID, issueDescription, bookingDate, bookingTime, paymentMethod } = req.body;
    const userID = req.userID;

    // If any of the inputs arent provided then throw a 400 error
    if (!applianceTypeID || !issueDescription || !bookingDate || !bookingTime || !paymentMethod) {
        return res.status(400).json({message: "All booking details are required: the appliance, a description for the issue, date and time."});
    }

    // Validate the payment method such that it's one of the accepted ones
    const validPaymentMethods = ['cash', 'credit_card', 'debit_card', 'whish', 'omt'];
    if (!validPaymentMethods.includes(paymentMethod)) {
        return res.status(400).json({message: "Invalid payment method. Choose either cash, credit_card, debit_card, whish or omt."});
    }

    // Validating the time format passed using regex, if doesnt pass then throw a 400 of invalid time format
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    const cleanTime = bookingTime.trim();

    if (!timeRegex.test(cleanTime)) {
        return res.status(400).json({message: "Invalid time format. Use HH:MM:SS (e.g., 14:30:00)"});
    }

    try {
        const pool = getPool();

        // Verifying the appliance type that was passed through the body
        // Has to be active and has to match the appliance type ID passed by the user
        const applianceType = await pool.request()
            .input("applianceTypeID", sql.Int, applianceTypeID)
            .query(`
                SELECT Base_Price 
                FROM Appliance_Type
                WHERE Appliance_Type_ID = @applianceTypeID AND isActive = 1
                `);

        // If no result returned from the appliance type check query then that means the appliance type id passed
        // is invalid, throw a 404 error
        if (applianceType.recordset.length === 0) {
            return res.status(404).json({message: "Invalid appliance type chosen."});
        }

        // Getting the base price of the appliance type chosen to specify the price of the booking
        const basePrice = applianceType.recordset[0].Base_Price;

        // Calculating the platform fee for the payment table based on the base price
        const commissionRate = 15.00;
        const platformFee = (basePrice * commissionRate) / 100;

        // Starting a transaction so the booking and payment are created together
        const transaction = pool.transaction();
        await transaction.begin();

        try {
            // Creating booking data by padding the needed column data
            const bookingResult = await transaction.request()
                .input("userID", sql.Int, userID)
                .input("applianceTypeID", sql.Int, applianceTypeID)
                .input("issueDescription", sql.NVarChar, issueDescription)
                .input("bookingDate", sql.Date, bookingDate)
                .input("bookingTime", sql.VarChar(8), cleanTime)
                .input("basePrice", sql.Decimal(10, 2), basePrice)
                .query(`
            INSERT INTO Booking (UserID, Appliance_Type_ID, Issue_Description, Booking_Date, Booking_Time, [Status], Total_Price)
            OUTPUT INSERTED.Booking_ID -- just so we could use the bookingID later using the result of this query.
            VALUES(@userID, @applianceTypeID, @issueDescription, @bookingDate, CAST(@bookingTime AS TIME), 'pending', @basePrice)
            `);

            // Getting the booking id from the above query's result (it outputs the booking id)
            const bookingID = bookingResult.recordset[0].Booking_ID;

            // Insert the payment data and set it to pending status until the user confirms the payment
            await transaction.request()
                .input("bookingID", sql.Int, bookingID)
                .input("amount", sql.Decimal(10, 2), basePrice)
                .input("paymentMethod", sql.VarChar, paymentMethod)
                .input("commissionRate", sql.Decimal(5, 2), commissionRate)
                .input("platformFee", sql.Decimal(10, 2), platformFee)
                .query(`
                        INSERT INTO Payment (Booking_ID, Amount, Payment_Method, [Status], Commission_Rate, Platform_Fee)
                        VALUES(@bookingID, @amount, @paymentMethod, 'pending', @commissionRate, @platformFee)
                        `);

            // Comits the changes, which inserts the booking and the payment data of this user's requested booking
            await transaction.commit();

            // Sending a 201 success message with some information passed
            res.status(201).json({
                message: "Successfully booked! A technician will be assigned soon.",
                bookingID: bookingID,
                totalPrice: basePrice,
                paymentMethod: paymentMethod,
                paymentStatus: "pending"
            });
        } catch (error) {
            // rollback if something goes wrong
            await transaction.rollback();
            throw error;
        }

    } catch (error) {
        console.error("Unexpected error occurred when booking:", error);

        // If any data is wrong then this error is thrown (wrong appliance type and wrong/invalid date)
        if (error.number === 547) {
            return res.status(400).json({message: "Invalid booking data. Please check your appliance type, date, and ensure it's today or in the future."});
        }

        res.status(500).json({message: "An unexpected error occurred while booking."});
    }
});

// User paying a booking functionality
const userPayBooking = asyncHandler(async (req, res) => {
    // Getting the booking id and the transaction id (if non-cash method) from the body, and the user id passed by the authentication middleware
    const { bookingID, transactionID } = req.body;
    const userID = req.userID;

    // If no bookingID is passed then throw a 400 error. Not passing the transactionID is fine if the method is cash.
    if (!bookingID) {
        return res.status(400).json({message: "Booking ID must be passed."});
    }

    try {
        const pool = getPool();

        // Checking if the bookingID passed is valid
        const checkBooking = await pool.request()
            .input("bookingID", sql.Int, bookingID)
            .input("userID", sql.Int, userID)
            .query(`
                SELECT b.Booking_ID, b.[Status], b.UserID, p.Payment_ID, p.[Status] AS Payment_Status, p.Payment_Method
                FROM Booking b
                JOIN Payment p ON b.Booking_ID = p.Booking_ID
                WHERE b.Booking_ID = @bookingID
                `);

        // If the above select query got no result then the booking is not found, throws a 404
        if (checkBooking.recordset.length === 0) {
            return res.status(404).json({message: "Booking not found"});
        }

        // Getting the first row of the returned result
        const booking = checkBooking.recordset[0];

        // Checking if the booking's userID matches the current logged in's userID, if it doesn't then throw a 403
        // since the user isn't authorized to pay for this booking.
        if (booking.UserID !== userID) {
            return res.status(403).json({message: "You are not authorized to pay for this booking since it's not yours."});
        }

        // Status checking: cannot pay a booking that's cancelled/completed
        if (booking.Status === 'cancelled') {
            return res.status(400).json({message: "Cannot pay for a cancelled booking!"});
        }

        if (booking.Status === 'completed') {
            return res.status(400).json({message: "Cannot pay for a booking that's already paid for."});
        }

        // If the booking is already paid then the user cant pay it again!
        if (booking.Payment_Status === 'completed') {
            return res.status(400).json({message: "This booking has already been paid."});
        }

        // Ensuring that transactionID is passed when the payment method is anything but a cash method
        // If there is no transactionID, and the payment method isnt cash, then throw a 400 error
        const transactionIdMethods = ['credit_card', 'debit_card', 'whish', 'omt'];
        if (transactionIdMethods.includes(booking.Payment_Method) && !transactionID) {
            return res.status(400).json({message: "Transaction ID is needed for this payment method!"});
        }

        // If all's good then update the Payment row of the bookingID concerned and change the status to 
        // completed, with setting the transactionID (if available) and setting the paidAt to the current date.
        await pool.request()
            .input("bookingID", sql.Int, bookingID)
            .input("transactionID", sql.VarChar, transactionID || null)
            .query(`
                UPDATE Payment
                SET [Status] = 'completed',
                    Transaction_ID = @transactionID,
                    paidAt = GETDATE()
                WHERE Booking_ID = @bookingID
                `);

        // Send a success message with the booking id and payment status as completed
        res.status(200).json({
            message: "Payment completed.",
            bookingID: bookingID,
            paymentStatus: "completed"
        });
    } catch (error) {
        // Throws an error in case the booking id is invalid, or any other unexpected issue that occurred
        console.error("Unexpected error occurred when processing payment:", error);

        if (error.number === 547) {
            return res.status(400).json({message: "Invalid booking ID."});
        }

        res.status(500).json({message: "An unexpected error occurred when processing the payment."});
    }
})

// User rating a booking functionality
const userRateBooking = asyncHandler(async (req, res) => {
    // Getting the needed input from the passed body and the userID passed from the middleware
    const { bookingID, ratingScore, reviewText } = req.body;
    const userID = req.userID;

    // If the needed values are empty then throw a 400 error
    if (!bookingID || !ratingScore || !reviewText) {
        return res.status(400).json({message: "You have to pass a booking ID, rating score and review text to rate a booking."});
    }

    // If the rating score isn't a number, or isn't between 1 and 5, then throw an error 400
    if (!Number.isInteger(ratingScore) || ratingScore < 1 || ratingScore > 5) {
        return res.status(400).json({message: "Rating score must be a number between 1 and 5!"});
    }

    // If the review text is too short then throw a 400 error
    if (reviewText.trim().length < 15) {
        return res.status(400).json({message: "Please write your review text longer, that's too short."});
    }

    try {
        const pool = getPool();

        // Check if the booking id passed exists
        const checkBooking = await pool.request()
            .input("bookingID", sql.Int, bookingID)
            .input("userID", sql.Int, userID)
            .query(`
                SELECT b.Booking_ID, b.UserID, b.Technician_ID, b.[Status]
                FROM Booking b
                WHERE b.Booking_ID = @bookingID
                `);

        // If nothing was returned from the above query then throw a 404 because the booking isn't found
        if (checkBooking.recordset.length === 0) {
            return res.status(404).json({message: "Booking not found."});
        }

        // Get the first booking row
        const booking = checkBooking.recordset[0];

        // Check if the booking's user id matches the userid of the logged in user, if not then throw a 403 error
        if (booking.UserID !== userID) {
            return res.status(403).json({message: "You are not authorized to review this booking since it's not yours!"});
        }

        //If the booking doesn't have a technician then the user cant rate it
        if (!booking.Technician_ID) {
            return res.status(400).json({message: "Cannot rate a booking without an assigned technician."});
        }

        // If the booking isn't completed then the user cant rate it
        if (booking.Status !== 'completed') {
            return res.status(400).json({message: "You can only rate completed bookings."});
        }

        // Checking if a rating already exists for the concerned booking
        const existingRating = await pool.request()
            .input("bookingID", sql.Int, bookingID)
            .query(`SELECT Rating_ID 
                    FROM Rating 
                    WHERE Booking_ID = @bookingID`);

        // If yes then throw a 409 error
        if (existingRating.recordset.length > 0) {
            return res.status(409).json({message: "This booking has already been rated before!"});
        }

        // If all's good then insert the rating data with the information taken from the body
        await pool.request()
            .input("bookingID", sql.Int, bookingID)
            .input("userID", sql.Int, userID)
            .input("technicianID", sql.Int, booking.Technician_ID)
            .input("ratingScore", sql.SmallInt, ratingScore)
            .input("reviewText", sql.NVarChar, reviewText.trim())
            .query(`
                INSERT INTO Rating (Booking_ID, User_ID, Technician_ID, Rating_Score, Review_Text)
                VALUES(@bookingID, @userID, @technicianID, @ratingScore, @reviewText)
                `);

        // Send a 201 success message
        res.status(201).json({
            message: "Successfully rated this booking!",
            bookingID: bookingID,
            technicianID: booking.Technician_ID,
            ratingScore: ratingScore
        });
    } catch (error) {
        console.error("Unexpected error occurred when trying to rate a booking:", error);

        // Constraint violation handling
        if (error.number === 547) {
            return res.status(400).json({message: "Invalid rating data, please check your inputs."});
        }

        // unique constraint violation (for duplicate ratings)
        if (error.number === 2627) {
            return res.status(409).json({message: "This booking has already been rated."});
        }

        res.status(500).json({message: "Unexpected error occurred when trying to rate a booking."});
    }
})

// The below methods get different types of bookings of the user: pending, confirmed, in progress, completed, cancelled
// All use the helper function getBookingsByStatus to reduce code duplication
const getPendingBookings = asyncHandler(async (req, res) => {
    const userID = req.userID;
    const result = await getBookingsByStatus(userID, 'pending', 'pending');
    
    if (result.success) {
        return res.status(result.statusCode).json(result.data);
    }
    return res.status(result.statusCode).json({ message: result.error });
});

const getConfirmedBookings = asyncHandler(async (req, res) => {
    const userID = req.userID;
    const result = await getBookingsByStatus(userID, 'confirmed', 'confirmed');
    
    if (result.success) {
        return res.status(result.statusCode).json(result.data);
    }
    return res.status(result.statusCode).json({ message: result.error });
});

const getInProgressBookings = asyncHandler(async (req, res) => {
    const userID = req.userID;
    const result = await getBookingsByStatus(userID, 'in_progress', 'in progress');
    
    if (result.success) {
        return res.status(result.statusCode).json(result.data);
    }
    return res.status(result.statusCode).json({ message: result.error });
});

const getCompletedBookings = asyncHandler(async (req, res) => {
    const userID = req.userID;
    const result = await getBookingsByStatus(userID, 'completed', 'completed');
    
    if (result.success) {
        return res.status(result.statusCode).json(result.data);
    }
    return res.status(result.statusCode).json({ message: result.error });
});

const getCancelledBookings = asyncHandler(async (req, res) => {
    const userID = req.userID;
    const result = await getBookingsByStatus(userID, 'cancelled', 'cancelled');
    
    if (result.success) {
        return res.status(result.statusCode).json(result.data);
    }
    return res.status(result.statusCode).json({ message: result.error });
});

// User cancelling a booking functionality
const userCancelBooking = asyncHandler(async (req, res) => {
    const { bookingID } = req.body;
    const userID = req.userID;

    // If no bookingID is passed then throw a 400 error
    if (!bookingID) {
        return res.status(400).json({message: "Booking ID must be passed."});
    }

    try {
        const pool = getPool();

        // Checking if the bookingID passed is valid and belongs to the user
        const checkBooking = await pool.request()
            .input("bookingID", sql.Int, bookingID)
            .input("userID", sql.Int, userID)
            .query(`
                SELECT b.Booking_ID, b.[Status], b.UserID, p.Payment_ID, p.[Status] AS Payment_Status
                FROM Booking b
                LEFT JOIN Payment p ON b.Booking_ID = p.Booking_ID
                WHERE b.Booking_ID = @bookingID
            `);

        // If no result returned then the booking is not found
        if (checkBooking.recordset.length === 0) {
            return res.status(404).json({message: "Booking not found."});
        }

        const booking = checkBooking.recordset[0];

        // Checking if the booking belongs to the logged in user
        if (booking.UserID !== userID) {
            return res.status(403).json({message: "You are not authorized to cancel this booking since it's not yours."});
        }

        // Can only cancel pending bookings
        if (booking.Status !== 'pending') {
            return res.status(400).json({message: `Cannot cancel a booking that is ${booking.Status}. Only pending bookings can be cancelled.`});
        }

        // If payment is already completed, cannot cancel
        if (booking.Payment_Status === 'completed') {
            return res.status(400).json({message: "Cannot cancel a booking that has already been paid."});
        }

        // Start a transaction to update booking and delete payment
        const transaction = pool.transaction();
        await transaction.begin();

        try {
            // Update booking status to cancelled
            await transaction.request()
                .input("bookingID", sql.Int, bookingID)
                .query(`
                    UPDATE Booking
                    SET [Status] = 'cancelled',
                        modifiedAt = GETDATE()
                    WHERE Booking_ID = @bookingID
                `);

            // Delete the payment record since booking is cancelled
            await transaction.request()
                .input("bookingID", sql.Int, bookingID)
                .query(`
                    DELETE FROM Payment
                    WHERE Booking_ID = @bookingID
                `);

            await transaction.commit();

            res.status(200).json({
                message: "Booking cancelled successfully.",
                bookingID: bookingID,
                status: "cancelled"
            });
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        console.error("Unexpected error occurred when cancelling booking:", error);
        res.status(500).json({message: "An unexpected error occurred while cancelling the booking."});
    }
});


module.exports = { userRequestBooking, userPayBooking, userRateBooking, userCancelBooking, getPendingBookings, getConfirmedBookings, getInProgressBookings, getCompletedBookings, getCancelledBookings };