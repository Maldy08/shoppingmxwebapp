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
        isModificarNegocio:false,
    },
    reducers: {
        onListNegocios : ( state , { payload = [] }) => {
            state.isLoading = false;
            state.negocios = payload;
        },
        onAddNewNegocio: ( state, { payload }) => {
            state.isLoading = false,
            state.negocio = payload
        },
        onModificarNegocio: ( state ) => {

            state.isModificarNegocio = true
           // console.log(state.isModificarNegocio);
        },
    }
});

export const { onListNegocios, onAddNewNegocio, onModificarNegocio } = negociosSlice.actions;