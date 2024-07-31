import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    const [landlord,setLandlord]=useState(null);
    const [message,setMessage]=useState();

    useEffect(()=>{
        const fetchLandlord=async()=>{
            try {
            const res = await fetch(`/api/user/${listing.userRef}`);
            const data=await res.json()
            setLandlord(data)


            } catch (error) { 
                console.log(error.message)
            }


        }
        fetchLandlord();
    },[listing.userRef])


  return (
    <>
  
  {landlord &&(
    <div className='max-w-3xl mx-auto m-2'>
        <p>Contact <span className='font-semibold text-xl'>{landlord.username} for <span className='font-semibold text-xl focus:outline-none'>{listing.name}</span></span></p>
        <textarea value={message} onChange={(e)=>setMessage(e.target.value)} name="message" id="message" placeholder='write your message here' rows='2' className='w-full p-3 my-3 bordr border-gray-50 rounded-lg focus:outline-dotted'></textarea>
        <div  className="w-full bg-slate-700 rounded-lg uppercase text-white text-center  p-3">
    <Link to={`mailto:${landlord.email}? subject= Regarding ${listing.name}&body=${message}`} className="text-center bg-slate-700 rounded-lg uppercase text-white  p-3">
    send message
    </Link>
    </div>
    </div>
  )}
    </>
  )
}
