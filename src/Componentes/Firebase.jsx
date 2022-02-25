// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3tFd7IuDwbuf-NacyMjkLZzfjuXKet2M",
  authDomain: "social-is-art.firebaseapp.com",
  projectId: "social-is-art",
  storageBucket: "social-is-art.appspot.com",
  messagingSenderId: "310377323951",
  appId: "1:310377323951:web:3669a1e455a8c5a281a35a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp)

export {firebaseApp, storage, db} ;