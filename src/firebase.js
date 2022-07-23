import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "android-echo-system.firebaseapp.com",
  projectId: "android-echo-system",
  storageBucket: "android-echo-system.appspot.com",
  messagingSenderId: "957862613250",
  appId: "1:957862613250:web:984a01bcbdbb2f2e97f21b",
  measurementId: "G-WW7QFPPN7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);