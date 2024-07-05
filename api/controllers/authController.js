
import User from '../models/userModel.js'
import { errorHandler } from '../utils/error.js';
export const signup= async (req,res,next)=>{


    const {username,email,password}=req.body;
    
    // if(!username || !email  || !password || email==='' || username==="" || password===""){
    //     next(errorHandler(550,"all fields are required"))
    // }

    try {
    const newUser=new User({username,email,password});
    await newUser.save()
    res.status(200).json("signup succesfully")
        
    } catch (error) {
       next(error)
    }


}