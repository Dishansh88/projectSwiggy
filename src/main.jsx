import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  BrowserRouter } from 'react-router-dom'
import toast,{Toaster} from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './assets/utili/store.js'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
        <BrowserRouter>
   <StrictMode>
    <App />
    <Toaster/>
  </StrictMode>,
  </BrowserRouter>
  </Provider>
  
 
)
