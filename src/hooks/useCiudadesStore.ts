import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import {  getDocs, orderBy, query } from "firebase/firestore";

import { onListCiudades } from "../store/ciudades/ciudadesSlice";
import { Ciudades } from "../interfaces";
import { ciudadesCollection } from "../firebase/collections";


export const useCiudadesStore = () => {

    const { ciudades, isLoading  } = useSelector( ( state: RootState ) => state.ciudades );

    const dispatch = useDispatch();

    // const startLoadingCiudades = async () => {

    //      const q = query( collection(FirebaseDB,"ciudades"),orderBy("id"));
    //      const querySnapshot = await getDocs(q);
    //      const ciudades: any[] = [];
    //      querySnapshot.forEach( ( doc ) => {
    //          ciudades.push({id: doc.id, ...doc.data() });
    //      });

    //      dispatch( onListCiudades( ciudades ));

    // }


    const startLoadingCiudades = async () => {
        const q = query(ciudadesCollection, orderBy("id"));
        const ciudades = await getDocs(q);
        const listaCiudades: Ciudades[] = [];
        ciudades.docs.forEach((ciudadDoc) => {
            const ciudad = ciudadDoc.data();
            listaCiudades.push(ciudad);
        });

        dispatch( onListCiudades( listaCiudades ));


    }

    return {
        startLoadingCiudades,
        ciudades,
        isLoading,
    }
}
