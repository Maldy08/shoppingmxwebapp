import { Productos } from "@interfaces"

export interface Cupones {
    id:string
    id_negocio:string
    productos:Productos[]
    descuento:Number
    fecha_creacion:Date
    vigencia:Date
    disponibilidad:Number,
    estatus:number

}