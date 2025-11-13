const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const userValidation = asyncHandler(async(req, res, next) => {
    const token = req.cookies.user_access_token;

    if (!token) {
        res.status(401).send("Please login to your account.")
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.USER_ACCESS_TOKEN);
        req.userID = decoded.id;
        req.userFirstName = decoded.firstName;
        req.userLastName = decoded.lastName;
        req.userEmail = decoded.email;
        next();
    } catch (err) {
        res.clearCookie('user_access_token')
        res.status(401).send("Please login to your account.")
        return;
    }
})

const technicianValidation = asyncHandler(async(req, res, next) => {
    const token = req.cookies.technician_access_token;

    if (!token) {
        res.status(401).send("Please login to your account.")
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.TECHNICIAN_ACCESS_TOKEN);
        req.technicianID = decoded.id;
        req.technicianFirstName = decoded.firstName;
        req.technicianLastName = decoded.lastName;
        req.technicianEmail = decoded.email;
        next();
    } catch (err) {
        res.clearCookie('technician_access_token')
        res.status(401).send("Please login to your account.")
        return;
    }
})

const freelancerValidation = asyncHandler(async(req, res, next) => {
    const token = req.cookies.freelancer_access_token;

    if (!token) {
        res.status(401).send("Please login to your account.")
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.FREELANCER_ACCESS_TOKEN);
        req.freelancerID = decoded.id;
        req.freelancerFirstName = decoded.firstName;
        req.freelancerLastName = decoded.lastName;
        req.freelancerEmail = decoded.email;
        next();
    } catch (err) {
        res.clearCookie('freelancer_access_token')
        res.status(401).send("Please login to your account.")
        return;
    }
})

module.exports = {userValidation, technicianValidation, freelancerValidation};