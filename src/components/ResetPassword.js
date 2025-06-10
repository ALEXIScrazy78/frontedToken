import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import '../index.css';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extraer el token de la URL (ej. ?token=...)
    const queryParams = new URLSearchParams(location.search);
    const urlToken = queryParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    } else {
      setMessage('No reset token found in URL.');
      setIsSuccess(false);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!token) {
      setMessage('No valid reset token available.');
      setIsSuccess(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match!');
      setIsSuccess(false);
      return;
    }
    if (newPassword.length < 6) { // Ejemplo de validación mínima
      setMessage('Password must be at least 6 characters long.');
      setIsSuccess(false);
      return;
    }

    try {
      const response = await api.post('/reset_password', { token, new_password: newPassword });
      setMessage(response.data.message + " Redirecting to login...");
      setIsSuccess(true);
      // Redirige al login después de un breve retraso
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error resetting password.');
      setIsSuccess(false);
      console.error('Reset password error:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Reset Password</h2>
      {!token ? (
        <p className="message error">Invalid or missing reset link. Please request a new one.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm New Password:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
      {message && (
        <p className={`message ${isSuccess ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ResetPassword;