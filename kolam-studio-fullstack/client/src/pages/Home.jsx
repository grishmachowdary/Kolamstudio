/**
 * HOME PAGE
 * 
 * Landing page that introduces Kolam Studio.
 * 
 * FEATURES:
 * - Hero section with call-to-action
 * - Feature cards
 * - Cultural information
 * - Statistics
 */

import { Link } from 'react-router-dom'
import { Sparkles, Camera, Paintbrush, BookOpen, Users, Library } from 'lucide-react'

function Home() {
  // Feature cards data
  const features = [
    {
      icon: <Sparkles className="w-12 h-12 text-tamil-orange" />,
      title: 'Pattern Generator',
      description: 'Create unique kolam designs with AI-powered generation',
      link: '/generator',
      color: 'tamil-orange'
    },
    {
      icon: <Camera className="w-12 h-12 text-telugu-blue" />,
      title: 'Scanner',
      description: 'Scan and digitize traditional kolam patterns',
      link: '/scanner',
      color: 'telugu-blue'
    },
    {
      icon: <Paintbrush className="w-12 h-12 text-kannada-gold" />,
      title: 'Whiteboard',
      description: 'Draw kolams digitally with symmetry tools',
      link: '/whiteboard',
      color: 'kannada-gold'
    },
    {
      icon: <BookOpen className="w-12 h-12 text-malayalam-green" />,
      title: 'Tutorials',
      description: 'Learn step-by-step with daily challenges',
      link: '/tutorials',
      color: 'malayalam-green'
    },
    {
      icon: <Users className="w-12 h-12 text-kumkum-red" />,
      title: 'Community',
      description: 'Share and discover patterns from artists',
      link: '/community',
      color: 'kumkum-red'
    },
    {
      icon: <Library className="w-12 h-12 text-telugu-blue" />,
      title: 'Library',
      description: 'Save and organize your kolam designs',
      link: '/library',
      color: 'telugu-blue'
    }
  ]
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-red-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-tamil-orange via-kumkum-red to-telugu-blue bg-clip-text text-transparent">
              Kolam Studio
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Preserve & Create South Indian Floor Art
          </p>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            The world's first platform to learn, create, and share traditional 
            Kolam, Muggulu, Rangoli, and Pookalam patterns using modern technology
          </p>
          
          {/* Cultural Greetings */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <span className="px-4 py-2 bg-tamil-orange text-white rounded-full animate-float">
              வணக்கம் Tamil
            </span>
            <span className="px-4 py-2 bg-telugu-blue text-white rounded-full animate-float" style={{animationDelay: '0.5s'}}>
              నమస్కారం Telugu
            </span>
            <span className="px-4 py-2 bg-kannada-gold text-white rounded-full animate-float" style={{animationDelay: '1s'}}>
              ನಮಸ್ಕಾರ Kannada
            </span>
            <span className="px-4 py-2 bg-malayalam-green text-white rounded-full animate-float" style={{animationDelay: '1.5s'}}>
              നമസ്കാരം Malayalam
            </span>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/whiteboard" className="btn-primary text-lg px-8 py-3">
              Start Creating
            </Link>
            <Link to="/tutorials" className="btn-secondary text-lg px-8 py-3">
              Learn Kolam
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Preserve Culture with Technology
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Everything you need to learn, create, and share traditional South Indian floor art
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="glass-card p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-tamil-orange/10 via-telugu-blue/10 to-malayalam-green/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-tamil-orange mb-2">10,000+</div>
              <div className="text-gray-600">Patterns</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-telugu-blue mb-2">200M+</div>
              <div className="text-gray-600">South Indians</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-kannada-gold mb-2">5</div>
              <div className="text-gray-600">States</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-malayalam-green mb-2">∞</div>
              <div className="text-gray-600">Possibilities</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cultural Context Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            About Kolam Art
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
            <p className="text-lg">
              Kolam (also known as Rangoli, Muggulu, or Pookalam) is a traditional South Indian 
              floor art form created using rice flour, colored powders, or flower petals.
            </p>
            
            <p className="text-lg">
              These intricate geometric patterns are drawn at the entrance of homes every morning, 
              symbolizing welcome, prosperity, and the impermanence of life. Each region has its 
              unique style and cultural significance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-3 text-tamil-orange">Tamil Kolam</h3>
                <p>Dot-based patterns with continuous loops, traditionally drawn with rice flour</p>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-3 text-telugu-blue">Telugu Muggulu</h3>
                <p>Symmetrical designs with cultural and religious significance</p>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-3 text-kannada-gold">Kannada Rangoli</h3>
                <p>Colorful patterns created during festivals and celebrations</p>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-3 text-malayalam-green">Malayalam Pookalam</h3>
                <p>Flower-based designs, especially during Onam festival</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
