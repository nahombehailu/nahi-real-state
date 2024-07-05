
import User from '../models/userModel.js'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

export const signup= async (req,res,next)=>{

    dotenv.config()


    const {username,email,password}=req.body;
    
    // if(!username || !email  || !password || email==='' || username==="" || password===""){
    //     next(errorHandler(550,"all fields are required"))
    // }

    try {
        const hashed_password=bcrypt.hashSync(password)
    const newUser= await new User({username,email,password:hashed_password});
    await newUser.save()
    res.status(200).json("signup succesfully")
        
    } catch (error) {
       next(error)
    }


}

export const signin=async (req,res,next)=>{
    const {email,password}=req.body;
    try {
        const validUser= await User.findOne({email})
        if(!validUser) return next(errorHandler(404,"user not found"))
        const validPassword= bcrypt.compareSync(password,validUser.password)
    if(!validPassword) return next(errorHandler(401,"invalid username or password")) 
       
        const {password:pass,...rest}=validUser._doc

    const token =jwt.sign({id:validUser._id},process.env.JWT_SECRET)  
    
    res.cookie('access_token',token,{httpOnly:true})
     .status(200)
     .json(rest)
        
    } catch (error) {
        next(error)
        
    }
}