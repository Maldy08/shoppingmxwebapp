import { useEffect } from "react";
import { useNegociosStore } from "../../hooks"
import { TableNegocios } from "../components/negocios"
import { MainLayout } from "../layout/MainLayout"



export const NegociosPage = () => {

    const { isLoading, negocios, startLoadingNegocios } = useNegociosStore();

    useEffect(() => {
      startLoadingNegocios()
    
    }, [])
    
    
    return (
        <MainLayout>
            <div className="container mt-5">
                <h1 className="text-center font-bold text-2xl">
                    Pagina de Registro de Negocios
                </h1>
                { !isLoading && 
                  <TableNegocios negocios={ negocios } />
                }
            </div>
        </MainLayout>
    )
}