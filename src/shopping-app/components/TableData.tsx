export type Columns = {
    key:string
    header:string
}

export type Rows<T> = {
    key:string
    data:T
}

type Props<T> = {
    columns: Columns[]
    data: Rows<T>[]
    onDeleteData: ( data: T ) => Promise<void>
    setModify( data: T ): void;

}

export const TableData = <T extends object>( { columns, data }: Props<T> ) => {

    return (
        <table className="w-full text-sm text-left">
            <thead className="border-bfont-medium dark:border-neutral-500 bg-blue-700 text-white">
                <tr>
                    {
                        columns.map( ( { key, header }) => (
                            <th key={ key } scope="col" className=" px-6 py-4 dark:border-neutral-500">{ header }</th>
                        )) 
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map( ({ key,data }) => (
                        <tr key={ key } className="border-b dark:border-neutral-500">
                             <td className="whitespace-nowrap  px-6 py-4 dark:border-neutral-500"> {  }</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )

}