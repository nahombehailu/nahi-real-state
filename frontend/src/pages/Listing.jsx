import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import { FaBath, FaBed, FaChair, FaMapMarked, FaMapMarkedAlt, FaMapMarkerAlt, FaParking } from "react-icons/fa"

export default function Listing() {
    SwiperCore.use([Navigation])
    const params=useParams();
    const [listing,setListing]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    


    useEffect(()=>{
        const fetchingData=async()=>{
            try {
                setLoading(true)
                const listingId=params.listingId
                const res=await fetch(`/api/listing/get/${listingId}`)
                const data= await res.json();
                if(data.success===false){
                    setError(true)
                    setLoading(false)
                    return;
                }
                setListing(data) 
                setLoading(false)
                setError(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }

        };
       fetchingData();
       },[params.listingId]);

  return (
    <main >
     {listing && !loading && !error &&(
        <div>
        <Swiper navigation>
            {listing.imageUrls.map((url)=>( 
           
           <SwiperSlide key={url}>
            <div className="h-[550px]" style={{background:`url(${url}) center no-repeat`,backgroundSize:'cover',}}></div>

         </SwiperSlide>

            ))}

        </Swiper>
<div className="flex justify-center items-center gap-4 m-7 ">
<p className="text-3xl align-middle font-semibold">{listing.name}-$ {listing.regularPrice} /month </p> 
</div>
<div className="flex gap-2 justify-center items-center  "> <p className="text-3xl"><FaMapMarkerAlt/></p>
 <p className="text-xl"> {listing.address}</p></div>
 <div className="flex justify-center items-center gap-3">
 <button type="button" className="text-center bg-red-700 px-7 py-2 rounded-lg my-5 sm:px-12"> {listing.type}</button>
 {listing.offer &&(
 <button  type="button" className="text-center bg-green-700 px-7 py-2 rounded-lg my-5 sm:px-16"> $-{listing.discountPrice}</button>


 )}

 </div>
<p className="text-2xl mx-auto m-3 max-w-4xl"><span className="text-2 xl font-semibold ">description:</span>{listing.description}</p>
<ul className=" flex gap-4 sm:gap-8 max-w-2xl mx-auto m-6 "  >
    <li className="text-xl flex items-center gap-2 text-green-900 font-semibold whitespace-nowrap"><FaBed /> 
    {listing.bedrooms.length > 1 ? `${listing.bedrooms} beds`:`${listing.bedrooms} bed`}
    </li>
    <li className="text-xl flex items-center gap-2 text-green-900 font-semibold whitespace-nowrap"><FaBath /> 
    {listing.bedrooms.length > 1 ? `${listing.bathrooms} baths `:`${listing.bathrooms} bath`}
    
    </li>
    <li className="text-xl flex items-center gap-2 text-green-900 font-semibold whitespace-nowrap"><FaParking /> 
    {listing.parking ? "Parking Spot":'No Parking'}
    </li>
    <li className="text-xl flex items-center gap-2 text-green-900 font-semibold whitespace-nowrap"><FaChair /> 
    {listing.furnished ? "Furnished":'No Furnished'}
    </li>
</ul>

 
</div> 

    
)
     
     }

<div>
    
</div>
 
    </main>
  )
}

