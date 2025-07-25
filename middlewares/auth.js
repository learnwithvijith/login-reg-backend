const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
const authMiddleware = (req,res,next)=>{

    const token = req.header('Authorization')?.replace('Bearer ','')
    if(!token) return res.status(401).json({
        message:'No token, Access denied'
    }) 
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decode.user
        next()
    }catch(error){
        console.log(error)
    }
}

module.exports = {authMiddleware}