
const bcrypt = require("bcrypt");
const User = require("../modals/userSchema");
const jwt = require("jsonwebtoken");
// const { options } = require("../routes/user");
require("dotenv").config();



// ======================Signup route handler=============================

exports.signUp = async(req, res) => {
    try {
        //get data
        const { name, email, password, role } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists",
            });
        }

        // Secure the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);  
        } 
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in Hassing Password",
            });
        }

        // Create entry for user
        const user = await User.create({
            name, email, password:hashedPassword, role
        });

        return res.status(200).json({
            success: true,
            massage: "User Created SuccessFully...!",
        });

    } catch (error) {
        console.error(`Signup unsuccessful due to ${error}`);
        return res.status(500).json({
            success: false,
            message: "Signup unsuccessful",
        });
    }
};




// ============================= login route handler ===============================

exports.login = async (req, res) => {
    try {
        // Fetch Data
        const { email, password } = req.body;
        // Validation of email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message:'PLease fill all the details carefully',
            });
        }

        // Check if user is registered in the database
        let user = await User.findOne({ email });
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
        if (await bcrypt.compare(password, user.password)) {
            // Password match
            let token = jwt.sign(payload, 
                                process.env.JWT_SECRET, 
                                {
                                   expiresIn: "2h",
                                }
                            );

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const option = {
                expiresIn: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token", token, option).status(200).json({
                success: true,
                token,
                user,
                message: "User Logged in successfully.",
            });
        } 
        else {
            // Password Do not Match
            return res.status(403).json({
                success: false,
                message: "Password does not match.",
            });
        }

    } 
    catch (error) {
        // if sonthin went wrong
        console.log(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing the request.",
        });
    }
};