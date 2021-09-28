const express = require('express')
const router = express.Router()
const authMiddleware=require('../middleware/authMiddlware')
const User = require('../schema/user')
const Course = require('../schema/course')
const Announcement = require('../schema/announcement')
const adminMiddleware = require('../middleware/adminMiddleware')

router.get('/current',authMiddleware , async (req,res)=>{
    // project aggregation
    var allAnnouncement = await Announcement.aggregate(
    [
        {$sort:{date:-1}}
    ]
    )

    return res.status(200).json({isError:false , allAnnouncement})

})

router.post('/add' , authMiddleware, adminMiddleware , async (req,res)=>{
    try{
        const title=req.body.title
        const department=req.body.department
        const content=req.body.content

        if(!title) throw new Error('title missing')
        if(!content) throw new Error('content missing')
        if(!department) throw new Error('department missing')

        // console.log(req.user)
        const newAnnouncement=new Announcement({
            title,
            content,
            department,
            postedBy:req.user.id
        })

        const savedAnnouncement = await newAnnouncement.save();

        return res.status(200).json({isError:false , savedAnnouncement})

    }catch(error)
    {
        // console.log(error.message)
        return res.status(400).json({isError:true ,  message:error.message})
    }
})

router.put('/addFaculty', authMiddleware, adminMiddleware, async(req,res)=>{
    try{
        const courseID=req.body.courseID;
        const facultyName=req.body.facultyName;
        var courseSelected = await Course.findOne({courseID})

        if(!courseSelected) throw new Error('No such course available')

        const courseUpdated = await Course.findOneAndUpdate({courseID:courseID},{
            $addToSet:{faculty:facultyName}
        },{
            new:true
        })

        return res.status(200).json({isError:false,  message:"faculty added successfully", data:courseUpdated})
    }catch(error)
    {
        return res.status(400).json({isError:true ,  message:error.message})
    }
    
})

module.exports = router;