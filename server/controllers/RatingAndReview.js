const Course = require('../models/Course');
const RatingAndReview = require('../models/RatingAndReview');

// add rating and review handler
exports.createRating = async (req, res) => {
    try {
        // get id
        const userId = req.user.id;
        // get data
        const {rating, review, courseId} = req.body;

        // validation
        if (!userId || !rating || !review || !courseId) {
            return res.status(401).json({
                success: false,
                message: "All fields are required!"
            })
        }

        // check if user id enrolled in or not
        let courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: {$elemMatch: {$eq: userId}}
        });

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "Student is not enrolled in the course."
            })
        }
        
        // check user is already review and given rating to the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course: courseId,
        });

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "You are already reviewed the course."
            })
        }

        // create entry in DB.
        const feedbackDetails = await RatingAndReview.create({
            user: userId,
            rating:rating,
            review: review,
            course: courseId
        });

        // update in course details
        courseDetails = await Course.findByIdAndUpdate({_id: courseId}, {
            $push: {
                ratingAndReviews: feedbackDetails._id,
            }
        }, {new: true})

        console.log("Updated course: ",courseDetails);

        // return response
        return res.status(200).json({
            success: true,
            message: "Feedback Submitted!",
            data: courseDetails
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error occured!",
            error: error.message
        })
    }
}


// get average rating handler
exports.getAverageRating = async (req, res) => {
    try {
        // get course id
        const courseId = req.body.courseId;

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course Not Found!"
            });
        }

        // calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: {$avg: "$rating"},
                }
            }
        ]);

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        // if not rating/Review exists
        return res.status(200).json({
            success: true,
            message: "Average rating is 0, no ratings given till now for this course.",
            averageRating: 0,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// get all rating and reviews
exports.getAllRating = async (req, res) => {
    try {

        // find all reviews
        const allReviews = await RatingAndReview.find({}).sort({rating: "desc"})
        .populate({
            path: 'user',
            select: "firstName lastName email image"
        })
        .populate({
            path: "course",
            select: "courseName"
        })
        .exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "All review fetched successfully.",
            data: allReviews
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}