const express = require("express");
const {registerTechnician, loginTechnician, logoutTechnician} = require("../controllers/TechnicianController");
const {technicianValidation} = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerTechnician);
router.post("/login", loginTechnician);
router.post("/logout", technicianValidation, logoutTechnician);

module.exports = router;