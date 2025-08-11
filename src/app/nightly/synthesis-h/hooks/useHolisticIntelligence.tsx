'use client'

import { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react'

// Holistic Intelligence State Types
interface UserBehaviorState {
  readingPace: number
  scrollVelocity: number
  dwellTime: number
  attentionSpots: Array<{ x: number; y: number; duration: number; section: string }>
  cognitiveLoad: number
  interactionStyle: 'explorer' | 'analyzer' | 'achiever' | 'collaborator'
  deviceCapabilities: {
    gpu: boolean
    performance: 'high' | 'medium' | 'low'
    bandwidth: 'high' | 'medium' | 'low'
    screenSize: 'mobile' | 'tablet' | 'desktop'
  }
}

interface DesignSystemState {
  primaryColor: [number, number, number]
  secondaryColor: [number, number, number]
  accentColor: [number, number, number]
  spacing: number
  typography: {
    scale: number
    weight: number
    lineHeight: number
  }
  motionIntensity: number
  visualComplexity: number
}

interface MotionSystemState {
  globalTiming: {
    duration: number
    easing: [number, number, number, number]
    stagger: number
  }
  responsiveness: number
  smoothness: number
  currentAnimations: number
  motionBudget: number
  frameRate: number
}

interface CanvasSystemState {
  particleCount: number
  interactionRadius: number
  colorPalette: Array<[number, number, number]>
  complexity: number
  responsiveness: number
  physicsEnabled: boolean
  performanceLevel: 'low' | 'medium' | 'high' | 'ultra'
}

interface BusinessIntelligenceState {
  engagementScore: number
  conversionReadiness: number
  contentRelevance: Record<string, number>
  userJourneyStage: 'discovery' | 'consideration' | 'decision' | 'action'
  partnershipAffinity: number
  brandResonance: number
}

interface PerformanceState {
  fps: number
  memoryUsage: number
  cpuUsage: number
  networkLatency: number
  renderTime: number
  interactionDelay: number
  qualityLevel: 'low' | 'medium' | 'high' | 'ultra'
}

interface HolisticState {
  user: UserBehaviorState
  design: DesignSystemState
  motion: MotionSystemState
  canvas: CanvasSystemState
  business: BusinessIntelligenceState
  performance: PerformanceState
  integrationLevel: number // 0-1, how well systems are working together
  emergentCapabilities: Array<{
    name: string
    strength: number
    components: string[]
    value: number
  }>
  systemHarmony: number // 0-1, measure of holistic performance
}

// Actions for Holistic Intelligence System
type HolisticAction =
  | { type: 'UPDATE_USER_BEHAVIOR'; payload: Partial<UserBehaviorState> }
  | { type: 'UPDATE_DESIGN_SYSTEM'; payload: Partial<DesignSystemState> }
  | { type: 'UPDATE_MOTION_SYSTEM'; payload: Partial<MotionSystemState> }
  | { type: 'UPDATE_CANVAS_SYSTEM'; payload: Partial<CanvasSystemState> }
  | { type: 'UPDATE_BUSINESS_INTELLIGENCE'; payload: Partial<BusinessIntelligenceState> }
  | { type: 'UPDATE_PERFORMANCE'; payload: Partial<PerformanceState> }
  | { type: 'TRIGGER_SYSTEM_OPTIMIZATION' }
  | { type: 'REGISTER_CROSS_COMPONENT_EFFECT'; payload: { source: string; target: string; effect: any } }
  | { type: 'ENABLE_EMERGENT_CAPABILITY'; payload: { name: string; components: string[] } }

// Initial State with Optimal Defaults
const initialState: HolisticState = {
  user: {
    readingPace: 1.0,
    scrollVelocity: 0,
    dwellTime: 0,
    attentionSpots: [],
    cognitiveLoad: 0.5,
    interactionStyle: 'explorer',
    deviceCapabilities: {
      gpu: true,
      performance: 'high',
      bandwidth: 'high',
      screenSize: 'desktop'
    }
  },
  design: {
    primaryColor: [37, 99, 235], // Blue-600
    secondaryColor: [59, 130, 246], // Blue-500
    accentColor: [96, 165, 250], // Blue-400
    spacing: 16,
    typography: {
      scale: 1.0,
      weight: 400,
      lineHeight: 1.6
    },
    motionIntensity: 1.0,
    visualComplexity: 0.5
  },
  motion: {
    globalTiming: {
      duration: 0.6,
      easing: [0.22, 1, 0.36, 1],
      stagger: 0.1
    },
    responsiveness: 1.0,
    smoothness: 1.0,
    currentAnimations: 0,
    motionBudget: 10,
    frameRate: 60
  },
  canvas: {
    particleCount: 144,
    interactionRadius: 150,
    colorPalette: [[37, 99, 235], [59, 130, 246], [96, 165, 250]],
    complexity: 0.5,
    responsiveness: 1.0,
    physicsEnabled: true,
    performanceLevel: 'high'
  },
  business: {
    engagementScore: 0.5,
    conversionReadiness: 0.3,
    contentRelevance: {},
    userJourneyStage: 'discovery',
    partnershipAffinity: 0.5,
    brandResonance: 0.7
  },
  performance: {
    fps: 60,
    memoryUsage: 0.3,
    cpuUsage: 0.2,
    networkLatency: 50,
    renderTime: 16.67,
    interactionDelay: 8,
    qualityLevel: 'high'
  },
  integrationLevel: 0.0, // Start at 0, build through interactions
  emergentCapabilities: [],
  systemHarmony: 0.5
}

// Advanced Holistic Intelligence Reducer
function holisticReducer(state: HolisticState, action: HolisticAction): HolisticState {
  switch (action.type) {
    case 'UPDATE_USER_BEHAVIOR':
      const newUserState = { ...state.user, ...action.payload }
      
      // HOLISTIC INTEGRATION: User behavior changes trigger system-wide adaptations
      const motionIntensityAdjustment = newUserState.cognitiveLoad > 0.7 ? 0.6 : 1.0
      const visualComplexityAdjustment = newUserState.interactionStyle === 'analyzer' ? 0.7 : 
                                         newUserState.interactionStyle === 'achiever' ? 0.4 : 1.0
      const particleCountAdjustment = newUserState.deviceCapabilities.performance === 'low' ? 0.3 :
                                      newUserState.deviceCapabilities.performance === 'medium' ? 0.6 : 1.0

      return {
        ...state,
        user: newUserState,
        design: {
          ...state.design,
          motionIntensity: motionIntensityAdjustment,
          visualComplexity: visualComplexityAdjustment
        },
        canvas: {
          ...state.canvas,
          particleCount: Math.floor(144 * particleCountAdjustment),
          performanceLevel: newUserState.deviceCapabilities.performance as any
        },
        integrationLevel: Math.min(state.integrationLevel + 0.05, 1.0),
        systemHarmony: calculateSystemHarmony({ ...state, user: newUserState })
      }

    case 'UPDATE_DESIGN_SYSTEM':
      const newDesignState = { ...state.design, ...action.payload }
      
      // HOLISTIC INTEGRATION: Design changes inform canvas and motion systems
      return {
        ...state,
        design: newDesignState,
        canvas: {
          ...state.canvas,
          colorPalette: [newDesignState.primaryColor, newDesignState.secondaryColor, newDesignState.accentColor],
          complexity: newDesignState.visualComplexity
        },
        motion: {
          ...state.motion,
          globalTiming: {
            ...state.motion.globalTiming,
            duration: 0.6 * newDesignState.motionIntensity
          },
          motionBudget: Math.floor(10 * newDesignState.motionIntensity)
        },
        integrationLevel: Math.min(state.integrationLevel + 0.03, 1.0),
        systemHarmony: calculateSystemHarmony({ ...state, design: newDesignState })
      }

    case 'UPDATE_MOTION_SYSTEM':
      const newMotionState = { ...state.motion, ...action.payload }
      
      // HOLISTIC INTEGRATION: Motion timing influences canvas physics
      return {
        ...state,
        motion: newMotionState,
        canvas: {
          ...state.canvas,
          responsiveness: newMotionState.responsiveness,
          physicsEnabled: newMotionState.frameRate > 45
        },
        integrationLevel: Math.min(state.integrationLevel + 0.02, 1.0),
        systemHarmony: calculateSystemHarmony({ ...state, motion: newMotionState })
      }

    case 'UPDATE_CANVAS_SYSTEM':
      const newCanvasState = { ...state.canvas, ...action.payload }
      
      // HOLISTIC INTEGRATION: Canvas performance affects motion budget
      return {
        ...state,
        canvas: newCanvasState,
        motion: {
          ...state.motion,
          motionBudget: newCanvasState.performanceLevel === 'ultra' ? 15 :
                        newCanvasState.performanceLevel === 'high' ? 10 :
                        newCanvasState.performanceLevel === 'medium' ? 6 : 3
        },
        integrationLevel: Math.min(state.integrationLevel + 0.02, 1.0),
        systemHarmony: calculateSystemHarmony({ ...state, canvas: newCanvasState })
      }

    case 'UPDATE_PERFORMANCE':
      const newPerformanceState = { ...state.performance, ...action.payload }
      
      // HOLISTIC INTEGRATION: Performance metrics trigger system-wide optimization
      const shouldOptimize = newPerformanceState.fps < 45 || 
                             newPerformanceState.memoryUsage > 0.8 ||
                             newPerformanceState.interactionDelay > 16

      if (shouldOptimize) {
        return {
          ...state,
          performance: newPerformanceState,
          canvas: {
            ...state.canvas,
            particleCount: Math.max(30, Math.floor(state.canvas.particleCount * 0.7)),
            performanceLevel: 'medium' as any
          },
          motion: {
            ...state.motion,
            motionBudget: Math.max(3, Math.floor(state.motion.motionBudget * 0.6))
          },
          design: {
            ...state.design,
            visualComplexity: Math.max(0.3, state.design.visualComplexity * 0.8)
          },
          systemHarmony: calculateSystemHarmony({ ...state, performance: newPerformanceState })
        }
      }

      return {
        ...state,
        performance: newPerformanceState,
        systemHarmony: calculateSystemHarmony({ ...state, performance: newPerformanceState })
      }

    case 'TRIGGER_SYSTEM_OPTIMIZATION':
      // HOLISTIC OPTIMIZATION: Analyze all systems and optimize for perfect harmony
      const optimizedState = optimizeSystemHarmony(state)
      return {
        ...optimizedState,
        integrationLevel: Math.min(state.integrationLevel + 0.1, 1.0),
        systemHarmony: calculateSystemHarmony(optimizedState)
      }

    case 'ENABLE_EMERGENT_CAPABILITY':
      // EMERGENT CAPABILITIES: When integration reaches certain levels, new behaviors emerge
      const newCapability = {
        name: action.payload.name,
        strength: state.integrationLevel,
        components: action.payload.components,
        value: calculateCapabilityValue(state, action.payload.name)
      }

      return {
        ...state,
        emergentCapabilities: [...state.emergentCapabilities, newCapability],
        integrationLevel: Math.min(state.integrationLevel + 0.05, 1.0),
        systemHarmony: calculateSystemHarmony(state) * 1.1 // Emergent capabilities boost overall harmony
      }

    default:
      return state
  }
}

// Holistic System Harmony Calculator
function calculateSystemHarmony(state: HolisticState): number {
  // Measure how well all systems are working together
  const userSatisfaction = 1 - state.user.cognitiveLoad * 0.5 + state.business.engagementScore * 0.3
  const performanceEfficiency = (state.performance.fps / 60) * 
                                (1 - state.performance.memoryUsage) * 
                                (1 - state.performance.cpuUsage)
  const systemBalance = (state.design.visualComplexity + state.motion.responsiveness + state.canvas.complexity) / 3
  const businessAlignment = state.business.brandResonance * state.business.partnershipAffinity
  
  return Math.max(0, Math.min(1, 
    (userSatisfaction * 0.3 + performanceEfficiency * 0.3 + systemBalance * 0.2 + businessAlignment * 0.2)
  ))
}

// System-Wide Optimization Engine
function optimizeSystemHarmony(state: HolisticState): HolisticState {
  // Golden ratio optimization across all systems
  const PHI = 1.618033988749
  const PHI_INVERSE = 0.618033988749

  return {
    ...state,
    design: {
      ...state.design,
      spacing: Math.floor(state.design.spacing * PHI_INVERSE) * 2, // Fibonacci-based spacing
      typography: {
        ...state.design.typography,
        scale: PHI_INVERSE + (state.user.cognitiveLoad * 0.2)
      }
    },
    motion: {
      ...state.motion,
      globalTiming: {
        ...state.motion.globalTiming,
        duration: 0.6 * PHI_INVERSE * state.design.motionIntensity,
        stagger: 0.1 * PHI_INVERSE
      }
    },
    canvas: {
      ...state.canvas,
      interactionRadius: 150 * PHI_INVERSE,
      complexity: 0.5 * PHI_INVERSE + (state.user.interactionStyle === 'collaborator' ? 0.2 : 0)
    }
  }
}

// Calculate value of emergent capabilities
function calculateCapabilityValue(state: HolisticState, capabilityName: string): number {
  switch (capabilityName) {
    case 'predictive-adaptation':
      return state.user.attentionSpots.length * 0.1 + state.business.engagementScore * 0.5
    case 'creative-collaboration':
      return state.canvas.complexity * state.motion.responsiveness * state.user.readingPace
    case 'business-resonance':
      return state.business.brandResonance * state.business.partnershipAffinity * state.systemHarmony
    case 'performance-artistry':
      return (state.performance.fps / 60) * state.design.visualComplexity * state.canvas.complexity
    default:
      return state.integrationLevel
  }
}

// Holistic Intelligence Context
const HolisticIntelligenceContext = createContext<{
  state: HolisticState
  dispatch: React.Dispatch<HolisticAction>
  updateUserBehavior: (updates: Partial<UserBehaviorState>) => void
  updateDesignSystem: (updates: Partial<DesignSystemState>) => void
  updateMotionSystem: (updates: Partial<MotionSystemState>) => void
  updateCanvasSystem: (updates: Partial<CanvasSystemState>) => void
  updateBusinessIntelligence: (updates: Partial<BusinessIntelligenceState>) => void
  updatePerformance: (updates: Partial<PerformanceState>) => void
  triggerOptimization: () => void
  enableEmergentCapability: (name: string, components: string[]) => void
  isSystemReady: boolean
} | null>(null)

// Holistic Intelligence Provider
export function HolisticIntelligenceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(holisticReducer, initialState)
  const performanceMonitorRef = useRef<number>()
  const systemReadyRef = useRef(false)

  // Action creators for clean API
  const updateUserBehavior = useCallback((updates: Partial<UserBehaviorState>) => {
    dispatch({ type: 'UPDATE_USER_BEHAVIOR', payload: updates })
  }, [])

  const updateDesignSystem = useCallback((updates: Partial<DesignSystemState>) => {
    dispatch({ type: 'UPDATE_DESIGN_SYSTEM', payload: updates })
  }, [])

  const updateMotionSystem = useCallback((updates: Partial<MotionSystemState>) => {
    dispatch({ type: 'UPDATE_MOTION_SYSTEM', payload: updates })
  }, [])

  const updateCanvasSystem = useCallback((updates: Partial<CanvasSystemState>) => {
    dispatch({ type: 'UPDATE_CANVAS_SYSTEM', payload: updates })
  }, [])

  const updateBusinessIntelligence = useCallback((updates: Partial<BusinessIntelligenceState>) => {
    dispatch({ type: 'UPDATE_BUSINESS_INTELLIGENCE', payload: updates })
  }, [])

  const updatePerformance = useCallback((updates: Partial<PerformanceState>) => {
    dispatch({ type: 'UPDATE_PERFORMANCE', payload: updates })
  }, [])

  const triggerOptimization = useCallback(() => {
    dispatch({ type: 'TRIGGER_SYSTEM_OPTIMIZATION' })
  }, [])

  const enableEmergentCapability = useCallback((name: string, components: string[]) => {
    dispatch({ type: 'ENABLE_EMERGENT_CAPABILITY', payload: { name, components } })
  }, [])

  // Performance monitoring and automatic optimization
  useEffect(() => {
    const monitor = () => {
      const now = performance.now()
      const fps = 1000 / (now - (performanceMonitorRef.current || now))
      performanceMonitorRef.current = now

      updatePerformance({
        fps: fps > 0 && fps < 200 ? fps : state.performance.fps,
        memoryUsage: (performance as any).memory ? 
          (performance as any).memory.usedJSHeapSize / (performance as any).memory.jsHeapSizeLimit : 
          state.performance.memoryUsage
      })

      // Trigger automatic optimization if needed
      if (state.systemHarmony < 0.6) {
        triggerOptimization()
      }

      // Enable emergent capabilities based on integration level
      if (state.integrationLevel > 0.3 && !state.emergentCapabilities.find(c => c.name === 'predictive-adaptation')) {
        enableEmergentCapability('predictive-adaptation', ['user', 'design', 'motion'])
      }
      if (state.integrationLevel > 0.5 && !state.emergentCapabilities.find(c => c.name === 'creative-collaboration')) {
        enableEmergentCapability('creative-collaboration', ['canvas', 'motion', 'design'])
      }
      if (state.integrationLevel > 0.7 && !state.emergentCapabilities.find(c => c.name === 'business-resonance')) {
        enableEmergentCapability('business-resonance', ['business', 'user', 'design'])
      }
      if (state.integrationLevel > 0.9 && !state.emergentCapabilities.find(c => c.name === 'performance-artistry')) {
        enableEmergentCapability('performance-artistry', ['performance', 'canvas', 'motion', 'design'])
      }

      requestAnimationFrame(monitor)
    }

    const startMonitoring = requestAnimationFrame(monitor)
    systemReadyRef.current = true

    return () => {
      if (startMonitoring) {
        cancelAnimationFrame(startMonitoring)
      }
    }
  }, [state.systemHarmony, state.integrationLevel, state.emergentCapabilities, updatePerformance, triggerOptimization, enableEmergentCapability])

  const value = {
    state,
    dispatch,
    updateUserBehavior,
    updateDesignSystem,
    updateMotionSystem,
    updateCanvasSystem,
    updateBusinessIntelligence,
    updatePerformance,
    triggerOptimization,
    enableEmergentCapability,
    isSystemReady: systemReadyRef.current
  }

  return (
    <HolisticIntelligenceContext.Provider value={value}>
      {children}
    </HolisticIntelligenceContext.Provider>
  )
}

// Hook to use Holistic Intelligence
export function useHolisticIntelligence() {
  const context = useContext(HolisticIntelligenceContext)
  if (!context) {
    throw new Error('useHolisticIntelligence must be used within a HolisticIntelligenceProvider')
  }
  return context
}

// Specialized hooks for different aspects
export function useUserIntelligence() {
  const { state, updateUserBehavior } = useHolisticIntelligence()
  return { user: state.user, updateUser: updateUserBehavior }
}

export function useDesignIntelligence() {
  const { state, updateDesignSystem } = useHolisticIntelligence()
  return { design: state.design, updateDesign: updateDesignSystem }
}

export function useMotionIntelligence() {
  const { state, updateMotionSystem } = useHolisticIntelligence()
  return { motion: state.motion, updateMotion: updateMotionSystem }
}

export function useCanvasIntelligence() {
  const { state, updateCanvasSystem } = useHolisticIntelligence()
  return { canvas: state.canvas, updateCanvas: updateCanvasSystem }
}

export function useBusinessIntelligence() {
  const { state, updateBusinessIntelligence } = useHolisticIntelligence()
  return { business: state.business, updateBusiness: updateBusinessIntelligence }
}

export function usePerformanceIntelligence() {
  const { state, updatePerformance } = useHolisticIntelligence()
  return { performance: state.performance, updatePerformance }
}

export function useSystemHarmony() {
  const { state, triggerOptimization } = useHolisticIntelligence()
  return { 
    harmony: state.systemHarmony, 
    integrationLevel: state.integrationLevel,
    emergentCapabilities: state.emergentCapabilities,
    optimize: triggerOptimization
  }
}