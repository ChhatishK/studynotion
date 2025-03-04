const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {courseEntrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const { default: mongoose } = require('mongoose');


// capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) =>{
    try {
        // get courseId and UserId
        const {course_id} = req.body;
        const userId = req.user.id;
        // validation
        // valid courseID
        if (!course_id) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid course"
            });
        }
        // valid courseDetails
        let course = await Course.findById(course_id);

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course Not Found!"
            })
        }
        
        // user already purchased course
        const uid = new mongoose.Schema.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            return res.status(400).json({
                success: false,
                message: "User already have purchased the course."
            });
        }
        // create order
        const amount = course.price;
        const currency = "INR";
        
        const options = {
            amount: amount*100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: course_id,
                userId
            }
        }

        try {
            // initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);

            return res.status(200).json({
                success: false,
                courseName:course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
                message: "Course Purchased successfully!"
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Could not initiate orders"
            })
        }
        // return response
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// verify signature of Razorpay and Server

exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log("Payment is Authorized!");

        const {userId, courseId} = req.body.payload.payment.entity.notes;

        try {
            // fulfil the action
            // find the course and update the user... in it
            const enrolledCourse = await Course.findOneAndUpdate(courseId, {
                $push: {studentsEnrolled: userId}
            },{new: true});

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course Not Found"
                });
            }

            console.log(enrolledCourse);

            // find the student and add the coure to their list enrolled course
            const enrolledStudent = await User.findOneAndUpdate(userId, {
                $push: {
                    courses: courseId
                }
            }, {new: true});

            console.log(enrolledStudent);

            // send confirmation mail
            const emailResponse = await mailSender(
                enrolledStudent.email, 
                "Congratulations from StudyNotion",
                "Congratulations, You are onboarded into new StudyNotion course."
            );

            console.log(emailResponse);

            return res.status(200).json({
                success: true,
                message: "Signature verified and Course Added."
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    } else {
        return res.status(500).json({
            success: false,
            message: "Invalid Request."
        })
    }
}