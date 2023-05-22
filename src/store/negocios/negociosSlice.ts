import { createSlice } from "@reduxjs/toolkit";
import { Negocios } from "../../interfaces";

const negocios = {} as Negocios[];
const negocio = {} as Negocios;

export const negociosSlice = createSlice({
    name: 'negocios',
    initialState:{
        isLoading:true,
        negocios:negocios,
        negocio:negocio,
    },
    reducers: {
        onListNegocios : ( state , { payload = [] }) => {
            state.isLoading = false;
            state.negocios = payload;
        },
        onAddNewNegocio: ( state, { payload }) => {
            state.isLoading = false,
            state.negocio = payload
        }
    }
});

export const { onListNegocios, onAddNewNegocio } = negociosSlice.actions;