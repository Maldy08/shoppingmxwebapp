import { ChangeEvent, useEffect, useState } from "react";
import { useCategoriasStore, useNegociosStore, useProductosStore, usePromocionesStore } from "../../hooks"
import { ModalAddPromocion } from "../components/promociones";
import { MainLayout } from "../layout/MainLayout"
import { Categorias, Promociones } from "@interfaces";


export const PromocionesPage = () => {
    const { isLoading: isLoadingNegocios, negocios, startLoadingNegocios } = useNegociosStore();
    const { isLoading: isLoadingProductos, productosByNegocio , startLoadingProductosByNegocio } = useProductosStore()
    const {isLoading: isLoadingCategorias, categoriasByNegocio, startLoadingCategoriasByNegocio } = useCategoriasStore()
    const {  } = usePromocionesStore()
    const [promocionMod, setPromocionMod] = useState<Promociones>()
    const [changeNegocio, setChangeNegocio] = useState('')
    const [changeCategoriasCargadas, setChangeCategoriasCargadas] = useState<Categorias[]>([])  

    const [showProductos, setShowProductos] = useState(false)
    const [showCategorias, setShowCategorias] = useState(false)    
    const categoriasCargadas: Categorias[] = [];

    
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
         console.log( data )
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
        categoriasCargadas.push({descripcion:e.target.value,id:'',negocioId:changeNegocio})
        setChangeCategoriasCargadas( prev => [ ...prev,{ id:'0', descripcion: e.target.value, negocioId:changeNegocio}])
        console.log({changeCategoriasCargadas});
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
  
                          />
                    }

                </div>
            </div>
        </MainLayout>
    )
}