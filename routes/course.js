const express = require('express')
const router = express.Router()
const authMiddleware=require('../middleware/authMiddlware')
const User = require('../schema/user')
const Course = require('../schema/course')

router.get('/current',authMiddleware , async (req,res)=>{
    // project aggregation
})

router.post('/addCourse' , authMiddleware , async (req,res)=>{
    try{
        const courseName=req.body.courseName
        const courseID=req.body.courseID
        const department=req.body.department
        const totalSeats=req.body.totalSeats

        const newAddedCourse=new Course({
            courseName,
            courseID,
            department,
            totalSeats,
            remainingSeats:0,
            faculty:req.body.faculty,
            prerequisites:req.body.prerequisites
        })

        const savedCourse = await newAddedCourse.save();
        return res.status(200).json({isError:false , savedCourse})

    }catch(error)
    {
        return res.status(400).json(error.message)
    }
})

router.put('/register',authMiddleware , async(req,res)=>{
    const courseID=req.body.courseID;

    const courseDetails = await Course.findOne({courseID:courseID})
    // const updatedData = User.findOneAndUpdate()
})

module.exports = router;