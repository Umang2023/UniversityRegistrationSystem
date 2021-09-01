const User = require('../schema/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const authMiddleware = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt
        const verifyUser = jwt.verify(token , process.env.SECRET_KEY)
        
    }catch(error){
        console.log(error)
    }
}