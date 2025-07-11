
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt= require("bcrypt");
//link generate 

//resert password token
exports.resetPasswordToken = async (req,res) => {
    try{
      //get email from the body
      const email = req.body.email;
      //verify email
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.json({
          success: false,
          message: "Your Email is Not Registered with us",
        });
      }
      //generate token
      const token = crypto.randomUUID();
      //update user by adding token and expiration time
      const updatedDetails = await User.findOneAndUpdate(
        { email: email },
        {
          token: token,
          resetPasswordExpires: Date.now() + 5 * 60 * 1000,
        },
        { new: true }
      );
      //create url
      const url = `http://localhost:3000/update-password/${token}`;
      //send mail containing the url
      await mailSender(
        email,
        "Password Reset Link",
        `Password Reset Link: ${url}`
      );
      //return response
      return res.json({
        success: true,
        message: "Email sent successfully,please check email and change pwd",
      });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while  generating reset password link',
        })
    }
    
}
//reset password

exports.resetPassword = async (req,res) => {
    try{
      //fetch data
    const {password,confirmPassword,token} = req.body;
    //validation
    if(password != confirmPassword){
        return res.json({
            success:false,
            message:'Password is not matching with confirm password',
        });
    }
    //get user details from db using token
    const userDetails = await User.findOne({token: token});
    //if no entry - invalid token 
    if (!userDetails){
      return res.json({
        success:false,
        message:'Token is invalid',
      })
    }
    //token time check
    if ( userDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success:false,
        message:'Token is expired,please regenrate your token',
      })
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password,10);
    //password update
    await User.findOneAndUpdate(
      {token:token},
      {password:hashedPassword},
      {new:true},
    );
    //return response
    return res.status(200).json({
      success:true,
      message:'Password reset successfully',
    })
    
    }
    catch(err){
      console.log(err);
      return res.json({
        success:false,
        message:'Something went wrong while sending reset password mail',
      })
    }
}
