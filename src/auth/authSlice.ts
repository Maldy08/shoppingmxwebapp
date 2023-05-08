import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking'
    },
    reducers:{
        onCheking: ( state ) => {
            state.status ='cheking';
        }
    }
});

export const { onCheking } = authSlice.actions;