

import { FormAddNegocio } from ".";
import { Ciudades, Giros } from "@interfaces";

type Props = {

    onShowModalClick():void
    giros: Giros[]
    ciudades: Ciudades[]
}

export const ModalAddNegocio = ( props: Props ) => {
    return (
     <>
        <div className="w-fulljustify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full max-w-md max-h-full">
            {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-2xl font-semibold">
                            Agregar Negocio
                        </h3>
                    </div>
                    {/*body*/}    
                    <div className="relative p-6 flex-auto">
                        <FormAddNegocio giros={props.giros} ciudades={props.ciudades}   />
                    </div>      
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={ props.onShowModalClick }
                        >
                            Cerrar
                        </button>
                        <button
                            className="uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
                            type="button"
                        >
                            Guardar
                        </button>
                        </div>
                    </div>
            </div>
        </div>
     </>
    );
}