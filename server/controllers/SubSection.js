const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadFileToCloudinary } = require("../utils/uploadImageToCloudinary");
require("dotenv").config();

// handler function for subsetion
exports.createSubSection = async (req, res) => {
    try {
        // fetch form data
        const { title, timeDuration, description, sectionId } = req.body;
        // fetch file/video
        let video = req.files.videoFile;

        // validation
        if (
            !title ||
            !timeDuration ||
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
            updatedSection,
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
        const { sectionId, title, description } = req.body;
        const subSection = await SubSection.findById(sectionId);

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
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video;
            const uploadDetails = await uploadFileToCloudinary(
                video,
                process.env.FOLDER_NAME
            );
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`;
        }

        await subSection.save();

        return res.json({
            success: true,
            message: "Section updated successfully",
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
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        );
        const subSection = await SubSection.findByIdAndDelete({
            _id: subSectionId,
        });

        if (!subSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" });
        }

        return res.json({
            success: true,
            message: "SubSection deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the SubSection",
        });
    }
};
