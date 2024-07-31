import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import OAuth from '../componets/OAuth';

export default function SignUp() {
  const [formData,setFormData]=useState({});
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const navigate=useNavigate()




  const handleChange=(e)=>{
    setFormData({...formData,
      [e.target.id]:e.target.value,
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      setLoading(true)
      const res=await fetch('/api/auth/signup',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
      })
  
      const data= await res.json()
      if(data.success===false){
        setError(data.message)
        setLoading(false)
      }
      else{
      setLoading(false)
      setError(null)
      navigate('/signin')
      console.log(data);
    }
      
    } catch (error) {
      setLoading(false)
      console.log(error.message);

    }


  }

  console.log(formData);

  return (
    <div className="max-w-2xl mx-auto">
   <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center px-20 mt-20 gap-2 bg-slate-200 p-5'>
  
    <input type="text" id='username' onChange={handleChange} placeholder='username' className='m-3 w- p-3 px-20 sm:w-full'  />
  
    <input type="text" id='email' onChange={handleChange}  placeholder='email' className='m-3 w- p-3 px-20 sm:w-full' />

    <input type="text" id='password' onChange={handleChange}  placeholder='password' className='m-3 w- p-3 px-20 sm:w-full'/>
    <button disabled={loading} className='text-red-300 rounded bg-green-700 m-3 w-full p-2'>
      {loading? loading :'signup'}</button>
      <OAuth />
   </form>
   <div className='flex justify-center items-center gap-2'>
    <p>do you have an account</p><Link to='/signin' className='text-gray-400'>signin</Link>
   </div>
   <div>{error &&(
    <div className='text-red-700'>{error}</div>
   )}
   </div>
    </div>
  )
}
