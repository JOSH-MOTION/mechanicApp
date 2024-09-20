// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlaEtlIEGpsK5Fvp7ifNrxBXdaytlVZZM",
  authDomain: "mechanicwik-a64a4.firebaseapp.com",
  projectId: "mechanicwik-a64a4",
  storageBucket: "mechanicwik-a64a4.appspot.com",
  messagingSenderId: "1006067306383",
  appId: "1:1006067306383:web:5ea986d78af0391e1b85fa",
  measurementId: "G-45DCX55GBJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);