import { configureStore, createAsyncThunk, createStore } from "@reduxjs/toolkit";
import  toogleSlice  from "./toggleSlice";
import  cartSlice  from "./cartSlice";
import filterSlice from "./filterSlice";
import { auth } from "../../config/firbaseAuth";
import  authSlice from "./authSlice";
export const store=configureStore({
    reducer:{
        toogleSlice:toogleSlice,
        cartSlice:cartSlice,
        filterSlice:filterSlice,
        authSlice:authSlice
    }
})