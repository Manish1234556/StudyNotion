const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
//auth
exports.auth = async(req,res,next) => {
    try{
        //extract token
        const token = req.cookies.token || req.body.token || 
        req.header("Authorization").replace("Bearer ","");

        //token missing return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            });
        }

        //verify token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }

        catch(err){
            return res.status(401).json({
                success:false,
                message:'Token is invalid',
            })
        }
        next();
    }

    catch(err){
        return res.status(401).json({
            success:false,
            message:'Problem in validating the token',
        });

    }
}
//isStudent
exports.isStudent = async (req,res,next) => {
    try{
       if(req.user.accountType !=="Student"){
        return res.status(401).json({
            success:false,
            message:'This path is only for the students',
        });
       }
       next();
    }

    catch(err){
        return res.status(500).json({
            success:false,
            message:'User role is not verified, please try again'
        });
    }
}


//isInstructor
exports.isInstructor = async (req,res,next) => {
    try{
    if(req.user.accountType !=="Instructor"){
        return res.status(401).json({
            success:false,
            message:'This path is only for instructor',
        })
    }

    next();
    }

    catch(err){
        return res.status(500).json({
            success:false,
            message:'User role is not verified',
        })
    }
}

//isAdmin
exports.isAdmin = async (req,res,next) => {
    try{
        if(req.user.accountType !=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This path is only for the admin",
            })
        }
        next();
    }

    catch(err){
        return res.status(500).json({
            success:false,
            message:'User role is  not verified',
        })
    }
}
