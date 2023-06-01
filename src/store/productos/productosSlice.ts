import { Productos } from "@interfaces"
import { createSlice } from "@reduxjs/toolkit";



const productos = { } as Productos[];
const producto = { } as Productos;

export const productosSlice = createSlice({
    name: 'productos',
    initialState: {
        isLoading:true,
        producto:producto,
        productos:productos,
        productosByNegocio: productos
    },
    reducers : {
        onListProductos: ( state , { payload = [] }) => {
            state.isLoading = false;
            state.productos = payload;

        },
        onAddNewProducto: ( state, { payload }) => {
            state.isLoading = false,
            state.producto = payload
        },
        onListProductosByNegocio: ( state, { payload = [] }) => {
            state.isLoading = false,
            state.productosByNegocio = payload;
        }


    }
});

export const { onListProductos, onListProductosByNegocio, onAddNewProducto } = productosSlice.actions;

