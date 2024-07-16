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

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserFailure,updateUserStart,updateUserSuccess,deleteUserSuccess,deleteUserFailure,deleteUserStart,signOutUserFailure,signOutUserStart,signOutUserSuccess } from '../redux/user/userSlice'; 
import { useNavigate } from 'react-router-dom';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';

export default function Profiles() {
  const [formData, setFormData] = useState({});
  const { currentUser,loading,error } = useSelector((state) => state.persistedReducer.user);
  const fileRef = useRef(null);
  const [flle,setFile]=useState(undefined)
  const [fllePerc,setFilePerc]=useState(0)
   const [flleError,setFileflleError]=useState(false)
   const [updateSucess,setUpdateSucess]=useState(false)
  const dispatch = useDispatch();
  const navigate=useNavigate();



  const handleChange = (e) => {
    setFormData({ ...formData,
       [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
     dispatch(updateUserFailure(data.message))
    
      }
      else{
      dispatch(updateUserSuccess(data))
      setUpdateSucess(true)
    }
    } catch (error) {
     dispatch(updateUserFailure(error.message))
    }
  };

  const handeleDelete =async()=>{
    try {
      dispatch(deleteUserStart())
      const res=await fetch(`api/user/delete/${currentUser._id}`,
        {
          method:'DELETE'
        }
        )

        const data = await res.json();
        if (data.success === false) {
       dispatch(deleteUserFailure(data.message))
      
        }
        else{
        dispatch(deleteUserSuccess(data))
      
        }
    } catch (error) {
      dispatch(deleteUserFailure(error))
    }
  }

  const handleSignOut =async()=>{
    try {
      dispatch(signOutUserStart())
      const res=await fetch('api/auth/signout',
        {
          method:'GET'
        }
        )

        const data = await res.json();
        if (data.success === false) {
       dispatch(signOutUserFailure(data.message))
      
        }
        else{
        dispatch(signOutUserSuccess(data))
      
        }
    } catch (error) {
      dispatch(signOutUserFailure(error))
    }
  }


useEffect(()=>{
  if(flle){
    handleUploadFile(flle)
  }

},[flle]);

const handleUploadFile=(file)=>{
  const storage=getStorage(app)
  const filename=new Date().getTime + file.className
  const filenameRef=ref(storage,filename)
  const uploadTask=uploadBytesResumable(filenameRef,file)
  uploadTask.on('state_changed',
    (snapshot)=>{
      const progress=(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress))
    
    },
    (error)=>{
      setFileflleError(error)
    },
    ()=>{
  getDownloadURL(uploadTask.snapshot.ref).then(
    (downloadURL)=>{
      setFormData({...formData,avatar:downloadURL})
    }
  )
    }
  )
}

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-semibold text-lg text-center">Profiles</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
          onChange={(e)=>setFile(e.target.files[0])}
        
        />
        <img
          onClick={() => fileRef.current.click()}
          src={ formData.avatar || currentUser.avatar}
          alt="profile"
          className=" w-24 h-24 cursor-pointer rounded-full self-center my-4"
        />
        <p>
          {flleError ? (
            <span className='text-red'>upload not successfull</span>):
            (fllePerc >0 && fllePerc < 100)?
            (<span>`upload ${fllePerc}</span>):
            (fllePerc===100)?(
              <span className='text-green-400 self-center'>image uploaded succesfully</span>
            ):
          ''
          
          }
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="p-1 rounded-lg focus:outline-none"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange} 
          className="p-1 rounded-lg focus:outline-none"

        />
        <input
          type="password"
          placeholder="password"
          id="password"
          
          className="p-1 rounded-lg focus:outline-none"
        />
        <button type='submit' disabled={loading} className="p-2 bg-green-500 text-white uppercase">{loading ? 'loading...':'update'}</button>
      </form>
     {/* <p> {updateSucess ?
     ('user updated successfully'):("")}</p> */}
     {error ? (<p className='text-blue-500'>{error}</p>):(updateSucess ? "user updated successfully":"")}
      <div className="flex justify-between my-4">
        <button onClick={handeleDelete} className="text-red-600 bg-slate-100 p-2 cursor-pointer hover:text-red-300">delete account</button>
        <button  onClick ={handleSignOut}className="text-red-600 bg-slate-100 p-2">signout</button>
      </div>
    </div>
  );
}