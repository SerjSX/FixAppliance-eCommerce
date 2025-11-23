const express = require("express");
const {registerTechnician, loginTechnician, logoutTechnician, settingTechnicianSpecialty} = require("../controllers/TechnicianController");
const {technicianValidation} = require("../middlewares/auth");
const {getPendingBookings, acceptPendingBooking} = require("../controllers/TechnicianBookingController");

const router = express.Router();

router.post("/register", registerTechnician);
router.post("/login", loginTechnician);
router.post("/logout", technicianValidation, logoutTechnician);

router.post("/set-specialty", technicianValidation, settingTechnicianSpecialty);

router.get("/booking/get-pendings", technicianValidation, getPendingBookings);
router.post("/booking/accept", technicianValidation, acceptPendingBooking);



module.exports = router;