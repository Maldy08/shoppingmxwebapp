import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name:'auth',
    initialState:{
        status:'checking',
        user:{ },
        errorMessage:''
    },
    reducers:{
        onCheking: ( state ) => {
            state.status = 'checking';
            state.user = { };
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.user = payload
        },
        onLogout: ( state ) => {
            state.status = 'not-authenticated';
            state.user = { };
        },
    }
});

export const { 
    
    onCheking,
    onLogin,
    onLogout,

} = authSlice.actions;
