import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem('username') && !!localStorage.getItem('role')
  );

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
