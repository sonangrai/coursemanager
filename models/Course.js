const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("Courses", CourseSchema);