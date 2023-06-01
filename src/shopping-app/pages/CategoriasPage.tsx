import { useState } from "react";
import { Categorias } from "@interfaces";
import { useCategoriasStore } from "../../hooks"
import { MainLayout } from "../layout/MainLayout"




export const CategoriasPage = () => {

    const { startSavingCategorias, startUpdateCategoria, startDeleteCategoria, startLoadingCategorias } = useCategoriasStore();
    const [modify, setModify] = useState(false);   
    const [showModal, setShowModal] = useState(false);
    const [showmodalDelete, setShowmodalDelete] = useState(false);
    const [categoriaDelete, setCategoriaDelete] =useState<Categorias>()
    const [categoriMod, setCategoriaMod] = useState<Categorias>()
    
    const saveData = async ( data: Categorias) => {
        if(!modify){
            await startSavingCategorias( data )
           console.log( data );
        } else {
            await startUpdateCategoria( data )
        }
    }

    const deleteData = async ( data:Categorias) => {

        setCategoriaDelete( data );
        setShowmodalDelete(true)
    }
    
    const confirmDeleteData = async ( data:Categorias ) => {
        setShowmodalDelete(false)
         await startDeleteCategoria( data )
            .then( () => startLoadingCategorias() )
    }

    const editData =  ( data:Categorias ) => {
        setModify(true)
        setCategoriaMod(data)
        setShowModal(true)
    }
    
    const handleCancel = () => setShowmodalDelete(false)
    


    return (
       <MainLayout>
        
       </MainLayout>
    )
}