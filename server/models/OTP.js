const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpTemplate = require('../mail/templates/emailVerificationTemplate')

const OTPSchema = new mongoose.Schema({
    otp: {
        type: Number,
        required: true,
    },
    createdAt: {
        type:Date,
        default: Date.now(),
        expires: 5*60*1000,
        required: true,
    },
    email: {
        type: String,
        required: true
    }
});
// a function to send email
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", otpTemplate(otp));
        console.log("Email send Successfully! ", mailResponse)
    } catch (err) {
        console.error("error occured while sending email", err);
        throw err;
    }
}

OTPSchema.pre('save', async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
});

module.exports = mongoose.model("OTP", OTPSchema);