// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQWioL0OX8TKz47OTh1xLD03NSQdckweg",
  authDomain: "householdtypescript-fc3f9.firebaseapp.com",
  projectId: "householdtypescript-fc3f9",
  storageBucket: "householdtypescript-fc3f9.appspot.com",
  messagingSenderId: "254717145361",
  appId: "1:254717145361:web:c5a2fdbcc5b623dd879cb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


export { db };