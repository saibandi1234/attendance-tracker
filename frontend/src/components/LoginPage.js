import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('Employee');

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-pink-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">Employee Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
          >
            <option>Employee</option>
          </select>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
