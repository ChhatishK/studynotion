const mongoose = require('mongoose');

// contact us schema
const contactusSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    message: [{
        type: String,
        required: true,
        date: Date.now()
    }], 
    user: {
        type: String,
        enum: ["Instructor", "Student", "Visitor"]
    }
    
})

module.exports = mongoose.model("Contact", contactusSchema);