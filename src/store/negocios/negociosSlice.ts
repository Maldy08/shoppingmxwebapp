import { createSlice } from "@reduxjs/toolkit";
import { Negocios } from "../../interfaces";

const negocios = {} as Negocios[];

export const negociosSlice = createSlice({
    name: 'negocios',
    initialState:{
        isLoading:true,
        negocios:negocios,
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