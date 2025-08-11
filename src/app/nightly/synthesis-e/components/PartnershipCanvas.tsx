'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface PartnershipNode {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: [number, number, number]
  connections: string[]
  strength: number
  pulsation: number
  agency?: string
  role?: string
  influence: number
}

interface CollaborationMoment {
  nodeIds: string[]
  intensity: number
  timestamp: number
  type: 'sync' | 'merge' | 'create' | 'amplify'
  position: { x: number; y: number }
}

interface UserEngagement {
  readingPace: number
  scrollVelocity: number
  dwellTime: number
  sectionInterest: Record<string, number>
  collaborationAffinity: number
}

export default function PartnershipCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0, isActive: false })
  const p5InstanceRef = useRef<any>(null)
  
  // Revolutionary collaboration state
  const [nodes, setNodes] = useState<PartnershipNode[]>([])
  const [collaborationMoments, setCollaborationMoments] = useState<CollaborationMoment[]>([])
  const [userEngagement, setUserEngagement] = useState<UserEngagement>({
    readingPace: 1.0,
    scrollVelocity: 0,
    dwellTime: 0,
    sectionInterest: {},
    collaborationAffinity: 0.5
  })
  
  const [isVisible, setIsVisible] = useState(true)
  const [canvasMode, setCanvasMode] = useState<'partnership' | 'collaboration' | 'synthesis'>('partnership')
  const timeRef = useRef(0)
  
  // Brand colors representing different agencies/equals
  const PARTNERSHIP_COLORS = {
    primary: [37, 99, 235] as [number, number, number],      // Blue-600
    secondary: [59, 130, 246] as [number, number, number],   // Blue-500  
    tertiary: [96, 165, 250] as [number, number, number],    // Blue-400
    quaternary: [147, 197, 253] as [number, number, number], // Blue-300
    synthesis: [255, 255, 255] as [number, number, number],  // White - when all come together
    background: [15, 23, 42] as [number, number, number]     // Slate-900
  }

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsVisible(!mediaQuery.matches)
    
    const handleChange = () => setIsVisible(!mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // User engagement tracking - INNOVATION: Reading pace affects collaboration intensity
  useEffect(() => {
    let lastScroll = window.pageYOffset
    let dwellStart = Date.now()
    let isReading = false
    
    const handleScroll = () => {
      const currentScroll = window.pageYOffset
      const velocity = Math.abs(currentScroll - lastScroll)
      
      // Reading pace detection
      const readingPace = velocity < 2 ? 0.5 : velocity < 10 ? 1.0 : 2.0
      
      // Collaboration affinity based on user behavior
      const collaborationAffinity = velocity < 5 ? 
        Math.min(userEngagement.collaborationAffinity + 0.01, 1.0) : 
        Math.max(userEngagement.collaborationAffinity - 0.01, 0.1)
      
      setUserEngagement(prev => ({
        ...prev,
        readingPace,
        scrollVelocity: velocity,
        collaborationAffinity
      }))
      
      lastScroll = currentScroll
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [userEngagement.collaborationAffinity])

  // Initialize partnership nodes representing "equals"
  const initializePartnershipNodes = useCallback(() => {
    const nodeCount = 8 // Representing key agencies/equals
    const newNodes: PartnershipNode[] = []
    const colors = [
      PARTNERSHIP_COLORS.primary,
      PARTNERSHIP_COLORS.secondary,
      PARTNERSHIP_COLORS.tertiary,
      PARTNERSHIP_COLORS.quaternary
    ]
    
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      const radius = 150 + Math.random() * 100
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      
      newNodes.push({
        id: `partner-${i}`,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 20 + Math.random() * 15,
        color: colors[i % colors.length],
        connections: [],
        strength: 0.5 + Math.random() * 0.5,
        pulsation: 0.01 + Math.random() * 0.02,
        agency: `Agency ${String.fromCharCode(65 + i)}`,
        role: ['Strategy', 'Creative', 'Technology', 'Data', 'Media', 'Experience', 'Content', 'Innovation'][i],
        influence: Math.random()
      })
    }
    
    // Create initial connections representing partnerships
    newNodes.forEach((node, i) => {
      const connectionCount = 2 + Math.floor(Math.random() * 3)
      for (let j = 0; j < connectionCount; j++) {
        const targetIndex = (i + 1 + j) % newNodes.length
        if (!node.connections.includes(newNodes[targetIndex].id)) {
          node.connections.push(newNodes[targetIndex].id)
        }
      }
    })
    
    setNodes(newNodes)
  }, [])

  // P5.js sketch for revolutionary partnership visualization
  const sketch = useCallback((p: any) => {
    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
      canvas.parent(canvasRef.current)
      p.colorMode(p.RGB)
      p.background(PARTNERSHIP_COLORS.background[0], PARTNERSHIP_COLORS.background[1], PARTNERSHIP_COLORS.background[2])
    }

    p.draw = () => {
      if (!isVisible) return
      
      timeRef.current++
      
      // Adaptive background based on collaboration intensity
      const bgAlpha = 5 + userEngagement.collaborationAffinity * 10
      p.background(PARTNERSHIP_COLORS.background[0], PARTNERSHIP_COLORS.background[1], PARTNERSHIP_COLORS.background[2], bgAlpha)
      
      // Update mouse tracking
      if (p.mouseX !== mouseRef.current.x || p.mouseY !== mouseRef.current.y) {
        mouseRef.current.x = p.lerp(mouseRef.current.x, p.mouseX, 0.1)
        mouseRef.current.y = p.lerp(mouseRef.current.y, p.mouseY, 0.1)
        mouseRef.current.isActive = true
      }
      
      // INNOVATION 1: Partnership physics - nodes naturally form collaborative clusters
      updatePartnershipPhysics(p)
      
      // INNOVATION 2: Collaboration moments - spontaneous visual events representing breakthroughs
      generateCollaborationMoments(p)
      
      // INNOVATION 3: Render collaborative connections with meaning
      renderCollaborativeConnections(p)
      
      // INNOVATION 4: Partnership nodes that show "equals coming together"
      renderPartnershipNodes(p)
      
      // INNOVATION 5: Render collaboration moments as visual breakthroughs
      renderCollaborationMoments(p)
      
      // INNOVATION 6: Synthesis field showing unified potential
      renderSynthesisField(p)
      
      // User interaction creates new partnership opportunities
      handleUserCollaboration(p)
    }

    // Revolutionary physics: nodes are attracted to each other but maintain equality
    const updatePartnershipPhysics = (p: any) => {
      nodes.forEach((node, i) => {
        // Equal attraction - no hierarchy, all nodes attract each other equally
        nodes.forEach((other, j) => {
          if (i === j) return
          
          const dx = other.x - node.x
          const dy = other.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance > 0 && distance < 300) {
            // Equal force - representing parity in partnerships
            const force = (300 - distance) / 300 * 0.001 * userEngagement.collaborationAffinity
            const angle = Math.atan2(dy, dx)
            
            node.vx += Math.cos(angle) * force
            node.vy += Math.sin(angle) * force
          }
        })
        
        // Mouse influence creates collaboration opportunities
        if (mouseRef.current.isActive) {
          const dx = mouseRef.current.x - node.x
          const dy = mouseRef.current.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            const force = (150 - distance) / 150 * 0.002
            const angle = Math.atan2(dy, dx)
            
            node.vx += Math.cos(angle) * force * userEngagement.readingPace
            node.vy += Math.sin(angle) * force * userEngagement.readingPace
          }
        }
        
        // Apply velocity with natural damping
        node.x += node.vx
        node.y += node.vy
        node.vx *= 0.95
        node.vy *= 0.95
        
        // Boundary reflection (not wrapping - partnerships stay connected)
        const margin = node.radius
        if (node.x < margin) { node.x = margin; node.vx *= -0.8 }
        if (node.x > p.width - margin) { node.x = p.width - margin; node.vx *= -0.8 }
        if (node.y < margin) { node.y = margin; node.vy *= -0.8 }
        if (node.y > p.height - margin) { node.y = p.height - margin; node.vy *= -0.8 }
      })
    }

    // Generate spontaneous collaboration moments based on user engagement
    const generateCollaborationMoments = (p: any) => {
      if (Math.random() < userEngagement.collaborationAffinity * 0.02) {
        // Find close nodes that aren't already collaborating
        const closeNodes = []
        for (let i = 0; i < nodes.length - 1; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const distance = p.dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
            if (distance < 80) {
              closeNodes.push([i, j, distance])
            }
          }
        }
        
        if (closeNodes.length > 0) {
          const collaboration = closeNodes[Math.floor(Math.random() * closeNodes.length)]
          const [i, j] = collaboration
          
          const newMoment: CollaborationMoment = {
            nodeIds: [nodes[i].id, nodes[j].id],
            intensity: userEngagement.collaborationAffinity,
            timestamp: timeRef.current,
            type: ['sync', 'merge', 'create', 'amplify'][Math.floor(Math.random() * 4)] as any,
            position: {
              x: (nodes[i].x + nodes[j].x) / 2,
              y: (nodes[i].y + nodes[j].y) / 2
            }
          }
          
          setCollaborationMoments(prev => [...prev.slice(-10), newMoment])
        }
      }
    }

    // Render connections showing collaborative relationships
    const renderCollaborativeConnections = (p: any) => {
      nodes.forEach(node => {
        node.connections.forEach(connectionId => {
          const targetNode = nodes.find(n => n.id === connectionId)
          if (!targetNode) return
          
          const distance = p.dist(node.x, node.y, targetNode.x, targetNode.y)
          const strength = Math.max(0, 1 - distance / 200)
          
          // Connection strength varies with collaboration affinity
          const alpha = strength * userEngagement.collaborationAffinity * 0.6
          
          // Color blend representing equal partnership
          const blendR = (node.color[0] + targetNode.color[0]) / 2
          const blendG = (node.color[1] + targetNode.color[1]) / 2
          const blendB = (node.color[2] + targetNode.color[2]) / 2
          
          p.stroke(blendR, blendG, blendB, alpha * 255)
          p.strokeWeight(2 + strength * 3)
          p.line(node.x, node.y, targetNode.x, targetNode.y)
          
          // Pulsating energy along connections
          const midX = (node.x + targetNode.x) / 2
          const midY = (node.y + targetNode.y) / 2
          const pulseSize = 2 + Math.sin(timeRef.current * 0.05) * 1
          
          p.fill(PARTNERSHIP_COLORS.synthesis[0], PARTNERSHIP_COLORS.synthesis[1], PARTNERSHIP_COLORS.synthesis[2], alpha * 100)
          p.noStroke()
          p.ellipse(midX, midY, pulseSize)
        })
      })
    }

    // Render partnership nodes showing individual agency strength and collective power
    const renderPartnershipNodes = (p: any) => {
      nodes.forEach(node => {
        p.push()
        p.translate(node.x, node.y)
        
        // Pulsation representing vitality and engagement
        const pulsation = 1 + Math.sin(timeRef.current * node.pulsation) * 0.2
        const currentRadius = node.radius * pulsation
        
        // Outer glow representing influence sphere
        for (let r = currentRadius * 2; r > 0; r -= 5) {
          const alpha = (1 - r / (currentRadius * 2)) * 0.1 * userEngagement.collaborationAffinity
          p.fill(node.color[0], node.color[1], node.color[2], alpha * 255)
          p.noStroke()
          p.ellipse(0, 0, r)
        }
        
        // Core node representing the agency/equal
        p.fill(node.color[0], node.color[1], node.color[2], 200)
        p.noStroke()
        p.ellipse(0, 0, currentRadius)
        
        // Inner light representing collaborative potential
        const innerAlpha = userEngagement.collaborationAffinity * 150
        p.fill(PARTNERSHIP_COLORS.synthesis[0], PARTNERSHIP_COLORS.synthesis[1], PARTNERSHIP_COLORS.synthesis[2], innerAlpha)
        p.ellipse(0, 0, currentRadius * 0.6)
        
        // Agency identifier (rendered when close to mouse)
        const mouseDistance = p.dist(node.x, node.y, mouseRef.current.x, mouseRef.current.y)
        if (mouseDistance < 60) {
          p.fill(255, 255, 255, 200)
          p.textAlign(p.CENTER, p.CENTER)
          p.textSize(10)
          p.text(node.role, 0, -currentRadius - 15)
        }
        
        p.pop()
      })
    }

    // Render collaboration moments as visual breakthrough events
    const renderCollaborationMoments = (p: any) => {
      collaborationMoments.forEach(moment => {
        const age = timeRef.current - moment.timestamp
        const lifespan = 120 // frames
        
        if (age > lifespan) return
        
        const progress = age / lifespan
        const alpha = Math.sin((1 - progress) * Math.PI) * moment.intensity
        
        p.push()
        p.translate(moment.position.x, moment.position.y)
        
        // Different visual effects based on collaboration type
        switch (moment.type) {
          case 'sync':
            // Synchronized ripples
            for (let i = 0; i < 3; i++) {
              const rippleRadius = progress * 100 + i * 20
              p.stroke(PARTNERSHIP_COLORS.synthesis[0], PARTNERSHIP_COLORS.synthesis[1], PARTNERSHIP_COLORS.synthesis[2], alpha * 100)
              p.strokeWeight(2 - i * 0.5)
              p.noFill()
              p.ellipse(0, 0, rippleRadius)
            }
            break
            
          case 'merge':
            // Merging particles effect
            const particleCount = 6
            for (let i = 0; i < particleCount; i++) {
              const angle = (i / particleCount) * Math.PI * 2
              const distance = (1 - progress) * 40
              const x = Math.cos(angle) * distance
              const y = Math.sin(angle) * distance
              
              p.fill(PARTNERSHIP_COLORS.tertiary[0], PARTNERSHIP_COLORS.tertiary[1], PARTNERSHIP_COLORS.tertiary[2], alpha * 200)
              p.noStroke()
              p.ellipse(x, y, 4)
            }
            break
            
          case 'create':
            // Burst of creative energy
            const rayCount = 8
            for (let i = 0; i < rayCount; i++) {
              const angle = (i / rayCount) * Math.PI * 2
              const length = progress * 60
              const x = Math.cos(angle) * length
              const y = Math.sin(angle) * length
              
              p.stroke(PARTNERSHIP_COLORS.primary[0], PARTNERSHIP_COLORS.primary[1], PARTNERSHIP_COLORS.primary[2], alpha * 150)
              p.strokeWeight(3)
              p.line(0, 0, x, y)
            }
            break
            
          case 'amplify':
            // Amplifying wave effect
            const waveRadius = progress * 80
            p.stroke(PARTNERSHIP_COLORS.secondary[0], PARTNERSHIP_COLORS.secondary[1], PARTNERSHIP_COLORS.secondary[2], alpha * 120)
            p.strokeWeight(4)
            p.noFill()
            p.ellipse(0, 0, waveRadius)
            
            // Inner pulse
            const pulseRadius = Math.sin(progress * Math.PI * 4) * 20
            p.fill(PARTNERSHIP_COLORS.synthesis[0], PARTNERSHIP_COLORS.synthesis[1], PARTNERSHIP_COLORS.synthesis[2], alpha * 180)
            p.noStroke()
            p.ellipse(0, 0, Math.abs(pulseRadius))
            break
        }
        
        p.pop()
      })
      
      // Clean up expired moments
      setCollaborationMoments(prev => 
        prev.filter(moment => timeRef.current - moment.timestamp <= 120)
      )
    }

    // Render synthesis field showing potential when all equals come together
    const renderSynthesisField = (p: any) => {
      if (userEngagement.collaborationAffinity > 0.7) {
        // High collaboration creates visible synthesis field
        const fieldStrength = (userEngagement.collaborationAffinity - 0.7) / 0.3
        
        // Background synthesis glow
        const centerX = p.width / 2
        const centerY = p.height / 2
        const fieldRadius = fieldStrength * 200
        
        for (let r = fieldRadius; r > 0; r -= 10) {
          const alpha = (1 - r / fieldRadius) * fieldStrength * 0.05
          p.fill(PARTNERSHIP_COLORS.synthesis[0], PARTNERSHIP_COLORS.synthesis[1], PARTNERSHIP_COLORS.synthesis[2], alpha * 255)
          p.noStroke()
          p.ellipse(centerX, centerY, r)
        }
        
        // Synthesis particles floating throughout
        for (let i = 0; i < fieldStrength * 20; i++) {
          const x = centerX + (Math.random() - 0.5) * fieldRadius * 2
          const y = centerY + (Math.random() - 0.5) * fieldRadius * 2
          const size = Math.random() * 3 + 1
          const alpha = fieldStrength * 0.6
          
          p.fill(PARTNERSHIP_COLORS.synthesis[0], PARTNERSHIP_COLORS.synthesis[1], PARTNERSHIP_COLORS.synthesis[2], alpha * 255)
          p.noStroke()
          p.ellipse(x, y, size)
        }
      }
    }

    // Handle user interactions to create new collaboration opportunities
    const handleUserCollaboration = (p: any) => {
      if (mouseRef.current.isActive) {
        // User presence creates collaboration potential
        const nearbyNodes = nodes.filter(node => 
          p.dist(node.x, node.y, mouseRef.current.x, mouseRef.current.y) < 100
        )
        
        if (nearbyNodes.length >= 2) {
          // Visualize collaboration potential
          nearbyNodes.forEach((node, i) => {
            nearbyNodes.slice(i + 1).forEach(otherNode => {
              p.stroke(PARTNERSHIP_COLORS.synthesis[0], PARTNERSHIP_COLORS.synthesis[1], PARTNERSHIP_COLORS.synthesis[2], 50)
              p.strokeWeight(1)
              p.line(node.x, node.y, otherNode.x, otherNode.y)
            })
          })
          
          // Increase collaboration affinity when user facilitates connections
          setUserEngagement(prev => ({
            ...prev,
            collaborationAffinity: Math.min(prev.collaborationAffinity + 0.001, 1.0)
          }))
        }
      }
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
    }

    // Create collaboration burst on click/tap
    p.mousePressed = () => {
      const nearbyNodes = nodes.filter(node => 
        p.dist(node.x, node.y, p.mouseX, p.mouseY) < 80
      )
      
      if (nearbyNodes.length >= 2) {
        // Force a collaboration moment
        const newMoment: CollaborationMoment = {
          nodeIds: nearbyNodes.slice(0, 2).map(n => n.id),
          intensity: 1.0,
          timestamp: timeRef.current,
          type: 'create',
          position: { x: p.mouseX, y: p.mouseY }
        }
        
        setCollaborationMoments(prev => [...prev, newMoment])
        
        // Boost collaboration affinity
        setUserEngagement(prev => ({
          ...prev,
          collaborationAffinity: Math.min(prev.collaborationAffinity + 0.1, 1.0)
        }))
      }
    }
  }, [isVisible, nodes, collaborationMoments, userEngagement])

  // Initialize P5.js
  useEffect(() => {
    if (!canvasRef.current || !isVisible) return

    initializePartnershipNodes()

    const initP5 = async () => {
      const p5 = (await import('p5')).default
      p5InstanceRef.current = new p5(sketch)
    }

    initP5()

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove()
        p5InstanceRef.current = null
      }
    }
  }, [sketch, isVisible, initializePartnershipNodes])

  if (!isVisible) {
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
      style={{ backgroundColor: '#0f172a' }}
      aria-hidden="true"
      role="presentation"
    />
  )
}