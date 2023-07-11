import { ChangeEvent, useEffect, useState } from "react";
import { useCategoriasStore, useNegociosStore, useProductosStore, usePromocionesStore } from "../../hooks"
import { ModalAddPromocion, TablePromociones } from "../components/promociones";
import { MainLayout } from "../layout/MainLayout"
import { Categorias, Productos, Promociones } from "@interfaces";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ModalDeleteGeneric } from "../components";


export const PromocionesPage = () => {
    const { isLoading: isLoadingNegocios, negocios, startLoadingNegocios } = useNegociosStore();
    const { isLoading: isLoadingProductos, productosByNegocio , startLoadingProductosByNegocio, startLoadingProductoByNegocioAndIdProducto } = useProductosStore()
    const {isLoading: isLoadingCategorias, categoriasByNegocio, startLoadingCategoriasByNegocio, startLoadingCategoriasByNegocioAndIdCategoria } = useCategoriasStore()
    const { isLoading , promociones , startLoadingPromociones ,startSavingPromociones, startDeletePromocion, startUpdatePromocion } = usePromocionesStore()
    const [promocionMod, setPromocionMod] = useState<Promociones>()
    const [promocionDelete, setPromocionDelete] =useState<Promociones>()
    const [changeNegocio, setChangeNegocio] = useState('')
    const [categoriasCargadas, setCategoriasCargadas] = useState<Categorias[]>([])  
    const[ productosCargados, setProductosCargados] = useState<Productos[]>([])


    const [modify, setModify] = useState(false);  
    const [showModal, setShowModal] = useState(false)
    const [showmodalDelete, setShowmodalDelete] = useState(false);
    const [showProductos, setShowProductos] = useState(false)
    const [showCategorias, setShowCategorias] = useState(false)
    const [showDescuento, setShowDescuento] = useState(false)  
    const [file, setFile] = useState<Blob | ArrayBuffer>()
    const [fileName, setFileName] = useState("")  
    
    useEffect(() => {
        //startLoadingProductos();\
        //startLoadingProductosByNegocio("Empresa de prueba")
        startLoadingNegocios();
        startLoadingPromociones();
       // startLoadingCategorias()
     
      }, [])

      useEffect(() => {
        startLoadingProductosByNegocio(changeNegocio)
        startLoadingCategoriasByNegocio(changeNegocio)
      }, [changeNegocio])
      

      
    const resetData = () => {
        setShowProductos(false)
        setShowCategorias(false)
        setShowDescuento(false)
        setPromocionDelete( undefined)
        setPromocionMod(undefined)
        setProductosCargados( [] )
        setCategoriasCargadas( [] )
        startLoadingPromociones()
        setFile(undefined)
        setFileName('')
        setModify(false)


    }

    const saveData = async ( data: Promociones ) => {

        const promocion: Promociones = {
            categorias: categoriasCargadas,
            productos: productosCargados,
            descripcion: data.descripcion,
            descuento: data.descuento,
            disponible: true,
            fecha_creacion: data.fecha_creacion,
            id: data.id,
            id_negocio: data.id_negocio,
            photoUrl: data.photoUrl,
            vigencia: data.vigencia,

        }

        if(!modify){
            await startSavingPromociones( promocion, file!, fileName )

        } else {

            // console.log(promocion)

            await startUpdatePromocion( promocion )
        }
        
        setShowModal(false)
        resetData()
      
    }

    
    const editData =  ( data:Promociones ) => {
        resetData()
        startLoadingProductosByNegocio( data.id_negocio )
        startLoadingCategoriasByNegocio( data.id_negocio )

        setModify(true)
        setPromocionMod(data)
        setShowModal(true)
        if(data.productos.length > 0 ) {
            data.productos.map( (prod) => {
                setProductosCargados( prev => [ ...prev, { ...prod }] )
            })
            setShowProductos(true)
        }

        if(data.categorias.length > 0 ) {
            data.categorias.map( (cat) => {
                setCategoriasCargadas( prev => [ ...prev, { ...cat}])
            })
            setShowCategorias(true)
        }

        if(data.descuento.toString() != '0') {
           setShowDescuento(true)
        }
    }

    const deleteData = async ( data:Promociones ) => {

        setPromocionDelete( data );
        setShowmodalDelete(true)
    }

    const confirmDeleteData = async ( data:Promociones ) => {
        setShowmodalDelete(false)
         await startDeletePromocion( data )
            .then( () => startLoadingPromociones() )
    }

    const handleChangeNegocio = ( e:ChangeEvent<HTMLInputElement>) => {
       // console.log(e.target.value)
        setChangeNegocio( e.target.value );
    }

    const handleChangeCategoria = (  e:ChangeEvent<HTMLInputElement> ) => {
        setCategoriasCargadas( prev => [ ...prev,{ id:'0', descripcion: e.target.value, negocioId:changeNegocio}])
        //console.log({changeCategoriasCargadas});
    }

    const handleClickAddCategoria = ( categoria:Categorias[] ) => {
        const cat = startLoadingCategoriasByNegocioAndIdCategoria( categoria );
        setCategoriasCargadas( prev => [ ...prev, { ...cat}])
        //console.log( cat.id )
    }

    const handleClickAddProducto = ( producto:Productos[] ) => {
       // console.log(producto)
        const prod = startLoadingProductoByNegocioAndIdProducto( producto )
        setProductosCargados( prev => [ ...prev, { ...prod }] )
    }

    const handleClickEliminarProducto = (  producto:Productos ) => {
        // console.log( producto )
       setProductosCargados( (prev) => prev.filter((prod) => prod !== producto ))

    }

    const handleClickEliminarCategoria = (  categoria:Categorias ) => {
        // console.log( producto )
       setCategoriasCargadas( (prev) => prev.filter((cat) => cat !== categoria ))

    }

    const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFile( e.target.files![0]);
        setFileName(e.target.files![0].name)
    }

    const handleCancel = () => setShowmodalDelete(false)

    return (
        <MainLayout>
            <div className="container mt-5">
            { showmodalDelete && 
                    <ModalDeleteGeneric 
                        data={ promocionDelete! }
                        onDelete={ confirmDeleteData }
                        handleCancel={ handleCancel }
                     />
            }
                <div>
                    {
                        showModal
                          &&
                          <ModalAddPromocion
                                onShowModalClick={ () => setShowModal( (prev) => !prev )}
                                negocios={ negocios }
                                productos={ productosByNegocio }
                                promocion={ promocionMod }
                                categorias={ categoriasByNegocio }
                                modify={ modify }
                                onSaveData={ saveData }
                                handleChangeNegocio={ handleChangeNegocio }
                                handleChangeCategoria={ handleChangeCategoria }
                                showProducts={ showProductos }
                                onShowProductsClick={ () => setShowProductos( prev => !prev )}
                                showCategorias={ showCategorias }
                                onShowCategoriasClick={ () => setShowCategorias( prev => !prev )}
                                categoriasCargadas={ categoriasCargadas }
                                handleClickAddCategoria={ handleClickAddCategoria }
                                handleClickAddProducto={ handleClickAddProducto }
                                productosCargados={ productosCargados }
                                showDescuento={ showDescuento }
                                onShowDescuentoClick={ () => setShowDescuento( prev => !prev )}
                                handleFileChange={ handleFileChange }
                                file={ file! }
                                fileName={ fileName }
                                handleClickEliminarProducto={ handleClickEliminarProducto }
                                handleClickEliminarCategoria={ handleClickEliminarCategoria }
  
                          />
                    }

                </div>

                <button onClick={ () => {
                  setShowModal( (prev) => !prev )
                  resetData()
                 
              }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2">
                  <PlusCircleIcon className="w-5 h-5 mr-2 -ml-1"/>
                  <span>Agregar</span>
              </button>

              <div className="m-2 bg-white">
                  <div className="overflow-x-auto sm:mx-6 lg: mx-8">
                      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      
                          <div className="overflow-hidden">
                            { !isLoading && !isLoadingNegocios && !isLoadingProductos && !isLoadingCategorias &&
                                <TablePromociones
                                    setModify={ editData }
                                    onDeleteData={ deleteData }
                                    promociones={ promociones }
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