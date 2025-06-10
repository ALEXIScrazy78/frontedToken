import React, { useState, useEffect } from 'react';
import api, { getToken } from '../api';

function ProtectedRoute({ token, setToken }) {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProtectedData = async () => {
      if (!token) {
        setMessage('No token found. Please log in.');
        return;
      }
      try {
        const response = await api.get('/protected');
        setData(response.data);
        setMessage('');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setMessage('Access denied. Token expired or invalid. Please log in again.');
          localStorage.removeItem('token'); // Limpia el token si es inválido/expirado
          setToken(null);
        } else {
          setMessage(error.response?.data?.message || 'Failed to fetch protected data.');
        }
        console.error('Protected route error:', error);
      }
    };

    fetchProtectedData();
  }, [token, setToken]); // Dependencia del token para re-fetch cuando cambie

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setData(null);
    setMessage('Logged out successfully.');
  };

  return (
    <div>
      <h2>Protected Route</h2>
      {token ? (
        <>
          {data ? (
            <div>
              <p>Message from backend: {data.message}</p>
              <p>User ID: {data.user_id}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <p>Loading protected data...</p>
          )}
          {message && <p style={{ color: 'red' }}>{message}</p>}
        </>
      ) : (
        <p>You need to log in to access this route.</p>
      )}
    </div>
  );
}

export default ProtectedRoute;