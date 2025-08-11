'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { useAICollaboration } from '../../hooks/useAICollaboration'
import { useSpatialComputing } from '../../hooks/useSpatialComputing'
import { Sparkles, Brain, Zap, Users, ArrowRight, Mic, Eye, Hand } from 'lucide-react'

interface AICreativeHeroProps {
  aiPersonality: any
  userProfile: any
  quantumVariant: any
}

export function AICreativeHero({ aiPersonality, userProfile, quantumVariant }: AICreativeHeroProps) {
  const { generateContent, isThinking, co_create, brainstorm } = useAICollaboration()
  const { spatialMode, registerInteraction } = useSpatialComputing()
  
  const [heroContent, setHeroContent] = useState<any>(null)
  const [isCollaborating, setIsCollaborating] = useState(false)
  const [collaborativeIdeas, setCollaborativeIdeas] = useState<string[]>([])
  const [userIntent, setUserIntent] = useState<string>('')
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [creativeMode, setCreativeMode] = useState<'autonomous' | 'collaborative' | 'user-led'>('autonomous')

  // AI content generation on mount
  useEffect(() => {
    const initializeHeroContent = async () => {
      try {
        const content = await generateContent('hero-main', {
          context: 'future innovation homepage',
          userGoals: ['partnership', 'innovation', 'ai-collaboration'],
          contentType: 'hero-text',
          tone: 'inspirational',
          length: 'medium'
        })
        
        setHeroContent(content)
        
        // Generate collaborative suggestions
        const ideas = await brainstorm('partnership innovation with AI', { constraint: 'future-focused' })
        setCollaborativeIdeas(ideas.slice(0, 3))
        
      } catch (error) {
        console.error('Failed to initialize hero content:', error)
      }
    }

    initializeHeroContent()
  }, [generateContent, brainstorm])

  // Real-time AI suggestions based on user interaction
  const handleUserInteraction = useCallback(async (interaction: string) => {
    await registerInteraction({
      type: 'touch',
      confidence: 0.9,
      intent: interaction,
      timestamp: Date.now()
    })

    if (creativeMode === 'collaborative') {
      try {
        const suggestions = await brainstorm(`user wants to ${interaction}`)
        setAiSuggestions(suggestions.slice(0, 2))
      } catch (error) {
        console.error('Failed to generate AI suggestions:', error)
      }
    }
  }, [registerInteraction, creativeMode, brainstorm])

  // AI Co-creation Mode
  const startCollaboration = useCallback(async () => {
    setIsCollaborating(true)
    setCreativeMode('collaborative')
    
    try {
      const coCreated = await co_create(
        userIntent || 'explore future partnerships', 
        'hero-enhancement'
      )
      
      setHeroContent(coCreated)
      
      // Suggest next steps
      const nextIdeas = await brainstorm('continuing this collaboration')
      setCollaborativeIdeas(nextIdeas.slice(0, 3))
      
    } catch (error) {
      console.error('Collaboration failed:', error)
    }
    
    setIsCollaborating(false)
  }, [userIntent, co_create, brainstorm])

  // Animation variants for different creative modes
  const heroVariants = {
    autonomous: {
      background: 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 58, 95) 50%, rgb(37, 99, 235) 100%)',
      transition: { duration: 2 }
    },
    collaborative: {
      background: 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(59, 7, 100) 30%, rgb(147, 51, 234) 70%, rgb(37, 99, 235) 100%)',
      transition: { duration: 2 }
    },
    'user-led': {
      background: 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(16, 185, 129) 50%, rgb(37, 99, 235) 100%)',
      transition: { duration: 2 }
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={heroVariants[creativeMode]}
        style={{
          background: heroVariants[creativeMode].background
        }}
      />

      {/* AI Collaboration Particles */}
      <div className="absolute inset-0 z-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - AI Generated Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-8"
          >
            {/* AI Personality Indicator */}
            <div className="flex items-center gap-3 text-blue-400">
              <Brain className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-medium">
                AI Creative Partner: {aiPersonality.name || 'Synthesis'} 
                ({Math.floor((aiPersonality.creativity || 0.9) * 100)}% Creative)
              </span>
            </div>

            {/* Dynamic Hero Title */}
            <AnimatePresence mode="wait">
              {heroContent && (
                <motion.h1
                  key={heroContent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-4xl lg:text-6xl font-bold leading-tight"
                >
                  <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                    {heroContent.content.split(' ').slice(0, -3).join(' ')}
                  </span>
                  {' '}
                  <span className="text-blue-400 inline-flex items-center gap-2">
                    {heroContent.content.split(' ').slice(-3).join(' ')}
                    {isThinking && <Sparkles className="w-6 h-6 animate-spin" />}
                  </span>
                </motion.h1>
              )}
            </AnimatePresence>

            {/* AI Confidence & Reasoning */}
            {heroContent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-blue-500/20"
              >
                <div className="flex items-center gap-2 text-sm text-blue-300 mb-2">
                  <Zap className="w-4 h-4" />
                  AI Confidence: {Math.floor((heroContent.confidence || 0) * 100)}%
                </div>
                <p className="text-gray-300 text-sm">
                  {heroContent.reasoning || 'Generated with creative and analytical balance'}
                </p>
              </motion.div>
            )}

            {/* Creative Mode Controls */}
            <div className="flex gap-3">
              {(['autonomous', 'collaborative', 'user-led'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setCreativeMode(mode)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    creativeMode === mode
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white/10 text-blue-300 hover:bg-white/20'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Collaboration Interface */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* AI Collaboration Status */}
            <div className="bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                AI Collaboration Hub
              </h3>

              {/* User Intent Input */}
              <div className="mb-4">
                <label className="block text-blue-300 text-sm mb-2">What would you like to explore?</label>
                <input
                  type="text"
                  value={userIntent}
                  onChange={(e) => setUserIntent(e.target.value)}
                  onFocus={() => handleUserInteraction('focus_on_input')}
                  placeholder="Tell me your vision..."
                  className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg text-white placeholder-blue-300/60 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Collaboration Button */}
              <motion.button
                onClick={startCollaboration}
                disabled={isCollaborating || !userIntent}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                {isCollaborating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    AI is Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Co-Create with AI
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              {/* AI Suggestions */}
              {aiSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-blue-500/20"
                >
                  <p className="text-blue-300 text-sm mb-2">AI Suggests:</p>
                  <div className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-sm text-gray-300 bg-white/5 rounded px-3 py-2 hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={() => setUserIntent(suggestion)}
                      >
                        {suggestion}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Collaborative Ideas */}
            {collaborativeIdeas.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
              >
                <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  Collaborative Ideas
                </h4>
                <div className="space-y-3">
                  {collaborativeIdeas.map((idea, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm leading-relaxed">{idea}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Future Interface Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-6 text-blue-400/60"
            >
              <div className="flex items-center gap-2 text-xs">
                <Eye className="w-4 h-4" />
                <span>Gaze Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Hand className="w-4 h-4" />
                <span>Gesture Input</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Mic className="w-4 h-4" />
                <span>Voice Control</span>
              </div>
            </motion.div>

            {/* Spatial Computing Mode Indicator */}
            {spatialMode !== '2d' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Spatial Mode: {spatialMode.toUpperCase()}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleUserInteraction('explore_services')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            Explore AI-Enhanced Services
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleUserInteraction('start_partnership')}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors"
          >
            Start a Partnership
          </motion.button>
        </motion.div>
      </div>

      {/* Quantum State Indicator */}
      {quantumVariant && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-6 right-6 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-blue-400 border border-blue-500/20"
        >
          Quantum State: {Math.floor((quantumVariant.state?.probability || 0) * 100)}%
        </motion.div>
      )}
    </div>
  )
}