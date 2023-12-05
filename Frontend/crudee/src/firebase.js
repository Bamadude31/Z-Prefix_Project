// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCwdU75cniU7RU-aBZup_j4Vd5-pYPQkp8",
  authDomain: "z-prefix-auth-development.firebaseapp.com",
  projectId: "z-prefix-auth-development",
  storageBucket: "z-prefix-auth-development.appspot.com",
  messagingSenderId: "238321107611",
  appId: "1:238321107611:web:fd7a1a2023f766c8c13c3e"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app