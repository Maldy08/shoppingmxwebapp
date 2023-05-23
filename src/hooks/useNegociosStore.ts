import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"

import {  addDoc, collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { onAddNewNegocio, onListNegocios, onModificarNegocio } from "../store/negocios/negociosSlice";
import { negociosCollection } from "../firebase/collections";
import { Negocios } from "@interfaces";
import { FirebaseDB } from '../firebase/config';



export const useNegociosStore = () => {

    const { negocios, isLoading, isModificarNegocio } = useSelector( (state: RootState) => state.negocios ); 
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

    const startSavingNegocios = async ( data:Negocios ) => {
        
        let id:number;
        negocios.length > 0 ? id = negocios.length+1 : id = 1;
        data.id = id.toString();
        
        await addDoc(collection(FirebaseDB, "negocios"),data)
            .then( () => {
                dispatch( onAddNewNegocio(data));
            })
            .catch( error => console.log(error));
     
    }

    const startUpdateNegocio = async ( data:Negocios ) => {

        let docRef:any;
        const q = query(negociosCollection,where("id","==",data.id));
        const negocio = await getDocs(q);
        negocio.docs.forEach( ( negocioDoc ) => {
            docRef = negocioDoc.id
        })

        const negocioRef = doc(FirebaseDB,'negocios', docRef);
        await updateDoc(negocioRef, {...data}) 
            .then(() => console.log('updated record'))
            .catch( error => console.log( error ))

       // console.log(docRef);

    }

    const modificarNegocio = () => {
        dispatch( onModificarNegocio() );
    }

    return {
        startLoadingNegocios,
        startSavingNegocios,
        startUpdateNegocio,
        modificarNegocio,
        negocios,
        isLoading,
        isModificarNegocio,
    }
}