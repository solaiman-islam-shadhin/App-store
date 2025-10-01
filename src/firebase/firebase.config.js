// Firebase configuration - Created by AI Assistant
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsvhxRaoP88sqKRRp892-JmiKkpz06Ui8",
  authDomain: "app-store-4145f.firebaseapp.com",
  projectId: "app-store-4145f",
  storageBucket: "app-store-4145f.firebasestorage.app",
  messagingSenderId: "694190419059",
  appId: "1:694190419059:web:6c73722f769375edbe0e06",
  measurementId: "G-5F39BPRFRP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);