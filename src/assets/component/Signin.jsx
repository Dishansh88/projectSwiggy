import React from 'react'
import { useSelector } from 'react-redux'
import { auth, provider } from '../../config/firbaseAuth'
import { signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utili/authSlice'
import { useNavigate } from 'react-router-dom'
import { toggleLogin } from '../utili/toggleSlice'


function Signin() {
   const dispatch=useDispatch()
   const navigate=useNavigate()
   const userData=useSelector((state)=>state.authSlice.userData)
   const loginVisible=useSelector((state)=>state.toogleSlice.logginToggle)

   async function handleAuth()
    {
       let res= await signInWithPopup(auth,provider)
       const userData={
           name:res.user.displayName,
           photo:res.user.photoURL
       }
       dispatch(addUser(userData))
       dispatch(toggleLogin())
       navigate('/')
    }
  async function handleLogout(params) {
      dispatch(removeUser())
     
      
  }
  return (
    <div className=''>
      { !userData?<button className='bg-orange-500 px-10 rounded-2xl text-white p-3 text-xl font-bold' onClick={handleAuth}>SignIn</button>:
        <button className='bg-orange-500 px-10 rounded-2xl text-white p-3 text-xl font-bold' onClick={handleLogout}>Logout</button>}

    
    </div>
  )
}

export default Signin
