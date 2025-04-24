import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../AdminAuthenticateContext.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../AdminFirebase.js';
import { useNavigate } from 'react-router-dom';

import './Login.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const { setAdminUser } = useAdminAuth();



  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      //setAdminUser(user);
      navigate('/admin/dashboard');
    } catch (error) {
      setError("Login failed. Please check your email and password.");
      console.error("Login failed:", error.message);
    }
  };

  useEffect(() => {
    document.body.classList.add('login-page-body');
    return () => document.body.classList.remove('login-page-body');
  }, []);

  return (
    <div className="main-container">
      <div className="form-container">
        <div className="form-body">
          <h2 className="title" style={{ marginBottom: '5px'}}>Admin Log in</h2>

          <form className="the-form" onSubmit={handleLogin} style={{ marginTop: '15px' }}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" value="Log In" />
          </form>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;