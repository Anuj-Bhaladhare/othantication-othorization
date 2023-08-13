// auth, isStudent,isAdmin


// ============================ Auth =================================
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req, res, next) => {
    try{
        const token = req.cookies.token ;

        if(!token || token === undefined){
            return res.status(401).json({
                success: false, 
                massage: "token missing",
            })
        }

        // verify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            // why this ?
            req.user = payload;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            massage: "Something went wrong, while verifying the token",
            error: error.massage,
        })
    }
}





// ============================ isStudent =================================
exports.isStudent = async(req, res, next) => {
    try{
       if(req.user.role  !== "Student"){
        return res.status(401).json({
            success: false,
            massage: "THis is a protected route for students",
        });
       }
       next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}





// ============================ isAdmin =================================
exports.isAdmin = async(req, res, next) => {
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:'THis is a protected route for admin',
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}

