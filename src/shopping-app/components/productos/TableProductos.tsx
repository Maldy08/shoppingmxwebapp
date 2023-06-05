import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Productos } from "@interfaces"


type Props = {

    productos : Productos[]
    onDeleteData: (data: Productos) => Promise<void>
    setModify( data: Productos ): void;
}

export const TableProductos =( props:Props ) => {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="border-bfont-medium dark:border-neutral-500">
                <tr>
                    <th scope="col" className=" px-6 py-4 dark:border-neutral-500">#</th>
                    <th scope="col" className=" px-6 py-4 dark:border-neutral-500">DESCRIPCION</th>
                    <th scope="col" className=" px-6 py-4 dark:border-neutral-500">PRECIO</th>
                    <th scope="col" className=" px-6 py-4 dark:border-neutral-500">NEGOCIO</th>
                    <th scope="col" className=" px-6 py-4 dark:border-neutral-500">CATEGORIA</th>
                    <th scope="col" className=" px-6 py-4 dark:border-neutral-500">ACCIONES</th>
                </tr>
            </thead>

            <tbody>
                {
                    props.productos.map( ( producto,index ) => 
                        (
                            <tr key={ index } className="border-b dark:border-neutral-500">
                                <td><img src={ producto.photoUrl } className="rounded-lg h-12" alt="imagen" width={ 50 } /> </td>
                               
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">{ producto.descripcion }</td>
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">{ producto.precio }</td>
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">{ producto.id_negocio }</td>
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">{ producto.id_categoria }</td>
                                <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500">
                                    <PencilSquareIcon title="Editar producto" cursor="pointer" onClick={ () => {
                                        props.setModify( producto )
                                      //  props.onEditData( negocio )
                                    }} className="w-6 h-6 text-blue-800 inline"/>
                                    <XCircleIcon 
                                        title="Eliminar producto"
                                        cursor="pointer" 
                                        className="ml-1 w-6 h-6 text-red-800 inline"
                                         onClick={ () => {
                                            props.onDeleteData( producto )
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
// hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300