/**
 * TAILWIND CSS CONFIGURATION
 * 
 * Tailwind is a utility-first CSS framework.
 * Instead of writing custom CSS, you use pre-built classes like:
 * - "bg-blue-500" for blue background
 * - "text-center" for centered text
 * - "p-4" for padding
 * 
 * WHY TAILWIND?
 * - Fast development
 * - Consistent design
 * - No CSS file management
 * - Responsive by default
 */

export default {
  // Tell Tailwind which files to scan for class names
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",  // Scan all JS and JSX files
  ],
  
  theme: {
    extend: {
      // Custom colors for South Indian cultural themes
      colors: {
        // Regional colors
        'tamil-orange': '#E67E22',      // Turmeric-inspired
        'telugu-blue': '#3498DB',       // Traditional indigo
        'kannada-gold': '#F39C12',      // Sandalwood gold
        'malayalam-green': '#27AE60',   // Kerala green
        'kumkum-red': '#E74C3C',        // Sacred vermillion
        
        // Neutral colors
        'sand': '#F5F2E6',              // Paper-like background
        'charcoal': '#2C3E50',          // Text color
      },
      
      // Custom fonts (you can add Google Fonts later)
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  
  plugins: [],
}
