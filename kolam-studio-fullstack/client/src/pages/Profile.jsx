/**
 * PROFILE PAGE
 * 
 * User profile with stats and achievements.
 * Features:
 * - User information
 * - Statistics
 * - Achievements & badges
 * - Activity history
 * - Edit profile
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  User, Mail, Calendar, Edit, Save, X, 
  Trophy, Star, Heart, Eye, Image as ImageIcon,
  Award, Target, TrendingUp, Activity
} from 'lucide-react'

function Profile() {
  const { user, isAuthenticated, updateUser } = useAuth()
  const navigate = useNavigate()
  
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  })
  
  /**
   * SIMULATED USER STATS
   * In production, fetch from backend
   */
  const [stats, setStats] = useState({
    totalKolams: 12,
    publicKolams: 8,
    privateKolams: 4,
    totalLikes: 156,
    totalViews: 892,
    totalComments: 34,
    points: 450,
    level: 'Intermediate',
    streak: 7,
    joinedDate: '2024-01-15'
  })
  
  /**
   * ACHIEVEMENTS & BADGES
   */
  const achievements = [
    {
      id: 1,
      name: 'First Steps',
      description: 'Created your first kolam',
      icon: '🎨',
      unlocked: true,
      date: '2024-01-16'
    },
    {
      id: 2,
      name: 'Social Butterfly',
      description: 'Received 50 likes',
      icon: '❤️',
      unlocked: true,
      date: '2024-01-20'
    },
    {
      id: 3,
      name: 'Dedicated Artist',
      description: 'Created 10 kolams',
      icon: '🏆',
      unlocked: true,
      date: '2024-01-25'
    },
    {
      id: 4,
      name: 'Week Warrior',
      description: 'Maintained 7-day streak',
      icon: '🔥',
      unlocked: true,
      date: '2024-02-01'
    },
    {
      id: 5,
      name: 'Master Creator',
      description: 'Create 50 kolams',
      icon: '👑',
      unlocked: false,
      progress: 12,
      total: 50
    },
    {
      id: 6,
      name: 'Community Star',
      description: 'Receive 500 likes',
      icon: '⭐',
      unlocked: false,
      progress: 156,
      total: 500
    }
  ]
  
  /**
   * RECENT ACTIVITY
   */
  const recentActivity = [
    {
      id: 1,
      type: 'created',
      title: 'Pongal Special Kolam',
      date: '2024-02-08',
      likes: 23
    },
    {
      id: 2,
      type: 'liked',
      title: 'Beautiful Radial Pattern',
      date: '2024-02-07',
      user: 'priya_art'
    },
    {
      id: 3,
      type: 'commented',
      title: 'Traditional Tamil Kolam',
      date: '2024-02-06',
      user: 'kolam_master'
    }
  ]
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || ''
      })
    }
  }, [isAuthenticated, user, navigate])
  
  /**
   * HANDLE EDIT
   */
  const handleEdit = () => {
    setEditing(true)
  }
  
  /**
   * HANDLE CANCEL
   */
  const handleCancel = () => {
    setEditing(false)
    setFormData({
      username: user.username || '',
      email: user.email || ''
    })
  }
  
  /**
   * HANDLE SAVE
   */
  const handleSave = async () => {
    try {
      // In production: call API to update profile
      // await updateUser(formData)
      alert('✅ Profile updated successfully!')
      setEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile')
    }
  }
  
  if (!isAuthenticated || !user) {
    return null
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          My Profile
        </h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="glass-card p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-tamil-orange to-telugu-blue rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold mb-1">{user.username}</h2>
                <p className="text-gray-600 text-sm">{stats.level} Artist</p>
              </div>
              
              {/* User Info */}
              <div className="space-y-4">
                {editing ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Username</label>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="btn-primary flex-1">
                        <Save size={16} />
                        <span className="ml-2">Save</span>
                      </button>
                      <button onClick={handleCancel} className="btn-secondary flex-1">
                        <X size={16} />
                        <span className="ml-2">Cancel</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 text-gray-700">
                      <User size={20} />
                      <span>{user.username}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Mail size={20} />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar size={20} />
                      <span className="text-sm">
                        Joined {new Date(stats.joinedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <button onClick={handleEdit} className="btn-primary w-full">
                      <Edit size={16} />
                      <span className="ml-2">Edit Profile</span>
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Level Progress */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={20} />
                Level Progress
              </h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-tamil-orange mb-1">
                  {stats.points}
                </div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-tamil-orange to-telugu-blue h-3 rounded-full"
                  style={{ width: '65%' }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 text-center">
                350 points to Advanced level
              </p>
            </div>
          </div>
          
          {/* Right Column - Stats & Activity */}
          <div className="md:col-span-2 space-y-6">
            {/* Statistics */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Activity size={20} />
                Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-tamil-orange/10 to-tamil-orange/5 rounded-lg">
                  <ImageIcon className="mx-auto mb-2 text-tamil-orange" size={24} />
                  <div className="text-2xl font-bold">{stats.totalKolams}</div>
                  <div className="text-sm text-gray-600">Total Kolams</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-telugu-blue/10 to-telugu-blue/5 rounded-lg">
                  <Heart className="mx-auto mb-2 text-telugu-blue" size={24} />
                  <div className="text-2xl font-bold">{stats.totalLikes}</div>
                  <div className="text-sm text-gray-600">Total Likes</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-kannada-gold/10 to-kannada-gold/5 rounded-lg">
                  <Eye className="mx-auto mb-2 text-kannada-gold" size={24} />
                  <div className="text-2xl font-bold">{stats.totalViews}</div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-malayalam-green/10 to-malayalam-green/5 rounded-lg">
                  <Star className="mx-auto mb-2 text-malayalam-green" size={24} />
                  <div className="text-2xl font-bold">{stats.publicKolams}</div>
                  <div className="text-sm text-gray-600">Public</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-kumkum-red/10 to-kumkum-red/5 rounded-lg">
                  <Target className="mx-auto mb-2 text-kumkum-red" size={24} />
                  <div className="text-2xl font-bold">{stats.streak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-lg">
                  <Trophy className="mx-auto mb-2 text-purple-500" size={24} />
                  <div className="text-2xl font-bold">{achievements.filter(a => a.unlocked).length}</div>
                  <div className="text-sm text-gray-600">Achievements</div>
                </div>
              </div>
            </div>
            
            {/* Achievements */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Award size={20} />
                Achievements & Badges
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-tamil-orange/10 to-telugu-blue/10 border-tamil-orange'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h4 className="font-semibold text-sm mb-1">{achievement.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                    {achievement.unlocked ? (
                      <span className="text-xs text-green-600 font-medium">
                        ✓ Unlocked
                      </span>
                    ) : (
                      <div className="text-xs text-gray-500">
                        {achievement.progress}/{achievement.total}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Activity size={20} />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'created' ? 'bg-tamil-orange' :
                      activity.type === 'liked' ? 'bg-telugu-blue' :
                      'bg-kannada-gold'
                    }`}>
                      {activity.type === 'created' ? (
                        <ImageIcon className="text-white" size={16} />
                      ) : activity.type === 'liked' ? (
                        <Heart className="text-white" size={16} />
                      ) : (
                        <Star className="text-white" size={16} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        {activity.type === 'created' && (
                          <>Created <span className="font-medium">{activity.title}</span></>
                        )}
                        {activity.type === 'liked' && (
                          <>Liked <span className="font-medium">{activity.title}</span> by {activity.user}</>
                        )}
                        {activity.type === 'commented' && (
                          <>Commented on <span className="font-medium">{activity.title}</span> by {activity.user}</>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                    {activity.likes && (
                      <div className="text-sm text-gray-600">
                        ❤️ {activity.likes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
