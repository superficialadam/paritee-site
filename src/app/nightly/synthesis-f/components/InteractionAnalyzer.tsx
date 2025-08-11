'use client'

import { useEffect, useRef, useCallback } from 'react'

interface InteractionPattern {
  type: 'scroll' | 'hover' | 'click' | 'focus' | 'touch' | 'gesture'
  timestamp: number
  x: number
  y: number
  velocity?: number
  acceleration?: number
  pressure?: number
  intention?: 'explore' | 'navigate' | 'select' | 'browse' | 'search'
  confidence: number
}

interface UserIntent {
  primary: string
  confidence: number
  patterns: InteractionPattern[]
  predictedNext: string[]
  attentionZones: Array<{x: number, y: number, radius: number, intensity: number}>
  cognitiveLoad: number
  flowState: number
}

interface GazeData {
  x: number
  y: number
  timestamp: number
  duration: number
  fixation: boolean
}

export function InteractionAnalyzer() {
  const interactionHistoryRef = useRef<InteractionPattern[]>([])
  const gazeDataRef = useRef<GazeData[]>([])
  const intentAnalysisRef = useRef<UserIntent>({
    primary: 'explore',
    confidence: 0.5,
    patterns: [],
    predictedNext: [],
    attentionZones: [],
    cognitiveLoad: 0.3,
    flowState: 0.5,
  })
  
  const lastMouseRef = useRef({ x: 0, y: 0, timestamp: 0 })
  const scrollVelocityRef = useRef<number[]>([])
  const hoverDurationsRef = useRef<Map<string, number>>(new Map())
  const clickPatternsRef = useRef<Array<{x: number, y: number, timestamp: number}>>([])
  
  // Advanced mouse tracking with velocity and acceleration
  const trackMouseInteraction = useCallback((event: MouseEvent) => {
    const currentTime = performance.now()
    const deltaTime = currentTime - lastMouseRef.current.timestamp
    
    if (deltaTime > 0) {
      const deltaX = event.clientX - lastMouseRef.current.x
      const deltaY = event.clientY - lastMouseRef.current.y
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const velocity = distance / deltaTime * 1000 // pixels per second
      
      // Calculate acceleration
      const prevVelocity = interactionHistoryRef.current[interactionHistoryRef.current.length - 1]?.velocity || 0
      const acceleration = Math.abs(velocity - prevVelocity) / deltaTime * 1000
      
      // Analyze movement intention
      let intention: InteractionPattern['intention'] = 'explore'
      let confidence = 0.5
      
      if (velocity < 50 && deltaTime > 100) {
        intention = 'select' // Slow, deliberate movement
        confidence = 0.8
      } else if (velocity > 500) {
        intention = 'navigate' // Fast movement, likely navigating
        confidence = 0.7
      } else if (acceleration < 100 && velocity > 100 && velocity < 300) {
        intention = 'browse' // Steady browsing speed
        confidence = 0.6
      }
      
      const interaction: InteractionPattern = {
        type: 'hover',
        timestamp: currentTime,
        x: event.clientX,
        y: event.clientY,
        velocity,
        acceleration,
        intention,
        confidence,
      }
      
      // Add to history
      interactionHistoryRef.current.push(interaction)
      
      // Limit history size for performance
      if (interactionHistoryRef.current.length > 1000) {
        interactionHistoryRef.current = interactionHistoryRef.current.slice(-800)
      }
      
      // Update gaze simulation (approximation based on mouse)
      updateGazeTracking(event.clientX, event.clientY, currentTime)
    }
    
    lastMouseRef.current = {
      x: event.clientX,
      y: event.clientY,
      timestamp: currentTime,
    }
  }, [])
  
  // Scroll pattern analysis
  const trackScrollInteraction = useCallback((event: Event) => {
    const currentTime = performance.now()
    const scrollY = window.pageYOffset
    
    // Calculate scroll velocity
    if (scrollVelocityRef.current.length > 0) {
      const lastScroll = scrollVelocityRef.current[scrollVelocityRef.current.length - 1]
      const velocity = Math.abs(scrollY - lastScroll) / 16.67 // Assume 60fps
      
      scrollVelocityRef.current.push(scrollY)
      
      // Analyze scroll intention
      let intention: InteractionPattern['intention'] = 'browse'
      let confidence = 0.6
      
      if (velocity < 5) {
        intention = 'select' // Reading/selecting content
        confidence = 0.8
      } else if (velocity > 50) {
        intention = 'search' // Fast scrolling, searching for something
        confidence = 0.7
      }
      
      const interaction: InteractionPattern = {
        type: 'scroll',
        timestamp: currentTime,
        x: window.innerWidth / 2, // Approximate scroll center
        y: scrollY,
        velocity,
        intention,
        confidence,
      }
      
      interactionHistoryRef.current.push(interaction)
    } else {
      scrollVelocityRef.current.push(scrollY)
    }
    
    // Limit scroll velocity history
    if (scrollVelocityRef.current.length > 100) {
      scrollVelocityRef.current = scrollVelocityRef.current.slice(-80)
    }
  }, [])
  
  // Click pattern analysis
  const trackClickInteraction = useCallback((event: MouseEvent) => {
    const currentTime = performance.now()
    
    clickPatternsRef.current.push({
      x: event.clientX,
      y: event.clientY,
      timestamp: currentTime,
    })
    
    // Analyze click patterns for intent
    let intention: InteractionPattern['intention'] = 'select'
    let confidence = 0.9
    
    // Check for rapid clicking (might indicate frustration or urgency)
    const recentClicks = clickPatternsRef.current.filter(
      click => currentTime - click.timestamp < 2000
    )
    
    if (recentClicks.length > 3) {
      intention = 'search' // Rapid clicking might indicate searching/frustration
      confidence = 0.7
    }
    
    const interaction: InteractionPattern = {
      type: 'click',
      timestamp: currentTime,
      x: event.clientX,
      y: event.clientY,
      intention,
      confidence,
    }
    
    interactionHistoryRef.current.push(interaction)
    
    // Trigger micro-interaction feedback
    createInteractionRipple(event.clientX, event.clientY)
    
    // Limit click history
    if (clickPatternsRef.current.length > 50) {
      clickPatternsRef.current = clickPatternsRef.current.slice(-30)
    }
  }, [])
  
  // Simulated gaze tracking (mouse approximation)
  const updateGazeTracking = useCallback((x: number, y: number, timestamp: number) => {
    const lastGaze = gazeDataRef.current[gazeDataRef.current.length - 1]
    
    if (lastGaze) {
      const distance = Math.sqrt(
        Math.pow(x - lastGaze.x, 2) + Math.pow(y - lastGaze.y, 2)
      )
      
      // If movement is small, consider it a fixation
      const isFixation = distance < 50 && (timestamp - lastGaze.timestamp) > 200
      
      gazeDataRef.current.push({
        x,
        y,
        timestamp,
        duration: timestamp - lastGaze.timestamp,
        fixation: isFixation,
      })
      
      // Update attention zones based on fixations
      if (isFixation) {
        updateAttentionZones(x, y)
      }
    } else {
      gazeDataRef.current.push({
        x,
        y,
        timestamp,
        duration: 0,
        fixation: false,
      })
    }
    
    // Limit gaze history
    if (gazeDataRef.current.length > 200) {
      gazeDataRef.current = gazeDataRef.current.slice(-150)
    }
  }, [])
  
  // Update attention zones based on interaction patterns
  const updateAttentionZones = useCallback((x: number, y: number) => {
    const zones = intentAnalysisRef.current.attentionZones
    const threshold = 100 // pixels
    
    // Find existing zone or create new one
    let existingZone = zones.find(zone => 
      Math.sqrt(Math.pow(x - zone.x, 2) + Math.pow(y - zone.y, 2)) < threshold
    )
    
    if (existingZone) {
      existingZone.intensity = Math.min(1, existingZone.intensity + 0.1)
      // Slightly adjust zone center toward new point
      existingZone.x = existingZone.x * 0.9 + x * 0.1
      existingZone.y = existingZone.y * 0.9 + y * 0.1
    } else {
      zones.push({
        x,
        y,
        radius: 50,
        intensity: 0.3,
      })
    }
    
    // Decay existing zones
    for (const zone of zones) {
      zone.intensity *= 0.99
      zone.radius = Math.min(150, zone.radius * 1.01)
    }
    
    // Remove weak zones
    intentAnalysisRef.current.attentionZones = zones.filter(zone => zone.intensity > 0.05)
  }, [])
  
  // Advanced intent analysis
  const analyzeUserIntent = useCallback(() => {
    const history = interactionHistoryRef.current
    const recentHistory = history.slice(-50) // Last 50 interactions
    
    if (recentHistory.length < 5) return
    
    // Analyze patterns
    const intentCounts = new Map<string, number>()
    let totalConfidence = 0
    
    for (const interaction of recentHistory) {
      if (interaction.intention) {
        intentCounts.set(
          interaction.intention,
          (intentCounts.get(interaction.intention) || 0) + interaction.confidence
        )
        totalConfidence += interaction.confidence
      }
    }
    
    // Find primary intent
    let primaryIntent = 'explore'
    let maxScore = 0
    
    for (const [intent, score] of intentCounts) {
      if (score > maxScore) {
        maxScore = score
        primaryIntent = intent
      }
    }
    
    const confidence = totalConfidence > 0 ? maxScore / totalConfidence : 0.5
    
    // Calculate cognitive load based on interaction patterns
    const avgVelocity = recentHistory
      .filter(h => h.velocity)
      .reduce((sum, h) => sum + (h.velocity || 0), 0) / recentHistory.length
    
    const avgAcceleration = recentHistory
      .filter(h => h.acceleration)
      .reduce((sum, h) => sum + (h.acceleration || 0), 0) / recentHistory.length
    
    // High velocity/acceleration might indicate higher cognitive load
    const cognitiveLoad = Math.min(1, (avgVelocity / 300 + avgAcceleration / 500) * 0.5)
    
    // Flow state analysis (smooth, consistent interactions indicate flow)
    const velocityVariance = recentHistory
      .filter(h => h.velocity)
      .reduce((sum, h, i, arr) => {
        if (i === 0) return 0
        return sum + Math.abs((h.velocity || 0) - (arr[i - 1].velocity || 0))
      }, 0) / recentHistory.length
    
    const flowState = Math.max(0, 1 - velocityVariance / 200) // Lower variance = higher flow
    
    // Predict next actions based on patterns
    const predictedNext = predictNextActions(recentHistory, primaryIntent)
    
    // Update intent analysis
    intentAnalysisRef.current = {
      primary: primaryIntent,
      confidence,
      patterns: recentHistory,
      predictedNext,
      attentionZones: intentAnalysisRef.current.attentionZones,
      cognitiveLoad,
      flowState,
    }
    
    // Emit intent data for other components
    window.dispatchEvent(new CustomEvent('user-intent-update', {
      detail: intentAnalysisRef.current
    }))
    
    // Apply adaptive UX based on intent
    applyAdaptiveUX(intentAnalysisRef.current)
  }, [])
  
  // Predict next user actions
  const predictNextActions = (history: InteractionPattern[], primaryIntent: string): string[] => {
    const predictions: string[] = []
    
    switch (primaryIntent) {
      case 'explore':
        predictions.push('scroll', 'hover', 'click-link')
        break
      case 'navigate':
        predictions.push('click-navigation', 'scroll-fast', 'back-button')
        break
      case 'select':
        predictions.push('click-button', 'click-card', 'focus-form')
        break
      case 'browse':
        predictions.push('scroll', 'hover-card', 'click-more')
        break
      case 'search':
        predictions.push('scroll-fast', 'click-search', 'keyboard-input')
        break
    }
    
    return predictions
  }
  
  // Apply adaptive UX optimizations based on user intent
  const applyAdaptiveUX = useCallback((intent: UserIntent) => {
    const root = document.documentElement
    
    // Adjust interaction timing based on cognitive load
    const responseTime = Math.max(100, 300 - intent.cognitiveLoad * 200)
    root.style.setProperty('--adaptive-response-time', `${responseTime}ms`)
    
    // Adjust animation intensity based on flow state
    const animationIntensity = intent.flowState * 0.8 + 0.2 // 0.2 to 1.0
    root.style.setProperty('--adaptive-animation-intensity', animationIntensity.toString())
    
    // Preload likely next interactions
    for (const prediction of intent.predictedNext.slice(0, 3)) {
      root.classList.add(`predict-${prediction}`)
    }
    
    // Remove old predictions
    const classes = Array.from(root.classList).filter(c => c.startsWith('predict-'))
    classes.forEach(c => {
      if (!intent.predictedNext.includes(c.replace('predict-', ''))) {
        root.classList.remove(c)
      }
    })
    
    // Adjust particle responsiveness based on attention zones
    if (intent.attentionZones.length > 0) {
      const maxIntensity = Math.max(...intent.attentionZones.map(z => z.intensity))
      root.style.setProperty('--attention-intensity', maxIntensity.toString())
    }
  }, [])
  
  // Create visual feedback for interactions
  const createInteractionRipple = useCallback((x: number, y: number) => {
    const ripple = document.createElement('div')
    ripple.className = 'interaction-ripple'
    ripple.style.cssText = `
      position: fixed;
      top: ${y - 20}px;
      left: ${x - 20}px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
      animation: ripple-expand 600ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
    `
    
    document.body.appendChild(ripple)
    
    // Clean up after animation
    setTimeout(() => {
      document.body.removeChild(ripple)
    }, 600)
  }, [])
  
  // Set up event listeners
  useEffect(() => {
    // Mouse tracking
    window.addEventListener('mousemove', trackMouseInteraction, { passive: true })
    window.addEventListener('click', trackClickInteraction, { passive: true })
    
    // Scroll tracking
    window.addEventListener('scroll', trackScrollInteraction, { passive: true })
    
    // Touch tracking for mobile
    const trackTouchInteraction = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0]
        trackMouseInteraction({
          clientX: touch.clientX,
          clientY: touch.clientY,
        } as MouseEvent)
      }
    }
    
    window.addEventListener('touchmove', trackTouchInteraction, { passive: true })
    
    // Focus tracking
    const trackFocusInteraction = (event: FocusEvent) => {
      const target = event.target as HTMLElement
      const rect = target.getBoundingClientRect()
      
      const interaction: InteractionPattern = {
        type: 'focus',
        timestamp: performance.now(),
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        intention: 'select',
        confidence: 0.8,
      }
      
      interactionHistoryRef.current.push(interaction)
    }
    
    window.addEventListener('focusin', trackFocusInteraction, { passive: true })
    
    // Analyze intent periodically
    const intentAnalysisInterval = setInterval(analyzeUserIntent, 1000)
    
    // Add CSS for ripple animation
    const style = document.createElement('style')
    style.textContent = `
      @keyframes ripple-expand {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(3);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      window.removeEventListener('mousemove', trackMouseInteraction)
      window.removeEventListener('click', trackClickInteraction)
      window.removeEventListener('scroll', trackScrollInteraction)
      window.removeEventListener('touchmove', trackTouchInteraction)
      window.removeEventListener('focusin', trackFocusInteraction)
      clearInterval(intentAnalysisInterval)
      document.head.removeChild(style)
    }
  }, [trackMouseInteraction, trackScrollInteraction, trackClickInteraction, analyzeUserIntent])
  
  return null // This component doesn't render anything visible
}