import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'

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
      setLoading(false)
      setError(null)
      navigate('/signin')
      console.log(data);
      
    } catch (error) {
      setLoading(false)
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
    <button disabled={loading} className='text-red-300 rounded bg-green-300'>
      {loading? loading :'signup'}</button>
   </form>
   <div>{error &&(
    <p className='text-red-700'>{error}</p>
   )}
   </div>
    </div>
  )
}
