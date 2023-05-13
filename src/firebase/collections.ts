import { Ciudades, Negocios } from '../interfaces';
import { createCollection } from './helpers';


export const ciudadesCollection = createCollection<Ciudades>('ciudades');
export const negociosCollection = createCollection<Negocios>('negocios');