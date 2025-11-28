/**
 * The following middleware is responsible for authenticating the user before a route is called.
 * 
 * There's a middleware for 3 entities: user, technician and freelancer.
 * 
 * All of them have a similar structure:
 *      1. Get the entity's access token that's stored in the request cookies.
 *      2. Check if a token exists, if not, send a 401 with a please login message.
 *      3. If the token exists, try to decode the token by using JWT and verify it with the ENTITY_ACCESS_TOKEN from the .env file
 *      4. If the decode is successful, it adds the data stored in it in the request and uses next() to send it forward to the route's functionality
 *         If the decode is NOT successful, it clears the entity's token and sends a 401 with a please login message.
 * 
 */

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Validation for the user 
const userValidation = asyncHandler(async(req, res, next) => {
    // Gets token from the cookies passed in req
    const token = req.cookies.user_access_token;

    // Check if token exists, if not send a 401 with a please login message
    if (!token) {
        res.status(401).send("Please login to your account.")
        return;
    }

    // If token exists try to decode it.
    // If decode successful get the data from the decoded and pass it to the route's functionality's req.
    // If not successful, clear the cookie, throw a 401 and send a please login message.
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

// Validation for technician
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

// Validation for freelancer
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