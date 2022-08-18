// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwm6dzZ0ue9KB9D62ZwGCIwQtho0uri9I",
  authDomain: "snurtoolstm.firebaseapp.com",
  projectId: "snurtoolstm",
  storageBucket: "snurtoolstm.appspot.com",
  messagingSenderId: "1029369741295",
  appId: "1:1029369741295:web:2aba1a26a21124059d801a",
  measurementId: "G-ZKRCSBBSQ0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
