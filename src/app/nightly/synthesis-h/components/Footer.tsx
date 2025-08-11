'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useHolisticIntelligence } from '../hooks/useHolisticIntelligence'

export default function Footer() {
  const { state, updateBusinessIntelligence, triggerOptimization } = useHolisticIntelligence()
  
  const [footerEngagement, setFooterEngagement] = useState(0)
  const [systemInsights, setSystemInsights] = useState<string[]>([])
  const [integrationSummary, setIntegrationSummary] = useState({
    totalSystems: 6,
    integratedSystems: 0,
    emergentCapabilities: 0,
    holisticScore: 0
  })

  // Calculate real-time integration summary
  const calculateIntegrationSummary = useCallback(() => {
    const integratedSystems = [
      state.design.visualComplexity > 0.1 ? 1 : 0, // Design system
      state.motion.responsiveness > 0.1 ? 1 : 0,   // Motion system
      state.canvas.particleCount > 0 ? 1 : 0,      // Canvas system
      state.business.engagementScore > 0.1 ? 1 : 0, // Business intelligence
      state.user.dwellTime > 0 ? 1 : 0,            // User behavior
      state.performance.fps > 30 ? 1 : 0           // Performance system
    ].reduce((sum, active) => sum + active, 0)

    setIntegrationSummary({
      totalSystems: 6,
      integratedSystems,
      emergentCapabilities: state.emergentCapabilities.length,
      holisticScore: Math.floor(state.systemHarmony * 100)
    })
  }, [state])

  // Generate system insights
  const generateSystemInsights = useCallback(() => {
    const insights = []
    
    if (state.integrationLevel > 0.9) {
      insights.push("🌟 Transcendent Integration: All systems operating in perfect harmony")
    } else if (state.integrationLevel > 0.7) {
      insights.push("🚀 Advanced Integration: Cross-system communication fully active")
    } else if (state.integrationLevel > 0.5) {
      insights.push("💫 Emerging Integration: Systems beginning collaborative behaviors")
    } else if (state.integrationLevel > 0.3) {
      insights.push("🌱 Initial Integration: Basic cross-component communication established")
    } else {
      insights.push("🔄 Integration Initializing: Systems preparing for holistic collaboration")
    }

    if (state.emergentCapabilities.length > 0) {
      const capabilityNames = state.emergentCapabilities.map(cap => cap.name.replace('-', ' ')).join(', ')
      insights.push(`✨ Emergent Capabilities Active: ${capabilityNames}`)
    }

    if (state.performance.fps > 55 && state.systemHarmony > 0.8) {
      insights.push("⚡ Performance Artistry: Achieving beauty without sacrificing speed")
    }

    setSystemInsights(insights.slice(0, 3)) // Limit to top 3 insights
  }, [state])

  // Footer interaction tracking
  const handleFooterInteraction = useCallback((section: string) => {
    const newEngagement = Math.min(footerEngagement + 0.1, 1.0)
    setFooterEngagement(newEngagement)
    
    updateBusinessIntelligence({
      engagementScore: Math.min(1.0, state.business.engagementScore + 0.02),
      contentRelevance: {
        ...state.business.contentRelevance,
        [section]: (state.business.contentRelevance[section] || 0) + 0.1
      }
    })
  }, [footerEngagement, state.business, updateBusinessIntelligence])

  // Effects
  useEffect(() => {
    const interval = setInterval(() => {
      calculateIntegrationSummary()
      generateSystemInsights()
    }, 2000)
    
    return () => clearInterval(interval)
  }, [calculateIntegrationSummary, generateSystemInsights])

  // Holistic footer links based on system state
  const getAdaptiveLinks = useCallback(() => {
    const baseLinks = {
      solutions: [
        { href: '/nightly/synthesis-h/services', label: 'Services', priority: 1.0 },
        { href: '/nightly/synthesis-h/cases', label: 'Case Studies', priority: 0.9 },
        { href: '/nightly/synthesis-h/team', label: 'Team', priority: 0.7 }
      ],
      company: [
        { href: '/nightly/synthesis-h/news', label: 'News', priority: 0.8 },
        { href: '/nightly/synthesis-h/sectors', label: 'Sectors', priority: 0.6 },
        { href: '/nightly/synthesis-h/geographies', label: 'Locations', priority: 0.5 }
      ],
      integration: [
        { href: '/nightly', label: 'All Implementations', priority: 0.9 },
        { href: '/nightly/synthesis-f', label: 'Synthesis-F Excellence', priority: 0.7 },
        { href: '/nightly/synthesis-e', label: 'Synthesis-E Innovation', priority: 0.6 }
      ]
    }

    // Boost contact priority if user is in decision stage
    if (state.business.userJourneyStage === 'decision' || state.business.userJourneyStage === 'action') {
      baseLinks.solutions.push({ href: '/nightly/synthesis-h/contact', label: 'Partner With Us', priority: 1.2 })
    }

    return baseLinks
  }, [state.business.userJourneyStage])

  const adaptiveLinks = getAdaptiveLinks()

  return (
    <footer className="relative border-t border-slate-800/60 bg-slate-950/80 backdrop-blur-lg">
      {/* Holistic Integration Status Bar */}
      <div className="border-b border-slate-800/40 bg-gradient-to-r from-slate-900/50 to-slate-800/30">
        <div className="holistic-content-container">
          <div className="grid-column-content py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm">
              
              {/* Integration Summary */}
              <div className="space-y-2">
                <h4 className="font-medium text-blue-400">Holistic Integration Status</h4>
                <div className="space-y-1 text-slate-400">
                  <div>
                    Systems Integrated: {integrationSummary.integratedSystems}/{integrationSummary.totalSystems}
                  </div>
                  <div>
                    Emergent Capabilities: {integrationSummary.emergentCapabilities}
                  </div>
                  <div>
                    Harmony Score: {integrationSummary.holisticScore}%
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-2">
                <h4 className="font-medium text-green-400">Performance Integration</h4>
                <div className="space-y-1 text-slate-400">
                  <div>FPS: {Math.floor(state.performance.fps)}</div>
                  <div>Memory: {Math.floor(state.performance.memoryUsage * 100)}%</div>
                  <div>Response: {Math.floor(state.performance.interactionDelay)}ms</div>
                </div>
              </div>

              {/* User Intelligence */}
              <div className="space-y-2">
                <h4 className="font-medium text-purple-400">User Intelligence</h4>
                <div className="space-y-1 text-slate-400">
                  <div>Interaction Style: {state.user.interactionStyle}</div>
                  <div>Journey Stage: {state.business.userJourneyStage}</div>
                  <div>Engagement: {Math.floor(state.business.engagementScore * 100)}%</div>
                </div>
              </div>

              {/* System Insights */}
              <div className="space-y-2">
                <h4 className="font-medium text-cyan-400">Live Insights</h4>
                <div className="space-y-1">
                  {systemInsights.map((insight, index) => (
                    <div key={index} className="text-xs text-slate-400">
                      {insight}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="holistic-content-container">
        <div className="grid-column-content py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Holistic Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 flex items-center justify-center font-bold text-white"
                  style={{
                    boxShadow: `0 0 ${state.systemHarmony * 30}px rgba(59, 130, 246, ${state.systemHarmony * 0.4})`
                  }}
                >
                  H
                </div>
                <div>
                  <div className="font-semibold text-white">Synthesis-H</div>
                  <div className="text-xs text-slate-400">Holistic Integration Master</div>
                </div>
              </div>
              
              <p className="text-slate-400 text-sm mb-6">
                Perfect holistic integration where design, motion, code, brand, UX, and business strategy 
                operate as a unified living system.
              </p>
              
              {/* Integration Level Visualization */}
              <div className="space-y-3">
                <div className="text-xs text-slate-500">System Harmony</div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 transition-all duration-1000"
                    style={{ width: `${state.systemHarmony * 100}%` }}
                  />
                </div>
                <div className="text-xs text-slate-400">
                  {Math.floor(state.systemHarmony * 100)}% Integrated
                </div>
              </div>
            </div>

            {/* Adaptive Link Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 lg:col-span-3">
              
              {/* Solutions */}
              <div>
                <h4 
                  className="font-medium text-white mb-4 cursor-pointer"
                  onClick={() => handleFooterInteraction('solutions')}
                >
                  Solutions
                </h4>
                <ul className="space-y-2">
                  {adaptiveLinks.solutions
                    .sort((a, b) => b.priority - a.priority)
                    .slice(0, 5)
                    .map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => handleFooterInteraction('solutions')}
                        className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center"
                        style={{ 
                          opacity: link.priority > 1.0 ? 1.0 : 0.8 + (link.priority * 0.2)
                        }}
                      >
                        {link.label}
                        {link.priority > 1.0 && (
                          <span className="ml-2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 
                  className="font-medium text-white mb-4 cursor-pointer"
                  onClick={() => handleFooterInteraction('company')}
                >
                  Company
                </h4>
                <ul className="space-y-2">
                  {adaptiveLinks.company
                    .sort((a, b) => b.priority - a.priority)
                    .slice(0, 5)
                    .map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => handleFooterInteraction('company')}
                        className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                        style={{ 
                          opacity: 0.8 + (link.priority * 0.2)
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Integration Showcase */}
              <div>
                <h4 
                  className="font-medium text-white mb-4 cursor-pointer"
                  onClick={() => handleFooterInteraction('integration')}
                >
                  Integration Showcase
                </h4>
                <ul className="space-y-2">
                  {adaptiveLinks.integration.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => handleFooterInteraction('integration')}
                        className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  
                  {/* System Optimization Button */}
                  <li className="pt-2">
                    <button
                      onClick={() => {
                        triggerOptimization()
                        handleFooterInteraction('optimization')
                      }}
                      className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200 flex items-center space-x-2"
                    >
                      <span>⚡ Optimize System</span>
                      {state.systemHarmony < 0.8 && (
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/60">
        <div className="holistic-content-container">
          <div className="grid-column-content py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-sm text-slate-400">
                © 2024 Paritee Marketing Network. Holistic Integration by Master Creative Director H.
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-slate-400">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: state.integrationLevel > 0.8 ? '#10b981' : 
                                     state.integrationLevel > 0.5 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                  <span>Integration: {Math.floor(state.integrationLevel * 100)}%</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span>Live System</span>
                </div>
                
                {state.emergentCapabilities.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span>{state.emergentCapabilities.length} Emergent</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}