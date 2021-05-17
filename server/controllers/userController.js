const User =require('../models/userModel')
const generateToken = require('../utils/generateToken')

const authUser = async (req, res) => {
    try{
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user && (await user.matchPassword(password))) {
            res.json({success:true,message:'Successfully LoggedIn',data:{_id: user._id,name: user.name,email: user.email,token: generateToken(user._id)}})
        } else {
            res.status(401)
            throw new Error('Invalid email or password')
        }
    }catch(e){
        console.log(e)
        res.json({success:false,message:'Failed to login',error:`${e}`})
    }
}

const registerUser =async (req, res) => {
    try{
        const { name, email, password } = req.body
        const userExists = await User.findOne({ email })
            if (userExists) {
                res.status(400)
                throw new Error('User already exists')
            }
            const user = await User.create({
                name,
                email,
                password,
            })
            if(user){
                res.status(201).json({success:true,message:'Successfully Registered',data:{_id: user._id,name: user.name,email: user.email,token: generateToken(user._id)}})
            }else{
                res.status(400)
                throw new Error('Invalid user data')
            }
    }
    catch(e){
        console.log(e)
        res.status(400).json({success:false,message:'Failed to register',error:`${e}`})
    }
}

module.exports={authUser,registerUser}