// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // <-- Add this import
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDcHoB13UuElt-h9hoSBZyIXoM-EtjgZQM',
  authDomain: 'rd-and-chester.firebaseapp.com',
  projectId: 'rd-and-chester',
  storageBucket: 'rd-and-chester.firebasestorage.app',
  messagingSenderId: '822055686354',
  appId: '1:822055686354:web:bb6256789aa6cd01eedd0b',
  measurementId: 'G-HMZQQS243G'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export the auth object
export { auth };