import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || ""}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || ""}.appspot.com`,
  messagingSenderId: "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

// Initialize Firebase
let app: any;
let auth: any;

export function init() {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  return { app, auth };
}

export function getFirebaseAuth() {
  if (!auth) {
    const { auth: newAuth } = init();
    return newAuth;
  }
  return auth;
}

export default { init, getFirebaseAuth };
