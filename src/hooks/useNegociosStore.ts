import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"

import { collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";

import { onListNegocios } from "../store/negocios/negociosSlice";

export const useNegociosStore = () => {

    const { negocios, isLoading } = useSelector( (state: RootState) => state.negocios ); 
    const dispatch = useDispatch();

    const startLoadingNegocios = async () => {
        
        const querySnapshot = await getDocs( collection (FirebaseDB, "negocios"));
        const negocios: any[] = [];
        querySnapshot.forEach( ( doc ) => {
            negocios.push({id: doc.id, ...doc.data() });
        });

        dispatch( onListNegocios( negocios ));

    
    }

    return {
        startLoadingNegocios,
        negocios,
        isLoading,
    }
}