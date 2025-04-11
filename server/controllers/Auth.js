// import models/middlewares
const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile')
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// email validation
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// sendOTP
exports.sendOTP = async (req, res) => {
    
    try {
        // fetch email
        const {email} = req.body;

        if (!validateEmail(email)) {
            return res.status(401).json({
                success: false,
                message: "Email is Invalid!"
            });
        }

        // check user
        const existingUser = await User.findOne({email});

        // if user already exists
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User already registered!"
            });
        }

        // generate OTP - using opt-generator
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // check unique otp or not
        let result = await OTP.findOne({otp: otp});
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {
            email, otp,
        };

        // create an entry in db for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        // return response successfully
        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully!",
            otp: otp
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// signup
exports.signup = async (req, res) => {
    try {
        // data fetch from request body
        const {
            firstName,lastName, 
            email, password,
            confirmPassword,
            accountType,
            contactNumber,otp
        } = req.body;

        // validation
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(401).json({
                success: false,
                message: "All Fields are required!"
            });
        }

        console.log('data fetched!')

        // confirm password validation
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password and confirm password does not match!, Please try again.."
            })
        }

        // console.log('password matched!')

        // // check already registered user
        // const existingUser = await User.findOne({email});

        // if (existingUser) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "User already registered!"
        //     });
        // }

        // find most recent OTP stored for the user
        const recentOTP = await OTP.find({email}).sort({createdAt: -1}).limit(1);

        // validate OTP
        if (recentOTP.length === 0) {
            // OTP not found!
            return res.status(400).json({
                success: false,
                message: "OTP Not Found!"
            });
        } else if (Number(otp) !== recentOTP[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        console.log('otp verified.')
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth:null,
            about: null,
            contactNumber: null,
        })
        
        // entry create in DB
        const user = await User.create({
            firstName, lastName, email, contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id
        });


        // return res
        res.status(200).json({
            success: true,
            message: "User is registered successfully!",
            user: user
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "User can not created, please try again later.",
            error: err.message
        })
    }
}


// login
exports.login = async (req, res) => {
    try {
        
        // fetch email and password
        const {email, password} = req.body;

        // validation of email
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All Fields are required!"
            })
        }
        // find user
        let user = await User.findOne({email}).populate('additionalDetails').exec();

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User is not registered with us."
            })
        }
        
        
        // check password
        // generate JWT
        if (await bcrypt.compare(password, user.password)) {

            // payload
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "10h"
            })

            user = user.toObject();
            user.password = "🤣";
            user.token = token;

            // create cookie and return response
            const options = {
                httpOnly: true,
                expires: new Date(Date.now() + 3*24*60*60*1000)
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully!"
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect!"
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Login Failed, try again later."
        })
    }
}


// change password
exports.changePassword = async (req, res) => {
    try {
        // fetch new password
        const {prev_pass, password, confirm_password, token} = req.body;
        // validation
        if (!prev_pass || !password || !confirm_password) {
            return res.status(401).json({
                success: false,
                message: "All the fields are required!"
            });
        }
        
        // get token
        const user = await User.findOne({token: token});
        // check previous password

        if (await bcrypt.compare(prev_pass, user.password)) {

            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            user = await User.findOneAndUpdate({token: token},{
                password: hashedPassword
            }, {new: true});

            user.password = "🤣"

            return res.status(301).json({
                success: true,
                user,
                message: "Password Changed Successfully!"
            })
        }

    } catch (err) {
        console.log(err);
    }
}
