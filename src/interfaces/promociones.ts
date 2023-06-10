import { Categorias, Productos } from "@interfaces"

export interface Promociones {
    id:string
    id_negocio:string
    productos:Productos[]
    categorias:Categorias[]
    fecha_creacion:Date
    descuento:Number
    vigencia:Date
    disponible:boolean
    descripcion:string
    photoUrl:string
} 