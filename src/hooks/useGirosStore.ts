import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getDocs, orderBy, query } from "firebase/firestore";
import { girosCollection } from "../firebase/collections";
import { Giros } from "../interfaces";
import { onListGiros } from "../store/giros/girosSlice";

export const useGirosStore = () => {

    const { giros, isLoading } = useSelector( ( state: RootState ) => state.giros );
    const dispatch = useDispatch();

    const startLoadingGiros = async () => {

        const q = query(girosCollection, orderBy("id"));
        const giros = await getDocs(q);
        const listGiros: Giros[] = [];
        giros.docs.forEach(( giroDoc ) => {
            const giro = giroDoc.data();
            listGiros.push(giro);
        });



        dispatch( onListGiros( listGiros ));

    }

    // ciudades.docs.forEach((ciudadDoc) => {
    //     const ciudad = ciudadDoc.data();
    //     listaCiudades.push(ciudad);
    // });

    return {
        startLoadingGiros,
        giros,
        isLoading,
    }

}
