import { Promociones } from "@interfaces";
import { createSlice } from "@reduxjs/toolkit";

const promociones = {} as Promociones[];
const promocion = {} as Promociones;

export const promocionesSlice = createSlice({
    name:'promociones',
    initialState:{
        isLoading:true,
        promociones: promociones,
        promocion:promocion
    },
    reducers:{
        onListPromociones : ( state , { payload = [] }) =>{
            state.isLoading = false;
            state.promociones = payload;
        },
        onAddNewPromocion : ( state, { payload }) => {
            state.isLoading = false;
            state.promocion = payload;
        }
    }
});

export const { onListPromociones, onAddNewPromocion } = promocionesSlice.actions;