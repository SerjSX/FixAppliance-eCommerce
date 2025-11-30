/**
 * This express file sets up the routes of the freelancer, which consist of:
 *      Non-validation required routes: register and login
 *      Validation required routes: logout
 * 
 * Validation requirement is to have the cookie with the right credintials without being expired.
 * 
 * The functionalities for the routes themselves can be found in:
 *      1. middlewares/auth.js for authenticating the freelancer's credentials that are either stored or not stored
 * 
 * No full implementation for freelancers is added yet.
 */

const express = require("express");
const {registerFreelancer, loginFreelancer, logoutFreelancer} = require("../controllers/FreelancerController");
const {freelancerValidation} = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerFreelancer);
router.post("/login", loginFreelancer);
router.post("/logout", freelancerValidation, logoutFreelancer);

module.exports = router;