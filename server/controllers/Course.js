const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadFileToCloudinary} = require('../utils/uploadImageToCloudinary');
const {convertSecondsToDuration} = require('../utils/secToDuration');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
require('dotenv').config();


// creater course handler function
exports.createCourse = async (req, res) => {
    try {
        // fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, category, tag, instructions} = req.body;
        
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

        // console.log('category matched!');
        
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
            tag:JSON.parse(tag),
            instructions: JSON.parse(instructions)
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
                    courses: newCourse._id
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


// edit course
exports.editCourse = async (req, res) => {
    try {

        const { courseId } = req.body;

        const updates = req.body;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message :"Course could not found!",
            })
        }

        if (req.files) {
            const thumbnail = req.files.thumbnailImage;
            const response = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME);
            course.thumbnail = response.secure_url;
        }

        // update only field that are present in the request body
        for (const key in updates) {
            if (Object.prototype.hasOwnProperty.call(updates, key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key];
                }
            }
        }

        await course.save();

        const updatedCourse = await Course.findById(
            {_id: courseId}
        ).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails"
            }
        }).populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })
        .exec();

        res.json({
            success: true,
            message: "Course Created!",
            data: updatedCourse
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in editing course",
            error: error.message
        })
    }
}

// get full course details
exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body
        const courseDetails = await Course.findOne({
          _id: courseId,
        })
          .populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
              select: "-videoUrl",
            },
          })
          .exec()
    
        if (!courseDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find course with id: ${courseId}`,
          })
        }
    
        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }
    
        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
          content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    
        return res.status(200).json({
          success: true,
          data: {
            courseDetails,
            totalDuration,
          },
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
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
            .populate('ratingAndReviews')
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

// get instructor courses
exports.getInstructorCourses = async (req, res) => {
    try {

        const userId = req.user.id;
        console.log(userId);

        const instructorCourses = await Course.find({
            instructor: userId
        }).sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            data: instructorCourses
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrive instructor courses",
            error: error.message
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try {

        const {courseId} = req.body;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found!"
            })
        }

        const students = course.studentsEnrolled;

        for (let student of students) {
            await User.findByIdAndUpdate(student,
                {
                    $pull: {
                        courses: courseId
                    }
                }
            )
        }

        // Delete course section
        const sections = course.courseContent;

        for (let sectionId of sections) {
            let section = await Section.findById(sectionId);

            if (section) {
                const subSections = section.subSection;

                for (let subSection of subSections) {
                    await SubSection.findByIdAndDelete(subSection);
                }
            }

            await Section.findByIdAndDelete(sectionId);
        }

        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success:true,
            message: "Course Deleted!"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Course Can't be deleted!",
            error: error.message
        })
    }
}