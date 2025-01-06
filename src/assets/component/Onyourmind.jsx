import {React,useState,useEffect, memo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faArrowRight,faArrowLeft}  from '@fortawesome/free-solid-svg-icons'
import { text } from '@fortawesome/fontawesome-svg-core'

function Onyourmind({data,title}) {

    //  const [data,setdata]=useState([])
    const [value,setvalue]=useState(0)
     async function getdata(params) {
      {
            // try {
            //   let res=await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.2599333&lng=77.412615&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')
            //   let data= await res.json()
           
            //    setdata(data?.data?.cards[0]?.card?.card.imageGridCards?.info)
            //    console.log(data?.data?.cards[0]?.card?.card.imageGridCards?.info)
               
        
              
      }
    }
    
    function handlePrev()
    {
      if(value<=0)return;
      setvalue((prev)=>prev-31)
    }
    function handleNext()
    {
      if(value>=124)return;
          setvalue((prev)=>prev+31)
          
          
    }
    useEffect(()=>
      {
            getdata()
      },[])
  return (
    <div >
            <div className='flex justify-between mt-5'>
                <h1 className='font-bold text-2xl'>What's on your Mind?</h1>
                   <div className='flex gap-1 '>
                      <div onClick={handlePrev} className={` rounded-full w-9 flex justify-center items-center cursor-pointer ${value<=0?'bg-gray-100':'bg-gray-200'}`}><FontAwesomeIcon className={`${value<=0?'text-gray-300':'text-gray-800'}`} icon={faArrowLeft}  /></div>
                      <div className={`bg-gray-200 rounded-full w-9 flex justify-center items-center cursor-pointer ${value==124?"bg-gray-100":"bg-gray-200"}`} onClick={handleNext}><FontAwesomeIcon icon={faArrowRight} className={`${value==124?'text-gray-300':'text-gray-800'}`} /></div>
                    </div>
            </div>
                <div  style={{translate:`-${value}%`}} className='flex duration-1000 '>
                        {
                           data.map((e,i)=>
                                 (
                                     
                                                <img className='w-40' key={i} src={`https://media-assets.swiggy.com/swiggy/image/upload/${e.imageId}`}/>
                                          
                                 ))
                        }
                    
            </div>
            <hr className='border'/>
    </div>
    
  )
}

export default Onyourmind