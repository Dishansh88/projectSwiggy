import React from 'react'

function Searchrestaurant({card}) {
    const {card:{info:{cloudinaryImageId,costForTwoMessage,avgRating,name,id,sla:{slaString}}}}=card
 
  return (
           <div className='flex items-center gap-4 m-4 p-3 bg-white shadow-lg  md:justify-between '>
                 <div className='w-[20%]  h-full '> 
                      <img className='rounded-xl w-full ' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${cloudinaryImageId}`}/>
                 </div>
                 <div className='w-full md:w-[99%]'>
                      <p className='font-semibold text-gray-800'>{name}</p>
                      <p className='flex flex-wrap gap-2 my-2 font-bold text-gray-500 text-sm'><i class="fi fi-ss-star"></i>{slaString} . {costForTwoMessage}</p>
                 </div>
           </div>
  )
}

export default Searchrestaurant
