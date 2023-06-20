import { Categorias, Productos } from "@interfaces"
import { Timestamp } from "firebase/firestore"

export interface Promociones {
    id:string
    id_negocio:string
    productos:Productos[]
    categorias:Categorias[]
    fecha_creacion:Timestamp
    descuento:Number
    vigencia:Timestamp
    disponible:boolean
    descripcion:string
    photoUrl:string
} 