import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signFailure,signInStart,signSuccess } from '../redux/user/userSlice';
import OAuth from '../componets/OAuth';


export default function SignIn() {
  const [formData,setFormData]=useState({});
  const error=useSelector((state)=>(state.user));
  const loading=useSelector((state)=>(state.user));
  const navigate=useNavigate()
  const dispatch=useDispatch()


const handleChange=(e)=>{
    setFormData({...formData,
      [e.target.id]:e.target.value,
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res=await fetch('/api/auth/signin',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
      })
  
      const data= await res.json()
      if(data.success===false){
        dispatch(signFailure(data.message))
      }
 
      dispatch(signSuccess(data))
      navigate('/')
      console.log(data);
  
      
    } catch (error) {
      dispatch(signFailure(error.message))

    }


  }

  console.log(formData);
  return (
    <div className='w-full'>
      <div className='w-50'>
   <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center m-10'>
    <input type="text" id='email' onChange={handleChange}  placeholder='email' className='py-2 px-10 rounded-md focus:outline-none' />
    <label htmlFor="password">password</label>
    <input type="text" id='password' onChange={handleChange}  placeholder='password' className='py-2 px-10 rounded-md focus:outline-none'/>
    <button disabled={loading} className='text-red-300 rounded bg-green-700 m-3 w- p-3 px-20 sm:w-full '>
      {loading? loading :'signin'}</button>
      <OAuth />
   </form>
   </div>
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
