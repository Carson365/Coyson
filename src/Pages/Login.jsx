import React, { useState, useEffect } from 'react';
import { login } from '../AuthenticateHelper'; 
import { useNavigate } from 'react-router-dom';
import { AuthenticateUser, FetchCart } from "../Api";
import { useUser } from '../UserContext.js';
import { auth, googleProvider, microsoftProvider } from '../Firebase.js'; 
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
      const token = user.uid;
  
      const authenticatedUser = await AuthenticateUser({
        token,
        name: user.user.displayName ?? "User",
        email: user.user.email ?? "",
        profileImg: user.user.photoURL ?? ""
      });
  
      if (authenticatedUser) {
        setUser(authenticatedUser);
        const cart = await FetchCart(authenticatedUser.id);
        navigate(-1);
      } else {
        setError("Login failed to authenticate with server.");
      }
    } catch (error) {
      setError("Login failed. Please check your email and password.");
      console.error("Login failed:", error.message);
    }
  };
  

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const user = result.user;
      const token = user.uid;
  
      const authenticatedUser = await AuthenticateUser({
        token,
        name: user.displayName ?? "User",
        email: user.email ?? "",
        profileImg: user.photoURL ?? ""
      });
  
      if (authenticatedUser) {
        console.log("Authenticated User:", authenticatedUser);
        setUser(authenticatedUser);
        const cart = await FetchCart(authenticatedUser.id);
        navigate(-1);
      } else {
        setError("Google login failed to authenticate with server.");
      }
    } catch (error) {
      console.error("Google login failed:", error.message);
      setError("Google login failed. Please try again.");
    }
  };
  
  
  const handleMicrosoftLogin = async () => {
    try {
      const result = await signInWithPopup(auth, microsoftProvider);
      const user = result.user;
      const token = user.uid;
  
      const authenticatedUser = await AuthenticateUser({
        token,
        name: user.displayName ?? "User",
        email: user.email ?? "",
        profileImg: user.photoURL ?? ""
      });
  
      if (authenticatedUser) {
        setUser(authenticatedUser);
        const cart = await FetchCart(authenticatedUser.id);
        navigate(-1);
      } else {
        setError("Microsoft login failed to authenticate with server.");
      }
    } catch (error) {
      console.error("Microsoft login failed:", error.message);
      setError("Microsoft login failed. Please try again.");
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
                <a onClick={handleGoogleLogin}>Google</a>
              </li>
              <li className="fb">
                <a onClick={handleMicrosoftLogin}>Microsoft</a>
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

            <input type="submit" value="Log In / Sign Up" />
          </form>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>

        <div className="form-footer">
          <div>
          <span>Don't have an account? </span>
            <a
              href="#"
              onClick={(e) => {
              e.preventDefault();
              navigate('/');
              }}
            >Continue as Guest</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;