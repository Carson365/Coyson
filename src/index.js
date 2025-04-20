import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '/Users/coycrowder/MIS 321/321Project/Coyson/src/Pages/App.js';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UserProvider } from './UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);

reportWebVitals();
