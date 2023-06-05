import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Categorias } from "@interfaces";


type Props = {

    categorias : Categorias[]
    onDeleteData: (data: Categorias) => Promise<void>
    setModify( data: Categorias ): void;
}


export const TableCategorias = ( { categorias, onDeleteData, setModify }: Props) => {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="border-bfont-medium dark:border-neutral-500">
                <tr>
                    <th scope="col" className=" px-6 py-4 dark:border-neutral-500">ID</th>
                    <th scope="col" className=" px-6 py-4 dark:border-neutral-500">NEGOCIO</th>
                    <th scope="col" className=" px-6 py-4 dark:border-neutral-500">DESCRIPCION</th>
                    <th scope="col" className=" px-6 py-4 dark:border-neutral-500">ACCIONES</th>
                </tr>
            </thead>

            <tbody>
                {
                    categorias.map( ( categoria ,index ) => 
                        (
                            <tr key={ index } className="border-b dark:border-neutral-500">
                               
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">{ categoria.id }</td>
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">{ categoria.negocioId }</td>
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">{ categoria.descripcion }</td>
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">
                                    <PencilSquareIcon title="Editar categoria" cursor="pointer" onClick={ () => {
                                        setModify( categoria )
                                      //  props.onEditData( negocio )
                                    }} className="w-6 h-6 text-blue-800 inline"/>
                                    <XCircleIcon 
                                        title="Eliminar categoria"
                                        cursor="pointer" 
                                        className="ml-1 w-6 h-6 text-red-800 inline"
                                         onClick={ () => {
                                            onDeleteData( categoria )
                                         }}/>
                                 </td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    );
}