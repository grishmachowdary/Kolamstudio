/**
 * VITE CONFIGURATION
 * 
 * Vite is a modern build tool that's faster than Create React App.
 * It uses ES modules and provides instant hot module replacement (HMR).
 * 
 * WHY VITE?
 * - Super fast development server
 * - Instant hot reload
 * - Optimized production builds
 * - Simple configuration
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Development server configuration
  server: {
    host: '0.0.0.0',      // Allow external connections (mobile access)
    port: 5173,           // Frontend runs on port 5173
    proxy: {
      // Proxy API requests to backend during development
      // When frontend makes request to /api/*, it forwards to backend
      '/api': {
        target: 'http://localhost:5000',  // Backend server
        changeOrigin: true,
        secure: false,
      }
    }
  },
  
  // Build configuration
  build: {
    outDir: 'dist',       // Output directory for production build
    sourcemap: true,      // Generate source maps for debugging
  }
})
