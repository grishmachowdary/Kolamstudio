/**
 * SCANNER PAGE
 * 
 * Upload and analyze kolam images.
 * Features:
 * - Image upload (file or camera)
 * - Basic pattern detection
 * - Grid and symmetry analysis
 * - Confidence score
 * - Export to whiteboard
 */

import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Camera, Image as ImageIcon, Grid3x3, Sparkles, Download, Edit } from 'lucide-react'

function Scanner() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)
  
  const [uploadedImage, setUploadedImage] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  
  /**
   * HANDLE FILE UPLOAD
   */
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }
    
    // Read file as data URL
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target.result)
      analyzeImage(e.target.result)
    }
    reader.readAsDataURL(file)
  }
  
  /**
   * ANALYZE IMAGE
   * 
   * This is a SIMULATED analysis for educational purposes.
   * In production, you would:
   * 1. Send image to backend
   * 2. Use computer vision (OpenCV, TensorFlow)
   * 3. Detect patterns, symmetry, grid
   * 4. Return analysis results
   */
  const analyzeImage = (imageData) => {
    setAnalyzing(true)
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Create image element to analyze
      const img = new Image()
      img.onload = () => {
        // SIMULATED ANALYSIS
        // In real app, this would be done by ML model
        
        const width = img.width
        const height = img.height
        const aspectRatio = width / height
        
        // Detect if image is roughly square (kolams are usually square)
        const isSquare = Math.abs(aspectRatio - 1) < 0.2
        
        // Simulate pattern detection
        const patterns = detectPatterns(img)
        
        // Simulate symmetry detection
        const symmetry = detectSymmetry(img)
        
        // Simulate grid detection
        const grid = detectGrid(img)
        
        // Calculate confidence score
        let confidence = 0
        if (isSquare) confidence += 20
        if (patterns.detected) confidence += 30
        if (symmetry.detected) confidence += 30
        if (grid.detected) confidence += 20
        
        setAnalysis({
          dimensions: { width, height },
          isSquare,
          patterns,
          symmetry,
          grid,
          confidence,
          region: guessRegion(patterns),
          difficulty: guessDifficulty(patterns, grid)
        })
      }
      img.src = imageData
      
      setAnalyzing(false)
    }, 2000) // 2 second delay to simulate processing
  }
  
  /**
   * SIMULATED PATTERN DETECTION
   */
  const detectPatterns = (img) => {
    // In real app: use computer vision to detect shapes
    // For now: random simulation
    const detected = Math.random() > 0.3
    
    return {
      detected,
      shapes: detected ? ['circle', 'line', 'dot'] : [],
      count: detected ? Math.floor(Math.random() * 50) + 10 : 0,
      complexity: detected ? Math.floor(Math.random() * 10) + 1 : 0
    }
  }
  
  /**
   * SIMULATED SYMMETRY DETECTION
   */
  const detectSymmetry = (img) => {
    const types = ['none', 'vertical', 'horizontal', 'both', 'radial-4', 'radial-8']
    const detected = Math.random() > 0.2
    
    return {
      detected,
      type: detected ? types[Math.floor(Math.random() * types.length)] : 'none',
      confidence: detected ? Math.floor(Math.random() * 30) + 70 : 0
    }
  }
  
  /**
   * SIMULATED GRID DETECTION
   */
  const detectGrid = (img) => {
    const detected = Math.random() > 0.4
    
    return {
      detected,
      size: detected ? Math.floor(Math.random() * 6) + 5 : 0, // 5-10
      dotCount: detected ? Math.floor(Math.random() * 50) + 25 : 0
    }
  }
  
  /**
   * GUESS REGION FROM PATTERNS
   */
  const guessRegion = (patterns) => {
    const regions = ['Tamil', 'Telugu', 'Kannada', 'Malayalam']
    return patterns.detected ? regions[Math.floor(Math.random() * regions.length)] : 'Unknown'
  }
  
  /**
   * GUESS DIFFICULTY
   */
  const guessDifficulty = (patterns, grid) => {
    if (!patterns.detected) return 'Unknown'
    
    const complexity = patterns.complexity
    if (complexity <= 3) return 'Beginner'
    if (complexity <= 7) return 'Intermediate'
    return 'Advanced'
  }
  
  /**
   * OPEN IN WHITEBOARD
   */
  const openInWhiteboard = () => {
    // In real app: convert image to drawing data
    // For now: just navigate with image
    navigate('/whiteboard', { state: { referenceImage: uploadedImage } })
  }
  
  /**
   * RESET
   */
  const reset = () => {
    setUploadedImage(null)
    setAnalysis(null)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-4">
          Kolam Scanner
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Upload a kolam image to analyze its patterns, symmetry, and structure
        </p>
        
        {/* Upload Section */}
        {!uploadedImage && (
          <div className="glass-card p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* File Upload */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-tamil-orange hover:bg-orange-50 transition-colors"
              >
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="font-semibold mb-2">Upload Image</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Click to browse or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG up to 5MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              
              {/* Camera Capture */}
              <div
                onClick={() => cameraInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-telugu-blue hover:bg-blue-50 transition-colors"
              >
                <Camera className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="font-semibold mb-2">Take Photo</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Use your camera to capture
                </p>
                <p className="text-xs text-gray-500">
                  Mobile & desktop supported
                </p>
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
            
            {/* Info */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles size={20} className="text-telugu-blue" />
                Tips for Best Results
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Use good lighting and avoid shadows</li>
                <li>• Capture the entire kolam in frame</li>
                <li>• Take photo from directly above (bird's eye view)</li>
                <li>• Ensure the kolam is on a contrasting background</li>
                <li>• Higher resolution images work better</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* Analysis Section */}
        {uploadedImage && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Preview */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Uploaded Image</h2>
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Uploaded kolam"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={reset} className="btn-secondary flex-1">
                  Upload New
                </button>
                <button onClick={openInWhiteboard} className="btn-primary flex-1">
                  <Edit size={20} />
                  <span className="ml-2">Open in Whiteboard</span>
                </button>
              </div>
            </div>
            
            {/* Analysis Results */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
              
              {analyzing && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tamil-orange mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing image...</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Detecting patterns, symmetry, and grid structure
                  </p>
                </div>
              )}
              
              {!analyzing && analysis && (
                <div className="space-y-6">
                  {/* Confidence Score */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Confidence Score</span>
                      <span className="text-2xl font-bold text-tamil-orange">
                        {analysis.confidence}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-tamil-orange to-telugu-blue h-3 rounded-full transition-all"
                        style={{ width: `${analysis.confidence}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {analysis.confidence >= 70 ? 'High confidence - likely a kolam!' :
                       analysis.confidence >= 40 ? 'Medium confidence - might be a kolam' :
                       'Low confidence - may not be a kolam'}
                    </p>
                  </div>
                  
                  {/* Dimensions */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <ImageIcon size={20} />
                      Image Properties
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Width:</span>
                        <span className="ml-2 font-medium">{analysis.dimensions.width}px</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Height:</span>
                        <span className="ml-2 font-medium">{analysis.dimensions.height}px</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">Shape:</span>
                        <span className="ml-2 font-medium">
                          {analysis.isSquare ? '✅ Square (ideal for kolam)' : '⚠️ Not square'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pattern Detection */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Sparkles size={20} />
                      Pattern Detection
                    </h3>
                    {analysis.patterns.detected ? (
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Shapes Found:</span>
                          <span className="ml-2 font-medium">
                            {analysis.patterns.shapes.join(', ')}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Element Count:</span>
                          <span className="ml-2 font-medium">{analysis.patterns.count}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Complexity:</span>
                          <span className="ml-2 font-medium">
                            {analysis.patterns.complexity}/10
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">No clear patterns detected</p>
                    )}
                  </div>
                  
                  {/* Symmetry Detection */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Grid3x3 size={20} />
                      Symmetry Analysis
                    </h3>
                    {analysis.symmetry.detected ? (
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <span className="ml-2 font-medium capitalize">
                            {analysis.symmetry.type.replace('-', ' ')}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Confidence:</span>
                          <span className="ml-2 font-medium">
                            {analysis.symmetry.confidence}%
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">No symmetry detected</p>
                    )}
                  </div>
                  
                  {/* Grid Detection */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Grid3x3 size={20} />
                      Grid Structure
                    </h3>
                    {analysis.grid.detected ? (
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Grid Size:</span>
                          <span className="ml-2 font-medium">
                            {analysis.grid.size}×{analysis.grid.size}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Dots Detected:</span>
                          <span className="ml-2 font-medium">{analysis.grid.dotCount}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">No grid structure detected</p>
                    )}
                  </div>
                  
                  {/* Predictions */}
                  <div className="p-4 bg-gradient-to-r from-tamil-orange/10 to-telugu-blue/10 rounded-lg">
                    <h3 className="font-semibold mb-3">Predictions</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Region:</span>
                        <span className="font-medium">{analysis.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Difficulty:</span>
                        <span className="font-medium">{analysis.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Note */}
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                    <p className="text-yellow-800">
                      <strong>Note:</strong> This is a simulated analysis for demonstration. 
                      In production, use computer vision (OpenCV, TensorFlow) for accurate detection.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Scanner
