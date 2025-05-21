import React, { useState } from 'react';
import Dashboard from './Dashboard';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

const handleLogin = () => {
  if (!role || !username) {
    alert("Please select a role and enter an ID");
    return;
  }

  // Admin access restriction
  if (role === 'admin' && username !== '2803') {
    alert("Admin must use ID 2803");
    return;
  }

localStorage.setItem("role", role);
localStorage.setItem("username", username);
window.location.reload();
};

  if (isLoggedIn) return <Dashboard />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 to-blue-300 flex items-center justify-center">
      <div className="bg-white shadow-md p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Role</label>
            <select
              className="border p-2 rounded w-full"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">-- Select Role --</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Enter ID</label>
            <input
              type="text"
              placeholder="Enter your ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
