import React from 'react'

function Shimmer() {
  return (
    <div className='w-full '>
             
            <div className=' w-full h-[200px] bg-slate-900 text-white flex flex-col justify-center items-center gap-3'>
              <div className='relative flex items-start'>
                     <i className="fi fi-tr-popsicle text-3xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></i>
                      <span class="loader">   </span>
              </div>
             
              <h1 className='text-2xl'>Looking for great food near you....</h1>
            </div>
      <div>
            <div className='w-[80%]  pt-3 flex flex-wrap justify-center gap-2 mx-auto animate-pulse'  >
           
              {
                 Array(10).fill('').map((data,index)=>(
                  <div key={index} className='w-[250px] h-[182px]  bg-gray-300 rounded-xl bg-gradient-to-r from-gray-600 ... '></div>
                 )
                )
              }
            </div>
      </div>
    </div>
  )
}

export default Shimmer
