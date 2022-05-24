import { initializeApp } from "@firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "@firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyD-MALogRGOSiUgorz84cAj3dZhtFr5-_w",
    authDomain: "final-project-b6526.firebaseapp.com",
    projectId: "final-project-b6526",
    storageBucket: "final-project-b6526.appspot.com",
    messagingSenderId: "353539023014",
    appId: "1:353539023014:web:603162ccc64a25912cd467"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};