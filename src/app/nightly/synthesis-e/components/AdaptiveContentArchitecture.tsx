'use client'

import { useEffect, useState, useCallback, useRef, ReactNode } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

interface UserInteractionPattern {
  contentPreferences: {
    visualContent: number // 0-1, preference for images/visual elements
    textualContent: number // 0-1, preference for detailed text
    interactiveElements: number // 0-1, engagement with interactive features
    dataVisualization: number // 0-1, interest in charts/metrics
  }
  navigationBehavior: {
    linearReading: number // 0-1, reads in sequence vs jumps around
    detailOriented: number // 0-1, digs deep vs skims
    explorationTendency: number // 0-1, clicks on secondary content
    returnVisitor: boolean
  }
  deviceContext: {
    screenSize: 'mobile' | 'tablet' | 'desktop' | 'large'
    hasTouch: boolean
    connectionSpeed: 'slow' | 'medium' | 'fast'
    timeOnSite: number
  }
  cognitiveLoad: {
    currentLevel: number // 0-1, estimated cognitive load
    processingSpeed: number // estimated from scroll/click patterns
    multitaskingIndicators: number // tab switches, etc.
    comprehensionScore: number
  }
}

interface ContentVariant {
  id: string
  type: 'minimal' | 'standard' | 'detailed' | 'visual' | 'interactive' | 'data-rich'
  components: ReactNode[]
  layout: 'grid' | 'list' | 'masonry' | 'timeline' | 'spotlight' | 'dashboard'
  priority: number
  userSegments: string[]
  loadWeight: 'light' | 'medium' | 'heavy'
}

interface AdaptiveSection {
  sectionId: string
  variants: ContentVariant[]
  currentVariant: ContentVariant | null
  adaptationHistory: { variantId: string; timestamp: number; userSatisfaction: number }[]
  personalizedContent: ReactNode[]
}

interface ContentPersonalization {
  userId: string
  preferences: UserInteractionPattern
  contentHistory: string[]
  successfulVariants: Record<string, number>
  lastAdaptation: number
}

export function AdaptiveContentArchitecture({ 
  children,
  sectionId,
  variants,
  fallbackVariant = 'standard',
  adaptationThreshold = 0.3,
  className = ''
}: {
  children: ReactNode
  sectionId: string
  variants: Omit<ContentVariant, 'components'>[]
  fallbackVariant?: ContentVariant['type']
  adaptationThreshold?: number
  className?: string
}) {
  // User pattern analysis state
  const [userPattern, setUserPattern] = useState<UserInteractionPattern>({
    contentPreferences: {
      visualContent: 0.5,
      textualContent: 0.5,
      interactiveElements: 0.5,
      dataVisualization: 0.5
    },
    navigationBehavior: {
      linearReading: 0.7,
      detailOriented: 0.5,
      explorationTendency: 0.5,
      returnVisitor: false
    },
    deviceContext: {
      screenSize: 'desktop',
      hasTouch: false,
      connectionSpeed: 'medium',
      timeOnSite: 0
    },
    cognitiveLoad: {
      currentLevel: 0.5,
      processingSpeed: 1.0,
      multitaskingIndicators: 0,
      comprehensionScore: 0.7
    }
  })

  // Adaptation state
  const [currentVariant, setCurrentVariant] = useState<ContentVariant['type']>(fallbackVariant)
  const [adaptationConfidence, setAdaptationConfidence] = useState(0.5)
  const [isAdapting, setIsAdapting] = useState(false)
  const [personalization, setPersonalization] = useState<ContentPersonalization | null>(null)
  
  // Tracking refs
  const interactionTrackingRef = useRef({
    clicks: 0,
    scrollDepth: 0,
    dwellTime: 0,
    backtracking: 0,
    visualElementEngagement: 0,
    textBlockReadTime: 0,
    lastInteraction: Date.now(),
    interactionSequence: [] as string[]
  })
  
  const adaptationHistoryRef = useRef<AdaptiveSection['adaptationHistory']>([])
  const performanceMetricsRef = useRef({
    renderTime: 0,
    contentLoadTime: 0,
    userSatisfactionScore: 0.5,
    bounceRisk: 0.2
  })

  // INNOVATION 1: Real-time user behavior analysis
  const analyzeUserBehavior = useCallback(() => {
    let scrollVelocityHistory: number[] = []
    let clickPositionHistory: { x: number; y: number; target: string; timestamp: number }[] = []
    let lastScrollY = window.pageYOffset
    let lastScrollTime = Date.now()
    let visibilityChangeCount = 0
    let tabSwitchCount = 0

    // Scroll pattern analysis
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset
      const currentTime = Date.now()
      const timeDelta = currentTime - lastScrollTime
      const scrollDelta = currentScrollY - lastScrollY
      
      if (timeDelta > 16) { // Throttle to ~60fps
        const velocity = Math.abs(scrollDelta) / timeDelta
        scrollVelocityHistory.push(velocity)
        
        // Keep only recent history
        if (scrollVelocityHistory.length > 50) {
          scrollVelocityHistory.shift()
        }
        
        // Analyze scroll patterns
        const avgVelocity = scrollVelocityHistory.reduce((a, b) => a + b, 0) / scrollVelocityHistory.length
        const velocityVariance = scrollVelocityHistory.reduce((sum, v) => sum + Math.pow(v - avgVelocity, 2), 0) / scrollVelocityHistory.length
        
        // High variance = jumpy scrolling = cognitive overload or impatience
        const cognitiveLoad = Math.min(1, velocityVariance * 100)
        
        // Slow steady scrolling = reading/processing
        const processingSpeed = avgVelocity < 0.1 ? 2.0 : avgVelocity > 1.0 ? 0.5 : 1.0
        
        // Detect backtracking (scrolling up)
        if (scrollDelta < -100) {
          interactionTrackingRef.current.backtracking++
        }
        
        setUserPattern(prev => ({
          ...prev,
          cognitiveLoad: {
            ...prev.cognitiveLoad,
            currentLevel: cognitiveLoad,
            processingSpeed
          }
        }))
        
        lastScrollY = currentScrollY
        lastScrollTime = currentTime
      }
    }

    // Click pattern analysis
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const targetType = getElementType(target)
      
      clickPositionHistory.push({
        x: e.clientX,
        y: e.clientY,
        target: targetType,
        timestamp: Date.now()
      })
      
      // Keep only recent clicks
      if (clickPositionHistory.length > 20) {
        clickPositionHistory.shift()
      }
      
      // Analyze click patterns
      const recentClicks = clickPositionHistory.slice(-5)
      const visualClicks = recentClicks.filter(c => 
        c.target.includes('image') || c.target.includes('video') || c.target.includes('canvas')
      ).length
      const textClicks = recentClicks.filter(c => 
        c.target.includes('text') || c.target.includes('paragraph') || c.target.includes('heading')
      ).length
      const interactiveClicks = recentClicks.filter(c => 
        c.target.includes('button') || c.target.includes('link') || c.target.includes('input')
      ).length
      
      // Update content preferences based on interaction patterns
      setUserPattern(prev => ({
        ...prev,
        contentPreferences: {
          visualContent: Math.min(1, prev.contentPreferences.visualContent + (visualClicks * 0.1)),
          textualContent: Math.min(1, prev.contentPreferences.textualContent + (textClicks * 0.05)),
          interactiveElements: Math.min(1, prev.contentPreferences.interactiveElements + (interactiveClicks * 0.1)),
          dataVisualization: prev.contentPreferences.dataVisualization // Updated elsewhere
        }
      }))
      
      interactionTrackingRef.current.clicks++
      interactionTrackingRef.current.lastInteraction = Date.now()
      interactionTrackingRef.current.interactionSequence.push(targetType)
    }

    // Visibility change detection (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        visibilityChangeCount++
        tabSwitchCount++
      }
      
      // High tab switching = multitasking = higher cognitive load
      const multitaskingScore = Math.min(1, tabSwitchCount * 0.1)
      
      setUserPattern(prev => ({
        ...prev,
        cognitiveLoad: {
          ...prev.cognitiveLoad,
          multitaskingIndicators: multitaskingScore
        }
      }))
    }

    // Mouse movement pattern analysis
    let mousePositionHistory: { x: number; y: number; timestamp: number }[] = []
    let lastMousePosition = { x: 0, y: 0 }
    
    const handleMouseMove = (e: MouseEvent) => {
      const movement = Math.sqrt(
        Math.pow(e.clientX - lastMousePosition.x, 2) + 
        Math.pow(e.clientY - lastMousePosition.y, 2)
      )
      
      if (movement > 5) { // Ignore small movements
        mousePositionHistory.push({
          x: e.clientX,
          y: e.clientY,
          timestamp: Date.now()
        })
        
        if (mousePositionHistory.length > 30) {
          mousePositionHistory.shift()
        }
        
        // Analyze mouse patterns for reading behavior
        const recentMovements = mousePositionHistory.slice(-10)
        const horizontalMovements = recentMovements.filter(m => 
          Math.abs(m.x - mousePositionHistory[mousePositionHistory.length - 2]?.x) > 
          Math.abs(m.y - mousePositionHistory[mousePositionHistory.length - 2]?.y)
        ).length
        
        // More horizontal movements = linear reading pattern
        const linearReadingScore = horizontalMovements / recentMovements.length
        
        setUserPattern(prev => ({
          ...prev,
          navigationBehavior: {
            ...prev.navigationBehavior,
            linearReading: Math.min(1, prev.navigationBehavior.linearReading * 0.9 + linearReadingScore * 0.1)
          }
        }))
        
        lastMousePosition = { x: e.clientX, y: e.clientY }
      }
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClick)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClick)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // INNOVATION 2: Device and context detection
  const detectDeviceContext = useCallback(() => {
    const updateDeviceContext = () => {
      const screenWidth = window.innerWidth
      const screenSize = screenWidth < 768 ? 'mobile' : 
                         screenWidth < 1024 ? 'tablet' : 
                         screenWidth < 1920 ? 'desktop' : 'large'
      
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      // Rough connection speed estimation
      const connectionSpeed = (navigator as any).connection?.effectiveType === '4g' ? 'fast' :
                             (navigator as any).connection?.effectiveType === '3g' ? 'medium' : 'slow'
      
      setUserPattern(prev => ({
        ...prev,
        deviceContext: {
          screenSize,
          hasTouch,
          connectionSpeed: connectionSpeed || 'medium',
          timeOnSite: (Date.now() - performance.timing.navigationStart) / 1000
        }
      }))
    }

    updateDeviceContext()
    window.addEventListener('resize', updateDeviceContext)
    
    return () => window.removeEventListener('resize', updateDeviceContext)
  }, [])

  // INNOVATION 3: Intelligent variant selection algorithm
  const selectOptimalVariant = useCallback((patterns: UserInteractionPattern): ContentVariant['type'] => {
    const scores: Record<ContentVariant['type'], number> = {
      minimal: 0,
      standard: 0,
      detailed: 0,
      visual: 0,
      interactive: 0,
      'data-rich': 0
    }

    // Score based on content preferences
    scores.visual += patterns.contentPreferences.visualContent * 2
    scores.detailed += patterns.contentPreferences.textualContent * 2
    scores.interactive += patterns.contentPreferences.interactiveElements * 2
    scores['data-rich'] += patterns.contentPreferences.dataVisualization * 2

    // Score based on cognitive load
    if (patterns.cognitiveLoad.currentLevel > 0.7) {
      scores.minimal += 3
      scores.visual += 1
    } else if (patterns.cognitiveLoad.currentLevel < 0.3) {
      scores.detailed += 2
      scores.interactive += 2
      scores['data-rich'] += 1
    } else {
      scores.standard += 2
    }

    // Score based on device context
    if (patterns.deviceContext.screenSize === 'mobile') {
      scores.minimal += 2
      scores.visual += 1
    } else if (patterns.deviceContext.screenSize === 'large') {
      scores.detailed += 1
      scores['data-rich'] += 2
      scores.interactive += 1
    }

    // Score based on connection speed
    if (patterns.deviceContext.connectionSpeed === 'slow') {
      scores.minimal += 3
      scores.standard += 1
    } else if (patterns.deviceContext.connectionSpeed === 'fast') {
      scores.interactive += 1
      scores['data-rich'] += 1
    }

    // Score based on processing speed
    if (patterns.cognitiveLoad.processingSpeed < 0.7) {
      scores.visual += 2
      scores.minimal += 1
    } else if (patterns.cognitiveLoad.processingSpeed > 1.3) {
      scores.detailed += 2
      scores['data-rich'] += 1
    }

    // Score based on exploration tendency
    if (patterns.navigationBehavior.explorationTendency > 0.6) {
      scores.interactive += 2
      scores.detailed += 1
    }

    // Score based on return visitor status
    if (patterns.navigationBehavior.returnVisitor) {
      scores.detailed += 1
      scores.interactive += 1
      scores['data-rich'] += 1
    }

    // Find highest scoring variant
    let bestVariant: ContentVariant['type'] = 'standard'
    let highestScore = scores.standard

    Object.entries(scores).forEach(([variant, score]) => {
      if (score > highestScore) {
        highestScore = score
        bestVariant = variant as ContentVariant['type']
      }
    })

    // Apply adaptation confidence threshold
    const currentScore = scores[currentVariant] || 0
    const improvement = (highestScore - currentScore) / Math.max(currentScore, 1)
    
    if (improvement > adaptationThreshold) {
      setAdaptationConfidence(Math.min(1, improvement))
      return bestVariant
    }

    return currentVariant
  }, [currentVariant, adaptationThreshold])

  // INNOVATION 4: Predictive content loading based on user patterns
  const predictiveContentLoading = useCallback((patterns: UserInteractionPattern) => {
    const predictions = {
      likelyToScrollDown: patterns.navigationBehavior.linearReading > 0.6,
      likelyToInteract: patterns.contentPreferences.interactiveElements > 0.5,
      likelyToExplore: patterns.navigationBehavior.explorationTendency > 0.6,
      likelyToNeedDetails: patterns.contentPreferences.textualContent > 0.7,
      likelyToPreferVisual: patterns.contentPreferences.visualContent > 0.6
    }

    // Preload likely content variants
    if (predictions.likelyToNeedDetails && currentVariant !== 'detailed') {
      // Preload detailed variant
      console.log('Preloading detailed content variant for user')
    }

    if (predictions.likelyToPreferVisual && currentVariant !== 'visual') {
      // Preload visual variant
      console.log('Preloading visual content variant for user')
    }

    return predictions
  }, [currentVariant])

  // INNOVATION 5: Adaptive layout restructuring
  const getAdaptiveLayout = useCallback((variant: ContentVariant['type'], patterns: UserInteractionPattern) => {
    const baseLayouts = {
      minimal: 'list',
      standard: 'grid',
      detailed: 'timeline',
      visual: 'masonry',
      interactive: 'spotlight',
      'data-rich': 'dashboard'
    }

    let layout = baseLayouts[variant] as ContentVariant['layout']

    // Override layout based on device context
    if (patterns.deviceContext.screenSize === 'mobile') {
      layout = variant === 'visual' ? 'list' : 'list'
    } else if (patterns.deviceContext.screenSize === 'large') {
      if (variant === 'detailed' || variant === 'data-rich') {
        layout = 'dashboard'
      }
    }

    // Override layout based on cognitive load
    if (patterns.cognitiveLoad.currentLevel > 0.7) {
      layout = 'list' // Simplest layout
    }

    return layout
  }, [])

  // INNOVATION 6: Real-time adaptation engine
  useEffect(() => {
    const adaptationInterval = setInterval(() => {
      const newVariant = selectOptimalVariant(userPattern)
      
      if (newVariant !== currentVariant && adaptationConfidence > adaptationThreshold) {
        setIsAdapting(true)
        
        setTimeout(() => {
          setCurrentVariant(newVariant)
          setIsAdapting(false)
          
          // Record adaptation in history
          adaptationHistoryRef.current.push({
            variantId: newVariant,
            timestamp: Date.now(),
            userSatisfaction: performanceMetricsRef.current.userSatisfactionScore
          })
          
          // Keep only recent adaptations
          if (adaptationHistoryRef.current.length > 10) {
            adaptationHistoryRef.current.shift()
          }
        }, 300) // Brief animation delay
      }
      
      // Run predictive loading
      predictiveContentLoading(userPattern)
    }, 3000) // Check every 3 seconds

    return () => clearInterval(adaptationInterval)
  }, [userPattern, currentVariant, adaptationConfidence, adaptationThreshold, selectOptimalVariant, predictiveContentLoading])

  // Initialize tracking systems
  useEffect(() => {
    const cleanupBehavior = analyzeUserBehavior()
    const cleanupDevice = detectDeviceContext()
    
    return () => {
      cleanupBehavior()
      cleanupDevice()
    }
  }, [analyzeUserBehavior, detectDeviceContext])

  // INNOVATION 7: Performance-aware adaptation
  useEffect(() => {
    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const renderTime = navigation.loadEventEnd - navigation.loadEventStart
      
      performanceMetricsRef.current.renderTime = renderTime
      
      // Adjust adaptation based on performance
      if (renderTime > 2000) { // Slow render
        setUserPattern(prev => ({
          ...prev,
          cognitiveLoad: {
            ...prev.cognitiveLoad,
            currentLevel: Math.min(1, prev.cognitiveLoad.currentLevel + 0.1)
          }
        }))
      }
    }

    // Measure after initial render
    setTimeout(measurePerformance, 1000)
  }, [currentVariant])

  // Helper function to determine element type from DOM element
  const getElementType = (element: HTMLElement): string => {
    const tagName = element.tagName.toLowerCase()
    const className = element.className || ''
    const role = element.getAttribute('role') || ''
    
    if (tagName === 'img' || tagName === 'video' || tagName === 'canvas' || className.includes('image')) {
      return 'image'
    } else if (tagName === 'button' || role === 'button' || className.includes('button')) {
      return 'button'
    } else if (tagName === 'a' || className.includes('link')) {
      return 'link'
    } else if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
      return 'input'
    } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
      return 'heading'
    } else if (tagName === 'p' || className.includes('text')) {
      return 'text'
    } else {
      return 'other'
    }
  }

  // Get current layout configuration
  const currentLayout = getAdaptiveLayout(currentVariant, userPattern)

  return (
    <LayoutGroup>
      <motion.div
        className={`adaptive-content-architecture ${className}`}
        data-variant={currentVariant}
        data-layout={currentLayout}
        data-adaptation-confidence={adaptationConfidence.toFixed(2)}
        data-cognitive-load={userPattern.cognitiveLoad.currentLevel.toFixed(2)}
        layout
      >
        {/* Development indicators */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            className="fixed bottom-4 left-4 bg-black/90 text-white text-xs p-3 rounded font-mono z-50 max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="mb-2 text-yellow-400 font-bold">Adaptive Content</div>
            <div>Variant: {currentVariant}</div>
            <div>Layout: {currentLayout}</div>
            <div>Confidence: {adaptationConfidence.toFixed(2)}</div>
            <div>Cog Load: {userPattern.cognitiveLoad.currentLevel.toFixed(2)}</div>
            <div>Visual Pref: {userPattern.contentPreferences.visualContent.toFixed(2)}</div>
            <div>Text Pref: {userPattern.contentPreferences.textualContent.toFixed(2)}</div>
            <div>Interactive: {userPattern.contentPreferences.interactiveElements.toFixed(2)}</div>
            <div>Screen: {userPattern.deviceContext.screenSize}</div>
            {isAdapting && <div className="text-blue-400">Adapting...</div>}
          </motion.div>
        )}

        {/* Adaptive content rendering */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentVariant}-${currentLayout}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.5,
              ease: "easeInOut",
              layout: { duration: 0.3 }
            }}
            className={`
              adaptive-content-container
              ${currentLayout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :
                currentLayout === 'list' ? 'space-y-6' :
                currentLayout === 'masonry' ? 'columns-1 md:columns-2 lg:columns-3 gap-6' :
                currentLayout === 'timeline' ? 'relative space-y-8 before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-blue-200' :
                currentLayout === 'spotlight' ? 'flex flex-col items-center space-y-8' :
                currentLayout === 'dashboard' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4' : ''
              }
            `}
            layout
          >
            {children}
          </motion.div>
        </AnimatePresence>

        {/* Adaptation feedback indicator */}
        <AnimatePresence>
          {isAdapting && (
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                         bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 
                         rounded-full p-6 z-40 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  )
}

// Higher-order component for easy integration
export function withAdaptiveContent<P extends object>(
  Component: React.ComponentType<P>,
  config: {
    sectionId: string
    variants: Omit<ContentVariant, 'components'>[]
    fallbackVariant?: ContentVariant['type']
    adaptationThreshold?: number
  }
) {
  return function AdaptiveContentWrapper(props: P) {
    return (
      <AdaptiveContentArchitecture {...config}>
        <Component {...props} />
      </AdaptiveContentArchitecture>
    )
  }
}