const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: {
        type:String,
        required: true,
        trim: true,
    },
    courseDescription: {
        type:String,
        required: true,
        trim: true,
    },
    instructor: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    tag: {
        type: [String],
        required: true,
    },
    whatYouWillLearn: {
        type:String,
        trim: true,
        required: true,
    },

    courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }],
    ratingAndReviews: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview"
    }],
    price: {
        type: Number,
    },
    thumbnail: {
        type:String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    instructions: {
        type: [String],
        required: true
    },
    status: {
        type:String,
        enum: ['Draft', 'Published']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Course", courseSchema);