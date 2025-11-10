import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div className="success">
        Welcome back, {user?.name}!
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>User Information</h3>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>User ID:</strong> {user?._id}</p>
      </div>
      
      <button
        onClick={logout}
        style={{
          marginTop: '20px',
          backgroundColor: '#dc3545'
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;