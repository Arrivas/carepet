import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr3xreUIGbwDJsWsl3zPW0TV_5Aevs-S8",
  authDomain: "carepet-16aea.firebaseapp.com",
  projectId: "carepet-16aea",
  storageBucket: "carepet-16aea.appspot.com",
  messagingSenderId: "223328061765",
  appId: "1:223328061765:web:5879235efca9affa41962c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore(app);
export default app;
