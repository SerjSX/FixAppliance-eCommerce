/**
 * This express file sets up the routes of the user, which consist of:
 *      Non-validation required routes: register and login
 *      Validation required routes: logout, booking-related (requesting, paying, rating and getting bookings)
 * 
 * Validation requirement is to have the cookie with the right credintials without being expired.
 * 
 * The functionalities for the routes themselves can be found in 3 files:
 *      1. controllers/UserController.js for register, login, logout
 *      2. controllers/UserBookingController.js for booking-related functonalities
 *      3. middlewares/auth.js for authenticating the user's credentials that are either stored or not stored
 */

const express = require("express");
const {registerUser, loginUser, logoutUser, getProfile, updateProfile} = require("../controllers/UserController");
const {userValidation} = require("../middlewares/auth");
const {userRequestBooking, userPayBooking, userRateBooking, getPendingBookings, getConfirmedBookings, getInProgressBookings, getCompletedBookings, getCancelledBookings} = require("../controllers/UserBookingController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", userValidation, logoutUser);


router.post("/booking/request", userValidation, userRequestBooking);
router.post("/booking/pay", userValidation, userPayBooking);
router.post("/booking/rate", userValidation, userRateBooking);

router.get("/booking/pending", userValidation, getPendingBookings);
router.get("/booking/confirmed", userValidation, getConfirmedBookings);
router.get("/booking/in-progress", userValidation, getInProgressBookings);
router.get("/booking/completed", userValidation, getCompletedBookings);
router.get("/booking/cancelled", userValidation, getCancelledBookings);

router.get("/profile", userValidation, getProfile);
router.put("/profile", userValidation, updateProfile);

module.exports = router;