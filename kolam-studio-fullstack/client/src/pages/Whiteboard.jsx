/**
 * WHITEBOARD PAGE
 * 
 * Digital canvas for drawing kolams with symmetry tools.
 * 
 * FEATURES:
 * - Canvas drawing with mouse/touch
 * - Dot grid overlay
 * - 6 symmetry modes
 * - Undo/redo
 * - Color palette
 * - Brush size control
 * - Save to database
 * - Export as PNG
 * 
 * HOW CANVAS WORKS:
 * 1. Get canvas element
 * 2. Get 2D context (drawing API)
 * 3. Listen for mouse/touch events
 * 4. Draw lines between points
 * 5. Apply symmetry transformations
 */

import { useRef, useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  Undo, Redo, Trash2, Save, Download, Grid3x3, 
  Palette, Minus, Plus, Eye, EyeOff 
} from 'lucide-react'
import axios from 'axios'

// Cultural color palette
const COLORS = [
  { name: 'Tamil Orange', value: '#E67E22' },
  { name: 'Telugu Blue', value: '#3498DB' },
  { name: 'Kannada Gold', value: '#F39C12' },
  { name: 'Malayalam Green', value: '#27AE60' },
  { name: 'Kumkum Red', value: '#E74C3C' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#000000' }
]

// Symmetry modes
const SYMMETRY_MODES = [
  { id: 'none', name: 'None', desc: 'Free draw' },
  { id: 'vertical', name: 'Vertical', desc: 'Mirror left-right' },
  { id: 'horizontal', name: 'Horizontal', desc: 'Mirror top-bottom' },
  { id: 'both', name: 'Both', desc: '4-way mirror' },
  { id: 'radial-4', name: '4-Fold', desc: 'Radial 4x' },
  { id: 'radial-8', name: '8-Fold', desc: 'Radial 8x' }
]

function Whiteboard() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  
  // Canvas refs
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  
  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPoint, setLastPoint] = useState(null)
  
  // Tool state
  const [color, setColor] = useState(COLORS[4].value) // Kumkum Red
  const [brushSize, setBrushSize] = useState(6)
  const [symmetryMode, setSymmetryMode] = useState('none')
  const [showGrid, setShowGrid] = useState(true)
  const [gridSize, setGridSize] = useState(7)
  
  // History for undo/redo
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  
  // Save dialog
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [saveData, setSaveData] = useState({
    title: '',
    description: '',
    region: 'Tamil',
    difficulty: 'Beginner',
    occasion: 'Daily'
  })
  
  /**
   * INITIALIZE CANVAS
   * Setup canvas size and draw initial grid
   */
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resize = () => {
      const width = container.clientWidth
      const height = Math.min(600, width * 0.75)
      
      canvas.width = width
      canvas.height = height
      
      // Draw background
      ctx.fillStyle = '#F5F2E6'
      ctx.fillRect(0, 0, width, height)
      
      // Draw grid if enabled
      if (showGrid) {
        drawGrid(ctx, width, height)
      }
      
      // Save initial state
      if (history.length === 0) {
        saveToHistory()
      }
    }
    
    resize()
    window.addEventListener('resize', resize)
    
    return () => window.removeEventListener('resize', resize)
  }, [showGrid, gridSize])
  
  /**
   * DRAW DOT GRID
   */
  const drawGrid = (ctx, width, height) => {
    const step = Math.min(width, height) / (gridSize + 1)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
    
    for (let y = step; y < height; y += step) {
      for (let x = step; x < width; x += step) {
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }
  
  /**
   * GET MOUSE/TOUCH POSITION
   */
  const getPosition = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  }
  
  /**
   * DRAW LINE
   */
  const drawLine = (ctx, x1, y1, x2, y2) => {
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = brushSize
    ctx.strokeStyle = color
    
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }
  
  /**
   * DRAW WITH SYMMETRY
   */
  const drawWithSymmetry = (x1, y1, x2, y2) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    
    // Draw original
    drawLine(ctx, x1, y1, x2, y2)
    
    if (symmetryMode === 'vertical' || symmetryMode === 'both') {
      // Mirror horizontally
      const mx1 = width - x1
      const mx2 = width - x2
      drawLine(ctx, mx1, y1, mx2, y2)
    }
    
    if (symmetryMode === 'horizontal' || symmetryMode === 'both') {
      // Mirror vertically
      const my1 = height - y1
      const my2 = height - y2
      drawLine(ctx, x1, my1, x2, my2)
    }
    
    if (symmetryMode === 'both') {
      // Mirror both
      const mx1 = width - x1
      const mx2 = width - x2
      const my1 = height - y1
      const my2 = height - y2
      drawLine(ctx, mx1, my1, mx2, my2)
    }
    
    if (symmetryMode === 'radial-4' || symmetryMode === 'radial-8') {
      const angles = symmetryMode === 'radial-4' 
        ? [0, 90, 180, 270] 
        : [0, 45, 90, 135, 180, 225, 270, 315]
      
      angles.forEach(angle => {
        const rad = (angle * Math.PI) / 180
        const cos = Math.cos(rad)
        const sin = Math.sin(rad)
        
        const rx1 = centerX + (x1 - centerX) * cos - (y1 - centerY) * sin
        const ry1 = centerY + (x1 - centerX) * sin + (y1 - centerY) * cos
        const rx2 = centerX + (x2 - centerX) * cos - (y2 - centerY) * sin
        const ry2 = centerY + (x2 - centerX) * sin + (y2 - centerY) * cos
        
        drawLine(ctx, rx1, ry1, rx2, ry2)
      })
    }
  }
  
  /**
   * MOUSE/TOUCH EVENT HANDLERS
   */
  const handleStart = (e) => {
    e.preventDefault()
    setIsDrawing(true)
    const pos = getPosition(e)
    setLastPoint(pos)
  }
  
  const handleMove = (e) => {
    if (!isDrawing) return
    e.preventDefault()
    
    const pos = getPosition(e)
    const last = lastPoint || pos
    
    drawWithSymmetry(last.x, last.y, pos.x, pos.y)
    setLastPoint(pos)
  }
  
  const handleEnd = () => {
    if (isDrawing) {
      saveToHistory()
    }
    setIsDrawing(false)
    setLastPoint(null)
  }
  
  /**
   * HISTORY MANAGEMENT
   */
  const saveToHistory = () => {
    const canvas = canvasRef.current
    const imageData = canvas.toDataURL()
    
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(imageData)
    
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }
  
  const undo = () => {
    if (historyIndex <= 0) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
    }
    
    img.src = history[historyIndex - 1]
    setHistoryIndex(historyIndex - 1)
  }
  
  const redo = () => {
    if (historyIndex >= history.length - 1) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
    }
    
    img.src = history[historyIndex + 1]
    setHistoryIndex(historyIndex + 1)
  }
  
  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    ctx.fillStyle = '#F5F2E6'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    if (showGrid) {
      drawGrid(ctx, canvas.width, canvas.height)
    }
    
    saveToHistory()
  }
  
  /**
   * SAVE TO DATABASE
   */
  const handleSave = async () => {
    if (!isAuthenticated) {
      alert('Please login to save your kolam')
      navigate('/login')
      return
    }
    
    try {
      const canvas = canvasRef.current
      const imageData = canvas.toDataURL('image/png')
      
      // Convert base64 to blob
      const blob = await (await fetch(imageData)).blob()
      
      // Create form data
      const formData = new FormData()
      formData.append('image', blob, 'kolam.png')
      formData.append('title', saveData.title)
      formData.append('description', saveData.description)
      formData.append('region', saveData.region)
      formData.append('difficulty', saveData.difficulty)
      formData.append('occasion', saveData.occasion)
      formData.append('gridSize', gridSize)
      formData.append('symmetry', symmetryMode)
      
      // Send to backend
      await axios.post('/api/kolams', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      alert('✅ Kolam saved successfully!')
      setShowSaveDialog(false)
      navigate('/library')
      
    } catch (error) {
      console.error('Save error:', error)
      alert('Error saving kolam: ' + error.message)
    }
  }
  
  /**
   * EXPORT AS PNG
   */
  const exportPNG = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = `kolam-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Digital Whiteboard
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tools Panel */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 space-y-6 sticky top-4">
              {/* Color Palette */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Palette size={20} />
                  Colors
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {COLORS.map(c => (
                    <button
                      key={c.value}
                      onClick={() => setColor(c.value)}
                      className={`w-full aspect-square rounded-lg border-2 transition-all ${
                        color === c.value ? 'border-black scale-110' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
              
              {/* Brush Size */}
              <div>
                <h3 className="font-semibold mb-3">Brush Size: {brushSize}px</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBrushSize(Math.max(2, brushSize - 2))}
                    className="btn-secondary p-2"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <button
                    onClick={() => setBrushSize(Math.min(24, brushSize + 2))}
                    className="btn-secondary p-2"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Symmetry Mode */}
              <div>
                <h3 className="font-semibold mb-3">Symmetry</h3>
                <div className="grid grid-cols-2 gap-2">
                  {SYMMETRY_MODES.map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setSymmetryMode(mode.id)}
                      className={`p-2 rounded-lg border text-left text-sm ${
                        symmetryMode === mode.id
                          ? 'border-tamil-orange bg-tamil-orange/10'
                          : 'border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{mode.name}</div>
                      <div className="text-xs text-gray-600">{mode.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Grid Controls */}
              <div>
                <h3 className="font-semibold mb-3">Grid</h3>
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className="btn-secondary w-full mb-2"
                >
                  {showGrid ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span className="ml-2">{showGrid ? 'Hide' : 'Show'} Grid</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Size:</span>
                  <input
                    type="range"
                    min="5"
                    max="15"
                    step="2"
                    value={gridSize}
                    onChange={(e) => setGridSize(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm">{gridSize}×{gridSize}</span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="space-y-2">
                <button onClick={undo} disabled={historyIndex <= 0} className="btn-secondary w-full">
                  <Undo size={16} />
                  <span className="ml-2">Undo</span>
                </button>
                <button onClick={redo} disabled={historyIndex >= history.length - 1} className="btn-secondary w-full">
                  <Redo size={16} />
                  <span className="ml-2">Redo</span>
                </button>
                <button onClick={clearCanvas} className="btn-secondary w-full">
                  <Trash2 size={16} />
                  <span className="ml-2">Clear</span>
                </button>
                <button onClick={() => setShowSaveDialog(true)} className="btn-primary w-full">
                  <Save size={16} />
                  <span className="ml-2">Save</span>
                </button>
                <button onClick={exportPNG} className="btn-secondary w-full">
                  <Download size={16} />
                  <span className="ml-2">Export PNG</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Canvas */}
          <div className="lg:col-span-3">
            <div ref={containerRef} className="glass-card p-4">
              <canvas
                ref={canvasRef}
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
                className="w-full rounded-lg shadow-lg cursor-crosshair touch-none"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Save Kolam</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  value={saveData.title}
                  onChange={(e) => setSaveData({...saveData, title: e.target.value})}
                  className="input-field"
                  placeholder="My Beautiful Kolam"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={saveData.description}
                  onChange={(e) => setSaveData({...saveData, description: e.target.value})}
                  className="input-field"
                  rows="3"
                  placeholder="Describe your kolam..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Region</label>
                  <select
                    value={saveData.region}
                    onChange={(e) => setSaveData({...saveData, region: e.target.value})}
                    className="input-field"
                  >
                    <option>Tamil</option>
                    <option>Telugu</option>
                    <option>Kannada</option>
                    <option>Malayalam</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Difficulty</label>
                  <select
                    value={saveData.difficulty}
                    onChange={(e) => setSaveData({...saveData, difficulty: e.target.value})}
                    className="input-field"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Occasion</label>
                <select
                  value={saveData.occasion}
                  onChange={(e) => setSaveData({...saveData, occasion: e.target.value})}
                  className="input-field"
                >
                  <option>Daily</option>
                  <option>Diwali</option>
                  <option>Pongal</option>
                  <option>Onam</option>
                  <option>Wedding</option>
                  <option>Festival</option>
                </select>
              </div>
              
              <div className="flex gap-2">
                <button onClick={handleSave} className="btn-primary flex-1">
                  Save Kolam
                </button>
                <button onClick={() => setShowSaveDialog(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Whiteboard
