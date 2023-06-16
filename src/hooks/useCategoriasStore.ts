import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import {  addDoc, collection, deleteDoc, doc, getDocs , query, updateDoc, where, orderBy, and } from "firebase/firestore";
import { categoriasCollection } from "../firebase/collections";
import { Categorias } from "@interfaces";

import { FirebaseDB } from "../firebase/config";
import { onListCategorias, onAddNewCategoria, onListCategoriasByNegocio, onCategoriaByNegocioIdAndCategoriaId  } from "../store/categorias/categoriasSlice";

export const useCategoriasStore = () => {

    const { categoria , categorias, categoriasByNegocio , categoriaByNegocioIdAndCategoriaId ,isLoading } = useSelector( ( state: RootState ) => state.categorias );
    const dispatch = useDispatch();

    const startLoadingCategorias = async () => {
        const q = query(categoriasCollection, orderBy('id'));
        const categorias = await getDocs(q);
        const listCategorias: Categorias[] = [];
        categorias.docs.forEach( ( categoriaDoc ) => {
            const categoria = categoriaDoc.data();
            listCategorias.push(categoria);
        });

        dispatch( onListCategorias( listCategorias ));
    }

    const startLoadingCategoriasByNegocio = async (negocioID:string) => {
        const q = query(categoriasCollection, where('negocioId','==', negocioID ));
        const categorias = await getDocs(q);
        const listCategorias: Categorias[] = [];
        categorias.docs.forEach( ( categoriaDoc ) => {
            const categoria = categoriaDoc.data();
            listCategorias.push(categoria);
        });

        dispatch( onListCategoriasByNegocio( listCategorias ));
    }

    const startLoadingCategoriasByNegocioAndIdCategoria = ( categoriaId:any ): Categorias => {
       
        const categoria = categoriasByNegocio.filter( categoria => categoria.descripcion === categoriaId)[0];

        // const q = query(categoriasCollection, where('negocioId','==', negocioId),where('id', '==', categoriaId ) );
        // const categorias = await getDocs(q);
        // const listCategorias: Categorias[] = [];
        // categorias.docs.forEach( ( categoriaDoc ) => {
        //     const categoria = categoriaDoc.data();
        //     listCategorias.push(categoria);
        // });

         return categoria;

    }

    const startSavingCategorias = async ( data:Categorias ) => {
        let id:number;
        categorias.length > 0 ? id = categorias.length + 1 : id = 1;
        data.id = id.toString();

        await addDoc(collection(FirebaseDB, "categorias"), { ...data })
            .then( () => {
                dispatch( onAddNewCategoria( data ));
            })
            .catch( error => console.log( error ))
    }

    const startUpdateCategoria = async ( data:Categorias ) => {
        let docRef:any;
        const q = query(categoriasCollection,where("id",'==',data.id));
        const categoria = await getDocs(q);
        categoria.docs.forEach( (categoriaDoc ) => {
            docRef = categoriaDoc.id
        })

        const categoriaRef = doc(FirebaseDB,'categorias', docRef );
        await updateDoc( categoriaRef, { ...data } )
            .then(() => console.log('updated record'))
            .catch( error => console.log( error ))
    }

    const startDeleteCategoria = async ( data:Categorias ) => {
        let docRef:any;
        const q = query(categoriasCollection,where("id",'==',data.id));
        const categoria = await getDocs(q);
        categoria.docs.forEach( (categoriaDoc ) => {
            docRef = categoriaDoc.id
        })
        const promocionRef = doc(FirebaseDB,'categorias', docRef );
        await deleteDoc(promocionRef)
             .then(() => console.log('deleted record'))
             .catch( error => console.log( error ))
    }

    return {
        startLoadingCategorias,
        startLoadingCategoriasByNegocio,
        startLoadingCategoriasByNegocioAndIdCategoria,
        startSavingCategorias,
        startUpdateCategoria,
        startDeleteCategoria,
        isLoading,
        categorias,
        categoria,
        categoriasByNegocio,
        categoriaByNegocioIdAndCategoriaId
    }

}