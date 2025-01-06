import React, { useState } from 'react'
import Restaurantcard from './Restaurantcard'
import { useDispatch } from 'react-redux'
import { setflterValue } from '../utili/filterSlice'
function Onlinefood({data,title}) {
      const [activeBtn,setActiveBtn]=useState(null)
    
      const filterOptions=[
        {filternam:'Rating 4.0+'},
        {filternam:'Rs. 300-Rs. 600'},
        {filternam:'offers'},
        {filternam:'Less than Rs.300'},
      ]
      function handleClick(filterName)
      {
       
          activeBtn==filterName?setActiveBtn(null):setActiveBtn(filterName)
      }
      const dispatch=useDispatch()
      dispatch(setflterValue(activeBtn))
  return (
    <div className='mt-4'>
        <h1 className='font-bold text-2xl'>{title}</h1>
        <div className='flex flex-wrap gap-3 mt-3'>
               {
                 filterOptions.map((data,i)=>
                {
                      return <div key={data.filternam}>
                                   
                                         <button key={data.filternam} onClick={()=>handleClick(data.filternam)} className={`p-3 border rounded-2xl flex gap-2 shadow-md ${activeBtn==data.filternam?'active':''}` }>
                                          <p>{data.filternam}</p>
                                          <i class="fi fi-br-cross mt-1 text-sm hidden"></i>
                                          </button>
                                  
                             </div>
                }
                )
              }
         </div>     
        
      
         <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 mt-2 '>
                   {data.map(({info,cta:{link}},i)=>
                        {
                            return <div key={i}>
                                          <Restaurantcard {...info} link={link}/>
                                     </div>
                        })
                    }
         </div>
    </div>
  )
}

export default Onlinefood
