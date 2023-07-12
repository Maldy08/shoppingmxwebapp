

import { ChangeEvent } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from 'yup';
import { Categorias, Negocios, Productos } from "@interfaces";
import CurrencyInput from "./CurrencyInput";

const initialValues: Productos = {
    id:'0',
    id_negocio: '',
    id_categoria: '',
    descripcion: '',
    precio: 0,
    photoUrl: '',
}

type Props = {

    onShowModalClick():void
    onSaveData: (data: Productos) => Promise<void>
    modify:boolean
    producto?: Productos
    negocios : Negocios[]
    categorias:Categorias[]
    file: Blob | ArrayBuffer, 
    fileName: string
    handleFileChange(e :ChangeEvent<HTMLInputElement>): void
    handleChangeNegocio(e :ChangeEvent<HTMLInputElement>) :void
}


export const ModalAddProducto = ( props: Props ) => {
    return (
     <>
        <div tabIndex={-1}  aria-hidden="true" className="w-full justify-center items-center flex overflow-x-hidden 
            overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" relative w-full max-w-lg max-h-full">
            {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t bg-indigo-700 text-zinc-50">
                        <h3 className="text-1xl font-semibold">
                            
                          { props.modify? 'Modificar producto' : 'Agregar producto'}
                        </h3>
                    </div>
                    {/*body*/}    
                    <div className="relative p-6 flex-auto">
                    <Formik
                            
                            initialValues={ props.modify? props.producto! : initialValues }
                            onSubmit={ ( values: Productos ) => {

                                props.onSaveData( values )
                            }}

                            validationSchema={
                                Yup.object({
                                    // id_negocio: Yup.string().required('* Campo requerido'),
                                     descripcion: Yup.string().required('* Campo requerido'),
                                     precio: Yup.number().transform( (value) => (isNaN(value) || value === null || value === undefined )? 0:value )
                                     .required("* No puede ser un valor en 0"),
                                     id_negocio: Yup.string().notOneOf(['Selecciona un negocio']).required('* Selecciona una opcion')                                  

                                })
                            }

                         >
                            {
                                ({ handleChange, setFieldValue }) => (
                                    <Form className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="">
                                                <label htmlFor="id_negocio" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Negocio
                                                </label>
                                                <div className="mt-2">
                                                    <Field
                                                        name="id_negocio"
                                                        as="select"
                                                        onChange= { (e:ChangeEvent<HTMLInputElement>) => {
                                                            props.handleChangeNegocio(e)
                                                            setFieldValue('id_negocio',e.target.value)
                                                        } }
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                                         placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                    > 
                                                    <option disabled value="">(Selecciona un negocio)</option>

                                                        {
                                                        
                                                        props.negocios.map(({ id, nombre_empresa}) => (
                                                            <option key={ id } value={ nombre_empresa }>{ nombre_empresa } </option>
                                                            ))
                                                        }
                                                    </Field>
                                                    <ErrorMessage name="id_negocio" component="span" className="block text-xs font-medium  text-red-500"/>
                                                        
                                                </div>
                                            </div>

                                            <div className="">
                                                <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Descripcion Producto
                                                </label>
                                                <div className="mt-2">
                                                    <Field
                                                        name="descripcion"
                                                        as="textarea"
                                                        rows="3"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                                         sm:text-sm sm:leading-6"

                                                    />
                                                    <ErrorMessage name="descripcion" component="span" className="block text-xs font-medium  text-red-500" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="">
                                                    <label htmlFor="precio" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Precio
                                                    </label>
                                                    <div className="mt-2">
                                                        <Field name="precio">
                                                            {
                                                                ({ field  }: any) => <CurrencyInput
                                                                    { ...field }
                                                                    type="text"
                                                                    id="precio"
                                                                    onChange={ handleChange }
                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                                                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                                         focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    />
                                                            }
                                                        </Field>
                                                        <ErrorMessage name="precio" component="span" className="block text-xs font-medium text-red-500" />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <label htmlFor="categoria" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Categoria
                                                    </label>
                                                    <div className="mt-2">
                                                        <Field
                                                            name="id_categoria"
                                                            as="select"
                                                            onChange={handleChange}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                                                 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                                 focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                        > 
                                                        <option disabled value="">(Selecciona una categoria)</option>
                                                            {
                                                            
                                                            props.categorias.map(({ id, descripcion}) => (
                                                                <option key={ id } value={ descripcion }>{ descripcion } </option>
                                                                ))
                                                            }
                                                        </Field>
                                                        <ErrorMessage name="id_categoria" component="span" className="block text-xs font-medium text-red-500"/>
                                                        
                                                    </div>
                                                </div>
      
                                        </div>
                                        <div className="grid grid-cols-1 gap-4">
                                               <div>
                                                    <label htmlFor="imagen" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Imagen 
                                                    </label>
                                                    <div className="mt-2">
                                                        {
                                                            props.modify || props.producto?.photoUrl == ''
                                                            ?                                          
                                                            <img 
                                                                src={props.producto?.photoUrl} alt="photo"
                                                                className="rounded-lg h-20"

                                                            />
                                                            :
                                                            <input type="file" name="imagen" id="imagen"accept="image/*"
                                                            className="block w-full cursor-pointer p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                                                                 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                                 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            onChange={ (e :ChangeEvent<HTMLInputElement>) => {
                                                            props.handleFileChange(e)
                                                            props.fileName = e.target.files![0].name;
                                                        }}
                                                        />
                                                        }
                                                    </div>
                                                </div>

                                        </div>



                                             <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                className="uppercase text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none
                                                 focus:ring-red-300 font-medium rounded-lg 
                                                text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700
                                                 dark:focus:ring-red-800 ml-2"
                                                    type="button"
                                                    onClick={ props.onShowModalClick }
                                                >
                                                    Cerrar
                                                </button>
                                                <button
                                                    className="uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                                                     focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center
                                                     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
                                                    type="submit"
                                                >
                                                    { props.modify ? 'Modificar' : 'Guardar' }
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
    );
}