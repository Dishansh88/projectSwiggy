import { createSlice } from "@reduxjs/toolkit";

export const filterSlice=createSlice(
    {
        name:"filterSlice",
        initialState:{
            filterValue:null
        },
        reducers:{
            setflterValue:(state,actions)=>
            {
                 state.filterValue=actions.payload

            }
        }
    }
)
export const {setflterValue}=filterSlice.actions;
export default filterSlice.reducer