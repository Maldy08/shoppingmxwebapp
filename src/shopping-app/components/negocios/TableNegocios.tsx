import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Negocios } from "@interfaces"


type Props = {

    negocios : Negocios[]
    onDeleteData: ( data: Negocios ) => Promise<void>
    setModify( data: Negocios ): void;

}

export const TableNegocios =( props:Props ) => {
    return (
        <table className="w-full text-sm text-left">
            <thead className="border-bfont-medium dark:border-neutral-500 bg-blue-700 text-white">
                <tr>
                    <th scope="col" className=" px-6 py-4 dark:border-neutral-500">#</th>
                    <th scope="col" className=" px-6 py-4 dark:border-neutral-500">NOMBRE</th>
                    <th scope="col" className=" px-6 py-4 dark:border-neutral-500">ENCARGADO</th>
                    <th scope="col" className=" px-6 py-4 dark:border-neutral-500">CORREO</th>
                    <th scope="col" className=" px-6 py-4 dark:border-neutral-500">ACCIONES</th>
                </tr>
            </thead>

            <tbody>
                {
                    props.negocios.map( ( negocio,index ) => 
                        (
                            <tr key={ index } className="border-b dark:border-neutral-500">
                                <td><img src={ negocio.photoUrl } className="rounded-lg h-12" alt="imagen" width={ 50 } /> </td>
                               
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">{ negocio.nombre_empresa }</td>
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">{ negocio.nombre_encargado }</td>
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">{ negocio.correo }</td>
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">
                                    <PencilSquareIcon title="Editar negocio" cursor="pointer" onClick={ () => {
                                        props.setModify( negocio )
                                      //  props.onEditData( negocio )
                                    }} className="w-6 h-6 text-blue-800 inline"/>
                                    <XCircleIcon 
                                        title="Eliminar negocio" 
                                        cursor="pointer" 
                                        className="ml-1 w-6 h-6 text-red-800 inline" 
                                        onClick={ () => {
                                            props.onDeleteData( negocio )
                                        }}
                                    />
                                 </td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    );

} 
// hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300