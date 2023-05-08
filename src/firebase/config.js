import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMHRRIpnefFe-0nF7ENHtbvU6CCgrHxCI",
    authDomain: "enofferta-app.firebaseapp.com",
    projectId: "enofferta-app",
    storageBucket: "enofferta-app.appspot.com",
    messagingSenderId: "342727236805",
    appId: "1:342727236805:web:f3085ce2135493465a64ac",
    measurementId: "G-6B2N8WTFXM"
};

export const FirebaseApp = initializeApp(firebaseConfig);