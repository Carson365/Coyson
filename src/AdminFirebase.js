import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBSLFT2LrtRGn7_cpUmlDl690enNtSUBic",
  authDomain: "rd-and-chester-admin.firebaseapp.com",
  projectId: "rd-and-chester-admin",
  storageBucket: "rd-and-chester-admin.appspot.com",
  messagingSenderId: "642937675126",
  appId: "1:642937675126:web:1a332cf7331e49bbf32e57",
  measurementId: "G-NS0YNWRYM4"
};

const app = getApps().find(app => app.name === "adminApp") 
  || initializeApp(firebaseConfig, "adminApp");

const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence).catch(console.error);

export { auth, signOut };
