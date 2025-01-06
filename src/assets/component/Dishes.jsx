import React, { useEffect } from 'react'
import { nonveg, veg } from './links'
import AddToCartBtn from './AddToCartBtn'
import { useDispatch, useSelector } from 'react-redux';
import {setSimilarDishes } from '../utili/toggleSlice';
import { Link } from 'react-router-dom';

function Dishes({card}) {
    const dispatch=useDispatch()
    const {hideRestaurantDetails=false,info,info:{name,price,imageId,isVeg=0,id:itemId
    },restaurant:{info:resInfo,info:{id,name:resName,avgRating,sla:{slaString},slugs:{city,restaurant:resLocation}}}}=card;
  const {simiarDishes}=useSelector((state)=>state.toogleSlice.isSimilarResDishes)
  const {id:resId}=useSelector((state)=>state.cartSlice.resInfo)
  
  function handleSameRes()
  {        
          if(resId==id || !resId)
              dispatch(setSimilarDishes({
             similarDishes:true,
              city,
              resLocation,
              resId:id,
              itemId
            }))
          
  }
  return (

    <div className='  m-4 bg-white p-3  rounded-xl scale-70 shadow-2xl '>
      { !hideRestaurantDetails && <Link to={`/restaurantmenu/${resLocation}-${id}`}><div className='flex justify-between text-sm opacity-70'>
            <div>
               <p className='font-bold'>By {resName}</p>
               <p className='flex flex-wrap gap-2 my-1 font-bold text-gray-600'><i class="fi fi-ss-star"></i>{avgRating} . {slaString}</p>
            </div>
             <i class="fi fi-rr-arrow-small-right text-2xl "></i>
       </div> </Link> }
       { !hideRestaurantDetails && <hr className=' border-2 border-dotted'/> }
        <div className=' flex  justify-between '> 
               <div className='w-[50%] flex flex-col gap-1 md:w-[70%]'>
                     <div className='w-4 h-4 mt-3'>
                       {isVeg?<img src={veg }/>:<img src={nonveg} /> }
                     </div>
                      <p className=' font-bold text-2xl '>{name}</p>
                      <span className='font-bold text-sm text-gray-400'>₹{price/100}</span>
                      <button className='p-1 w-20 border rounded-xl bg-slate-200 text-black/50 font-semibold'>Details</button>
                </div>
                <div className=' w-[30%]   relative  mt-1  right-0 '>
                     <div className='  h-full w-full '>
                             { imageId &&  <img className='   rounded-xl h-full w-full  object-cover ' src={'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/'+imageId} alt='foodImg'></img>
                       }
                    <div className='' onClick={()=>handleSameRes()}>
                    <AddToCartBtn info={info} resInfo={resInfo} imageId={imageId}/>
                    </div>
                   
                  </div>
                 </div>
        
        </div>
      
    </div>
  )
}

export default Dishes
//http://localhost:5173/restaurantmenu/zam-zam-fast-food-peer-gate-area-hamidia-road-rest109939