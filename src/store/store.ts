import { configureStore } from "@reduxjs/toolkit";
import { negociosSlice } from "./negocios/negociosSlice";
import { authSlice } from "./auth/authSlice";
import { ciudadesSlice } from "./ciudades/ciudadesSlice";
import { girosSlice } from "./giros/girosSlice";
import { productosSlice } from "./productos/productosSlice";


const store = configureStore( {
    reducer: {
        auth: authSlice.reducer,
        negocios: negociosSlice.reducer,
        ciudades: ciudadesSlice.reducer,
        giros: girosSlice.reducer,
        productos: productosSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
