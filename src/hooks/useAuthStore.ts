import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { onCheking, onLogin, onLogout } from "../store/auth/authSlice";
import { singInWithGoogle } from "../firebase/providers";



export const useAuthStore = () => {

    const {status, user } = useSelector( ( state: RootState ) => state.auth );
    const dispatch = useDispatch();


    const startGoogleSingIn = async () => {
        dispatch( onCheking() );
        const result = await singInWithGoogle();
        if(!result.ok) return dispatch( onLogout());
        dispatch( onLogin(result));
    }

    return {
        startGoogleSingIn,
        status,
        user,
    }



}