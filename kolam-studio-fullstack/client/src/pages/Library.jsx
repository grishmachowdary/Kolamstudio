/**
 * LIBRARY PAGE
 * 
 * Display user's saved kolam designs.
 * Features: view, edit, delete, organize
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { kolamAPI } from '../services/api'
import { Eye, Edit, Trash2, Download, Share2, Calendar } from 'lucide-react'

function Library() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  
  const [kolams, setKolams] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, region, occasion, difficulty
  const [selectedOccasion, setSelectedOccasion] = useState('')
  
  /**
   * FETCH USER'S KOLAMS
   */
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    
    fetchMyKolams()
  }, [isAuthenticated])
  
  const fetchMyKolams = async () => {
    try {
      setLoading(true)
      const response = await kolamAPI.getMyKolams()
      setKolams(response.data.kolams)
    } catch (error) {
      console.error('Error fetching kolams:', error)
    } finally {
      setLoading(false)
    }
  }
  
  /**
   * DELETE KOLAM
   */
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this kolam?')) return
    
    try {
      await kolamAPI.delete(id)
      setKolams(kolams.filter(k => k._id !== id))
      alert('✅ Kolam deleted successfully')
    } catch (error) {
      console.error('Error deleting kolam:', error)
      alert('Error deleting kolam')
    }
  }
  
  /**
   * DOWNLOAD KOLAM
   */
  const handleDownload = (kolam) => {
    if (!kolam.imageUrl) return
    
    const link = document.createElement('a')
    link.href = `http://localhost:5000${kolam.imageUrl}`
    link.download = `${kolam.title}.png`
    link.click()
  }
  
  /**
   * FILTER KOLAMS
   */
  const filteredKolams = kolams.filter(kolam => {
    if (selectedOccasion && kolam.occasion !== selectedOccasion) return false
    return true
  })
  
  /**
   * GROUP BY OCCASION
   */
  const groupedByOccasion = filteredKolams.reduce((acc, kolam) => {
    const occasion = kolam.occasion || 'Other'
    if (!acc[occasion]) acc[occasion] = []
    acc[occasion].push(kolam)
    return acc
  }, {})
  
  /**
   * STATS
   */
  const stats = {
    total: kolams.length,
    public: kolams.filter(k => k.isPublic).length,
    private: kolams.filter(k => !k.isPublic).length,
    totalLikes: kolams.reduce((sum, k) => sum + k.likes, 0),
    totalViews: kolams.reduce((sum, k) => sum + k.views, 0)
  }
  
  if (!isAuthenticated) {
    return null
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          My Library
        </h1>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-tamil-orange">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Designs</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-telugu-blue">{stats.public}</div>
            <div className="text-sm text-gray-600">Public</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-kannada-gold">{stats.private}</div>
            <div className="text-sm text-gray-600">Private</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-malayalam-green">{stats.totalLikes}</div>
            <div className="text-sm text-gray-600">Total Likes</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-kumkum-red">{stats.totalViews}</div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
        </div>
        
        {/* Filter */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <span className="font-medium">Filter by Occasion:</span>
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              className="input-field flex-1"
            >
              <option value="">All Occasions</option>
              <option value="Daily">Daily</option>
              <option value="Diwali">Diwali</option>
              <option value="Pongal">Pongal</option>
              <option value="Onam">Onam</option>
              <option value="Wedding">Wedding</option>
              <option value="Festival">Festival</option>
            </select>
            {selectedOccasion && (
              <button
                onClick={() => setSelectedOccasion('')}
                className="btn-secondary"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>
        
        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tamil-orange mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your kolams...</p>
          </div>
        )}
        
        {/* Empty State */}
        {!loading && kolams.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p className="text-gray-600 mb-4">You haven't created any kolams yet</p>
            <button
              onClick={() => navigate('/whiteboard')}
              className="btn-primary"
            >
              Create Your First Kolam
            </button>
          </div>
        )}
        
        {/* Kolams Grid */}
        {!loading && filteredKolams.length === 0 && kolams.length > 0 && (
          <div className="glass-card p-12 text-center">
            <p className="text-gray-600">No kolams found for this filter</p>
          </div>
        )}
        
        {!loading && filteredKolams.length > 0 && (
          <div>
            {/* Group by Occasion */}
            {Object.entries(groupedByOccasion).map(([occasion, occasionKolams]) => (
              <div key={occasion} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar size={24} />
                  {occasion} ({occasionKolams.length})
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {occasionKolams.map(kolam => (
                    <div key={kolam._id} className="glass-card overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Image */}
                      <div className="relative h-64 bg-gray-200">
                        {kolam.imageUrl ? (
                          <img
                            src={`http://localhost:5000${kolam.imageUrl}`}
                            alt={kolam.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex gap-2">
                          <span className="px-2 py-1 bg-tamil-orange text-white text-xs rounded">
                            {kolam.region}
                          </span>
                          <span className="px-2 py-1 bg-black/50 text-white text-xs rounded">
                            {kolam.difficulty}
                          </span>
                          {!kolam.isPublic && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs rounded">
                              Private
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{kolam.title}</h3>
                        
                        {kolam.description && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {kolam.description}
                          </p>
                        )}
                        
                        {/* Date */}
                        <p className="text-xs text-gray-500 mb-3">
                          Created {new Date(kolam.createdAt).toLocaleDateString()}
                        </p>
                        
                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            ❤️ {kolam.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            👁️ {kolam.views}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/kolam/${kolam._id}`)}
                            className="btn-secondary flex-1 text-sm py-2"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDownload(kolam)}
                            className="btn-secondary flex-1 text-sm py-2"
                            title="Download"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(kolam._id)}
                            className="btn-secondary flex-1 text-sm py-2 hover:bg-red-500 hover:text-white"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Library
