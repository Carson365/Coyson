import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/App.js';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UserProvider } from './UserContext';
import { AdminAuthProvider } from './AdminAuthenticateContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AdminAuthProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AdminAuthProvider>
);

reportWebVitals();
