import React, { useState, useEffect } from 'react';
import { login } from '../AuthenticateHelper'; 
import { useNavigate } from 'react-router-dom';
import { AuthenticateUser } from '../Api.js';
import { useUser } from '../UserContext.js';
import { auth, googleProvider, microsoftProvider } from '../FireBase.js'; 
import { signInWithPopup } from 'firebase/auth';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await login(email, password);
      AuthenticateUser(user.user.accessToken, setUser);
      navigate(-1);
    } catch (error) {
      setError('Login failed. Please check your email and password.');
      console.error('Login failed:', error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      console.log(user.email);
      AuthenticateUser(user.accessToken, setUser, user.photoURL) ? console.log('true') : console.log('false')
      navigate(-1); 
    } catch (error) {
      console.error('Google login failed:', error.message);
      setError('Google login failed. Please try again.');
    }
  };
  
const handleMicrosoftLogin = async () => {
  try {
    const result = await signInWithPopup(auth, microsoftProvider);
    const user = result.user;
    const token = await user.getIdToken();
    AuthenticateUser(token, setUser)
    console.log('Microsoft login successful:', user.email);
  } catch (error) {
    console.error('Microsoft login failed:', error.message);
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
          <h2 className="title">Log in with</h2>

          <div className="social-login">
            <ul>
              <li className="google">
                <a href="#" onClick={handleGoogleLogin}>Google</a>
              </li>
              <li className="fb">
                <a href="#" onClick={handleMicrosoftLogin}>Microsoft</a>
              </li>
            </ul>
          </div>

          <div className="_or">or</div>

          <form className="the-form" onSubmit={handleLogin}>
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

        <div className="form-footer">
          <div>
            <span>Don't have an account?</span> <a href="#">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;