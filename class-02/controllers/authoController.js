
const bcrypt = require("bcrypt");
const User = require("../modals/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup route handler
exports.signUp = async(req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists",
            });
        }

        try {
            // Secure the password
            const hashedPass = await bcrypt.hash(password, 10);

            // Create user entry
            const user = await User.create({
                name,
                email,
                password: hashedPass,
                role,
            });

            return res.status(200).json({
                success: true,
                message: "User Created Successfully...!",
            });
        } catch (error) {
            console.error(`User creation unsuccessful due to ${error}`);
            return res.status(500).json({
                success: false,
                message: "User creation unsuccessful",
            });
        }
    } catch (error) {
        console.error(`Signup unsuccessful due to ${error}`);
        return res.status(500).json({
            success: false,
            message: "Signup unsuccessful",
        });
    }
};




// login route handler
exports.login = async (req, res) => {
    try {
        // Fetch Data
        const { email, password } = req.body;

        // Validation of email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter details carefully",
            });
        }

        // Check if user is registered in the database
        const user = await User.findOne({ email });

        // If user is not registered in the database
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered.",
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };

        // Verify password and generate JWT token
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            // Password match
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user.token = token;
            user.password = undefined;

            const option = {
                expiresIn: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            res.cookie("token", token, option).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully.",
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Password does not match.",
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing the request.",
        });
    }
};
