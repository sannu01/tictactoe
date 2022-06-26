// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBQ5hoV1MKJ1Qjs8zour-Y6rYwCu38tBM",
  authDomain: "tictactoe-54faa.firebaseapp.com",
  databaseURL:
    "https://tictactoe-54faa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tictactoe-54faa",
  storageBucket: "tictactoe-54faa.appspot.com",
  messagingSenderId: "937205165665",
  appId: "1:937205165665:web:3e88ca19ce5757cf96c420",
  measurementId: "G-9TKK5EXBDY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
