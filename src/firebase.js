// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiaTwq_FXjdxSOkWB95Jk5bKZ1ygC4DSM",
  authDomain: "producthunt-a0958.firebaseapp.com",
  projectId: "producthunt-a0958",
  storageBucket: "producthunt-a0958.appspot.com",
  messagingSenderId: "70205807099",
  appId: "1:70205807099:web:d40a68b382e2d5ddc7535e",
  measurementId: "G-HW8PX0QMEE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
