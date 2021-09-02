const User = require('../schema/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const authMiddleware = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt
        console.log(token)
        const verifyUser = jwt.verify(token , process.env.JWT_SECRET_KEY)
        const user=await User.findOne({email : verifyUser._email})
        next();
    }catch(error){
        res.redirect('/')
        // res.status(401).send(error)
    }
}

module.exports = authMiddleware