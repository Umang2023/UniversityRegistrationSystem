
const registrationMiddleware = async (req,res,next)=>{
    try{
        
        console.log(process.env.REGISTRATION_STARTED)
        const password=req.body.password
        if(process.env.REGISTRATION_STARTED == 'true')
        next();
        else
        throw new Error('WAIT')
    }catch(error){
        // res.redirect('/signin')
        return res.status(400).json({isError:true, message:error.message})
    }
}

module.exports = registrationMiddleware