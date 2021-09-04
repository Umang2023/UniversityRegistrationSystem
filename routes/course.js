const express = require('express')
const router = express.Router()
const authMiddleware=require('../middleware/authMiddlware')
const User = require('../schema/user')
const Course = require('../schema/course')

router.get('/current',authMiddleware , async (req,res)=>{
    // project aggregation
})

router.put('/register',authMiddleware , async(req,res)=>{
    const courseID=req.body.courseID;

    const courseDetails = await Course.findOne({courseID:courseID})
    // const updatedData = User.findOneAndUpdate()
})

module.exports = router;