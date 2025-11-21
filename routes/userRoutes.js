const express = require("express");
const {registerUser, loginUser, logoutUser} = require("../controllers/UserController");
const {userValidation} = require("../middlewares/auth");
const {userRequestBooking, userPayBooking, userRateBooking} = require("../controllers/UserBookingController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", userValidation, logoutUser);


router.post("/booking/request", userValidation, userRequestBooking);
router.post("/booking/pay", userValidation, userPayBooking);
router.post("/booking/rate", userValidation, userRateBooking);

module.exports = router;