

import { ChangeEvent } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import MaskedInput from "react-text-mask";
import * as Yup from 'yup';
import { Ciudades, Giros, Negocios } from "@interfaces";

const initialValues: Negocios = {
    id:'0',
    nombre_empresa:'',
    nombre_encargado:'',
    giro_empresa:'',
    horario:'',
    numero_empleados:0,
    pais:'México',
    estado:'Baja California',
    ciudad:'Mexicali',
    correo:'',
    telefono:'',
    direccion:'',
    photoUrl:''
}

const phoneNumberMask = [ "(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/ ];
type Props = {

    onShowModalClick():void
    giros: Giros[]
    ciudades: Ciudades[]
    onSaveData: (data: Negocios) => Promise<void>
    modify:boolean
    negocios?: Negocios
    file: Blob | ArrayBuffer, 
    fileName: string
    handleFileChange(e :ChangeEvent<HTMLInputElement>):void
}


export const ModalAddNegocio = ( props: Props ) => {
    return (
     <>
        <div tabIndex={-1}  aria-hidden="true" className="w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" relative w-full max-w-lg max-h-full">
            {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t bg-indigo-700 text-zinc-50">
                        <h3 className="text-1xl font-semibold">
                            
                          { props.modify? 'Modificar negocio' : 'Agregar negocio'}
                        </h3>
                    </div>
                    {/*body*/}    
                    <div className="relative p-6 flex-auto">
                    <Formik
                            
                            initialValues={ props.modify? props.negocios! : initialValues }
                            onSubmit={ ( values: Negocios ) => {

                                props.onSaveData( values )
                            }}

                            validationSchema={
                                Yup.object({
                                    nombre_empresa: Yup.string().required('* Campo requerido'),
                                    nombre_encargado: Yup.string().required('* Campo requerido'),
                                    giro_empresa:Yup.string().required('* Campo requerido'),
                                    horario:Yup.string().required('* Campo requerido'),
                                    numero_empleados:Yup.number()
                                    .integer()
                                    .not([0],'* No puede ser un valor 0'),

                                    pais:Yup.string().required('* Campo requerido'),
                                    estado:Yup.string().required('* Campo requerido'),
                                    ciudad:Yup.string().required('* Campo requerido'),
                                    correo: Yup.string().required('* Campo requerido').email("* Formato de correo invalido"),
                                    telefono:Yup.string().required('* Campo requerido'),
                                    direccion:Yup.string().required('* Campo requerido'),
                                })
                            }

                         >
                            {
                                ({ handleChange }) => (
                                    <Form className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="">
                                                <label htmlFor="nombre_empresa" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Nombre de la Empresa
                                                </label>
                                                <div className="mt-2">
                                                    <Field
                                                        name="nombre_empresa"
                                                        type="text"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                    />
                                                    <ErrorMessage name="nombre_empresa" component="span" className="block text-xs font-medium text-red-500" />
                                                </div>
                                            </div>

                                            <div className="">
                                                <label htmlFor="nombre_encargado" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Nombre del Encargado
                                                </label>
                                                <div className="mt-2">
                                                    <Field
                                                        name="nombre_encargado"
                                                        type="text"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                    />
                                                    <ErrorMessage name="nombre_encargado" component="span" className="block text-xs font-medium  text-red-500" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="giro_empresa" className="block text-sm font-medium leading-6 text-gray-900">
                                                Giro comercial
                                                </label>
                                                <div className="mt-2">
                                                    <Field
                                                        name="giro_empresa"
                                                        as="select"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                    > 
                                                        {
                                                        props.giros.map(({ id, giro}) => (
                                                            <option key={ id } value={ giro }>{ giro} </option>
                                                            ))
                                                        }
                                                    </Field>
                                                    <ErrorMessage name="giro_empresa" component="span" className="block text-xs font-medium  text-red-500"/>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <label htmlFor="horario" className="block text-sm font-medium leading-6 text-gray-900">
                                                Horario
                                                </label>
                                                <div className="mt-2">
                                                    <Field
                                                        name="horario"
                                                        type="text"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                    />
                                                    <ErrorMessage name="horario" component="span" className="block text-xs font-medium  text-red-500"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="numero_empleados" className="block text-sm font-medium leading-6 text-gray-900">
                                                Numero de empleados
                                                </label>
                                                <div className="mt-2">
                                                    <Field
                                                        name="numero_empleados"
                                                        type="number"
                                                        className=" w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                    />
                                                    <ErrorMessage name="numero_empleados" component="span" className="block text-xs font-medium  text-red-500"/>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="ciudad" className="block text-sm font-medium leading-6 text-gray-900">
                                                Ciudad
                                                </label>
                                                <div className="mt-2">
                                                    <Field
                                                        name="ciudad"
                                                        as="select"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                    > 
                                                        {
                                                        props.ciudades.map(({ id, ciudad}) => (
                                                            <option key={ id } value={ ciudad }>{ ciudad } </option>
                                                            ))
                                                        }
                                                    </Field>
                                                    <ErrorMessage name="ciudad" component="span" className="block text-xs font-medium  text-red-500"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="correo" className="block text-sm font-medium leading-6 text-gray-900">
                                                Correo 
                                                </label>
                                                <div className="mt-2">
                                                    
                                                    <Field
                                                        name="correo"
                                                        type="text"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                    /> 
                                                    <ErrorMessage name="correo" component="span" className="block text-xs font-medium  text-red-500"/>
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-900">
                                                Telefono 
                                                </label>
                                                <div className="mt-2">
                                                    <Field name="telefono">
                                                        {
                                                            ({ field  }: any) => <MaskedInput
                                                                { ...field }
                                                                type="text"
                                                                id="telefono"
                                                                onChange={ handleChange }
                                                                mask={ phoneNumberMask }
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                />
                                                        }
                                                    </Field>
                                                    <ErrorMessage name="telefono" component="span" className="block text-xs font-medium  text-red-500"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-gray-900">
                                            Dirección 
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    name="direccion"
                                                    type="text"

                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                /> 
                                                <ErrorMessage name="direccion" component="span" className="block text-xs font-medium  text-red-500"/>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="imagen" className="block text-sm font-medium leading-6 text-gray-900">
                                            Imagen 
                                            </label>
                                            <div className="mt-2">
                                                {
                                                    props.modify || props.negocios?.photoUrl == ''
                                                    ?                                          
                                                     <img 
                                                        src={props.negocios?.photoUrl} alt="photo"
                                                        className="rounded-lg h-20"

                                                      />
                                                    :
                                                    <input type="file" name="imagen" id="imagen"accept="image/*"
                                                    className="block w-full cursor-pointer p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={ (e :ChangeEvent<HTMLInputElement>) => {
                                                       props.handleFileChange(e)
                                                       props.fileName = e.target.files![0].name;
                                                   }}
                                                   />
                                                }
                                            </div>
                                        </div>
                                             <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                <button
                                                className="uppercase text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-2"
                                                    type="button"
                                                    onClick={ props.onShowModalClick }
                                                >
                                                    Cerrar
                                                </button>
                                                <button
                                                    className="uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"
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