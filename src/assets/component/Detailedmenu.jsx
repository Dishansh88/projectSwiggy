import React from 'react'
import toast from 'react-hot-toast'
import { addToCart, clearCart } from '../utili/cartSlice'
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { faL } from '@fortawesome/free-solid-svg-icons'
import AddToCartBtn from './AddToCartBtn'
let nonveg='https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png'
let veg='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMteAKdX-P1OY8MjE5Li9YDZJAXI_hsAZ47OWYhh_HCCK76_N_E1hr1QUgnGPIIk8RmB8&usqp=CAU'
export function Detailedmenu({info,info:{name,price,defaultPrice,itemAttribute:{vegClassifier},ratings:{aggregatedRating:{rating,ratingCountV2}},description,imageId},resInfo})
{
  
  const [isMore,setisMore]=useState(false)
  let trimDescription=description?.substring(0,120)
//   console.log(trimDescription,'hello')
  const cartData=useSelector((state)=>state.cartSlice.cartItem)
  const resIn=useSelector((state)=>state.cartSlice.resInfo)
  const dispatch=useDispatch((state)=>state.cartSlice.addToCart)
  const [isDiffRes,setisDiffRes]=useState(false)
  function addTocartItems(inf)
  {

    //   console.log(inf)
        let getResInfo=JSON.parse(localStorage.getItem('res'))||[]
          let data=cartData.find((data)=>data.id==inf.id)

          // console.log(getResInfo)
          // console.log(cartData.length)
         if(data)
            {
               return toast.error('Already added')
             
            }
            else{
        //   console.log(getResInfo.name,resInfo.name)
                 if(getResInfo.length==0 || getResInfo.name==resInfo.name){
                    dispatch(addToCart({resInfo,inf}))
                    toast.success('Food added to the cart')
        }
        else
       {
         setisDiffRes((prev)=>!prev)
       }

      }
  }
  return  <>
  <div className='relative w-full'>
            <div  className='flex justify-between w-full min-h-[182px]'>
                 <div className='w-[55%] md:w-[70%] '>
                    <img className='w-3' src={`${vegClassifier=='VEG'?veg:nonveg}`} alt='vegImg'/>
                       <h1 className='font-bold text-lg'>{name}</h1>
                          <p className='text-sm'>₹{price/100 || defaultPrice/100}</p>
                               <div className='flex items-center gap-1'>
                                      <i class="fi fi-ss-star text-sm"></    i><span        className='text-sm font-normal'>{rating}</span>
                                   </div>
                              <p className='line-clamp-1 md:line-clamp-2 text-sm  text-gray-500'>{description}</p>
                 </div>
                  <div className='w-[40%]  md:w-[20%] relative  mt-3 '>
                       { imageId &&  <img className='  rounded-2xl  w-full h-full  ' src={'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/'+imageId}></img>
                       }
                        <AddToCartBtn info={info} imageId={imageId} resInfo={resInfo}/>
                 </div>
            </div>
         <hr className='my-4'/>
      I    {   isDiffRes &&      <div className='w-[530px] h-[204px] fixed shadow-md bottom-10 p-8 bg-white left-[30%] z-[50]' >
                                     <h1 className='font-bold'>Items already in cart </h1>
                                     <p className='text-sm'>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                                     <div className='flex gap-4 justify-center mt-4 '>
                                        <button className='border w-[45%] py-2 border border-green-500 border-2 hover:shadow-md font-semibold' onClick={()=>setisDiffRes((prev)=>!prev)}>NO</button>
                                        <button className=' border w-[45%] border-green-600 border-2 font-semibold bg-green-400 text-white' onClick={()=>
                                          {
                                             dispatch(clearCart())
                                              setisDiffRes((prev)=>!prev)
                                          }}>YES,START A FRESH</button>
                                     </div>
                                  </div>
}
      </div>  
      </>
}

export default Detailedmenu
