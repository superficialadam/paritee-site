'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface UserJourneyState {
  currentStage: string
  visitedStages: string[]
  userType: 'cmo' | 'agency-owner' | 'marketer' | 'explorer' | null
  engagement: {
    scrollDepth: number
    timeSpent: number
    interactionCount: number
    focusAreas: string[]
  }
  personalization: {
    preferredContent: 'strategic' | 'tactical' | 'creative' | 'balanced'
    communicationStyle: 'direct' | 'detailed' | 'visual' | 'conversational'
    informationPace: 'quick' | 'thorough' | 'adaptive'
  }
}

interface UserJourneyContextType {
  journeyState: UserJourneyState
  updateStage: (stage: string) => void
  updateUserType: (type: UserJourneyState['userType']) => void
  recordInteraction: (area: string) => void
  updatePreferences: (preferences: Partial<UserJourneyState['personalization']>) => void
  getAdaptiveContent: (baseContent: any) => any
}

const UserJourneyContext = createContext<UserJourneyContextType | undefined>(undefined)

export function UserJourneyProvider({ children }: { children: ReactNode }) {
  const [journeyState, setJourneyState] = useState<UserJourneyState>({
    currentStage: 'initial',
    visitedStages: [],
    userType: null,
    engagement: {
      scrollDepth: 0,
      timeSpent: 0,
      interactionCount: 0,
      focusAreas: []
    },
    personalization: {
      preferredContent: 'balanced',
      communicationStyle: 'conversational',
      informationPace: 'adaptive'
    }
  })

  // Intelligent user type detection based on behavior
  useEffect(() => {
    const detectUserType = () => {
      const { focusAreas, scrollDepth, interactionCount } = journeyState.engagement
      
      // CMO indicators: Quick scanning, focus on results and strategy
      if (focusAreas.includes('cases') && focusAreas.includes('mission') && scrollDepth < 50 && interactionCount < 5) {
        return 'cmo'
      }
      
      // Agency Owner indicators: Deep exploration of services and ecosystem
      if (focusAreas.includes('services') && focusAreas.includes('ecosystem') && scrollDepth > 70) {
        return 'agency-owner'
      }
      
      // Marketer indicators: Focus on tactical services and team
      if (focusAreas.includes('services') && focusAreas.includes('team') && interactionCount > 8) {
        return 'marketer'
      }
      
      return 'explorer'
    }

    const newUserType = detectUserType()
    if (newUserType !== journeyState.userType) {
      setJourneyState(prev => ({ ...prev, userType: newUserType }))
    }
  }, [journeyState.engagement])

  // Advanced scroll and time tracking
  useEffect(() => {
    let startTime = Date.now()
    let timeInterval: NodeJS.Timeout

    const updateTimeSpent = () => {
      setJourneyState(prev => ({
        ...prev,
        engagement: {
          ...prev.engagement,
          timeSpent: Date.now() - startTime
        }
      }))
    }

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      setJourneyState(prev => ({
        ...prev,
        engagement: {
          ...prev.engagement,
          scrollDepth: Math.max(prev.engagement.scrollDepth, scrollPercent)
        }
      }))
    }

    timeInterval = setInterval(updateTimeSpent, 1000)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearInterval(timeInterval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const updateStage = (stage: string) => {
    setJourneyState(prev => ({
      ...prev,
      currentStage: stage,
      visitedStages: [...new Set([...prev.visitedStages, stage])]
    }))
  }

  const updateUserType = (type: UserJourneyState['userType']) => {
    setJourneyState(prev => ({ ...prev, userType: type }))
  }

  const recordInteraction = (area: string) => {
    setJourneyState(prev => ({
      ...prev,
      engagement: {
        ...prev.engagement,
        interactionCount: prev.engagement.interactionCount + 1,
        focusAreas: [...new Set([...prev.engagement.focusAreas, area])]
      }
    }))
  }

  const updatePreferences = (preferences: Partial<UserJourneyState['personalization']>) => {
    setJourneyState(prev => ({
      ...prev,
      personalization: { ...prev.personalization, ...preferences }
    }))
  }

  // Adaptive content system based on user journey
  const getAdaptiveContent = (baseContent: any) => {
    const { userType, personalization, engagement } = journeyState
    
    // Content adaptation based on user type
    const userTypeAdaptations = {
      cmo: {
        emphasis: ['results', 'strategy', 'roi'],
        tone: 'executive',
        detail: 'high-level'
      },
      'agency-owner': {
        emphasis: ['partnership', 'scalability', 'ecosystem'],
        tone: 'collaborative',
        detail: 'comprehensive'
      },
      marketer: {
        emphasis: ['execution', 'tools', 'team'],
        tone: 'practical',
        detail: 'tactical'
      },
      explorer: {
        emphasis: ['overview', 'capabilities', 'approach'],
        tone: 'informative',
        detail: 'balanced'
      }
    }

    const adaptation = userTypeAdaptations[userType || 'explorer']
    
    return {
      ...baseContent,
      adaptation,
      personalized: true,
      engagementLevel: engagement.interactionCount > 10 ? 'high' : engagement.interactionCount > 5 ? 'medium' : 'low'
    }
  }

  const value = {
    journeyState,
    updateStage,
    updateUserType,
    recordInteraction,
    updatePreferences,
    getAdaptiveContent
  }

  return (
    <UserJourneyContext.Provider value={value}>
      {children}
    </UserJourneyContext.Provider>
  )
}

export const useUserJourney = () => {
  const context = useContext(UserJourneyContext)
  if (context === undefined) {
    throw new Error('useUserJourney must be used within a UserJourneyProvider')
  }
  return context
}