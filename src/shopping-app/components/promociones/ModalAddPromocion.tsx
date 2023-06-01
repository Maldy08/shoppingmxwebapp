import { Negocios, Productos, Promociones } from "@interfaces"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { ChangeEvent } from "react"

const initialValues: Promociones = {
    id:'0',
    id_negocio: '',
    descuento:0,
    disponibilidad:0,
    fecha_creacion: new Date(),
    photoUrl:'',
    productos:[],
    vigencia: new Date()
}

type Props = {
    // onShowModalClick():void
    onSaveData: (data: Promociones) => Promise<void>
    modify:boolean
    promocion?: Promociones
    productos : Productos[]
    negocios: Negocios[]
    handleChangeNegocio(e :ChangeEvent<HTMLInputElement>) :void
    // file: Blob | ArrayBuffer, 
    // fileName: string
    // handleFileChange(e :ChangeEvent<HTMLInputElement>):void
}

export const ModalAddPromocion = (
    {
        //  onShowModalClick,
         onSaveData,
         modify,
         promocion,
         productos,
         negocios,
         handleChangeNegocio
        // file,
        // fileName,
        // handleFileChange
    }: Props
) => {

    return (
        <>
             <div tabIndex={-1}  aria-hidden="true" className="w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className=" relative w-full max-w-lg max-h-full">
                {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none">
                      {/*header*/}
                        <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-1xl font-semibold">
                            { modify? 'Modificar promocion' : 'Agregar promocion'}
                            </h3>
                        </div>
                        <div className="relative p-6 flex-auto">
                            <Formik
                                initialValues={ modify? promocion! : initialValues }
                                onSubmit={ ( values : Promociones )=> {
                                    onSaveData( values )
                                }}
                           

                            >
                             {
                                ({ setFieldValue  }) => (
                                    <Form className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="">
                                                <label htmlFor="id_negocio" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Negocio
                                                </label>
                                                <div className="mt-2">
                                                    <Field
                                                        name="id_negocio"
                                                        as="select"
                                                        onChange= { (e:ChangeEvent<HTMLInputElement>) => {
                                                            handleChangeNegocio(e)
                                                            setFieldValue('id_negocio',e.target.value)
                                                        } }
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                    > 
                                                    <option disabled value="">(Selecciona un negocio)</option>

                                                        {
                                                        
                                                           negocios.map(({ id,nombre_empresa }) => (
                                                            <option key={ id } value={ nombre_empresa }>{ nombre_empresa } </option>
                                                            ))
                                                        }
                                                    </Field>
                                                    <ErrorMessage name="id_negocio" component="span" className="block text-xs font-medium  text-red-500"/>
                                                        
                                                </div>
                                            </div>

                                             <div className="">
                                                <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Producto
                                                </label>
                                                <div className="mt-2">
                                                    <Field
                                                            name="productos"
                                                            as="select"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                           
                                                        > 
                                                        <option disabled value="">(Selecciona un producto)</option>

                                                            {
                                                            
                                                            productos.map(({ id,descripcion }) => (
                                                                <option key={ id } value={ id }>{ descripcion } </option>
                                                                ))
                                                            }
                                                        </Field>
                                                    <ErrorMessage name="productos" component="span" className="block text-xs font-medium  text-red-500" />
                                                </div>
                                            </div> 
                                        </div>

                                        {/* <div className="grid grid-cols-2 gap-4">
                                            <div className="">
                                                    <label htmlFor="descuento" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Descuento
                                                    </label>
                                                    <div className="mt-2">
                                                    <Field 
                                                        name="descuento"
                                                        type="number"
                                                    />

                                                        <ErrorMessage name="descuento" component="span" className="block text-xs font-medium  text-red-500" />
                                                    </div>
                                                </div>

                                        </div> */}



                                             <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                className="uppercase text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-2"
                                                    type="button"
                                                   // onClick={ onShowModalClick }
                                                >
                                                    Cerrar
                                                </button>
                                                <button
                                                    className="uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
                                                    type="submit"
                                                >
                                                    { modify ? 'Modificar' : 'Guardar' }
                                                </button>
                                            </div>
                                    </Form>
                                )
                            }
                            </Formik>
                        </div>
                    </div>
                </div>
             </div>
        </>
    );

}