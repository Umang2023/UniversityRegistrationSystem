const User = require('../schema/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const adminMiddleware = async (req,res,next)=>{
    try{
        
        const password=req.body.password
        if(password == process.env.ADMIN_PASSWORD)
        next();
        else
        throw new Error('wrong admin password')
    }catch(error){
        // res.redirect('/signin')
        return res.status(401).json({isError:true, message:error.message})
    }
}

module.exports = adminMiddleware