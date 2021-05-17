const jwt=require('jsonwebtoken')
const User = require('../models/userModel')

const protect = async (req, res, next) => {
    let token
    try{
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ){
            try{
                token = req.headers.authorization.split(' ')[1]
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                req.user = await User.findById(decoded.id).select('-password')
                next()
            }catch(error){
                console.error(error)
                res.status(401)
                throw new Error('Not authorized, token failed')
            }
        }
        if(!token){
            res.status(401)
            throw new Error('Not authorized, no token')
        }
    }catch(e){
        console.log(e)
        res.send({success:false,message:'Authorization Problem',error:`${e}`})
    }
}

module.exports = {protect}