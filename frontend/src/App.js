import React from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import ManagerDashboard from './components/ManagerDashboard';

function App() {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const path = window.location.pathname;

  if (!username) {
    return <LoginPage />;
  }

  if (path === '/admin-dashboard') {
    return <AdminDashboard />;
  }

  if (path === '/manager-dashboard') {
    return <ManagerDashboard />;
  }

  return <Dashboard />;
}

export default App;
