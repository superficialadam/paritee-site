'use client'

import { useEffect, useState, useCallback } from 'react'
import { useHolisticIntelligence, useSystemHarmony } from './hooks/useHolisticIntelligence'
import Link from 'next/link'

interface HolisticMetrics {
  totalParticles: number
  integrationLevel: number
  systemHarmony: number
  emergentCapabilities: number
  crossSystemEvents: number
  performanceScore: number
}

export default function SynthesisHPage() {
  const { 
    state, 
    updateUserBehavior, 
    updateBusinessIntelligence,
    triggerOptimization,
    isSystemReady 
  } = useHolisticIntelligence()
  
  const { harmony, integrationLevel, emergentCapabilities } = useSystemHarmony()
  
  const [metrics, setMetrics] = useState<HolisticMetrics>({
    totalParticles: 0,
    integrationLevel: 0,
    systemHarmony: 0,
    emergentCapabilities: 0,
    crossSystemEvents: 0,
    performanceScore: 0
  })
  
  const [userJourneyStage, setUserJourneyStage] = useState<'discovery' | 'exploration' | 'understanding' | 'collaboration'>('discovery')
  const [holisticInsights, setHolisticInsights] = useState<string[]>([])

  // Real-time metrics calculation
  const calculateHolisticMetrics = useCallback(() => {
    if (!isSystemReady) return

    const performanceScore = (state.performance.fps / 60) * 
                            (1 - state.performance.memoryUsage) * 
                            (60 / Math.max(state.performance.interactionDelay, 1))

    setMetrics({
      totalParticles: state.canvas.particleCount,
      integrationLevel: state.integrationLevel,
      systemHarmony: state.systemHarmony,
      emergentCapabilities: state.emergentCapabilities.length,
      crossSystemEvents: Math.floor(integrationLevel * 100), // Simulated cross-system events
      performanceScore: Math.min(100, Math.floor(performanceScore * 100))
    })
  }, [isSystemReady, state, integrationLevel])

  // User journey progression tracking
  const progressUserJourney = useCallback(() => {
    const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)
    
    if (scrollProgress > 0.8 && userJourneyStage !== 'collaboration') {
      setUserJourneyStage('collaboration')
      updateBusinessIntelligence({
        userJourneyStage: 'decision',
        engagementScore: Math.min(1.0, state.business.engagementScore + 0.2),
        partnershipAffinity: Math.min(1.0, state.business.partnershipAffinity + 0.15)
      })
    } else if (scrollProgress > 0.5 && userJourneyStage !== 'understanding') {
      setUserJourneyStage('understanding')
      updateBusinessIntelligence({
        userJourneyStage: 'consideration',
        engagementScore: Math.min(1.0, state.business.engagementScore + 0.1)
      })
    } else if (scrollProgress > 0.2 && userJourneyStage !== 'exploration') {
      setUserJourneyStage('exploration')
      updateUserBehavior({
        dwellTime: state.user.dwellTime + 1000,
        interactionStyle: 'explorer'
      })
    }
  }, [userJourneyStage, state, updateBusinessIntelligence, updateUserBehavior])

  // Generate holistic insights based on system state
  const generateHolisticInsights = useCallback(() => {
    const insights = []
    
    if (state.integrationLevel > 0.3) {
      insights.push("🌟 Systems are beginning to collaborate - design changes now influence motion timing")
    }
    
    if (state.integrationLevel > 0.5) {
      insights.push("🚀 Emergent capabilities detected - creative collaboration between canvas and motion systems")
    }
    
    if (state.integrationLevel > 0.7) {
      insights.push("💡 Business intelligence integration - user behavior directly informing brand experience")
    }
    
    if (state.systemHarmony > 0.8) {
      insights.push("✨ Transcendent harmony achieved - all systems operating in perfect synchronization")
    }
    
    if (state.performance.fps > 55 && state.canvas.particleCount > 100) {
      insights.push("⚡ Performance artistry - complex visuals maintaining perfect smoothness")
    }

    if (emergentCapabilities.length > 2) {
      insights.push(`🔮 ${emergentCapabilities.length} emergent capabilities active - system evolution beyond individual components`)
    }
    
    setHolisticInsights(insights)
  }, [state, emergentCapabilities])

  // Mouse movement tracking for user behavior analysis
  const handleMouseMovement = useCallback((event: MouseEvent) => {
    const velocity = Math.sqrt(
      (event.movementX || 0) ** 2 + (event.movementY || 0) ** 2
    )
    
    if (velocity > 10) {
      updateUserBehavior({
        scrollVelocity: velocity,
        attentionSpots: [
          ...state.user.attentionSpots.slice(-10),
          {
            x: event.clientX,
            y: event.clientY,
            duration: Date.now(),
            section: userJourneyStage
          }
        ]
      })
    }
  }, [state.user.attentionSpots, userJourneyStage, updateUserBehavior])

  // System optimization trigger
  const handleOptimizeSystem = () => {
    triggerOptimization()
    updateBusinessIntelligence({
      engagementScore: Math.min(1.0, state.business.engagementScore + 0.1),
      brandResonance: Math.min(1.0, state.business.brandResonance + 0.05)
    })
  }

  // Effects for real-time integration
  useEffect(() => {
    const interval = setInterval(calculateHolisticMetrics, 1000)
    return () => clearInterval(interval)
  }, [calculateHolisticMetrics])

  useEffect(() => {
    const handleScroll = () => progressUserJourney()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [progressUserJourney])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMovement, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMovement)
  }, [handleMouseMovement])

  useEffect(() => {
    generateHolisticInsights()
  }, [generateHolisticInsights])

  // System readiness check
  if (!isSystemReady) {
    return (
      <div className="holistic-section">
        <div className="holistic-section-content">
          <div className="text-center">
            <div className="animate-pulse text-2xl text-blue-400 mb-8">
              🌟 Initializing Holistic Integration Systems...
            </div>
            <div className="text-slate-400">
              Preparing unified intelligence layer and cross-component communication
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section - Holistic Integration Showcase */}
      <section className="holistic-section">
        <div className="holistic-section-content">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="text-sm text-blue-400 font-medium uppercase tracking-wider">
                Master Creative Director H - Holistic Integration Master
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                Perfect Holistic Integration
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto">
                Where design, motion, code, brand, UX, and business strategy operate as a unified living system
              </p>
            </div>

            {/* Real-Time Integration Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
              <div className="holistic-card text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {metrics.totalParticles}
                </div>
                <div className="text-sm text-slate-400">
                  Active Particles
                </div>
              </div>
              
              <div className="holistic-card text-center">
                <div className="text-2xl font-bold text-green-400">
                  {Math.floor(metrics.integrationLevel * 100)}%
                </div>
                <div className="text-sm text-slate-400">
                  Integration Level
                </div>
              </div>
              
              <div className="holistic-card text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {Math.floor(metrics.systemHarmony * 100)}%
                </div>
                <div className="text-sm text-slate-400">
                  System Harmony
                </div>
              </div>
              
              <div className="holistic-card text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {metrics.emergentCapabilities}
                </div>
                <div className="text-sm text-slate-400">
                  Emergent Abilities
                </div>
              </div>
              
              <div className="holistic-card text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {metrics.crossSystemEvents}
                </div>
                <div className="text-sm text-slate-400">
                  Cross-System Events
                </div>
              </div>
              
              <div className="holistic-card text-center">
                <div className="text-2xl font-bold text-rose-400">
                  {metrics.performanceScore}
                </div>
                <div className="text-sm text-slate-400">
                  Performance Score
                </div>
              </div>
            </div>

            {/* Interactive System Optimization */}
            <div className="space-y-4">
              <button
                onClick={handleOptimizeSystem}
                className="holistic-button text-lg px-8 py-4"
              >
                🚀 Trigger System Optimization
              </button>
              
              <p className="text-sm text-slate-400">
                Current Journey Stage: <span className="text-blue-400 font-medium capitalize">{userJourneyStage}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Holistic Insights Section */}
      <section className="holistic-section">
        <div className="holistic-section-content">
          <h2 className="text-center mb-16">
            Real-Time Holistic Insights
          </h2>
          
          <div className="space-y-6">
            {holisticInsights.length > 0 ? (
              holisticInsights.map((insight, index) => (
                <div key={index} className="holistic-card">
                  <p className="text-lg">{insight}</p>
                </div>
              ))
            ) : (
              <div className="holistic-card text-center">
                <p className="text-slate-400">
                  🌱 Integration insights will appear as system harmony develops...
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Interact with the page to accelerate integration
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Integration Architecture Section */}
      <section className="holistic-section">
        <div className="holistic-section-content">
          <h2 className="text-center mb-16">
            Holistic Architecture
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="holistic-card">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                🧠 Unified Intelligence Layer
              </h3>
              <p className="text-slate-300 mb-4">
                Cross-component data sharing and learning system that enables all elements to communicate and adapt together.
              </p>
              <div className="text-sm text-slate-400">
                Status: {state.integrationLevel > 0.1 ? '✅ Active' : '⚠️ Initializing'}
              </div>
            </div>
            
            <div className="holistic-card">
              <h3 className="text-xl font-semibold mb-4 text-green-400">
                🎨 Integrated Design Language
              </h3>
              <p className="text-slate-300 mb-4">
                Visual elements inform motion timing which generates code parameters in perfect harmony.
              </p>
              <div className="text-sm text-slate-400">
                Status: {state.integrationLevel > 0.3 ? '✅ Synchronized' : '⚠️ Developing'}
              </div>
            </div>
            
            <div className="holistic-card">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">
                ⚡ Performance Architecture
              </h3>
              <p className="text-slate-300 mb-4">
                System-wide optimization where improving one area enhances all areas exponentially.
              </p>
              <div className="text-sm text-slate-400">
                Status: {metrics.performanceScore > 70 ? '✅ Optimized' : '⚠️ Tuning'}
              </div>
            </div>
            
            <div className="holistic-card">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                🤝 Business-Experience Integration
              </h3>
              <p className="text-slate-300 mb-4">
                Every user interaction contributes to business intelligence while business insights enhance user experience.
              </p>
              <div className="text-sm text-slate-400">
                Status: {state.business.engagementScore > 0.6 ? '✅ Resonating' : '⚠️ Building'}
              </div>
            </div>
            
            <div className="holistic-card">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                🌟 Emergent Capabilities
              </h3>
              <p className="text-slate-300 mb-4">
                System behaviors that arise from integration, not individual features - creating value beyond additive effects.
              </p>
              <div className="text-sm text-slate-400">
                Active: {emergentCapabilities.map(cap => cap.name).join(', ') || 'None yet - keep interacting!'}
              </div>
            </div>
            
            <div className="holistic-card">
              <h3 className="text-xl font-semibold mb-4 text-rose-400">
                🎯 Cross-Modal Experience
              </h3>
              <p className="text-slate-300 mb-4">
                Perfect integration across devices with consistent experience language that adapts while maintaining identity.
              </p>
              <div className="text-sm text-slate-400">
                Status: {state.user.deviceCapabilities.performance === 'high' ? '✅ Optimized' : '⚠️ Adapting'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Methodology Section */}
      <section className="holistic-section">
        <div className="holistic-section-content">
          <h2 className="text-center mb-16">
            Holistic Integration Methodology
          </h2>
          
          <div className="space-y-12">
            <div className="holistic-card">
              <h3 className="text-2xl font-semibold mb-6">
                🎼 System Coherence Audit
              </h3>
              <p className="text-lg text-slate-300 mb-6">
                We mapped interconnections between all 18+ previous implementations, identified where individual excellence created system friction, and found opportunities where better integration could exponentially improve outcomes.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-400 mb-3">Integration Discoveries:</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Canvas creativity isolated from motion systems</li>
                    <li>• User engagement data trapped in individual components</li>
                    <li>• Performance optimization competing rather than collaborating</li>
                    <li>• Business intelligence disconnected from user experience</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">Holistic Solutions:</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Unified Intelligence Layer enabling cross-component communication</li>
                    <li>• Emergent capabilities arising from system integration</li>
                    <li>• Multiplicative performance enhancement</li>
                    <li>• Business-experience feedback loops</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="holistic-card">
              <h3 className="text-2xl font-semibold mb-6">
                🔬 Cross-Pollination Laboratory
              </h3>
              <p className="text-lg text-slate-300 mb-6">
                We identified successful integrations across all versions and created breakthrough combinations that weren't previously attempted, mapping potential system synergies for exponential value creation.
              </p>
              
              <div className="text-center mt-8">
                <div className="inline-flex items-center gap-4 text-sm text-slate-400">
                  <span>System Integration Level:</span>
                  <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 transition-all duration-1000"
                      style={{ width: `${integrationLevel * 100}%` }}
                    />
                  </div>
                  <span className="font-medium text-blue-400">{Math.floor(integrationLevel * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="holistic-section">
        <div className="holistic-section-content">
          <div className="text-center space-y-8">
            <h2>
              Experience the Integration Evolution
            </h2>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Synthesis-H represents the culmination of 18+ specialist implementations, 
              achieving perfect holistic integration where the whole transcends the sum of its parts.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/nightly" className="holistic-button">
                🏠 All Nightly Implementations
              </Link>
              <Link href="/nightly/synthesis-f" className="holistic-button">
                ⚡ Previous: Synthesis-F Excellence
              </Link>
              <Link href="/nightly/synthesis-h/services" className="holistic-button">
                🚀 Experience Services Integration
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}