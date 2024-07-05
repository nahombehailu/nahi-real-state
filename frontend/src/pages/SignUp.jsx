import React, { useState } from 'react'

export default function SignUp() {
  const [formData,setFormData]=useState({});


  const handleChange=(e)=>{
    setFormData({...formData,
      [e.target.id]:e.target.value,
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const res=await fetch('/api/auth/signup',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
      })
  
      const data= await res.json()
      console.log(data);
      
    } catch (error) {
      console.log(error.message);
    }


  }

  console.log(formData);

  return (
    <div>
   <form onSubmit={handleSubmit}>
    <label htmlFor="username">username</label><br />
    <input type="text" id='username' onChange={handleChange} /><br />
    <label htmlFor="email">email</label><br />
    <input type="text" id='email' onChange={handleChange} /><br />
    <label htmlFor="password">password</label><br />
    <input type="text" id='password' onChange={handleChange} /><br />
    <button className='text-red-300 rounded bg-green-300'>signup</button>
   </form>
    </div>
  )
}
