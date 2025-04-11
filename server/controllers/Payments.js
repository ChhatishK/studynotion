const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const { default: mongoose } = require('mongoose');
const { paymentSuccessEmail } = require('../mail/templates/sendPaymentSuccessEmail');
const crypto = require('crypto');
const CourseProgress = require('../models/CourseProgress');
const RatingAndReview = require('../models/RatingAndReview')
require('dotenv').config();

// Capture the payment and initiate the Razorpay order for multiple courses

exports.capturePayment = async (req, res) => {
    try {
        const {courses} = req.body;
        const userId = req.user.id;
    
        if (courses.length === 0) {
            return res.json(({
                success: false,
                message: "Please provide course id"
            }))
        }
    
        let totalAmount = 0;
    
        for (const course_id of courses) {
            let course;
    
            try {
                course = await Course.findById(course_id);
    
                if (!course) {
                    return res.json({
                        success: false,
                        message: "Could not found the course"
                    })
                }
    
                const uid = new mongoose.Types.ObjectId(userId)
    
                if (course.studentsEnrolled.includes(uid)) {
                    console.log(error);
                    return res.status(500).json({
                        success: false,
                        message: "Student Enrolled already!"
                    })
                }

                totalAmount += course.price;

            } catch(error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: error.message
                })
            }
        }


        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString()
        }

        try {
            // console.log("Payment initiation process started")
            const paymentResponse = await instance.orders.create(options);

            // console.log("Payment response : ", paymentResponse);

            res.status(200).json({
                success: true,
                message: "Courses purchased",
                data: paymentResponse
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Could not initiate order"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
} 

// verify the payment

exports.verifyPayment = async (req, res) => {
    try {
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;
        const {courses} = req.body;
        const userId = req.user.id;

        console.log("COURSES: ", courses);

        if (!razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !courses || !userId
        ) {
            return res.status(200).json({
                success: false,
                message: "Payment Failed"
            })
        }

        let body = razorpay_order_id + "|" + razorpay_payment_id

        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if (expectedSignature === razorpay_signature) {
            // enroll the student
            await enrollStudents(courses, userId, res);

            // return res
            return res.status(200).json({
                success: true,
                message: "Payment verified"
            })
        }

        return res.status(200).json({
            success: false,
            message: "Payment Failed"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Payment Verification Failed",
            error: error.message
        })
    }
}


const enrollStudents = async (courses, userId, res) => {

    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide data for courses or userid"
        })
    }

    for (const courseId of courses) {
        const course_id = new mongoose.Types.ObjectId(courseId)
        try {
            // find the course and enroll in it
            const enrolledCourse = await Course.findByIdAndUpdate(
                course_id,
                {$push: {studentsEnrolled: userId}},
                {new: true}
            )

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course not found"
                })
            }

            // add course in CourseProgress modal
            await CourseProgress.create({
                courseId: course_id, 
                userId: userId
            })

            // find the student and add the course to their list of enrolledcourse

            const enrolledStudent = await User.findByIdAndUpdate(
                {_id: userId},
                {$push: {courses: courseId}},
                {new: true}
            )

            // send email to the student
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
            )

            console.log("Email sent successfully!", emailResponse);

        } catch(error) {
            console.log(error) 
            return res.status(200).json({
                success: false,
                message: "Course could not purchased"
            })
            
        }

    }

}


exports.sendPaymentSuccessEmail = async (req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the fields"
        })
    }

    try {
        const enrolledStudent = await User.findById(userId)

        await mailSender(
            enrolledStudent.email,
            "Payment Received",
            paymentSuccessEmail(`${enrolledStudent.firstName} ${enrolledStudent.lastName}`, amount/100, orderId, paymentId)
        )
    } catch (error) {
        console.log("Error in sendint mail")
        return res.status(500).json({
            success: false,
            message: "Could not send the email"
        })
    }
}

/*
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
} */

// verify signature of Razorpay and Server

// exports.verifySignature = async (req, res) => {
//     const webhookSecret = "12345678";
//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (signature === digest) {
//         console.log("Payment is Authorized!");

//         const {userId, courseId} = req.body.payload.payment.entity.notes;

//         try {
//             // fulfil the action
//             // find the course and update the user... in it
//             const enrolledCourse = await Course.findOneAndUpdate(courseId, {
//                 $push: {studentsEnrolled: userId}
//             },{new: true});

//             if (!enrolledCourse) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "Course Not Found"
//                 });
//             }

//             console.log(enrolledCourse);

//             // find the student and add the coure to their list enrolled course
//             const enrolledStudent = await User.findOneAndUpdate(userId, {
//                 $push: {
//                     courses: courseId
//                 }
//             }, {new: true});

//             console.log(enrolledStudent);

//             // send confirmation mail
//             const emailResponse = await mailSender(
//                 enrolledStudent.email, 
//                 "Congratulations from StudyNotion",
//                 "Congratulations, You are onboarded into new StudyNotion course."
//             );

//             console.log(emailResponse);

//             return res.status(200).json({
//                 success: true,
//                 message: "Signature verified and Course Added."
//             })
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success: false,
//                 message: error.message
//             })
//         }
//     } else {
//         return res.status(500).json({
//             success: false,
//             message: "Invalid Request."
//         })
//     }
// }