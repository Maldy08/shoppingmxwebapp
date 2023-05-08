import { createSlice } from "@reduxjs/toolkit";


export const negociosSlice = createSlice({
    name: 'negocios',
    initialState:{
        isLoading:true,
        negocios:[],
        negocio:{},
    },
    reducers: {
        onListNegocios : ( state , { payload = [] }) => {
            state.isLoading = false;
            state.negocios = payload;
        }
    }
});

export const { onListNegocios } = negociosSlice.actions;