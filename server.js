// Importing the needed libraries
const express = require("express");
const dotenv = require("dotenv").config();
//const asyncHandler = require("express-async-handler");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");

// Setting up the express app and its port to use
const app = express();
const port = process.env.PORT || 5000;

// Applying the middlewares for json, cookie, public files, cors, url embedding
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded({extended: false}));

// Setting the 3 main routes: user, technician and freelancer
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/technician", require("./routes/technicianRoutes"));
app.use("/api/freelancer", require("./routes/freelancerRoutes"));

// 404 handling
app.use((req, res) => {
    res.status(404).json({message: "Route not found"});
})

//Error handling
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Internal server error."
    });
});

connectDB()
    .then(() => {
        console.log("Connected to the database.");
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log("Failed to connect to the database: ", error);
        process.exit(1);
    });
