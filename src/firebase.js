// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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