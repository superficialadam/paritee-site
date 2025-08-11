'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useHolisticIntelligence } from '../hooks/useHolisticIntelligence'

// Holistic Particle with integrated intelligence
interface HolisticParticle {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: [number, number, number]
  
  // Integration properties
  designResonance: number // How well it responds to design changes
  motionSynergy: number // How it contributes to motion timing
  businessValue: number // Its contribution to business objectives
  userConnection: number // Strength of connection to user behavior
  
  // Emergent properties that arise from integration
  consciousnessLevel: number
  collaborationPotential: number
  brandExpression: number
  performanceContribution: number
  
  // System integration state
  lastDesignUpdate: number
  lastMotionUpdate: number
  lastUserUpdate: number
  integrationHistory: Array<{ timestamp: number; source: string; value: number }>
  
  // Life cycle
  birthTime: number
  evolutionStage: 'emerging' | 'integrating' | 'collaborating' | 'transcending'
  
  // Cross-system communication
  designMessages: Array<{ type: string; value: any; timestamp: number }>
  motionMessages: Array<{ type: string; value: any; timestamp: number }>
  businessMessages: Array<{ type: string; value: any; timestamp: number }>
}

// Holistic Attractor that responds to all system states
interface HolisticAttractor {
  id: string
  x: number
  y: number
  strength: number
  
  // Multi-dimensional attraction
  designAttraction: number
  motionAttraction: number
  businessAttraction: number
  userAttraction: number
  
  // Emergent properties
  integrationField: number
  harmonyRadius: number
  collaborationIntensity: number
  
  // Evolution
  maturityLevel: number
  influence: Array<{ particleId: string; strength: number }>
}

// Cross-System Communication Events
interface SystemEvent {
  id: string
  type: 'design_change' | 'motion_trigger' | 'user_interaction' | 'business_insight' | 'performance_shift'
  source: string
  timestamp: number
  data: any
  propagationLevel: number
  holisticImpact: number
}

export default function HolisticCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const p5InstanceRef = useRef<any>(null)
  
  // Holistic Intelligence Integration
  const { 
    state, 
    updateCanvasSystem, 
    updateDesignSystem, 
    updateMotionSystem, 
    updateBusinessIntelligence,
    updateUserBehavior,
    isSystemReady 
  } = useHolisticIntelligence()
  
  const [particles, setParticles] = useState<HolisticParticle[]>([])
  const [attractors, setAttractors] = useState<HolisticAttractor[]>([])
  const [systemEvents, setSystemEvents] = useState<SystemEvent[]>([])
  const [integrationLevel, setIntegrationLevel] = useState(0)
  const [emergentBehaviors, setEmergentBehaviors] = useState<string[]>([])
  
  const timeRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, velocity: 0 })
  const performanceRef = useRef({ fps: 60, frameTime: 16.67, lastTime: performance.now() })
  
  // HOLISTIC INTEGRATION: Mathematical constants that unify all systems
  const PHI = 1.618033988749 // Golden ratio - design harmony
  const FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144] // Motion timing
  const COLLABORATION_CONSTANT = 0.618033988749 // Partnership mathematics
  
  // Color harmony derived from design system state
  const getHolisticColors = useCallback(() => ({
    primary: state.design.primaryColor,
    secondary: state.design.secondaryColor,
    accent: state.design.accentColor,
    harmony: [
      Math.floor(state.design.primaryColor[0] * PHI) % 255,
      Math.floor(state.design.secondaryColor[1] * PHI) % 255,
      Math.floor(state.design.accentColor[2] * PHI) % 255
    ] as [number, number, number],
    collaboration: [255, 255, 255] // White - synthesis of all colors
  }), [state.design])

  // Initialize holistic particle system
  const initializeHolisticSystem = useCallback(() => {
    if (!isSystemReady) return

    const newParticles: HolisticParticle[] = []
    const colors = getHolisticColors()
    
    // Particle count based on device capabilities and design complexity
    const baseCount = FIBONACCI[7] // 13 * 11 = 144 base particles
    const complexityMultiplier = state.design.visualComplexity
    const performanceMultiplier = state.canvas.performanceLevel === 'ultra' ? 1.5 :
                                  state.canvas.performanceLevel === 'high' ? 1.0 :
                                  state.canvas.performanceLevel === 'medium' ? 0.7 : 0.4
    
    const particleCount = Math.floor(baseCount * complexityMultiplier * performanceMultiplier)
    
    for (let i = 0; i < particleCount; i++) {
      // Golden spiral positioning for natural distribution
      const angle = i * PHI * Math.PI * 2
      const radius = Math.sqrt(i) * 20 * state.design.spacing / 16
      const centerX = window.innerWidth * 0.5
      const centerY = window.innerHeight * 0.5
      
      const particle: HolisticParticle = {
        id: `holistic-${i}`,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * state.motion.responsiveness,
        vy: (Math.random() - 0.5) * state.motion.responsiveness,
        size: 1 + Math.random() * 3 * state.design.visualComplexity,
        alpha: 0.3 + Math.random() * 0.4,
        color: Object.values(colors)[Math.floor(Math.random() * 4)] as [number, number, number],
        
        // Integration properties initialized based on system state
        designResonance: Math.random() * state.design.visualComplexity,
        motionSynergy: Math.random() * state.motion.responsiveness,
        businessValue: Math.random() * state.business.brandResonance,
        userConnection: Math.random() * (1 - state.user.cognitiveLoad),
        
        // Emergent properties start at base levels
        consciousnessLevel: Math.random() * 0.5,
        collaborationPotential: Math.random() * state.business.partnershipAffinity,
        brandExpression: Math.random() * state.business.brandResonance,
        performanceContribution: Math.random() * 0.3,
        
        // Integration tracking
        lastDesignUpdate: Date.now(),
        lastMotionUpdate: Date.now(),
        lastUserUpdate: Date.now(),
        integrationHistory: [],
        
        // Life cycle
        birthTime: Date.now(),
        evolutionStage: 'emerging',
        
        // Communication channels
        designMessages: [],
        motionMessages: [],
        businessMessages: []
      }
      
      newParticles.push(particle)
    }
    
    setParticles(newParticles)
    
    // Initialize collaborative attractors
    const newAttractors: HolisticAttractor[] = []
    const attractorCount = Math.floor(FIBONACCI[3] * state.business.partnershipAffinity) // 2-8 attractors
    
    for (let i = 0; i < attractorCount; i++) {
      newAttractors.push({
        id: `attractor-${i}`,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        strength: Math.random() * 2 + 1,
        designAttraction: Math.random() * state.design.visualComplexity,
        motionAttraction: Math.random() * state.motion.responsiveness,
        businessAttraction: Math.random() * state.business.partnershipAffinity,
        userAttraction: Math.random() * (1 - state.user.cognitiveLoad),
        integrationField: 0,
        harmonyRadius: 100 * PHI,
        collaborationIntensity: 0,
        maturityLevel: 0,
        influence: []
      })
    }
    
    setAttractors(newAttractors)
  }, [isSystemReady, state, getHolisticColors])

  // REVOLUTIONARY FEATURE: Cross-system communication
  const sendSystemEvent = useCallback((type: SystemEvent['type'], data: any, source: string) => {
    const event: SystemEvent = {
      id: `event-${Date.now()}-${Math.random()}`,
      type,
      source,
      timestamp: Date.now(),
      data,
      propagationLevel: 1,
      holisticImpact: 0
    }
    
    setSystemEvents(prev => [...prev.slice(-20), event]) // Keep last 20 events
    
    // INTEGRATION MAGIC: Events propagate and transform across systems
    switch (type) {
      case 'design_change':
        // Design changes affect motion timing
        updateMotionSystem({
          globalTiming: {
            ...state.motion.globalTiming,
            duration: data.motionIntensity * 0.6,
            stagger: data.motionIntensity * 0.1 * COLLABORATION_CONSTANT
          }
        })
        break
        
      case 'motion_trigger':
        // Motion events influence design complexity
        updateDesignSystem({
          visualComplexity: Math.max(0.2, Math.min(1.0, data.intensity * 0.8))
        })
        break
        
      case 'user_interaction':
        // User behavior adjusts business intelligence
        updateBusinessIntelligence({
          engagementScore: Math.min(1.0, state.business.engagementScore + data.engagement * 0.1),
          partnershipAffinity: Math.min(1.0, state.business.partnershipAffinity + data.collaboration * 0.05)
        })
        break
        
      case 'business_insight':
        // Business insights optimize user experience
        updateUserBehavior({
          cognitiveLoad: Math.max(0.1, state.user.cognitiveLoad - data.clarity * 0.1)
        })
        break
    }
  }, [state, updateMotionSystem, updateDesignSystem, updateBusinessIntelligence, updateUserBehavior])

  // HOLISTIC PHYSICS: Particles respond to all system dimensions
  const updateHolisticPhysics = useCallback((deltaTime: number) => {
    const currentTime = Date.now()
    
    setParticles(prevParticles => 
      prevParticles.map(particle => {
        // INTEGRATION EVOLUTION: Particles evolve based on system harmony
        const systemAge = currentTime - particle.birthTime
        const integrationExperience = particle.integrationHistory.length
        
        // Evolution stages based on integration level
        if (integrationExperience > 50 && particle.evolutionStage === 'emerging') {
          particle.evolutionStage = 'integrating'
          sendSystemEvent('design_change', { particleEvolution: 'integrating' }, 'particle')
        } else if (integrationExperience > 100 && particle.evolutionStage === 'integrating') {
          particle.evolutionStage = 'collaborating'
          sendSystemEvent('motion_trigger', { intensity: particle.collaborationPotential }, 'particle')
        } else if (integrationExperience > 200 && particle.evolutionStage === 'collaborating') {
          particle.evolutionStage = 'transcending'
          sendSystemEvent('business_insight', { clarity: particle.brandExpression }, 'particle')
        }
        
        // CONSCIOUSNESS EXPANSION: Particles become more aware through integration
        particle.consciousnessLevel = Math.min(1.0, 
          particle.consciousnessLevel + (state.integrationLevel * 0.001)
        )
        
        // DESIGN RESONANCE: Visual properties influenced by design system
        if (currentTime - particle.lastDesignUpdate > 100) {
          particle.designResonance = (particle.designResonance + state.design.visualComplexity) / 2
          particle.color = Object.values(getHolisticColors())[
            Math.floor(particle.brandExpression * 4)
          ] as [number, number, number]
          particle.lastDesignUpdate = currentTime
        }
        
        // MOTION SYNERGY: Movement influenced by motion system
        if (currentTime - particle.lastMotionUpdate > 50) {
          const motionInfluence = state.motion.responsiveness * state.motion.globalTiming.duration
          particle.vx *= (1 + motionInfluence * 0.1)
          particle.vy *= (1 + motionInfluence * 0.1)
          particle.lastMotionUpdate = currentTime
        }
        
        // USER CONNECTION: Behavior influenced by user state
        if (currentTime - particle.lastUserUpdate > 200) {
          particle.userConnection = (particle.userConnection + (1 - state.user.cognitiveLoad)) / 2
          particle.alpha = 0.3 + particle.userConnection * 0.5
          particle.lastUserUpdate = currentTime
        }
        
        // BUSINESS VALUE INTEGRATION
        particle.businessValue = (particle.businessValue + 
          state.business.brandResonance * state.business.partnershipAffinity) / 2
        
        // HOLISTIC FORCE CALCULATION
        let forceX = 0, forceY = 0
        
        // Attractor influences weighted by integration level
        attractors.forEach(attractor => {
          const dx = attractor.x - particle.x
          const dy = attractor.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance > 0 && distance < attractor.harmonyRadius) {
            const force = (attractor.strength * particle.consciousnessLevel * state.integrationLevel) / 
                         (distance * distance + 1)
            
            forceX += (dx / distance) * force * 0.01
            forceY += (dy / distance) * force * 0.01
          }
        })
        
        // Collaboration forces between particles
        prevParticles.forEach(other => {
          if (other.id === particle.id) return
          
          const dx = other.x - particle.x
          const dy = other.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance > 0 && distance < 100) {
            const collaborationForce = particle.collaborationPotential * other.collaborationPotential * 
                                      state.business.partnershipAffinity / (distance * distance + 1)
            
            forceX += (dx / distance) * collaborationForce * 0.005
            forceY += (dy / distance) * collaborationForce * 0.005
          }
        })
        
        // User interaction forces
        const mouseDistance = Math.sqrt(
          (mouseRef.current.x - particle.x) ** 2 + 
          (mouseRef.current.y - particle.y) ** 2
        )
        
        if (mouseDistance < state.canvas.interactionRadius) {
          const userForce = particle.userConnection * mouseRef.current.velocity * 0.001
          const angle = Math.atan2(mouseRef.current.y - particle.y, mouseRef.current.x - particle.x)
          
          forceX += Math.cos(angle) * userForce
          forceY += Math.sin(angle) * userForce
          
          // User interaction increases collaboration potential
          particle.collaborationPotential = Math.min(1.0, particle.collaborationPotential + 0.001)
        }
        
        // Apply forces with consciousness-based responsiveness
        particle.vx += forceX * particle.consciousnessLevel
        particle.vy += forceY * particle.consciousnessLevel
        
        // Velocity limiting with golden ratio
        const maxSpeed = 2 * COLLABORATION_CONSTANT * state.motion.responsiveness
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed
          particle.vy = (particle.vy / speed) * maxSpeed
        }
        
        // Position update
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Boundary wrapping with consciousness
        const margin = particle.size * particle.consciousnessLevel
        if (particle.x < -margin) particle.x = window.innerWidth + margin
        if (particle.x > window.innerWidth + margin) particle.x = -margin
        if (particle.y < -margin) particle.y = window.innerHeight + margin
        if (particle.y > window.innerHeight + margin) particle.y = -margin
        
        // Record integration history
        particle.integrationHistory.push({
          timestamp: currentTime,
          source: 'physics',
          value: particle.consciousnessLevel
        })
        
        // Limit history for performance
        if (particle.integrationHistory.length > 50) {
          particle.integrationHistory.shift()
        }
        
        return particle
      })
    )
    
    // Update attractor maturity and collaboration
    setAttractors(prevAttractors =>
      prevAttractors.map(attractor => {
        attractor.maturityLevel += 0.001 * state.integrationLevel
        attractor.collaborationIntensity = state.business.partnershipAffinity * attractor.maturityLevel
        attractor.integrationField = state.systemHarmony * attractor.collaborationIntensity
        
        return attractor
      })
    )
  }, [state, attractors, sendSystemEvent, getHolisticColors])

  // Mouse interaction with holistic intelligence
  const handleMouseMovement = useCallback((event: MouseEvent) => {
    const prevX = mouseRef.current.x
    const prevY = mouseRef.current.y
    
    mouseRef.current.prevX = prevX
    mouseRef.current.prevY = prevY
    mouseRef.current.x = event.clientX
    mouseRef.current.y = event.clientY
    
    // Calculate velocity for consciousness response
    const dx = mouseRef.current.x - prevX
    const dy = mouseRef.current.y - prevY
    mouseRef.current.velocity = Math.sqrt(dx * dx + dy * dy)
    
    // Send user interaction event
    if (mouseRef.current.velocity > 1) {
      sendSystemEvent('user_interaction', {
        engagement: Math.min(1.0, mouseRef.current.velocity / 20),
        collaboration: mouseRef.current.velocity > 5 ? 0.1 : 0.05
      }, 'mouse')
    }
  }, [sendSystemEvent])

  // P5.js Sketch with Holistic Integration
  const createHolisticSketch = useCallback((p: any) => {
    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
      canvas.parent(canvasRef.current)
      p.colorMode(p.RGB)
    }

    p.draw = () => {
      const currentTime = performance.now()
      const deltaTime = currentTime - performanceRef.current.lastTime
      performanceRef.current.lastTime = currentTime
      performanceRef.current.fps = 1000 / deltaTime
      
      timeRef.current += deltaTime

      // Update canvas system performance
      updateCanvasSystem({
        particleCount: particles.length,
        performanceLevel: performanceRef.current.fps > 45 ? 'high' : 
                         performanceRef.current.fps > 30 ? 'medium' : 'low'
      })

      // Dynamic background based on system harmony
      const harmonyAlpha = state.systemHarmony * 15
      p.background(15, 23, 42, harmonyAlpha)
      
      // Render holistic integration field
      if (state.integrationLevel > 0.3) {
        const colors = getHolisticColors()
        const fieldRadius = state.integrationLevel * 300
        const centerX = p.width * 0.5
        const centerY = p.height * 0.5
        
        // Integration field visualization
        for (let r = fieldRadius; r > 0; r -= 20) {
          const alpha = (1 - r / fieldRadius) * state.integrationLevel * 0.1
          p.fill(colors.harmony[0], colors.harmony[1], colors.harmony[2], alpha * 255)
          p.noStroke()
          p.ellipse(centerX, centerY, r)
        }
      }
      
      // Render particle trails with consciousness
      particles.forEach(particle => {
        const trailLength = Math.floor(particle.consciousnessLevel * 8)
        const trail = particle.integrationHistory.slice(-trailLength)
        
        for (let i = 0; i < trail.length - 1; i++) {
          const alpha = (i / trail.length) * particle.alpha * 0.4
          const size = particle.size * (i / trail.length) * 0.6
          
          p.fill(particle.color[0], particle.color[1], particle.color[2], alpha * 255)
          p.noStroke()
          p.ellipse(particle.x, particle.y, size)
        }
      })
      
      // Render holistic particles
      particles.forEach(particle => {
        // Consciousness-based pulsation
        const consciousnessPulse = 1 + 0.2 * Math.sin(timeRef.current * 0.001 * particle.consciousnessLevel + particle.brandExpression * Math.PI * 2)
        const size = particle.size * consciousnessPulse * (1 + particle.evolutionStage === 'transcending' ? 0.5 : 0)
        const alpha = particle.alpha * particle.consciousnessLevel
        
        // Multi-layered particle rendering based on evolution stage
        const layerCount = particle.evolutionStage === 'transcending' ? 4 : 
                          particle.evolutionStage === 'collaborating' ? 3 : 2
        
        for (let layer = 0; layer < layerCount; layer++) {
          const layerSize = size + layer * 3
          const layerAlpha = alpha / (layer + 1) * 0.6
          
          p.fill(particle.color[0], particle.color[1], particle.color[2], layerAlpha * 255)
          p.noStroke()
          p.ellipse(particle.x, particle.y, layerSize)
        }
        
        // Evolution stage indicator
        if (particle.evolutionStage === 'transcending') {
          p.stroke(255, 255, 255, alpha * 100)
          p.strokeWeight(1)
          p.noFill()
          p.ellipse(particle.x, particle.y, size * 2)
        }
      })
      
      // Render collaboration connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(other => {
          const distance = p.dist(particle.x, particle.y, other.x, other.y)
          const maxDistance = 120 * state.business.partnershipAffinity
          
          if (distance < maxDistance) {
            const collaborationStrength = particle.collaborationPotential * other.collaborationPotential
            const alpha = (1 - distance / maxDistance) * collaborationStrength * state.integrationLevel * 0.3
            
            // Color blend representing collaboration
            const blendR = (particle.color[0] + other.color[0]) / 2
            const blendG = (particle.color[1] + other.color[1]) / 2
            const blendB = (particle.color[2] + other.color[2]) / 2
            
            p.stroke(blendR, blendG, blendB, alpha * 255)
            p.strokeWeight(collaborationStrength * 2)
            p.line(particle.x, particle.y, other.x, other.y)
            
            // Collaboration energy pulse
            const midX = (particle.x + other.x) / 2
            const midY = (particle.y + other.y) / 2
            const pulseSize = 2 + Math.sin(timeRef.current * 0.01) * 1
            
            p.fill(255, 255, 255, alpha * 150)
            p.noStroke()
            p.ellipse(midX, midY, pulseSize)
          }
        })
      })
      
      // Render holistic attractors
      attractors.forEach(attractor => {
        const size = attractor.strength * attractor.integrationField * 10
        const alpha = attractor.collaborationIntensity * 0.8
        const colors = getHolisticColors()
        
        // Attractor core
        p.fill(colors.collaboration[0], colors.collaboration[1], colors.collaboration[2], alpha * 200)
        p.noStroke()
        p.ellipse(attractor.x, attractor.y, size)
        
        // Harmony field visualization
        for (let ring = 1; ring <= 3; ring++) {
          const ringSize = size + ring * 15
          const ringAlpha = alpha / ring * 0.4
          
          p.stroke(colors.primary[0], colors.primary[1], colors.primary[2], ringAlpha * 255)
          p.strokeWeight(1 + ring * 0.5)
          p.noFill()
          p.ellipse(attractor.x, attractor.y, ringSize)
        }
      })
      
      // Performance and integration monitoring
      updateHolisticPhysics(deltaTime)
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
    }

    // User interaction creates collaborative moments
    p.mousePressed = () => {
      // Create new attractor at mouse position
      const newAttractor: HolisticAttractor = {
        id: `user-attractor-${Date.now()}`,
        x: p.mouseX,
        y: p.mouseY,
        strength: 3,
        designAttraction: state.design.visualComplexity,
        motionAttraction: state.motion.responsiveness,
        businessAttraction: state.business.partnershipAffinity,
        userAttraction: 1 - state.user.cognitiveLoad,
        integrationField: state.integrationLevel,
        harmonyRadius: 200,
        collaborationIntensity: 1.0,
        maturityLevel: 0.5,
        influence: []
      }
      
      setAttractors(prev => [...prev.slice(-7), newAttractor]) // Keep max 8 attractors
      
      sendSystemEvent('user_interaction', {
        engagement: 0.5,
        collaboration: 0.2,
        creativity: 0.3
      }, 'click')
    }

  }, [particles, attractors, state, updateCanvasSystem, updateHolisticPhysics, getHolisticColors, sendSystemEvent])

  // Initialize P5.js with holistic integration
  useEffect(() => {
    if (!canvasRef.current || !isSystemReady) return

    const initP5 = async () => {
      const p5 = (await import('p5')).default
      p5InstanceRef.current = new p5(createHolisticSketch)
    }

    initP5()

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove()
        p5InstanceRef.current = null
      }
    }
  }, [createHolisticSketch, isSystemReady])

  // Initialize holistic system when ready
  useEffect(() => {
    if (isSystemReady) {
      initializeHolisticSystem()
    }
  }, [isSystemReady, initializeHolisticSystem])

  // Mouse interaction setup
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMovement)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMovement)
    }
  }, [handleMouseMovement])

  // Integration level monitoring
  useEffect(() => {
    setIntegrationLevel(state.integrationLevel)
    
    // Enable emergent behaviors based on integration level
    if (state.integrationLevel > 0.5 && !emergentBehaviors.includes('creative-collaboration')) {
      setEmergentBehaviors(prev => [...prev, 'creative-collaboration'])
      sendSystemEvent('business_insight', { capability: 'creative-collaboration' }, 'integration')
    }
    
    if (state.integrationLevel > 0.7 && !emergentBehaviors.includes('predictive-adaptation')) {
      setEmergentBehaviors(prev => [...prev, 'predictive-adaptation'])
      sendSystemEvent('design_change', { capability: 'predictive-adaptation' }, 'integration')
    }
    
    if (state.integrationLevel > 0.9 && !emergentBehaviors.includes('transcendent-harmony')) {
      setEmergentBehaviors(prev => [...prev, 'transcendent-harmony'])
      sendSystemEvent('motion_trigger', { capability: 'transcendent-harmony', intensity: 1.0 }, 'integration')
    }
  }, [state.integrationLevel, emergentBehaviors, sendSystemEvent])

  if (!isSystemReady) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        aria-hidden="true"
      />
    )
  }

  return (
    <div 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ backgroundColor: 'transparent' }}
      aria-hidden="true"
      role="presentation"
    />
  )
}