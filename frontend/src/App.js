import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import NewHome from './pages/NewHome';
import CanvaEditor from './pages/CanvaEditor';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f7ff 0%, #ffffff 50%, #e6f2ff 100%)'
      }}>
        <h2 style={{ color: '#4da6ff' }}>Loading...</h2>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <NewHome />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/editor/:id" 
              element={
                <PrivateRoute>
                  <CanvaEditor />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/editor" 
              element={
                <PrivateRoute>
                  <CanvaEditor />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;