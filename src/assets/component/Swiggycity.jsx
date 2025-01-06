import React from 'react'
import { useParams } from 'react-router-dom'

function Swiggycity() {
    const {city}=useParams()
  
  return (
    <div>
         <div className='w-[85%]'>
             <img className='w-20' src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_260/portal/m/seo/Logos/Swiggy/Swiggy%20logo-2.png'/>
         </div>
    </div>
  )
}

export default Swiggycity
