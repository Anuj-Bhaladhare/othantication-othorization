const express = require("express");
const router = express.Router();

// Import controller
const { login, signUp } = require("../controllers/authoController"); // Corrected typo 'authoController' to 'authController'
// Import Middle Wear
const { auth, isStudent, isAdmin } = require("../middlewear/authoMiddleWear");

// Define routes
router.post("/login", login); // Corrected typo 'poat' to 'post'
router.post("/signUp", signUp); // Corrected typo 'singUp' to 'signUp'


//testing protected routes for single middleware
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        massage: "Welcome to the Protected route for TESTS",
    });
});

// Protected Routes
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        massage: "Welcome to the Protected route for Students",
    });
});

// protected route for Admin
router.get("admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        massage: "Welcome to the Protected route for Admin",
    });
});


// Exporting
module.exports = router;


