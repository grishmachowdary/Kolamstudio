/**
 * NAVBAR COMPONENT
 * 
 * Navigation bar that appears at the top of every page.
 * 
 * FEATURES:
 * - Logo and app name
 * - Navigation links
 * - User menu (if logged in)
 * - Login/Register buttons (if not logged in)
 * - Responsive mobile menu
 */

import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useState } from 'react'

function Navbar() {
  // Get auth state from context
  const { user, logout, isAuthenticated } = useAuth()
  
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/generator', label: 'Generator' },
    { path: '/scanner', label: 'Scanner' },
    { path: '/whiteboard', label: 'Whiteboard' },
    { path: '/tutorials', label: 'Tutorials' },
    { path: '/community', label: 'Community' },
  ]
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🎨</span>
            <span className="text-xl font-bold text-tamil-orange">
              Kolam Studio
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="text-charcoal hover:text-tamil-orange transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Show Library link only if logged in */}
            {isAuthenticated && (
              <Link
                to="/library"
                className="text-charcoal hover:text-tamil-orange transition-colors"
              >
                Library
              </Link>
            )}
          </div>
          
          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              // Logged in: Show user menu
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-charcoal hover:text-tamil-orange"
                >
                  <User size={20} />
                  <span>{user?.username}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-charcoal hover:text-red-500"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              // Not logged in: Show login/register buttons
              <>
                <Link to="/login" className="btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-charcoal hover:text-tamil-orange"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/library"
                    className="text-charcoal hover:text-tamil-orange"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Library
                  </Link>
                  <Link
                    to="/profile"
                    className="text-charcoal hover:text-tamil-orange"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="text-left text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-charcoal hover:text-tamil-orange"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-charcoal hover:text-tamil-orange"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
