'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'

interface ReadingPattern {
  averageReadingSpeed: number // words per minute estimate
  scrollPauses: number[] // duration of pauses in milliseconds
  backtrackingFrequency: number // how often user scrolls back up
  sectionEngagement: Record<string, number> // time spent per section
  visualAttentionSpots: { x: number; y: number; duration: number; timestamp: number }[]
  comprehensionScore: number // estimated based on reading behavior
  preferredContentPacing: 'fast' | 'medium' | 'slow' | 'adaptive'
}

interface MotionIntent {
  trigger: 'entry' | 'scroll' | 'hover' | 'focus' | 'reading-pace' | 'attention' | 'comprehension'
  intensity: number
  duration: number
  easing: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  context: string
  adaptToUser: boolean
}

interface AdaptiveAnimation {
  id: string
  element: string
  baseMotion: any
  adaptedMotion: any
  triggers: MotionIntent[]
  userSensitivity: number
  learningWeight: number
}

export function IntelligentMotionChoreographer({ 
  children,
  sectionId,
  contentType = 'general',
  priority = 'medium'
}: {
  children: React.ReactNode
  sectionId: string
  contentType?: 'hero' | 'content' | 'navigation' | 'interactive' | 'general'
  priority?: 'low' | 'medium' | 'high'
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const intersectionRef = useRef<IntersectionObserver | null>(null)
  const eyeTrackingRef = useRef<{ x: number; y: number; timestamp: number }[]>([])
  
  // Revolutionary reading pattern analysis
  const [readingPattern, setReadingPattern] = useState<ReadingPattern>({
    averageReadingSpeed: 200, // default WPM
    scrollPauses: [],
    backtrackingFrequency: 0,
    sectionEngagement: {},
    visualAttentionSpots: [],
    comprehensionScore: 0.7,
    preferredContentPacing: 'medium'
  })
  
  // Intelligent animation state
  const [isInView, setIsInView] = useState(false)
  const [userAttentionLevel, setUserAttentionLevel] = useState(0.5)
  const [adaptiveMotions, setAdaptiveMotions] = useState<AdaptiveAnimation[]>([])
  const [motionPersonality, setMotionPersonality] = useState<'gentle' | 'dynamic' | 'minimal'>('dynamic')
  
  // Framer Motion controls
  const controls = useAnimation()
  const opacity = useMotionValue(0)
  const scale = useMotionValue(0.95)
  const y = useMotionValue(20)
  
  const scrollY = useMotionValue(0)
  const scrollVelocity = useMotionValue(0)
  
  // Transform values based on user behavior
  const adaptiveOpacity = useTransform(
    [opacity, scrollVelocity], 
    ([opacity, velocity]) => {
      if (readingPattern.preferredContentPacing === 'slow') {
        return Math.max(0.3, opacity * (1 - Math.abs(velocity) * 0.01))
      }
      return opacity
    }
  )
  
  const adaptiveScale = useTransform(
    [scale, scrollVelocity],
    ([scale, velocity]) => {
      const attentionMultiplier = userAttentionLevel > 0.7 ? 1.02 : 0.98
      return scale * attentionMultiplier * (1 + Math.abs(velocity) * 0.001)
    }
  )

  // INNOVATION 1: Reading pace detection through scroll analysis
  const analyzeReadingPace = useCallback(() => {
    let lastScrollTop = window.pageYOffset
    let lastScrollTime = Date.now()
    let pauseStart: number | null = null
    let scrollDirection = 0
    let backtrackCount = 0
    let totalScrollTime = 0
    let wordsEstimate = 0

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset
      const currentTime = Date.now()
      const timeDelta = currentTime - lastScrollTime
      const scrollDelta = currentScrollTop - lastScrollTop
      
      // Detect reading pauses (when user stops scrolling)
      if (Math.abs(scrollDelta) < 2) {
        if (pauseStart === null) {
          pauseStart = currentTime
        }
      } else {
        if (pauseStart !== null) {
          const pauseDuration = currentTime - pauseStart
          setReadingPattern(prev => ({
            ...prev,
            scrollPauses: [...prev.scrollPauses.slice(-10), pauseDuration]
          }))
          pauseStart = null
        }
      }
      
      // Detect backtracking (scrolling up to re-read)
      if (scrollDelta < -50 && scrollDirection > 0) {
        backtrackCount++
      }
      scrollDirection = scrollDelta
      
      // Estimate reading speed based on scroll behavior
      if (timeDelta > 100) { // Avoid noise from rapid scroll events
        totalScrollTime += timeDelta
        
        // Rough estimation: 15 pixels = 1 word average
        wordsEstimate += Math.abs(scrollDelta) / 15
        
        if (totalScrollTime > 5000) { // After 5 seconds of reading
          const wpm = (wordsEstimate / totalScrollTime) * 60000
          const avgPauseTime = prev.scrollPauses.length > 0 
            ? prev.scrollPauses.reduce((a, b) => a + b, 0) / prev.scrollPauses.length 
            : 1000
          
          const comprehensionScore = Math.max(0.3, Math.min(1.0, 
            (avgPauseTime / 2000) * (1 - backtrackCount / 10) * (wpm < 300 ? 1 : 0.7)
          ))
          
          let preferredPacing: ReadingPattern['preferredContentPacing'] = 'medium'
          if (wpm < 150 || avgPauseTime > 3000) preferredPacing = 'slow'
          else if (wpm > 300 && avgPauseTime < 800) preferredPacing = 'fast'
          
          setReadingPattern(prev => ({
            ...prev,
            averageReadingSpeed: wpm,
            backtrackingFrequency: backtrackCount,
            comprehensionScore,
            preferredContentPacing: preferredPacing
          }))
          
          // Reset counters
          totalScrollTime = 0
          wordsEstimate = 0
          backtrackCount = 0
        }
      }
      
      lastScrollTop = currentScrollTop
      lastScrollTime = currentTime
      scrollY.set(currentScrollTop)
      scrollVelocity.set(scrollDelta / Math.max(timeDelta, 16))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollY, scrollVelocity])

  // INNOVATION 2: Simulated eye tracking through mouse movement patterns
  const trackVisualAttention = useCallback(() => {
    let mouseIdleTimer: NodeJS.Timeout | null = null
    let lastMousePosition = { x: 0, y: 0 }
    let attentionFocusStart: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now()
      const movement = Math.sqrt(
        Math.pow(e.clientX - lastMousePosition.x, 2) + 
        Math.pow(e.clientY - lastMousePosition.y, 2)
      )
      
      // Track attention spots (where mouse lingers)
      if (movement < 20) { // Low movement = potential reading focus
        if (attentionFocusStart === null) {
          attentionFocusStart = currentTime
        }
      } else {
        if (attentionFocusStart !== null) {
          const focusDuration = currentTime - attentionFocusStart
          if (focusDuration > 1000) { // Focused for more than 1 second
            setReadingPattern(prev => ({
              ...prev,
              visualAttentionSpots: [
                ...prev.visualAttentionSpots.slice(-15),
                {
                  x: lastMousePosition.x,
                  y: lastMousePosition.y,
                  duration: focusDuration,
                  timestamp: currentTime
                }
              ]
            }))
          }
          attentionFocusStart = null
        }
      }
      
      // Update attention level based on mouse activity
      if (mouseIdleTimer) clearTimeout(mouseIdleTimer)
      setUserAttentionLevel(1.0)
      
      mouseIdleTimer = setTimeout(() => {
        setUserAttentionLevel(prev => Math.max(0.2, prev * 0.9))
      }, 2000)
      
      lastMousePosition = { x: e.clientX, y: e.clientY }
      
      // Store recent mouse positions for pattern analysis
      eyeTrackingRef.current.push({ x: e.clientX, y: e.clientY, timestamp: currentTime })
      if (eyeTrackingRef.current.length > 50) {
        eyeTrackingRef.current.shift()
      }
    }

    const handleMouseLeave = () => {
      setUserAttentionLevel(0.1)
    }

    const handleMouseEnter = () => {
      setUserAttentionLevel(0.8)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (mouseIdleTimer) clearTimeout(mouseIdleTimer)
    }
  }, [])

  // INNOVATION 3: Adaptive motion personality based on user behavior
  useEffect(() => {
    const { averageReadingSpeed, scrollPauses, comprehensionScore, preferredContentPacing } = readingPattern
    
    let newPersonality: typeof motionPersonality = 'dynamic'
    
    // Determine motion personality from reading patterns
    if (preferredContentPacing === 'slow' || comprehensionScore < 0.5) {
      newPersonality = 'gentle'
    } else if (averageReadingSpeed > 300 && scrollPauses.every(p => p < 1000)) {
      newPersonality = 'dynamic'
    } else if (userAttentionLevel < 0.3) {
      newPersonality = 'minimal'
    }
    
    if (newPersonality !== motionPersonality) {
      setMotionPersonality(newPersonality)
    }
  }, [readingPattern, userAttentionLevel, motionPersonality])

  // INNOVATION 4: Dynamic motion adaptation based on context and user state
  const getAdaptiveMotionConfig = useCallback(() => {
    const baseConfig = {
      gentle: {
        duration: 1.2,
        ease: "easeOut",
        scale: [0.98, 1],
        opacity: [0.5, 1],
        y: [10, 0],
        stagger: 0.15
      },
      dynamic: {
        duration: 0.6,
        ease: "easeInOut",
        scale: [0.95, 1.02, 1],
        opacity: [0, 1],
        y: [30, -5, 0],
        stagger: 0.08
      },
      minimal: {
        duration: 0.8,
        ease: "easeOut",
        scale: [1, 1],
        opacity: [0.8, 1],
        y: [5, 0],
        stagger: 0.05
      }
    }
    
    const config = baseConfig[motionPersonality]
    
    // Adapt based on user attention and reading pace
    return {
      ...config,
      duration: config.duration * (userAttentionLevel > 0.7 ? 1 : 1.5),
      opacity: config.opacity.map(o => o * Math.max(0.5, userAttentionLevel)),
      stagger: config.stagger * (readingPattern.preferredContentPacing === 'fast' ? 0.5 : 1.2)
    }
  }, [motionPersonality, userAttentionLevel, readingPattern.preferredContentPacing])

  // INNOVATION 5: Intersection observer with attention-based thresholds
  useEffect(() => {
    if (!containerRef.current) return

    const observerConfig = {
      threshold: userAttentionLevel > 0.7 ? [0.1, 0.3, 0.6, 0.9] : [0.2, 0.5],
      rootMargin: readingPattern.preferredContentPacing === 'slow' ? '50px' : '-20px'
    }

    intersectionRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const wasInView = isInView
        const nowInView = entry.isIntersectionIntersecting && entry.intersectionRatio > 0.2
        
        setIsInView(nowInView)
        
        // Track section engagement
        if (nowInView && !wasInView) {
          setReadingPattern(prev => ({
            ...prev,
            sectionEngagement: {
              ...prev.sectionEngagement,
              [sectionId]: Date.now()
            }
          }))
        } else if (!nowInView && wasInView) {
          setReadingPattern(prev => {
            const startTime = prev.sectionEngagement[sectionId]
            if (startTime) {
              const engagementDuration = Date.now() - startTime
              return {
                ...prev,
                sectionEngagement: {
                  ...prev.sectionEngagement,
                  [`${sectionId}_duration`]: engagementDuration
                }
              }
            }
            return prev
          })
        }
      })
    }, observerConfig)

    intersectionRef.current.observe(containerRef.current)

    return () => {
      if (intersectionRef.current) {
        intersectionRef.current.disconnect()
      }
    }
  }, [isInView, userAttentionLevel, readingPattern.preferredContentPacing, sectionId])

  // INNOVATION 6: Contextual animation triggers
  useEffect(() => {
    if (isInView) {
      const motionConfig = getAdaptiveMotionConfig()
      
      controls.start({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: motionConfig.duration,
          ease: motionConfig.ease,
          staggerChildren: motionConfig.stagger,
          when: "beforeChildren"
        }
      })
      
      opacity.set(1)
      scale.set(1)
      y.set(0)
    } else {
      const exitConfig = getAdaptiveMotionConfig()
      
      controls.start({
        opacity: userAttentionLevel * 0.3,
        scale: 0.98,
        y: 10,
        transition: {
          duration: exitConfig.duration * 0.5,
          ease: "easeIn"
        }
      })
    }
  }, [isInView, controls, getAdaptiveMotionConfig, opacity, scale, y, userAttentionLevel])

  // Initialize tracking systems
  useEffect(() => {
    const cleanupReading = analyzeReadingPace()
    const cleanupAttention = trackVisualAttention()
    
    return () => {
      cleanupReading()
      cleanupAttention()
    }
  }, [analyzeReadingPace, trackVisualAttention])

  // INNOVATION 7: Hover effects that adapt to user attention patterns
  const handleHoverStart = useCallback(() => {
    if (userAttentionLevel > 0.5) {
      controls.start({
        scale: motionPersonality === 'gentle' ? 1.01 : motionPersonality === 'dynamic' ? 1.03 : 1.005,
        transition: { duration: 0.3, ease: "easeOut" }
      })
    }
  }, [controls, userAttentionLevel, motionPersonality])

  const handleHoverEnd = useCallback(() => {
    controls.start({
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    })
  }, [controls])

  // INNOVATION 8: Reading-pace-synchronized content reveal
  const shouldRevealContent = useCallback(() => {
    const hasEngagement = readingPattern.sectionEngagement[sectionId] !== undefined
    const comprehensionThreshold = readingPattern.comprehensionScore > 0.4
    const attentionThreshold = userAttentionLevel > 0.3
    
    return hasEngagement && comprehensionThreshold && attentionThreshold
  }, [readingPattern, sectionId, userAttentionLevel])

  // Component variants based on motion personality and user state
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: motionPersonality === 'gentle' ? 10 : motionPersonality === 'dynamic' ? 30 : 5,
      scale: motionPersonality === 'minimal' ? 1 : 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: getAdaptiveMotionConfig()
    },
    exit: {
      opacity: userAttentionLevel * 0.5,
      y: motionPersonality === 'gentle' ? 5 : 10,
      scale: 0.98,
      transition: { duration: 0.4, ease: "easeIn" }
    }
  }

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      style={{
        opacity: adaptiveOpacity,
        scale: adaptiveScale
      }}
      data-section={sectionId}
      data-motion-personality={motionPersonality}
      data-attention-level={userAttentionLevel.toFixed(2)}
      data-reading-pace={readingPattern.preferredContentPacing}
      className="relative"
    >
      {/* Visual indicators for development/testing */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black/80 text-white text-xs p-2 rounded z-50 font-mono">
          <div>Motion: {motionPersonality}</div>
          <div>Attention: {userAttentionLevel.toFixed(2)}</div>
          <div>WPM: {readingPattern.averageReadingSpeed.toFixed(0)}</div>
          <div>Pace: {readingPattern.preferredContentPacing}</div>
          <div>Comprehension: {readingPattern.comprehensionScore.toFixed(2)}</div>
        </div>
      )}
      
      {/* Content with intelligent reveal timing */}
      <AnimatePresence mode="wait">
        {shouldRevealContent() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: motionPersonality === 'gentle' ? 1.2 : 0.8,
              delay: readingPattern.preferredContentPacing === 'slow' ? 0.3 : 0.1
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Attention visualization spots for highly engaged users */}
      {userAttentionLevel > 0.8 && readingPattern.visualAttentionSpots.slice(-3).map((spot, index) => (
        <motion.div
          key={`attention-${spot.timestamp}-${index}`}
          className="absolute pointer-events-none"
          style={{
            left: spot.x - 5,
            top: spot.y - 5,
            width: 10,
            height: 10
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ 
            scale: [0, 1.2, 0],
            opacity: [0.8, 0.4, 0]
          }}
          transition={{ 
            duration: 2,
            times: [0, 0.3, 1],
            ease: "easeOut"
          }}
        >
          <div className="w-full h-full bg-blue-400/30 rounded-full blur-sm" />
        </motion.div>
      ))}
    </motion.div>
  )
}

// Higher-order component for automatic motion intelligence
export function withIntelligentMotion<P extends object>(
  Component: React.ComponentType<P>,
  config: {
    sectionId: string
    contentType?: 'hero' | 'content' | 'navigation' | 'interactive' | 'general'
    priority?: 'low' | 'medium' | 'high'
  }
) {
  return function IntelligentMotionWrapper(props: P) {
    return (
      <IntelligentMotionChoreographer {...config}>
        <Component {...props} />
      </IntelligentMotionChoreographer>
    )
  }
}