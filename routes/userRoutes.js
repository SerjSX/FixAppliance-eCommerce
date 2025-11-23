const express = require("express");
const {registerUser, loginUser, logoutUser} = require("../controllers/UserController");
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

module.exports = router;