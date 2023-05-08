import { configureStore } from "@reduxjs/toolkit";
import { negociosSlice } from "./negocios/negociosSlice";


const store = configureStore( {
    reducer: {
        negocios: negociosSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;