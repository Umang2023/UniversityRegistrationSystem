const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
    courseName:{
        type:String
    },
    courseID:{
        type:String,
        unique:true
    },
    department:{
        type:String
    },
    prerequisites:[{
        type:String
    }],
    faculty:[{
        type:String
    }],
    totalSeats:{
        type:Number
    },
    remainingSeats:{
        type:Number
    }
})

const Course = mongoose.model('Course' , courseSchema);
module.exports = Course