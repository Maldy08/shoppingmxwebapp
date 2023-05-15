import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { onCheking, onLogin, onLogout } from "../store/auth/authSlice";
import { singInWithGoogle, logiWithEmailPassword, registerUserWithEmailPassword } from "../firebase/providers";



export const useAuthStore = () => {

    const {status, user } = useSelector( ( state: RootState ) => state.auth );
    const dispatch = useDispatch();


    const startGoogleSingIn = async () => {
        dispatch( onCheking() );
        const result = await singInWithGoogle();
        if(!result.ok) return dispatch( onLogout());
        dispatch( onLogin(result));
    }

    const startLoginWithEmailPassword = async (email:string,password:string) => {
        dispatch( onCheking() );
        const result = await logiWithEmailPassword(email,password);
        if(!result.ok) return dispatch( onLogout());
        dispatch( onLogin( result ));
    }

    const startRegisterWithEmailPassword = async(email:string,password:string, displayName:string) => {
        dispatch( onCheking() );
        const result = await registerUserWithEmailPassword( email, password, displayName);
        if(!result.ok) return dispatch( onLogout());
        dispatch( onLogin( result ) );
    }

    return {
        startGoogleSingIn,
        startLoginWithEmailPassword,
        startRegisterWithEmailPassword,
        status : "authenticated",
        user,


    }

}
