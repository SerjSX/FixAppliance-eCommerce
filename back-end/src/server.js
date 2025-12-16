// Importing the needed libraries
const express = require("express");
const dotenv = require("dotenv").config();
//const asyncHandler = require("express-async-handler");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database");
const path = require('path');


// Setting up the express app and its port to use
const app = express();
const port = process.env.PORT || 5000;

// CORS configuration - restrict origins in production
const corsOptions = {
    origin: process.env.NODE_ENV === "production"
        ? process.env.ALLOWED_ORIGIN?.split(',') || ['https://fixappliance.onrender.com']  // Should replace with actual domain in .env
        : ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:8080'], // Development origins
    credentials: true,  // Required for cookies to work cross-origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Applying the middlewares for json, cookie, public files, cors, url embedding
app.use(express.json({ limit: '10kb' }));  // Limit body size to prevent large payload attacks
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

app.use(express.static(
    path.resolve(__dirname, '../dist'),
    { maxAge: '1y', etag: false },
))

// Setting the 3 main routes: user, technician and freelancer
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/technician", require("./routes/technicianRoutes"));
app.use("/api/freelancer", require("./routes/freelancerRoutes"));

app.use('/api/appliances', require('./routes/applianceRoutes'));
app.use('/api/service-areas', require('./routes/serviceAreaRoutes'));

app.use('/api/contact', require('./routes/contactRoutes'));

// Admin routes
app.use('/api/admin', require('./routes/adminRoutes'));

// Serve index.html for all non-API, non-static routes (SPA fallback)
app.get(/^\/(?!api|public).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

// 404 handling
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
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
