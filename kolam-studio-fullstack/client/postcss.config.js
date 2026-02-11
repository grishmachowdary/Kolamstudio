/**
 * POSTCSS CONFIGURATION
 * 
 * PostCSS processes our CSS files.
 * It's needed for Tailwind CSS to work.
 * 
 * WHAT IT DOES:
 * 1. Tailwind plugin - Generates utility classes
 * 2. Autoprefixer - Adds browser-specific CSS prefixes automatically
 */

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
