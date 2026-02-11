/**
 * COMMUNITY PAGE
 * 
 * Display public kolams from all users.
 * Features: search, filters, like, comment
 */

import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { kolamAPI, commentAPI } from '../services/api'
import { Heart, MessageCircle, Eye, Search, Filter } from 'lucide-react'

function Community() {
  const { user, isAuthenticated } = useAuth()
  
  // State
  const [kolams, setKolams] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    region: '',
    difficulty: '',
    occasion: '',
    sort: '-createdAt'
  })
  const [showFilters, setShowFilters] = useState(false)
  const [selectedKolam, setSelectedKolam] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  
  /**
   * FETCH KOLAMS
   */
  const fetchKolams = async () => {
    try {
      setLoading(true)
      const response = await kolamAPI.getAll(filters)
      setKolams(response.data.kolams)
    } catch (error) {
      console.error('Error fetching kolams:', error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchKolams()
  }, [filters])
  
  /**
   * LIKE KOLAM
   */
  const handleLike = async (kolamId) => {
    if (!isAuthenticated) {
      alert('Please login to like kolams')
      return
    }
    
    try {
      const response = await kolamAPI.like(kolamId)
      
      // Update local state
      setKolams(kolams.map(k => 
        k._id === kolamId 
          ? { ...k, likes: response.data.likes, isLiked: response.data.isLiked }
          : k
      ))
    } catch (error) {
      console.error('Error liking kolam:', error)
    }
  }
  
  /**
   * VIEW KOLAM DETAILS
   */
  const viewKolam = async (kolam) => {
    setSelectedKolam(kolam)
    
    // Fetch comments
    try {
      const response = await commentAPI.getComments(kolam._id)
      setComments(response.data.comments)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }
  
  /**
   * ADD COMMENT
   */
  const handleAddComment = async (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      alert('Please login to comment')
      return
    }
    
    if (!newComment.trim()) return
    
    try {
      const response = await commentAPI.addComment(selectedKolam._id, {
        text: newComment
      })
      
      setComments([response.data.comment, ...comments])
      setNewComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Community Gallery
        </h1>
        
        {/* Search & Filters */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search kolams..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="input-field pl-10"
              />
            </div>
            
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary"
            >
              <Filter size={20} />
              <span className="ml-2">Filters</span>
            </button>
          </div>
          
          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <select
                value={filters.region}
                onChange={(e) => setFilters({...filters, region: e.target.value})}
                className="input-field"
              >
                <option value="">All Regions</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Kannada">Kannada</option>
                <option value="Malayalam">Malayalam</option>
              </select>
              
              <select
                value={filters.difficulty}
                onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                className="input-field"
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              
              <select
                value={filters.occasion}
                onChange={(e) => setFilters({...filters, occasion: e.target.value})}
                className="input-field"
              >
                <option value="">All Occasions</option>
                <option value="Daily">Daily</option>
                <option value="Diwali">Diwali</option>
                <option value="Pongal">Pongal</option>
                <option value="Onam">Onam</option>
                <option value="Wedding">Wedding</option>
              </select>
              
              <select
                value={filters.sort}
                onChange={(e) => setFilters({...filters, sort: e.target.value})}
                className="input-field"
              >
                <option value="-createdAt">Newest First</option>
                <option value="createdAt">Oldest First</option>
                <option value="-likes">Most Liked</option>
                <option value="-views">Most Viewed</option>
              </select>
            </div>
          )}
        </div>
        
        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tamil-orange mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading kolams...</p>
          </div>
        )}
        
        {/* Kolams Grid */}
        {!loading && kolams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No kolams found. Try adjusting your filters.</p>
          </div>
        )}
        
        {!loading && kolams.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kolams.map(kolam => (
              <div key={kolam._id} className="glass-card overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div 
                  className="relative h-64 bg-gray-200 cursor-pointer"
                  onClick={() => viewKolam(kolam)}
                >
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
                  
                  {/* User */}
                  <p className="text-sm text-gray-500 mb-3">
                    by <span className="font-medium">{kolam.user?.username || 'Anonymous'}</span>
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <button
                      onClick={() => handleLike(kolam._id)}
                      className={`flex items-center gap-1 hover:text-red-500 ${
                        kolam.isLiked ? 'text-red-500' : ''
                      }`}
                    >
                      <Heart size={16} className={kolam.isLiked ? 'fill-current' : ''} />
                      {kolam.likes}
                    </button>
                    
                    <button
                      onClick={() => viewKolam(kolam)}
                      className="flex items-center gap-1 hover:text-blue-500"
                    >
                      <MessageCircle size={16} />
                      {kolam.comments || 0}
                    </button>
                    
                    <div className="flex items-center gap-1">
                      <Eye size={16} />
                      {kolam.views}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Kolam Detail Modal */}
      {selectedKolam && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={() => setSelectedKolam(null)}
                className="float-right text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              
              {/* Image */}
              <div className="mb-6">
                {selectedKolam.imageUrl ? (
                  <img
                    src={`http://localhost:5000${selectedKolam.imageUrl}`}
                    alt={selectedKolam.title}
                    className="w-full max-h-96 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>
              
              {/* Details */}
              <h2 className="text-2xl font-bold mb-2">{selectedKolam.title}</h2>
              <p className="text-gray-600 mb-4">{selectedKolam.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-tamil-orange text-white rounded-full text-sm">
                  {selectedKolam.region}
                </span>
                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                  {selectedKolam.difficulty}
                </span>
                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                  {selectedKolam.occasion}
                </span>
              </div>
              
              {/* Stats */}
              <div className="flex gap-6 mb-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Heart size={20} />
                  {selectedKolam.likes} likes
                </div>
                <div className="flex items-center gap-2">
                  <Eye size={20} />
                  {selectedKolam.views} views
                </div>
              </div>
              
              {/* Comments */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Comments</h3>
                
                {/* Add Comment Form */}
                {isAuthenticated && (
                  <form onSubmit={handleAddComment} className="mb-6">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="input-field mb-2"
                      rows="3"
                    />
                    <button type="submit" className="btn-primary">
                      Post Comment
                    </button>
                  </form>
                )}
                
                {/* Comments List */}
                <div className="space-y-4">
                  {comments.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No comments yet</p>
                  )}
                  
                  {comments.map(comment => (
                    <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{comment.user?.username}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Community
