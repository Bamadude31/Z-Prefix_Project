import { initializeApp } from "firebase/app";
import "firebase/auth"

const firebaseConfig =({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
});

const app = initializeApp(firebaseConfig);
export const auth = app.auth()
export default app
