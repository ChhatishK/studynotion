const Section = require('../models/Section');
const Course = require('../models/Course');
const mongoose = require('mongoose')
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
        }).exec();

        // HW: use populate to replace sections/sub-section both in the updatedCourseDetails
        

        // return response
        return res.status(200).json({
            success: true,
            message: "Section added successfully!",
            updatedCourse
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
        const {sectionName, sectionId} = req.body;
        // data validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }
        // update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName},  {new: true});

        // return response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully!",
            section
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
        const {sectionId} = req.body;

        // delete section using findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);

        // TODO: (testing) - delete section id from course schema

        // reutrn response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully!"
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