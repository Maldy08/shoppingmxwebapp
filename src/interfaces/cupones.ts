import { Categorias, Productos } from "@interfaces"

export interface Cupones {
    id:string
    id_negocio:string
    productos:Productos[]
    categorias:Categorias[]
    descripcion:string
    descuento:Number
    fecha_creacion:Date
    vigencia:Date
    disponibilidad:Number,
    estatus:number

}