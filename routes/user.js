const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../schema/user')
const jwt = require('jsonwebtoken')
const authMiddleware=require('../middleware/authMiddlware')

router.post('/signup',async (req,res)=>{
    try{
        const email = req.body.email
        const password = req.body.password
        const name = req.body.name

        if(!email) throw new Error('email missing')
        if(!name) throw new Error('name missing')
        if(!password) throw new Error('password missing')

        let prevUser=await User.findOne({email : email})    
        if(prevUser)
        {
            throw new Error('user already exists');
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            name,
            email:email,
            password:hashedPassword
        })

        const savedUser = await newUser.save()
        return res.status(200).json({isError:false , message:"user saved successfully"})
    }catch(e){
        // console.log(e)
        return res.status(400).json({isError:true , message:e.message})
    }
})

router.post('/login',async(req,res)=>{
    try{
        const email = req.body.email
        const password = req.body.password

        if(!email || !password)
            throw new Error("email or password missing")
        
        const prevUser=await User.findOne({email})
        if(!prevUser)
        {
            throw new Error('No such user exists')
        }

        const isMatch = await bcrypt.compare(password , prevUser.password)
        if(!isMatch) throw new Error('Incorrect password')

        const token = jwt.sign({email:email} , process.env.JWT_SECRET_KEY)
        res.cookie('jwt',token,{
            expires:new Date(Date.now() + 1000*15*24*60*60),
            httpOnly:true
        })

        return res.status(200).json({isError:false , message:"Login successful"})
        

    }catch(e){
        return res.status(400).json({isError:true , message : e.message})
    }
    
})

router.get('/protected',authMiddleware,async (req,res)=>{
    return res.json("nice")
})

router.put('/editDetails', authMiddleware , async (req,res)=>{
    try{
        name=req.body.name;
        fatherName=req.body.fatherName;
        motherName=req.body.motherName;
        branch=req.body.branch;
        yearOfStudy=req.body.yearOfStudy;
        yearOfAdmission=req.body.yearOfAdmission;
        dob=req.body.dob;
        backlog=req.body.backlog;

        const updatedUser = await User.findOneAndUpdate({email:req.user.email},{
            name:req.body.name,
            fatherName:req.body.fatherName,
            motherName:req.body.motherName,
            branch:req.body.branch,
            yearOfStudy:req.body.yearOfStudy,
            yearOfAdmission:req.body.yearOfAdmission,
            dob:req.body.dob,
            backlog:req.body.backlog,
        },{
            new:true
        })
        .catch(err=>{
            throw new err
        })

        return res.status(200).json({isError:false , updatedUser})

    }catch(error){
        return res.status(400).json({isError:true , message:error.message})
    }
    

    
})

router.get('/test', authMiddleware, async (req,res)=>{
    console.log(req.user)
})

module.exports=router;