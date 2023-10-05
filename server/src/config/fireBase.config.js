import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyB4RIMDjP1XAKim2MObxZlMolTJcZd5aok",
    authDomain: "terror-time-machine-1c082.firebaseapp.com",
    projectId: "terror-time-machine-1c082",
    storageBucket: "terror-time-machine-1c082.appspot.com",
    messagingSenderId: "926591598333",
    appId: "1:926591598333:web:c29dad092974f1e58d8894"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)