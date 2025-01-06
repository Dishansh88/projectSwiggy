import React, { memo, useCallback } from 'react'

function Discount({data:{info:{header,couponCode,offerLogo}},resInfo}) {
    // console.log(resinfo)
    
    return (
        <div className='flex min-w-[328px] h-[76px] border rounded-3xl p-3 mt-5 '>
               <img src={'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/'+offerLogo}/>
                  <div className=''>
                       <h2 className='font-bold text-sm'>{header}</h2>
                         <p className='font-semibold text-sm text-gray-400'>{couponCode}</p>
               </div>
        </div>
      )
}

export default memo(Discount)
