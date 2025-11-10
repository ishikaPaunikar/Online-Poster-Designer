import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './NewHome.css';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [posterData, setPosterData] = useState({
    title: '',
    subtitle: '',
    width: '800',
    height: '1000',
    theme: 'modern',
    category: 'poster'
  });

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      if (!token) return;
      
      const response = await axios.get('http://localhost:5000/api/designs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDesigns(response.data);
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  };

  const handleCreatePoster = async () => {
    if (!posterData.title.trim()) {
      alert('Please enter a title for your poster');
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const newDesign = {
        title: posterData.title,
        designData: {
          subtitle: posterData.subtitle,
          theme: posterData.theme,
          background: posterData.theme === 'modern' ? 'linear-gradient(135deg, #667eea, #764ba2)' :
                      posterData.theme === 'classic' ? 'linear-gradient(135deg, #f093fb, #f5576c)' :
                      posterData.theme === 'minimal' ? 'linear-gradient(135deg, #4facfe, #00f2fe)' :
                      'linear-gradient(135deg, #43e97b, #38f9d7)',
          elements: [],
          width: parseInt(posterData.width),
          height: parseInt(posterData.height)
        },
        category: posterData.category,
        dimensions: {
          width: parseInt(posterData.width),
          height: parseInt(posterData.height)
        }
      };

      const response = await axios.post('http://localhost:5000/api/designs', newDesign, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setShowModal(false);
      setPosterData({ title: '', subtitle: '', width: '800', height: '1000', theme: 'modern', category: 'poster' });
      
      // Navigate directly to editor with the new design ID
      navigate(`/editor/${response.data._id}`);
    } catch (error) {
      console.error('Error creating design:', error);
      alert('Failed to create design');
    }
  };

  const handleDeleteDesign = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this design?')) {
      try {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        await axios.delete(`http://localhost:5000/api/designs/${id}`, {
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

  const sampleTemplates = [
    { id: 1, title: 'Event Poster', category: 'Event', color: '#FF6B6B' },
    { id: 2, title: 'Sale Flyer', category: 'Business', color: '#4ECDC4' },
    { id: 3, title: 'Concert Poster', category: 'Music', color: '#45B7D1' },
    { id: 4, title: 'Workshop Flyer', category: 'Education', color: '#96CEB4' },
    { id: 5, title: 'Product Launch', category: 'Marketing', color: '#FFEAA7' },
    { id: 6, title: 'Party Invitation', category: 'Social', color: '#DFE6E9' },
  ];

  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <nav className="navbar glass-effect">
        <div className="container navbar-content">
          <div className="navbar-brand">
            <div className="logo">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </div>
            <span className="brand-name gradient-text">PosterPro</span>
          </div>
          <div className="navbar-actions">
            <span className="user-greeting">Hello, <strong>{user?.name || 'User'}</strong></span>
            <button className="btn-logout" onClick={logout}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* My Designs Section - Always at top */}
      <section className="my-designs-section">
        <div className="container">
          <div className="section-header-main">
            <div>
              <h2 className="section-title">My Designs</h2>
              <p className="section-subtitle">Continue working on your creative projects</p>
            </div>
            {designs.length > 0 && (
              <span className="designs-count">{designs.length} {designs.length === 1 ? 'Design' : 'Designs'}</span>
            )}
          </div>
          
          {designs.length > 0 ? (
            <div className="designs-grid">
              {designs.map(design => (
                <div key={design._id} className="design-card" onClick={() => navigate(`/editor/${design._id}`)}>
                  <div className="design-preview" style={{ background: design.designData?.background || 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                    {design.designData?.elements?.length > 0 ? (
                      <div className="preview-overlay">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="white" opacity="0.9">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                      </div>
                    ) : (
                      <div className="empty-preview">
                        <span className="design-icon">🎨</span>
                      </div>
                    )}
                  </div>
                  <div className="design-info">
                    <h3 className="design-title">{design.title}</h3>
                    <div className="design-meta-row">
                      <span className="design-category">{design.category || 'poster'}</span>
                      <span className="design-date">{formatDate(design.createdAt)}</span>
                    </div>
                  </div>
                  <div className="card-actions-hover">
                    <button className="action-btn edit-btn" onClick={(e) => { e.stopPropagation(); navigate(`/editor/${design._id}`); }} title="Edit">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      Edit
                    </button>
                    <button className="action-btn delete-btn" onClick={(e) => handleDeleteDesign(design._id, e)} title="Delete">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              <h3>No designs yet</h3>
              <p>Create your first poster to get started</p>
            </div>
          )}
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Design Stunning <span className="gradient-text">Posters & Flyers</span>
            </h1>
            <p className="hero-description">
              Create professional designs in minutes with our easy-to-use tools and beautiful templates
            </p>
            <button className="btn-create-poster" onClick={() => setShowModal(true)}>
              <div className="btn-icon">
                <svg width="28" height="28" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="btn-text">
                <span className="btn-label">Create New Poster</span>
                <span className="btn-sublabel">Start from scratch or use a template</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="templates-section container">
        <div className="section-header">
          <h2 className="section-title">Popular Templates</h2>
          <p className="section-subtitle">Choose from our professionally designed templates</p>
        </div>

        <div className="templates-grid">
          {sampleTemplates.map((template) => (
            <div key={template.id} className="template-card" onClick={() => setShowModal(true)}>
              <div className="template-preview" style={{ background: `linear-gradient(135deg, ${template.color}dd, ${template.color})` }}>
                <div className="template-overlay">
                  <button className="icon-btn">
                    <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="template-info">
                <h4 className="template-title">{template.title}</h4>
                <span className="template-category">{template.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Designs Section */}
      {designs.length > 0 && (
        <section className="recent-designs-section container">
          <div className="section-header">
            <h2 className="section-title">Your Recent Designs</h2>
            <p className="section-subtitle">Continue working on your projects</p>
          </div>

          <div className="designs-grid">
            {designs.slice(0, 6).map((design) => (
              <div key={design._id} className="design-card">
                <div className="design-thumbnail">
                  <div className="thumbnail-placeholder">
                    <svg width="48" height="48" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div className="design-actions">
                    <button className="icon-btn">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
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
        </section>
      )}

      {/* Create Poster Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content glass-effect" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create New Poster</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Poster Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Summer Music Festival"
                  value={posterData.title}
                  onChange={(e) => setPosterData({ ...posterData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subtitle</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Join us for an amazing event"
                  value={posterData.subtitle}
                  onChange={(e) => setPosterData({ ...posterData, subtitle: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Width (px)</label>
                  <select
                    className="form-input"
                    value={posterData.width}
                    onChange={(e) => setPosterData({ ...posterData, width: e.target.value })}
                  >
                    <option value="800">800px (Portrait)</option>
                    <option value="1000">1000px (Wide)</option>
                    <option value="1200">1200px (Extra Wide)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Height (px)</label>
                  <select
                    className="form-input"
                    value={posterData.height}
                    onChange={(e) => setPosterData({ ...posterData, height: e.target.value })}
                  >
                    <option value="1000">1000px (Standard)</option>
                    <option value="1200">1200px (Tall)</option>
                    <option value="1400">1400px (Extra Tall)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Theme</label>
                <div className="theme-grid">
                  {['modern', 'classic', 'minimal', 'vibrant'].map((theme) => (
                    <div
                      key={theme}
                      className={`theme-option ${posterData.theme === theme ? 'active' : ''}`}
                      onClick={() => setPosterData({ ...posterData, theme })}
                    >
                      <div className={`theme-preview theme-${theme}`}></div>
                      <span className="theme-name">{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <div className="category-pills">
                  {['poster', 'flyer', 'invitation'].map((cat) => (
                    <button
                      key={cat}
                      className={`category-pill ${posterData.category === cat ? 'active' : ''}`}
                      onClick={() => setPosterData({ ...posterData, category: cat })}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleCreatePoster}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/>
                </svg>
                Create Poster
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
