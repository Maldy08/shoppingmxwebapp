import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Promociones } from "@interfaces";

type Props = {

    promociones : Promociones[]
    onDeleteData: ( data: Promociones ) => Promise<void>
    setModify( data: Promociones ): void;

}

export const TablePromociones = ( { promociones, onDeleteData, setModify }: Props ) => {

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
                    promociones.map( ( promocion,index ) => 
                        (
                            <tr key={ index } className="border-b dark:border-neutral-500">
                                <td><img src={ promocion.photoUrl } className="rounded-lg h-12" alt="imagen" width={ 50 } /> </td>
                               
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">{ promocion.id_negocio }</td>
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">{ promocion.fecha_creacion.toDateString() }</td>
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">{ promocion.vigencia.toDateString() }</td>
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">
                                    <PencilSquareIcon title="Editar negocio" cursor="pointer" onClick={ () => {
                                        setModify( promocion )
                                      //  props.onEditData( negocio )
                                    }} className="w-6 h-6 text-blue-800 inline"/>
                                    <XCircleIcon 
                                        title="Eliminar promocion" 
                                        cursor="pointer" 
                                        className="ml-1 w-6 h-6 text-red-800 inline" 
                                        onClick={ () => {
                                            onDeleteData( promocion )
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