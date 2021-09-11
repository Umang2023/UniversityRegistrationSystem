const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    fatherName: {
        type: String
    },
    motherName: {
        type: String
    },
    branch: {
        type: String
    },
    yearOfAdmission: {
        type: Number
    },
    yearOfStudy: {
        type: Number
    },
    dob: {
        type: Date
    },
    backlog: {
        type: Number
    },
    registeredCourses: [{
        type: ObjectId,
        ref: 'Course',
    }]
})

const User = mongoose.model('User', userSchema);
module.exports = User