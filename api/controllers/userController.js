import User from "../models/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from "bcryptjs"

export const test= async(req,res)=>{
    res.json("messag:this is tes page")
}

    export const updateUser=async (req,res,next)=>{
    if(req.user.id !==req.params.id) return next(errorHandler(401,"you can only update your account"))
        try {
    if (req.body.password){
        req.body.password=bcrypt.hashSync(req.body.password,10)
    }
    const userUpdate= await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.avatar,

        }

    },{new:true})

    const {password:pass, ...rest}=userUpdate._doc
    res.status(200).json(rest)
            
        } catch (error) {
            next(error)
        }
    
}

export const deleteUser= async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,"you can only delete your account"))
        try {

          await User.findByIdAndDelete(req.params.id)
          res.clearCookie('access_token');

            res.status(200).json("user deleted successfully")

        } catch (error) {
            next(error)
        }

}

 