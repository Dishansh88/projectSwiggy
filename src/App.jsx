import { useEffect, useState } from 'react'
import Head from './assets/component/Head'
import Body from './assets/component/Body'
import { json, Route, Routes } from 'react-router-dom'
import Home from './assets/component/Home'
import Restaurantcard from './assets/component/Restaurantcard'
import Restaurantmenu from './assets/component/Restaurantmenu'
import {  CarTdata, Visible } from './assets/context/contextApi'
import Swiggycity from './assets/component/Swiggycity'
import Cart from './assets/component/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { chngevalue } from './assets/utili/toggleSlice'
import Signin from './assets/component/Signin'
import Search from './assets/component/Search'
function App() {
  const [cartData,setCartData]=useState([])
  const dispatch=useDispatch()
  const visible=useSelector((state)=>state.toogleSlice.toggleBar)
  const loginVisible=useSelector((state)=>state.toogleSlice.logginToggle)
  let data=JSON.parse(localStorage.getItem('loc'))
  const [yourPlace,setYourPlace]=useState(data||{
   
})             
// console.log(data)
  function getdata_from_Localstorage()
  {
          let data=JSON.parse(localStorage.getItem("cart")) || []
          setCartData(data)
  }
  function setgeo()
  {
            let data=JSON.parse(localStorage.getItem('loc'))
           
            setYourPlace(
              data ||
              {
                 lat : "22.057437",
                 lng: "78.9381729"
              }
            )
            
        
  }
  
  useEffect(()=>
  {
          getdata_from_Localstorage()
          setgeo()
        
  },[])
 
  return (
    <>
    <div className={`${visible || loginVisible?"max-h-screen overflow-hidden w-full h-full":" "} `} >
  <CarTdata.Provider value={{cartData,setCartData}}>
      <Visible.Provider value={{visible,yourPlace,setYourPlace}}>
        <Routes>
              <Route path='/' element={<Head/>}>
                  <Route path='/' element={<Body/>}></Route>
                  <Route path='/restaurantmenu/:id' element={<Restaurantmenu/>}></Route>
                  <Route path='/swiggy.com/city' element={<Swiggycity/>}></Route>  
                  <Route path='/cart' element={<Cart/>}></Route>  
                  <Route path='/Login' element={<Signin/>}></Route>  
                  <Route path='/search' element={<Search/>}></Route>
           </Route>
      </Routes>
      </Visible.Provider>
  </CarTdata.Provider>
    </div>
     
    </>
  )
}

export default App
