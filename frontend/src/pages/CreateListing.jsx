import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto bg-slate-300'>
   <h1 className='text-3xl font-semibold text-center p-3'>Create a Listing</h1>
   <form className='flex flex-col sm:flex-row'>
    <div className='flex flex-col gap-2 justify-center align-middle flex-1' >
        <input type="text" placeholder='Name' id='name' className='p-3 rounded-lg ' />
        <input type="text" placeholder='Description' id='description' className='p-3 rounded-lg ' />
        <input type="text" placeholder='Address' id='address' className='p-3 rounded-lg ' />
        <div className='flex flex-wrap gap-4'> 
            <div className='flex gap-1'>
                <input type="checkbox" id="sell"className='w-4' />
                <span className='text-sm'>sell</span>
            </div>
            <div>
                <input type="checkbox" id="rent"className='w-4' />
                <span className='text-sm'>Rent</span>
            </div>
            <div>
                <input type="checkbox" id="parking-spot" className='w-4'/>
                <span className='text-sm'>Parking spot</span>
            </div>
            <div>
                <input type="checkbox" id="furnished"className='w-4' />
                <span className='text-sm'>Furnished</span>
            </div>
            <div>
                <input type="checkbox" id="offer"className='w-4' />
                <span className='text-sm'>Offer</span>
            </div>
           
        </div>

        <div className='flex flex-wrap'>
            <div>
                <input type="Number" className='w-12 h-8 rounded m-3 focus:outline-none' />
                <span>Beds</span>
            </div>
            <div>
                <input type="Number" className='w-12 h-8 rounded m-3 focus:outline-none' />
                <span>Baths</span>
            </div>
            <div className='flex'>
                <input type="Number" id='regular-price' className='w-18 h-8 sm:w-20 rounded m-3 focus:outline-none' />
                <div className='flex flex-col'>
                <span>Regular Price</span>
                <span className='text-sm text- m-1 font-light'>($/month)</span>
                </div>
            </div>
            <div className='flex'>
                <input type="Number" id='discounted-price' className='w-18 h-8 sm:w-20 rounded m-3 focus:outline-none' />
                <div className='flex flex-col'>
                <span>Discounted Price</span>
                <span className='text-sm text- m-1 font-light'>($/month)</span>
                </div>
                
        
        </div>
        
        </div>
    </div>
    <div className='flex flex-1 flex-col m-6 gap-3'>
        <p className=''><span className='text-xl font-semibold'>Images: </span>The first Image will be the cover</p>
      <form className='flex flex-col' >
        <div className='flex flex-col sm:flex-row justify-center align-center gap-4'>
        <input type="file" accept='image/*' multiple className='w-full border p-3'/>
        <button type='button' className='text-green-500 border p-3 rounded uppercase border-green-500 hover:text-green-800 disabled:opacity-80
        
        '>Upload</button>

        </div>
        <button type='button' className='bg-slate-700 text-white my-5 border p-3 rounded-lg uppercase border-green-500 hover:bg-slate-500 disabled:opacity-80
        
        '>Create-Listing</button>
      </form>

    </div>
   </form>

    </main>
  )
}

