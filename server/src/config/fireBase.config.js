import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_APIKEY,
//     authDomain: import.meta.env.VITE_AUTHDOMAIN,
//     projectId: import.meta.env.VITE_PROJECTID,
//     storageBucket: import.meta.env.VITE_STORAGEBUCKET,
//     messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
//     appId: import.meta.env.VITE_APPID
// };
// const firebaseConfig = {
//     apiKey:"AIzaSyBy_L3_-J7xqipkKOSrFnLfYc-SkbnkI4Q",
//     authDomain:"terror-time-machine.firebaseapp.com",
//     projectId:"terror-time-machine",
//     storageBucket:"terror-time-machine.appspot.com",
//     messagingSenderId:"31916567759",
//     appId:"1:31916567759:web:f84370f296cbf3e5671bba",
// };

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