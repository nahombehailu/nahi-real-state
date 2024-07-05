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
    const res=await fetch('http://localhost:3000/api/authsignup',{
      method:"POST",
      body:JSON.stringify(formData)
    })

    const data= await res.json()
    console.log(data);

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
    <button type='submit' className='text-red-300 rounded bg-green-300'>signup</button>
   </form>
    </div>
  )
}
