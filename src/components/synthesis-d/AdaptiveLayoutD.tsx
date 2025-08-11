'use client'

import React, { useEffect, useState, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useUserJourney } from './UserJourneyProvider'

interface AdaptiveLayoutProps {
  children: ReactNode
}

export default function AdaptiveLayoutD({ children }: AdaptiveLayoutProps) {
  const { journeyState, recordInteraction } = useUserJourney()
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Adaptive background that responds to user type and engagement
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.9, 1])
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Advanced layout adaptation based on user behavior
  const getLayoutClasses = () => {
    const base = "min-h-screen relative overflow-x-hidden"
    const userType = journeyState.userType
    const engagement = journeyState.engagement.engagementLevel
    
    // Adaptive spacing and flow based on user type
    const adaptations = {
      cmo: "space-y-20 md:space-y-32", // More generous spacing for executive scanning
      'agency-owner': "space-y-16 md:space-y-24", // Balanced spacing for detailed exploration
      marketer: "space-y-12 md:space-y-18", // Tighter spacing for tactical focus
      explorer: "space-y-14 md:space-y-20" // Standard exploratory spacing
    }
    
    return `${base} ${adaptations[userType || 'explorer']}`
  }

  // Sophisticated color system that adapts to journey stage
  const getThemeVariables = () => {
    const { currentStage, userType, engagement } = journeyState
    
    const stageColors = {
      initial: { primary: '#3b82f6', accent: '#1e40af', surface: '#0f172a' },
      discovery: { primary: '#6366f1', accent: '#4f46e5', surface: '#111827' },
      exploration: { primary: '#8b5cf6', accent: '#7c3aed', surface: '#1e1b4b' },
      consideration: { primary: '#a855f7', accent: '#9333ea', surface: '#2e1065' },
      understanding: { primary: '#ec4899', accent: '#db2777', surface: '#1e1b4b' },
      validation: { primary: '#f59e0b', accent: '#d97706', surface: '#1f2937' },
      trust: { primary: '#10b981', accent: '#059669', surface: '#064e3b' },
      conversion: { primary: '#ef4444', accent: '#dc2626', surface: '#1f2937' }
    }
    
    return stageColors[currentStage as keyof typeof stageColors] || stageColors.initial
  }

  // Progressive layout enhancement based on engagement
  const getEngagementEnhancements = () => {
    const { interactionCount, scrollDepth, timeSpent } = journeyState.engagement
    
    // High engagement users get enhanced visual complexity
    if (interactionCount > 10 && scrollDepth > 70) {
      return {
        enableParallax: true,
        enhancedTransitions: true,
        advancedAnimations: true,
        personalizedElements: true
      }
    }
    
    // Medium engagement gets moderate enhancements
    if (interactionCount > 5 || scrollDepth > 50) {
      return {
        enableParallax: true,
        enhancedTransitions: false,
        advancedAnimations: false,
        personalizedElements: true
      }
    }
    
    // Low engagement gets clean, fast experience
    return {
      enableParallax: false,
      enhancedTransitions: false,
      advancedAnimations: false,
      personalizedElements: false
    }
  }

  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900" />
  }

  const themeVars = getThemeVariables()
  const enhancements = getEngagementEnhancements()

  return (
    <div 
      className={getLayoutClasses()}
      style={{
        '--primary-color': themeVars.primary,
        '--accent-color': themeVars.accent,
        '--surface-color': themeVars.surface
      } as React.CSSProperties}
    >
      {/* Adaptive Background System */}
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{ 
          opacity: backgroundOpacity,
          scale: enhancements.enableParallax ? backgroundScale : 1
        }}
      >
        {/* Base gradient that adapts to user journey stage */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          style={{
            background: `linear-gradient(135deg, ${themeVars.surface} 0%, #0a0a0a 50%, ${themeVars.surface}99 100%)`
          }}
        />
        
        {/* Intelligent ambient lighting based on engagement */}
        {enhancements.enableParallax && (
          <>
            <motion.div 
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
              style={{ 
                backgroundColor: `${themeVars.primary}15`,
                scale: scrollYProgress
              }}
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -100, 50, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
              style={{ 
                backgroundColor: `${themeVars.accent}12`,
                scale: useTransform(scrollYProgress, [0, 1], [0.5, 1])
              }}
              animate={{
                x: [0, -80, 60, 0],
                y: [0, 80, -40, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
          </>
        )}
      </motion.div>

      {/* Adaptive Navigation Aid */}
      <motion.div 
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="space-y-2 bg-black/20 backdrop-blur-xl border border-white/10 p-3 rounded-full">
          {['discovery', 'exploration', 'consideration', 'validation', 'conversion'].map((stage, index) => (
            <motion.div
              key={stage}
              className={`w-2 h-2 rounded-full transition-all duration-500 cursor-pointer ${
                journeyState.visitedStages.includes(stage)
                  ? 'bg-current shadow-lg shadow-current/50' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              style={{ color: themeVars.primary }}
              onClick={() => {
                recordInteraction(`navigation-${stage}`)
                const element = document.querySelector(`[data-journey-stage="${stage}"]`)
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              whileHover={{ scale: 1.5 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Enhanced User Type Indicator (for high engagement users) */}
      {enhancements.personalizedElements && journeyState.userType && (
        <motion.div
          className="fixed top-8 right-8 z-40 bg-black/30 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full text-xs text-white/70"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
        >
          Experience optimized for: {journeyState.userType.replace('-', ' ')}
        </motion.div>
      )}

      {/* Adaptive Content Container */}
      <motion.div
        className="relative z-10"
        variants={{
          initial: { opacity: 0 },
          animate: { 
            opacity: 1,
            transition: {
              duration: enhancements.enhancedTransitions ? 1 : 0.5,
              staggerChildren: enhancements.advancedAnimations ? 0.2 : 0.1
            }
          }
        }}
        initial="initial"
        animate="animate"
      >
        {children}
      </motion.div>

      {/* Advanced Performance Monitor (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 z-50 bg-black/50 backdrop-blur text-white text-xs p-2 rounded space-y-1 max-w-xs">
          <div>User Type: {journeyState.userType || 'detecting...'}</div>
          <div>Stage: {journeyState.currentStage}</div>
          <div>Engagement: {journeyState.engagement.interactionCount} interactions</div>
          <div>Scroll: {Math.round(journeyState.engagement.scrollDepth)}%</div>
          <div>Enhancements: {Object.values(enhancements).filter(Boolean).length}/4</div>
        </div>
      )}
    </div>
  )
}