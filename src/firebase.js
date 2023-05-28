import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {

    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  
    authDomain: "todo-3e0a8.firebaseapp.com",
  
    projectId: "todo-3e0a8",
  
    storageBucket: "todo-3e0a8.appspot.com",
  
    messagingSenderId: "769241328422",
  
    appId: "1:769241328422:web:e2e03f25f1fceae60eafe7"
  
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);