// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "safehouse-13f78.firebaseapp.com",
  projectId: "safehouse-13f78",
  storageBucket: "safehouse-13f78.firebasestorage.app",
  messagingSenderId: "934306318069",
  appId: "1:934306318069:web:b27aad0d337180239ee7bc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);