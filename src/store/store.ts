import { configureStore } from "@reduxjs/toolkit";
import { negociosSlice } from "./negocios/negociosSlice";
import { authSlice } from "./auth/authSlice";
import { ciudadesSlice } from "./ciudades/ciudadesSlice";
import { girosSlice } from "./giros/girosSlice";


const store = configureStore( {
    reducer: {
        auth: authSlice.reducer,
        negocios: negociosSlice.reducer,
        ciudades: ciudadesSlice.reducer,
        giros: girosSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
