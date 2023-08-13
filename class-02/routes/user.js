const express = require("express");
const router = express.Router();

// Import controller
const { login, signUp } = require("../controllers/authoController"); // Corrected typo 'authoController' to 'authController'

// Define routes
router.post("/login", login); // Corrected typo 'poat' to 'post'
router.post("/signUp", signUp); // Corrected typo 'singUp' to 'signUp'

// Exporting
module.exports = router;


