import React from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

export default function Profiles() {
  const {currentUser}=useSelector((state)=>state.persistedReducer.user)
  const fileRef=useRef(null)
  return (
    // firebse storage setting for images
    // rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write :if request.resource.size<2*1024 *1024 && request.resource.contentType.matches('image/.*')
      
//     }
//   }
// }

    <div className='max-w-lg mx-auto'>
<h1 className='font-semibold text-lg text-center'>Profiles</h1>
      <form className='flex flex-col gap-2'>
        <input type="file" ref={fileRef} accept='image/*' hidden/>
        <img onClick={()=>fileRef.current.click()} src={currentUser.avatar} alt="profile"className=' w-24 h-24 cursor-pointer rounded-full self-center my-4' />
        <input type="text" placeholder='username' id='username' className='p-1 rounded-lg focus:outline-none'/>
        <input type="email" placeholder='email' id='email' className='p-1 rounded-lg focus:outline-none'/>
        <input type="password" placeholder='password' id='password' className='p-1 rounded-lg focus:outline-none'/>
        <button className='p-2 bg-green-500 text-white uppercase '>update</button>
      </form>
      <div className='flex justify-between my-4'>
        <span className='text-red-600 bg-slate-100 p-2'>delete account</span>
        <span className='text-red-600 bg-slate-100 p-2'>signout</span>
      </div>
      
    </div>
  )
}
