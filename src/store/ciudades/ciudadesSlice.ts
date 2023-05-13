import { createSlice } from "@reduxjs/toolkit";
import { Ciudades } from "../../interfaces/ciudades";

const ciudades = {} as Ciudades[];

export const ciudadesSlice = createSlice({
    name:'ciudades',
    initialState:{
        isLoading:true,
        ciudades: ciudades,
        ciudad: {}

    },
    reducers:{

        onListCiudades: ( state, { payload = [] } ) => {
            state.isLoading = false,
            state.ciudades = payload
        }

    }
});

export const { onListCiudades } = ciudadesSlice.actions;