import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDcHoB13UuElt-h9hoSBZyIXoM-EtjgZQM',
  authDomain: 'rd-and-chester.firebaseapp.com',
  projectId: 'rd-and-chester',
  storageBucket: 'rd-and-chester.appspot.com',
  messagingSenderId: '822055686354',
  appId: '1:822055686354:web:bb6256789aa6cd01eedd0b',
  measurementId: 'G-HMZQQS243G'
};

const app = getApps().find(app => app.name === "userApp") 
  || initializeApp(firebaseConfig, "userApp");

const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const microsoftProvider = new OAuthProvider('microsoft.com');
microsoftProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth };