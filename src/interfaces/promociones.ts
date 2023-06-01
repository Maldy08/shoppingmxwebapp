import { Productos } from "@interfaces"

export interface Promociones {
    id:string
    id_negocio:string
    productos:Productos[]
    fecha_creacion:Date
    descuento:Number
    vigencia:Date
    disponibilidad:number
    photoUrl:string
} 