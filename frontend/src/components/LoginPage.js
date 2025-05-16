import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim() !== '') {
      localStorage.setItem('username', username);
      onLogin();
    } else {
      alert('Please enter a username');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      <div className="card shadow p-4" style={{ width: '350px' }}>
        <h3 className="text-center mb-4">Welcome to Attendance Tracker</h3>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Username (e.g. 111, 222, 999)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          <i className="fas fa-sign-in-alt"></i> Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
