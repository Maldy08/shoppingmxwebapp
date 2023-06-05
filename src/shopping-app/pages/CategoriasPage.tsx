import { useEffect, useState } from "react";
import { Categorias } from "@interfaces";
import { useCategoriasStore, useNegociosStore } from "../../hooks"
import { MainLayout } from "../layout/MainLayout"
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ModalAddCategorias, TableCategorias } from "../components/categorias";
import { ModalDeleteGeneric } from "../components";

export const CategoriasPage = () => {

    const { 
        isLoading, 
        categorias,
        startSavingCategorias, 
        startUpdateCategoria, 
        startDeleteCategoria, 
        startLoadingCategorias
     } = useCategoriasStore();

    const { negocios, startLoadingNegocios } = useNegociosStore()

    const [modify, setModify] = useState(false);   
    const [showModal, setShowModal] = useState(false);
    const [showmodalDelete, setShowmodalDelete] = useState(false);
    const [categoriaDelete, setCategoriaDelete] = useState<Categorias>()
    const [categoriMod, setCategoriaMod] = useState<Categorias>()

    useEffect(() => {
        startLoadingCategorias()
        startLoadingNegocios()
      }, [])
    
    const saveData = async ( data: Categorias) => {
        if(!modify){
            await startSavingCategorias( data )
        } else {
            await startUpdateCategoria( data )
        }

        setShowModal(false)
        startLoadingCategorias()
    }

    const deleteData = async ( data:Categorias ) => {
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
         <div className="m-5">
             { showmodalDelete && 
                    <ModalDeleteGeneric 
                        data={ categoriaDelete! }
                        onDelete={ confirmDeleteData }
                        handleCancel={ handleCancel }
                     />
            }

            { showModal && 
                <div>
                    <ModalAddCategorias 
                        modify={modify} 
                        onSaveData={ saveData } 
                        onShowModalClick={ () => setShowModal((prev) => !prev) } 
                        categoria={ categoriMod }
                        negocios={ negocios }
                    />
                 </div>
            }
            <button onClick={ () => {
                    setShowModal( (prev) => !prev )
                    setModify(false)
                    
                }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2">
                    <PlusCircleIcon className="w-5 h-5 mr-2 -ml-1"/>
                    <span>Agregar</span>
            </button>
            <div className="m-2 bg-white">
                  <div className="overflow-x-auto sm:mx-6 lg: mx-8">
                      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      
                          <div className="overflow-hidden">
                            { !isLoading && 
                                <TableCategorias 
                                    setModify={ editData } 
                                    categorias={ categorias }
                                    onDeleteData={ deleteData }
                                />
                            }
                          </div>
                      </div>
                  </div>
              </div>
         </div>
       </MainLayout>
    )
}