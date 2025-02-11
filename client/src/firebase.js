// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdZ2nnbaGy5OnTXmdHQZILxRrW4Z_Q-7o",
  authDomain: "open-heart-31eb3.firebaseapp.com",
  projectId: "open-heart-31eb3",
  storageBucket: "open-heart-31eb3.firebasestorage.app",
  messagingSenderId: "111498054571",
  appId: "1:111498054571:web:4919fdb8509f7ea49ae0ee",
  measurementId: "G-DHV9PH378L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Chỉ dùng nếu bạn cần Firebase Authentication

export { app, auth };
