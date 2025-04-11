// import others files
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

// auth
exports.auth = async (req, res, next) => {
    try {
        
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        console.log(token);

        // if token is missing
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing!",
            })
        }

        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (err) {
            // verification issue
            return res.status(401).json({
                success: false,
                message: "Token is Invalid!"
            })
        }

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token."
        })
    }
}

// isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json ({
                success: false,
                allowed: false,
                message: "You can't do this action."
            })
        }

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            allowed: true,
            message: "User role cannnot be verified, please try again later."
        })
    }
}

// isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json ({
                success: false,
                allowed: false,
                message: "You can't do this action."
            })
        }

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role cannnot be verified, please try again later."
        })
    }
}



// isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json ({
                success: false,
                message: "This is protected route for admin only!"
            })
        }

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role cannnot be verified, please try again later."
        })
    }
}
