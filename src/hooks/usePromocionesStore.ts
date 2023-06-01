import { useDispatch, useSelector } from "react-redux"
import { RootState } from "src/store/store"
import {  addDoc, collection, deleteDoc, doc, getDocs , query, updateDoc, where } from "firebase/firestore";
import { promocionesCollection } from "../firebase/collections";
import { Promociones } from "@interfaces";
import { onListPromociones } from "../store/promociones/promocionesSlice";
import { FirebaseDB } from "../firebase/config";
import { onAddNewProducto } from "src/store/productos/productosSlice";

export const usePromocionesStore = () => {

    const { promociones, isLoading } = useSelector( ( state: RootState ) => state.promociones );
    const dispatch = useDispatch();

    const startLoadingPromociones =async ( negocioId?:string ) => {
        const q = query(promocionesCollection, where('negocio', '==', negocioId ));
        const promociones = await getDocs(q);
        const listPromociones: Promociones[] = [];
        promociones.docs.forEach( ( promocionDoc ) => {
            const promocion = promocionDoc.data();
            listPromociones.push(promocion);
        });

        dispatch( onListPromociones( listPromociones ));
    }

    const startSavingPromociones = async ( data:Promociones ) => {
        let id:number;
        promociones.length > 0 ? id = promociones.length + 1 : id = 1;
        data.id = id.toString();

        await addDoc(collection(FirebaseDB, "promociones"), { data })
            .then( () => {
                dispatch( onAddNewProducto( data ));
            })
            .catch( error => console.log( error ))
    }

    const startUpdatePromocion =async ( data:Promociones ) => {
        let docRef:any;
        const q = query(promocionesCollection,where("id",'==',data.id));
        const promocion = await getDocs(q);
        promocion.docs.forEach( (promocionDoc ) => {
            docRef = promocionDoc.id
        })

        const promocionRef = doc(FirebaseDB,'promociones', docRef );
        await updateDoc( promocionRef, { ...data } )
            .then(() => console.log('updated record'))
            .catch( error => console.log( error ))
    }

    return {
        startLoadingPromociones,
        startSavingPromociones,
        startUpdatePromocion,
        isLoading,
        promociones
    }

}