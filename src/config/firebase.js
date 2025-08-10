// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth ,signOut} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMladPyP8u4-LpdI143E9tPLOVHb_pOhM",
    authDomain: "fir-practice-deb01.firebaseapp.com",
    projectId: "fir-practice-deb01",
    storageBucket: "fir-practice-deb01.firebasestorage.app",
    messagingSenderId: "402036941812",
    appId: "1:402036941812:web:d125da9876edcf3f4b8fa1",
    measurementId: "G-5FLXX5FBM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { signOut }; // Export signOut for use in other components