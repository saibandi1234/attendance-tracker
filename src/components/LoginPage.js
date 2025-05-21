import React, { useState } from "react";
import Dashboard from "./Dashboard";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!role || !username) {
      alert("Please select a role and enter your ID");
      return;
    }

    if (role === "admin" && username !== "2803") {
      alert("Admin must use ID 2803");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    setIsLoggedIn(true);
  };

  if (isLoggedIn) return <Dashboard />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 to-blue-300 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1">Select Role</label>
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
            <label className="block mb-1">Enter ID</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
