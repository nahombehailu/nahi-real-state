
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
       
    

    const token =jwt.sign({id:validUser._id},process.env.JWT_SECRET) 
        const {password:pass,...rest}=validUser._doc 
    
    res.cookie('access_token',token,{httpOnly:true})
     .status(200)
     .json(rest)
        
    } catch (error) {
        next(error)
        
    }
}

export const google= async (req,res,next)=>{
    try {
        
    const user= await User.findOne({email:req.body.email})
    if(user){
      const token =jwt.sign({id:user._id},process.env.JWT_SECRET) 
      const {password:pass,...rest}=user._doc 
        
        res.cookie('access_token',token,{httpOnly:true})
         .status(200)
         .json(rest)
        
    }
    else{
        const generatedPassword=Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8)
        const hashPassword=bcrypt.hashSync(generatedPassword,10)
        const newUser= await new User({
            username:req.body.username.split(" ").join("").toString() + Math.random(),
            email:req.body.email,
            password:generatedPassword,
            avatar:req.body.photo

        })
        await newUser.save()
        res.status(200).json("signup succesfully")
 
        const token =jwt.sign({id:newUser._id},process.env.JWT_SECRET)  
        const {password:pass,...rest}=newUser._doc

        
        res.cookie('access_token',token,{httpOnly:true})
         .status(200)
         .json(rest)

    }
    } catch (error) {
      next(error)
    }


}
export const signOut= async(req,res,next)=>{
    try {

        res.clearCookie('access_token');

          res.status(200).json("user logged out successfully")

      } catch (error) {
          next(error)
      }

}