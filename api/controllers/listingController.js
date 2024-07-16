import Listing from "../models/listingModel.js"

export const createListing= async (req,res,next)=>{
    try {
        const createList=await Listing.create(req.body)
        res.status(201).json(createList)

    } catch (error) {
        next(error)
    }
}