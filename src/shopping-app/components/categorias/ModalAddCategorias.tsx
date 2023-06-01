import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from 'yup';
import { Categorias } from "@interfaces"

const initialValues: Categorias = {
    id:'0',
    descripcion: ''
}

type Props = {

    onShowModalClick():void
    onSaveData: (data: Categorias) => Promise<void>
    modify:boolean
    categoria?: Categorias

}



export const ModalAddCategorias = ({ modify, onSaveData, onShowModalClick, categoria } : Props) => {
    return (
        <>
        <div tabIndex={-1}  aria-hidden="true" className="w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" relative w-full max-w-lg max-h-full">
            {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-1xl font-semibold">
                            
                          { modify? 'Modificar producto' : 'Agregar producto'}
                        </h3>
                    </div>
                    {/*body*/}    
                    <div className="relative p-6 flex-auto">
                    <Formik
                            
                            initialValues={ modify? categoria! : initialValues }
                            onSubmit={ ( values: Categorias ) => {

                                onSaveData( values )
                            }}

                            validationSchema={
                                Yup.object({
                                    // id_negocio: Yup.string().required('* Campo requerido'),
                                     descripcion: Yup.string().required('* Campo requerido'),
                                })
                            }

                         >
                            {
                                ({  }) => (
                                    <Form className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">

                                            <div className="">
                                                <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Descripcion Producto
                                                </label>
                                                <div className="mt-2">
                                                    <Field
                                                        name="descripcion"
                                                        type="text"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                    />
                                                    <ErrorMessage name="descripcion" component="span" className="block text-xs font-medium  text-red-500" />
                                                </div>
                                            </div>
                                        </div>


                                             <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                className="uppercase text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-2"
                                                    type="button"
                                                    onClick={ onShowModalClick }
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
                    {/*footer*/}

                </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}