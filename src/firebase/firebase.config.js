import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnz53Op7tXfI7xxvN-i6XLaAwUJLIHY-A",
  authDomain: "uiu-lsc.firebaseapp.com",
  projectId: "uiu-lsc",
  storageBucket: "uiu-lsc.firebasestorage.app",
  messagingSenderId: "354849676605",
  appId: "1:354849676605:web:85dea7fceb772cdc7bf954",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
