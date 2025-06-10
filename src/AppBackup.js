import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { getToken } from './api';

function App() {
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, [token]);

  return (
    <div className="app-container"> {/* Aplica la clase de contenedor aquí */}
      <h1>My Token Auth App</h1>

      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <ProtectedRoute token={token} setToken={setToken} />
      )}
    </div>
  );
}

export default App;