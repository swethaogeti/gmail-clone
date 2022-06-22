import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA36IsvdyjQGMqi2nmwM7reSTtwUUwHHTU",
  authDomain: "clone-783c9.firebaseapp.com",
  projectId: "clone-783c9",
  storageBucket: "clone-783c9.appspot.com",
  messagingSenderId: "205062130318",
  appId: "1:205062130318:web:eb7b021ad3ad51050057df",
  measurementId: "G-K4QNLJE1EF",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
