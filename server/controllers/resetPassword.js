const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const {passwordUpdated} = require('../mail/templates/passwordUpdate')

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        // get email from request body
        const email = req.body.email;

        // check user for this email or email validation
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email is not registered with us."
            })
        }

        // console.log(user);
        console.log("generating token for reset password.")
        // generate token 
        const token = crypto.randomUUID();
        console.log("token generated!");

        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email:email}, {
            token:token,
            resetPasswordExpires: Date.now() + 5*60*1000
        },{new: true})

        // create url
        const url = `http://localhost:3000/update-password/${token}`

        // send mail containing url
        await mailSender(email, "Reset Password", `Your link for email verification is ${url}. Please click this url to reset your password.`);
        // return response

        return res.status(200).json({
            success: true,
            message: "Link sent to your mail.",
            token,
            url,
            email
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "URL cannot be generated!"
        })
    }

}

// resetPassword
exports.resetPassword = async (req, res) => {
    try {
        // fetch token, password, confirm password.
        const {password, confirmPassword, token} = req.body;
        // validation.
        if (!password || !confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "All Fields are required!"
            })
        }

        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password and confirm password not matched!"
            })
        }
        
        console.log("token: ", token)
        // get user details from db using token.
        const userDetails = await User.findOne({token: token});
        // if no entry - Invalid token.
        if (!userDetails) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid!"
            })
        }

        // token expiration time.
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "Url has been expired. please try again to reset password."
            })
        }
        // hash password.
        const hashedPassword = await bcrypt.hash(password, 10);

        // update password.

        const user = await User.findOneAndUpdate({token: token}, {
            password: hashedPassword
        }, {new: true})

        // send mail for updating the password.
        const emailResponse = await mailSender(user.email, "Password Updated successfully", passwordUpdated(user.email, user.firstName +' '+user.lastName));
        
        // return response.
        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully!"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something error in reseting password."
        })
    }
}