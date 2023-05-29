import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"

import {  addDoc, collection, deleteDoc, doc, getDocs , query, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseDB, FirebaseStorage } from '../firebase/config';
import { negociosCollection } from "../firebase/collections";
import { onAddNewNegocio, onListNegocios, onModificarNegocio } from "../store/negocios/negociosSlice";
import { Negocios } from "@interfaces";



export const useNegociosStore = () => {

    const { negocios, isLoading, isModificarNegocio } = useSelector( (state: RootState) => state.negocios ); 
    const dispatch = useDispatch();

    const startLoadingNegocios = async () => {
        const q = query(negociosCollection,where('userid' ,'==', 'camv29@gmail.com'));
        const negocios = await getDocs(q);
        const listNegocios: Negocios[] = [];
        negocios.docs.forEach( ( negocioDoc ) => {
            const negocio = negocioDoc.data();
            listNegocios.push(negocio);
        });

        dispatch( onListNegocios( listNegocios ));
    }

    const startSavingNegocios = async ( data:Negocios, file:Blob | ArrayBuffer, fileName:string ) => {
        
        let id:number;
        negocios.length > 0 ? id = negocios.length+1 : id = 1;
        data.id = id.toString();
        const imageRef = ref(FirebaseStorage, `images/${fileName}`);
        await uploadBytes(imageRef, file).catch( error => console.log( error ));
        const publicImageUrl = await getDownloadURL(imageRef)
        data.photoUrl = publicImageUrl;

        await addDoc(collection(FirebaseDB, "negocios"),{userid:'camv29@gmail.com',...data})
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

    const startDeleteNegocio = async ( data:Negocios ) => {
        let docRef:any;
        const q = query(negociosCollection,where("id","==",data.id));
        const negocio = await getDocs(q);
        negocio.docs.forEach( ( negocioDoc ) => {
            docRef = negocioDoc.id
        })

        const productoRef = doc(FirebaseDB,'productos', docRef);
        await deleteDoc(productoRef)
            .then(() => console.log('deleted record'))
            .catch( error => console.log( error ))
    }

    const modificarNegocio = () => {
        dispatch( onModificarNegocio() );
    }

    return {
        startLoadingNegocios,
        startSavingNegocios,
        startUpdateNegocio,
        startDeleteNegocio,
        modificarNegocio,
        negocios,
        isLoading,
        isModificarNegocio,
    }
}