import React, { useState } from 'react';
import api from '../api';
import '../index.css';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Almacena el token
      setToken(token); // Actualiza el estado en App.js
      setMessage('Login successful!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed.');
      console.error('Login error:', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/register', { username, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <h2>Login / Register</h2>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleLogin}>Login</button>
        <button type="submit" onClick={handleRegister}>Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;