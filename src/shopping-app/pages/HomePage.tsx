import { useEffect } from "react";
import { useNegociosStore } from "../../hooks/useNegociosStore"


export const HomePage = () => {
    const {  startLoadingNegocios } =  useNegociosStore();

    useEffect(() => {

        startLoadingNegocios();
      
    }, [])
    

    return (
        <div className="container">
            <h1 className="text-center font-bold text-2xl">
                HomePage!!!
            </h1>
        </div>
    )
}