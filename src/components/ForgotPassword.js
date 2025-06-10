import React, { useState } from 'react';
import api from '../api';
import '../index.css';

function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await api.post('/forgot_password', { username });
      setMessage(response.data.message);
      setIsSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error requesting password reset.');
      setIsSuccess(false);
      console.error('Forgot password error:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Forgot Password</h2>
      <p>Enter your username (email) to receive a password reset link.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="forgot-username">Username (Email):</label>
          <input
            type="text"
            id="forgot-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      {message && (
        <p className={`message ${isSuccess ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ForgotPassword;