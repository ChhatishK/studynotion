const CourseProgress = require("../models/CourseProgress");

exports.lectureCompletion = async (req, res) => {
    try {

        const {courseId, subSectionId} = req.body;
        const userId = req.user.id;

        // console.log(courseId, subSectionId, userId)

        let courseProgress = await CourseProgress.findOne({courseId: courseId, userId: userId});

        console.log(courseProgress);

        if (courseProgress.completedVideos.includes(subSectionId)) {
            return res.status(404).json({
                success: false,
                message: "Lecture already mark as completed!"
            })
        }

        courseProgress.completedVideos.push(subSectionId);
        await courseProgress.save();

        console.log(courseProgress)

        return res.status(200).json({
            success: true,
            message: "Course progress updated!"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Course progress not updated!"
        })
    }
}