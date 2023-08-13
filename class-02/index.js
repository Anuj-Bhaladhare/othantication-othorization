const express = require("express");
const app = express();
const dotenv = require("dotenv");  // Added 'dotenv' import

require("dotenv").config();  // Load environment variables from .env file
const PORT = process.env.PORT || 4000;

// JSON parsing middleware
app.use(express.json());


// MongoDB connection
const mongoDataBase = require("./config/dataBase");
mongoDataBase.Connect();


// Route import and mounting
const userRoutes = require("./routes/user");  // Renamed 'user' to 'userRoutes' for clarity
app.use("/api/v1", userRoutes);  // Mounting the user routes

// Server activation
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
