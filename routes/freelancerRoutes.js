const express = require("express");
const {registerFreelancer, loginFreelancer, logoutFreelancer} = require("../controllers/FreelancerController");
const {freelancerValidation} = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerFreelancer);
router.post("/login", loginFreelancer);
router.post("/logout", freelancerValidation, logoutFreelancer);

module.exports = router;