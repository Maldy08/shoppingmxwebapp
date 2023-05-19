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
            <div className="m-2 bg-white">
                <div className="overflow-x-auto sm:mx-6 lg: mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                        { !isLoading && 
                            <TableNegocios negocios={ negocios } />
                            
                            }
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}