/**
 * EarningsController
 * 
 * Handles technician earnings calculations and reporting.
 * Earnings are calculated from completed bookings minus platform commission.
 */

const asyncHandler = require("express-async-handler");
const { getPool, sql } = require("../config/database");

// Get technician earnings summary with optional date filters
const getTechnicianEarnings = asyncHandler(async (req, res) => {
    const technicianID = req.technicianID;
    const { startDate, endDate } = req.query;

    try {
        const pool = getPool();
        let dateFilter = '';
        const request = pool.request().input("technicianID", sql.Int, technicianID);

        // Add date filters if provided
        if (startDate) {
            dateFilter += ' AND b.completedAt >= @startDate';
            request.input("startDate", sql.Date, startDate);
        }

        if (endDate) {
            dateFilter += ' AND b.completedAt <= @endDate';
            request.input("endDate", sql.Date, endDate);
        }

        // Get earnings breakdown from completed bookings
        const result = await request.query(`
            SELECT 
                COUNT(b.Booking_ID) AS Total_Bookings,
                SUM(p.Amount) AS Total_Revenue,
                SUM(p.Platform_Fee) AS Total_Platform_Fees,
                SUM(p.Amount - p.Platform_Fee) AS Total_Earnings,
                AVG(p.Amount) AS Average_Booking_Value
            FROM Booking b
            JOIN Payment p ON b.Booking_ID = p.Booking_ID
            WHERE b.Technician_ID = @technicianID 
                AND b.[Status] = 'completed'
                AND p.[Status] = 'completed'
                ${dateFilter}
        `);

        // Get earnings by month for the selected period
        const monthlyResult = await request.query(`
            SELECT 
                FORMAT(b.completedAt, 'yyyy-MM') AS Month,
                COUNT(b.Booking_ID) AS Bookings_Count,
                SUM(p.Amount - p.Platform_Fee) AS Earnings
            FROM Booking b
            JOIN Payment p ON b.Booking_ID = p.Booking_ID
            WHERE b.Technician_ID = @technicianID 
                AND b.[Status] = 'completed'
                AND p.[Status] = 'completed'
                ${dateFilter}
            GROUP BY FORMAT(b.completedAt, 'yyyy-MM')
            ORDER BY Month DESC
        `);

        const summary = result.recordset[0];

        res.status(200).json({
            message: "Earnings retrieved successfully.",
            summary: {
                totalBookings: summary.Total_Bookings || 0,
                totalRevenue: parseFloat(summary.Total_Revenue || 0).toFixed(2),
                totalPlatformFees: parseFloat(summary.Total_Platform_Fees || 0).toFixed(2),
                totalEarnings: parseFloat(summary.Total_Earnings || 0).toFixed(2),
                averageBookingValue: parseFloat(summary.Average_Booking_Value || 0).toFixed(2)
            },
            monthlyBreakdown: monthlyResult.recordset.map(record => ({
                month: record.Month,
                bookingsCount: record.Bookings_Count,
                earnings: parseFloat(record.Earnings).toFixed(2)
            })),
            filters: {
                startDate: startDate || null,
                endDate: endDate || null
            }
        });

    } catch (error) {
        console.error("Unexpected error occurred when retrieving earnings: ", error);
        res.status(500).json({ message: "An unexpected error occurred while retrieving earnings data." });
    }
});

module.exports = { getTechnicianEarnings };