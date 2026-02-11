/**
 * TUTORIALS PAGE
 * 
 * Learning platform for kolam patterns.
 * Features:
 * - Structured tutorials (Beginner → Advanced)
 * - Step-by-step animations
 * - Daily challenges
 * - Progress tracking
 * - Regional style lessons
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  BookOpen, Play, Lock, CheckCircle, Star, Trophy, 
  Calendar, Target, Award, ChevronRight, Sparkles 
} from 'lucide-react'

function Tutorials() {
  const navigate = useNavigate()
  const [selectedLevel, setSelectedLevel] = useState('beginner')
  const [completedTutorials, setCompletedTutorials] = useState([1, 2]) // Simulated progress
  
  /**
   * TUTORIAL DATA
   * 
   * In production, this would come from backend/database
   */
  const tutorials = {
    beginner: [
      {
        id: 1,
        title: 'Introduction to Kolam',
        description: 'Learn the basics of kolam art and its cultural significance',
        duration: '10 min',
        steps: 5,
        region: 'All',
        completed: true
      },
      {
        id: 2,
        title: 'Simple Dot Grid (3×3)',
        description: 'Master the basic 3×3 dot grid pattern',
        duration: '15 min',
        steps: 8,
        region: 'Tamil',
        completed: true
      },
      {
        id: 3,
        title: 'Basic Lines & Curves',
        description: 'Learn to draw smooth lines connecting dots',
        duration: '20 min',
        steps: 10,
        region: 'All',
        completed: false
      },
      {
        id: 4,
        title: 'Simple Square Pattern',
        description: 'Create your first complete square kolam',
        duration: '25 min',
        steps: 12,
        region: 'Tamil',
        completed: false
      }
    ],
    intermediate: [
      {
        id: 5,
        title: 'Vertical Symmetry',
        description: 'Master vertical symmetry in kolam designs',
        duration: '30 min',
        steps: 15,
        region: 'Telugu',
        completed: false
      },
      {
        id: 6,
        title: 'Radial Patterns (4-fold)',
        description: 'Create beautiful 4-fold radial symmetry',
        duration: '35 min',
        steps: 18,
        region: 'Kannada',
        completed: false
      },
      {
        id: 7,
        title: 'Festival Kolams',
        description: 'Special patterns for Diwali and Pongal',
        duration: '40 min',
        steps: 20,
        region: 'Tamil',
        completed: false
      },
      {
        id: 8,
        title: 'Flower Motifs',
        description: 'Incorporate floral elements in your designs',
        duration: '45 min',
        steps: 22,
        region: 'Malayalam',
        completed: false
      }
    ],
    advanced: [
      {
        id: 9,
        title: 'Complex Radial (8-fold)',
        description: 'Master intricate 8-fold radial symmetry',
        duration: '50 min',
        steps: 25,
        region: 'All',
        completed: false
      },
      {
        id: 10,
        title: 'Wedding Kolams',
        description: 'Elaborate patterns for special occasions',
        duration: '60 min',
        steps: 30,
        region: 'Tamil',
        completed: false
      },
      {
        id: 11,
        title: 'Freehand Mastery',
        description: 'Create kolams without grid assistance',
        duration: '70 min',
        steps: 35,
        region: 'All',
        completed: false
      },
      {
        id: 12,
        title: 'Regional Styles',
        description: 'Deep dive into regional variations',
        duration: '80 min',
        steps: 40,
        region: 'All',
        completed: false
      }
    ]
  }
  
  /**
   * DAILY CHALLENGES
   */
  const dailyChallenges = [
    {
      id: 'daily-1',
      title: 'Today\'s Challenge',
      description: 'Create a 5×5 grid kolam with vertical symmetry',
      difficulty: 'Intermediate',
      points: 50,
      deadline: 'Ends in 8 hours'
    },
    {
      id: 'daily-2',
      title: 'Weekly Challenge',
      description: 'Design a Pongal-themed kolam',
      difficulty: 'Advanced',
      points: 200,
      deadline: 'Ends in 3 days'
    }
  ]
  
  /**
   * USER STATS (Simulated)
   */
  const userStats = {
    totalCompleted: 2,
    totalTutorials: 12,
    points: 150,
    streak: 3,
    badges: ['Beginner', 'First Steps']
  }
  
  /**
   * START TUTORIAL
   */
  const startTutorial = (tutorial) => {
    // In production: navigate to tutorial detail page
    alert(`Starting: ${tutorial.title}\n\nThis would open an interactive tutorial with:\n- Step-by-step instructions\n- Animated demonstrations\n- Practice exercises\n- Progress tracking`)
  }
  
  /**
   * START CHALLENGE
   */
  const startChallenge = (challenge) => {
    navigate('/whiteboard', { state: { challenge } })
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-4">
          Learn Kolam Art
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Master traditional kolam patterns through structured lessons
        </p>
        
        {/* User Progress */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <Trophy className="mx-auto mb-2 text-tamil-orange" size={32} />
            <div className="text-2xl font-bold">{userStats.points}</div>
            <div className="text-sm text-gray-600">Points</div>
          </div>
          <div className="glass-card p-4 text-center">
            <CheckCircle className="mx-auto mb-2 text-telugu-blue" size={32} />
            <div className="text-2xl font-bold">
              {userStats.totalCompleted}/{userStats.totalTutorials}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="glass-card p-4 text-center">
            <Star className="mx-auto mb-2 text-kannada-gold" size={32} />
            <div className="text-2xl font-bold">{userStats.streak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          <div className="glass-card p-4 text-center">
            <Award className="mx-auto mb-2 text-malayalam-green" size={32} />
            <div className="text-2xl font-bold">{userStats.badges.length}</div>
            <div className="text-sm text-gray-600">Badges</div>
          </div>
        </div>
        
        {/* Daily Challenges */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calendar size={28} />
            Daily Challenges
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {dailyChallenges.map(challenge => (
              <div key={challenge.id} className="glass-card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{challenge.title}</h3>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                  </div>
                  <Target className="text-kumkum-red" size={24} />
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {challenge.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={16} className="text-kannada-gold" />
                    {challenge.points} pts
                  </span>
                  <span className="text-kumkum-red">{challenge.deadline}</span>
                </div>
                <button
                  onClick={() => startChallenge(challenge)}
                  className="btn-primary w-full"
                >
                  Start Challenge
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Level Selector */}
        <div className="flex gap-4 mb-6 overflow-x-auto">
          <button
            onClick={() => setSelectedLevel('beginner')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedLevel === 'beginner'
                ? 'bg-tamil-orange text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setSelectedLevel('intermediate')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedLevel === 'intermediate'
                ? 'bg-telugu-blue text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Intermediate
          </button>
          <button
            onClick={() => setSelectedLevel('advanced')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedLevel === 'advanced'
                ? 'bg-kumkum-red text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Advanced
          </button>
        </div>
        
        {/* Tutorials List */}
        <div className="glass-card p-6">
          <h2 className="text-2xl font-bold mb-6 capitalize">
            {selectedLevel} Tutorials
          </h2>
          
          <div className="space-y-4">
            {tutorials[selectedLevel].map((tutorial, index) => {
              const isLocked = index > 0 && !tutorials[selectedLevel][index - 1].completed
              const isCompleted = completedTutorials.includes(tutorial.id)
              
              return (
                <div
                  key={tutorial.id}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    isLocked
                      ? 'bg-gray-50 border-gray-200 opacity-60'
                      : isCompleted
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200 hover:border-tamil-orange hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-full ${
                      isLocked
                        ? 'bg-gray-200'
                        : isCompleted
                        ? 'bg-green-500'
                        : 'bg-tamil-orange'
                    }`}>
                      {isLocked ? (
                        <Lock className="text-white" size={24} />
                      ) : isCompleted ? (
                        <CheckCircle className="text-white" size={24} />
                      ) : (
                        <Play className="text-white" size={24} />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">
                            {tutorial.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {tutorial.description}
                          </p>
                        </div>
                        {isCompleted && (
                          <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span>⏱️ {tutorial.duration}</span>
                        <span>📝 {tutorial.steps} steps</span>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {tutorial.region}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => !isLocked && startTutorial(tutorial)}
                        disabled={isLocked}
                        className={`flex items-center gap-2 ${
                          isLocked
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-tamil-orange hover:text-tamil-orange/80 font-medium'
                        }`}
                      >
                        {isLocked ? (
                          <>
                            <Lock size={16} />
                            Complete previous tutorial to unlock
                          </>
                        ) : isCompleted ? (
                          <>
                            <Play size={16} />
                            Review Tutorial
                            <ChevronRight size={16} />
                          </>
                        ) : (
                          <>
                            <Play size={16} />
                            Start Tutorial
                            <ChevronRight size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Learning Path Info */}
        <div className="mt-8 glass-card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Sparkles size={24} className="text-tamil-orange" />
            Your Learning Path
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Beginner Level</h4>
              <p className="text-sm text-gray-600">
                Learn the fundamentals of kolam art, basic patterns, and dot grid systems.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Intermediate Level</h4>
              <p className="text-sm text-gray-600">
                Master symmetry, radial patterns, and festival-specific designs.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Advanced Level</h4>
              <p className="text-sm text-gray-600">
                Create complex patterns, freehand designs, and regional variations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutorials
