import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; 
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDcHoB13UuElt-h9hoSBZyIXoM-EtjgZQM',
  authDomain: 'rd-and-chester.firebaseapp.com',
  projectId: 'rd-and-chester',
  storageBucket: 'rd-and-chester.firebasestorage.app',
  messagingSenderId: '822055686354',
  appId: '1:822055686354:web:bb6256789aa6cd01eedd0b',
  measurementId: 'G-HMZQQS243G'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export { auth };