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
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signFailure, signInStart, signSuccess } from '../redux/user/userSlice'; 
import { useNavigate } from 'react-router-dom';

export default function Profiles() {
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.persistedReducer.user);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [updateSucess,setUpdateSucess]=useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData,
       [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
      console.log("error")
      }

      else{
    
      setUpdateSucess(true)

      console.log(data);
      console.log(formData);
    }
    } catch (error) {
     console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-semibold text-lg text-center">Profiles</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
        
        />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt="profile"
          className=" w-24 h-24 cursor-pointer rounded-full self-center my-4"
        />
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
        <button type='submit' className="p-2 bg-green-500 text-white uppercase">update</button>
      </form>
      {updateSucess &&(<p>user updated successfully</p>)}
      <div className="flex justify-between my-4">
        <span className="text-red-600 bg-slate-100 p-2">delete account</span>
        <span className="text-red-600 bg-slate-100 p-2">signout</span>
      </div>
    </div>
  );
}