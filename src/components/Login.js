import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // ✅ prevents full page reload
    if (username.trim() !== '') {
      navigate('/dashboard'); // ✅ route to dashboard
    } else {
      alert('Please enter a username');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
