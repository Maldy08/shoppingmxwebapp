import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useCiudadesStore, useGirosStore, useNegociosStore } from "../../hooks";
import { Negocios } from "@interfaces";
import { MainLayout } from "../layout/MainLayout"
import { ModalAddNegocio, TableNegocios } from "../components/negocios"



export const NegociosPage = () => {

    const { isLoading, negocios, startLoadingNegocios, startSavingNegocios,startUpdateNegocio  } = useNegociosStore();
    const { startLoadingCiudades, ciudades } = useCiudadesStore();
    const { startLoadingGiros, giros } = useGirosStore();

    const [showModal, setShowModal] = useState(false);
    const [modify, setModify] = useState(false);   
    const [negocioMod, setNegocioMod] = useState<Negocios>()
    
    
    useEffect(() => {
      startLoadingNegocios();
      startLoadingCiudades();
      startLoadingGiros();

    
    }, [])

    const saveData = async ( data: Negocios) => {
        if(!modify){
            await startSavingNegocios( data )
        } else {
            await startUpdateNegocio( data )
        }

        setShowModal(false)
        startLoadingNegocios()
    }

    const editData =  ( data:Negocios ) => {
        setModify(true)
        setNegocioMod(data)
        setShowModal(true)
    }
    
    
    return (
        <MainLayout>
            <div className="m-5">
               
                 { showModal && <div className=""><ModalAddNegocio modify={modify} negocios={ negocioMod } onSaveData={ saveData } giros={ giros } ciudades={ ciudades } onShowModalClick={ () => setShowModal( (prev) => !prev )}/></div> }  
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
                                <TableNegocios  setModify={ editData } negocios={ negocios }  />
                                
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}