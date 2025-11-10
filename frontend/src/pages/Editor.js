import React, { useState, useRef, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './Editor.css';

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const canvasRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [zoom, setZoom] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [showMyDesigns, setShowMyDesigns] = useState(false);
  const [myDesigns, setMyDesigns] = useState([]);
  
  const [design, setDesign] = useState({
    title: 'Untitled Design',
    width: 800,
    height: 1000,
    theme: 'modern',
    background: '#ffffff'
  });

  const [activeTab, setActiveTab] = useState('text');
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);
  const [layers, setLayers] = useState([]);
  const [showAITemplates, setShowAITemplates] = useState(false);
  const [fonts] = useState(['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Comic Sans MS', 'Impact', 'Courier New', 'Playfair Display', 'Montserrat', 'Roboto', 'Open Sans']);
  const [colors] = useState(['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788']);

  // Text tool state
  const [textSettings, setTextSettings] = useState({
    content: 'Your Text Here',
    fontFamily: 'Montserrat',
    fontSize: 24,
    color: '#000000',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left'
  });

  // Image tool state
  const [imageSettings, setImageSettings] = useState({
    url: '',
    width: 200,
    height: 200
  });

  // Shape tool state
  const [shapeSettings, setShapeSettings] = useState({
    type: 'rectangle',
    width: 150,
    height: 150,
    fill: '#4ECDC4',
    stroke: '#000000',
    strokeWidth: 2
  });

  useEffect(() => {
    if (id) {
      loadDesign();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadDesign = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const response = await axios.get(`http://localhost:5000/api/designs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDesign(response.data);
      setElements(response.data.designData?.elements || []);
      addToHistory(response.data.designData?.elements || []);
    } catch (error) {
      console.error('Error loading design:', error);
    }
  };

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

  const zoomIn = () => setZoom(Math.min(zoom + 0.1, 2));
  const zoomOut = () => setZoom(Math.max(zoom - 0.1, 0.5));

  const addTextElement = () => {
    const newElement = {
      id: Date.now(),
      type: 'text',
      x: 100,
      y: 100,
      rotation: 0,
      opacity: 1,
      zIndex: elements.length,
      ...textSettings
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    setLayers([...layers, { id: newElement.id, name: 'Text Layer', visible: true, locked: false }]);
    addToHistory(newElements);
    setSelectedElement(newElement.id);
  };

  const addImageElement = () => {
    if (!imageSettings.url) {
      alert('Please enter an image URL');
      return;
    }
    const newElement = {
      id: Date.now(),
      type: 'image',
      x: 100,
      y: 100,
      rotation: 0,
      opacity: 1,
      zIndex: elements.length,
      ...imageSettings
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    setLayers([...layers, { id: newElement.id, name: 'Image Layer', visible: true, locked: false }]);
    addToHistory(newElements);
    setSelectedElement(newElement.id);
  };

  const addShapeElement = () => {
    const newElement = {
      id: Date.now(),
      type: 'shape',
      x: 100,
      y: 100,
      rotation: 0,
      opacity: 1,
      zIndex: elements.length,
      borderRadius: 0,
      ...shapeSettings
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    setLayers([...layers, { id: newElement.id, name: 'Shape Layer', visible: true, locked: false }]);
    addToHistory(newElements);
    setSelectedElement(newElement.id);
  };

  const updateSelectedElement = (property, value) => {
    if (!selectedElement) return;
    const newElements = elements.map(el =>
      el.id === selectedElement ? { ...el, [property]: value } : el
    );
    setElements(newElements);
    addToHistory(newElements);
  };

  const moveLayerUp = () => {
    if (!selectedElement) return;
    const newElements = elements.map(el => {
      if (el.id === selectedElement) {
        return { ...el, zIndex: el.zIndex + 1 };
      }
      return el;
    });
    setElements(newElements);
    addToHistory(newElements);
  };

  const moveLayerDown = () => {
    if (!selectedElement) return;
    const newElements = elements.map(el => {
      if (el.id === selectedElement && el.zIndex > 0) {
        return { ...el, zIndex: el.zIndex - 1 };
      }
      return el;
    });
    setElements(newElements);
    addToHistory(newElements);
  };

  const deleteElement = (elementId) => {
    const newElements = elements.filter(el => el.id !== elementId);
    setElements(newElements);
    setLayers(layers.filter(layer => layer.id !== elementId));
    if (selectedElement === elementId) setSelectedElement(null);
    addToHistory(newElements);
  };

  const toggleLayerVisibility = (layerId) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const toggleLayerLock = (layerId) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, locked: !layer.locked } : layer
    ));
  };

  const handleSave = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const designData = {
        ...design,
        designData: {
          background: design.background,
          elements: elements
        }
      };

      if (id) {
        await axios.put(`http://localhost:5000/api/designs/${id}`, designData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Design saved successfully!');
      } else {
        const response = await axios.post('http://localhost:5000/api/designs', designData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        navigate(`/editor/${response.data._id}`);
      }
    } catch (error) {
      console.error('Error saving design:', error);
      alert('Failed to save design');
    }
  };

  const handleExport = () => {
    alert('Export functionality - Would download as PNG/PDF');
  };

  const handleShare = () => {
    alert('Share functionality - Would generate shareable link');
  };

  const aiTemplates = [
    { id: 1, name: 'Modern Event', preview: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 2, name: 'Business Pro', preview: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 3, name: 'Minimal Clean', preview: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 4, name: 'Vibrant Summer', preview: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { id: 5, name: 'Dark Elegant', preview: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' },
    { id: 6, name: 'Sunset Vibes', preview: 'linear-gradient(135deg, #ff6a00, #ee0979)' }
  ];

  const applyAITemplate = (template) => {
    setDesign({ ...design, background: template.preview });
    setShowAITemplates(false);
    alert(`Applied ${template.name} template!`);
  };

  return (
    <div className="editor-page">
      {/* Top Header */}
      <header className="editor-header">
        <div className="header-left">
          <button className="btn-back" onClick={() => navigate('/')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <input 
            type="text" 
            className="design-title-input" 
            value={design.title}
            onChange={(e) => setDesign({ ...design, title: e.target.value })}
          />
        </div>
        
        <div className="header-actions">
          <button className="btn-header btn-ai" onClick={() => setShowAITemplates(!showAITemplates)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            AI Templates
          </button>
          <button className="btn-header" onClick={handleSave}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="17 21 17 13 7 13 7 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="7 3 7 8 15 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Save
          </button>
          <button className="btn-header btn-export" onClick={handleExport}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5-5 5 5M12 5v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Export
          </button>
          <button className="btn-header btn-share" onClick={handleShare}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="18" cy="5" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="6" cy="12" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="18" cy="19" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Share
          </button>
        </div>
      </header>

      {/* AI Templates Modal */}
      {showAITemplates && (
        <div className="ai-templates-panel">
          <div className="templates-header">
            <h3>AI-Generated Templates</h3>
            <button onClick={() => setShowAITemplates(false)}>✕</button>
          </div>
          <div className="templates-grid">
            {aiTemplates.map(template => (
              <div key={template.id} className="template-item" onClick={() => applyAITemplate(template)}>
                <div className="template-preview" style={{ background: template.preview }}></div>
                <p>{template.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="editor-workspace">
        {/* Left Sidebar - Tools */}
        <aside className="tools-sidebar">
          <div className="tool-tabs">
            <button className={`tool-tab ${activeTab === 'text' ? 'active' : ''}`} onClick={() => setActiveTab('text')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="4 7 4 4 20 4 20 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="9" y1="20" x2="15" y2="20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="4" x2="12" y2="20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Text
            </button>
            <button className={`tool-tab ${activeTab === 'images' ? 'active' : ''}`} onClick={() => setActiveTab('images')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="21 15 16 10 5 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Images
            </button>
            <button className={`tool-tab ${activeTab === 'shapes' ? 'active' : ''}`} onClick={() => setActiveTab('shapes')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Shapes
            </button>
            <button className={`tool-tab ${activeTab === 'background' ? 'active' : ''}`} onClick={() => setActiveTab('background')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Background
            </button>
          </div>

          <div className="tool-content">
            {/* Text Tool */}
            {activeTab === 'text' && (
              <div className="tool-panel">
                <h3>Text Editor</h3>
                <div className="form-group">
                  <label>Text Content</label>
                  <textarea 
                    value={textSettings.content}
                    onChange={(e) => setTextSettings({ ...textSettings, content: e.target.value })}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Font Family</label>
                  <select value={textSettings.fontFamily} onChange={(e) => setTextSettings({ ...textSettings, fontFamily: e.target.value })}>
                    {fonts.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Size</label>
                    <input type="number" value={textSettings.fontSize} onChange={(e) => setTextSettings({ ...textSettings, fontSize: parseInt(e.target.value) })} min="8" max="200" />
                  </div>
                  <div className="form-group">
                    <label>Color</label>
                    <input type="color" value={textSettings.color} onChange={(e) => setTextSettings({ ...textSettings, color: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Style</label>
                  <div className="button-group">
                    <button className={textSettings.fontWeight === 'bold' ? 'active' : ''} onClick={() => setTextSettings({ ...textSettings, fontWeight: textSettings.fontWeight === 'bold' ? 'normal' : 'bold' })}>
                      <strong>B</strong>
                    </button>
                    <button className={textSettings.fontStyle === 'italic' ? 'active' : ''} onClick={() => setTextSettings({ ...textSettings, fontStyle: textSettings.fontStyle === 'italic' ? 'normal' : 'italic' })}>
                      <em>I</em>
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Alignment</label>
                  <div className="button-group">
                    <button className={textSettings.textAlign === 'left' ? 'active' : ''} onClick={() => setTextSettings({ ...textSettings, textAlign: 'left' })}>Left</button>
                    <button className={textSettings.textAlign === 'center' ? 'active' : ''} onClick={() => setTextSettings({ ...textSettings, textAlign: 'center' })}>Center</button>
                    <button className={textSettings.textAlign === 'right' ? 'active' : ''} onClick={() => setTextSettings({ ...textSettings, textAlign: 'right' })}>Right</button>
                  </div>
                </div>
                <button className="btn-add-element" onClick={addTextElement}>Add Text to Canvas</button>
              </div>
            )}

            {/* Images Tool */}
            {activeTab === 'images' && (
              <div className="tool-panel">
                <h3>Image Upload</h3>
                <div className="form-group">
                  <label>Image URL</label>
                  <input 
                    type="text" 
                    placeholder="https://example.com/image.jpg"
                    value={imageSettings.url}
                    onChange={(e) => setImageSettings({ ...imageSettings, url: e.target.value })}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Width</label>
                    <input type="number" value={imageSettings.width} onChange={(e) => setImageSettings({ ...imageSettings, width: parseInt(e.target.value) })} min="50" max="1000" />
                  </div>
                  <div className="form-group">
                    <label>Height</label>
                    <input type="number" value={imageSettings.height} onChange={(e) => setImageSettings({ ...imageSettings, height: parseInt(e.target.value) })} min="50" max="1000" />
                  </div>
                </div>
                <button className="btn-add-element" onClick={addImageElement}>Add Image to Canvas</button>
                <div className="image-library">
                  <h4>Stock Images</h4>
                  <div className="stock-images-grid">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="stock-image" onClick={() => setImageSettings({ ...imageSettings, url: `https://picsum.photos/200/200?random=${i}` })}>
                        <img src={`https://picsum.photos/100/100?random=${i}`} alt={`Stock ${i}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Shapes Tool */}
            {activeTab === 'shapes' && (
              <div className="tool-panel">
                <h3>Shapes</h3>
                <div className="form-group">
                  <label>Shape Type</label>
                  <div className="shapes-grid">
                    <button className={shapeSettings.type === 'rectangle' ? 'active' : ''} onClick={() => setShapeSettings({ ...shapeSettings, type: 'rectangle' })}>
                      <div className="shape-preview rectangle"></div>
                      Rectangle
                    </button>
                    <button className={shapeSettings.type === 'circle' ? 'active' : ''} onClick={() => setShapeSettings({ ...shapeSettings, type: 'circle' })}>
                      <div className="shape-preview circle"></div>
                      Circle
                    </button>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Width</label>
                    <input type="number" value={shapeSettings.width} onChange={(e) => setShapeSettings({ ...shapeSettings, width: parseInt(e.target.value) })} min="10" max="800" />
                  </div>
                  <div className="form-group">
                    <label>Height</label>
                    <input type="number" value={shapeSettings.height} onChange={(e) => setShapeSettings({ ...shapeSettings, height: parseInt(e.target.value) })} min="10" max="800" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Fill Color</label>
                  <input type="color" value={shapeSettings.fill} onChange={(e) => setShapeSettings({ ...shapeSettings, fill: e.target.value })} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Stroke Color</label>
                    <input type="color" value={shapeSettings.stroke} onChange={(e) => setShapeSettings({ ...shapeSettings, stroke: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Stroke Width</label>
                    <input type="number" value={shapeSettings.strokeWidth} onChange={(e) => setShapeSettings({ ...shapeSettings, strokeWidth: parseInt(e.target.value) })} min="0" max="20" />
                  </div>
                </div>
                <button className="btn-add-element" onClick={addShapeElement}>Add Shape to Canvas</button>
              </div>
            )}

            {/* Background Tool */}
            {activeTab === 'background' && (
              <div className="tool-panel">
                <h3>Background</h3>
                <div className="form-group">
                  <label>Solid Color</label>
                  <input 
                    type="color" 
                    value={design.background.startsWith('#') ? design.background : '#ffffff'}
                    onChange={(e) => setDesign({ ...design, background: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Color Palette</label>
                  <div className="color-palette">
                    {colors.map(color => (
                      <div 
                        key={color} 
                        className="color-swatch" 
                        style={{ background: color }}
                        onClick={() => setDesign({ ...design, background: color })}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Gradients</label>
                  <div className="gradient-picker">
                    {['linear-gradient(135deg, #667eea, #764ba2)', 'linear-gradient(135deg, #f093fb, #f5576c)', 'linear-gradient(135deg, #4facfe, #00f2fe)', 'linear-gradient(135deg, #43e97b, #38f9d7)'].map((gradient, i) => (
                      <div 
                        key={i} 
                        className="gradient-swatch" 
                        style={{ background: gradient }}
                        onClick={() => setDesign({ ...design, background: gradient })}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Center Canvas */}
        <main className="canvas-area">
          <div className="canvas-container">
            <div 
              className="canvas" 
              ref={canvasRef}
              style={{
                width: `${design.width}px`,
                height: `${design.height}px`,
                background: design.background
              }}
            >
              {elements.map(element => {
                const layer = layers.find(l => l.id === element.id);
                if (layer && !layer.visible) return null;

                if (element.type === 'text') {
                  return (
                    <div
                      key={element.id}
                      className={`canvas-element text-element ${selectedElement === element.id ? 'selected' : ''}`}
                      style={{
                        left: `${element.x}px`,
                        top: `${element.y}px`,
                        fontFamily: element.fontFamily,
                        fontSize: `${element.fontSize}px`,
                        color: element.color,
                        fontWeight: element.fontWeight,
                        fontStyle: element.fontStyle,
                        textAlign: element.textAlign
                      }}
                      onClick={() => setSelectedElement(element.id)}
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
                      alt="Element"
                      className={`canvas-element image-element ${selectedElement === element.id ? 'selected' : ''}`}
                      style={{
                        left: `${element.x}px`,
                        top: `${element.y}px`,
                        width: `${element.width}px`,
                        height: `${element.height}px`
                      }}
                      onClick={() => setSelectedElement(element.id)}
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
                        borderRadius: element.type === 'circle' ? '50%' : '0'
                      }}
                      onClick={() => setSelectedElement(element.id)}
                    />
                  );
                }

                return null;
              })}
            </div>
          </div>
        </main>

        {/* Right Sidebar - Layers */}
        <aside className="layers-sidebar">
          <h3>Layers</h3>
          <div className="layers-list">
            {layers.length === 0 && (
              <p className="no-layers">No layers yet. Add elements to see them here.</p>
            )}
            {layers.map(layer => (
              <div key={layer.id} className={`layer-item ${selectedElement === layer.id ? 'selected' : ''}`}>
                <button className="layer-visibility" onClick={() => toggleLayerVisibility(layer.id)}>
                  {layer.visible ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
                <span className="layer-name" onClick={() => setSelectedElement(layer.id)}>{layer.name}</span>
                <button className="layer-lock" onClick={() => toggleLayerLock(layer.id)}>
                  {layer.locked ? '🔒' : '🔓'}
                </button>
                <button className="layer-delete" onClick={() => deleteElement(layer.id)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="3 6 5 6 21 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Editor;
