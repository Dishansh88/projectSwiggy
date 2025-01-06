import { comma } from 'postcss/lib/list'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Detailedmenu from './Detailedmenu'
import  {faArrowRight,faArrowLeft, faL}  from '@fortawesome/free-solid-svg-icons'
import { CarTdata, Visible } from '../context/contextApi'
import { useSelector } from 'react-redux'
import Discount from './Discount'
import Shimmer from './Shimmer'
import ShimmerMenu from './ShimmerMenu'

function Restaurantmenu() {
    const [value,setvalue]=useState(0)
    const [resInfo,setresInfo]=useState([])
    const [menuData,setmenuData]=useState([])
    const [discountData,setdiscountData]=useState([])
    const [topIcs,setOpics]=useState(null)
    const [currIndex,setcurrIndex]=useState(null)
    const [data,setdata]=useState(null)
     const {id}=useParams()
     let mainId=id.split("rest")[1]
const {setInitialgeo,initialgeo}=useContext(Visible)
function handleNext()
{
      if(value>=120)return
     setvalue((prev)=>prev+40)
}
function handlePrev()
{
  if(value<=0) return;
  setvalue((prev)=>prev-40)
}
// function toogleFun(i)
// {
//      setcurrIndex(i)
// }

 async function getdata()
{
       let res=await fetch(`${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.2599333&lng=77.412615&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`) 
       let data=await res.json();
       setdata(data)
       let actualMenuData=(data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)?.filter((data)=>data?.card?.card?.itemCards || data?.card?.card?.categories)||(data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards)?.filter((data)=>data?.card?.card?.itemCards || data?.card?.card?.categories)
     // setOpics((data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((data)=>data?.card?.card?.title=="Top Picks")[0])
        const resIn=data?.data?.cards.find((data)=>data?.card?.card?.["@type"].includes("v2.Restaurant"))
     
       setresInfo(data.data.cards[2].card.card.info)
      //  console.log(data.data.cards[2].card.card.info)
       setdiscountData(data?.data?.cards[3]?.card.card.gridElements.infoWithStyle.offers)
       setmenuData(actualMenuData)
      //  console.log(topPicks)
}
  useEffect(()=>
{
     getdata()
},[])
  return (
           <> { data?<div className=' w-full  '>
                <div className='mx-auto w-[90%] md:w-[75%]  pt-8 '>
                   <p className='text-[12px]'><Link to={'/'}><span className='text-slate-400       hover:text-slate-800    hover:cursor-pointer'>Home /</span></Link>  <span   className='text-slate-400 hover:text-slate-800 hover:cursor-pointer'>{resInfo.city} / </     span>  <span className='text-slate-900'>{resInfo.name}</span></p>
                                 <h1 className='text-2xl font-bold pt-2'>{resInfo?.name}</h1>
                                   <div className='h-[180px] w-full  mt-3 rounded-[30px] bg-gradient-to-t px-4 pb-4 from-slate-200/80 '>
                                     <div className='bg-white w-full h-full  border-slate-200 rounded-[30px] '>
                                         <div className='flex items-center gap-1 font-bold'>
                                            <i class="fi fi-ss-circle-star text-green-600 text-lg mt-1"></i>
                                            <span>{resInfo?.avgRating}</span>
                                            <span>({resInfo?.totalRatingsString})</span>
                                            .
                                            <span>{resInfo?.costForTwoMessage}</span>
                                          </div> 
                                          <p className='underline font-semibold text-orange-600 text-sm'>{resInfo?.cuisines?.join(", ")}</p>
                                          <div className='p-4'>
                                              <div className='flex gap-1 w-full'>
                                                 <div className='flex flex-col justify-center w-[8px] items-center'>
                                                   <div className='w-[5px] h-[5px] bg-gray-300 rounded-full'></div>
                                                     <div className='h-[25px] w-[1px] bg-gray-300'></div>
                                                        <div className='w-[5px] h-[5px] bg-gray-300 rounded-full'></div>
                                                              </div>
                                                <div  className=' flex flex-col gap-3 text-sm font-bold '>
                                                     <p className=''>Outlet <span className='text-gray-600 font-normal'>{resInfo.  locality}</span></p>
                                                     <p>{resInfo?.sla?.slaString?.toLowerCase()}</p>
                                                 </div>
                                             </div>  
                                            </div>
                                          <hr className='border'/>
                                     </div>
                               </div>
              <div className='w-full  overflow-hidden'>
                      <div className='flex justify-between mt-5'>
                           <h1 className='font-bold text-xl'>Deals For you</h1>
                              <div className='flex gap-1 '>
                                     <div onClick={handlePrev} className={` rounded-full w-9 flex justify-center items-center cursor-pointer ${value<=0?  'bg-gray-100':'bg-gray-200'}`}><FontAwesomeIcon className={`${value<=0?'text-gray-300':'text-gray-800'} `} icon={faArrowLeft}  /></div>
                                        <div className={`bg-gray-200 rounded-full w-9 flex justify-center items-center cursor-pointer ${value==0?"bg-gray-100":"bg-gray-200"}`} onClick={handleNext}><FontAwesomeIcon icon={faArrowRight} className={`${value==120?'text-gray-300':'text-gray-800'}`} /></div>
                                 </div>
                            </div>
                             <div className='flex gap-2 duration-1000 ' style={{translate:`-${value}%`}}>
                           {
                              discountData.map((data,index)=>
                                   {
                                   return <div key={index} >
                                              <Discount data={data} resInfo={resInfo}/>
                                          </div>
                                      })
                           }
                           </div>
                            <h1 className='text-center mt-5 leading-5'>Menu</h1>
                              <div className=' w-full mt-4  relative '>
                                      <div className=' items-center text-center p-2 rounded-3xl bg-slate-200 font-semibold'>
                                          <span className='text-sm font-semibold text-gray-500'>Search for dishes</span></div>
                                            <i class="fi fi-rr-search absolute top-3 right-4 "></i>
                                             </div>
                                                <hr className='border mt-4'/>
                              </div>
                              {/* after search bar content */}
                        {   topIcs  &&   <div className='overflow-hidden'>
                              <div className='flex justify-between mt-5'>
                                
                                  <h1 className='font-bold text-xl'>{topIcs?.card?.card?.title}</h1>
                                     <div className='flex gap-1 '>
                                           <div onClick={handlePrev} className={` rounded-full w-9 flex justify-center items-center cursor-pointer ${value<=0?  'bg-gray-100':'bg-gray-200'}`}><FontAwesomeIcon className={`${value<=0?'text-gray-300':'text-gray-800'} `} icon={faArrowLeft}  /></div>
                                              <div className={`bg-gray-200 rounded-full w-9 flex justify-center items-center cursor-pointer ${value==0?"bg-gray-100":"bg-gray-200"}`} onClick={handleNext}><FontAwesomeIcon icon={faArrowRight} className={`${value==120?'text-gray-300':'text-gray-800'}`} /></div>
                                       </div>
                                  </div>
                            <div className='flex gap-2 duration-1000 mt-5' style={{translate:`-${value}%`}}>
                           {
                              topIcs.card.card.carousel.map(({creativeId,dish:{info,info:{defaultPrice,price}}})=>
                                   { 
                                   return 
                                   
                                            <div key={info} className="min-w-[200px] md:min-w-[350px] md:min-h-[390px] relative dowm-shadow "> 
                                                  <img className='w-full h-full' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`}/>        
                                                  <div className='absolute bottom-4 left-3 text-white text-sm font-semibold'>₹{price/100 || defaultPrice}</div>
                                                <button className=' absolute right-2 bottom-3 text-green-700  px-5 py-2 drop-shadow rounded-xl font-bold text-sm bg-white'>Add</button>
                                           </div>
                                   
                                      })
                           }
                           </div>
                          </div>   
}      
                                    {/* //menu of restaurant */}
                                  <div className='mt-5'>
                                    {
                                       menuData.map(({card:{card}},Index)=>
                                      {
                                           return<div key={Index}>
                                                      {<Menucard key={Index} card={card} resInfo={resInfo} />}
                                                 </div>
                                            })
                                         }
                                   </div>
                         </div>  
                     </div>:<ShimmerMenu/>}
                     </>

  )
function Menucard({card,resInfo})
{
  const [arrw,setarrw]=useState('down')
  let hello=false;
  if(card["@type"])
      hello=true;
  const [showMenu,setshowMenu]=useState(hello)
 function toggleFun()
    {
              
           setshowMenu((prev)=>!prev)
             setarrw((prev)=>prev=='down'?'up':'down')
    }
  if(card?.itemCards)
  {
    const {title,itemCards}=card;
  
    return(
    <>
      <div className='mt-7'>
               <div className='flex justify-between'>
                   <h1 className={`font-bold text-${card["@type"]?"1xl":"base"}`}>{title}({itemCards.length})</h1>
                   <i class={`fi fi-rs-angle-small-${arrw}`} onClick={toggleFun}></i>
               </div>
                      { showMenu &&  <DetailMenu itemCards={itemCards} resInfo={resInfo}/> }
                    
                          <hr className={"my-4 rounded-2xl border-"+(card["@type"]?["10px"]:["4px"])}/>
      </div>
      </>
      )
  }else{
    const {categories,title}=card
      return(
          
              <div> 
                   <h1 className={`font-bold text-${card["@type"]?"xl":"base"}`}>{title}</h1>
                     {
                        categories.map((data,index)=>(
                          <Menucard card={data} resInfo={resInfo} key={index}/>
                        ))
                      }
                      
              </div>
      )
  }
}

  
function DetailMenu({itemCards,resInfo})
{
     return(
     <>
                <div className='my-5 ' >
                    {
                        itemCards.map(({card:{info,info:{name,price,defaultPrice,itemAttribute:{vegClassifier},ratings:{aggregatedRating:{rating,ratingCountV2}},description,imageId}}},i)=>
                         {
                            return <Detailedmenu info={info} resInfo={resInfo} key={info.id}  />
                         })
                   }
                  
               </div> 
     </>
                  )
}
}

export default Restaurantmenu
