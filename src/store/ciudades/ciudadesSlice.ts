import { createSlice } from "@reduxjs/toolkit";

export const ciudadesSlice = createSlice({
    name:'ciudades',
    initialState:{
        isLoading:true,
        ciudades: [],
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