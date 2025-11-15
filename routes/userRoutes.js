const express = require("express");
const {registerUser, loginUser, logoutUser} = require("../controllers/UserController");
const {userValidation} = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", userValidation, logoutUser);

module.exports = router;