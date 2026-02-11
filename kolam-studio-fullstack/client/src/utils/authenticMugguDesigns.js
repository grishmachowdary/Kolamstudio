/**
 * AUTHENTIC INDIAN MUGGU/KOLAM DESIGNS
 * 
 * Region-specific, culturally-rooted designs based on:
 * - Temple art and architecture
 * - Festival traditions
 * - Folk art practices
 * - Devotional symbolism
 * - Regional heritage
 * 
 * NO western mandalas, NO mathematical patterns, NO generic AI art
 * ONLY authentic Indian cultural designs
 */

/**
 * TELANGANA SANKRANTI MUGGULU
 * Traditional Bhogi/Sankranti designs with symbolic elements
 */
export const drawTeluguSankrantiMuggu = (ctx, width, height) => {
  const centerX = width / 2
  const centerY = height / 2
  
  // Background - traditional floor color
  ctx.fillStyle = '#F5E6D3'
  ctx.fillRect(0, 0, width, height)
  
  // Draw Gobbemmalu (cow dung cakes) pattern - traditional Sankranti symbol
  // Represents prosperity and agricultural heritage
  
  // Center Rangavalli (rice flour white)
  ctx.strokeStyle = '#FFFFFF'
  ctx.fillStyle = '#FFFFFF'
  ctx.lineWidth = 4
  
  // Traditional 7-dot pulli base (auspicious number)
  const dotPositions = [
    [centerX, centerY - 60],
    [centerX - 52, centerY - 30],
    [centerX - 52, centerY + 30],
    [centerX, centerY + 60],
    [centerX + 52, centerY + 30],
    [centerX + 52, centerY - 30],
    [centerX, centerY]
  ]
  
  // Draw connecting loops (never lifting hand - continuous line)
  ctx.beginPath()
  ctx.moveTo(dotPositions[0][0], dotPositions[0][1])
  
  // Traditional looping pattern around dots
  for (let i = 0; i < dotPositions.length; i++) {
    const current = dotPositions[i]
    const next = dotPositions[(i + 1) % dotPositions.length]
    
    ctx.quadraticCurveTo(
      current[0] + 20,
      current[1] - 20,
      next[0],
      next[1]
    )
  }
  ctx.stroke()
  
  // Add kumkum (turmeric/vermillion) dots at key points
  ctx.fillStyle = '#FF6B35' // Kumkum red
  dotPositions.forEach(([x, y]) => {
    ctx.beginPath()
    ctx.arc(x, y, 6, 0, Math.PI * 2)
    ctx.fill()
  })

  
  // Sugarcane and harvest symbols (Sankranti tradition)
  ctx.strokeStyle = '#4A7C59' // Natural green
  ctx.lineWidth = 6
  
  // Left sugarcane
  ctx.beginPath()
  ctx.moveTo(centerX - 100, centerY + 80)
  ctx.lineTo(centerX - 90, centerY - 80)
  ctx.stroke()
  
  // Right sugarcane
  ctx.beginPath()
  ctx.moveTo(centerX + 100, centerY + 80)
  ctx.lineTo(centerX + 90, centerY - 80)
  ctx.stroke()
  
  // Til (sesame) and jaggery symbols - traditional Sankranti offerings
  ctx.fillStyle = '#8B4513'
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8
    const x = centerX + Math.cos(angle) * 80
    const y = centerY + Math.sin(angle) * 80
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fill()
  }
}

/**
 * TAMIL NADU KOLAM - MARGAZHI TRADITION
 * Dawn kolam with lotus and lamp symbolism
 */
export const drawTamilMargazhiKolam = (ctx, width, height) => {
  const centerX = width / 2
  const centerY = height / 2
  
  // Traditional red oxide floor background
  ctx.fillStyle = '#D4A574'
  ctx.fillRect(0, 0, width, height)
  
  // Rice flour white kolam (maavu kolam)
  ctx.strokeStyle = '#FEFEFE'
  ctx.fillStyle = '#FEFEFE'
  ctx.lineWidth = 3
  
  // Traditional 5-dot pulli pattern (pancha bhuta - five elements)
  const dotGrid = []
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      dotGrid.push([
        centerX - 80 + col * 40,
        centerY - 80 + row * 40
      ])
    }
  }
  
  // Draw dots
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
  dotGrid.forEach(([x, y]) => {
    ctx.beginPath()
    ctx.arc(x, y, 2, 0, Math.PI * 2)
    ctx.fill()
  })
  
  // Traditional kambi kolam (line kolam) - continuous unbroken line
  ctx.strokeStyle = '#FFFFFF'
  ctx.lineWidth = 4
  
  // Draw sacred lotus (padma) in center - symbol of purity
  const petalCount = 8 // Ashtadala padma (8-petaled lotus)
  
  for (let i = 0; i < petalCount; i++) {
    const angle = (i * Math.PI * 2) / petalCount
    const petalLength = 50
    
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.quadraticCurveTo(
      centerX + Math.cos(angle) * petalLength * 0.7,
      centerY + Math.sin(angle) * petalLength * 0.7,
      centerX + Math.cos(angle) * petalLength,
      centerY + Math.sin(angle) * petalLength
    )
    ctx.quadraticCurveTo(
      centerX + Math.cos(angle + 0.3) * petalLength * 0.5,
      centerY + Math.sin(angle + 0.3) * petalLength * 0.5,
      centerX,
      centerY
    )
    ctx.stroke()
  }
  
  // Kumkum center (bindu - cosmic center)
  ctx.fillStyle = '#C41E3A' // Sacred kumkum red
  ctx.beginPath()
  ctx.arc(centerX, centerY, 8, 0, Math.PI * 2)
  ctx.fill()
  
  // Turmeric yellow border (mangala - auspiciousness)
  ctx.strokeStyle = '#FDB813'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(centerX, centerY, 90, 0, Math.PI * 2)
  ctx.stroke()
}

/**
 * KARNATAKA RANGOLI - DEEPAVALI TRADITION
 * Lakshmi pada (footprints) welcoming goddess
 */
export const drawKarnatakaDeepavaliRangoli = (ctx, width, height) => {
  const centerX = width / 2
  const centerY = height / 2
  
  // Traditional floor color
  ctx.fillStyle = '#E8DCC4'
  ctx.fillRect(0, 0, width, height)
  
  // Lakshmi pada (goddess footprints) - welcoming prosperity
  // Traditional entrance rangoli
  
  const drawFootprint = (x, y, rotation) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)
    
    // Kumkum red footprint
    ctx.fillStyle = '#DC143C'
    
    // Toes
    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      ctx.ellipse(-15 + i * 8, -20, 4, 6, 0, 0, Math.PI * 2)
      ctx.fill()
    }
    
    // Foot sole
    ctx.beginPath()
    ctx.ellipse(0, 0, 15, 25, 0, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.restore()
  }
  
  // Draw pair of footprints (right and left)
  drawFootprint(centerX - 30, centerY - 40, 0.2)
  drawFootprint(centerX + 30, centerY + 40, Math.PI + 0.2)
  
  // Surround with traditional deepa (lamp) symbols
  const lampPositions = [
    [centerX - 80, centerY - 80],
    [centerX + 80, centerY - 80],
    [centerX - 80, centerY + 80],
    [centerX + 80, centerY + 80]
  ]
  
  lampPositions.forEach(([x, y]) => {
    // Diya base
    ctx.fillStyle = '#CD7F32' // Bronze
    ctx.beginPath()
    ctx.ellipse(x, y, 15, 8, 0, 0, Math.PI * 2)
    ctx.fill()
    
    // Flame
    ctx.fillStyle = '#FFA500'
    ctx.beginPath()
    ctx.moveTo(x, y - 20)
    ctx.quadraticCurveTo(x - 8, y - 5, x, y)
    ctx.quadraticCurveTo(x + 8, y - 5, x, y - 20)
    ctx.fill()
    
    // Flame glow
    ctx.fillStyle = '#FFD700'
    ctx.beginPath()
    ctx.arc(x, y - 10, 5, 0, Math.PI * 2)
    ctx.fill()
  })
  
  // Rangoli border with mango leaves (mangala torana)
  ctx.strokeStyle = '#228B22'
  ctx.fillStyle = '#32CD32'
  ctx.lineWidth = 3
  
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI * 2) / 12
    const x = centerX + Math.cos(angle) * 110
    const y = centerY + Math.sin(angle) * 110
    
    // Mango leaf
    ctx.beginPath()
    ctx.ellipse(x, y, 12, 6, angle, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  }
}


/**
 * MAHARASHTRA RANGAVALLI - DIWALI PADWA
 * Swastika and kalash (sacred pot) design
 */
export const drawMaharashtraRangavalli = (ctx, width, height) => {
  const centerX = width / 2
  const centerY = height / 2
  
  // Traditional floor
  ctx.fillStyle = '#F4E4C1'
  ctx.fillRect(0, 0, width, height)
  
  // Draw Swastika (ancient Indian symbol of auspiciousness)
  // NOT Nazi symbol - this is 10,000 year old Indian sacred symbol
  ctx.strokeStyle = '#FF6347' // Kumkum red
  ctx.lineWidth = 8
  ctx.lineCap = 'square'
  
  const swastikaSize = 40
  
  // Vertical line
  ctx.beginPath()
  ctx.moveTo(centerX, centerY - swastikaSize)
  ctx.lineTo(centerX, centerY + swastikaSize)
  ctx.stroke()
  
  // Horizontal line
  ctx.beginPath()
  ctx.moveTo(centerX - swastikaSize, centerY)
  ctx.lineTo(centerX + swastikaSize, centerY)
  ctx.stroke()
  
  // Four arms (clockwise - right-facing swastika for prosperity)
  ctx.beginPath()
  ctx.moveTo(centerX, centerY - swastikaSize)
  ctx.lineTo(centerX + 20, centerY - swastikaSize)
  ctx.stroke()
  
  ctx.beginPath()
  ctx.moveTo(centerX + swastikaSize, centerY)
  ctx.lineTo(centerX + swastikaSize, centerY + 20)
  ctx.stroke()
  
  ctx.beginPath()
  ctx.moveTo(centerX, centerY + swastikaSize)
  ctx.lineTo(centerX - 20, centerY + swastikaSize)
  ctx.stroke()
  
  ctx.beginPath()
  ctx.moveTo(centerX - swastikaSize, centerY)
  ctx.lineTo(centerX - swastikaSize, centerY - 20)
  ctx.stroke()
  
  // Four dots (bindu) at corners - representing four Vedas
  ctx.fillStyle = '#FFD700' // Turmeric yellow
  const dotPositions = [
    [centerX + 15, centerY - 15],
    [centerX + 15, centerY + 15],
    [centerX - 15, centerY + 15],
    [centerX - 15, centerY - 15]
  ]
  
  dotPositions.forEach(([x, y]) => {
    ctx.beginPath()
    ctx.arc(x, y, 6, 0, Math.PI * 2)
    ctx.fill()
  })
  
  // Kalash (sacred pot) at four corners
  const kalashPositions = [
    [centerX - 90, centerY - 90],
    [centerX + 90, centerY - 90],
    [centerX - 90, centerY + 90],
    [centerX + 90, centerY + 90]
  ]
  
  kalashPositions.forEach(([x, y]) => {
    // Pot base
    ctx.fillStyle = '#CD853F'
    ctx.beginPath()
    ctx.moveTo(x - 15, y + 20)
    ctx.lineTo(x - 10, y)
    ctx.lineTo(x + 10, y)
    ctx.lineTo(x + 15, y + 20)
    ctx.closePath()
    ctx.fill()
    
    // Pot neck
    ctx.fillStyle = '#D2691E'
    ctx.fillRect(x - 8, y - 10, 16, 10)
    
    // Coconut on top
    ctx.fillStyle = '#8B4513'
    ctx.beginPath()
    ctx.arc(x, y - 15, 8, 0, Math.PI * 2)
    ctx.fill()
    
    // Mango leaves
    ctx.fillStyle = '#228B22'
    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      ctx.ellipse(x - 10 + i * 5, y - 20, 4, 8, 0, 0, Math.PI * 2)
      ctx.fill()
    }
  })
  
  // Border with traditional paisley (mango) motifs
  ctx.strokeStyle = '#8B0000'
  ctx.lineWidth = 2
  
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8
    const x = centerX + Math.cos(angle) * 120
    const y = centerY + Math.sin(angle) * 120
    
    // Paisley/mango motif
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI, false)
    ctx.quadraticCurveTo(x + 15, y, x, y + 15)
    ctx.stroke()
  }
}

/**
 * ANDHRA PRADESH MUGGULU - UGADI (NEW YEAR)
 * Mango leaves and flower garland design
 */
export const drawAndhraUgadiMuggu = (ctx, width, height) => {
  const centerX = width / 2
  const centerY = height / 2
  
  // Traditional floor
  ctx.fillStyle = '#F5DEB3'
  ctx.fillRect(0, 0, width, height)
  
  // Torana (door garland) design - welcoming new year
  
  // Draw mango leaf garland (mangala torana)
  ctx.strokeStyle = '#2E7D32'
  ctx.fillStyle = '#4CAF50'
  ctx.lineWidth = 2
  
  // Top arch
  for (let i = 0; i < 15; i++) {
    const angle = Math.PI + (i * Math.PI) / 14
    const radius = 100
    const x = centerX + Math.cos(angle) * radius
    const y = centerY - 50 + Math.sin(angle) * radius * 0.5
    
    // Mango leaf
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle - Math.PI / 2)
    
    ctx.beginPath()
    ctx.moveTo(0, -15)
    ctx.quadraticCurveTo(5, -5, 0, 5)
    ctx.quadraticCurveTo(-5, -5, 0, -15)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    
    ctx.restore()
  }
  
  // Hanging flower strings (pushpa mala)
  const stringCount = 5
  for (let s = 0; s < stringCount; s++) {
    const x = centerX - 80 + s * 40
    
    // String
    ctx.strokeStyle = '#8B4513'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x, centerY - 50)
    ctx.lineTo(x, centerY + 60)
    ctx.stroke()
    
    // Flowers on string
    const flowerColors = ['#FF6B9D', '#FFD93D', '#FF6B35', '#6BCB77', '#4D96FF']
    for (let f = 0; f < 6; f++) {
      const y = centerY - 40 + f * 18
      
      ctx.fillStyle = flowerColors[s]
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()
      
      // Petals
      for (let p = 0; p < 5; p++) {
        const pAngle = (p * Math.PI * 2) / 5
        const px = x + Math.cos(pAngle) * 8
        const py = y + Math.sin(pAngle) * 8
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }
  
  // Neem leaves at bottom (health and prosperity)
  ctx.fillStyle = '#2E7D32'
  for (let i = 0; i < 10; i++) {
    const x = centerX - 100 + i * 22
    const y = centerY + 80
    
    ctx.beginPath()
    ctx.ellipse(x, y, 8, 4, 0, 0, Math.PI * 2)
    ctx.fill()
  }
  
  // Kumkum dots (bindi) for auspiciousness
  ctx.fillStyle = '#DC143C'
  for (let i = 0; i < 7; i++) {
    const angle = (i * Math.PI * 2) / 7
    const x = centerX + Math.cos(angle) * 70
    const y = centerY + Math.sin(angle) * 70
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, Math.PI * 2)
    ctx.fill()
  }
}


/**
 * KERALA POOKALAM - ONAM FESTIVAL
 * Flower carpet with traditional athapookalam design
 */
export const drawKeralaPookalam = (ctx, width, height) => {
  const centerX = width / 2
  const centerY = height / 2
  
  // Traditional floor
  ctx.fillStyle = '#FFF8DC'
  ctx.fillRect(0, 0, width, height)
  
  // Athapookalam - 10 concentric circles representing 10 days of Onam
  const flowerLayers = [
    { radius: 30, color: '#FFD700', name: 'Thumba (golden)' },
    { radius: 45, color: '#FF6347', name: 'Chemparathi (hibiscus)' },
    { radius: 60, color: '#FF1493', name: 'Kanakambaram (firecracker)' },
    { radius: 75, color: '#9370DB', name: 'Mukkutti (purple)' },
    { radius: 90, color: '#4169E1', name: 'Shankhupushpam (blue)' },
    { radius: 105, color: '#00CED1', name: 'Aparajita (butterfly pea)' },
    { radius: 120, color: '#32CD32', name: 'Tulsi leaves' },
    { radius: 135, color: '#FFFF00', name: 'Thechi (marigold)' },
    { radius: 150, color: '#FFA500', name: 'Mandaram (orange)' },
    { radius: 165, color: '#FFFFFF', name: 'Poovarasu (white)' }
  ]
  
  // Draw each flower layer
  flowerLayers.reverse().forEach(layer => {
    // Flower petals in circular arrangement
    const petalCount = Math.floor(layer.radius / 5)
    
    for (let i = 0; i < petalCount; i++) {
      const angle = (i * Math.PI * 2) / petalCount
      const x = centerX + Math.cos(angle) * layer.radius
      const y = centerY + Math.sin(angle) * layer.radius
      
      // Individual flower
      ctx.fillStyle = layer.color
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fill()
      
      // Flower center
      ctx.fillStyle = '#8B4513'
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    }
  })
  
  // Center lamp (nilavilakku) - traditional Kerala lamp
  ctx.fillStyle = '#B8860B' // Brass color
  
  // Lamp base
  ctx.beginPath()
  ctx.ellipse(centerX, centerY + 15, 20, 8, 0, 0, Math.PI * 2)
  ctx.fill()
  
  // Lamp stem
  ctx.fillRect(centerX - 3, centerY - 15, 6, 30)
  
  // Lamp top
  ctx.beginPath()
  ctx.ellipse(centerX, centerY - 15, 15, 6, 0, 0, Math.PI * 2)
  ctx.fill()
  
  // Flame
  ctx.fillStyle = '#FF4500'
  ctx.beginPath()
  ctx.moveTo(centerX, centerY - 35)
  ctx.quadraticCurveTo(centerX - 8, centerY - 20, centerX, centerY - 15)
  ctx.quadraticCurveTo(centerX + 8, centerY - 20, centerX, centerY - 35)
  ctx.fill()
  
  // Flame glow
  ctx.fillStyle = '#FFD700'
  ctx.beginPath()
  ctx.arc(centerX, centerY - 25, 6, 0, Math.PI * 2)
  ctx.fill()
}

/**
 * RAJASTHAN MANDANA - FOLK ART TRADITION
 * Peacock and nature motifs
 */
export const drawRajasthanMandana = (ctx, width, height) => {
  const centerX = width / 2
  const centerY = height / 2
  
  // Traditional mud wall color
  ctx.fillStyle = '#D2B48C'
  ctx.fillRect(0, 0, width, height)
  
  // White chalk/lime design (traditional mandana)
  ctx.strokeStyle = '#FFFFFF'
  ctx.fillStyle = '#FFFFFF'
  ctx.lineWidth = 3
  
  // Draw peacock (mor) - symbol of beauty and grace
  
  // Peacock body
  ctx.beginPath()
  ctx.ellipse(centerX, centerY + 20, 25, 35, 0, 0, Math.PI * 2)
  ctx.fill()
  
  // Peacock neck
  ctx.beginPath()
  ctx.moveTo(centerX, centerY - 15)
  ctx.lineTo(centerX - 10, centerY - 40)
  ctx.lineWidth = 8
  ctx.stroke()
  
  // Peacock head
  ctx.beginPath()
  ctx.arc(centerX - 10, centerY - 45, 8, 0, Math.PI * 2)
  ctx.fill()
  
  // Crown (mukut)
  for (let i = 0; i < 3; i++) {
    ctx.beginPath()
    ctx.moveTo(centerX - 10, centerY - 50)
    ctx.lineTo(centerX - 15 + i * 5, centerY - 60)
    ctx.lineWidth = 2
    ctx.stroke()
    
    ctx.beginPath()
    ctx.arc(centerX - 15 + i * 5, centerY - 62, 3, 0, Math.PI * 2)
    ctx.fill()
  }
  
  // Peacock feathers (mor pankh) - elaborate tail
  const featherCount = 7
  for (let i = 0; i < featherCount; i++) {
    const angle = Math.PI / 2 + (i - 3) * 0.4
    const featherLength = 70
    
    const endX = centerX + Math.cos(angle) * featherLength
    const endY = centerY + 20 + Math.sin(angle) * featherLength
    
    // Feather stem
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(centerX, centerY + 20)
    ctx.lineTo(endX, endY)
    ctx.stroke()
    
    // Feather eye (peacock eye pattern)
    ctx.fillStyle = '#4169E1' // Blue
    ctx.beginPath()
    ctx.arc(endX, endY, 8, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillStyle = '#32CD32' // Green
    ctx.beginPath()
    ctx.arc(endX, endY, 5, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.fillStyle = '#FFD700' // Gold center
    ctx.beginPath()
    ctx.arc(endX, endY, 2, 0, Math.PI * 2)
    ctx.fill()
  }
  
  // Border with traditional Rajasthani motifs
  ctx.strokeStyle = '#FFFFFF'
  ctx.lineWidth = 3
  
  // Corner decorations (phool - flowers)
  const corners = [
    [40, 40], [width - 40, 40], [40, height - 40], [width - 40, height - 40]
  ]
  
  corners.forEach(([x, y]) => {
    // Flower
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6
      const px = x + Math.cos(angle) * 15
      const py = y + Math.sin(angle) * 15
      
      ctx.beginPath()
      ctx.arc(px, py, 5, 0, Math.PI * 2)
      ctx.fill()
    }
    
    // Center
    ctx.fillStyle = '#FF6347'
    ctx.beginPath()
    ctx.arc(x, y, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#FFFFFF'
  })
}

// Export all authentic designs
export const authenticMugguDesigns = {
  telugu_sankranti: drawTeluguSankrantiMuggu,
  tamil_margazhi: drawTamilMargazhiKolam,
  karnataka_deepavali: drawKarnatakaDeepavaliRangoli,
  maharashtra_diwali: drawMaharashtraRangavalli,
  andhra_ugadi: drawAndhraUgadiMuggu,
  kerala_onam: drawKeralaPookalam,
  rajasthan_mandana: drawRajasthanMandana
}
