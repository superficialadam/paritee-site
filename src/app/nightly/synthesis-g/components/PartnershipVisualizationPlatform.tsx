'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useBusinessIntelligence } from '../intelligence/BusinessContextEngine'

// Partnership Network Visualization Interfaces
interface PartnershipNode {
  id: string
  name: string
  type: 'core_agency' | 'specialist' | 'client' | 'opportunity'
  position: { x: number; y: number; z: number }
  velocity: { x: number; y: number; z: number }
  connections: string[]
  expertise: string[]
  value: number
  influence: number
  collaborationHistory: number
  size: number
  color: [number, number, number]
  pulsation: number
  attractionRadius: number
}

interface CollaborationEdge {
  from: string
  to: string
  strength: number
  type: 'strategic' | 'operational' | 'creative' | 'technical'
  value: number
  frequency: number
  direction: 'bidirectional' | 'unidirectional'
  opacity: number
}

interface NetworkState {
  nodes: PartnershipNode[]
  edges: CollaborationEdge[]
  centerOfMass: { x: number; y: number; z: number }
  networkEnergy: number
  collaborationIndex: number
  opportunityScore: number
}

// Advanced 3D Partnership Network Visualization
export function PartnershipVisualizationPlatform() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const { intelligenceState, getCompetitivePositioning } = useBusinessIntelligence()
  
  const [networkState, setNetworkState] = useState<NetworkState>({
    nodes: [],
    edges: [],
    centerOfMass: { x: 0, y: 0, z: 0 },
    networkEnergy: 0,
    collaborationIndex: 0,
    opportunityScore: 0
  })
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [userInteraction, setUserInteraction] = useState({
    isHovering: false,
    selectedNode: null as PartnershipNode | null,
    interactionStrength: 0
  })

  // Revolutionary Network Effect Visualization
  const generatePartnershipNetwork = useCallback(() => {
    const { businessContext, competitiveIntel, personalization } = intelligenceState
    
    // Core Paritee Network Nodes
    const coreNodes: PartnershipNode[] = [
      {
        id: 'paritee-core',
        name: 'Paritee Network',
        type: 'core_agency',
        position: { x: 0, y: 0, z: 0 },
        velocity: { x: 0, y: 0, z: 0 },
        connections: ['strategy-partner', 'creative-partner', 'tech-partner', 'data-partner'],
        expertise: ['Network Orchestration', 'Strategic Partnership', 'Collaborative Excellence'],
        value: 100,
        influence: 95,
        collaborationHistory: 100,
        size: 25,
        color: [37, 99, 235], // Blue-600
        pulsation: 0.02,
        attractionRadius: 150
      },
      {
        id: 'strategy-partner',
        name: 'Strategic Advisory',
        type: 'specialist',
        position: { x: -80, y: -60, z: 20 },
        velocity: { x: 0.5, y: 0.3, z: 0 },
        connections: ['paritee-core', 'creative-partner', 'client-prospect'],
        expertise: ['Market Strategy', 'Competitive Intelligence', 'Business Transformation'],
        value: 85,
        influence: 75,
        collaborationHistory: 88,
        size: 18,
        color: [59, 130, 246], // Blue-500
        pulsation: 0.018,
        attractionRadius: 120
      },
      {
        id: 'creative-partner',
        name: 'Creative Excellence',
        type: 'specialist',
        position: { x: 70, y: -50, z: -30 },
        velocity: { x: -0.4, y: 0.6, z: 0.2 },
        connections: ['paritee-core', 'strategy-partner', 'tech-partner'],
        expertise: ['Brand Innovation', 'Creative Strategy', 'Campaign Excellence'],
        value: 90,
        influence: 80,
        collaborationHistory: 92,
        size: 20,
        color: [96, 165, 250], // Blue-400
        pulsation: 0.025,
        attractionRadius: 130
      },
      {
        id: 'tech-partner',
        name: 'Technology Innovation',
        type: 'specialist',
        position: { x: 60, y: 80, z: 40 },
        velocity: { x: -0.3, y: -0.5, z: -0.1 },
        connections: ['paritee-core', 'creative-partner', 'data-partner'],
        expertise: ['MarTech Implementation', 'Digital Platforms', 'Innovation Labs'],
        value: 88,
        influence: 85,
        collaborationHistory: 85,
        size: 19,
        color: [147, 197, 253], // Blue-300
        pulsation: 0.022,
        attractionRadius: 125
      },
      {
        id: 'data-partner',
        name: 'Analytics & Intelligence',
        type: 'specialist',
        position: { x: -90, y: 70, z: -25 },
        velocity: { x: 0.6, y: -0.4, z: 0.3 },
        connections: ['paritee-core', 'strategy-partner', 'tech-partner'],
        expertise: ['Data Science', 'Predictive Analytics', 'Performance Intelligence'],
        value: 82,
        influence: 70,
        collaborationHistory: 80,
        size: 17,
        color: [191, 219, 254], // Blue-200
        pulsation: 0.02,
        attractionRadius: 115
      }
    ]

    // Client/Prospect Node (represents the visitor)
    const clientNode: PartnershipNode = {
      id: 'client-prospect',
      name: `${businessContext.industry} Client`,
      type: 'client',
      position: { x: -120, y: -120, z: 60 },
      velocity: { x: 0.2, y: 0.2, z: -0.1 },
      connections: ['strategy-partner'],
      expertise: [businessContext.industry, businessContext.businessModel],
      value: competitiveIntel.partnershipPotential,
      influence: businessContext.decisionMakerLevel === 'cxo' ? 90 : businessContext.decisionMakerLevel === 'vp' ? 75 : 60,
      collaborationHistory: 0,
      size: Math.max(12, competitiveIntel.partnershipPotential * 0.2),
      color: competitiveIntel.partnershipPotential > 70 ? [34, 197, 94] : competitiveIntel.partnershipPotential > 40 ? [251, 191, 36] : [239, 68, 68],
      pulsation: 0.03,
      attractionRadius: 100
    }

    // Opportunity Nodes (potential network expansions)
    const opportunityNodes: PartnershipNode[] = competitiveIntel.marketOpportunities.slice(0, 3).map((opportunity, index) => ({
      id: `opportunity-${index}`,
      name: opportunity,
      type: 'opportunity',
      position: {
        x: Math.sin(index * 2.1) * 150,
        y: Math.cos(index * 2.1) * 150,
        z: Math.sin(index * 1.7) * 50
      },
      velocity: {
        x: Math.random() * 0.4 - 0.2,
        y: Math.random() * 0.4 - 0.2,
        z: Math.random() * 0.2 - 0.1
      },
      connections: ['paritee-core'],
      expertise: [opportunity],
      value: 60 + index * 10,
      influence: 50 + index * 5,
      collaborationHistory: 0,
      size: 10 + index * 2,
      color: [168, 85, 247], // Purple-500 for opportunities
      pulsation: 0.04 + index * 0.01,
      attractionRadius: 80
    }))

    const allNodes = [...coreNodes, clientNode, ...opportunityNodes]

    // Generate collaboration edges
    const edges: CollaborationEdge[] = []
    
    // Core network connections
    coreNodes.forEach(node => {
      node.connections.forEach(connectionId => {
        const targetNode = allNodes.find(n => n.id === connectionId)
        if (targetNode && !edges.find(e => 
          (e.from === node.id && e.to === connectionId) || 
          (e.to === node.id && e.from === connectionId)
        )) {
          edges.push({
            from: node.id,
            to: connectionId,
            strength: (node.collaborationHistory + targetNode.collaborationHistory) / 2,
            type: node.id.includes('strategy') ? 'strategic' : 
                  node.id.includes('creative') ? 'creative' :
                  node.id.includes('tech') ? 'technical' : 'operational',
            value: (node.value + targetNode.value) / 2,
            frequency: Math.random() * 0.8 + 0.2,
            direction: 'bidirectional',
            opacity: 0.6
          })
        }
      })
    })

    // Client connection potential
    if (competitiveIntel.partnershipPotential > 40) {
      edges.push({
        from: 'client-prospect',
        to: 'strategy-partner',
        strength: competitiveIntel.partnershipPotential,
        type: 'strategic',
        value: competitiveIntel.partnershipPotential,
        frequency: 0.8,
        direction: 'bidirectional',
        opacity: competitiveIntel.partnershipPotential > 70 ? 0.8 : 0.5
      })
    }

    // Opportunity connections
    opportunityNodes.forEach((node, index) => {
      if (Math.random() > 0.3) { // Some opportunities connect
        edges.push({
          from: node.id,
          to: 'paritee-core',
          strength: 40 + index * 10,
          type: 'strategic',
          value: node.value,
          frequency: 0.4,
          direction: 'unidirectional',
          opacity: 0.3
        })
      }
    })

    return {
      nodes: allNodes,
      edges,
      centerOfMass: { x: 0, y: 0, z: 0 },
      networkEnergy: calculateNetworkEnergy(allNodes, edges),
      collaborationIndex: calculateCollaborationIndex(edges),
      opportunityScore: competitiveIntel.partnershipPotential
    }
  }, [intelligenceState])

  // Physics simulation for organic network behavior
  const updateNetworkPhysics = useCallback((state: NetworkState, deltaTime: number) => {
    const { nodes, edges } = state
    const updatedNodes = nodes.map(node => {
      const newNode = { ...node }
      
      // Gravitational attraction to center
      const centerForce = {
        x: -newNode.position.x * 0.001,
        y: -newNode.position.y * 0.001,
        z: -newNode.position.z * 0.001
      }
      
      // Inter-node forces
      const nodeForces = { x: 0, y: 0, z: 0 }
      
      nodes.forEach(otherNode => {
        if (otherNode.id === newNode.id) return
        
        const dx = otherNode.position.x - newNode.position.x
        const dy = otherNode.position.y - newNode.position.y
        const dz = otherNode.position.z - newNode.position.z
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
        
        if (distance > 0) {
          const connected = edges.some(e => 
            (e.from === newNode.id && e.to === otherNode.id) ||
            (e.to === newNode.id && e.from === otherNode.id)
          )
          
          if (connected && distance > 80) {
            // Attraction for connected nodes that are too far
            const force = 0.0001 * (distance - 80)
            nodeForces.x += (dx / distance) * force
            nodeForces.y += (dy / distance) * force
            nodeForces.z += (dz / distance) * force
          } else if (!connected && distance < 60) {
            // Repulsion for unconnected nodes that are too close
            const force = 0.0002 * (60 - distance)
            nodeForces.x -= (dx / distance) * force
            nodeForces.y -= (dy / distance) * force
            nodeForces.z -= (dz / distance) * force
          }
        }
      })
      
      // Mouse interaction force
      if (userInteraction.isHovering) {
        const mouseForce = calculateMouseInteractionForce(newNode, mousePosition, userInteraction.interactionStrength)
        nodeForces.x += mouseForce.x
        nodeForces.y += mouseForce.y
      }
      
      // Update velocity
      newNode.velocity.x += (centerForce.x + nodeForces.x) * deltaTime
      newNode.velocity.y += (centerForce.y + nodeForces.y) * deltaTime
      newNode.velocity.z += (centerForce.z + nodeForces.z) * deltaTime
      
      // Apply damping
      newNode.velocity.x *= 0.98
      newNode.velocity.y *= 0.98
      newNode.velocity.z *= 0.98
      
      // Update position
      newNode.position.x += newNode.velocity.x * deltaTime
      newNode.position.y += newNode.velocity.y * deltaTime
      newNode.position.z += newNode.velocity.z * deltaTime
      
      // Update pulsation
      newNode.pulsation += 0.01
      
      return newNode
    })
    
    return {
      ...state,
      nodes: updatedNodes,
      networkEnergy: calculateNetworkEnergy(updatedNodes, edges),
      centerOfMass: calculateCenterOfMass(updatedNodes)
    }
  }, [mousePosition, userInteraction])

  // Render the 3D partnership network
  const renderNetwork = useCallback((state: NetworkState, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    const { width, height } = canvas
    const centerX = width / 2
    const centerY = height / 2
    
    // Clear canvas
    context.clearRect(0, 0, width, height)
    
    // Create gradient background
    const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) / 2)
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.9)') // slate-900
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
    context.fillStyle = gradient
    context.fillRect(0, 0, width, height)
    
    // Transform 3D positions to 2D screen coordinates
    const transform3DTo2D = (pos: { x: number; y: number; z: number }) => ({
      x: centerX + pos.x + pos.z * 0.3, // Pseudo-3D projection
      y: centerY + pos.y + pos.z * 0.2,
      scale: 1 + pos.z * 0.001 // Size scaling for depth
    })
    
    // Render collaboration edges
    state.edges.forEach(edge => {
      const fromNode = state.nodes.find(n => n.id === edge.from)
      const toNode = state.nodes.find(n => n.id === edge.to)
      
      if (fromNode && toNode) {
        const from2D = transform3DTo2D(fromNode.position)
        const to2D = transform3DTo2D(toNode.position)
        
        // Dynamic edge rendering based on collaboration strength
        const gradient = context.createLinearGradient(from2D.x, from2D.y, to2D.x, to2D.y)
        const color1 = `rgba(${fromNode.color.join(', ')}, ${edge.opacity})`
        const color2 = `rgba(${toNode.color.join(', ')}, ${edge.opacity})`
        gradient.addColorStop(0, color1)
        gradient.addColorStop(1, color2)
        
        context.strokeStyle = gradient
        context.lineWidth = Math.max(1, edge.strength / 20)
        context.setLineDash(edge.type === 'strategic' ? [] : [5, 5])
        
        // Animate collaboration flow
        const flowOffset = Date.now() * 0.001 * edge.frequency
        const flowOpacity = 0.5 + 0.3 * Math.sin(flowOffset)
        context.globalAlpha = flowOpacity
        
        context.beginPath()
        context.moveTo(from2D.x, from2D.y)
        
        // Curved connection for more organic feel
        const midX = (from2D.x + to2D.x) / 2 + Math.sin(flowOffset) * 20
        const midY = (from2D.y + to2D.y) / 2 + Math.cos(flowOffset) * 15
        context.quadraticCurveTo(midX, midY, to2D.x, to2D.y)
        context.stroke()
        
        context.setLineDash([])
        context.globalAlpha = 1
      }
    })
    
    // Render partnership nodes
    state.nodes.forEach(node => {
      const pos2D = transform3DTo2D(node.position)
      const pulsation = 1 + 0.2 * Math.sin(Date.now() * node.pulsation)
      const size = node.size * pos2D.scale * pulsation
      
      // Node glow effect
      const glowGradient = context.createRadialGradient(pos2D.x, pos2D.y, 0, pos2D.x, pos2D.y, size * 2)
      glowGradient.addColorStop(0, `rgba(${node.color.join(', ')}, 0.8)`)
      glowGradient.addColorStop(0.5, `rgba(${node.color.join(', ')}, 0.3)`)
      glowGradient.addColorStop(1, `rgba(${node.color.join(', ')}, 0)`)
      
      context.fillStyle = glowGradient
      context.beginPath()
      context.arc(pos2D.x, pos2D.y, size * 2, 0, Math.PI * 2)
      context.fill()
      
      // Main node
      const nodeGradient = context.createRadialGradient(pos2D.x, pos2D.y, 0, pos2D.x, pos2D.y, size)
      nodeGradient.addColorStop(0, `rgba(${node.color.join(', ')}, 1)`)
      nodeGradient.addColorStop(0.7, `rgba(${node.color.join(', ')}, 0.8)`)
      nodeGradient.addColorStop(1, `rgba(${node.color.join(', ')}, 0.4)`)
      
      context.fillStyle = nodeGradient
      context.beginPath()
      context.arc(pos2D.x, pos2D.y, size, 0, Math.PI * 2)
      context.fill()
      
      // Node border
      context.strokeStyle = `rgba(255, 255, 255, 0.3)`
      context.lineWidth = 1
      context.stroke()
      
      // Special effects for important nodes
      if (node.type === 'core_agency') {
        // Core network indicator
        context.strokeStyle = `rgba(${node.color.join(', ')}, 0.6)`
        context.lineWidth = 2
        context.beginPath()
        context.arc(pos2D.x, pos2D.y, size * 1.5, 0, Math.PI * 2)
        context.stroke()
      }
      
      if (node.type === 'client' && node.value > 70) {
        // High-value client indicator
        context.strokeStyle = `rgba(34, 197, 94, 0.8)` // green-500
        context.lineWidth = 3
        context.setLineDash([3, 3])
        context.beginPath()
        context.arc(pos2D.x, pos2D.y, size * 1.8, 0, Math.PI * 2)
        context.stroke()
        context.setLineDash([])
      }
      
      // Node label for major nodes
      if (size > 15) {
        context.fillStyle = 'rgba(255, 255, 255, 0.9)'
        context.font = `${Math.max(10, size * 0.4)}px Inter, system-ui, sans-serif`
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        
        // Text background
        const textMetrics = context.measureText(node.name)
        const textWidth = textMetrics.width
        const textHeight = parseInt(context.font)
        
        context.fillStyle = 'rgba(15, 23, 42, 0.8)'
        context.fillRect(
          pos2D.x - textWidth / 2 - 4,
          pos2D.y + size + 5,
          textWidth + 8,
          textHeight + 4
        )
        
        context.fillStyle = 'rgba(255, 255, 255, 0.9)'
        context.fillText(node.name, pos2D.x, pos2D.y + size + textHeight / 2 + 7)
      }
    })
    
    // Network statistics overlay
    renderNetworkStats(context, state, { width, height })
    
  }, [])

  // Network statistics visualization
  const renderNetworkStats = (context: CanvasRenderingContext2D, state: NetworkState, canvas: { width: number; height: number }) => {
    const { intelligenceState } = useBusinessIntelligence()
    const stats = [
      { label: 'Network Energy', value: Math.round(state.networkEnergy), color: 'rgba(37, 99, 235, 1)' },
      { label: 'Collaboration Index', value: Math.round(state.collaborationIndex), color: 'rgba(59, 130, 246, 1)' },
      { label: 'Partnership Potential', value: Math.round(state.opportunityScore), color: state.opportunityScore > 70 ? 'rgba(34, 197, 94, 1)' : 'rgba(251, 191, 36, 1)' },
      { label: 'Expected ROI', value: `${intelligenceState.competitiveIntel.expectedROI.min}-${intelligenceState.competitiveIntel.expectedROI.max}%`, color: 'rgba(168, 85, 247, 1)' }
    ]
    
    // Background panel
    context.fillStyle = 'rgba(15, 23, 42, 0.9)'
    context.fillRect(20, canvas.height - 140, 280, 120)
    context.strokeStyle = 'rgba(59, 130, 246, 0.3)'
    context.strokeRect(20, canvas.height - 140, 280, 120)
    
    // Stats rendering
    stats.forEach((stat, index) => {
      const y = canvas.height - 120 + index * 25
      
      context.fillStyle = 'rgba(255, 255, 255, 0.8)'
      context.font = '12px Inter, system-ui, sans-serif'
      context.textAlign = 'left'
      context.fillText(`${stat.label}:`, 30, y)
      
      context.fillStyle = stat.color
      context.font = 'bold 12px Inter, system-ui, sans-serif'
      context.textAlign = 'right'
      context.fillText(typeof stat.value === 'string' ? stat.value : stat.value.toString(), 290, y)
    })
  }

  // Helper functions
  const calculateNetworkEnergy = (nodes: PartnershipNode[], edges: CollaborationEdge[]): number => {
    const kineticEnergy = nodes.reduce((sum, node) => {
      const velocity = Math.sqrt(node.velocity.x ** 2 + node.velocity.y ** 2 + node.velocity.z ** 2)
      return sum + (node.value * velocity ** 2) / 2
    }, 0)
    
    const collaborativeEnergy = edges.reduce((sum, edge) => sum + edge.strength * edge.frequency, 0)
    
    return kineticEnergy + collaborativeEnergy
  }

  const calculateCollaborationIndex = (edges: CollaborationEdge[]): number => {
    const totalStrength = edges.reduce((sum, edge) => sum + edge.strength, 0)
    const activeConnections = edges.filter(edge => edge.strength > 50).length
    return totalStrength / Math.max(edges.length, 1) * Math.min(activeConnections / 5, 1) * 100
  }

  const calculateCenterOfMass = (nodes: PartnershipNode[]) => {
    const totalMass = nodes.reduce((sum, node) => sum + node.value, 0)
    const center = nodes.reduce(
      (acc, node) => ({
        x: acc.x + (node.position.x * node.value) / totalMass,
        y: acc.y + (node.position.y * node.value) / totalMass,
        z: acc.z + (node.position.z * node.value) / totalMass
      }),
      { x: 0, y: 0, z: 0 }
    )
    return center
  }

  const calculateMouseInteractionForce = (node: PartnershipNode, mouse: { x: number; y: number }, strength: number) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    
    const rect = canvas.getBoundingClientRect()
    const mouseX = mouse.x - rect.left - canvas.width / 2
    const mouseY = mouse.y - rect.top - canvas.height / 2
    
    const dx = mouseX - node.position.x
    const dy = mouseY - node.position.y
    const distance = Math.sqrt(dx ** 2 + dy ** 2)
    
    if (distance < node.attractionRadius && distance > 0) {
      const force = strength * 0.00001 * (node.attractionRadius - distance)
      return {
        x: (dx / distance) * force,
        y: (dy / distance) * force
      }
    }
    
    return { x: 0, y: 0 }
  }

  // Initialize network
  useEffect(() => {
    const initialNetwork = generatePartnershipNetwork()
    setNetworkState(initialNetwork)
  }, [generatePartnershipNetwork])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    
    if (!canvas || !context) return
    
    let lastTime = Date.now()
    
    const animate = () => {
      const currentTime = Date.now()
      const deltaTime = Math.min(currentTime - lastTime, 50) // Cap at 50ms
      lastTime = currentTime
      
      setNetworkState(prevState => updateNetworkPhysics(prevState, deltaTime))
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [updateNetworkPhysics])

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    
    if (!canvas || !context) return
    
    renderNetwork(networkState, canvas, context)
  }, [networkState, renderNetwork])

  // Mouse interaction handling
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleMouseEnter = () => {
      setUserInteraction(prev => ({ ...prev, isHovering: true, interactionStrength: 1 }))
    }
    
    const handleMouseLeave = () => {
      setUserInteraction(prev => ({ ...prev, isHovering: false, interactionStrength: 0, selectedNode: null }))
    }
    
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseenter', handleMouseEnter)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseenter', handleMouseEnter)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Resize handling
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return (
    <div className="relative w-full h-full min-h-[600px] overflow-hidden rounded-none border border-slate-700/30 bg-slate-950">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        style={{ background: 'transparent' }}
      />
      
      {/* Interactive Overlay Information */}
      <div className="absolute top-6 right-6 bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-none p-4 max-w-sm">
        <h3 className="text-sm font-semibold text-blue-400 mb-2">Partnership Network Intelligence</h3>
        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex justify-between">
            <span>Network Energy:</span>
            <span className="text-blue-400 font-medium">{Math.round(networkState.networkEnergy)}</span>
          </div>
          <div className="flex justify-between">
            <span>Collaboration Index:</span>
            <span className="text-blue-400 font-medium">{Math.round(networkState.collaborationIndex)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Partnership Potential:</span>
            <span className={`font-medium ${networkState.opportunityScore > 70 ? 'text-green-400' : networkState.opportunityScore > 40 ? 'text-yellow-400' : 'text-red-400'}`}>
              {Math.round(networkState.opportunityScore)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span>Active Nodes:</span>
            <span className="text-blue-400 font-medium">{networkState.nodes.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Collaborations:</span>
            <span className="text-blue-400 font-medium">{networkState.edges.length}</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
          Interactive visualization of Paritee's partnership network. Each node represents an agency or capability, with connections showing collaborative relationships and value flow.
        </p>
      </div>

      {/* Competitive Advantages Overlay */}
      <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-none p-4 max-w-md">
        <h3 className="text-sm font-semibold text-green-400 mb-2">Network Advantages</h3>
        <div className="space-y-1 text-xs text-slate-300">
          {getCompetitivePositioning().slice(0, 3).map((advantage, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>{advantage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-6 left-6 bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-none p-3">
        <h4 className="text-xs font-semibold text-slate-200 mb-2">Network Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-slate-300">Core Network</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-slate-300">Client/Prospect</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-slate-300">Opportunities</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-0.5 bg-blue-400"></div>
            <span className="text-slate-300">Collaboration</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnershipVisualizationPlatform