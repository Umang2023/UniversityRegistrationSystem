const express = require('express')
const router = express.Router()

router.post('/login',async(req,res)=>{
    try{
        const email = req.body.email
        const password = req.body.password

        if(!email || !password)
        {
            console.log('here')
            throw new Error("email or password missing")
        }
    }catch(error){
        console.log(error)
        return res.status(400).json(error)
    }
    
})

router.get('/login',async (req,res)=>{
    // const email = req.body.email;
    // const password = req.body.password;
    const token={
        n:123,
        a:"abc"
    }
    res.cookie('jwt',token,{
        expires:new Date(Date.now() + 500000),
        httpOnly:true
    })

    console.log(req.cookies.jwt)

    return res.status(200).json('success')
})

module.exports=router;