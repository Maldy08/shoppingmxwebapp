import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"

import {  getDocs, orderBy, query } from "firebase/firestore";
import { onListNegocios } from "../store/negocios/negociosSlice";
import { negociosCollection } from "../firebase/collections";
import { Negocios } from "../interfaces";

export const useNegociosStore = () => {

    const { negocios, isLoading } = useSelector( (state: RootState) => state.negocios ); 
    const dispatch = useDispatch();

    const startLoadingNegocios = async () => {
        const q = query(negociosCollection,orderBy("id"));
        const negocios = await getDocs(q);
        const listNegocios: Negocios[] = [];
        negocios.docs.forEach( ( negocioDoc ) => {
            const negocio = negocioDoc.data();
            listNegocios.push(negocio);
        });

        dispatch( onListNegocios( listNegocios ));
    }

    return {
        startLoadingNegocios,
        negocios,
        isLoading,
    }
}