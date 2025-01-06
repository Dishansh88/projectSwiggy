import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faCaretDown,faBagShopping,faMagnifyingGlass,faCircleInfo,faUser,faCartShopping}  from '@fortawesome/free-solid-svg-icons'
import { Outlet ,Link} from 'react-router-dom'
import {CarTdata,Visible } from '../context/contextApi'
import { useDispatch, useSelector } from 'react-redux'
import { chngevalue, toggleLogin } from '../utili/toggleSlice'
import Signin from './Signin'
function Head() {
 const visible=useSelector((state)=>state.toogleSlice.toggleBar)
  const [search,setsearch]=useState([])
  const {yourPlace,setYourPlace,setInitialgeo,initialgeo}=useContext(Visible)
  const [myAdress,setMyadress]=useState()
  const cartData=useSelector((state)=>state.cartSlice.cartItem)
  let {lat,lng}=yourPlace
  const dispatch=useDispatch()
  const userData=useSelector((state)=>state.authSlice.userData)
  const loginVisible=useSelector((state)=>state.toogleSlice.logginToggle)
    const navbar=[
      
      {
        name:'Search',
        img:  faMagnifyingGlass,
        path:'/search'
      },
    

      {
        name:'Login',
        img:  faUser ,
        path:'/login'
      },
      {
        name:'Cart',
        img: faCartShopping ,
        path:'/cart'
      },
    ]
    function cancelSearch()
    {
        setsearch("")
    }
    function leftSlide()
    {
        // visible?setvisible(false):setvisible(true)
        dispatch(chngevalue())
    }
    function handleLogin()
    {
        // visible?setvisible(false):setvisible(true)
        dispatch(toggleLogin())
    }
    async function Searchcity(e)
    {
         if(e=="") return;
          let res=await fetch(`${import.meta.env.VITE_BASE_URL}/misc/place-autocomplete?input=${e}`)
          let data=await res.json()
          //  console.log(data.data)
          setsearch(data.data)
        
          
    }
    async function Setlatlan(id)
    {
              let res= await fetch(`${import.meta.env.VITE_BASE_URL}/misc/address-recommend?place_id=${id}`)
              let data=await res.json();
              // console.log(data?.data[0]?.formatted_address)
              setMyadress(data?.data[0]?.formatted_address)
            
              let {lat,lng}=data?.data[0]?.geometry?.location
              setYourPlace({lat:lat,lng:lng})
              let myadress=data?.data[0]?.formatted_address
             localStorage.setItem('address',myadress)
              localStorage.setItem('loc',JSON.stringify({lat:lat,lng:lng}))
               leftSlide()
    }
   useEffect(()=>
  {
    let  address=localStorage.getItem('address')
       setMyadress(address)
  },[])
  return (
    <>
  
    <div className='w-full  '>
       <div className={`w-full h-full z-30 bg-black/40 absolute ${visible?"visible":"invisible"}`} onClick=  {leftSlide} >   
                </div>
           <div className={`z-40 w-full md:w-[40%]  flex justify-end ml-2 h-full bg-white absolute duration-1000 ${visible?"left-[0]":"left-[-100%]"}`} >
               <div className=' flex flex-col  w-[55%] m-4 gap-3'>
              
                          <i class="fi fi-br-cross cursor-pointer" onClick={leftSlide}></i>
                            <input type='text'  className='border rounded-2xl w-[100%] focus:outline-none focus:shadow-md p-5 ' onChange={(e)=>Searchcity(e.target.value)}/>
                          {  search && <p className='text-gray-400 '>Recent searches</p>}
                                    <div className=' '>
                                           <ul className=''>
                                              { 
                                                 search.map((data,index)=>
                                                (
                                                   
                                                      <div key={index} className=' flex flex-col border rounded-2xl m-3 shadow-md'>
                                                         <div className='flex items-center gap-1  w-full '>
                                                         <i class="fi fi-rs-marker text-orange-700"></i>
                                                             <li  onClick={()=>Setlatlan(data.place_id)} 
                                                              className='cursor-pointer mt-4 ' >
                                                                 <span className='font-semibold text-base'>{data.structured_formatting.main_text} </span>
                                                                    <p className='text-sm text-gray-500'>{data.structured_formatting.secondary_text} </p>
                                                                  </li>
                                                        </div>   
                                                       </div>  
                                              
                                                ))
                                   }
                              </ul>
                            </div>
                         
                    </div>       
       </div>
    </div>
    <div className=''>
       <div className={` w-full h-full  z-30 bg-black/40 absolute ${loginVisible?"visible":"invisible"}`} onClick=  {handleLogin} >   
                </div>
           <div className={`z-40  w-full md:w-[40%]   flex justify-end ml-2 h-full bg-white fixed duration-1000 ${loginVisible?'right-0':'right-[-100%]'} `}>
          <div className='w-[70%]  mt-3 ml-3 flex flex-col gap-3'>
              
                          <i class="fi fi-br-cross cursor-pointer justify-between text-gray-400 " onClick={handleLogin}></i>
                          <div className='flex justify-between items-center'>
                              
                               <h1 className='text-3xl font-bold  border-b-2 pb-2 border-black '>Login</h1>
                               <img className="h-20" src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r'></img>
                          </div>
                          <Signin/>
                          <p className='text-sm text-gray-500 '>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
            </div>       
       </div>
    </div>
    <div className='relative w-full h-full border  '>
     <div className='w-full sticky shadow-md z-20 h-24 flex justify-center items-center'>
        <div className='w-full md:w-[75%]  flex items-center justify-between'>   
            <div className='flex items-center  '>
              <Link to="/">
            <div className='w-20'>
              <img  src='https://downloadr2.apkmirror.com/wp-content/uploads/2022/01/95/61f236e02e2c2-384x384.png'/> 
            </div>
                </Link>
                   <div className='flex items-center gap-2 md:gap-3 cursor-pointer hover:text-orange-500 'onClick={leftSlide}>
                         <p className='font-semibold border-b-4 border-black'>others  </p>
                         <span className='text-sm text-gray-400 line-clamp-1 '>{myAdress}</span>
                         <FontAwesomeIcon className='text-2xl ' icon={faCaretDown}  />
                    </div>
           </div> 
                <div className='hidden md:flex items-center  gap-3 md:gap-14'>
                 {
                     navbar.map((data,index)=>
                    {
                        return <div key={index}>
                          
                               {   data.name=='Login'? <div onClick={handleLogin} >
                                    <div className='flex justify-center items-center gap-1 cursor-pointer' key={index}>
                                   
                                       {userData?<img className='h-4 rounded=3xl'  src={`${userData.photo}`} />:<i class="fi fi-ss-user text-gray-600"></i>}
                                       
                                       <p className=' font-medium text-gray-500 font-size-6'>{data.name}</p>
                                      { data.name=='Cart' && <p>{cartData.length}</p> }
                                 </div>
                                      </div> :<Link to={`${data.path}`} key={data.path}>
                                    <div className='flex justify-center items-center gap-1'>
                                     <FontAwesomeIcon className='text-gray-600' icon={data.img}/> 
                                       <p className=' font-medium text-gray-500 font-size-6'>{data.name}</p>
                                      { data.name=='Cart' && <p>{cartData.length}</p> }
                                 </div>
                                      </Link>
                              }
                        
                        </div>
                    })
                }
            
           </div>
           <div className='flex gap-7 items-center  md:hidden ml-4 mr-2'>
                 {
                    navbar.map((data,index)=>
                    {
                     return <div key={index}> { 
                        data.name=='Login'? <div onClick={handleLogin}>
                     <div className='flex justify-center items-center gap-1 cursor-pointer'>
                    
                        {userData?<img className='h-4 rounded=3xl'  src={`${userData.photo}`} />:<i class="fi fi-ss-user text-gray-600"></i>}
                       { data.name=='Cart' && <p>{cartData.length}</p> }
                  </div>
                       </div> :<Link to={`${data.path}`}>
                     <div className='flex justify-center items-center gap-1'>
                      <FontAwesomeIcon className='text-gray-600' icon={data.img}/> 
                       { data.name=='Cart' && <p>{cartData.length}</p> }
                  </div>
                       </Link>
               }</div>
                    })
                 }
           </div>
        </div>
    </div>
    <Outlet/>
    </div>
  
  </>
  )
}

export default Head
