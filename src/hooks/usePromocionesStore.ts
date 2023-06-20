import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import {  addDoc, collection, deleteDoc, doc, getDocs , query, updateDoc, where } from "firebase/firestore";
import { promocionesCollection } from "../firebase/collections";
import { Promociones } from "@interfaces";
import { onAddNewPromocion, onListPromociones } from "../store/promociones/promocionesSlice";
import { FirebaseDB, FirebaseStorage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const usePromocionesStore = () => {

    const { promocion , promociones, isLoading } = useSelector( ( state: RootState ) => state.promociones );
    const dispatch = useDispatch();

    const startLoadingPromociones = async ( negocioId?:string ) => {
        const q = query(promocionesCollection);
        const promociones = await getDocs(q);
        const listPromociones: Promociones[] = [];
        promociones.docs.forEach( ( promocionDoc ) => {
            const promocion = promocionDoc.data();
            listPromociones.push(promocion);
        });

        dispatch( onListPromociones( listPromociones ));
    }

    const startSavingPromociones = async ( data:Promociones , file:Blob | ArrayBuffer, fileName:string) => {
        let id:number;
        promociones.length > 0 ? id = promociones.length + 1 : id = 1;
        data.id = id.toString();
        const imageRef = ref( FirebaseStorage, `images/promociones/${fileName}`)
        await uploadBytes(imageRef, file).catch( error => console.log( error ));
        const publicImageUrl = await getDownloadURL(imageRef)
        data.photoUrl = publicImageUrl;
        await addDoc(collection(FirebaseDB, "promociones"), { ...data })
            .then( () => {
                dispatch( onAddNewPromocion( data ));
            })
            .catch( error => console.log( error ))
    }

    const startUpdatePromocion = async ( data:Promociones ) => {
        let docRef:any;
        const q = query(promocionesCollection,where("id",'==', data.id));
        const promocion = await getDocs(q);
        promocion.docs.forEach( (promocionDoc ) => {
            docRef = promocionDoc.id
        })

        const promocionRef = doc(FirebaseDB,'promociones', docRef );
        await updateDoc( promocionRef, { ...data } )
            .then(() => console.log('updated record'))
            .catch( error => console.log( error ))
    }

    const startDeletePromocion = async ( data:Promociones ) => {
        let docRef:any;
        const q = query(promocionesCollection,where("id",'==', data.id));
        const promocion = await getDocs(q);
        promocion.docs.forEach( (promocionDoc ) => {
            docRef = promocionDoc.id
        })
        const promocionRef = doc(FirebaseDB,'promociones', docRef );
        await deleteDoc(promocionRef)
             .then(() => console.log('deleted record'))
             .catch( error => console.log( error ))
    }

    return {
        startLoadingPromociones,
        startSavingPromociones,
        startUpdatePromocion,
        startDeletePromocion,
        isLoading,
        promociones,
        promocion
    }

}