import React from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

function App() {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const path = window.location.pathname;

  if (!username || !role) {
    return <LoginPage />;
  }

  return <Dashboard />;
}

export default App;
