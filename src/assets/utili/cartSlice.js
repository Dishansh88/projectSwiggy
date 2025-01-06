import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const cartSlice=createSlice({
    name:"cartSlice",
    initialState:{
        cartItem:JSON.parse(localStorage.getItem("cart")) || [],
        resInfo:JSON.parse(localStorage.getItem('res'))||[]
    },
    reducers:{
        addToCart:(state,actions)=>
        {
            
              state.cartItem=[...state.cartItem,actions.payload.inf]
              state.resInfo=actions.payload.resInfo
            
               localStorage.setItem('cart',JSON.stringify(state.cartItem,actions.payload.inf)) 
                localStorage.setItem('res',JSON.stringify(actions.payload.resInfo))
             
        },
        deleteItem:(state,actions)=>
        {  
            state.cartItem=actions.payload
            localStorage.setItem('cart',JSON.stringify(state.cartItem)) 
        },
        clearCart:(state)=>
        {
             state.cartItem=[];
             state.resInfo=[];
             localStorage.removeItem('cart')
             localStorage.removeItem('res')
        }
    }
})
export const {addToCart,deleteItem,clearCart}=cartSlice.actions
export default cartSlice.reducer