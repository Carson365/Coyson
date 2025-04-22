import React, { useState } from 'react';
import { login } from '../AuthenticateHelper'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const loginObject = {
    token: "",
  }

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      loginObject.token = user.user.accessToken;
      console.log(loginObject)
    } catch (error) {
      setError('Login failed. Please check your email and password.');
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Log In</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
