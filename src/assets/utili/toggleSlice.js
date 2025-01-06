import { faL } from "@fortawesome/free-solid-svg-icons";
import { createSlice } from "@reduxjs/toolkit";

export const toogleSlice=createSlice({
    name:'toogleSlice',
    initialState:{
        toggleBar:false,
        logginToggle:false,
        isSimilarResDishes:{
            similarDishes:false,
            city:'',
            resLocation:'',
            resId:'',
            itemId:''
        }
    },
    reducers:{
           chngevalue:(state,actions)=>
           {
                state.toggleBar=!state.toggleBar;
           },
           toggleLogin:(state,actions)=>
           {
               state.logginToggle=!state.logginToggle
           },
        //    toggleIsres:(state,actions)=>
        //    {
        //     console.log(actions)
        //        state.isSimilarResDishes=!state.isSimilarResDishes
        //    }
        setSimilarDishes:(state,action)=>
        {
            state.isSimilarResDishes=action.payload;
        },
        resetSimilarResDish:(state,action)=>
        {
            
              state.isSimilarResDishes.similarDishes=false
              
        }
    }
})
export const {chngevalue,toggleLogin,toggleIsres,setSimilarDishes,resetSimilarResDish} =toogleSlice.actions
export default toogleSlice.reducer