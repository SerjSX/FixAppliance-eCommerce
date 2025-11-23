const asyncHandler = require("express-async-handler");


// sql needed for the type definitions in .input
// getPool is to do queries
const { getPool, sql } = require("../config/database");


const userRequestBooking = asyncHandler(async (req, res) => {
    const { applianceTypeID, issueDescription, bookingDate, bookingTime, paymentMethod } = req.body;
    const userID = req.userID;

    if (!applianceTypeID || !issueDescription || !bookingDate || !bookingTime || !paymentMethod) {
        return res.status(400).send("All booking details are required: the appliance, a description for the issue, date and time.");
    }

    const validPaymentMethods = ['cash', 'credit_card', 'debit_card', 'whish', 'omt'];
    if (!validPaymentMethods.includes(paymentMethod)) {
        return res.status(400).send("Invalid payment method. Choose either cash, credit_card, debit_card, whish or omt.");
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

        // Calculating the platform fee for the payment table
        const commissionRate = 15.00;
        const platformFee = (basePrice * commissionRate) / 100;

        // Starting a transaction so the booking and payment are created together
        const transaction = pool.transaction();
        await transaction.begin();

        try {
            // Creating booking data
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

            const bookingID = bookingResult.recordset[0].Booking_ID;

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

            await transaction.commit();

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

        if (error.number === 547) {
            return res.status(400).send("Invalid booking data. Please check your appliance type, date, and ensure it's today or in the future.");
        }

        res.status(500).send("An unexpected error occurred while booking.");
    }
});

const userPayBooking = asyncHandler(async (req, res) => {
    const { bookingID, transactionID } = req.body;
    const userID = req.userID;

    if (!bookingID) {
        return res.status(400).send("Booking ID must be passed.");
    }

    try {
        const pool = getPool();

        const checkBooking = await pool.request()
            .input("bookingID", sql.Int, bookingID)
            .input("userID", sql.Int, userID)
            .query(`
                SELECT b.Booking_ID, b.[Status], b.UserID, p.Payment_ID, p.[Status] AS Payment_Status, p.Payment_Method
                FROM Booking b
                JOIN Payment p ON b.Booking_ID = p.Booking_ID
                WHERE b.Booking_ID = @bookingID
                `);

        if (checkBooking.recordset.length === 0) {
            return res.status(404).send("Booking not found");
        }

        const booking = checkBooking.recordset[0];

        if (booking.UserID !== userID) {
            return res.status(403).send("You are not authorized to pay for this booking since it's not yours.");
        }

        if (booking.Status === 'cancelled') {
            return res.status(400).send("Cannot pay for a cancelled booking!");
        }

        if (booking.Status === 'completed') {
            return res.status(400).send("Cannot pay for a booking that's already paid for.");
        }

        if (booking.Payment_Status === 'completed') {
            return res.status(400).send("This booking has already been paid.");
        }

        const transactionIdMethods = ['credit_card', 'debit_card', 'whish', 'omt'];
        if (transactionIdMethods.includes(booking.Payment_Method) && !transactionID) {
            return res.status(400).send("Transaction ID is needed for this payment method!");
        }

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

        res.status(200).json({
            message: "Payment completed.",
            bookingID: bookingID,
            paymentStatus: "completed"
        });
    } catch (error) {
        console.error("Unexpected error occurred when processing payment:", error);

        if (error.number === 547) {
            return res.status(400).send("Invalid booking ID.");
        }

        res.status(500).send("An unexpected error occurred when processing the payment.");
    }
})

const userRateBooking = asyncHandler(async (req, res) => {
    const { bookingID, ratingScore, reviewText } = req.body;
    const userID = req.userID;

    if (!bookingID || !ratingScore || !reviewText) {
        return res.status(400).send("You have to pass a booking ID, rating score and review text to rate a booking.");
    }

    if (!Number.isInteger(ratingScore) || ratingScore < 1 || ratingScore > 5) {
        return res.status(400).send("Rating score must be a number between 1 and 5!");
    }

    if (reviewText.trim().length < 15) {
        return res.status(400).send("Please write your review text longer, that's too short.");
    }

    try {
        const pool = getPool();

        const checkBooking = await pool.request()
            .input("bookingID", sql.Int, bookingID)
            .input("userID", sql.Int, userID)
            .query(`
                SELECT b.Booking_ID, b.UserID, b.Technician_ID, b.[Status]
                FROM Booking b
                WHERE b.Booking_ID = @bookingID
                `);

        if (checkBooking.recordset.length === 0) {
            return res.status(404).send("Booking not found.");
        }

        const booking = checkBooking.recordset[0];

        if (booking.UserID !== userID) {
            return res.status(403).send("You are not authorized to review this booking since it's not yours!");
        }

        if (!booking.Technician_ID) {
            return res.status(400).send("Cannot rate a booking without an assigned technician.");
        }


        if (booking.Status !== 'completed') {
            return res.status(400).send("You can only rate completed bookings.");
        }

        const existingRating = await pool.request()
            .input("bookingID", sql.Int, bookingID)
            .query(`SELECT Rating_ID 
                    FROM Rating 
                    WHERE Booking_ID = @bookingID`);

        if (existingRating.recordset.length > 0) {
            return res.status(409).send("This booking has already been rated before!");
        }

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
            return res.status(400).send("Invalid rating data, please check your inputs.");
        }

        // unique constraint violation (for duplicate ratings)
        if (error.number === 2627) {
            return res.status(409).send("This booking has already been rated.");
        }

        res.status(500).send("Unexpected error occurred when trying to rate a booking.");
    }
})

const getPendingBookings = asyncHandler(async (req, res) => {
    const userID = req.userID;

    try {
        const pool = getPool();

        const bookings = await pool.request()
            .input("userID", sql.Int, userID)
            .query(`
                SELECT 
                    Booking.Booking_ID, 
                    Booking.Booking_Date AS "Scheduled Date", 
                    Booking.Booking_Time AS "Scheduled Time", 
                    Booking.Total_Price AS "Total Price", 
                    Appliance_Type.nameEN AS "Appliance's Name (EN)", 
                    Appliance_Type.nameAR AS "Appliance's Name (AR)",
                    Booking.Issue_Description AS "Issue Description",
                    Technician.First_Name AS "Technician's First Name",
                    Technician.Last_Name AS "Technician's Last Name",
                    Technician.Phone AS "Technician's Phone Number",
                    Payment.[Status] AS "Payment Status",
                    Payment.Payment_Method AS "Payment Method"
                FROM Booking
                LEFT JOIN Technician ON Booking.Technician_ID = Technician.Technician_ID
                LEFT JOIN Payment ON Booking.Booking_ID = Payment.Booking_ID
                JOIN Appliance_Type ON Booking.Appliance_Type_ID = Appliance_Type.Appliance_Type_ID
                WHERE Booking.UserID = @userID AND Booking.[Status] = 'pending'
                ORDER BY Booking.Booking_Date ASC, Booking.Booking_Time ASC
            `);

        if (bookings.recordset.length === 0) {
            return res.status(404).send("You don't have any bookings!");
        }

        res.status(200).json({
            message: "You have pending bookings!",
            count: bookings.recordset.length,
            bookings: bookings.recordset
        });
    } catch (error) {
        console.error("Unexpected error occurred when trying to fetch your pending bookings:", error);


        res.status(500).send("Unexpected error occurred when trying to fetch your pending bookings.");
    }
})

const getConfirmedBookings = asyncHandler(async (req, res) => {
    const userID = req.userID;

    try {
        const pool = getPool();

        const bookings = await pool.request()
            .input("userID", sql.Int, userID)
            .query(`
                SELECT 
                    Booking.Booking_ID, 
                    Booking.Booking_Date AS "Scheduled Date", 
                    Booking.Booking_Time AS "Scheduled Time", 
                    Booking.Total_Price AS "Total Price", 
                    Appliance_Type.nameEN AS "Appliance's Name (EN)", 
                    Appliance_Type.nameAR AS "Appliance's Name (AR)",
                    Booking.Issue_Description AS "Issue Description",
                    Technician.First_Name AS "Technician's First Name",
                    Technician.Last_Name AS "Technician's Last Name",
                    Technician.Phone AS "Technician's Phone Number",
                    Payment.[Status] AS "Payment Status",
                    Payment.Payment_Method AS "Payment Method"
                FROM Booking
                JOIN Technician ON Booking.Technician_ID = Technician.Technician_ID
                LEFT JOIN Payment ON Booking.Booking_ID = Payment.Booking_ID
                JOIN Appliance_Type ON Booking.Appliance_Type_ID = Appliance_Type.Appliance_Type_ID
                WHERE Booking.UserID = @userID AND Booking.[Status] = 'confirmed'
                ORDER BY Booking.Booking_Date ASC, Booking.Booking_Time ASC
            `);

        if (bookings.recordset.length === 0) {
            return res.status(404).send("You don't have any bookings!");
        }

        res.status(200).json({
            message: "You have confirmed bookings!",
            count: bookings.recordset.length,
            bookings: bookings.recordset
        });
    } catch (error) {
        console.error("Unexpected error occurred when trying to fetch your confirmed bookings:", error);


        res.status(500).send("Unexpected error occurred when trying to fetch your confirmed bookings.");
    }
})

const getInProgressBookings = asyncHandler(async (req, res) => {
    const userID = req.userID;

    try {
        const pool = getPool();

        const bookings = await pool.request()
            .input("userID", sql.Int, userID)
            .query(`
                SELECT 
                    Booking.Booking_ID, 
                    Booking.Booking_Date AS "Scheduled Date", 
                    Booking.Booking_Time AS "Scheduled Time", 
                    Booking.Total_Price AS "Total Price", 
                    Appliance_Type.nameEN AS "Appliance's Name (EN)", 
                    Appliance_Type.nameAR AS "Appliance's Name (AR)",
                    Booking.Issue_Description AS "Issue Description",
                    Technician.First_Name AS "Technician's First Name",
                    Technician.Last_Name AS "Technician's Last Name",
                    Technician.Phone AS "Technician's Phone Number",
                    Payment.[Status] AS "Payment Status",
                    Payment.Payment_Method AS "Payment Method"
                FROM Booking
                JOIN Technician ON Booking.Technician_ID = Technician.Technician_ID
                LEFT JOIN Payment ON Booking.Booking_ID = Payment.Booking_ID
                JOIN Appliance_Type ON Booking.Appliance_Type_ID = Appliance_Type.Appliance_Type_ID
                WHERE Booking.UserID = @userID AND Booking.[Status] = 'in_progress'
                ORDER BY Booking.Booking_Date ASC, Booking.Booking_Time ASC
            `);

        if (bookings.recordset.length === 0) {
            return res.status(404).send("You don't have any bookings!");
        }

        res.status(200).json({
            message: "You have in progress bookings!",
            count: bookings.recordset.length,
            bookings: bookings.recordset
        });
    } catch (error) {
        console.error("Unexpected error occurred when trying to fetch your in progress bookings:", error);


        res.status(500).send("Unexpected error occurred when trying to fetch your in progress bookings.");
    }
})

const getCompletedBookings = asyncHandler(async (req, res) => {
    const userID = req.userID;

    try {
        const pool = getPool();

        const bookings = await pool.request()
            .input("userID", sql.Int, userID)
            .query(`
                SELECT 
                    Booking.Booking_ID, 
                    Booking.Booking_Date AS "Scheduled Date", 
                    Booking.Booking_Time AS "Scheduled Time", 
                    Booking.Total_Price AS "Total Price", 
                    Appliance_Type.nameEN AS "Appliance's Name (EN)", 
                    Appliance_Type.nameAR AS "Appliance's Name (AR)",
                    Booking.Issue_Description AS "Issue Description",
                    Technician.First_Name AS "Technician's First Name",
                    Technician.Last_Name AS "Technician's Last Name",
                    Technician.Phone AS "Technician's Phone Number",
                    Payment.[Status] AS "Payment Status",
                    Payment.Payment_Method AS "Payment Method"
                FROM Booking
                JOIN Technician ON Booking.Technician_ID = Technician.Technician_ID
                LEFT JOIN Payment ON Booking.Booking_ID = Payment.Booking_ID
                JOIN Appliance_Type ON Booking.Appliance_Type_ID = Appliance_Type.Appliance_Type_ID
                WHERE Booking.UserID = @userID AND Booking.[Status] = 'completed'
                ORDER BY Booking.Booking_Date ASC, Booking.Booking_Time ASC
            `);

        if (bookings.recordset.length === 0) {
            return res.status(404).send("You don't have any bookings!");
        }

        res.status(200).json({
            message: "You have completed bookings!",
            count: bookings.recordset.length,
            bookings: bookings.recordset
        });
    } catch (error) {
        console.error("Unexpected error occurred when trying to fetch your completed bookings:", error);


        res.status(500).send("Unexpected error occurred when trying to fetch your completed bookings.");
    }
})

const getCancelledBookings = asyncHandler(async (req, res) => {
    const userID = req.userID;

    try {
        const pool = getPool();

        const bookings = await pool.request()
            .input("userID", sql.Int, userID)
            .query(`
                SELECT 
                    Booking.Booking_ID, 
                    Booking.Booking_Date AS "Scheduled Date", 
                    Booking.Booking_Time AS "Scheduled Time", 
                    Booking.Total_Price AS "Total Price", 
                    Appliance_Type.nameEN AS "Appliance's Name (EN)", 
                    Appliance_Type.nameAR AS "Appliance's Name (AR)",
                    Booking.Issue_Description AS "Issue Description",
                    Technician.First_Name AS "Technician's First Name",
                    Technician.Last_Name AS "Technician's Last Name",
                    Technician.Phone AS "Technician's Phone Number",
                    Payment.[Status] AS "Payment Status",
                    Payment.Payment_Method AS "Payment Method"
                FROM Booking
                LEFT JOIN Technician ON Booking.Technician_ID = Technician.Technician_ID
                LEFT JOIN Payment ON Booking.Booking_ID = Payment.Booking_ID
                JOIN Appliance_Type ON Booking.Appliance_Type_ID = Appliance_Type.Appliance_Type_ID
                WHERE Booking.UserID = @userID AND Booking.[Status] = 'cancelled'
                ORDER BY Booking.Booking_Date ASC, Booking.Booking_Time ASC
            `);

        if (bookings.recordset.length === 0) {
            return res.status(404).send("You don't have any bookings!");
        }

        res.status(200).json({
            message: "You have cancelled bookings!",
            count: bookings.recordset.length,
            bookings: bookings.recordset
        });
    } catch (error) {
        console.error("Unexpected error occurred when trying to fetch your cancelled bookings:", error);


        res.status(500).send("Unexpected error occurred when trying to fetch your cancelled bookings.");
    }
})


module.exports = { userRequestBooking, userPayBooking, userRateBooking, getPendingBookings, getConfirmedBookings, getInProgressBookings, getCompletedBookings, getCancelledBookings };