import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch} from 'react-redux'
import {signSuccess,signFailure } from '../redux/user/userSlice';
import {useNavigate}from 'react-router-dom'


export default function OAuth() {
  const dispatch=useDispatch()
  const navigate=useNavigate()

    const handleGoogleClick=async() =>{
      const provider=new GoogleAuthProvider()
      const auth=getAuth(app)
      const result = await signInWithPopup(auth,provider)

      try {
       const res= await fetch('/api/auth/google',{
          method:'POST',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            username:result.user.displayName,
            email:result.user.email,
            photo:result.user.photoURL,
          }
          )
        })
        const data= await res.json()

        if(data.success ===false){
          dispatch(signFailure(data.message))
       
        }
else{
  console.log(data);
  dispatch(signSuccess(data))
        navigate('/')
      }
      } catch (error) {
        console.log(error);
      }
  
       

    }
  return (
    <button type='button'onClick={handleGoogleClick} className='text-white bg-red-700 p-2 ree sm:w-full' >
      Countinue with Google
    </button>
  )
}

