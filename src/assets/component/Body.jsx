import React, { useContext, useEffect, useState } from 'react'

import Onyourmind from './Onyourmind'
import Toprestaurantchain from './Toprestaurantchain'
import Onlinefood from './Onlinefood'
import { Visible } from '../context/contextApi'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Result } from 'postcss'
import Shimmer from './Shimmer'

function Body() {
  const [data,setdata]=useState([])
  const {yourPlace}=useContext(Visible)
  const [showCompo,setShowcompo]=useState(null)
  const [service,setservice]=useState('')
  const [cityTitles,setCitytitles]=useState([])
  const [cities,setCities]=useState([])
  const [showCity,setshowcity]=useState(false)
  const [toprestaurant,setToprestaurant]=useState([])
  const [onMindYours,setOnYoursMind]=useState([])
  const [onlineTitle,setonlineTitle]=useState([])
  let {lat,lng}=yourPlace
  async function getdata() {
    {
          try {
           
            let res=await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
            let data= await res.json()
            setCitytitles(data?.data?.cards[1]?.card?.card?.header?.title)
            setonlineTitle(data.data?.cards[2]?.card.card.title)
            setShowcompo(data?.data?.cards.find((data)=>data?.card.card.id=="swiggy_not_present") || null)
            setCities(data?.data?.cards[10]?.card.card.cities || [])
            setdata(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants||data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants||[])

            // console.log(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants||data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
            let mainData=data?.data?.cards.find((data)=>data?.card?.card?.id=="top_brands_for_you")?.card.card.gridElements.infoWithStyle.restaurants
            let mainData2=data?.data?.cards.find((data)=>data?.card?.card?.id=="restaurant_grid_listing")?.card.card.gridElements.infoWithStyle.restaurants
            setToprestaurant(mainData2|| mainData)
            let data2=data?.data?.cards.find((data)=>data?.card?.card?.id=="whats_on_your_mind")?.card?.card?.gridElements?.infoWithStyle?.info
           setOnYoursMind(data2 || [])
        
          } catch (error) {
            
          }     
    }
  } 
  const filterValue=useSelector((state)=>state.filterSlice.filterValue)
 const  filterdata=data
  useEffect(()=>
  {
   getdata()
  },[lat,lng])
  if(showCompo)
  {
    return<>
          <div className='mt-5  mx-auto' >
                 <div className=' h-[438px] w-[380px] mx-auto flex flex-col gap-5 justify-center items-center'>
                       <div className='w-[238px] h-[238px] '>
                             <img className='w-full h-full  ' src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png'/>
                       </div>
                         <div className>
                              <h1 className='font-bold text-2xl text-center'>{service}</h1>
                              <p className='text-center text-gray-500 font-semibold shadow-lg rounded-xl'>We don’t have any services here till now. Try changing location.</p>
                        </div>
                 </div>
          </div>
      
          <div className='mt-6 m-4'>
                    <h1 className='font-bold text-2xl'>{}</h1>
                    <div className='grid grid-cols-4 gap-3 mt-4'>
                      {
                           cities.map(({text,link},i)=>
                          {
                              return <>
                              
                                   {
                                   i<11? <Link to={`/${text}`}>
                                    <div className='border p-4 text-sm rounded-2xl font-bold '>
                                             <h2 className='text-center'>{text}</h2>
                                          </div>
                                    </Link>:!showCity && i==11?<button className='font-bold' onClick={()=>setshowcity((prev)=>!prev)}>more</button>:showCity?<Link to={`/${text}`}><div className='border p-4 text-sm rounded-2xl font-bold '>
                                             <h2 className='text-center'>{text}</h2>
                                          </div></Link>:''
                                 }
                                      {/* //     showCity?i>=11 && <div className='border p-4 rounded-2xl text-sm font-bold'>
                                      //     <h2 className='text-center'>{text}</h2>
                                      //     </div>:i==11 && <button className='border p-4 rounded-2xl font-bold w-full'onClick={()=>setshowcity((prev)=>!prev)}>showmore</button>
                                      //     }
                                   */}
                             
                                     </> 
                          })
                      }
                    </div>
          </div>
    </>
  }
  return (
    <div className='w-full '>
     {toprestaurant.length?<div className='mx-auto w-[98%] sm:w-[90%] lg:w-[80%]  mx-auto  mt-3 overflow-hidden'>
             
                  {/* { onMindYours && <Onyourmind data={onMindYours}/> } */}
                
      {onMindYours.length==0?<>
                                           <Onyourmind data={onMindYours}/>
                                          <Toprestaurantchain data={toprestaurant}  title={cityTitles}/>
                                      </>:''}
                      <Onlinefood data={data} title={onlineTitle}/>       
      </div>:<Shimmer/>
}
    </div>
  )
}

export default Body
