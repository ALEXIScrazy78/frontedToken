import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Importa Link
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './components/ForgotPassword'; // Nuevo
import ResetPassword from './components/ResetPassword';   // Nuevo
import { getToken } from './api';
import './index.css';

function App() {
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, [token]);

  return (
    <Router>
      <div className="app-container">
        <h1>My Token Auth App</h1>

        <nav>
          {/* Solo muestra enlaces si no hay token (no logueado) */}
          {!token && (
            <div style={{ marginBottom: '20px' }}>
              <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', color: 'var(--primary-color)', fontWeight: 'bold' }}>Login</Link>
              <Link to="/forgot-password" style={{ textDecoration: 'none', color: 'var(--primary-color)', fontWeight: 'bold' }}>Forgot Password?</Link>
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/" element={
            !token ? <Login setToken={setToken} /> : <ProtectedRoute token={token} setToken={setToken} />
          } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} /> {/* Esta ruta espera el token en la URL */}
          {/* Puedes añadir una ruta para el caso de que el usuario ya esté logueado y acceda a "/" */}
          <Route path="*" element={<p className="message error">404 - Page Not Found</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;