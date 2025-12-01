

const express = require("express");
const {getActiveCategories, getActiveTypes} = require("../controllers/ApplianceController.js");

const router = express.Router();

// /api/appliances/categories
router.get('/categories', getActiveCategories);

// /api/appliances/types?categoryId=1
router.get('/types', getActiveTypes);

module.exports = router;