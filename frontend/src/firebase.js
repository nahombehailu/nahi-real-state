// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nah-real-state.firebaseapp.com",
  projectId: "nah-real-state",
  storageBucket: "nah-real-state.appspot.com",
  messagingSenderId: "448633763458",
  appId: "1:448633763458:web:723524082fc260b961269b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);