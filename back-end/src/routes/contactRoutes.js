const express = require("express");
const { submitContactForm } = require("../controllers/ContactController.js");

const router = express.Router();

// POST /api/contact - Submit contact form (public route, no authentication)
router.post("/", submitContactForm);

module.exports = router;