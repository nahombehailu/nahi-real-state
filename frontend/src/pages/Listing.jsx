import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'

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
    <main>
     {listing && !loading && !error &&(
        <Swiper navigation>
            {listing.imageUrls.map((url)=>( 
           <SwiperSlide key={url}>
            <div className="h-[550px]" style={{background:`url(${url}) center no-repeat`,backgroundSize:'cover',}}></div>

         </SwiperSlide>

            ))}

        </Swiper>
     )}
    </main>
  )
}

