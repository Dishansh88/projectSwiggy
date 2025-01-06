import React from 'react'
import toast from 'react-hot-toast'
import { addToCart, clearCart } from '../utili/cartSlice'
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { faL } from '@fortawesome/free-solid-svg-icons'
function AddToCartBtn({info,imageId,resInfo}) {
    const [isMore,setisMore]=useState(false)
  const cartData=useSelector((state)=>state.cartSlice.cartItem)
  const resIn=useSelector((state)=>state.cartSlice.resInfo)
  const dispatch=useDispatch((state)=>state.cartSlice.addToCart)
  const [isDiffRes,setisDiffRes]=useState(false)
    function addTocartItems(inf)
  {
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
  return (
    <div>
      <button className={`text-green-700  px-7 py-2 drop-shadow rounded-2xl font-bold text-sm absolute bottom-0 left-1/2 -translate-x-1/2 bg-white `} onClick={()=>addTocartItems(info)}>Add</button>
      <hr className='my-4'/>



      I    {   isDiffRes &&      <div className='w-[85%] md:w-[40%]  fixed shadow-md bottom-10 p-8 bg-white left-[8%] md:left-[30%] z-[50]' >
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
  )
}

export default AddToCartBtn
