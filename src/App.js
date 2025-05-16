import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div style={{ 
      padding: '30px', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh' 
    }}>
      <Dashboard />
    </div>
  );
}

export default App;
