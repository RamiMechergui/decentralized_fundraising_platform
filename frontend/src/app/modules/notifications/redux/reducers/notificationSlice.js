import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    notification:'',
    notifications:[],
    loading:false,
    error:''
}

export const fetchNotification = createAsyncThunk('notification/fetch',async () =>{
    const response = await axios.get('http://backend.tokenopp.org/api/users/notifications/648b1544c67d80751229b651');
    return response.data;
})

const notificationSlice = createSlice({
    name : 'notification',
    initialState ,
    reducers : {

    } ,
    extraReducers: (builder)=>{
        builder.addCase(fetchNotification.pending,(state,action)=>{
            state.loading=true;
        });
        builder.addCase(fetchNotification.fulfilled,(state,action)=>{
            state.loading=false;
            state.joke = action.payload.value; 
        
        });
        builder.addCase(fetchNotification.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload.message; 
        });
    }
});

const notificationReducer = notificationSlice.reducer;
export default notificationReducer;
