const express = require("express");
const { getActiveAreas } = require("../controllers/ServiceAreaController");

const router = express.Router();

router.get("/", getActiveAreas);

module.exports = router;