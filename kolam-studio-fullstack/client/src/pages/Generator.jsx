/**
 * PATTERN GENERATOR PAGE
 * 
 * Generate kolam patterns programmatically with customizable parameters.
 */

import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wand2, RefreshCw, Download, Eye, Image as ImageIcon } from 'lucide-react'
import { authenticMugguDesigns } from '../utils/authenticMugguDesigns'
import { getKolamsByOccasion } from '../data/kolamLibrary'

const REGIONS = ['Telugu (Telangana/AP)', 'Tamil (Tamil Nadu)', 'Kannada (Karnataka)', 'Marathi (Maharashtra)', 'Malayalam (Kerala)', 'Rajasthani']
const OCCASIONS = ['Sankranti/Pongal', 'Deepavali/Diwali', 'Ugadi/Gudi Padwa', 'Onam', 'Margazhi', 'Daily Worship']
const SHAPES = ['square', 'diamond', 'star', 'radial']

function Generator() {
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  
  // Generation parameters
  const [params, setParams] = useState({
    region: 'Telugu (Telangana/AP)',
    occasion: 'Sankranti/Pongal',
    gridSize: 7,
    complexity: 5,
    shape: 'radial',
    color: '#E74C3C'
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPattern, setGeneratedPattern] = useState(null)
  const [useRealImages, setUseRealImages] = useState(true) // Toggle between real images and programmatic
  const [availableKolams, setAvailableKolams] = useState([])
  const [selectedKolamIndex, setSelectedKolamIndex] = useState(0)
  const [currentKolamInfo, setCurrentKolamInfo] = useState(null)
  
  /**
   * LOAD AVAILABLE KOLAMS FOR SELECTED REGION/OCCASION
   */
  useEffect(() => {
    const kolams = getKolamsByOccasion(params.region, params.occasion)
    setAvailableKolams(kolams)
    setSelectedKolamIndex(0)
  }, [params.region, params.occasion])
  
  /**
   * GENERATE PATTERN - REAL IMAGE OR PROGRAMMATIC
   */
  const generatePattern = () => {
    setIsGenerating(true)
    
    setTimeout(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      const width = canvas.width
      const height = canvas.height
      
      // Clear canvas
      ctx.fillStyle = '#F5F2E6'
      ctx.fillRect(0, 0, width, height)
      
      // Try to use real image first if enabled
      if (useRealImages && availableKolams.length > 0) {
        const selectedKolam = availableKolams[selectedKolamIndex]
        const img = new Image()
        img.onload = () => {
          // Draw image centered and scaled to fit
          const scale = Math.min(width / img.width, height / img.height)
          const x = (width - img.width * scale) / 2
          const y = (height - img.height * scale) / 2
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
          setGeneratedPattern(canvas.toDataURL())
          setCurrentKolamInfo(selectedKolam)
          setIsGenerating(false)
        }
        img.onerror = () => {
          // If image fails to load, fall back to programmatic
          console.log('Image not found, using programmatic design')
          drawProgrammaticDesign(ctx, width, height)
        }
        img.src = selectedKolam.imageUrl
      } else {
        // Use programmatic design
        drawProgrammaticDesign(ctx, width, height)
      }
    }, 500)
  }
  
  /**
   * DRAW PROGRAMMATIC DESIGN
   */
  const drawProgrammaticDesign = (ctx, width, height) => {
    const regionKey = params.region.split(' ')[0].toLowerCase()
    const occasionKey = params.occasion.toLowerCase().split('/')[0]
    
    // Map to authentic designs
    if (regionKey === 'telugu' && (occasionKey === 'sankranti' || occasionKey === 'pongal')) {
      authenticMugguDesigns.telugu_sankranti(ctx, width, height)
    } else if (regionKey === 'tamil' && occasionKey === 'margazhi') {
      authenticMugguDesigns.tamil_margazhi(ctx, width, height)
    } else if (regionKey === 'kannada' && occasionKey === 'deepavali') {
      authenticMugguDesigns.karnataka_deepavali(ctx, width, height)
    } else if (regionKey === 'marathi' && (occasionKey === 'diwali' || occasionKey === 'ugadi')) {
      authenticMugguDesigns.maharashtra_diwali(ctx, width, height)
    } else if (regionKey === 'telugu' && occasionKey === 'ugadi') {
      authenticMugguDesigns.andhra_ugadi(ctx, width, height)
    } else if (regionKey === 'malayalam' && occasionKey === 'onam') {
      authenticMugguDesigns.kerala_onam(ctx, width, height)
    } else if (regionKey === 'rajasthani') {
      authenticMugguDesigns.rajasthan_mandana(ctx, width, height)
    } else {
      // Default to region-specific design
      if (regionKey === 'telugu') {
        authenticMugguDesigns.telugu_sankranti(ctx, width, height)
      } else if (regionKey === 'tamil') {
        authenticMugguDesigns.tamil_margazhi(ctx, width, height)
      } else if (regionKey === 'kannada') {
        authenticMugguDesigns.karnataka_deepavali(ctx, width, height)
      } else if (regionKey === 'marathi') {
        authenticMugguDesigns.maharashtra_diwali(ctx, width, height)
      } else if (regionKey === 'malayalam') {
        authenticMugguDesigns.kerala_onam(ctx, width, height)
      } else {
        authenticMugguDesigns.rajasthan_mandana(ctx, width, height)
      }
    }
    
    setGeneratedPattern(canvas.toDataURL())
    setCurrentKolamInfo(null)
    setIsGenerating(false)
  }
  
  /**
   * INITIALIZE CANVAS
   */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    canvas.width = 600
    canvas.height = 600
    
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#F5F2E6'
    ctx.fillRect(0, 0, 600, 600)
  }, [])
  
  /**
   * EXPORT PATTERN
   */
  const exportPattern = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = `kolam-${params.occasion}-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }
  
  /**
   * OPEN IN WHITEBOARD
   */
  const openInWhiteboard = () => {
    // Store pattern in localStorage
    localStorage.setItem('importedPattern', generatedPattern)
    navigate('/whiteboard')
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Pattern Generator
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 space-y-6 sticky top-4">
              <h2 className="text-xl font-semibold">Parameters</h2>
              
              {/* Toggle Real Images / Programmatic */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <ImageIcon size={20} className="text-blue-600" />
                  <span className="text-sm font-medium">Use Real Images</span>
                </div>
                <button
                  onClick={() => setUseRealImages(!useRealImages)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    useRealImages ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      useRealImages ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              {/* Available Images Count */}
              {availableKolams.length > 0 && (
                <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                  ✓ {availableKolams.length} real image{availableKolams.length > 1 ? 's' : ''} available
                  {availableKolams.length > 1 && (
                    <div className="flex items-center justify-between mt-2">
                      <button
                        onClick={() => setSelectedKolamIndex((prev) => (prev - 1 + availableKolams.length) % availableKolams.length)}
                        className="text-xs bg-white px-2 py-1 rounded border border-green-300 hover:bg-green-100"
                      >
                        ← Previous
                      </button>
                      <span className="text-xs">Image {selectedKolamIndex + 1} of {availableKolams.length}</span>
                      <button
                        onClick={() => setSelectedKolamIndex((prev) => (prev + 1) % availableKolams.length)}
                        className="text-xs bg-white px-2 py-1 rounded border border-green-300 hover:bg-green-100"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Region */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Regional Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {REGIONS.map(region => (
                    <button
                      key={region}
                      onClick={() => setParams({...params, region})}
                      className={`p-2 rounded-lg border text-sm ${
                        params.region === region
                          ? 'border-tamil-orange bg-tamil-orange/10'
                          : 'border-gray-300'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Occasion */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Occasion
                </label>
                <select
                  value={params.occasion}
                  onChange={(e) => setParams({...params, occasion: e.target.value})}
                  className="input-field"
                >
                  {OCCASIONS.map(occ => (
                    <option key={occ} value={occ}>{occ}</option>
                  ))}
                </select>
              </div>
              
              {/* Shape (for Daily) */}
              {params.occasion === 'Daily' && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Shape
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SHAPES.map(shape => (
                      <button
                        key={shape}
                        onClick={() => setParams({...params, shape})}
                        className={`p-2 rounded-lg border text-sm capitalize ${
                          params.shape === shape
                            ? 'border-tamil-orange bg-tamil-orange/10'
                            : 'border-gray-300'
                        }`}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Grid Size */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Grid Size: {params.gridSize}×{params.gridSize}
                </label>
                <input
                  type="range"
                  min="5"
                  max="15"
                  step="2"
                  value={params.gridSize}
                  onChange={(e) => setParams({...params, gridSize: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
              
              {/* Complexity */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Complexity: {params.complexity}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={params.complexity}
                  onChange={(e) => setParams({...params, complexity: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Simple</span>
                  <span>Intricate</span>
                </div>
              </div>
              
              {/* Color */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Color
                </label>
                <div className="flex gap-2">
                  {['#E67E22', '#3498DB', '#F39C12', '#27AE60', '#E74C3C', '#000000'].map(color => (
                    <button
                      key={color}
                      onClick={() => setParams({...params, color})}
                      className={`w-10 h-10 rounded-lg border-2 ${
                        params.color === color ? 'border-black' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Generate Button */}
              <button
                onClick={generatePattern}
                disabled={isGenerating}
                className="btn-primary w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="animate-spin mr-2" size={20} />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2" size={20} />
                    Generate Pattern
                  </>
                )}
              </button>
              
              {/* Actions */}
              {generatedPattern && (
                <div className="space-y-2">
                  <button onClick={exportPattern} className="btn-secondary w-full">
                    <Download className="mr-2" size={16} />
                    Export PNG
                  </button>
                  <button onClick={openInWhiteboard} className="btn-secondary w-full">
                    <Eye className="mr-2" size={16} />
                    Open in Whiteboard
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Canvas */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Generated Pattern</h2>
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              
              {!generatedPattern && (
                <div className="text-center mt-8 text-gray-500">
                  <Wand2 size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Adjust parameters and click "Generate Pattern" to create your kolam</p>
                </div>
              )}
              
              {/* Kolam Info */}
              {currentKolamInfo && (
                <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-lg mb-2">{currentKolamInfo.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">{currentKolamInfo.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-medium">Region:</span> {currentKolamInfo.region}
                    </div>
                    <div>
                      <span className="font-medium">Occasion:</span> {currentKolamInfo.occasion}
                    </div>
                    <div>
                      <span className="font-medium">Difficulty:</span> {currentKolamInfo.difficulty}
                    </div>
                    <div>
                      <span className="font-medium">Grid:</span> {currentKolamInfo.gridSize}
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-white rounded text-xs italic">
                    <span className="font-medium">Cultural Note:</span> {currentKolamInfo.culturalNote}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Generator
