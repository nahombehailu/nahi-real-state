
import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { useSelector } from 'react-redux';
import {useNavigate,useParams} from 'react-router-dom'

export default function UpdateListing() {
    const { currentUser} = useSelector((state) => state.persistedReducer.user);
    const navigate=useNavigate()
    const params=useParams()

  const [files, setFiles] = useState([])
  const[imageUploadError,setImageUploadError]=useState(false)
  const [uploading ,setUploading]=useState(false)
  const [loading ,setloading]=useState(false)
  const  [error,setError]=useState(false)
  const  [success,setSuccess]=useState(false)
  const [formData, setFormData] = useState({
    name:'',
    description:'',
    address:'',
    regularPrice:0,
    discountPrice:0,
    bathrooms:0,
    bedrooms:0,
    furnished:true,
    parking:true,
    type:'',
    offer:true,
    imageUrls:[],
 
	  

  })

  console.log(formData);

   useEffect(()=>{
    const fetchingData=async()=>{
        const listingId=params.listingId
        const res=await fetch(`/api/listing/get/${listingId}`)
        const data= await res.json();
        if(data.success===false){
            console.log(error.message);
            return;
        }
        setFormData(data)
    };
   fetchingData();
   },[]);
  const handleImageUpload = () => {
    setUploading(true)
    setImageUploadError(false)
    const promises = []
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises).then((urls) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) })
        setUploading(false)
      })
      .catch((err)=>{
        setImageUploadError("image upload failed")
      })
    }
    else{
setImageUploadError("you can only upload 6 images per listing")
setUploading(false)

    }
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const filename = `${new Date().getTime()}-${file.name}`
      const filenameRef = ref(storage, filename)
      const uploadTask = uploadBytesResumable(filenameRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(progress)
         
        },
        (error) => {
          reject(error)
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
            console.log(downloadURL)
          })
        }
      )
    })
  }

  const handleRemoveImage =(index)=>{
    setFormData({...formData,imageUrls:formData.imageUrls.filter((_,i)=>i !== index)})
  }
  console.log(formData)
  const handleFormSubmit =async (e) => {
    e.preventDefault()
    try {
      setSuccess(false)
      // if(formData.imageUrls.length <1) return(setError("you must upload at least one image"))
      if(+formData.regularPrice < +formData.discountPrice) return(setError("discounted price must be lessthan the regualr price"))//+ for conver into numbers

        setloading(true)
        setError(false)
        const res=await fetch(`/api/listing/update/${params.listingId}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({...formData,userRef:currentUser._id})
        })

        const data= await res.json()

     navigate(`/listing/${data._id}`)
        
     
        setloading(false)

        if(data.success==false ){
            setError(data.message)
          return
        } 
    
     
        
         setSuccess("succesfully created new listing")
        //  navigate(`/listing/${data.name._id}`)
  
      

       
    } catch (error) {
        setError(error.message)
        setloading(false)
    }
 
 
  }
 

  return (
    <main className='p-3 max-w-4xl mx-auto bg-slate-300'>
      <h1 className='text-3xl font-semibold text-center p-3'>Update a Listing</h1>
      <form className='flex flex-col sm:flex-row' onSubmit={handleFormSubmit}>
        <div className='flex flex-col gap-2 justify-center align-middle flex-1'>
          <input
            type='text'
            required
            placeholder='Name'
            id='name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className='p-3 rounded-lg'
          />
          <textarea
            type='text'
            required
            placeholder='Description'
            id='description'
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className='p-3 rounded-lg'
          />
          <input
            type='text'
            placeholder='Address'
            required
            id='address'
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className='p-3 rounded-lg'
          />
          <div className='flex flex-wrap gap-4'>
            {/* <div className='flex gap-1'>
              <input
                type='checkbox'
                id='sell'
                checked={formData.sell}
                onChange={(e) => setFormData({ ...formData, sell: e.target.checked })}
                className='w-4'
              />
              <span className='text-sm'>sell</span>
            </div> */}
            <div>
              <input
                type='text'
                required
                id='type'
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className='w-4'
              />
              <span className='text-sm'>Type</span>
            </div>
            <div>
              <input
                type='checkbox'
                id='parking'
                checked={formData['parking']}
                onChange={(e) => setFormData({ ...formData, 'parking': e.target.checked })}
                className='w-4'
              />
              <span className='text-sm'>Parking spot</span>
            </div>
            <div>
              <input
                type='checkbox'
                id='furnished'
                checked={formData.furnished}
                onChange={(e) => setFormData({ ...formData, furnished: e.target.checked })}
                className='w-4'
              />
              <span className='text-sm'>Furnished</span>
            </div>
         
            <div>
              <input
                type='checkbox'
                id='offer'
                checked={formData.offer}
                onChange={(e) => setFormData({ ...formData, offer: e.target.checked })}
                className='w-4'
              />
              <span className='text-sm'>Offer</span>
            </div>
          </div>

          <div className='flex flex-wrap'>
            <div>
              <input
                type='number'
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                className='w-12 h-8 rounded m-3 focus:outline-none'
              />
              <span>Beds</span>
            </div>
            <div>
              <input
                type='number'
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                className='w-12 h-8 rounded m-3 focus:outline-none'
              />
              <span>Baths</span>
            </div>
            <div className='flex'>
              <input
                type='number'
                id='regularPrice'
                value={formData['regularPrice']}
                onChange={(e) => setFormData({ ...formData, 'regularPrice': parseFloat(e.target.value) })}
                className='w-18 h-8 sm:w-20 rounded m-3 focus:outline-none'
              />
              <div className='flex flex-col'>
                <span>Regular Price</span>
                <span className='text-sm text- m-1 font-light'>($/month)</span>
              </div>
            </div>
            {formData.offer &&(
  <div className='flex'>
  <input
    type='number'
    id='discountPrice'
    value={formData['discountPrice']}
    onChange={(e) => setFormData({ ...formData, 'discountPrice': parseFloat(e.target.value) })}
    className='w-18 h-8 sm:w-20 rounded m-3 focus:outline-none'
  />
  <div className='flex flex-col'>
    <span>Discounted Price</span>
    <span className='text-sm text- m-1 font-light'>($/month)</span>
  </div>
</div>
            )}
          
          </div>
        </div>
        <div className='flex flex-1 flex-col m-6 gap-3'>
          <p className=''>
            <span className='text-xl font-semibold'>Images: </span>The first Image will be the cover
          </p>

          <div className='flex flex-col sm:flex-row justify-center align-center gap-4'>
            <input
              type='file'
              accept='image/*'
              id='image'
              // required
              onChange={(e) => setFiles(Array.from(e.target.files))}
              multiple
              className='w-full border p-3'
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageUpload}
              className='text-green-500 border p-3 rounded uppercase border-green-500 hover:text-green-800 disabled:opacity-80'
            >
            {uploading ? 'Uploading...':'Upload'}
            </button>
          </div>
          {formData.imageUrls.length >0 && formData.imageUrls.map((url,index)=>(
            <div key={url} className='flex justify-between bg-slate-200'>
          <img src={url} alt="new image" className='w-20 h-20' />
          <button onClick={()=>handleRemoveImage(index)} className='text-red-600 border p-2 my-2 rounded-lg hover:opacity-80' >delete</button>
            </div>
          ))
          }
        <button
            type='submit'
            disabled={loading || uploading }
  
            className='bg-slate-700 text-white my-5 border p-3 rounded-lg uppercase border-green-500 hover:bg-slate-500 disabled:opacity-80'
          >
            {loading ? 'Creating...':"Update Listing"}
          </button>
        <p className='text-red-700 text-center'>   {error ? error:""}</p>
        <p className='text-red-700 text-center'>   {success ? success:''}</p>

        </div>

         
      </form>
      <p className='text-red-600 text-center'>{imageUploadError ? imageUploadError:""}</p> 

    </main>
  )
}

