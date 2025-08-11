'use client'

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'

// Spatial Computing Types
interface SpatialPosition {
  x: number
  y: number
  z: number
}

interface SpatialRotation {
  x: number // pitch
  y: number // yaw  
  z: number // roll
}

interface SpatialTransform {
  position: SpatialPosition
  rotation: SpatialRotation
  scale: SpatialPosition
}

interface SpatialLayer {
  id: string
  name: string
  transform: SpatialTransform
  visible: boolean
  interactive: boolean
  content_type: '2d' | '3d' | 'holographic' | 'mixed'
  depth_level: number
  collision_enabled: boolean
  physics_enabled: boolean
}

interface SpatialInteraction {
  type: 'gaze' | 'gesture' | 'voice' | 'touch' | 'neural'
  confidence: number
  position?: SpatialPosition
  direction?: SpatialPosition
  gesture_data?: any
  voice_command?: string
  intent: string
  timestamp: number
}

interface SpatialEnvironment {
  mode: '2d' | '2d-spatial' | 'ar' | 'vr' | 'mixed-reality'
  available_space: {
    width: number
    height: number
    depth: number
  }
  user_position: SpatialPosition
  user_orientation: SpatialRotation
  ambient_light: number
  physics_gravity: SpatialPosition
  interaction_methods: string[]
}

interface SpatialContent {
  id: string
  type: 'text' | 'image' | 'video' | '3d-model' | 'interface' | 'data-visualization'
  spatial_properties: {
    preferred_distance: number
    optimal_viewing_angle: number
    can_resize: boolean
    can_rotate: boolean
    can_reposition: boolean
  }
  adaptive_behavior: {
    follows_user: boolean
    maintains_distance: boolean
    auto_orient: boolean
    collision_response: 'phase' | 'bounce' | 'stop' | 'deform'
  }
}

interface SpatialComputingState {
  environment: SpatialEnvironment
  layers: Map<string, SpatialLayer>
  content: Map<string, SpatialContent>
  interactions: SpatialInteraction[]
  user_preferences: {
    comfort_distance: number
    preferred_height: number
    motion_sensitivity: number
    spatial_awareness: number
  }
  ar_anchors: Map<string, SpatialTransform>
  vr_teleport_points: SpatialPosition[]
}

interface SpatialComputingContextType {
  // State
  spatialMode: '2d' | '2d-spatial' | 'ar' | 'vr' | 'mixed-reality'
  environment: SpatialEnvironment
  isXRSupported: boolean
  
  // Core Spatial Functions
  initializeSpatialEnvironment: (mode: string) => Promise<void>
  createSpatialLayer: (name: string, transform: SpatialTransform) => Promise<string>
  positionContent: (contentId: string, position: SpatialPosition) => Promise<void>
  
  // Interaction Management
  registerInteraction: (interaction: SpatialInteraction) => Promise<void>
  handleGestureInput: (gestureData: any) => Promise<void>
  handleVoiceCommand: (command: string) => Promise<void>
  handleGazeTracking: (gazePosition: SpatialPosition) => Promise<void>
  
  // AR/VR Specific
  createARanchor: (position: SpatialPosition, rotation: SpatialRotation) => Promise<string>
  enableVRTeleportation: (points: SpatialPosition[]) => Promise<void>
  switchToARMode: () => Promise<boolean>
  switchToVRMode: () => Promise<boolean>
  
  // Adaptive Interface
  adaptInterface: (environment: SpatialEnvironment) => Promise<void>
  optimizeSpatialLayout: (content: SpatialContent[]) => Promise<SpatialTransform[]>
  enableSpatialPhysics: (layerId: string) => Promise<void>
  
  // Future Spatial Features
  enableHolographicDisplay: () => Promise<boolean>
  createNeuralInterface: () => Promise<boolean>
  implementSpatialAI: (behavior: string) => Promise<void>
}

// Create context
const SpatialComputingContext = createContext<SpatialComputingContextType | null>(null)

// Spatial Mathematics Utilities
class SpatialMath {
  static createTransform(
    position: SpatialPosition = { x: 0, y: 0, z: 0 },
    rotation: SpatialRotation = { x: 0, y: 0, z: 0 },
    scale: SpatialPosition = { x: 1, y: 1, z: 1 }
  ): SpatialTransform {
    return { position, rotation, scale }
  }

  static distance(pos1: SpatialPosition, pos2: SpatialPosition): number {
    const dx = pos2.x - pos1.x
    const dy = pos2.y - pos1.y
    const dz = pos2.z - pos1.z
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }

  static lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t
  }

  static lerpPosition(pos1: SpatialPosition, pos2: SpatialPosition, t: number): SpatialPosition {
    return {
      x: this.lerp(pos1.x, pos2.x, t),
      y: this.lerp(pos1.y, pos2.y, t),
      z: this.lerp(pos1.z, pos2.z, t)
    }
  }

  static rotatePoint(point: SpatialPosition, rotation: SpatialRotation): SpatialPosition {
    // Simplified 3D rotation - in production would use proper quaternion math
    const radX = rotation.x * Math.PI / 180
    const radY = rotation.y * Math.PI / 180
    const radZ = rotation.z * Math.PI / 180

    // Rotate around Y axis (yaw)
    let x = point.x * Math.cos(radY) - point.z * Math.sin(radY)
    let z = point.x * Math.sin(radY) + point.z * Math.cos(radY)
    
    // Rotate around X axis (pitch)
    let y = point.y * Math.cos(radX) - z * Math.sin(radX)
    z = point.y * Math.sin(radX) + z * Math.cos(radX)
    
    // Rotate around Z axis (roll)
    const finalX = x * Math.cos(radZ) - y * Math.sin(radZ)
    const finalY = x * Math.sin(radZ) + y * Math.cos(radZ)

    return { x: finalX, y: finalY, z }
  }

  static isWithinBounds(position: SpatialPosition, bounds: { min: SpatialPosition, max: SpatialPosition }): boolean {
    return position.x >= bounds.min.x && position.x <= bounds.max.x &&
           position.y >= bounds.min.y && position.y <= bounds.max.y &&
           position.z >= bounds.min.z && position.z <= bounds.max.z
  }
}

// WebXR Detection and Management
class WebXRManager {
  static async checkXRSupport(): Promise<{ ar: boolean, vr: boolean }> {
    if (!('xr' in navigator)) {
      return { ar: false, vr: false }
    }

    try {
      const xr = (navigator as any).xr
      const [arSupported, vrSupported] = await Promise.all([
        xr.isSessionSupported?.('immersive-ar'),
        xr.isSessionSupported?.('immersive-vr')
      ])

      return {
        ar: !!arSupported,
        vr: !!vrSupported
      }
    } catch (error) {
      return { ar: false, vr: false }
    }
  }

  static async requestARSession(): Promise<any> {
    if (!('xr' in navigator)) throw new Error('WebXR not supported')
    
    const xr = (navigator as any).xr
    return await xr.requestSession('immersive-ar', {
      requiredFeatures: ['local', 'hit-test'],
      optionalFeatures: ['dom-overlay', 'light-estimation']
    })
  }

  static async requestVRSession(): Promise<any> {
    if (!('xr' in navigator)) throw new Error('WebXR not supported')
    
    const xr = (navigator as any).xr
    return await xr.requestSession('immersive-vr', {
      optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
    })
  }
}

// Provider Component
export function SpatialComputingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SpatialComputingState>({
    environment: {
      mode: '2d',
      available_space: { width: 1920, height: 1080, depth: 0 },
      user_position: { x: 0, y: 0, z: 0 },
      user_orientation: { x: 0, y: 0, z: 0 },
      ambient_light: 0.8,
      physics_gravity: { x: 0, y: -9.81, z: 0 },
      interaction_methods: ['touch', 'mouse']
    },
    layers: new Map(),
    content: new Map(),
    interactions: [],
    user_preferences: {
      comfort_distance: 1.5, // meters
      preferred_height: 1.7, // meters
      motion_sensitivity: 0.7,
      spatial_awareness: 0.8
    },
    ar_anchors: new Map(),
    vr_teleport_points: []
  })

  const [xrSupport, setXrSupport] = useState({ ar: false, vr: false })
  const xrSessionRef = useRef<any>(null)
  const spatialUpdateRef = useRef<number>()

  // Detect XR support on mount
  useEffect(() => {
    WebXRManager.checkXRSupport().then(support => {
      setXrSupport(support)
      
      // Update environment with available interaction methods
      setState(prev => ({
        ...prev,
        environment: {
          ...prev.environment,
          interaction_methods: [
            'touch', 'mouse',
            ...(support.ar ? ['gaze', 'gesture'] : []),
            ...(support.vr ? ['controller', 'hand-tracking'] : [])
          ]
        }
      }))
    })
  }, [])

  // Spatial tracking loop
  useEffect(() => {
    const updateSpatialTracking = () => {
      // Simulate spatial tracking updates
      if (state.environment.mode !== '2d') {
        // Update user position and orientation
        // In a real implementation, this would get data from WebXR APIs
        setState(prev => ({
          ...prev,
          environment: {
            ...prev.environment,
            user_position: {
              x: prev.environment.user_position.x + (Math.random() - 0.5) * 0.01,
              y: prev.environment.user_position.y,
              z: prev.environment.user_position.z + (Math.random() - 0.5) * 0.01
            }
          }
        }))
      }
    }

    if (state.environment.mode !== '2d') {
      spatialUpdateRef.current = window.setInterval(updateSpatialTracking, 16) // ~60fps
    }

    return () => {
      if (spatialUpdateRef.current) {
        clearInterval(spatialUpdateRef.current)
      }
    }
  }, [state.environment.mode])

  const initializeSpatialEnvironment = useCallback(async (mode: string): Promise<void> => {
    let environmentUpdate: Partial<SpatialEnvironment> = { mode: mode as any }

    switch (mode) {
      case '2d-spatial':
        environmentUpdate = {
          ...environmentUpdate,
          available_space: { width: window.innerWidth, height: window.innerHeight, depth: 100 },
          interaction_methods: ['touch', 'mouse', 'gaze']
        }
        break

      case 'ar':
        if (!xrSupport.ar) {
          throw new Error('AR not supported on this device')
        }
        environmentUpdate = {
          ...environmentUpdate,
          available_space: { width: 10, height: 10, depth: 10 }, // Real world space
          interaction_methods: ['gaze', 'gesture', 'voice', 'touch']
        }
        break

      case 'vr':
        if (!xrSupport.vr) {
          throw new Error('VR not supported on this device')
        }
        environmentUpdate = {
          ...environmentUpdate,
          available_space: { width: 5, height: 3, depth: 5 }, // Room scale
          interaction_methods: ['controller', 'hand-tracking', 'voice']
        }
        break

      case 'mixed-reality':
        if (!xrSupport.ar || !xrSupport.vr) {
          throw new Error('Mixed Reality not supported on this device')
        }
        environmentUpdate = {
          ...environmentUpdate,
          available_space: { width: 20, height: 10, depth: 20 }, // Large mixed space
          interaction_methods: ['gaze', 'gesture', 'voice', 'touch', 'controller', 'hand-tracking']
        }
        break
    }

    setState(prev => ({
      ...prev,
      environment: { ...prev.environment, ...environmentUpdate }
    }))
  }, [xrSupport])

  const createSpatialLayer = useCallback(async (name: string, transform: SpatialTransform): Promise<string> => {
    const layerId = `layer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const layer: SpatialLayer = {
      id: layerId,
      name,
      transform,
      visible: true,
      interactive: true,
      content_type: '2d',
      depth_level: transform.position.z,
      collision_enabled: false,
      physics_enabled: false
    }

    setState(prev => ({
      ...prev,
      layers: new Map(prev.layers).set(layerId, layer)
    }))

    return layerId
  }, [])

  const positionContent = useCallback(async (contentId: string, position: SpatialPosition): Promise<void> => {
    setState(prev => {
      const content = prev.content.get(contentId)
      if (!content) return prev

      // Calculate optimal positioning based on spatial rules
      let optimalPosition = { ...position }

      // Apply user comfort distance
      const userDistance = SpatialMath.distance(position, prev.environment.user_position)
      if (userDistance < prev.user_preferences.comfort_distance) {
        // Move content away from user
        const direction = {
          x: position.x - prev.environment.user_position.x,
          y: position.y - prev.environment.user_position.y,
          z: position.z - prev.environment.user_position.z
        }
        const length = Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2)
        if (length > 0) {
          const factor = prev.user_preferences.comfort_distance / length
          optimalPosition = {
            x: prev.environment.user_position.x + direction.x * factor,
            y: prev.environment.user_position.y + direction.y * factor,
            z: prev.environment.user_position.z + direction.z * factor
          }
        }
      }

      // Update content with new spatial properties
      const updatedContent = {
        ...content,
        spatial_properties: {
          ...content.spatial_properties,
          preferred_distance: SpatialMath.distance(optimalPosition, prev.environment.user_position)
        }
      }

      return {
        ...prev,
        content: new Map(prev.content).set(contentId, updatedContent)
      }
    })
  }, [])

  const registerInteraction = useCallback(async (interaction: SpatialInteraction): Promise<void> => {
    setState(prev => ({
      ...prev,
      interactions: [...prev.interactions.slice(-49), interaction] // Keep last 50 interactions
    }))

    // Process the interaction based on type
    switch (interaction.type) {
      case 'gaze':
        // Handle gaze interaction
        if (interaction.position) {
          await handleGazeTracking(interaction.position)
        }
        break

      case 'gesture':
        // Handle gesture interaction
        if (interaction.gesture_data) {
          await handleGestureInput(interaction.gesture_data)
        }
        break

      case 'voice':
        // Handle voice interaction
        if (interaction.voice_command) {
          await handleVoiceCommand(interaction.voice_command)
        }
        break
    }
  }, [])

  const handleGestureInput = useCallback(async (gestureData: any): Promise<void> => {
    // Process gesture data
    const recognizedGestures = {
      'swipe_right': 'navigate_forward',
      'swipe_left': 'navigate_back',
      'pinch_zoom': 'zoom_content',
      'rotate_clockwise': 'rotate_view',
      'point': 'select_target',
      'grab': 'move_object'
    }

    const gesture = recognizedGestures[gestureData.type as keyof typeof recognizedGestures]
    
    if (gesture) {
      // Execute spatial gesture command
      console.log(`Executing spatial gesture: ${gesture}`)
      
      // Add gesture to interaction history
      setState(prev => ({
        ...prev,
        interactions: [...prev.interactions, {
          type: 'gesture',
          confidence: gestureData.confidence || 0.8,
          gesture_data: gestureData,
          intent: gesture,
          timestamp: Date.now()
        }]
      }))
    }
  }, [])

  const handleVoiceCommand = useCallback(async (command: string): Promise<void> => {
    const voiceCommands = {
      'show services': 'navigate_to_services',
      'contact us': 'navigate_to_contact',
      'go back': 'navigate_back',
      'zoom in': 'zoom_in',
      'zoom out': 'zoom_out',
      'move closer': 'reduce_distance',
      'move away': 'increase_distance',
      'hide interface': 'minimize_ui',
      'show interface': 'maximize_ui'
    }

    const intent = voiceCommands[command.toLowerCase() as keyof typeof voiceCommands]
    
    if (intent) {
      setState(prev => ({
        ...prev,
        interactions: [...prev.interactions, {
          type: 'voice',
          confidence: 0.9,
          voice_command: command,
          intent,
          timestamp: Date.now()
        }]
      }))
    }
  }, [])

  const handleGazeTracking = useCallback(async (gazePosition: SpatialPosition): Promise<void> => {
    // Find content at gaze position and provide visual feedback
    setState(prev => {
      const updatedLayers = new Map(prev.layers)
      
      prev.layers.forEach((layer, layerId) => {
        const distance = SpatialMath.distance(gazePosition, layer.transform.position)
        
        if (distance < 1.0) { // Within gaze interaction range
          // Highlight layer
          updatedLayers.set(layerId, {
            ...layer,
            // Add gaze highlight properties
          })
        }
      })

      return { ...prev, layers: updatedLayers }
    })
  }, [])

  const createARanchor = useCallback(async (position: SpatialPosition, rotation: SpatialRotation): Promise<string> => {
    if (state.environment.mode !== 'ar' && state.environment.mode !== 'mixed-reality') {
      throw new Error('AR anchors only available in AR/Mixed Reality mode')
    }

    const anchorId = `anchor_${Date.now()}`
    const transform = SpatialMath.createTransform(position, rotation)

    setState(prev => ({
      ...prev,
      ar_anchors: new Map(prev.ar_anchors).set(anchorId, transform)
    }))

    return anchorId
  }, [state.environment.mode])

  const enableVRTeleportation = useCallback(async (points: SpatialPosition[]): Promise<void> => {
    if (state.environment.mode !== 'vr' && state.environment.mode !== 'mixed-reality') {
      throw new Error('VR teleportation only available in VR/Mixed Reality mode')
    }

    setState(prev => ({
      ...prev,
      vr_teleport_points: points
    }))
  }, [state.environment.mode])

  const switchToARMode = useCallback(async (): Promise<boolean> => {
    if (!xrSupport.ar) return false

    try {
      xrSessionRef.current = await WebXRManager.requestARSession()
      await initializeSpatialEnvironment('ar')
      return true
    } catch (error) {
      console.error('Failed to switch to AR mode:', error)
      return false
    }
  }, [xrSupport.ar, initializeSpatialEnvironment])

  const switchToVRMode = useCallback(async (): Promise<boolean> => {
    if (!xrSupport.vr) return false

    try {
      xrSessionRef.current = await WebXRManager.requestVRSession()
      await initializeSpatialEnvironment('vr')
      return true
    } catch (error) {
      console.error('Failed to switch to VR mode:', error)
      return false
    }
  }, [xrSupport.vr, initializeSpatialEnvironment])

  const adaptInterface = useCallback(async (environment: SpatialEnvironment): Promise<void> => {
    // Adapt interface based on spatial environment
    setState(prev => {
      const adaptations: string[] = []

      if (environment.mode === 'ar' || environment.mode === 'mixed-reality') {
        adaptations.push('transparent_background')
        adaptations.push('occlusion_aware')
        adaptations.push('world_anchored')
      }

      if (environment.mode === 'vr') {
        adaptations.push('immersive_layout')
        adaptations.push('controller_optimized')
        adaptations.push('comfort_settings')
      }

      if (environment.available_space.depth > 0) {
        adaptations.push('depth_layering')
        adaptations.push('spatial_navigation')
      }

      return { ...prev, environment: { ...prev.environment, ...environment } }
    })
  }, [])

  const optimizeSpatialLayout = useCallback(async (content: SpatialContent[]): Promise<SpatialTransform[]> => {
    // Optimize spatial layout for content
    const transforms: SpatialTransform[] = []
    const userPos = state.environment.user_position
    const comfortDistance = state.user_preferences.comfort_distance

    content.forEach((item, index) => {
      const angle = (index / content.length) * 2 * Math.PI
      const position: SpatialPosition = {
        x: userPos.x + Math.cos(angle) * comfortDistance,
        y: userPos.y + state.user_preferences.preferred_height,
        z: userPos.z + Math.sin(angle) * comfortDistance
      }

      const rotation: SpatialRotation = {
        x: 0,
        y: Math.atan2(position.x - userPos.x, position.z - userPos.z) * 180 / Math.PI,
        z: 0
      }

      transforms.push(SpatialMath.createTransform(position, rotation))
    })

    return transforms
  }, [state.environment.user_position, state.user_preferences])

  const enableSpatialPhysics = useCallback(async (layerId: string): Promise<void> => {
    setState(prev => {
      const layer = prev.layers.get(layerId)
      if (!layer) return prev

      const updatedLayer = {
        ...layer,
        physics_enabled: true,
        collision_enabled: true
      }

      return {
        ...prev,
        layers: new Map(prev.layers).set(layerId, updatedLayer)
      }
    })
  }, [])

  // Future Spatial Features
  const enableHolographicDisplay = useCallback(async (): Promise<boolean> => {
    // Future: Enable holographic display capabilities
    if (state.environment.mode === 'mixed-reality') {
      console.log('Holographic display enabled')
      return true
    }
    return false
  }, [state.environment.mode])

  const createNeuralInterface = useCallback(async (): Promise<boolean> => {
    // Future: Create neural interface for thought-based interaction
    console.log('Neural interface creation attempted - future technology')
    return false // Not yet available
  }, [])

  const implementSpatialAI = useCallback(async (behavior: string): Promise<void> => {
    // Future: Implement AI that understands spatial context
    console.log(`Spatial AI behavior implemented: ${behavior}`)
  }, [])

  const contextValue: SpatialComputingContextType = {
    spatialMode: state.environment.mode,
    environment: state.environment,
    isXRSupported: xrSupport.ar || xrSupport.vr,
    
    initializeSpatialEnvironment,
    createSpatialLayer,
    positionContent,
    registerInteraction,
    handleGestureInput,
    handleVoiceCommand,
    handleGazeTracking,
    createARanchor,
    enableVRTeleportation,
    switchToARMode,
    switchToVRMode,
    adaptInterface,
    optimizeSpatialLayout,
    enableSpatialPhysics,
    enableHolographicDisplay,
    createNeuralInterface,
    implementSpatialAI
  }

  return (
    <SpatialComputingContext.Provider value={contextValue}>
      {children}
    </SpatialComputingContext.Provider>
  )
}

// Hook to use Spatial Computing
export function useSpatialComputing() {
  const context = useContext(SpatialComputingContext)
  if (!context) {
    throw new Error('useSpatialComputing must be used within SpatialComputingProvider')
  }
  return context
}