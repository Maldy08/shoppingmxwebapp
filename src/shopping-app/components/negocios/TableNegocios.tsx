import { Negocios } from "../../../interfaces"


type Props = {
    negocios : Negocios[]
}

export const TableNegocios =( props:Props ) => {
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                </tr>
            </thead>

            <tbody>
                {
                    props.negocios.map( ( negocio,index ) => 
                        (
                            <tr key={ index }>
                                <td>{ negocio.id }</td>
                                <td>{ negocio.nombreEmpresa }</td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    );

}