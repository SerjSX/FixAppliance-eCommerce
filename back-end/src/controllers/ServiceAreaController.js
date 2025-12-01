const asyncHandler = require("express-async-handler");

// getPool is to do queries
const { getPool, sql } = require("../config/database");


// Returns the active appliance categories
const getActiveAreas = asyncHandler(async (req, res) => {
    try {
        const pool = getPool();

        const result = await pool.request()
            .query(`
                SELECT Area_ID, NameEN, NameAR, Region, isActive
                FROM Service_Area
                WHERE isActive = 1
                `);

        res.status(200).json({
            count: result.recordset.length,
            data: result.recordset,
        })
    } catch (error) {
        // Throwing the console error and 500 status in case something goes wrong
        console.error("Unexpected error occurred when trying to get active service areas: ", error);
        res.status(500).json({ message: "An unexpected error occurred while trying to retrieve active service areas." });
    }
})





module.exports = {getActiveAreas};