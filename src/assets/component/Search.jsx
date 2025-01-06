import React, { useDebugValue, useEffect, useState } from 'react'
import Dishes from './Dishes'
import Searchrestaurant from './Searchrestaurant'
import { useContext } from 'react'
import { Visible } from '../context/contextApi'
import { useDispatch,useSelector } from 'react-redux'
import { resetSimilarResDish } from '../utili/toggleSlice'
import { configureStore } from '@reduxjs/toolkit'
function Search() {
    const [searchQuery,setSearch]=useState('roll')
    const [activeBtn,setActiveBtn]=useState('Dishes')
    const [dishes,setDishes]=useState([])
    const [restaurant,setRestaurant]=useState([])
    const [selectedResDishes,setSelectedResDishes]=useState(null)
    const [similarResDishes,setSimilarResDishes]=useState([])
    const {yourPlace}=useContext(Visible)
    const dispatch=useDispatch()
    const { similarDishes,city,resId,itemId,resLocation}=useSelector((state)=>state.toogleSlice.isSimilarResDishes)
    //  console.log(similarDishes,city,resId,itemId,resLocation)
    let {lat,lng}=yourPlace
    const filterOptions=[
        {filternam:'Restaurant'},
        {filternam:'Dishes'}
      ]
      useEffect(()=>
      {
         if( similarDishes)
           { 
            sameDishesRes()
         
           }
      },[ similarDishes])
function handleClick(filterName)
      {
       
          activeBtn==filterName?activeBtn:setActiveBtn(filterName)
            
      }
 async function fectchDishes() {
      try {
        let res=await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=e1c15eff-c950-88f8-a60b-e634f29ef181&submitAction=ENTER&queryUniqueId=09255a06-cd4c-588f-56ba-66b14f477586`)
          let data=await res.json()
        
          setDishes((data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter((data)=>data?.card?.card?.info))
      } catch (error) {
           console.log(error)
      }
      }
async function fectchRestaurant() {
         let res=await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=5bc3aa40-1143-b691-2947-fdcf35812ba1&submitAction=ENTER&queryUniqueId=6ac24730-e159-3887-8554-9a4908a4d1d9&selectedPLTab=RESTAURANT`)
          let data=await res.json()
          setRestaurant((data?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter((data)=>data?.card?.card?.info))
      }
async function sameDishesRes() {
          let pathName=`/city/${city}/${resLocation}`
          let encodedPath=encodeURIComponent(pathName)
         let res=await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=&${encodedPath}-rest${resId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`)
          let data=await res.json()
      
         setSelectedResDishes(data.data?.cards[1]?.card)
         setSimilarResDishes(data.data?.cards[2]?.card?.card?.cards||[])
        //  console.log(data.data?.cards[2]?.card?.card?.cards)
         dispatch(resetSimilarResDish())
      }
useEffect(()=>{

       fectchDishes()
       fectchRestaurant()
       setDishes([])
       setRestaurant([])
      },[searchQuery])
      function Searchre(e)
      {
         setSearch(e.target.value)
        setSelectedResDishes(null)
        dispatch(resetSimilarResDish())
            
      }
  return (
         <>
             <div className=' w-full md:w-[70%] mx-auto '>
              <div className='w-full  mx-auto'>
                <div className='relative w-full'>
                   <i class="fi fi-rr-angle-small-left absolute top-1/2 translate-y-[-20%] text-2xl"></i>
                   <i class="fi fi-rs-search absolute right-0 top-1/2 translate-y-[-20%] p-2"></i>
                   <input className='border-2 w-full rounded-2xl py-2 p-5 mt-3 focus:outline-none  mx-auto p-3'  type='text' placeholder='search food' onChange={(e)=>Searchre(e)
                  
                   }/>
                   
                </div>
                     <div className='flex flex-wrap gap-3 my-3'>
                         {
                              filterOptions.map((data,index)=>
                               {
                                  return <div key={index}> 
                                         { !selectedResDishes &&  <div className='' key={index}>

                                              <button onClick={()=>handleClick(data.filternam)} className={`py-1 px-4 border rounded-2xl flex gap-2 shadow-md font-semibold ${activeBtn==data.filternam?'active':''}` }>
                                               <p>{data.filternam}</p>         
                                          </button>  
                                           </div>
                               }
                             </div>
                             }
                           )
                        }
                    </div>     
               <div className='  grid md:grid-cols-2 bg-[#f4f3f4] '>
             { selectedResDishes?<>
              <div> <h1 className='text-2xl font-bold m-4 p-2 shadow-lg rounded-xl text-center text-white bg-green-600 '>Items added to cart</h1>
              <Dishes card={selectedResDishes.card}/>
              <p className='text-2xl font-bold p-2 shadow-lg rounded-xl text-center text-white bg-gray-600 m-4 '>More from the Restaurant</p>

              </div>
              <br/>
         
             {
             similarResDishes.map((data,i)=>
            {
                return <>
                          {/* {console.log(similarResDishes)} */}
                          <Dishes  card={{...data.card,restaurant:selectedResDishes.card.restaurant}} key={i}/>
              
                       </>
            })} </>:activeBtn=='Dishes'?    
                         
                             dishes.map((data,i)=>
                            {
                                  return <div key={i}>
                                              
                                              <Dishes card={data.card.card} key={i}/>    
                                        </div>
                            }
                         ):
                                 restaurant.map(({card,card:{card:{info:{cloudinaryImageId,costForTwoMessage,avgRating,name,id,sla}}}},i)=>
                                {
                                     return <div key={i}>
                                                 <Searchrestaurant card={card} key={i}/>
                                     </div>
                                     
                                })
                         } 
 
          </div>
        </div>
      </div>
         </>
  )
}

export default Search
