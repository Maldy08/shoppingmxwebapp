import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";
import { onListCiudades } from "../store/ciudades/ciudadesSlice";

export const useCiudadesStore = () => {

    const { ciudades, isLoading  } = useSelector( ( state: RootState ) => state.ciudades );

    const dispatch = useDispatch();

    const startLoadingCiudades = async () => {

         const q = query( collection(FirebaseDB,"ciudades"),orderBy("id"));
         const querySnapshot = await getDocs(q);
         const ciudades: any[] = [];
         querySnapshot.forEach( ( doc ) => {
             ciudades.push({id: doc.id, ...doc.data() });
         });

         dispatch( onListCiudades( ciudades ));

    }

    return {
        startLoadingCiudades,
        ciudades,
        isLoading,
    }
}