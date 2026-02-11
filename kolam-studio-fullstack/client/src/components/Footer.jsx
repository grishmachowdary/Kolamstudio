/**
 * FOOTER COMPONENT
 * 
 * Footer that appears at the bottom of every page.
 * Contains links, cultural info, and copyright.
 */

import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-charcoal text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-tamil-orange">
              Kolam Studio
            </h3>
            <p className="text-gray-300 text-sm">
              Preserving South Indian floor art through technology.
              Learn, create, and share traditional patterns.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/generator" className="text-gray-300 hover:text-tamil-orange">
                  Pattern Generator
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-gray-300 hover:text-tamil-orange">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-tamil-orange">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Cultural Info */}
          <div>
            <h4 className="font-semibold mb-4">Regional Styles</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>🟠 Tamil Kolam</li>
              <li>🔵 Telugu Muggulu</li>
              <li>🟡 Kannada Rangoli</li>
              <li>🟢 Malayalam Pookalam</li>
            </ul>
          </div>
          
          {/* Greetings */}
          <div>
            <h4 className="font-semibold mb-4">வணக்கம்</h4>
            <p className="text-sm text-gray-300 space-y-1">
              <span className="block">வணக்கம் Tamil</span>
              <span className="block">నమస్కారం Telugu</span>
              <span className="block">ನಮಸ್ಕಾರ Kannada</span>
              <span className="block">നമസ്കാരം Malayalam</span>
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© 2024 Kolam Studio. Built with ❤️ to preserve cultural heritage.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
