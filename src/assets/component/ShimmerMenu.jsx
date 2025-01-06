import React from 'react'

function ShimmerMenu() {
  return (
    <div className='w-full animate-pulse '>       
            <div className='w-[90%] h-[180px] bg-gray-600 mx-auto  rounded-xl'>
                  
            </div>
            <div className='w-[80%] mx-auto pt-3 flex flex-wrap animate- justify-between mx-auto '  >
           
             <div className='flex flex-col gap-2 mx-auto'>
             {
                 Array(5).fill( '').map((data,index)=>(
                  <div  key={index} className='w-[250px] h-[182px]  bg-gray-600 rounded-xl bg-gradient-to-r from-gray-200 ... '></div>
                 ))
              }
             </div> 
             <div className='flex flex-col gap-2 mx-auto'>
             {
                  Array(5).fill( '').map((data,index)=>(
                    <div  key={index} className='w-[250px] h-[182px]  bg-gray-600 rounded-xl bg-gradient-to-r from-gray-200 ... '></div>
                   ))
              }
             </div> 
            </div>
      </div>

  )
}

export default ShimmerMenu
