import { auth } from './AdminFirebase.js';
import {
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export const adminLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

export const logout = () => {
    return signOut(auth);
};