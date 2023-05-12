import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';

import logo from "../../assets/app-logo.png"



export const RegisterPage = () => {




    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto w-auto"
                        src={ logo }
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Registro
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-md p-5">
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            nombreEncargado:'',
                            nombreNegocio:''
                        }}

                        onSubmit={
                            () => {}
                        }

                        validationSchema={
                            Yup.object({
                                email: Yup.string().required('Campo requerido').email("Formato de correo invalido"),
                                password: Yup.string().required('Campo requerido'),
                                nombreEncargado: Yup.string().required('Campo requerido'),
                                nombreNegocio: Yup.string().required('Campo requerido')
                            })
                        }
                    >
                        {
                            () => (
                                <Form className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <Field
                                                name="email"
                                                type="text"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <ErrorMessage name="email" component="span" className="block text-xs font-medium"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                            </label>
  
                                        </div>
                                        <div className="mt-2">
                                            <Field
                                                name="password"
                                                type="password"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <ErrorMessage name="password" component="span" className="block text-xs font-medium" />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label htmlFor="nombreEncargado" className="block text-sm font-medium leading-6 text-gray-900">
                                            Nombre encargado
                                            </label>
  
                                        </div>

                                        <div className="mt-2">
                                            <Field
                                                name="nombreEncargado"
                                                type="text"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label htmlFor="nombreNegocio" className="block text-sm font-medium leading-6 text-gray-900">
                                            Nombre negocio
                                            </label>
  
                                        </div>

                                        <div className="mt-2">
                                            <Field
                                                name="nombreNegocio"
                                                type="text"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                               
                                                className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                               Registrar
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }

                    </Formik>
             
                </div>
        </div>
    )
}