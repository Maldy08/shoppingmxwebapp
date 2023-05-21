import { ErrorMessage, Field, Form, Formik } from "formik";
import MaskedInput from "react-text-mask";
import * as Yup from 'yup';
import { Ciudades, Giros } from "@interfaces";


type Props = {

    giros: Giros[]
    ciudades: Ciudades[]


}
interface FormValues {
    nombre_empresa:string,
    nombre_encargado:string,
    giro_empresa:string,
    horario:string,
    numero_empleados:number,
    pais:string,
    estado:string,
    ciudad:string,
    correo:string,
    telefono:string,
    direccion:string
    }

    const initialValues: FormValues = {
        nombre_empresa:'',
        nombre_encargado:'',
        giro_empresa:'',
        horario:'',
        numero_empleados:0,
        pais:'México',
        estado:'Baja California',
        ciudad:'',
        correo:'',
        telefono:'',
        direccion:''
    }

    const onSubmit = (values: FormValues) => {
        setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        }, 500);
        };

const phoneNumberMask = [ "(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/ ];

export const FormAddNegocio = ( props: Props ) => {
    return (
        <div className=" sm:mx-auto sm:w-full sm:max-w-md p-5">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            

                validationSchema={

                    Yup.object({
                        nombre_empresa: Yup.string().required('Campo requerido'),
                        nombre_encargado: Yup.string().required('Campo requerido'),
                        giro_empresa:Yup.string().required('Campo requerido'),
                        horario:Yup.string().required('Campo requerido'),
                        numero_empleados:Yup.number().required('Campo requerido'),
                        pais:Yup.string().required('Campo requerido'),
                        estado:Yup.string().required('Campo requerido'),
                        ciudad:Yup.string().required('Campo requerido'),
                        correo: Yup.string().required('Campo requerido').email("Formato de correo invalido"),
                        telefono:Yup.string().required('Campo requerido'),
                        direccion:Yup.string().required('Campo requerido'),
                    })
                }

            >
                {
                    () => (
                        <Form className="space-y-6">
                            <div>
                                <label htmlFor="nombre_empresa" className="block text-sm font-medium leading-6 text-gray-900">
                                   Nombre de la Empresa
                                </label>
                                <div className="mt-2">
                                    <Field
                                        name="nombre_empresa"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                    />
                                    <ErrorMessage name="nombre_empresa" component="span" className="block text-xs font-medium"/>
                                 </div>
                            </div>

                            <div>
                                <label htmlFor="nombre_encargado" className="block text-sm font-medium leading-6 text-gray-900">
                                   Nombre del Encargado
                                </label>
                                <div className="mt-2">
                                    <Field
                                        name="nombre_encargado"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                    />
                                    <ErrorMessage name="nombre_encargado" component="span" className="block text-xs font-medium"/>
                                 </div>
                            </div>


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
                                    <ErrorMessage name="giro_empresa" component="span" className="block text-xs font-medium"/>
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
                                    <ErrorMessage name="horario" component="span" className="block text-xs font-medium"/>
                                 </div>
                            </div>
                            <div>
                                <label htmlFor="numero_empleados" className="block text-sm font-medium leading-6 text-gray-900">
                                   Numero de empleados
                                </label>
                                <div className="mt-2">
                                    <Field
                                        name="numero_empleados"
                                        type="number"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                    />
                                    <ErrorMessage name="numero_empleados" component="span" className="block text-xs font-medium"/>
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
                                    <ErrorMessage name="ciudad" component="span" className="block text-xs font-medium"/>
                                 </div>
                            </div>

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
                                    <ErrorMessage name="correo" component="span" className="block text-xs font-medium"/>
                                 </div>
                            </div>
                            <div>
                                <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-900">
                                   Telefono 
                                </label>
                                <div className="mt-2">
                                    <Field name="telefono">
                                        {
                                            () => <MaskedInput
                                                type="text"
                                                mask={ phoneNumberMask }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                        }
                                    </Field>
                                    <ErrorMessage name="telefono" component="span" className="block text-xs font-medium"/>
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
                                    <ErrorMessage name="direccion" component="span" className="block text-xs font-medium"/>
                                 </div>
                            </div>
                            
                        </Form>
                    )
                }

            </Formik>
        </div>
    )
}