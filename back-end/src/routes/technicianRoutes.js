/**
 * This express file sets up the routes of the technician, which consist of:
 *      Non-validation required routes: register and login
 *      Validation required routes: logout, setting specialty and service area, and booking-related (seeing pending bookings, accepting a booking,...)
 * 
 * Validation requirement is to have the cookie with the right credintials without being expired.
 * 
 * The functionalities for the routes themselves can be found in 3 files:
 *      1. controllers/TechnicianController.js for register, login, logout
 *      2. controllers/TechnicianBookingController.js for booking-related functonalities
 *      3. middlewares/auth.js for authenticating the technician's credentials that are either stored or not stored
 */

const express = require("express");
const {registerTechnician, loginTechnician, logoutTechnician, settingTechnicianSpecialty, settingTechnicianServiceArea} = require("../controllers/TechnicianController");
const {technicianValidation} = require("../middlewares/auth");
const {getPendingBookings, acceptPendingBooking} = require("../controllers/TechnicianBookingController");

const router = express.Router();

router.post("/register", registerTechnician);
router.post("/login", loginTechnician);
router.post("/logout", technicianValidation, logoutTechnician);

router.post("/set-specialty", technicianValidation, settingTechnicianSpecialty);
router.post("/set-service-area", technicianValidation, settingTechnicianServiceArea);

router.get("/booking/get-pendings", technicianValidation, getPendingBookings);
router.post("/booking/accept", technicianValidation, acceptPendingBooking);


module.exports = router;