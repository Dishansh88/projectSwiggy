import React,{useContext, useEffect, useState} from 'react'
import { CarTdata } from '../context/contextApi'
import { useDispatch, useSelector } from 'react-redux'
import { cartSlice, clearCart, deleteItem } from '../utili/cartSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const [btnSize,setbtnSize]=useState(false)
    // const {cartData,setCartData}=useContext(CarTdata)
const cartData=useSelector((state)=>state.cartSlice.cartItem)
const [price,setprice]=useState(0)  
const dispatch=useDispatch() 
const userData=useSelector((state)=>state.authSlice.userData)
const navigate=useNavigate()
// console.log(cartData)
function deletItems(i)
{   
  if(cartData.length>1)
  {
       
    let newarr=[...cartData]
    newarr.splice(i,1)
    dispatch(deleteItem(newarr))
    // localStorage.setItem('cart',JSON.stringify(newarr))
    toast.success("Food removed successfully")
  }
  else 
  {
     dispatch(clearCart())
  }
}
function handleSize()
{
      setbtnSize((prev)=>!prev)     
       if(!userData)
       {  
            toast.error('you have to login First')
           navigate('/login')
       }
      else
        toast.success("Order Placed")
    
}
function totoalPrice()
{
        let p=0;
        for(let i=0;i<cartData.length;i++)
        {
           p=  p+cartData[i].price/100
        }
        setprice(p)
}
useEffect(()=>
{
    totoalPrice()   
},[cartData])
if(cartData.length==0)
{
  return(
    <>
      <div className='w-full  h-[600px] bade '>
            <div className='w-[70%]   mx-auto flex flex-col gap-2 items-center'>
          
                  <img className=' w-[270px] h-[256px]  ' src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0'/>
             <h2 className='font-bold text-gray-700 '>Your cart is empty</h2>
             <p className='text-sm text-gray-400 '>You can go to home page to view more restaurants</p>
             <button className='bg-orange-500 text-sm text-white px-2  py-1 text-xl font-bold' onClick={()=>navigate('/')}>See Restaurants Near you</button>
            </div>
      </div>
    </>
  )
}
  return (
    <div className='w-full'>
       
          <div className='w-[70%]  mx-auto '>
               {
                  cartData.map((data,index)=>
                {
                     return<div key={index}>
                               <div  className='flex justify-between w-full my-3'>
                                  <div className='w-[60%] md:w-[70%] flex flex-col gap-4  '>
                                   <h1 className='text-xl font-semibold'>{data.name}</h1>
                                    <p>₹{data.price/100}</p>
                                    <p className='line-clamp-1 font-semibold text-gray-500 '>{data.description}</p>
                                  </div>
                                      <div className='w-[40%] md:w-[20%] h-[150px] relative  shadow rounded-3xl'>
                                       <img className='w-full  h-full rounded-3xl  ' src={'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/'+data.imageId}/>
         <button className='text-white  px-3 py-1 bottom-0 left-1/2 -translate-x-1/2 drop-shadow rounded-2xl font-semibold text-sm absolute bg-red-500' onClick={()=>deletItems(index)}>Remove</button>
         
                                     </div>
                               </div>
                               <hr className='border '/>
                          </div>
                }
              )
               }  
                <div className='font-bold text-gray-700 f'>Total price ₹{price}</div>
              <div className='flex justify-between gap-1'>
               
                <button className={`font-bold w-[100px] md:min-w-[150px] p-1  bg-green-800 text-white mt-4 rounded-xl bg-greenfont-semibold ${btnSize?'hover:scale-90 ':''}`} onClick={handleSize} >Place Order</button>
                <button className='font-bold w-[100px] md:min-w-[150px]  p-2 bg-red-800 text-white mt-4 rounded-xl  bg-greenfont-semibold ${btnSize?' onClick={()=>dispatch(clearCart())}>clear cart</button>
            </div>
          </div>
       
    </div>
  )
}

export default Cart
