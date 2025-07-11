const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");
const OTPSchema=new mongoose.Schema ({

    email:{
        type:String,
        required:true,

    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:5*60,
    }
});

//function to send emails
async function sendVerificationEmail(email,otp) {
    try{

        const mailResponse = await mailSender (email,"Verification Email from StudyNotion",otp);
        console.log("Email Sent Successfully",email);
    }
    catch(err){
        console.log("error occured at the time of sending email: ",err);
        throw err;

    }
}

OTPSchema.pre("save",async function(next) {
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports=mongoose.model("OTP",OTPSchema);