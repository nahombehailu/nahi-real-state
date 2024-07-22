import Listing from "../models/listingModel.js"
import { errorHandler } from "../utils/error.js"

export const createListing= async (req,res,next)=>{
    try {
        const createList=await Listing.create(req.body)
        res.status(201).json(createList)

    } catch (error) {
        next(error)
    }
}
export const deleteListing=async (req,res,next)=>{
    const listing= await Listing.findById(req.params.id);

    if(!listing) {
        return next(errorHandler(404,"listing is not found"));
}
// if(req.user.id !== listing.userRef)
//     {
//         return next(errorHandler(401,"you can only delete your listing"))
        
//     }

    try {
        
    await Listing.findByIdAndDelete(req.params.id)
    res.status(200).json("listing has been deleted")
    } catch (error) {
        next(error)
    }
}

export const updateListing=async (req,res,next)=>{
    

    const listing= await Listing.findById(req.params.id)
    
  if(!listing) {
        return next(errorHandler(401,"listing is not found"))
        res.status(404).json("erojdjnfn")
}
// if(req.user.id !== Listing.userRef)
//     {
//         return next(errorHandler(401,"you can only update your listing"))
        
//     }

  
try {    
const updatedListing= await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    {news:true}
)
    res.status(200).json(updatedListing)
    } catch (error) {
        next(error)
    }
}

export const getListing=async(req,res,next)=>{
    try {
        const listing= await Listing.findById(req.params.id)
        if(!listing) return next(errorHandler(404,"listing not found"))

          res.status(200).json(listing)  

        
    } catch (error) {
        next(error)
    }
}