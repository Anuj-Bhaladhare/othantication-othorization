// const bcrypt = require("bcrypt");
// const User = require("../modals/userSchema");



// // singup route handaler
// const signUpRoute = (req, res) => {
//     try{
//        const { name, email, password, role } = req.body;
//        const existing = await User.findOne({email})
//        if(existing){
//            return res.status(400).json({
//                success: false,
//                massage: "User Allredy Exist",
//            });
//        }


//         // securing the password
//         try{
//             const hassingPass = await bcrypt.hash(password, 10);
//         }
//         catch(error){
//            return res.status(500).json({
//               success: false,
//               massage: "Password secured unsuccesfull",
//            })
//         }


//         // Create user entry
//         const user = await User.create({
//             name, email, password:hassingPass, role
//         });
//         return res.status(200).json({
//             success: true,
//             massage: "User Created Succesfully...!"
//         })
//     }
//     catch(error){
//          console.error(`Login unsuccefull due to ${error}`);
//         return res.status(500).json({
//             success: false,
//             massage: "Login unsuccefull",
//         })
//     }
// }

// module.exports = signUpRoute;





// =========================================== Chat GPT ===========================================
const bcrypt = require("bcrypt");
const User = require("../modals/userSchema");

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
