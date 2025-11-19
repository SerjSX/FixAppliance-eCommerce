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
                    .input("amount", sql.Decimal(10,2), basePrice)
                    .input("paymentMethod", sql.VarChar, paymentMethod)
                    .input("commissionRate", sql.Decimal(5,2), commissionRate)
                    .input("platformFee", sql.Decimal(10,2), platformFee)
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


module.exports = { userRequestBooking, userPayBooking};