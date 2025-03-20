const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require('../models/SubSection');

// create Section handler
exports.createSection = async (req, res) => {
    try {

        // fetch data
        const {sectionName, courseId} = req.body;
        // update course with section ObjectId
        // return reponse

        // validation
        if (!sectionName || !courseId) {
            return res.status(401).json({
                success: false,
                message: "Section name is required!"
            })
        }

        // create entry in DB.
        const newSection = await Section.create({sectionName});

        // update course with section ObjectId
        const updatedCourse = await Course.findByIdAndUpdate(courseId, 
            {
                $push: {
                    courseContent: newSection._id
                }
            }, {new: true}
        ).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection'
            }
        });

        // return response
        return res.status(200).json({
            success: true,
            message: "Section added successfully!",
            data: updatedCourse
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in creating section",
            error: error.message
        })
    }
}

// update section handler
exports.updateSection = async (req, res) => {
    try {
        // fetch data
        const {sectionName, sectionId, courseId} = req.body;
        // data validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

        console.log(courseId);

        // update data
        const course = await Course.findById(courseId)
                        .populate({
                            path:"courseContent",
                            populate:{
                                path:"subSection",
                            },
                        })
                        .exec();

        console.log(course);

        // return response
        return res.status(200).json({
            success: true,
            message: section,
            data: course
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in creating section",
            error: error.message
        })
    }
}

// delete section
exports.deleteSection = async (req, res) => {
    try {
        // get section id - assuming we are sending ID in params
        const {sectionId, courseId} = req.body;

        //delete sub section
		await SubSection.deleteMany({_id: {$in: Section.subSection}});

        // delete section using findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);

        // TODO: (testing) - delete section id from course schema
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
            {
                $pull: {
                    courseContent: sectionId
                }
            }
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();

        // reutrn response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully!",
            data: updatedCourse
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in creating section",
            error: error.message
        })
    }
}