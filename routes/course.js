const express = require('express')
const router = express.Router()
const authMiddleware=require('../middleware/authMiddlware')
const User = require('../schema/user')
const Course = require('../schema/course')
const adminMiddleware = require('../middleware/adminMiddleware')

router.get('/current',authMiddleware , async (req,res)=>{
    // project aggregation
    var allCourseDetails = await Course.aggregate([
        {$project:{courseName:1 , courseID:1 , remainingSeats : 1}},
    ])

    return res.status(200).json({isError:false , allCourseDetails})

})

router.post('/addCourse' , authMiddleware, adminMiddleware , async (req,res)=>{
    try{
        const courseName=req.body.courseName
        const courseID=req.body.courseID
        const department=req.body.department
        const totalSeats=req.body.totalSeats

        if(!courseID) throw new Error('courseID missing')
        if(!courseName) throw new Error('courseName missing')
        if(!department) throw new Error('department missing')
        if(!totalSeats) throw new Error('totalSeats missing')

        const newAddedCourse=new Course({
            courseName,
            courseID,
            department,
            totalSeats,
            remainingSeats:totalSeats,
            faculty:req.body.faculty,
            prerequisites:req.body.prerequisites
        })

        const savedCourse = await newAddedCourse.save();
        return res.status(200).json({isError:false , savedCourse})

    }catch(error)
    {
        // console.log(error.message)
        return res.status(400).json({isError:true ,  message:error.message})
    }
})

router.put('/register',authMiddleware , async(req,res)=>{
    try{
        const courseID=req.body.courseID;
        var courseSelected = await Course.findOne({courseID})

        if(!courseSelected) throw new Error('No such course available')

        if(courseSelected.remainingSeats  == 0) throw new Error('No vacant seats for the course')

        if(req.user.registeredCourses.length == 6) throw new Error('Maximum registration limit exceeded')

        if(req.user.registeredCourses.includes(courseSelected.id)) throw new Error('Course already registered')

        const courseUpdated = await Course.findOneAndUpdate({courseID},{
            $inc:{remainingSeats:-1}
        },{
            new:true
        })

        const userUpdated=await User.findByIdAndUpdate(req.user.id,{
            $addToSet:{registeredCourses:courseUpdated.id}
        },{
            new:true
        })

        // console.log(userUpdated)
        return res.status(200).json({isError:false,  message:"registration successfull"})

    }catch(error){
        return res.status(400).json({isError:true ,  message:error.message})
    }
    
})

router.put('/drop' , authMiddleware, async(req,res)=>{
    try{
        const courseID=req.body.courseID;
        var courseSelected = await Course.findOne({courseID})

        if(!courseSelected) throw new Error('No such course available')

        if(!req.user.registeredCourses.includes(courseSelected.id)) throw new Error('Course is previously not registered')

        const courseUpdated = await Course.findOneAndUpdate({courseID},{
            $inc:{remainingSeats:1}
        },{
            new:true
        })

        const userUpdated=await User.findByIdAndUpdate(req.user.id,{
            $pull:{registeredCourses:courseUpdated.id}
        },{
            new:true
        })

        return res.status(200).json({isError:false,  message:"course dropped successfully"})

    }catch(error){
        return res.status(400).json({isError:true , message:error.message})
    }
})

module.exports = router;