import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDW8fPfo9o-Ft8pmy-r536EjgE1QnM4QEQ",
  authDomain: "portfolio-blog-55576.firebaseapp.com",
  projectId: "portfolio-blog-55576",
  storageBucket: "portfolio-blog-55576.firebasestorage.app",
  messagingSenderId: "851685106913",
  appId: "1:851685106913:web:cd3942bf45ada2cfc9c3a0",
  measurementId: "G-CCKRF831PC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
