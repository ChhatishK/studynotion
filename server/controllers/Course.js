const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadFileToCloudinary} = require('../utils/uploadImageToCloudinary');
require('dotenv').config();

// creater course handler function
exports.createCourse = async (req, res) => {
    try {
        // fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, category, tag} = req.body;
        
        // fetch file
        const thumbnail = req.files.thumbnailImage;
        // validation

        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !tag) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        // check for instructor
        const userId = req.user.id
        const instructorDetails = await User.findById(userId);
        console.log('Instructor details: ', instructorDetails);

        // instructor validation
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor details not found!"
            });
        }

        // check given tag is valid or not
        // tags validation
        const categoriesDetails = await Category.findById(category);
        if (!categoriesDetails) {
            return res.status(404).json({
                success: false,
                message: "Category details not found!"
            });
        }

        console.log('category matched!')
        
        // upload to cloudinary
        const thumbnailImage = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME);
        console.log("thumbnail added/uploaded.")

        // create an entry for new course
        const newCourse = await Course.create({
            courseName:courseName,
            courseDescription:courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price:price,
            category:categoriesDetails._id,
            thumbnail:thumbnailImage.secure_url,
            tag:tag
        })
        console.log("course created!")
        // add course details to user details if user is instructor
        await User.findByIdAndUpdate({_id: instructorDetails._id}, 
            {
                $push: {
                    courses: newCourse._id
            }
        }, {new: true})

        // update the Category schema
        await Category.findByIdAndUpdate({_id: categoriesDetails._id},
            {
                $push: {
                    course: newCourse._id
                }
            }, {new: true}
        )

        // return response
        return res.status(200).json({
            success: true,
            message: "Course created Successfully",
            data: newCourse
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating course",
            error:error.message
        })
    }
}
 
// get all courses handler function
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName:true,price:true,thumbnail:true,instructor:true,ratingAndReviews:true,
            studentsEnrolled: true
        }).populate('instructor').exec();

        return res.status(200).json({
            success: true,
            message: "Course fetched",
            data: allCourses
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Cannot Fetch course data",
            error: error.message
        })
    }
}


// get all course with their details
exports.getCourseDetails = async (req, res) => {
    try {
        // get id
        const {courseId} = req.body;

        // find course details
        const courseDetails = await Course.findById(
            {_id: courseId})
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            //.populate('ratingAndReviews')
            .populate({
                path:"courseContent",
                populate: {
                    path: "subSection",
                }
            }).exec();

        // validation
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with ${courseId}`
            })
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully!",
            data: courseDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }   
}