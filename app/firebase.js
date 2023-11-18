// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjWU7evKatiOTDmLMhAXrsq9xNeKOTN8s",
  authDomain: "harcamanihesapla.firebaseapp.com",
  projectId: "harcamanihesapla",
  storageBucket: "harcamanihesapla.appspot.com",
  messagingSenderId: "769248684591",
  appId: "1:769248684591:web:48432571c5c40a03c034da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
