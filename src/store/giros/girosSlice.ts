import { createSlice } from "@reduxjs/toolkit";
import { Giros } from "../../interfaces";

const giros = {} as Giros[];

export const girosSlice = createSlice({
    name: 'giros',
    initialState:{
        isLoading:true,
        giros:giros,
    },
    reducers:{

        onListGiros: ( state, { payload = [] } ) => { 
            state.isLoading = false,
            state.giros = payload
        }
    }
});

export const { onListGiros } = girosSlice.actions;
