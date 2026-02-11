/**
 * PATTERN GENERATOR UTILITY
 * 
 * Generates kolam patterns programmatically using geometry and math.
 * 
 * PATTERN TYPES:
 * 1. Dot-based patterns (Tamil style)
 * 2. Geometric patterns (squares, circles, stars)
 * 3. Radial patterns (flower-like)
 * 4. Grid patterns (Telugu Muggulu style)
 * 
 * HOW IT WORKS:
 * 1. Define grid of dots
 * 2. Connect dots with lines/curves
 * 3. Apply symmetry transformations
 * 4. Add decorative elements
 */

/**
 * GENERATE DOT GRID
 * Creates evenly spaced dots for kolam base
 */
export const generateDotGrid = (gridSize, canvasWidth, canvasHeight) => {
  const dots = []
  const stepX = canvasWidth / (gridSize + 1)
  const stepY = canvasHeight / (gridSize + 1)
  
  for (let row = 1; row <= gridSize; row++) {
    for (let col = 1; col <= gridSize; col++) {
      dots.push({
        x: col * stepX,
        y: row * stepY,
        row,
        col
      })
    }
  }
  
  return dots
}

/**
 * GENERATE SIMPLE LOOP PATTERN
 * Connects dots in a continuous loop (traditional Tamil kolam)
 */
export const generateLoopPattern = (gridSize, complexity) => {
  const instructions = []
  const centerRow = Math.floor(gridSize / 2)
  const centerCol = Math.floor(gridSize / 2)
  
  // Start from center
  let currentRow = centerRow
  let currentCol = centerCol
  
  // Spiral outward
  let steps = 1
  let direction = 0 // 0=right, 1=down, 2=left, 3=up
  
  for (let i = 0; i < complexity * 4; i++) {
    const dx = [1, 0, -1, 0][direction]
    const dy = [0, 1, 0, -1][direction]
    
    for (let step = 0; step < steps; step++) {
      instructions.push({
        type: 'line',
        from: { row: currentRow, col: currentCol },
        to: { row: currentRow + dy, col: currentCol + dx }
      })
      
      currentRow += dy
      currentCol += dx
      
      if (currentRow < 0 || currentRow >= gridSize || 
          currentCol < 0 || currentCol >= gridSize) {
        break
      }
    }
    
    direction = (direction + 1) % 4
    if (i % 2 === 1) steps++
  }
  
  return instructions
}

/**
 * GENERATE RADIAL PATTERN
 * Creates flower-like patterns with radial symmetry
 */
export const generateRadialPattern = (centerX, centerY, radius, petals, complexity) => {
  const instructions = []
  const angleStep = (Math.PI * 2) / petals
  
  for (let i = 0; i < petals; i++) {
    const angle = i * angleStep
    
    // Petal outline
    for (let j = 0; j < complexity; j++) {
      const r1 = (radius / complexity) * j
      const r2 = (radius / complexity) * (j + 1)
      
      const x1 = centerX + Math.cos(angle) * r1
      const y1 = centerY + Math.sin(angle) * r1
      const x2 = centerX + Math.cos(angle) * r2
      const y2 = centerY + Math.sin(angle) * r2
      
      instructions.push({
        type: 'line',
        from: { x: x1, y: y1 },
        to: { x: x2, y: y2 }
      })
      
      // Add curves for complexity
      if (complexity > 5) {
        const curveAngle = angle + angleStep / 2
        const cx = centerX + Math.cos(curveAngle) * (r1 + r2) / 2
        const cy = centerY + Math.sin(curveAngle) * (r1 + r2) / 2
        
        instructions.push({
          type: 'curve',
          from: { x: x1, y: y1 },
          control: { x: cx, y: cy },
          to: { x: x2, y: y2 }
        })
      }
    }
  }
  
  return instructions
}

/**
 * GENERATE GEOMETRIC PATTERN
 * Creates patterns with squares, triangles, circles
 */
export const generateGeometricPattern = (gridSize, shape, complexity) => {
  const instructions = []
  const centerRow = Math.floor(gridSize / 2)
  const centerCol = Math.floor(gridSize / 2)
  
  for (let layer = 1; layer <= complexity; layer++) {
    const size = layer
    
    if (shape === 'square') {
      // Draw square
      for (let i = 0; i < 4; i++) {
        const corners = [
          { row: centerRow - size, col: centerCol - size },
          { row: centerRow - size, col: centerCol + size },
          { row: centerRow + size, col: centerCol + size },
          { row: centerRow + size, col: centerCol - size }
        ]
        
        instructions.push({
          type: 'line',
          from: corners[i],
          to: corners[(i + 1) % 4]
        })
      }
    } else if (shape === 'diamond') {
      // Draw diamond
      const corners = [
        { row: centerRow - size, col: centerCol },
        { row: centerRow, col: centerCol + size },
        { row: centerRow + size, col: centerCol },
        { row: centerRow, col: centerCol - size }
      ]
      
      for (let i = 0; i < 4; i++) {
        instructions.push({
          type: 'line',
          from: corners[i],
          to: corners[(i + 1) % 4]
        })
      }
    } else if (shape === 'star') {
      // Draw star
      const points = 8
      for (let i = 0; i < points; i++) {
        const angle = (i * Math.PI * 2) / points
        const r = i % 2 === 0 ? size : size / 2
        
        instructions.push({
          type: 'line',
          from: { row: centerRow, col: centerCol },
          to: {
            row: centerRow + Math.sin(angle) * r,
            col: centerCol + Math.cos(angle) * r
          }
        })
      }
    }
  }
  
  return instructions
}

/**
 * GENERATE COLORFUL KOLAM DESIGNS
 * Creates authentic, colorful traditional kolam patterns
 */

/**
 * DRAW COLORFUL DIWALI KOLAM
 * Beautiful lamp/diya design with vibrant colors
 */
export const drawDiwaliKolam = (ctx, width, height, complexity) => {
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) / 3
  
  // Background gradient
  const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 2)
  bgGradient.addColorStop(0, '#FFF9E6')
  bgGradient.addColorStop(1, '#FFE4B5')
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, width, height)
  
  // Draw lamp base (diya)
  ctx.fillStyle = '#D4AF37' // Gold
  ctx.beginPath()
  ctx.ellipse(centerX, centerY + radius * 0.5, radius * 0.6, radius * 0.3, 0, 0, Math.PI * 2)
  ctx.fill()
  
  // Draw flame
  const flameGradient = ctx.createRadialGradient(centerX, centerY - radius * 0.3, 0, centerX, centerY - radius * 0.3, radius * 0.4)
  flameGradient.addColorStop(0, '#FFD700')
  flameGradient.addColorStop(0.5, '#FF8C00')
  flameGradient.addColorStop(1, '#FF4500')
  ctx.fillStyle = flameGradient
  ctx.beginPath()
  ctx.moveTo(centerX, centerY - radius * 0.8)
  ctx.quadraticCurveTo(centerX - radius * 0.2, centerY - radius * 0.3, centerX, centerY)
  ctx.quadraticCurveTo(centerX + radius * 0.2, centerY - radius * 0.3, centerX, centerY - radius * 0.8)
  ctx.fill()
  
  // Draw decorative petals around
  const petals = 8
  for (let i = 0; i < petals; i++) {
    const angle = (i * Math.PI * 2) / petals
    const petalX = centerX + Math.cos(angle) * radius * 1.2
    const petalY = centerY + Math.sin(angle) * radius * 1.2
    
    // Colorful petals
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2']
    ctx.fillStyle = colors[i % colors.length]
    ctx.beginPath()
    ctx.ellipse(petalX, petalY, radius * 0.3, radius * 0.15, angle, 0, Math.PI * 2)
    ctx.fill()
    
    // Petal outline
    ctx.strokeStyle = '#8B4513'
    ctx.lineWidth = 2
    ctx.stroke()
  }
  
  // Center circle
  ctx.fillStyle = '#E74C3C'
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius * 0.2, 0, Math.PI * 2)
  ctx.fill()
  
  // Decorative dots
  ctx.fillStyle = '#FFD700'
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI * 2) / 12
    const dotX = centerX + Math.cos(angle) * radius * 0.8
    const dotY = centerY + Math.sin(angle) * radius * 0.8
    ctx.beginPath()
    ctx.arc(dotX, dotY, 4, 0, Math.PI * 2)
    ctx.fill()
  }
}

/**
 * DRAW COLORFUL PONGAL KOLAM
 * Traditional harvest festival design with rice and sugarcane
 */
export const drawPongalKolam = (ctx, width, height, complexity) => {
  const centerX = width / 2
  const centerY = height / 2
  const size = Math.min(width, height) / 3
  
  // Background
  const bgGradient = ctx.createLinearGradient(0, 0, width, height)
  bgGradient.addColorStop(0, '#FFF8DC')
  bgGradient.addColorStop(1, '#F0E68C')
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, width, height)
  
  // Draw pot (Pongal pot)
  ctx.fillStyle = '#8B4513'
  ctx.beginPath()
  ctx.moveTo(centerX - size * 0.6, centerY)
  ctx.lineTo(centerX - size * 0.4, centerY + size * 0.6)
  ctx.lineTo(centerX + size * 0.4, centerY + size * 0.6)
  ctx.lineTo(centerX + size * 0.6, centerY)
  ctx.closePath()
  ctx.fill()
  
  // Pot decoration
  ctx.strokeStyle = '#FFD700'
  ctx.lineWidth = 3
  for (let i = 0; i < 3; i++) {
    ctx.beginPath()
    ctx.arc(centerX, centerY + size * 0.3 + i * 15, size * 0.4, 0, Math.PI * 2)
    ctx.stroke()
  }
  
  // Overflowing rice (white foam)
  ctx.fillStyle = '#FFFFFF'
  ctx.beginPath()
  ctx.arc(centerX, centerY - size * 0.2, size * 0.5, 0, Math.PI * 2)
  ctx.fill()
  
  // Rice bubbles
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8
    const bubbleX = centerX + Math.cos(angle) * size * 0.6
    const bubbleY = centerY - size * 0.2 + Math.sin(angle) * size * 0.6
    ctx.beginPath()
    ctx.arc(bubbleX, bubbleY, size * 0.15, 0, Math.PI * 2)
    ctx.fill()
  }
  
  // Sugarcane stalks
  ctx.strokeStyle = '#228B22'
  ctx.lineWidth = 8
  ctx.beginPath()
  ctx.moveTo(centerX - size * 0.8, centerY + size * 0.8)
  ctx.lineTo(centerX - size * 0.6, centerY - size * 0.8)
  ctx.stroke()
  
  ctx.beginPath()
  ctx.moveTo(centerX + size * 0.8, centerY + size * 0.8)
  ctx.lineTo(centerX + size * 0.6, centerY - size * 0.8)
  ctx.stroke()
  
  // Leaves
  ctx.fillStyle = '#32CD32'
  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.ellipse(centerX - size * 0.6, centerY - size * 0.6 + i * 30, 30, 10, -Math.PI / 4, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.beginPath()
    ctx.ellipse(centerX + size * 0.6, centerY - size * 0.6 + i * 30, 30, 10, Math.PI / 4, 0, Math.PI * 2)
    ctx.fill()
  }
  
  // Sun (top right)
  ctx.fillStyle = '#FFD700'
  ctx.beginPath()
  ctx.arc(width - 60, 60, 30, 0, Math.PI * 2)
  ctx.fill()
  
  // Sun rays
  ctx.strokeStyle = '#FFA500'
  ctx.lineWidth = 3
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8
    ctx.beginPath()
    ctx.moveTo(width - 60 + Math.cos(angle) * 35, 60 + Math.sin(angle) * 35)
    ctx.lineTo(width - 60 + Math.cos(angle) * 50, 60 + Math.sin(angle) * 50)
    ctx.stroke()
  }
}

/**
 * DRAW COLORFUL ONAM KOLAM (POOKALAM)
 * Beautiful flower arrangement design
 */
export const drawOnamKolam = (ctx, width, height, complexity) => {
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) / 3
  
  // Background
  ctx.fillStyle = '#E8F5E9'
  ctx.fillRect(0, 0, width, height)
  
  // Flower colors
  const flowerColors = [
    ['#FF1744', '#FF5252', '#FF8A80'], // Red
    ['#F50057', '#FF4081', '#FF80AB'], // Pink
    ['#D500F9', '#E040FB', '#EA80FC'], // Purple
    ['#651FFF', '#7C4DFF', '#B388FF'], // Deep Purple
    ['#2979FF', '#448AFF', '#82B1FF'], // Blue
    ['#00B0FF', '#40C4FF', '#80D8FF'], // Light Blue
    ['#00E5FF', '#18FFFF', '#84FFFF'], // Cyan
    ['#1DE9B6', '#64FFDA', '#A7FFEB'], // Teal
    ['#00E676', '#69F0AE', '#B9F6CA'], // Green
    ['#76FF03', '#B2FF59', '#CCFF90'], // Light Green
    ['#FFEA00', '#FFD600', '#FFFF00'], // Yellow
    ['#FFC400', '#FFAB00', '#FFD740']  // Amber
  ]
  
  // Draw concentric flower rings
  const rings = 5
  for (let ring = rings; ring > 0; ring--) {
    const ringRadius = (radius / rings) * ring
    const petalsInRing = 8 + ring * 2
    const colorSet = flowerColors[ring % flowerColors.length]
    
    for (let i = 0; i < petalsInRing; i++) {
      const angle = (i * Math.PI * 2) / petalsInRing
      const petalX = centerX + Math.cos(angle) * ringRadius
      const petalY = centerY + Math.sin(angle) * ringRadius
      
      // Draw petal
      const gradient = ctx.createRadialGradient(petalX, petalY, 0, petalX, petalY, 25)
      gradient.addColorStop(0, colorSet[0])
      gradient.addColorStop(0.5, colorSet[1])
      gradient.addColorStop(1, colorSet[2])
      ctx.fillStyle = gradient
      
      ctx.beginPath()
      ctx.ellipse(petalX, petalY, 25, 15, angle, 0, Math.PI * 2)
      ctx.fill()
      
      // Petal outline
      ctx.strokeStyle = 'rgba(0,0,0,0.2)'
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }
  
  // Center flower
  const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40)
  centerGradient.addColorStop(0, '#FFD700')
  centerGradient.addColorStop(0.5, '#FFA500')
  centerGradient.addColorStop(1, '#FF8C00')
  ctx.fillStyle = centerGradient
  ctx.beginPath()
  ctx.arc(centerX, centerY, 40, 0, Math.PI * 2)
  ctx.fill()
  
  // Center details
  ctx.fillStyle = '#8B4513'
  for (let i = 0; i < 20; i++) {
    const angle = (i * Math.PI * 2) / 20
    const dotX = centerX + Math.cos(angle) * 25
    const dotY = centerY + Math.sin(angle) * 25
    ctx.beginPath()
    ctx.arc(dotX, dotY, 2, 0, Math.PI * 2)
    ctx.fill()
  }
}

/**
 * DRAW COLORFUL WEDDING KOLAM
 * Elaborate design with peacocks and flowers
 */
export const drawWeddingKolam = (ctx, width, height, complexity) => {
  const centerX = width / 2
  const centerY = height / 2
  const size = Math.min(width, height) / 3
  
  // Background with gradient
  const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width)
  bgGradient.addColorStop(0, '#FFF5EE')
  bgGradient.addColorStop(1, '#FFE4E1')
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, width, height)
  
  // Draw lotus in center
  const petalColors = ['#FF69B4', '#FF1493', '#C71585', '#DB7093']
  const petals = 8
  
  for (let layer = 2; layer >= 0; layer--) {
    for (let i = 0; i < petals; i++) {
      const angle = (i * Math.PI * 2) / petals + (layer * Math.PI / 16)
      const petalRadius = size * (0.8 - layer * 0.2)
      const petalX = centerX + Math.cos(angle) * petalRadius * 0.5
      const petalY = centerY + Math.sin(angle) * petalRadius * 0.5
      
      // Petal gradient
      const gradient = ctx.createRadialGradient(petalX, petalY, 0, petalX, petalY, petalRadius * 0.4)
      gradient.addColorStop(0, '#FFB6C1')
      gradient.addColorStop(1, petalColors[layer])
      ctx.fillStyle = gradient
      
      ctx.beginPath()
      ctx.ellipse(petalX, petalY, petalRadius * 0.4, petalRadius * 0.2, angle, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.strokeStyle = '#8B008B'
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }
  
  // Center of lotus
  const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size * 0.3)
  centerGradient.addColorStop(0, '#FFD700')
  centerGradient.addColorStop(1, '#FFA500')
  ctx.fillStyle = centerGradient
  ctx.beginPath()
  ctx.arc(centerX, centerY, size * 0.3, 0, Math.PI * 2)
  ctx.fill()
  
  // Decorative border
  ctx.strokeStyle = '#FFD700'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(centerX, centerY, size * 1.5, 0, Math.PI * 2)
  ctx.stroke()
  
  // Border decorations
  const borderDots = 16
  for (let i = 0; i < borderDots; i++) {
    const angle = (i * Math.PI * 2) / borderDots
    const dotX = centerX + Math.cos(angle) * size * 1.5
    const dotY = centerY + Math.sin(angle) * size * 1.5
    
    ctx.fillStyle = i % 2 === 0 ? '#FF1493' : '#FFD700'
    ctx.beginPath()
    ctx.arc(dotX, dotY, 8, 0, Math.PI * 2)
    ctx.fill()
  }
  
  // Corner decorations (small flowers)
  const corners = [
    [50, 50], [width - 50, 50], [50, height - 50], [width - 50, height - 50]
  ]
  
  corners.forEach(([x, y]) => {
    ctx.fillStyle = '#FF69B4'
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, Math.PI * 2)
    ctx.fill()
    
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6
      const px = x + Math.cos(angle) * 25
      const py = y + Math.sin(angle) * 25
      ctx.fillStyle = '#FFB6C1'
      ctx.beginPath()
      ctx.arc(px, py, 10, 0, Math.PI * 2)
      ctx.fill()
    }
  })
}

/**
 * DRAW DAILY PRACTICE KOLAM
 * Simple but colorful daily design
 */
export const drawDailyKolam = (ctx, width, height, complexity) => {
  const centerX = width / 2
  const centerY = height / 2
  const size = Math.min(width, height) / 4
  
  // Background
  ctx.fillStyle = '#FFFAF0'
  ctx.fillRect(0, 0, width, height)
  
  // Draw colorful rangoli pattern
  const colors = ['#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6', '#1ABC9C']
  const layers = 6
  
  for (let layer = layers; layer > 0; layer--) {
    const layerSize = (size / layers) * layer
    const sides = 6
    
    ctx.fillStyle = colors[layer - 1]
    ctx.beginPath()
    
    for (let i = 0; i <= sides; i++) {
      const angle = (i * Math.PI * 2) / sides
      const x = centerX + Math.cos(angle) * layerSize
      const y = centerY + Math.sin(angle) * layerSize
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    
    ctx.closePath()
    ctx.fill()
    
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 3
    ctx.stroke()
  }
  
  // Center dot
  ctx.fillStyle = '#FFD700'
  ctx.beginPath()
  ctx.arc(centerX, centerY, 15, 0, Math.PI * 2)
  ctx.fill()
}

/**
 * GENERATE OCCASION-SPECIFIC PATTERN
 * Creates colorful, authentic kolam designs
 */
export const generateOccasionPattern = (occasion, gridSize, complexity) => {
  // Return drawing function instead of instructions
  return { occasion, type: 'colorful' }
}

/**
 * DRAW PATTERN ON CANVAS
 * Executes drawing instructions on canvas
 */
export const drawPattern = (ctx, instructions, dots, color, lineWidth) => {
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  
  instructions.forEach(instruction => {
    if (instruction.type === 'line') {
      // Get coordinates
      let x1, y1, x2, y2
      
      if (instruction.from.x !== undefined) {
        // Absolute coordinates
        x1 = instruction.from.x
        y1 = instruction.from.y
        x2 = instruction.to.x
        y2 = instruction.to.y
      } else {
        // Grid coordinates
        const fromDot = dots.find(d => 
          d.row === instruction.from.row && d.col === instruction.from.col
        )
        const toDot = dots.find(d => 
          d.row === instruction.to.row && d.col === instruction.to.col
        )
        
        if (!fromDot || !toDot) return
        
        x1 = fromDot.x
        y1 = fromDot.y
        x2 = toDot.x
        y2 = toDot.y
      }
      
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
      
    } else if (instruction.type === 'curve') {
      ctx.beginPath()
      ctx.moveTo(instruction.from.x, instruction.from.y)
      ctx.quadraticCurveTo(
        instruction.control.x,
        instruction.control.y,
        instruction.to.x,
        instruction.to.y
      )
      ctx.stroke()
    }
  })
}
