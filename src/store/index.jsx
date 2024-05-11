import { configureStore } from "@reduxjs/toolkit";
import IsLoadingReducer from './slices/SpinerSlice'
import UserReducer from "./slices/UserSlice";
import NotificationReducer from "./slices/NotificationSlice";
import BtnSpinerReducer from "./slices/ButtonSpinerSlice";

 


const store = configureStore({
    reducer:{
        loading:IsLoadingReducer,
        user:UserReducer,
        btn:BtnSpinerReducer,
        notification:NotificationReducer,

        
    }
})
 
export default store