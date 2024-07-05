
import User from '../models/userModel.js'
export const signup= async (req,res,next)=>{

    try {

    const {username,email,password}=req.body;

    const newUser=new User({username,email,password});
    await newUser.save()
    res.status(200).json("signup succesfully")
        
    } catch (error) {
       next(error)
    }


}