import { ChangeEvent, useEffect, useState } from "react";
import { useNegociosStore, useProductosStore, usePromocionesStore } from "../../hooks"
import { ModalAddPromocion } from "../components/promociones";
import { MainLayout } from "../layout/MainLayout"
import { Promociones } from "@interfaces";


export const PromocionesPage = () => {
    const { isLoading: isLoadingNegocios, negocios, startLoadingNegocios } = useNegociosStore();
    const { isLoading: isLoadingProductos, productos, productosByNegocio , startLoadingProductos, startLoadingProductosByNegocio } = useProductosStore()
    const {  } = usePromocionesStore()
    const [promocionMod, setPromocionMod] = useState<Promociones>()
    const [changeNegocio, setChangeNegocio] = useState('')
    
    useEffect(() => {
        //startLoadingProductos();\
        //startLoadingProductosByNegocio("Empresa de prueba")
        startLoadingNegocios();
     
      }, [])

      useEffect(() => {
        startLoadingProductosByNegocio(changeNegocio)
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

    return (
        <MainLayout>
            <div className="container mt-5">
                <div>
                    {
                        !isLoadingNegocios && !isLoadingProductos
                          &&
                          <ModalAddPromocion
                                negocios={ negocios }
                                productos={ productosByNegocio }
                                promocion={ promocionMod }
                                modify={false}
                                onSaveData={ saveData}
                                handleChangeNegocio={ handleChangeNegocio }
  
                          />
                    }

                </div>
            </div>
        </MainLayout>
    )
}