import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok:true,
            displayName,
            email,
            photoURL,
            uid,
        }
    } catch (error) {

        return {
            ok: false,
        
        }
    }
}


export const registerUserWithEmailPassword = async ( email:string, password:string, displayName:string) =>{

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth,email,password);
        const { uid, photoURL } = resp.user
    
        await updateProfile(FirebaseAuth.currentUser!, { displayName });
        return {
            ok:true,
            uid,
            photoURL,
            email,
            displayName
        }

    } catch (error) {
        return {
            ok:false,
        }
    }
   
}

export const logiWithEmailPassword = async ( email:string, password:string ) => {

    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, displayName, photoURL } = resp.user;
        return {
            ok:true,
            uid,
            displayName,
            photoURL
        }
        
    } catch (error) {
        return {
            ok:false,
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}
