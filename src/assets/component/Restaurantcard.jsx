import React from 'react'
import { Link } from 'react-router-dom'

function Restaurantcard(info) {
    // console.log(info.link.split('/'))
//sharma-and-vishnu-fast-food-hamidia-road-manohar-dairy-hamidia-road-rest613953
//sharma-&-vishnu-fast-food-jahangirabad-jahangirabad-613953

  return (
    <Link to={`/restaurantmenu/${info.link.split('/').at(-1)}`}>
             <div className='hover:scale-90 duration-1000'>
                                   <div className='min-w-[190px] md:min-w-[273px] h-[180px] relative'>
                                      <img className='w-full h-full rounded-2xl object-cover' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${info?.cloudinaryImageId}`}/>
                                          <div class="bg-gradient-to-t from-black from-1% to-transparent to-40% w-full h-full     rounded-2xl top-0 absolute">
                                               </div>
                                                <p className='absolute bottom-2 left-3 text-white font-bold'>{info?.aggregatedDiscountInfoV3?.header} {info?.aggregatedDiscountInfoV3?.subHeader}</p> 
                                          </div>
                                     <div>
                                     <h2 className='text-lg font-semibold'>{info.name}</h2>
                                            <p className='flex items-center gap-1 text-base font-semibold'><i class="fi fi-ss-circle-star text-green-600 text-lg mt-1"></i>{info?.avgRating} <span>.</span> <span>{info?.sla?.slaString}</span></p>
                                            <p className='font-medium text-black/50 line-clamp-1'>{info.cuisines.join(',')}</p>
                                            <p className='font-medium text-black/50 line-clamp-1'>{info.locality}</p>
                                     </div>
                             </div>
    </Link>
  )
}

export default Restaurantcard
