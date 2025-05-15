import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [empId, setEmpId] = useState('');
  const [role, setRole] = useState('employee');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!empId) return alert('Enter a valid Employee ID');
    localStorage.setItem('username', empId);
    localStorage.setItem('role', role);
    onLogin();
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <label>Employee ID:</label><br />
        <input
          type="number"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
          required
        /><br /><br />

        <label>Role:</label><br />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select><br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
