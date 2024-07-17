import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

export default function CreateListing() {
  const [files, setFiles] = useState([])
  const[imageUploadError,setImageUploadError]=useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    sell: false,
    rent: false,
    'parking-spot': false,
    furnished: false,
    offer: false,
    beds: 0,
    baths: 0,
    'regular-price': 0,
    'discounted-price': 0,
    imageUrls: []
  })

  console.log(formData);
  const handleImageUpload = () => {
    const promises = []
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises).then((urls) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) })
      }).catch((err)=>{
        setImageUploadError("image upload failed")
      })
    }
    else{
setImageUploadError("you can only upload 6 images")
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

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    // Here, you can handle the form submission, e.g., send the formData to the server
  }

  return (
    <main className='p-3 max-w-4xl mx-auto bg-slate-300'>
      <h1 className='text-3xl font-semibold text-center p-3'>Create a Listing</h1>
      <form className='flex flex-col sm:flex-row' onSubmit={handleFormSubmit}>
        <div className='flex flex-col gap-2 justify-center align-middle flex-1'>
          <input
            type='text'
            placeholder='Name'
            id='name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className='p-3 rounded-lg'
          />
          <input
            type='text'
            placeholder='Description'
            id='description'
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className='p-3 rounded-lg'
          />
          <input
            type='text'
            placeholder='Address'
            id='address'
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className='p-3 rounded-lg'
          />
          <div className='flex flex-wrap gap-4'>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                id='sell'
                checked={formData.sell}
                onChange={(e) => setFormData({ ...formData, sell: e.target.checked })}
                className='w-4'
              />
              <span className='text-sm'>sell</span>
            </div>
            <div>
              <input
                type='checkbox'
                id='rent'
                checked={formData.rent}
                onChange={(e) => setFormData({ ...formData, rent: e.target.checked })}
                className='w-4'
              />
              <span className='text-sm'>Rent</span>
            </div>
            <div>
              <input
                type='checkbox'
                id='parking-spot'
                checked={formData['parking-spot']}
                onChange={(e) => setFormData({ ...formData, 'parking-spot': e.target.checked })}
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
                value={formData.beds}
                onChange={(e) => setFormData({ ...formData, beds: parseInt(e.target.value) })}
                className='w-12 h-8 rounded m-3 focus:outline-none'
              />
              <span>Beds</span>
            </div>
            <div>
              <input
                type='number'
                value={formData.baths}
                onChange={(e) => setFormData({ ...formData, baths: parseInt(e.target.value) })}
                className='w-12 h-8 rounded m-3 focus:outline-none'
              />
              <span>Baths</span>
            </div>
            <div className='flex'>
              <input
                type='number'
                id='regular-price'
                value={formData['regular-price']}
                onChange={(e) => setFormData({ ...formData, 'regular-price': parseFloat(e.target.value) })}
                className='w-18 h-8 sm:w-20 rounded m-3 focus:outline-none'
              />
              <div className='flex flex-col'>
                <span>Regular Price</span>
                <span className='text-sm text- m-1 font-light'>($/month)</span>
              </div>
            </div>
            <div className='flex'>
              <input
                type='number'
                id='discounted-price'
                value={formData['discounted-price']}
                onChange={(e) => setFormData({ ...formData, 'discounted-price': parseFloat(e.target.value) })}
                className='w-18 h-8 sm:w-20 rounded m-3 focus:outline-none'
              />
              <div className='flex flex-col'>
                <span>Discounted Price</span>
                <span className='text-sm text- m-1 font-light'>($/month)</span>
              </div>
            </div>
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
              onChange={(e) => setFiles(Array.from(e.target.files))}
              multiple
              className='w-full border p-3'
            />
            <button
              type='button'
              onClick={handleImageUpload}
              className='text-green-500 border p-3 rounded uppercase border-green-500 hover:text-green-800 disabled:opacity-80'
            >
              Upload
            </button>
          </div>
          {formData.imageUrls.length >0 && formData.imageUrls.map((url)=>(
            <div className='flex justify-between bg-slate-200'>
          <img src={url} key={url} alt="new image" className='w-20 h-20' />
          <button className='text-red-600 border p-2 my-2 rounded-lg hover:bg-slate-400' >delete</button>
            </div>
          ))
          }
        <button
            type='submit'
            className='bg-slate-700 text-white my-5 border p-3 rounded-lg uppercase border-green-500 hover:bg-slate-500 disabled:opacity-80'
          >
            Create Listing
          </button>

        </div>

         
      </form>
      <p className='text-red-600 text-center'>{imageUploadError && imageUploadError}</p> 

    </main>
  )
}