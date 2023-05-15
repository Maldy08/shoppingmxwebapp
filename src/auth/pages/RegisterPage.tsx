import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';

import logo from "../../assets/app-logo.png"
import { useAuthStore } from "../../hooks";
// import { useCiudadesStore, useGirosStore } from "../../hooks";
// import { useEffect } from "react";



export const RegisterPage = () => {


    const { startRegisterWithEmailPassword } = useAuthStore();

    // const { startLoadingCiudades, isLoading:isLoadingCiudad, ciudades } = useCiudadesStore();
    // const { startLoadingGiros, giros, isLoading:isLoadingGiros } = useGirosStore();

    // useEffect(() => {
    //     startLoadingCiudades();
      
    // }, [])
    
    // useEffect(() => {
    //     startLoadingGiros();
      
    // }, [])
    

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

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md  p-5">
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            nombre:'',
            
                        }}

                        onSubmit={
                            async ({ email, password, nombre,}, { setSubmitting }) =>  {
                                setSubmitting(true);
                                await startRegisterWithEmailPassword( email, password, nombre).then( () => {
                                    setSubmitting(false);
                                });
                            

                            }
                        }

                        validationSchema={
                            Yup.object({
                                email: Yup.string().required('Campo requerido').email("Formato de correo invalido"),
                                password: Yup.string().required('Campo requerido'),
                                nombre: Yup.string().required('Campo requerido'),
  
                                
                            })
                        }
                    >
                        {
                            ({ isSubmitting }) => (
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
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                                            Nombre
                                            </label>
  
                                        </div>
                                        <div className="mt-2">
                                            <Field
                                                name="nombre"
                                                type="text"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <ErrorMessage name="nombre" component="span" className="block text-xs font-medium" />
                                        </div>
                                    </div>

                                        {/* <div className="flex items-center justify-between">
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
                                             <ErrorMessage name="nombreEncargado" component="span" className="block text-xs font-medium"/>
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
                                            <ErrorMessage name="nombreNegocio" component="span" className="block text-xs font-medium" />
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <label htmlFor="giro" className="block text-sm font-medium leading-6 text-gray-900">
                                            Giro comercial
                                            </label>
  
                                        </div>

                                        <div className="mt-2">
                                            <Field
                                                name="giro"
                                                as="select"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                
                                            >
                                                {
                                                    !isLoadingGiros && giros.map(({ id, giro}) => (
                                                        <option key={ id } value={ giro }>{ giro} </option>
                                                    ))
                                                }
                                            </Field>
                                            <ErrorMessage name="giro" component="span" className="block text-xs font-medium" />
                                        </div>
                                        
                                        <div className="flex items-center justify-between mt-2">
                                            <label htmlFor="pais" className="block text-sm font-medium leading-6 text-gray-900">
                                            Pais
                                            </label>
  
                                        </div>
                                        <div className="mt-2">
                                            <Field
                                                name="pais"
                                                type="text"
                                                disabled
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                
                                            />
                                            <ErrorMessage name="pais" component="span" className="block text-xs font-medium" />
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <label htmlFor="ciudad" className="block text-sm font-medium leading-6 text-gray-900">
                                            Ciudad
                                            </label>
  
                                        </div>


                                        <div className="mt-2">
                                            <Field
                                                name="ciudad"
                                                as="select"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                
                                            >
                                                {
                                                    !isLoadingCiudad && ciudades.map(({ id, ciudad}) => (
                                                        <option key={ id } value={ ciudad }>{ ciudad} </option>
                                                    ))
                                                }
                                            </Field>
                                            <ErrorMessage name="ciudad" component="span" className="block text-xs font-medium" />
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-gray-900">
                                            Direccion negocio
                                            </label>
  
                                        </div>

                                        <div className="mt-2">
                                            <Field
                                                name="direccion"
                                                type="text"
                                                as="textarea"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                
                                            />
                                            <ErrorMessage name="direccion" component="span" className="block text-xs font-medium" />
                                        </div> */}

                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                disabled={ isSubmitting }
                                                className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                               Registrar
                                            </button>
                                        </div>
                                    {/* </div> */}
                                </Form>
                            )
                        }

                    </Formik>
             
                </div>
        </div>
    )
}
