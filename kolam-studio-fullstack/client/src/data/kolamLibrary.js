/**
 * AUTHENTIC KOLAM IMAGE LIBRARY
 * 
 * Real traditional kolam designs from various regions and occasions.
 * All images are either:
 * - Public domain
 * - Creative Commons licensed
 * - User-submitted with permission
 * 
 * Each kolam includes:
 * - Image URL
 * - Region
 * - Occasion
 * - Difficulty
 * - Description
 * - Cultural significance
 */

export const kolamLibrary = {
  // TELUGU / TELANGANA / ANDHRA PRADESH
  telugu: {
    sankranti: [
      {
        id: 'tel_san_001',
        title: 'Traditional Sankranti Muggu',
        imageUrl: '/images/kolams/telugu/sankranti-1.jpg',
        region: 'Telugu (Telangana/AP)',
        occasion: 'Sankranti/Pongal',
        difficulty: 'Intermediate',
        description: 'Traditional Sankranti muggu with sugarcane and harvest symbols',
        culturalNote: 'Drawn during Bhogi festival to celebrate harvest season',
        colors: ['White rice flour', 'Kumkum red', 'Turmeric yellow'],
        gridSize: '7x7',
        artist: 'Traditional',
        year: 2024
      },
      {
        id: 'tel_san_002',
        title: 'Gobbemmalu Pattern',
        imageUrl: '/images/kolams/telugu/sankranti-2.jpg',
        region: 'Telugu (Telangana/AP)',
        occasion: 'Sankranti/Pongal',
        difficulty: 'Beginner',
        description: 'Simple cow dung cake pattern symbolizing prosperity',
        culturalNote: 'Represents agricultural abundance and cattle wealth',
        colors: ['White', 'Red'],
        gridSize: '5x5',
        artist: 'Traditional',
        year: 2024
      },
      {
        id: 'tel_san_003',
        title: 'Colorful Sankranti Muggu',
        imageUrl: '/images/kolams/telugu/sankranti-3.jpg',
        region: 'Telugu (Telangana/AP)',
        occasion: 'Sankranti/Pongal',
        difficulty: 'Intermediate',
        description: 'Vibrant multi-colored Sankranti design',
        culturalNote: 'Celebrates the joy and colors of harvest festival',
        colors: ['Multi-colored', 'Bright'],
        gridSize: '7x7',
        artist: 'Traditional',
        year: 2024
      }
    ],
    ugadi: [
      {
        id: 'tel_uga_001',
        title: 'Ugadi Torana Muggu',
        imageUrl: '/images/kolams/telugu/ugadi-1.jpg',
        region: 'Telugu (Telangana/AP)',
        occasion: 'Ugadi/Gudi Padwa',
        difficulty: 'Advanced',
        description: 'Elaborate mango leaf garland design for new year',
        culturalNote: 'Welcomes the Telugu new year with auspicious symbols',
        colors: ['Multi-colored', 'Flower petals'],
        gridSize: '9x9',
        artist: 'Traditional',
        year: 2024
      }
    ]
  },

  // TAMIL NADU
  tamil: {
    margazhi: [
      {
        id: 'tam_mar_001',
        title: 'Margazhi Kolam with Lotus',
        imageUrl: '/images/kolams/tamil/margazhi-1.jpg',
        region: 'Tamil (Tamil Nadu)',
        occasion: 'Margazhi',
        difficulty: 'Intermediate',
        description: 'Sacred lotus kolam drawn at dawn during Margazhi month',
        culturalNote: 'Part of daily worship during the auspicious Margazhi season',
        colors: ['White rice flour', 'Kumkum'],
        gridSize: '5x5',
        artist: 'Traditional',
        year: 2024
      },
      {
        id: 'tam_mar_002',
        title: 'Kambi Kolam',
        imageUrl: '/images/kolams/tamil/margazhi-2.jpg',
        region: 'Tamil (Tamil Nadu)',
        occasion: 'Margazhi',
        difficulty: 'Advanced',
        description: 'Continuous line kolam without lifting hand',
        culturalNote: 'Represents life\'s continuous journey',
        colors: ['White'],
        gridSize: '7x7',
        artist: 'Traditional',
        year: 2024
      }
    ],
    pongal: [
      {
        id: 'tam_pon_001',
        title: 'Pongal Pot Kolam',
        imageUrl: '/images/kolams/tamil/pongal-1.jpg',
        region: 'Tamil (Tamil Nadu)',
        occasion: 'Sankranti/Pongal',
        difficulty: 'Beginner',
        description: 'Traditional Pongal pot with overflowing rice',
        culturalNote: 'Celebrates the harvest festival and prosperity',
        colors: ['Multi-colored', 'Bright'],
        gridSize: '5x5',
        artist: 'Traditional',
        year: 2024
      }
    ]
  },

  // KARNATAKA
  kannada: {
    deepavali: [
      {
        id: 'kan_dee_001',
        title: 'Lakshmi Pada Rangoli',
        imageUrl: '/images/kolams/kannada/deepavali-1.jpg',
        region: 'Kannada (Karnataka)',
        occasion: 'Deepavali/Diwali',
        difficulty: 'Intermediate',
        description: 'Goddess Lakshmi footprints welcoming prosperity',
        culturalNote: 'Drawn at entrance to invite Goddess Lakshmi',
        colors: ['Kumkum red', 'Turmeric yellow'],
        gridSize: '6x6',
        artist: 'Traditional',
        year: 2024
      },
      {
        id: 'kan_dee_002',
        title: 'Deepa Rangoli',
        imageUrl: '/images/kolams/kannada/deepavali-2.jpg',
        region: 'Kannada (Karnataka)',
        occasion: 'Deepavali/Diwali',
        difficulty: 'Advanced',
        description: 'Elaborate lamp design with geometric patterns',
        culturalNote: 'Symbolizes victory of light over darkness',
        colors: ['Multi-colored powders'],
        gridSize: '9x9',
        artist: 'Traditional',
        year: 2024
      }
    ]
  },

  // MAHARASHTRA
  marathi: {
    diwali: [
      {
        id: 'mar_diw_001',
        title: 'Swastika Rangavalli',
        imageUrl: '/images/kolams/marathi/diwali-1.jpg',
        region: 'Marathi (Maharashtra)',
        occasion: 'Deepavali/Diwali',
        difficulty: 'Beginner',
        description: 'Sacred swastika with kalash (pot)',
        culturalNote: 'Ancient Indian symbol of auspiciousness and prosperity',
        colors: ['Red', 'Yellow', 'Green'],
        gridSize: '5x5',
        artist: 'Traditional',
        year: 2024
      },
      {
        id: 'mar_diw_002',
        title: 'Diwali Flower Rangoli',
        imageUrl: '/images/kolams/marathi/diwali-2.jpg',
        region: 'Marathi (Maharashtra)',
        occasion: 'Deepavali/Diwali',
        difficulty: 'Intermediate',
        description: 'Beautiful flower pattern rangoli for Diwali',
        culturalNote: 'Welcomes Goddess Lakshmi during festival of lights',
        colors: ['Orange', 'Yellow', 'Red'],
        gridSize: '7x7',
        artist: 'Traditional',
        year: 2024
      },
      {
        id: 'mar_diw_003',
        title: 'Elaborate Diwali Rangoli',
        imageUrl: '/images/kolams/marathi/diwali-3.jpg',
        region: 'Marathi (Maharashtra)',
        occasion: 'Deepavali/Diwali',
        difficulty: 'Advanced',
        description: 'Intricate multi-layered Diwali rangoli',
        culturalNote: 'Grand design for main Diwali celebration',
        colors: ['Multi-colored', 'Vibrant'],
        gridSize: '9x9',
        artist: 'Traditional',
        year: 2024
      }
    ],
    gudiPadwa: [
      {
        id: 'mar_gud_001',
        title: 'Gudi Padwa Rangoli',
        imageUrl: '/images/kolams/marathi/gudi-padwa-1.jpg',
        region: 'Marathi (Maharashtra)',
        occasion: 'Ugadi/Gudi Padwa',
        difficulty: 'Intermediate',
        description: 'New year rangoli with traditional motifs',
        culturalNote: 'Celebrates Marathi new year',
        colors: ['Bright colors', 'Flower petals'],
        gridSize: '7x7',
        artist: 'Traditional',
        year: 2024
      }
    ]
  },

  // KERALA
  malayalam: {
    onam: [
      {
        id: 'mal_ona_001',
        title: 'Athapookalam - 10 Layers',
        imageUrl: '/images/kolams/malayalam/onam-1.jpg',
        region: 'Malayalam (Kerala)',
        occasion: 'Onam',
        difficulty: 'Advanced',
        description: 'Traditional 10-layer flower carpet for Onam',
        culturalNote: 'Represents 10 days of Onam festival',
        colors: ['Natural flower colors'],
        gridSize: 'Circular',
        artist: 'Traditional',
        year: 2024
      },
      {
        id: 'mal_ona_002',
        title: 'Simple Pookalam',
        imageUrl: '/images/kolams/malayalam/onam-2.jpg',
        region: 'Malayalam (Kerala)',
        occasion: 'Onam',
        difficulty: 'Beginner',
        description: 'Simple flower arrangement for daily Onam celebration',
        culturalNote: 'Made with locally available flowers',
        colors: ['Yellow', 'Orange', 'Purple'],
        gridSize: 'Circular',
        artist: 'Traditional',
        year: 2024
      }
    ]
  },

  // RAJASTHAN
  rajasthani: {
    daily: [
      {
        id: 'raj_dai_001',
        title: 'Peacock Mandana',
        imageUrl: '/images/kolams/rajasthani/mandana-1.jpg',
        region: 'Rajasthani',
        occasion: 'Daily Worship',
        difficulty: 'Intermediate',
        description: 'Traditional peacock folk art on walls',
        culturalNote: 'Rajasthani folk art tradition',
        colors: ['White chalk', 'Red ochre'],
        gridSize: 'Freeform',
        artist: 'Traditional',
        year: 2024
      }
    ]
  }
}

/**
 * HELPER FUNCTIONS
 */

// Get kolams by region
export const getKolamsByRegion = (region) => {
  const regionKey = region.toLowerCase().split(' ')[0]
  return kolamLibrary[regionKey] || {}
}

// Get kolams by occasion
export const getKolamsByOccasion = (region, occasion) => {
  const regionData = getKolamsByRegion(region)
  const occasionKey = occasion.toLowerCase().replace(/[\/\s]/g, '')
  
  // Map occasion names to keys
  const occasionMap = {
    'sankrantipongal': 'sankranti',
    'sankranti': 'sankranti',
    'pongal': 'pongal',
    'margazhi': 'margazhi',
    'deepavalidiwali': 'deepavali',
    'deepavali': 'deepavali',
    'diwali': 'diwali',
    'ugadigudipadwa': 'ugadi',
    'ugadi': 'ugadi',
    'gudipadwa': 'gudiPadwa',
    'onam': 'onam',
    'dailyworship': 'daily'
  }
  
  const key = occasionMap[occasionKey] || 'daily'
  return regionData[key] || []
}

// Get all kolams
export const getAllKolams = () => {
  const allKolams = []
  Object.values(kolamLibrary).forEach(region => {
    Object.values(region).forEach(occasion => {
      allKolams.push(...occasion)
    })
  })
  return allKolams
}

// Get random kolam
export const getRandomKolam = () => {
  const all = getAllKolams()
  return all[Math.floor(Math.random() * all.length)]
}
