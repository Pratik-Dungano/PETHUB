// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPeoHQBhZBBTxCrl3AsSuI5PSNyEeV8mI",
  authDomain: "pet-adoption-4b282.firebaseapp.com",
  projectId: "pet-adoption-4b282",
  storageBucket: "pet-adoption-4b282.appspot.com",
  messagingSenderId: "318190938825",
  appId: "1:318190938825:web:2c1eae7331ce3e60cbbb18",
  measurementId: "G-08NEPTMTYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;