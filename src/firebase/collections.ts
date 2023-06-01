import { Categorias, Ciudades, Cupones, Giros, Negocios, Productos, Promociones } from '../interfaces';
import { createCollection } from './helpers';


export const ciudadesCollection = createCollection<Ciudades>('ciudades');
export const negociosCollection = createCollection<Negocios>('negocios');
export const girosCollection = createCollection<Giros>("giros");
export const productosCollection = createCollection<Productos>("productos");
export const promocionesCollection = createCollection<Promociones>("promociones");
export const cuponesCollection = createCollection<Cupones>("cupones");
export const categoriasCollection = createCollection<Categorias>("categorias");
