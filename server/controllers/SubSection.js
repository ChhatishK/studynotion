const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadFileToCloudinary } = require("../utils/uploadImageToCloudinary");
require("dotenv").config();

// handler function for subsetion
exports.createSubSection = async (req, res) => {
    try {
        // fetch form data
        console.log(req.body);
        const { title, description, sectionId } = req.body;
        // fetch file/video
        let video = req.files.videoUrl;

        // validation
        if (
            !title ||
            !description ||
            !video ||
            !sectionId
        ) {
            return res.status(401).json({
                success: false,
                message: "All fields are requierd!",
            });
        }

        // uplaod file to cloudinary
        console.log('uploading to cloudinary')
        const cloudinaryResponse = await uploadFileToCloudinary(
            video,
            process.env.FOLDER_NAME
        );

        console.log('uploaded to cloudinary.')

        // create entry in DB.
        const newSubsection = await SubSection.create({
            title: title,
            timeDuration: `${cloudinaryResponse.duration}`,
            description: description,
            videoUrl: cloudinaryResponse.secure_url,
        });

        // update section with subsection ObjectId
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subSection: newSubsection._id,
                },
            },
            { new: true }
        )
            .populate("subSection")
            .exec();

        // return response.
        return res.status(200).json({
            success: true,
            message: "Subsection added successfully!",
            data: updatedSection,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in adding subsection",
            error: error.message,
        });
    }
};

// update subsection
exports.updateSubSection = async (req, res) => {
    try {

        const { sectionId, subSectionId, title, description } = req.body;
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        if (title !== undefined) {
            subSection.title = title;
        }

        if (description !== undefined) {
            subSection.description = description;
        }
        
        if (req.files && req.files.videoUrl !== undefined) {
            const video = req.files.videoUrl;
            const uploadDetails = await uploadFileToCloudinary(
                video,
                process.env.FOLDER_NAME
            );
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`;
        }

        await subSection.save();

            // find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.json({
            success: true,
            message: "Section updated successfully",
            data: updatedSection
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section",
        });
    }
};

exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;
        const subSection = await SubSection.findByIdAndDelete({
            _id: subSectionId,
        });
        
        await Section.findByIdAndUpdate(
            sectionId,
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        );

        if (!subSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" });
        }

        const updatedSection = await Section.findById(sectionId).populate("subSection");

        return res.json({
            success: true,
            message: "SubSection deleted successfully",
            data: updatedSection
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the SubSection",
        });
    }
};
