import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function SignIn() {
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
      const res=await fetch('/api/auth/signin',{
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
      navigate('/')
      console.log(data);
    }
      
    } catch (error) {
      setLoading(false)
      console.log(error.message);

    }


  }

  console.log(formData);
  return (
    <div className=''>
   <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center px-20 mt-20'>
    <input type="text" id='email' onChange={handleChange}  placeholder='email' className='py-2 px-10 rounded-md focus:outline-none' />
    <label htmlFor="password">password</label>
    <input type="text" id='password' onChange={handleChange}  placeholder='password' className='py-2 px-10 rounded-md focus:outline-none'/>
    <button disabled={loading} className='text-red-300 rounded bg-green-700 m-3 py-2 px-10'>
      {loading? loading :'signin'}</button>
   </form>
   <div className='flex justify-center items-center gap-2'>
    <p>don`t` have an account</p><Link to='/signup' className='text-gray-400'>signup</Link>
   </div>
   <div>{error &&(
    <div className='text-red-700'>{error}</div>
   )}
   </div>
    </div>
  )
}
