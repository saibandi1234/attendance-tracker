import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('Employee');

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    window.location.href = "/dashboard"; // Adjust based on your routing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Login to Attendance Tracker</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option>Employee</option>
            <option>Manager</option>
            <option>Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
