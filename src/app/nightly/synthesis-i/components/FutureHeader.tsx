'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFutureInnovation } from '../hooks/useFutureInnovation'
import { useAICollaboration } from '../hooks/useAICollaboration'
import { useSpatialComputing } from '../hooks/useSpatialComputing'
import { 
  Menu, 
  X, 
  Brain, 
  Zap, 
  Eye, 
  Mic, 
  Sparkles, 
  Cpu, 
  Atom,
  Headphones,
  Globe
} from 'lucide-react'

export function FutureHeader() {
  const pathname = usePathname()
  const { futureMode, enabledTechnologies, isTechnologyEnabled } = useFutureInnovation()
  const { aiPersonality, isThinking } = useAICollaboration()
  const { spatialMode, environment } = useSpatialComputing()
  
  const [isOpen, setIsOpen] = useState(false)
  const [isAIMenuOpen, setIsAIMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const navigationItems = [
    { href: '/nightly/synthesis-i', label: 'Home', icon: Globe },
    { href: '/nightly/synthesis-i/services', label: 'Quantum Services', icon: Atom },
    { href: '/nightly/synthesis-i/cases', label: 'AI Cases', icon: Brain },
    { href: '/nightly/synthesis-i/team', label: 'Human-AI Team', icon: Sparkles },
    { href: '/nightly/synthesis-i/contact', label: 'Neural Contact', icon: Zap }
  ]

  const technologyIcons = {
    webgpu_compute: Cpu,
    ai_collaboration: Brain,
    spatial_computing: Eye,
    quantum_optimization: Atom,
    voice_gesture: Mic,
    blockchain_attribution: Headphones
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link href="/nightly/synthesis-i" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              {isThinking && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"
                />
              )}
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                Paritee
              </h1>
              <p className="text-xs text-blue-400">Future Innovation Lab</p>
            </div>
          </Link>

          {/* Technology Status Bar */}
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-blue-500/20">
            {Array.from(enabledTechnologies).slice(0, 4).map((techId) => {
              const Icon = technologyIcons[techId as keyof typeof technologyIcons] || Cpu
              const isActive = isTechnologyEnabled(techId)
              return (
                <motion.div
                  key={techId}
                  whileHover={{ scale: 1.1 }}
                  className={`p-1.5 rounded-full transition-colors ${
                    isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}
                  title={techId.replace('_', ' ').toUpperCase()}
                >
                  <Icon className="w-3 h-3" />
                </motion.div>
              )
            })}
            <div className="w-px h-4 bg-white/20 mx-2" />
            <span className="text-xs text-blue-400 font-medium">
              {futureMode.toUpperCase()}
            </span>
          </div>

          {/* AI Assistant Menu */}
          <div className="hidden md:block relative">
            <motion.button
              onClick={() => setIsAIMenuOpen(!isAIMenuOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-purple-300 transition-colors"
            >
              <Brain className="w-4 h-4" />
              <span className="text-sm font-medium">
                {aiPersonality.name || 'AI Assistant'}
              </span>
              {isThinking && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 border border-purple-400 border-t-transparent rounded-full"
                />
              )}
            </motion.button>

            <AnimatePresence>
              {isAIMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-72 bg-black/90 backdrop-blur-xl border border-purple-500/30 rounded-xl shadow-2xl p-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-purple-300">
                      <Brain className="w-4 h-4" />
                      <span className="font-medium">AI Collaboration Status</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white/5 rounded p-2">
                        <div className="text-gray-400 mb-1">Creativity</div>
                        <div className="flex items-center gap-1">
                          <div className="flex-1 bg-gray-700 rounded-full h-1">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(aiPersonality.creativity || 0.9) * 100}%` }}
                              className="bg-purple-400 h-1 rounded-full"
                            />
                          </div>
                          <span className="text-purple-400">{Math.floor((aiPersonality.creativity || 0.9) * 100)}%</span>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded p-2">
                        <div className="text-gray-400 mb-1">Analytical</div>
                        <div className="flex items-center gap-1">
                          <div className="flex-1 bg-gray-700 rounded-full h-1">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(aiPersonality.analytical || 0.8) * 100}%` }}
                              className="bg-blue-400 h-1 rounded-full"
                            />
                          </div>
                          <span className="text-blue-400">{Math.floor((aiPersonality.analytical || 0.8) * 100)}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 text-xs text-gray-400">
                      <div className="flex justify-between items-center">
                        <span>Mode: {aiPersonality.role || 'Creative Assistant'}</span>
                        <span>{currentTime.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* Spatial Mode Indicator */}
          {spatialMode !== '2d' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-xs"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {spatialMode.toUpperCase()}
            </motion.div>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-white/10"
            >
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.div
                        whileHover={{ x: 4 }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </motion.div>
                    </Link>
                  )
                })}
              </nav>

              {/* Mobile Technology Status */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-xs text-gray-400 mb-2">Active Technologies</div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(enabledTechnologies).map((techId) => (
                    <div
                      key={techId}
                      className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs"
                    >
                      {techId.replace('_', ' ').toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile AI Assistant */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-purple-300 mb-2">
                  <Brain className="w-4 h-4" />
                  <span className="text-sm font-medium">AI Assistant</span>
                </div>
                <div className="text-xs text-gray-400">
                  {aiPersonality.name || 'Synthesis'} • {aiPersonality.role || 'Creative Assistant'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Future Enhancement Hint */}
      {futureMode === 'experimental' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-6 right-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 rounded-b-lg px-4 py-2 text-xs text-purple-300"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>Experimental Mode Active • Neural interfaces, quantum optimization, and holographic displays enabled</span>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}