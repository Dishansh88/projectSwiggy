import React,{useContext, useEffect, useState}from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faArrowRight,faArrowLeft, prefix,faStar,faStarHalf}  from '@fortawesome/free-solid-svg-icons'
import { text } from '@fortawesome/fontawesome-svg-core'
import Restaurantcard from './Restaurantcard'
import Onlinefood from './Onlinefood'
import { Visible } from '../context/contextApi'

function Toprestaurantchain({data,title}) {
    // const [data,setdata]=useState([])
    const [value,setvalue]=useState(0)
    const {yourPlace:{lat,lng}}=useContext(Visible)
    async function getdata(params) {
        {
          
              try {
                let res=await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
                let data= await res.json()
                // console.log(data?.data?.cards[1].card.card.gridElements.infoWithStyle.restaurants)
                 setdata(data?.data?.cards[1]?.card?.card.gridElements.infoWithStyle?.restaurants)
              } catch (error) {
              
              }
                
        }
      }
    useEffect(()=>
    {
        getdata()
    },[lng,lat])
    function handleNext()
    {
           setvalue((prev)=>prev+100)
    }
    function handlePrev()
    {
             if(value==0)return;
             setvalue((prev)=>prev-100)
    }
  return (
    <div className='mt-10 w-full'>
    
        
            <div className='flex justify-between w-full '>
                    <h1 className='font-bold text-2xl'>{title}</h1>
                     <div className='flex gap-1 '>
                           <div onClick={handlePrev} className={` rounded-full w-9 flex justify-center items-center cursor-pointer ${value<=0?'bg-gray-100':'bg-gray-200'}`}><FontAwesomeIcon className={`${value<=0?'text-gray-300':'text-gray-800'}`} icon={faArrowLeft}  /></div>
                            <div className={`bg-gray-200 rounded-full w-9 flex justify-center items-center cursor-pointer ${value==124?"bg-gray-100":"bg-gray-200"}`} onClick={handleNext}><FontAwesomeIcon icon={faArrowRight} className={`${value==124?'text-gray-300':'text-gray-800'}`} /></div>
                     </div>
            </div>
                <div style={{translate:`-${value}%`}} className='flex gap-4 w-full mt-4 duration-1000'>
                    {
                        data.map(({info,cta:{link}},i)=>
                        {
                            return <div key={i}> 
                                     
                                            <Restaurantcard key={info.id} {...info} link={link}  /> 
                                  </div>
                        })
                    }
                </div>
      <hr className='border mt-1'/>
    </div>
  )
}

export default Toprestaurantchain
