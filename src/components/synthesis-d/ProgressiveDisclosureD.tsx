'use client'

import React, { useState, useEffect, ReactNode, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useUserJourney } from './UserJourneyProvider'

interface ProgressiveDisclosureProps {
  children: ReactNode
}

export default function ProgressiveDisclosureD({ children }: ProgressiveDisclosureProps) {
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set(['emotional-mission']))
  const [readingPattern, setReadingPattern] = useState<'scanner' | 'reader' | 'explorer'>('explorer')
  const { journeyState, recordInteraction } = useUserJourney()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Intelligent content revelation based on user behavior
  useEffect(() => {
    const analyzeReadingPattern = () => {
      const { scrollDepth, timeSpent, interactionCount } = journeyState.engagement
      
      // Fast scrolling, low interaction = scanner
      if (scrollDepth > 50 && timeSpent < 30000 && interactionCount < 3) {
        setReadingPattern('scanner')
      }
      // Deep engagement, high time = reader
      else if (timeSpent > 60000 || interactionCount > 8) {
        setReadingPattern('reader')
      }
      // Balanced exploration
      else {
        setReadingPattern('explorer')
      }
    }

    analyzeReadingPattern()
  }, [journeyState.engagement])

  // Progressive section revelation logic
  useEffect(() => {
    const revealNextSection = () => {
      const sections = [
        'emotional-mission',
        'intelligent-services', 
        'advisory-excellence',
        'connected-ecosystem',
        'authentic-cases',
        'human-team',
        'personalized-contact'
      ]

      const currentIndex = sections.findIndex(section => 
        !revealedSections.has(section)
      )

      if (currentIndex !== -1) {
        const nextSection = sections[currentIndex]
        
        // Adaptive revelation timing based on reading pattern
        const revealDelay = {
          scanner: 1000,  // Fast revelation for scanners
          reader: 3000,   // Slower for deep readers
          explorer: 2000  // Balanced for explorers
        }

        setTimeout(() => {
          setRevealedSections(prev => new Set([...prev, nextSection]))
          recordInteraction(`progressive-reveal-${nextSection}`)
        }, revealDelay[readingPattern])
      }
    }

    // Start revelation process after initial content is viewed
    if (journeyState.engagement.timeSpent > 5000) {
      revealNextSection()
    }
  }, [journeyState.engagement.timeSpent, revealedSections, readingPattern, recordInteraction])

  // Adaptive spacing based on user type and reading pattern
  const getSectionSpacing = () => {
    const { userType } = journeyState
    
    const spacingMap = {
      cmo: {
        scanner: 'space-y-16',
        reader: 'space-y-24', 
        explorer: 'space-y-20'
      },
      'agency-owner': {
        scanner: 'space-y-20',
        reader: 'space-y-32',
        explorer: 'space-y-24'
      },
      marketer: {
        scanner: 'space-y-12',
        reader: 'space-y-20',
        explorer: 'space-y-16'
      },
      explorer: {
        scanner: 'space-y-14',
        reader: 'space-y-22',
        explorer: 'space-y-18'
      }
    }

    return spacingMap[userType || 'explorer'][readingPattern]
  }

  // Content hint system for unrevealed sections
  const ContentHint = ({ sectionId }: { sectionId: string }) => {
    const hintTexts = {
      'intelligent-services': 'Our comprehensive service ecosystem awaits...',
      'advisory-excellence': 'Discover what makes us different...',
      'connected-ecosystem': 'See our network in action...',
      'authentic-cases': 'Real results from real partnerships...',
      'human-team': 'Meet the minds behind the work...',
      'personalized-contact': 'Ready to begin your journey?...'
    }

    return (
      <motion.div
        className="flex items-center justify-center py-20 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        onClick={() => {
          setRevealedSections(prev => new Set([...prev, sectionId]))
          recordInteraction(`manual-reveal-${sectionId}`)
        }}
      >
        <div className="text-center space-y-4">
          <motion.div
            className="w-12 h-12 mx-auto border border-white/20 rounded-full flex items-center justify-center"
            animate={{ 
              rotate: 360,
              borderColor: ['rgba(255,255,255,0.2)', 'rgba(99,102,241,0.5)', 'rgba(255,255,255,0.2)']
            }}
            transition={{ 
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              borderColor: { duration: 2, repeat: Infinity }
            }}
          >
            <div className="w-1 h-1 bg-white/40 rounded-full" />
          </motion.div>
          <p className="text-white/60 text-sm tracking-wide">
            {hintTexts[sectionId as keyof typeof hintTexts]}
          </p>
          <div className="text-xs text-white/40 uppercase tracking-widest">
            Click to reveal
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div ref={containerRef} className={`relative ${getSectionSpacing()}`}>
      
      {/* Reading Pattern Indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-20 left-4 z-40 bg-black/50 text-white text-xs p-2 rounded">
          Pattern: {readingPattern} | Revealed: {revealedSections.size}/7
        </div>
      )}

      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child

        const sectionId = child.props?.id
        const isRevealed = revealedSections.has(sectionId)
        
        return (
          <div key={sectionId || index}>
            {isRevealed ? (
              <motion.div
                initial={{ 
                  opacity: 0, 
                  y: 60,
                  filter: "blur(10px)",
                  scale: 0.95
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  filter: "blur(0px)",
                  scale: 1
                }}
                transition={{ 
                  duration: 1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {child}
              </motion.div>
            ) : (
              sectionId && <ContentHint sectionId={sectionId} />
            )}
          </div>
        )
      })}

      {/* Adaptive Progress Visualization */}
      <motion.div 
        className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:block z-30"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="relative">
          {/* Progress Line */}
          <div className="w-px h-64 bg-white/10 relative">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 to-purple-400"
              style={{
                height: `${(revealedSections.size / 7) * 100}%`
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {/* Reading Pattern Visualization */}
          <motion.div
            className={`absolute -left-2 w-5 h-5 border-2 rounded-full ${
              readingPattern === 'scanner' ? 'border-red-400 bg-red-400/20' :
              readingPattern === 'reader' ? 'border-green-400 bg-green-400/20' :
              'border-blue-400 bg-blue-400/20'
            }`}
            style={{
              top: `${(revealedSections.size / 7) * 100}%`,
              transform: 'translateY(-50%)'
            }}
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Intelligent Content Suggestions */}
      {journeyState.engagement.interactionCount > 5 && (
        <motion.div
          className="fixed bottom-8 right-8 z-40 bg-black/20 backdrop-blur-xl border border-white/10 p-4 rounded-lg max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="text-xs text-white/70 space-y-2">
            <div className="font-semibold text-white/90">Smart Suggestions</div>
            {journeyState.userType === 'cmo' && !revealedSections.has('authentic-cases') && (
              <button 
                onClick={() => {
                  setRevealedSections(prev => new Set([...prev, 'authentic-cases']))
                  document.getElementById('authentic-cases')?.scrollIntoView({ behavior: 'smooth' })
                  recordInteraction('smart-suggestion-cases')
                }}
                className="block text-left hover:text-blue-400 transition-colors"
              >
                → Jump to Results & ROI
              </button>
            )}
            {journeyState.userType === 'agency-owner' && !revealedSections.has('connected-ecosystem') && (
              <button 
                onClick={() => {
                  setRevealedSections(prev => new Set([...prev, 'connected-ecosystem']))
                  document.getElementById('connected-ecosystem')?.scrollIntoView({ behavior: 'smooth' })
                  recordInteraction('smart-suggestion-ecosystem')
                }}
                className="block text-left hover:text-blue-400 transition-colors"
              >
                → Explore Partnership Model
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}