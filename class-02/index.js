const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//cookie-parser - what is this and why we need this ?
const cookieParser = require("cookie-parser");
app.use(cookieParser());

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
