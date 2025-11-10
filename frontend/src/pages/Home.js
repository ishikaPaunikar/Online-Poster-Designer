import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [posterData, setPosterData] = useState({
    title: '',
    subtitle: '',
    width: '800',
    height: '1000',
    theme: 'modern'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const response = await axios.get('/api/designs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDesigns(response.data);
    } catch (error) {
      console.error('Error fetching designs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    navigate('/editor');
  };

  const handleOpenDesign = (id) => {
    navigate(`/editor/${id}`);
  };

  const handleDeleteDesign = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this design?')) {
      try {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        await axios.delete(`/api/designs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDesigns(designs.filter(d => d._id !== id));
      } catch (error) {
        console.error('Error deleting design:', error);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            Welcome back, <span className="gradient-text">{user?.name}</span>
          </h1>
          <p className="hero-subtitle">
            Create stunning posters and flyers with our professional design tools
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={handleCreateNew}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/>
              </svg>
              Create New Design
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/templates')}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              Browse Templates
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section container">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
            <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{designs.length}</h3>
            <p className="stat-label">Total Designs</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
            <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{designs.filter(d => d.category === 'poster').length}</h3>
            <p className="stat-label">Posters</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
            <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{designs.filter(d => d.category === 'flyer').length}</h3>
            <p className="stat-label">Flyers</p>
          </div>
        </div>
      </div>

      {/* Recent Designs Section */}
      <div className="designs-section container">
        <div className="section-header">
          <h2 className="section-title">Recent Designs</h2>
          {designs.length > 0 && (
            <button className="btn btn-outline" onClick={() => navigate('/history')}>
              View All
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your designs...</p>
          </div>
        ) : designs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="64" height="64" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3>No designs yet</h3>
            <p>Start creating your first poster or flyer design</p>
            <button className="btn btn-primary" onClick={handleCreateNew}>
              Create Your First Design
            </button>
          </div>
        ) : (
          <div className="designs-grid">
            {designs.slice(0, 6).map((design) => (
              <div 
                key={design._id} 
                className="design-card" 
                onClick={() => handleOpenDesign(design._id)}
              >
                <div className="design-thumbnail">
                  {design.thumbnail ? (
                    <img src={design.thumbnail} alt={design.title} />
                  ) : (
                    <div className="thumbnail-placeholder">
                      <svg width="48" height="48" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  )}
                  <div className="design-overlay">
                    <button className="icon-btn" onClick={() => handleOpenDesign(design._id)}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                      </svg>
                    </button>
                    <button className="icon-btn" onClick={(e) => handleDeleteDesign(design._id, e)}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="design-info">
                  <h4 className="design-title">{design.title}</h4>
                  <div className="design-meta">
                    <span className="design-category">{design.category}</span>
                    <span className="design-date">{formatDate(design.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
