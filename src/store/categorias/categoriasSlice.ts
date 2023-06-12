import { Categorias } from "@interfaces";
import { createSlice } from "@reduxjs/toolkit";

const categorias = {} as Categorias[]
const categoria = {} as Categorias


export const categoriasSlice = createSlice({
    name:'categorias',
    initialState:{
        isLoading:true,
        categoria: categoria,
        categorias:categorias,
        categoriaByNegocioIdAndCategoriaId:categoria,
        categoriasByNegocio: categorias
    },
    reducers:{
        onListCategorias: ( state , { payload = [] }) => {
            state.isLoading = false;
            state.categorias = payload;

        },
        onListCategoriasByNegocio:( state, { payload = [] }) => {
            state.isLoading = false;
            state.categoriasByNegocio = payload;
        },
        onCategoriaByNegocioIdAndCategoriaId:( state, { payload } ) => {
            state.isLoading = false;
            state.categoriaByNegocioIdAndCategoriaId = payload;
        },
        onAddNewCategoria: ( state, { payload }) => {
            state.isLoading = false,
            state.categoria = payload
        },

    }
})

export const {onListCategorias, onListCategoriasByNegocio, onAddNewCategoria,onCategoriaByNegocioIdAndCategoriaId } = categoriasSlice.actions;