// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV2sTemAo22ZbA3NmRh3dhkBkoSDdirkE",
  authDomain: "chatapp-b27cc.firebaseapp.com",
  projectId: "chatapp-b27cc",
  storageBucket: "chatapp-b27cc.appspot.com",
  messagingSenderId: "225827886258",
  appId: "1:225827886258:web:3e1d830f1e97ec0ea9a5ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);