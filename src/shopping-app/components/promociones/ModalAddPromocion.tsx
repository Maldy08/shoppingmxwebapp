import { ChangeEvent } from "react"
import DatePicker  from "react-datepicker";

import { Categorias, Negocios, Productos, Promociones } from "@interfaces"
import { ErrorMessage, Field, Form, Formik } from "formik"
import "react-datepicker/dist/react-datepicker.css";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const initialValues: Promociones = {
    id:'0',
    id_negocio: '',
    descuento:0,
    disponible:true,
    fecha_creacion: new Date(),
    photoUrl:'',
    productos:[],
    categorias:[],
    vigencia: new Date(),
    descripcion: ''
}

type Props = {
    // onShowModalClick():void
    onSaveData: (data: Promociones) => Promise<void>
    modify:boolean
    promocion?: Promociones
    productos : Productos[]
    negocios: Negocios[]
    categorias: Categorias[]
    handleChangeNegocio(e :ChangeEvent<HTMLInputElement>) :void
    handleChangeCategoria(e :ChangeEvent<HTMLInputElement>) :void
    showProducts:boolean
    onShowProductsClick():void
    showCategorias:boolean
    onShowCategoriasClick():void
    // file: Blob | ArrayBuffer, 
    // fileName: string
    // handleFileChange(e :ChangeEvent<HTMLInputElement>):void
}

const categoriasCargadas: Categorias[] = [];

const handleChangeCategoria = (  e:ChangeEvent<HTMLInputElement> ) => {
    // setChangeCategoria( e.target.value );
     categoriasCargadas.push({descripcion:e.target.value,id:'',negocioId:''})
     console.log({categoriasCargadas});
 }

 const addCategoriaHandler = ( event: React.MouseEvent<SVGSVGElement> ) => {
    console.log('click')
 }

export const ModalAddPromocion = (
    {
        //  onShowModalClick,
         onSaveData,
         modify,
         promocion,
         productos,
         categorias,
         negocios,
         handleChangeNegocio,
         handleChangeCategoria,
         showProducts,
         onShowProductsClick,
         showCategorias,
         onShowCategoriasClick,
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
                                ({ setFieldValue, values }) => (
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
                                                    Vigencia
                                                </label>

                                                <div className="mt-2">

                                                    <DatePicker 
                                                        name="fecha"
                                                        title="fecha"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        dateFormat="dd/MM/yyyy"
                                                        // disabled={isSubmitting}
                                                        selected={ values.vigencia } 
                                                        onChange={
                                                            ( date:any ) => setFieldValue('vigencia', date)
                                                        }
                                                    />
                                                    {/* <Field
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
                                                        </Field> */}
                                                    <ErrorMessage name="productos" component="span" className="block text-xs font-medium  text-red-500" />
                                                </div>
                                            </div> 
                                        </div>

               

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center mb-4">
                                                <input disabled={showCategorias} onChange={ onShowProductsClick } id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> productos</label>

                                                <input disabled={showProducts} onChange={ onShowCategoriasClick } id="default-checkbox" type="checkbox" value="" className="w-4 h-4 ml-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"> categorias</label>
                                            </div>

                                            { showProducts &&
                                            
                                                <div className="">
                                                    <label htmlFor="productos" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Productos
                                                    </label>
                                                    <div className="mt-2 flex">
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
         
                                                        <ErrorMessage name="productos" component="span" className="block text-xs font-medium  text-red-500"/>
                                                        <div className="mt-1 w-5">
                                                            <PlusCircleIcon className="w-6 h-6 text-blue-800 inline "/>
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                            }
                                            {
                                                showCategorias &&
                                                <div className="">
                                                    <label htmlFor="categorias" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Categorias
                                                    </label>
                                                    <div className="mt-2 flex">
                                                        <Field
                                                            name="categorias"
                                                            as="select"
                                                            onChange= { (e:ChangeEvent<HTMLInputElement>) => {
                                                                handleChangeCategoria(e)
                                                                setFieldValue('categorias',e.target.value)
                                                            } }
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                                        > 
                                                        <option disabled value="">(Selecciona una categoria)</option>

                                                            {
                                                            
                                                            categorias.map(({ id,descripcion }) => (
                                                                <option key={ id } value={ descripcion }>{ descripcion } </option>
                                                                ))
                                                            }
                                                        </Field>
                                                        <ErrorMessage name="categorias" component="span" className="block text-xs font-medium  text-red-500"/>
                                                        <div className="mt-1 w-5">
                                                            <PlusCircleIcon className="w-6 h-6 text-blue-800 inline "
                                                                onClick={ () => console.log(values.categorias)}
                                                            />
                                                        </div>
                                                            
                                                    </div>
                      
                                                </div>    
                                            }
         
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