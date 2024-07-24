import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCL70Uy4Oli2FsOsl07VCE0B9mugu6u8Uo",
  authDomain: "name-the-star.firebaseapp.com",
  projectId: "name-the-star",
  storageBucket: "name-the-star.appspot.com",
  messagingSenderId: "770076023153",
  appId: "1:770076023153:web:5bf2ead13373358d413ed0",
  measurementId: "G-395JPWZM8P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);