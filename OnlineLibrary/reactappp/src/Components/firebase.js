// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{ getAuth,FacebookAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6IU2JpKdeix5xiWBjDp1zR8S_B-HjnRo",
    authDomain: "projetcloudbibliotheque.firebaseapp.com",
    projectId: "projetcloudbibliotheque",
    storageBucket: "projetcloudbibliotheque.firebasestorage.app",
    messagingSenderId: "881109519815",
    appId: "1:881109519815:web:26b5f0be3f0dcc72d45de2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const facebookProvider = new FacebookAuthProvider();
