const Profile = require('../models/Profile');
const User = require('../models/User');
const cron = require('node-cron');
const {uploadFileToCloudinary} = require('../utils/uploadImageToCloudinary');
const mailSender = require('../utils/mailSender');
require('dotenv').config();

// update profile
exports.updateProfile = async (req, res) => {
    try {
        // fetch data
        console.log("Request: "+req);
        const {gender, about="Yet to be added", contactNumber, dateOfBirth} = req.body;
        const userId = req.user.id;
        // validation
        if (!userId || !gender || !contactNumber) {
            return res.status(401).json({
                success: false,
                message: "You cannot update profile. try again later."
            });
        }
        
        // find user details
        const userDetails = await User.findById(userId)
        const profileId = userDetails.additionalDetails;

        // update profile <-> can be re-arrange
        const updatedProfile = await Profile.findByIdAndUpdate({_id: profileId}, {
            gender:gender,about:about,contactNumber:contactNumber, dateOfBirth:dateOfBirth
        }, {new: true})

        // return response
        return res.status(200).json({
            success: true,
            message: "User profile updated successfully!",
            data: updatedProfile
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in updating profile",
            error: error.message
        })
    }
}


// delete account
exports.deleteAccount = async (req, res) => {
    try {
        let date = new Date(Date.now());
        date.setDate(date.getDate() + 5);
        console.log(typeof date);
        console.log(date)

        const minute = date.getMinutes();
        const hour = date.getHours();
        const dayOfMonth = date.getDate();
        const month = date.getMonth()+1;
        const dayOfWeek = date.getDay();

        const cronExression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

        let userDetails = await User.findById(req.user.id);


        mailSender(userDetails.email,
            "Account Delete update",
            `Dear <b>${userDetails.firstName +" "+userDetails.lastName}
            
            <p>Your account will be deleted successfully after
                ${date}. You can still stop the process of deleting your profile.
            </p>
            `
        )

        cron.schedule(cronExression, async () => {
            // get id
            const id = req.user.id;
            // validation
            userDetails = await User.findById(id);
            if (!userDetails) {
                return res.status(400).json({
                    success: false,
                    message: "User Not Found!"
                });
            }

            const email = userDetails.email;
            const name = userDetails.firstName +' '+userDetails.lastName;

            // delete profile
            await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
            // TODO: unenroll user from the course

            // delete user
            await User.findByIdAndDelete({_id:id});
            // return response

            const emailResponse = mailSender(email, 
                "Account Deleted",
                `Dear <b>${name}</b>

                <p>Your account has been deleted successfully!</p>
                
                `
            )
        })
        // return response
        return res.status(200).json({
            success: true,
            message: "User will deleted successfully after 5 days.!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in deleting profile",
            error: error.message
        })
    }
}


// get user details
exports.getAllUserDetails = async (req, res) => {
    try {
        // get id
        const id = req.user.id;
        // db call
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User Not Found!"
            })
        }
        // return response
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully!",
            data: userDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching user details",
            error: error.message
        })
    }
}


// updateDisplayPicture handler
exports.updateDisplayPicture = async (req, res) => {
    try {
        const userId = req.user.id;

        // file/profile picture
        const profilePicture = req.files.profilePicture;

        console.log(profilePicture)

        // validation
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Login to update the profile picture"
            });
        }

        // upload to cloudinary
        console.log("uploading file to cloudinary")
        const cloudinaryResponse = await uploadFileToCloudinary(profilePicture, process.env.FOLDER_NAME);
        console.log("uploading file to cloudinary successfully")

        if (!cloudinaryResponse) {
            return res.status(500).json({
                success: false,
                message: 'Error while uploading file to cloudinary.'
            })
        }


        const userDetails = await User.findByIdAndUpdate({_id: userId}, {
            image: cloudinaryResponse.secure_url
        });

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: 'user details not found.',
                data: userDetails
            });
        }

        // return response
        return res.status(200).json({
            success: true,
            message: 'profile picture updated successfully.',
            data: userDetails
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'profile picture cannot be updated.'
        })
    }
}

// get enrolled course
exports.getEnrolledCourses = async (req, res) => {
    try {
        // get user id
        // console.log("BEfore token extraction!")
        const userId = req.user.id;

        // console.log("Token : "+userId);

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'Login to get enrolled courses.'
            })
        }

        // find user 
        const user = await User.findOne({_id: userId}).populate('courses').exec(); 

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'user not found.'
            })
        }

        // return response
        return res.status(200).json({
            success: true,
            message: 'Course details fetched successfully.',
            data: user
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Enrolled courses cannot be fetched.'
        })
    }
}