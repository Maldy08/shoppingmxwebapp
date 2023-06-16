import { ChangeEvent, useEffect, useState } from "react";
import { useCategoriasStore, useNegociosStore, useProductosStore, usePromocionesStore } from "../../hooks"
import { ModalAddPromocion } from "../components/promociones";
import { MainLayout } from "../layout/MainLayout"
import { Categorias, Productos, Promociones } from "@interfaces";


export const PromocionesPage = () => {
    const { isLoading: isLoadingNegocios, negocios, startLoadingNegocios } = useNegociosStore();
    const { isLoading: isLoadingProductos, productosByNegocio , startLoadingProductosByNegocio, startLoadingProductoByNegocioAndIdProducto } = useProductosStore()
    const {isLoading: isLoadingCategorias, categoriasByNegocio, startLoadingCategoriasByNegocio, startLoadingCategoriasByNegocioAndIdCategoria } = useCategoriasStore()
    const { startSavingPromociones } = usePromocionesStore()
    const [promocionMod, setPromocionMod] = useState<Promociones>()
    const [changeNegocio, setChangeNegocio] = useState('')
    const [categoriasCargadas, setCategoriasCargadas] = useState<Categorias[]>([])  
    const[ productosCargados, setProductosCargados] = useState<Productos[]>([])

    const [showProductos, setShowProductos] = useState(false)
    const [showCategorias, setShowCategorias] = useState(false)
    const [showDescuento, setShowDescuento] = useState(false)    
 //   const categoriasCargadas: Categorias[] = [];

    
    useEffect(() => {
        //startLoadingProductos();\
        //startLoadingProductosByNegocio("Empresa de prueba")
        startLoadingNegocios();
       // startLoadingCategorias()
     
      }, [])

      useEffect(() => {
        startLoadingProductosByNegocio(changeNegocio)
        startLoadingCategoriasByNegocio(changeNegocio)
      }, [changeNegocio])
      

    const saveData = async ( data: Promociones ) => {

        const promocion: Promociones = {
            categorias: categoriasCargadas,
            productos: productosCargados,
            descripcion: data.descripcion,
            descuento: data.descuento,
            disponible: data.disponible,
            fecha_creacion: data.fecha_creacion,
            id: '0',
            id_negocio: data.id_negocio,
            photoUrl: '',
            vigencia: data.vigencia

        }

        await startSavingPromociones( promocion )
        
        //  productosCargados.length > 0 &&
        //     productosCargados.map( (productoCargado ) => (
        //          console.log( productoCargado )
        //     )
              
        //     )
         console.log( promocion )
    }

    
    const editData =  ( data:Promociones ) => {
        setPromocionMod(data)
        console.log(data)
    }

    const handleChangeNegocio = ( e:ChangeEvent<HTMLInputElement>) => {
       // console.log(e.target.value)
        setChangeNegocio( e.target.value );
    }

    const handleChangeCategoria = (  e:ChangeEvent<HTMLInputElement> ) => {
       // setChangeCategoria( e.target.value );
       // categoriasCargadas.push({descripcion:e.target.value,id:'',negocioId:changeNegocio})
        setCategoriasCargadas( prev => [ ...prev,{ id:'0', descripcion: e.target.value, negocioId:changeNegocio}])
        //console.log({changeCategoriasCargadas});
    }

    const handleClickAddCategoria = ( categoria:string ) => {
        const cat = startLoadingCategoriasByNegocioAndIdCategoria( categoria );
        setCategoriasCargadas( prev => [ ...prev,{ id:cat.id, descripcion: categoria, negocioId:changeNegocio}])
        //console.log( cat.id )
    }

    const handleClickAddProducto = ( producto:Productos[] ) => {
       // console.log(producto)
        const prod = startLoadingProductoByNegocioAndIdProducto( producto )
        setProductosCargados( prev => [ ...prev, { ...prod }] )
    }


    return (
        <MainLayout>
            <div className="container mt-5">
                <div>
                    {
                        !isLoadingNegocios && !isLoadingProductos && !isLoadingCategorias
                          &&
                          <ModalAddPromocion
                                negocios={ negocios }
                                productos={ productosByNegocio }
                                promocion={ promocionMod }
                                categorias={ categoriasByNegocio }
                                modify={ false }
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
  
                          />
                    }

                </div>
            </div>
        </MainLayout>
    )
}