'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useHolisticIntelligence } from '../hooks/useHolisticIntelligence'

export default function Header() {
  const pathname = usePathname()
  const { state, updateUserBehavior, updateBusinessIntelligence } = useHolisticIntelligence()
  
  const [isScrolled, setIsScrolled] = useState(false)
  const [navigationEngagement, setNavigationEngagement] = useState(0)
  const [adaptiveMode, setAdaptiveMode] = useState<'minimal' | 'standard' | 'enhanced'>('standard')

  // Holistic navigation items that adapt based on user behavior
  const getNavigationItems = useCallback(() => {
    const baseItems = [
      { href: '/nightly/synthesis-h', label: 'Home', priority: 1 },
      { href: '/nightly/synthesis-h/services', label: 'Services', priority: 0.9 },
      { href: '/nightly/synthesis-h/cases', label: 'Cases', priority: 0.8 },
      { href: '/nightly/synthesis-h/contact', label: 'Contact', priority: 0.7 }
    ]

    // Adaptive navigation based on user journey stage
    if (state.business.userJourneyStage === 'decision' || state.business.userJourneyStage === 'action') {
      baseItems.push({ href: '/nightly/synthesis-h/contact', label: 'Partner With Us', priority: 1.2 })
    }

    if (state.user.interactionStyle === 'analyzer') {
      baseItems.push({ href: '/nightly/synthesis-h/team', label: 'Team', priority: 0.8 })
      baseItems.push({ href: '/nightly/synthesis-h/geographies', label: 'Locations', priority: 0.6 })
    }

    return baseItems
      .filter(item => item.priority >= (adaptiveMode === 'minimal' ? 0.9 : 0.5))
      .sort((a, b) => b.priority - a.priority)
  }, [state.business.userJourneyStage, state.user.interactionStyle, adaptiveMode])

  // Scroll behavior with holistic intelligence
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const isCurrentlyScrolled = scrollY > 20
    
    if (isCurrentlyScrolled !== isScrolled) {
      setIsScrolled(isCurrentlyScrolled)
      
      // Update user behavior based on navigation interaction
      updateUserBehavior({
        scrollVelocity: Math.abs(scrollY - (state.user.scrollVelocity || 0)),
        dwellTime: isCurrentlyScrolled ? state.user.dwellTime + 100 : state.user.dwellTime
      })
    }
  }, [isScrolled, state.user.scrollVelocity, state.user.dwellTime, updateUserBehavior])

  // Adaptive mode detection based on user behavior and system performance
  const updateAdaptiveMode = useCallback(() => {
    const cognitiveLoad = state.user.cognitiveLoad
    const performanceFps = state.performance.fps
    const devicePerformance = state.user.deviceCapabilities.performance

    if (cognitiveLoad > 0.7 || performanceFps < 30 || devicePerformance === 'low') {
      setAdaptiveMode('minimal')
    } else if (cognitiveLoad < 0.3 && performanceFps > 50 && devicePerformance === 'high') {
      setAdaptiveMode('enhanced')
    } else {
      setAdaptiveMode('standard')
    }
  }, [state.user.cognitiveLoad, state.performance.fps, state.user.deviceCapabilities.performance])

  // Navigation interaction tracking
  const handleNavigationInteraction = useCallback((action: string) => {
    const newEngagement = Math.min(navigationEngagement + 0.1, 1.0)
    setNavigationEngagement(newEngagement)
    
    // Inform holistic intelligence about navigation engagement
    updateBusinessIntelligence({
      engagementScore: Math.min(1.0, state.business.engagementScore + 0.05),
      contentRelevance: {
        ...state.business.contentRelevance,
        navigation: newEngagement
      }
    })
    
    updateUserBehavior({
      interactionStyle: newEngagement > 0.5 ? 'explorer' : state.user.interactionStyle
    })
  }, [navigationEngagement, state.business, state.user.interactionStyle, updateBusinessIntelligence, updateUserBehavior])

  // Effects
  useEffect(() => {
    const handleScrollThrottled = () => {
      requestAnimationFrame(handleScroll)
    }
    
    window.addEventListener('scroll', handleScrollThrottled, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollThrottled)
  }, [handleScroll])

  useEffect(() => {
    updateAdaptiveMode()
  }, [updateAdaptiveMode])

  const navigationItems = getNavigationItems()

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 
        ${isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-lg border-b border-slate-800/60' 
          : 'bg-transparent'
        }
        ${adaptiveMode === 'enhanced' ? 'shadow-lg shadow-blue-500/10' : ''}
      `}
    >
      <nav className="holistic-content-container">
        <div className="grid-column-content flex items-center justify-between h-16 lg:h-20">
          
          {/* Holistic Logo with Integration Status */}
          <Link 
            href="/nightly/synthesis-h"
            className="flex items-center space-x-3 group"
            onClick={() => handleNavigationInteraction('logo')}
          >
            <div className="relative">
              <div 
                className={`
                  w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white
                  transition-all duration-300 group-hover:scale-110
                  ${adaptiveMode === 'enhanced' 
                    ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400' 
                    : adaptiveMode === 'minimal'
                    ? 'bg-blue-600'
                    : 'bg-gradient-to-br from-blue-600 to-blue-500'
                  }
                `}
                style={{
                  transform: `scale(${1 + state.integrationLevel * 0.1})`,
                  boxShadow: `0 0 ${state.systemHarmony * 20}px rgba(59, 130, 246, ${state.systemHarmony * 0.3})`
                }}
              >
                H
              </div>
              
              {/* Integration Level Indicator */}
              {adaptiveMode !== 'minimal' && (
                <div 
                  className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900"
                  style={{
                    backgroundColor: state.integrationLevel > 0.8 ? '#10b981' : 
                                   state.integrationLevel > 0.5 ? '#f59e0b' : '#ef4444'
                  }}
                />
              )}
            </div>
            
            <div className="hidden sm:block">
              <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                Synthesis-H
              </div>
              {adaptiveMode === 'enhanced' && (
                <div className="text-xs text-slate-400">
                  Holistic Integration • {Math.floor(state.integrationLevel * 100)}% Integrated
                </div>
              )}
            </div>
          </Link>

          {/* Adaptive Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              const relevanceScore = state.business.contentRelevance[item.label.toLowerCase()] || 0
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavigationInteraction(item.label)}
                  className={`
                    px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    relative overflow-hidden group
                    ${isActive 
                      ? 'text-white bg-blue-600/20 border border-blue-500/30' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }
                    ${adaptiveMode === 'enhanced' ? 'transform hover:scale-105' : ''}
                  `}
                  style={{
                    opacity: adaptiveMode === 'minimal' ? 0.8 : 1,
                    borderColor: isActive && adaptiveMode === 'enhanced' 
                      ? `rgba(59, 130, 246, ${0.3 + relevanceScore * 0.4})` 
                      : undefined
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Adaptive highlighting based on content relevance */}
                  {relevanceScore > 0.3 && adaptiveMode === 'enhanced' && (
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ opacity: relevanceScore * 0.5 }}
                    />
                  )}
                  
                  {/* Priority indicator for high-priority items */}
                  {item.priority > 1.0 && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Holistic System Status (Enhanced Mode) */}
          {adaptiveMode === 'enhanced' && (
            <div className="hidden xl:flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-slate-400">
                  {Math.floor(state.performance.fps)}fps
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: state.systemHarmony > 0.8 ? '#10b981' : 
                                   state.systemHarmony > 0.5 ? '#f59e0b' : '#ef4444'
                  }}
                />
                <span className="text-slate-400">
                  {Math.floor(state.systemHarmony * 100)}% Harmony
                </span>
              </div>
              
              {state.emergentCapabilities.length > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-slate-400">
                    {state.emergentCapabilities.length} Emergent
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
            onClick={() => handleNavigationInteraction('mobile-menu')}
            aria-label="Navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation (Simplified for now) */}
        <div className="md:hidden border-t border-slate-800/60 bg-slate-900/95 backdrop-blur-lg">
          <div className="px-4 py-4 space-y-2">
            {navigationItems.slice(0, 4).map((item) => {
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavigationInteraction(item.label)}
                  className={`
                    block px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'text-white bg-blue-600/20 border border-blue-500/30' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }
                  `}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}