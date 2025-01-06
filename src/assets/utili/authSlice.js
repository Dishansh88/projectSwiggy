import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
    name:'Authslice',
    initialState:{
        userData:JSON.parse(localStorage.getItem("userdata"))
    },
    reducers:{
        addUser:(state,actions)=>
        {
            state.userData=actions.payload;
            localStorage.setItem("userdata",JSON.stringify(actions.payload))
        },
        removeUser:(state,actions)=>
        {
             localStorage.removeItem("userdata")
             state.userData=null
        }
    }
})
export const {addUser,removeUser}= authSlice.actions;
export default authSlice.reducer;