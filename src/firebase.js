// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDALpbDW9X10bl5VRLqxxfhDq-v_mAjDl4",
  authDomain: "viking-cricket-club.firebaseapp.com",
  projectId: "viking-cricket-club",
  storageBucket: "viking-cricket-club.firebasestorage.app",
  messagingSenderId: "908433262223",
  appId: "1:908433262223:web:8a741f019269790f09d2fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
