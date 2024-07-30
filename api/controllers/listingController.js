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

export const getListings =async (req,res,next)=>{
    try {
       const limit=parseInt(req.query.limit) || 9;
       const startIndex=parseInt(req.query.startIndex) || 0;
       let offer=req.query.offer;
       if(offer==='false' || offer===undefined){
        offer={$in:[false,true]}
       }

       let parking=req.query.parking;
       if(parking==='false' || parking===undefined){
        {$in:[false,true]}
       }

       let furnished=req.query.furnished;
       if(furnished==='false' || furnished===undefined){
        furnished={$in:[false,true]}
       }
        let type=req.query.type;
       if(type===undefined || type==='all'){
        type={$in:['sale','rent']}
       }

       const searchTerm=req.query.searchTerm || ""
        const sort=req.query.sort || "createdAt"
        const order=req.query.order || "desc"

       const listings=await Listing.find({
        name:{$regex:searchTerm,$options:"i"},
        offer,
        parking,
        furnished,
        type,
       }).sort(
        {[sort]:order}
       ).limit(limit).skip(startIndex)
     
      return res.status(200).json(listings);
    } catch (error) {
       next(error)
    }
      
      }
   