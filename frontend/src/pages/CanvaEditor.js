import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './CanvaEditor.css';

const CanvaEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, logout } = useContext(AuthContext);
  const canvasRef = useRef(null);
  
  const [design, setDesign] = useState({
    title: 'Untitled Design',
    width: 800,
    height: 1000,
    background: '#ffffff'
  });

  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('text');
  const [zoom, setZoom] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [showMyDesigns, setShowMyDesigns] = useState(false);
  const [myDesigns, setMyDesigns] = useState([]);
  const [history, setHistory] = useState([[]]);
  const [historyStep, setHistoryStep] = useState(0);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'unsaved'
  const [currentDesignId, setCurrentDesignId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    loadMyDesigns();
    if (id) {
      openDesign(id);
    }
  }, [id]);

  // Mark as unsaved when elements or design change
  useEffect(() => {
    if (elements.length > 0 || design.title !== 'Untitled Design') {
      if (saveStatus === 'saved') {
        setSaveStatus('unsaved');
      }
    }
  }, [elements, design.background, design.title]);

  const loadMyDesigns = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const response = await axios.get('http://localhost:5000/api/designs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyDesigns(response.data);
    } catch (error) {
      console.error('Error loading designs:', error);
    }
  };

  const openDesign = async (designId) => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const response = await axios.get(`http://localhost:5000/api/designs/${designId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const loadedDesign = response.data;
      setCurrentDesignId(loadedDesign._id);
      setDesign({
        title: loadedDesign.title,
        width: loadedDesign.designData?.width || loadedDesign.dimensions?.width || 800,
        height: loadedDesign.designData?.height || loadedDesign.dimensions?.height || 1000,
        background: loadedDesign.designData?.background || '#ffffff'
      });
      setElements(loadedDesign.designData?.elements || []);
      addToHistory(loadedDesign.designData?.elements || []);
      setShowMyDesigns(false);
      setSaveStatus('saved');
    } catch (error) {
      console.error('Error loading design:', error);
    }
  };

  const addToHistory = (newElements) => {
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(JSON.parse(JSON.stringify(newElements)));
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      setElements(JSON.parse(JSON.stringify(history[historyStep - 1])));
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1);
      setElements(JSON.parse(JSON.stringify(history[historyStep + 1])));
    }
  };

  const addTextElement = (style = 'body') => {
    const styles = {
      heading: { fontSize: 32, fontWeight: 'bold', fontFamily: 'Montserrat' },
      subheading: { fontSize: 24, fontWeight: '600', fontFamily: 'Montserrat' },
      body: { fontSize: 16, fontWeight: 'normal', fontFamily: 'Arial' }
    };

    const newElement = {
      id: Date.now(),
      type: 'text',
      content: style.charAt(0).toUpperCase() + style.slice(1) + ' Text',
      x: design.width / 2 - 100,
      y: 100,
      color: '#000000',
      rotation: 0,
      opacity: 1,
      zIndex: elements.length,
      textAlign: 'left',
      ...styles[style]
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
    setSelectedElement(newElement.id);
  };

  const addShape = (shapeType) => {
    const newElement = {
      id: Date.now(),
      type: 'shape',
      shapeType: shapeType,
      x: design.width / 2 - 50,
      y: design.height / 2 - 40,
      width: 100,
      height: shapeType === 'circle' ? 100 : 80,
      fill: '#4ECDC4',
      stroke: '#000000',
      strokeWidth: 0,
      rotation: 0,
      opacity: 1,
      borderRadius: 0,
      zIndex: elements.length
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
    setSelectedElement(newElement.id);
  };

  const addImage = (url) => {
    const newElement = {
      id: Date.now(),
      type: 'image',
      url: url,
      x: design.width / 2 - 75,
      y: design.height / 2 - 75,
      width: 150,
      height: 150,
      rotation: 0,
      opacity: 1,
      borderRadius: 0,
      zIndex: elements.length
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
    setSelectedElement(newElement.id);
  };

  const updateElement = (property, value) => {
    if (!selectedElement) return;
    const newElements = elements.map(el =>
      el.id === selectedElement ? { ...el, [property]: value } : el
    );
    setElements(newElements);
    addToHistory(newElements);
  };

  const moveLayer = (direction) => {
    if (!selectedElement) return;
    const newElements = elements.map(el => {
      if (el.id === selectedElement) {
        return { ...el, zIndex: direction === 'front' ? el.zIndex + 1 : Math.max(0, el.zIndex - 1) };
      }
      return el;
    });
    setElements(newElements);
    addToHistory(newElements);
  };

  const deleteElement = () => {
    if (!selectedElement) return;
    const newElements = elements.filter(el => el.id !== selectedElement);
    setElements(newElements);
    addToHistory(newElements);
    setSelectedElement(null);
  };

  const handleMouseDown = (e, elementId) => {
    e.stopPropagation();
    setSelectedElement(elementId);
    setIsDragging(true);
    const element = elements.find(el => el.id === elementId);
    setDragStart({
      x: e.clientX - element.x,
      y: e.clientY - element.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedElement) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    
    const newElements = elements.map(el =>
      el.id === selectedElement ? { ...el, x: Math.max(0, x - dragStart.x + rect.left), y: Math.max(0, y - dragStart.y + rect.top) } : el
    );
    setElements(newElements);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      addToHistory(elements);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, selectedElement, elements, zoom]);

  const handleSave = async () => {
    try {
      setSaveStatus('saving');
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const designData = {
        title: design.title,
        designData: {
          background: design.background,
          elements: elements,
          width: design.width,
          height: design.height
        },
        dimensions: { width: design.width, height: design.height }
      };

      if (currentDesignId) {
        // Update existing design
        await axios.put(`http://localhost:5000/api/designs/${currentDesignId}`, designData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Create new design
        const response = await axios.post('http://localhost:5000/api/designs', designData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentDesignId(response.data._id);
      }
      
      setSaveStatus('saved');
      loadMyDesigns();
      
      // Show temporary success message
      setTimeout(() => {
        if (saveStatus === 'saved') setSaveStatus('saved');
      }, 2000);
    } catch (error) {
      console.error('Error saving design:', error);
      setSaveStatus('unsaved');
      alert('Failed to save design');
    }
  };

  const getSelectedElement = () => {
    return elements.find(el => el.id === selectedElement);
  };

  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);
  const selectedEl = getSelectedElement();

  return (
    <div className="canva-editor">
      {/* Top Navbar */}
      <header className="canva-navbar">
        <div className="navbar-left-section">
          <div className="logo-section">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            <span className="brand-name">PosterPro</span>
          </div>
          
          <button className="my-designs-btn" onClick={() => { setShowMyDesigns(!showMyDesigns); loadMyDesigns(); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeWidth="2"/>
            </svg>
            My Designs
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>

          {showMyDesigns && (
            <div className="my-designs-dropdown">
              <div className="dropdown-header">
                <h3>My Designs</h3>
                <button onClick={() => setShowMyDesigns(false)}>✕</button>
              </div>
              <div className="designs-list">
                {myDesigns.length === 0 ? (
                  <p className="no-designs">No designs yet. Start creating!</p>
                ) : (
                  myDesigns.map(d => (
                    <div key={d._id} className="design-item" onClick={() => openDesign(d._id)}>
                      <div className="design-thumb" style={{ background: d.designData?.background || 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                        <span>🎨</span>
                      </div>
                      <div className="design-details">
                        <h4>{d.title}</h4>
                        <p>{new Date(d.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="navbar-center">
          <input 
            type="text" 
            className="design-name-input" 
            value={design.title}
            onChange={(e) => setDesign({ ...design, title: e.target.value })}
            placeholder="Untitled Design"
          />
          <div className={`save-status save-status-${saveStatus}`}>
            {saveStatus === 'saved' && (
              <>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Saved
              </>
            )}
            {saveStatus === 'saving' && (
              <>
                <svg className="spinner" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                Saving...
              </>
            )}
            {saveStatus === 'unsaved' && (
              <>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                Unsaved changes
              </>
            )}
          </div>
        </div>

        <div className="navbar-right-section">
          <button className="nav-btn" onClick={logout}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <button className="tool-btn" onClick={undo} disabled={historyStep === 0} title="Undo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 7v6h6M21 17v-6h-6" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20.49 9A9 9 0 005.64 5.64L3 7" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="tool-btn" onClick={redo} disabled={historyStep === history.length - 1} title="Redo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 7v6h-6M3 17v-6h6" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3.51 9a9 9 0 0114.85-3.36L21 7" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="toolbar-center">
          <button className="tool-btn" onClick={() => setZoom(Math.max(0.25, zoom - 0.25))} title="Zoom Out">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35M8 11h6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <span className="zoom-level">{Math.round(zoom * 100)}%</span>
          <button className="tool-btn" onClick={() => setZoom(Math.min(2, zoom + 0.25))} title="Zoom In">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="toolbar-right">
          <button className="tool-btn btn-ai">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="2"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2"/>
            </svg>
            AI Auto-Design
          </button>
          <button className="tool-btn btn-primary" onClick={handleSave}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" strokeWidth="2"/>
              <polyline points="17 21 17 13 7 13 7 21" strokeWidth="2"/>
            </svg>
            Save
          </button>
          <button className="tool-btn btn-success">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5-5 5 5M12 5v12" strokeWidth="2"/>
            </svg>
            Download
          </button>
          <button className="tool-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="18" cy="5" r="3" strokeWidth="2"/>
              <circle cx="6" cy="12" r="3" strokeWidth="2"/>
              <circle cx="18" cy="19" r="3" strokeWidth="2"/>
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" strokeWidth="2"/>
            </svg>
            Share
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="workspace">
        {/* Left Tools Panel */}
        <aside className="left-panel">
          {/* Quick Add Section */}
          <div style={{ padding: '1rem', borderBottom: '1px solid #2d3561' }}>
            <button 
              className="add-element-btn" 
              style={{ marginBottom: '0.75rem', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
              onClick={() => setActiveLeftTab('text')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ display: 'inline-block', marginRight: '0.5rem', verticalAlign: 'middle' }}>
                <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2"/>
                <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2"/>
              </svg>
              <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>Add Element</span>
            </button>
          </div>

          <div className="panel-tabs">
            <button className={`panel-tab ${activeLeftTab === 'text' ? 'active' : ''}`} onClick={() => setActiveLeftTab('text')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="4 7 4 4 20 4 20 7" strokeWidth="2"/>
                <line x1="9" y1="20" x2="15" y2="20" strokeWidth="2"/>
                <line x1="12" y1="4" x2="12" y2="20" strokeWidth="2"/>
              </svg>
              <span>Text</span>
            </button>
            <button className={`panel-tab ${activeLeftTab === 'shapes' ? 'active' : ''}`} onClick={() => setActiveLeftTab('shapes')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              </svg>
              <span>Shapes</span>
            </button>
            <button className={`panel-tab ${activeLeftTab === 'images' ? 'active' : ''}`} onClick={() => setActiveLeftTab('images')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2"/>
                <polyline points="21 15 16 10 5 21" strokeWidth="2"/>
              </svg>
              <span>Images</span>
            </button>
            <button className={`panel-tab ${activeLeftTab === 'background' ? 'active' : ''}`} onClick={() => setActiveLeftTab('background')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="2" strokeWidth="2"/>
              </svg>
              <span>Background</span>
            </button>
            <button className={`panel-tab ${activeLeftTab === 'templates' ? 'active' : ''}`} onClick={() => setActiveLeftTab('templates')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="7" height="7" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" strokeWidth="2"/>
              </svg>
              <span>Templates</span>
            </button>
          </div>

          <div className="panel-content">
            {activeLeftTab === 'text' && (
              <div className="tool-section">
                <h3>Add Text</h3>
                <button className="add-element-btn" onClick={() => addTextElement('heading')}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Add Heading</span>
                </button>
                <button className="add-element-btn" onClick={() => addTextElement('subheading')}>
                  <span style={{ fontSize: '18px', fontWeight: '600' }}>Add Subheading</span>
                </button>
                <button className="add-element-btn" onClick={() => addTextElement('body')}>
                  <span style={{ fontSize: '14px' }}>Add Body Text</span>
                </button>
              </div>
            )}

            {activeLeftTab === 'shapes' && (
              <div className="tool-section">
                <h3>Shapes & Icons</h3>
                <div className="shapes-grid">
                  <button className="shape-btn" onClick={() => addShape('rectangle')}>
                    <div className="shape-preview rectangle"></div>
                    Rectangle
                  </button>
                  <button className="shape-btn" onClick={() => addShape('circle')}>
                    <div className="shape-preview circle"></div>
                    Circle
                  </button>
                  <button className="shape-btn" onClick={() => addShape('triangle')}>
                    <div className="shape-preview triangle"></div>
                    Triangle
                  </button>
                  <button className="shape-btn" onClick={() => addShape('star')}>
                    <div className="shape-preview star"></div>
                    Star
                  </button>
                </div>
              </div>
            )}

            {activeLeftTab === 'images' && (
              <div className="tool-section">
                <h3>Images & Uploads</h3>
                <div className="stock-images">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/200/200?random=${i}`}
                      alt={`Stock ${i}`}
                      className="stock-img"
                      onClick={() => addImage(`https://picsum.photos/200/200?random=${i}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeLeftTab === 'background' && (
              <div className="tool-section">
                <h3>Backgrounds</h3>
                <div className="color-grid">
                  {['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#adb5bd', '#6c757d', '#495057', '#343a40', '#212529', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'].map(color => (
                    <button 
                      key={color}
                      className="color-swatch"
                      style={{ background: color }}
                      onClick={() => setDesign({ ...design, background: color })}
                    ></button>
                  ))}
                </div>
                <h4>Gradients</h4>
                <div className="gradient-grid">
                  {[
                    'linear-gradient(135deg, #667eea, #764ba2)',
                    'linear-gradient(135deg, #f093fb, #f5576c)',
                    'linear-gradient(135deg, #4facfe, #00f2fe)',
                    'linear-gradient(135deg, #43e97b, #38f9d7)'
                  ].map((grad, i) => (
                    <button 
                      key={i}
                      className="gradient-swatch"
                      style={{ background: grad }}
                      onClick={() => setDesign({ ...design, background: grad })}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            {activeLeftTab === 'templates' && (
              <div className="tool-section">
                <h3>Templates</h3>
                <p className="coming-soon">Pre-made templates coming soon!</p>
              </div>
            )}
          </div>
        </aside>

        {/* Canvas Area */}
        <main className="canvas-workspace">
          <div className="canvas-container" style={{ transform: `scale(${zoom})` }}>
            <div 
              className="design-canvas"
              ref={canvasRef}
              style={{
                width: `${design.width}px`,
                height: `${design.height}px`,
                background: design.background
              }}
              onClick={() => setSelectedElement(null)}
            >
              {sortedElements.map(element => {
                if (element.type === 'text') {
                  return (
                    <div
                      key={element.id}
                      className={`canvas-element text-element ${selectedElement === element.id ? 'selected' : ''}`}
                      style={{
                        left: `${element.x}px`,
                        top: `${element.y}px`,
                        fontSize: `${element.fontSize}px`,
                        fontFamily: element.fontFamily,
                        fontWeight: element.fontWeight,
                        color: element.color,
                        textAlign: element.textAlign,
                        transform: `rotate(${element.rotation}deg)`,
                        opacity: element.opacity,
                        zIndex: element.zIndex
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement(element.id); }}
                      onMouseDown={(e) => handleMouseDown(e, element.id)}
                    >
                      {element.content}
                    </div>
                  );
                }

                if (element.type === 'image') {
                  return (
                    <img
                      key={element.id}
                      src={element.url}
                      alt="Design element"
                      className={`canvas-element image-element ${selectedElement === element.id ? 'selected' : ''}`}
                      style={{
                        left: `${element.x}px`,
                        top: `${element.y}px`,
                        width: `${element.width}px`,
                        height: `${element.height}px`,
                        transform: `rotate(${element.rotation}deg)`,
                        opacity: element.opacity,
                        borderRadius: `${element.borderRadius}px`,
                        zIndex: element.zIndex
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement(element.id); }}
                      onMouseDown={(e) => handleMouseDown(e, element.id)}
                    />
                  );
                }

                if (element.type === 'shape') {
                  return (
                    <div
                      key={element.id}
                      className={`canvas-element shape-element ${selectedElement === element.id ? 'selected' : ''}`}
                      style={{
                        left: `${element.x}px`,
                        top: `${element.y}px`,
                        width: `${element.width}px`,
                        height: `${element.height}px`,
                        background: element.fill,
                        border: `${element.strokeWidth}px solid ${element.stroke}`,
                        borderRadius: element.shapeType === 'circle' ? '50%' : `${element.borderRadius}px`,
                        transform: `rotate(${element.rotation}deg)`,
                        opacity: element.opacity,
                        zIndex: element.zIndex
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement(element.id); }}
                      onMouseDown={(e) => handleMouseDown(e, element.id)}
                    />
                  );
                }

                return null;
              })}
            </div>
          </div>

          {/* Preview Button */}
          <button className="preview-btn" onClick={() => setShowPreview(!showPreview)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeWidth="2"/>
              <circle cx="12" cy="12" r="3" strokeWidth="2"/>
            </svg>
            Preview Poster
          </button>
        </main>

        {/* Right Properties Panel */}
        <aside className="right-panel">
          <h3 className="panel-title">Properties</h3>
          
          {!selectedEl ? (
            <div className="no-selection">
              <p>Select an element to edit its properties</p>
            </div>
          ) : (
            <div className="properties-content">
              {selectedEl.type === 'text' && (
                <>
                  <div className="prop-group">
                    <label>Text Content</label>
                    <textarea 
                      value={selectedEl.content}
                      onChange={(e) => updateElement('content', e.target.value)}
                      rows="3"
                    />
                  </div>
                  <div className="prop-group">
                    <label>Font Family</label>
                    <select value={selectedEl.fontFamily} onChange={(e) => updateElement('fontFamily', e.target.value)}>
                      <option>Arial</option>
                      <option>Helvetica</option>
                      <option>Montserrat</option>
                      <option>Roboto</option>
                      <option>Open Sans</option>
                      <option>Playfair Display</option>
                    </select>
                  </div>
                  <div className="prop-row">
                    <div className="prop-group">
                      <label>Size</label>
                      <input type="number" value={selectedEl.fontSize} onChange={(e) => updateElement('fontSize', parseInt(e.target.value))} />
                    </div>
                    <div className="prop-group">
                      <label>Color</label>
                      <input type="color" value={selectedEl.color} onChange={(e) => updateElement('color', e.target.value)} />
                    </div>
                  </div>
                  <div className="prop-group">
                    <label>Alignment</label>
                    <div className="btn-group">
                      <button className={selectedEl.textAlign === 'left' ? 'active' : ''} onClick={() => updateElement('textAlign', 'left')}>L</button>
                      <button className={selectedEl.textAlign === 'center' ? 'active' : ''} onClick={() => updateElement('textAlign', 'center')}>C</button>
                      <button className={selectedEl.textAlign === 'right' ? 'active' : ''} onClick={() => updateElement('textAlign', 'right')}>R</button>
                    </div>
                  </div>
                </>
              )}

              {selectedEl.type === 'shape' && (
                <>
                  <div className="prop-row">
                    <div className="prop-group">
                      <label>Width</label>
                      <input type="number" value={selectedEl.width} onChange={(e) => updateElement('width', parseInt(e.target.value))} />
                    </div>
                    <div className="prop-group">
                      <label>Height</label>
                      <input type="number" value={selectedEl.height} onChange={(e) => updateElement('height', parseInt(e.target.value))} />
                    </div>
                  </div>
                  <div className="prop-group">
                    <label>Fill Color</label>
                    <input type="color" value={selectedEl.fill} onChange={(e) => updateElement('fill', e.target.value)} />
                  </div>
                  <div className="prop-group">
                    <label>Border Radius</label>
                    <input type="range" min="0" max="100" value={selectedEl.borderRadius || 0} onChange={(e) => updateElement('borderRadius', parseInt(e.target.value))} />
                  </div>
                </>
              )}

              {selectedEl.type === 'image' && (
                <>
                  <div className="prop-row">
                    <div className="prop-group">
                      <label>Width</label>
                      <input type="number" value={selectedEl.width} onChange={(e) => updateElement('width', parseInt(e.target.value))} />
                    </div>
                    <div className="prop-group">
                      <label>Height</label>
                      <input type="number" value={selectedEl.height} onChange={(e) => updateElement('height', parseInt(e.target.value))} />
                    </div>
                  </div>
                  <div className="prop-group">
                    <label>Border Radius</label>
                    <input type="range" min="0" max="100" value={selectedEl.borderRadius || 0} onChange={(e) => updateElement('borderRadius', parseInt(e.target.value))} />
                  </div>
                </>
              )}

              <div className="prop-group">
                <label>Rotation</label>
                <input type="range" min="0" max="360" value={selectedEl.rotation} onChange={(e) => updateElement('rotation', parseInt(e.target.value))} />
                <span>{selectedEl.rotation}°</span>
              </div>

              <div className="prop-group">
                <label>Opacity</label>
                <input type="range" min="0" max="1" step="0.1" value={selectedEl.opacity} onChange={(e) => updateElement('opacity', parseFloat(e.target.value))} />
                <span>{Math.round(selectedEl.opacity * 100)}%</span>
              </div>

              <div className="prop-group">
                <label>Layer Position</label>
                <div className="btn-group">
                  <button onClick={() => moveLayer('front')}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17 8l4-4m0 0l-4-4m4 4H3" strokeWidth="2"/>
                    </svg>
                    Front
                  </button>
                  <button onClick={() => moveLayer('back')}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M7 16l-4 4m0 0l4 4m-4-4h18" strokeWidth="2"/>
                    </svg>
                    Back
                  </button>
                </div>
              </div>

              <button className="delete-btn" onClick={deleteElement}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="3 6 5 6 21 6" strokeWidth="2"/>
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="2"/>
                </svg>
                Delete Element
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="preview-modal" onClick={() => setShowPreview(false)}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <button className="preview-close" onClick={() => setShowPreview(false)}>✕</button>
            <h2>Preview: {design.title}</h2>
            <div className="preview-canvas" style={{
              width: `${design.width}px`,
              height: `${design.height}px`,
              background: design.background,
              position: 'relative',
              margin: '0 auto',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
            }}>
              {sortedElements.map(element => {
                if (element.type === 'text') {
                  return (
                    <div key={element.id} style={{
                      position: 'absolute',
                      left: `${element.x}px`,
                      top: `${element.y}px`,
                      fontSize: `${element.fontSize}px`,
                      fontFamily: element.fontFamily,
                      fontWeight: element.fontWeight,
                      color: element.color,
                      textAlign: element.textAlign,
                      transform: `rotate(${element.rotation}deg)`,
                      opacity: element.opacity
                    }}>
                      {element.content}
                    </div>
                  );
                }
                if (element.type === 'image') {
                  return (
                    <img key={element.id} src={element.url} alt="" style={{
                      position: 'absolute',
                      left: `${element.x}px`,
                      top: `${element.y}px`,
                      width: `${element.width}px`,
                      height: `${element.height}px`,
                      transform: `rotate(${element.rotation}deg)`,
                      opacity: element.opacity,
                      borderRadius: `${element.borderRadius}px`
                    }} />
                  );
                }
                if (element.type === 'shape') {
                  return (
                    <div key={element.id} style={{
                      position: 'absolute',
                      left: `${element.x}px`,
                      top: `${element.y}px`,
                      width: `${element.width}px`,
                      height: `${element.height}px`,
                      background: element.fill,
                      border: `${element.strokeWidth}px solid ${element.stroke}`,
                      borderRadius: element.shapeType === 'circle' ? '50%' : `${element.borderRadius}px`,
                      transform: `rotate(${element.rotation}deg)`,
                      opacity: element.opacity
                    }} />
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvaEditor;
