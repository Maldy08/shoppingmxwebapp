import { ChangeEvent, useEffect, useState } from "react";
import { MainLayout } from "../layout/MainLayout"
import { Productos } from "@interfaces";
import { useNegociosStore, useProductosStore } from '../../hooks';
import { ModalAddProducto, TableProductos } from "../components/productos";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ModalDeleteGeneric } from "../components";


export const ProductosPage = () => {


const {  negocios, startLoadingNegocios } = useNegociosStore();
const { startLoadingProductos , startSavingProductos, productos, isLoading, startUpdateProducto, startDeleteProducto } = useProductosStore();
const [showModal, setShowModal] = useState(false);
const [modify, setModify] = useState(false);   
const [showmodalDelete, setShowmodalDelete] = useState(false);
const [productoMod, setProductoMod] = useState<Productos>()
const [productoDelete, setProductoDelete] =useState<Productos>()
const [file, setFile] = useState<Blob | ArrayBuffer>()
const [fileName, setFileName] = useState("")


    
useEffect(() => {
    startLoadingProductos();
    startLoadingNegocios();
 
  }, [])

  const saveData = async ( data: Productos) => {
    if(!modify){
        await startSavingProductos( data,file!,fileName )
       console.log( data );
    } else {
        await startUpdateProducto( data )
    }

    setShowModal(false)
    startLoadingProductos()
}

const deleteData = async ( data:Productos) => {

    setProductoDelete( data );
    setShowmodalDelete(true)
}

const confirmDeleteData = async ( data:Productos ) => {
    setShowmodalDelete(false)
     await startDeleteProducto( data )
        .then( () => startLoadingProductos() )
}

const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {

    setFile( e.target.files![0]);
    setFileName(e.target.files![0].name)

}

const editData =  ( data:Productos ) => {
    setModify(true)
    setProductoMod(data)
    setShowModal(true)
}

const handleCancel = () => setShowmodalDelete(false)

    return (
        <MainLayout>
            <div className="m-5">
            { showmodalDelete && 
                    // <ModalDelete 
                    //   negocio={ negocioDelete!}
                    //   onDelete={ confirmDeleteData} 
                    //   handleCancel={ handleCancel }
                    
                    // />
                    <ModalDeleteGeneric 
                        data={ productoDelete! }
                        onDelete={ confirmDeleteData }
                        handleCancel={ handleCancel }
                     />
                }
               
               { showModal && <div className=""><ModalAddProducto handleFileChange={handleFileChange} fileName={fileName} file={file!} modify={modify} negocios={negocios} onSaveData={saveData} onShowModalClick={() => setShowModal((prev) => !prev)} producto={ productoMod }/></div> }  
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
                              <TableProductos  
                                setModify={ editData } 
                                productos={ productos }
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