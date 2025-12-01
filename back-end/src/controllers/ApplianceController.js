// This controller is responsible for retrieving appliance categories and types

const asyncHandler = require("express-async-handler");

// sql needed for the type definitions in .input
// getPool is to do queries
const { getPool, sql } = require("../config/database");


// Returns the active appliance categories
const getActiveCategories = asyncHandler(async (req, res) => {
    try {
        const pool = getPool();

        const result = await pool.request()
            .query(`
                SELECT Category_ID, NameEN, NameAR, isActive
                FROM Appliance_Category
                WHERE isActive = 1;
                `)

        res.status(200).json({
            count: result.recordset.length,
            data: result.recordset,
        })
    } catch (error) {
        // Throwing the console error and 500 status in case something goes wrong
        console.error("Unexpected error occurred when trying to get appliance categories: ", error);
        res.status(500).json({ message: "An unexpected error occurred while trying to retrieve appliance categories." });
    }
})


// Returns the active appliance types, either all or by a specific category Id
const getActiveTypes = asyncHandler(async (req, res) => {
    //Passing at the end
    const { categoryId } = req.query;

    try {
        const pool = getPool();
        let result;

        if (categoryId) {
            result = await pool.request()
                .input("categoryId", sql.Int, categoryId)
                .query(`SELECT Appliance_Type_ID, Category_ID, nameEN, nameAR, Average_Repair_Time_Min, Base_Price, DescriptionEN, DescriptionAR, isActive
                        FROM Appliance_Type
                        WHERE isActive = 1 AND Category_ID = @categoryId`);
        } else {
            result = await pool.request()
                .query(`SELECT Appliance_Type_ID, Category_ID, nameEN, nameAR, Average_Repair_Time_Min, Base_Price, DescriptionEN, DescriptionAR, isActive
                        FROM Appliance_Type
                        WHERE isActive = 1`);
        }

        res.status(200).json({
            count: result.recordset.length,
            data: result.recordset,
        })
    } catch (error) {
        // Throwing the console error and 500 status in case something goes wrong
        console.error("Unexpected error occurred when trying to get appliance types: ", error);
        res.status(500).json({ message: "An unexpected error occurred while trying to retrieve appliance types." });
    }
})


module.exports = {getActiveCategories, getActiveTypes};