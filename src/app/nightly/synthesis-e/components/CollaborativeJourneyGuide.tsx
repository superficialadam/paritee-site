'use client'

import { useEffect, useState, useCallback, useRef, ReactNode } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ChevronRight, Users, Star, Target, Lightbulb, ArrowDown, Eye, Heart, Zap } from 'lucide-react'

interface JourneyNode {
  id: string
  type: 'content' | 'decision' | 'action' | 'insight' | 'collaboration'
  title: string
  description: string
  position: { x: number; y: number }
  connections: string[]
  userRelevance: number // 0-1
  completionSignals: string[]
  personalizedContent?: ReactNode
  collaborativeContext?: {
    sharedWith: string[]
    benefitsFromTeamwork: boolean
    requiresMultiplePerspectives: boolean
  }
}

interface UserJourneyState {
  currentNode: string
  visitedNodes: string[]
  completedNodes: string[]
  pathTaken: string[]
  alternativePathsExplored: string[]
  strugglingSignals: number // 0-1
  engagementLevel: number // 0-1
  journeyVelocity: number // nodes per minute
  collaborativeReadiness: number // 0-1
  personalizationScore: number // 0-1
}

interface JourneyInsight {
  id: string
  type: 'encouragement' | 'direction' | 'collaboration' | 'personalization' | 'achievement'
  message: string
  action?: string
  icon?: ReactNode
  priority: 'low' | 'medium' | 'high'
  timestamp: number
  triggers: string[]
}

interface CollaborativeOpportunity {
  id: string
  type: 'partnership-story' | 'agency-connection' | 'team-benefit' | 'shared-success'
  title: string
  description: string
  visualCue: ReactNode
  userContext: string[]
  engagementBoost: number
}

export function CollaborativeJourneyGuide({
  children,
  journeyType = 'discovery',
  allowPersonalization = true,
  showProgressIndicators = true
}: {
  children: ReactNode
  journeyType?: 'discovery' | 'decision-making' | 'onboarding' | 'exploration'
  allowPersonalization?: boolean
  showProgressIndicators?: boolean
}) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Journey state management
  const [journeyState, setJourneyState] = useState<UserJourneyState>({
    currentNode: 'entry',
    visitedNodes: ['entry'],
    completedNodes: [],
    pathTaken: ['entry'],
    alternativePathsExplored: [],
    strugglingSignals: 0,
    engagementLevel: 0.7,
    journeyVelocity: 0.5,
    collaborativeReadiness: 0.5,
    personalizationScore: 0.3
  })
  
  // Dynamic guidance system
  const [journeyNodes, setJourneyNodes] = useState<JourneyNode[]>([])
  const [activeInsights, setActiveInsights] = useState<JourneyInsight[]>([])
  const [collaborativeOpportunities, setCollaborativeOpportunities] = useState<CollaborativeOpportunity[]>([])
  const [guidanceMode, setGuidanceMode] = useState<'subtle' | 'helpful' | 'active' | 'proactive'>('helpful')
  const [journeyPersonality, setJourneyPersonality] = useState<'explorer' | 'analyzer' | 'achiever' | 'collaborator'>('explorer')
  
  // Tracking and analytics
  const interactionHistory = useRef<{
    timestamp: number
    action: string
    context: any
    userState: Partial<UserJourneyState>
  }[]>([])
  const behaviorPatterns = useRef({
    averageTimePerSection: 0,
    backtrackingFrequency: 0,
    explorationTendency: 0,
    decisionMakingSpeed: 0,
    collaborativeEngagement: 0
  })
  
  // Animation controls
  const progressAnimation = useAnimation()
  const insightAnimation = useAnimation()

  // INNOVATION 1: Intelligent journey node generation based on Paritee's collaborative philosophy
  const generateCollaborativeJourneyNodes = useCallback((): JourneyNode[] => {
    const baseNodes: JourneyNode[] = [
      {
        id: 'entry',
        type: 'content',
        title: 'Welcome to Partnership',
        description: 'Discover how equals come together to create something greater',
        position: { x: 50, y: 10 },
        connections: ['philosophy', 'services-overview', 'partnership-proof'],
        userRelevance: 1.0,
        completionSignals: ['scroll-depth-30', 'time-spent-10s'],
        collaborativeContext: {
          sharedWith: ['all-visitors'],
          benefitsFromTeamwork: false,
          requiresMultiplePerspectives: false
        }
      },
      {
        id: 'philosophy',
        type: 'insight',
        title: 'The Parity Principle',
        description: 'Understanding why equals create better outcomes',
        position: { x: 20, y: 30 },
        connections: ['agencies-ecosystem', 'collaboration-benefits'],
        userRelevance: 0.8,
        completionSignals: ['engagement-high', 'philosophy-quote-interaction'],
        collaborativeContext: {
          sharedWith: ['philosophy-interested'],
          benefitsFromTeamwork: true,
          requiresMultiplePerspectives: true
        }
      },
      {
        id: 'services-overview',
        type: 'decision',
        title: 'What You Need',
        description: 'Discover services that match your challenges',
        position: { x: 50, y: 40 },
        connections: ['specific-service', 'case-studies', 'team-match'],
        userRelevance: 0.9,
        completionSignals: ['service-click', 'detailed-view'],
        collaborativeContext: {
          sharedWith: ['solution-seekers'],
          benefitsFromTeamwork: true,
          requiresMultiplePerspectives: false
        }
      },
      {
        id: 'partnership-proof',
        type: 'content',
        title: 'Partnership in Action',
        description: 'See real examples of collaborative success',
        position: { x: 80, y: 30 },
        connections: ['case-studies', 'agencies-detail', 'results-focus'],
        userRelevance: 0.7,
        completionSignals: ['case-study-view', 'results-interaction'],
        collaborativeContext: {
          sharedWith: ['results-focused'],
          benefitsFromTeamwork: false,
          requiresMultiplePerspectives: true
        }
      },
      {
        id: 'agencies-ecosystem',
        type: 'collaboration',
        title: 'Meet the Equals',
        description: 'Explore our network of partner agencies',
        position: { x: 20, y: 60 },
        connections: ['specific-agency', 'collaboration-stories', 'team-chemistry'],
        userRelevance: 0.6,
        completionSignals: ['agency-interaction', 'location-interest'],
        collaborativeContext: {
          sharedWith: ['partnership-curious'],
          benefitsFromTeamwork: true,
          requiresMultiplePerspectives: true
        }
      },
      {
        id: 'collaboration-benefits',
        type: 'insight',
        title: 'Why Partnership Works',
        description: 'The tangible benefits of collaborative approaches',
        position: { x: 35, y: 55 },
        connections: ['case-studies', 'contact-readiness', 'partnership-proposal'],
        userRelevance: 0.8,
        completionSignals: ['benefit-recognition', 'value-alignment'],
        collaborativeContext: {
          sharedWith: ['value-seekers'],
          benefitsFromTeamwork: false,
          requiresMultiplePerspectives: true
        }
      },
      {
        id: 'case-studies',
        type: 'content',
        title: 'Success Stories',
        description: 'Real results from collaborative partnerships',
        position: { x: 65, y: 60 },
        connections: ['results-detail', 'contact-readiness', 'similar-challenge'],
        userRelevance: 0.9,
        completionSignals: ['case-deep-dive', 'results-focus'],
        collaborativeContext: {
          sharedWith: ['proof-seekers'],
          benefitsFromTeamwork: false,
          requiresMultiplePerspectives: false
        }
      },
      {
        id: 'contact-readiness',
        type: 'action',
        title: 'Ready to Partner',
        description: 'Take the next step toward collaboration',
        position: { x: 50, y: 85 },
        connections: ['contact-form', 'partnership-discussion', 'next-steps'],
        userRelevance: 1.0,
        completionSignals: ['contact-initiation', 'form-engagement'],
        collaborativeContext: {
          sharedWith: ['ready-prospects'],
          benefitsFromTeamwork: true,
          requiresMultiplePerspectives: false
        }
      }
    ]

    // Personalize based on user behavior and journey personality
    return baseNodes.map(node => ({
      ...node,
      userRelevance: calculateNodeRelevance(node, journeyState, journeyPersonality)
    }))
  }, [journeyState, journeyPersonality])

  // Calculate dynamic relevance based on user behavior
  const calculateNodeRelevance = useCallback((
    node: JourneyNode, 
    state: UserJourneyState, 
    personality: typeof journeyPersonality
  ): number => {
    let relevance = node.userRelevance

    // Adjust based on journey personality
    switch (personality) {
      case 'explorer':
        if (node.type === 'insight' || node.type === 'collaboration') relevance += 0.2
        break
      case 'analyzer':
        if (node.type === 'content' || node.connections.length > 3) relevance += 0.2
        break
      case 'achiever':
        if (node.type === 'action' || node.completionSignals.includes('results-focus')) relevance += 0.3
        break
      case 'collaborator':
        if (node.collaborativeContext?.benefitsFromTeamwork) relevance += 0.3
        break
    }

    // Adjust based on current journey state
    if (state.strugglingSignals > 0.6 && node.type === 'insight') {
      relevance += 0.2 // Boost helpful content when struggling
    }

    if (state.collaborativeReadiness > 0.7 && node.collaborativeContext?.benefitsFromTeamwork) {
      relevance += 0.2 // Boost collaborative nodes when ready
    }

    return Math.min(1, relevance)
  }, [])

  // INNOVATION 2: Dynamic insight generation based on user behavior
  const generateContextualInsights = useCallback((state: UserJourneyState): JourneyInsight[] => {
    const insights: JourneyInsight[] = []
    const currentTime = Date.now()

    // Struggling detection
    if (state.strugglingSignals > 0.5) {
      insights.push({
        id: 'struggling-help',
        type: 'direction',
        message: "Looking for something specific? Our collaborative approach means we can guide you to exactly what you need.",
        action: "Show me relevant options",
        icon: <Lightbulb className="w-4 h-4 text-yellow-400" />,
        priority: 'high',
        timestamp: currentTime,
        triggers: ['struggling-behavior', 'multiple-backtracks']
      })
    }

    // High engagement reward
    if (state.engagementLevel > 0.8) {
      insights.push({
        id: 'engagement-reward',
        type: 'encouragement',
        message: "You're exploring partnership possibilities! This collaborative mindset is exactly what creates great results.",
        icon: <Star className="w-4 h-4 text-blue-400" />,
        priority: 'medium',
        timestamp: currentTime,
        triggers: ['high-engagement']
      })
    }

    // Collaboration opportunity
    if (state.collaborativeReadiness > 0.6) {
      insights.push({
        id: 'collaboration-ready',
        type: 'collaboration',
        message: "You seem ready to explore partnership. See how equals coming together has transformed businesses like yours.",
        action: "Show partnership examples",
        icon: <Users className="w-4 h-4 text-green-400" />,
        priority: 'high',
        timestamp: currentTime,
        triggers: ['collaboration-signals']
      })
    }

    // Fast journey velocity
    if (state.journeyVelocity > 0.8) {
      insights.push({
        id: 'fast-journey',
        type: 'direction',
        message: "Moving quickly? Here are the key partnership benefits that matter most.",
        action: "Show key highlights",
        icon: <Zap className="w-4 h-4 text-purple-400" />,
        priority: 'medium',
        timestamp: currentTime,
        triggers: ['fast-velocity']
      })
    }

    // Decision point assistance
    if (state.currentNode === 'services-overview' && state.visitedNodes.length > 3) {
      insights.push({
        id: 'decision-help',
        type: 'personalization',
        message: "Based on what you've explored, here are the collaborative solutions that fit your interests.",
        action: "See personalized recommendations",
        icon: <Target className="w-4 h-4 text-red-400" />,
        priority: 'high',
        timestamp: currentTime,
        triggers: ['decision-point', 'sufficient-exploration']
      })
    }

    return insights.slice(0, 3) // Limit to prevent overwhelm
  }, [])

  // INNOVATION 3: Collaborative opportunity identification
  const identifyCollaborativeOpportunities = useCallback((state: UserJourneyState): CollaborativeOpportunity[] => {
    const opportunities: CollaborativeOpportunity[] = [
      {
        id: 'partnership-story-visual',
        type: 'partnership-story',
        title: 'See Partnership in Action',
        description: 'Visual story of how equals collaborate to deliver exceptional results',
        visualCue: <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <Users className="w-4 h-4 text-white" />
        </div>,
        userContext: ['visual-learner', 'story-interested'],
        engagementBoost: 0.3
      },
      {
        id: 'agency-connection',
        type: 'agency-connection',
        title: 'Connect with Your Match',
        description: 'Meet the agencies whose expertise aligns with your needs',
        visualCue: <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <Heart className="w-4 h-4 text-white" />
        </div>,
        userContext: ['solution-seeking', 'relationship-focused'],
        engagementBoost: 0.4
      },
      {
        id: 'shared-success-metrics',
        type: 'shared-success',
        title: 'Measure Collaborative Impact',
        description: 'See the measurable benefits when equals work together',
        visualCue: <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
          <Star className="w-4 h-4 text-white" />
        </div>,
        userContext: ['data-driven', 'results-focused'],
        engagementBoost: 0.5
      }
    ]

    // Filter based on user context and relevance
    return opportunities.filter(opp => {
      const relevantContext = opp.userContext.some(context => 
        state.engagementLevel > 0.5 || state.collaborativeReadiness > 0.4
      )
      return relevantContext && state.visitedNodes.length > 2
    })
  }, [])

  // INNOVATION 4: Behavioral pattern analysis for journey personalization
  const analyzeJourneyBehavior = useCallback(() => {
    let nodeStartTime: number | null = null
    let scrollDepth = 0
    let backtrackCount = 0
    let interactionCount = 0
    let collaborativeSignalCount = 0

    const trackScrollBehavior = () => {
      const handleScroll = () => {
        const newScrollDepth = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)
        scrollDepth = Math.max(scrollDepth, newScrollDepth)
        
        // Detect backtracking
        if (newScrollDepth < scrollDepth - 0.1) {
          backtrackCount++
        }
        
        updateJourneyState({
          strugglingSignals: Math.min(1, backtrackCount * 0.2),
          engagementLevel: Math.max(0.2, scrollDepth)
        })
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }

    const trackInteractionBehavior = () => {
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        interactionCount++
        
        // Detect collaborative interest signals
        const collaborativeKeywords = ['partnership', 'together', 'collaborate', 'team', 'agencies', 'equals']
        const clickContext = (target.textContent || '').toLowerCase()
        
        if (collaborativeKeywords.some(keyword => clickContext.includes(keyword))) {
          collaborativeSignalCount++
        }
        
        // Record interaction
        interactionHistory.current.push({
          timestamp: Date.now(),
          action: 'click',
          context: {
            element: target.tagName,
            content: clickContext.substring(0, 100),
            collaborativeSignal: collaborativeKeywords.some(k => clickContext.includes(k))
          },
          userState: journeyState
        })
        
        updateJourneyState({
          collaborativeReadiness: Math.min(1, collaborativeSignalCount * 0.1),
          engagementLevel: Math.min(1, interactionCount * 0.05),
          journeyVelocity: calculateJourneyVelocity()
        })
      }

      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }

    const calculateJourneyVelocity = (): number => {
      const recentInteractions = interactionHistory.current.slice(-10)
      if (recentInteractions.length < 2) return 0.5
      
      const timeSpan = recentInteractions[recentInteractions.length - 1].timestamp - recentInteractions[0].timestamp
      const velocity = recentInteractions.length / (timeSpan / 60000) // interactions per minute
      
      return Math.min(1, velocity / 10) // Normalize to 0-1
    }

    const updateJourneyState = (updates: Partial<UserJourneyState>) => {
      setJourneyState(prev => ({ ...prev, ...updates }))
    }

    const cleanupScroll = trackScrollBehavior()
    const cleanupInteraction = trackInteractionBehavior()
    
    return () => {
      cleanupScroll()
      cleanupInteraction()
    }
  }, [journeyState])

  // INNOVATION 5: Dynamic journey personality detection
  const detectJourneyPersonality = useCallback((state: UserJourneyState, history: typeof interactionHistory.current) => {
    const patterns = {
      explorer: 0,
      analyzer: 0,
      achiever: 0,
      collaborator: 0
    }
    
    // Analyze interaction patterns
    const recentInteractions = history.slice(-20)
    
    recentInteractions.forEach(interaction => {
      if (interaction.context.collaborativeSignal) {
        patterns.collaborator += 2
      }
      
      if (interaction.action === 'scroll' && interaction.context.depth > 0.8) {
        patterns.analyzer += 1
      }
      
      if (interaction.context.element === 'BUTTON' || interaction.action === 'click') {
        patterns.achiever += 1
      }
      
      if (state.alternativePathsExplored.length > 2) {
        patterns.explorer += 2
      }
    })
    
    // Determine dominant personality
    const dominantPersonality = Object.entries(patterns)
      .reduce((a, b) => patterns[a[0] as keyof typeof patterns] > patterns[b[0] as keyof typeof patterns] ? a : b)[0] as typeof journeyPersonality
    
    if (dominantPersonality !== journeyPersonality) {
      setJourneyPersonality(dominantPersonality)
    }
  }, [journeyPersonality])

  // INNOVATION 6: Proactive guidance system
  const activateProactiveGuidance = useCallback((state: UserJourneyState) => {
    const guidanceRules = [
      {
        condition: () => state.strugglingSignals > 0.6,
        action: () => setGuidanceMode('proactive'),
        message: 'Increased guidance due to struggling signals'
      },
      {
        condition: () => state.engagementLevel > 0.8 && state.collaborativeReadiness > 0.7,
        action: () => setGuidanceMode('active'),
        message: 'Active guidance for engaged collaborative users'
      },
      {
        condition: () => state.journeyVelocity > 0.8,
        action: () => setGuidanceMode('helpful'),
        message: 'Helpful guidance for fast-moving users'
      },
      {
        condition: () => state.visitedNodes.length > 5 && state.completedNodes.length < 2,
        action: () => setGuidanceMode('active'),
        message: 'Active guidance for extensive exploration without completion'
      }
    ]

    guidanceRules.forEach(rule => {
      if (rule.condition()) {
        rule.action()
        console.log(`Collaborative Journey Guide: ${rule.message}`)
      }
    })
  }, [])

  // Initialize journey system
  useEffect(() => {
    setJourneyNodes(generateCollaborativeJourneyNodes())
  }, [generateCollaborativeJourneyNodes])

  // Update insights and opportunities periodically
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setActiveInsights(generateContextualInsights(journeyState))
      setCollaborativeOpportunities(identifyCollaborativeOpportunities(journeyState))
      detectJourneyPersonality(journeyState, interactionHistory.current)
      activateProactiveGuidance(journeyState)
    }, 3000)

    return () => clearInterval(updateInterval)
  }, [journeyState, generateContextualInsights, identifyCollaborativeOpportunities, detectJourneyPersonality, activateProactiveGuidance])

  // Initialize behavior tracking
  useEffect(() => {
    const cleanup = analyzeJourneyBehavior()
    return cleanup
  }, [analyzeJourneyBehavior])

  // Journey progress visualization
  const JourneyProgressVisualizer = () => (
    <motion.div
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30 
                 bg-slate-800/90 backdrop-blur-sm border border-slate-700 
                 rounded-lg p-4 w-64"
      initial={{ x: -280 }}
      animate={{ x: showProgressIndicators ? 0 : -280 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="text-white text-sm font-medium mb-3">Your Partnership Journey</div>
      
      {/* Journey nodes visualization */}
      <div className="space-y-2 mb-4">
        {journeyNodes.slice(0, 5).map((node, index) => {
          const isVisited = journeyState.visitedNodes.includes(node.id)
          const isCurrent = journeyState.currentNode === node.id
          const isCompleted = journeyState.completedNodes.includes(node.id)
          
          return (
            <motion.div
              key={node.id}
              className={`flex items-center space-x-3 p-2 rounded ${
                isCurrent ? 'bg-blue-600/30 border border-blue-400' :
                isCompleted ? 'bg-green-600/20 border border-green-400/50' :
                isVisited ? 'bg-slate-700/50' : 'bg-slate-800/30'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-3 h-3 rounded-full ${
                isCompleted ? 'bg-green-400' :
                isCurrent ? 'bg-blue-400' :
                isVisited ? 'bg-slate-400' : 'bg-slate-600'
              }`} />
              <div className={`text-xs ${
                isCurrent ? 'text-blue-200' :
                isCompleted ? 'text-green-200' :
                isVisited ? 'text-slate-300' : 'text-slate-500'
              }`}>
                {node.title}
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {/* Journey stats */}
      <div className="text-xs text-slate-400 space-y-1">
        <div>Personality: {journeyPersonality}</div>
        <div>Engagement: {Math.round(journeyState.engagementLevel * 100)}%</div>
        <div>Collaborative Readiness: {Math.round(journeyState.collaborativeReadiness * 100)}%</div>
        <div>Progress: {journeyState.completedNodes.length}/{journeyNodes.length}</div>
      </div>
    </motion.div>
  )

  // Contextual insights display
  const InsightsPanel = () => (
    <AnimatePresence>
      {activeInsights.length > 0 && (
        <motion.div
          className="fixed bottom-4 right-4 z-40 space-y-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          {activeInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              className={`
                bg-slate-800/95 backdrop-blur-sm border rounded-lg p-4 max-w-sm
                ${insight.priority === 'high' ? 'border-blue-400 bg-blue-900/20' :
                  insight.priority === 'medium' ? 'border-yellow-400 bg-yellow-900/20' :
                  'border-slate-600'
                }
              `}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-3">
                {insight.icon && (
                  <div className="flex-shrink-0 mt-0.5">
                    {insight.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium mb-1">
                    {insight.type === 'encouragement' ? 'Great progress!' :
                     insight.type === 'direction' ? 'Helpful guidance' :
                     insight.type === 'collaboration' ? 'Partnership opportunity' :
                     insight.type === 'personalization' ? 'Personalized for you' :
                     'Achievement unlocked!'}
                  </div>
                  <div className="text-slate-300 text-xs leading-relaxed mb-3">
                    {insight.message}
                  </div>
                  {insight.action && (
                    <motion.button
                      className="text-blue-400 hover:text-blue-300 text-xs font-medium 
                                 flex items-center space-x-1 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        // Handle insight action
                        console.log(`Acting on insight: ${insight.action}`)
                      }}
                    >
                      <span>{insight.action}</span>
                      <ChevronRight className="w-3 h-3" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Collaborative opportunities display
  const CollaborativeOpportunitiesPanel = () => (
    <AnimatePresence>
      {collaborativeOpportunities.length > 0 && guidanceMode !== 'subtle' && (
        <motion.div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-30
                     bg-slate-900/95 backdrop-blur-sm border border-blue-400/50 
                     rounded-lg p-4 max-w-md"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
        >
          <div className="text-blue-300 text-sm font-medium mb-3 flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Partnership Opportunities</span>
          </div>
          <div className="space-y-2">
            {collaborativeOpportunities.slice(0, 2).map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                className="flex items-center space-x-3 p-2 hover:bg-slate-800/50 
                           rounded transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  console.log(`Engaging with opportunity: ${opportunity.title}`)
                  setJourneyState(prev => ({
                    ...prev,
                    collaborativeReadiness: Math.min(1, prev.collaborativeReadiness + opportunity.engagementBoost)
                  }))
                }}
              >
                {opportunity.visualCue}
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-medium">{opportunity.title}</div>
                  <div className="text-slate-400 text-xs">{opportunity.description}</div>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div ref={containerRef} className="relative">
      {/* Main content */}
      {children}
      
      {/* Journey guidance overlays */}
      <JourneyProgressVisualizer />
      <InsightsPanel />
      <CollaborativeOpportunitiesPanel />
      
      {/* Development dashboard */}
      {process.env.NODE_ENV === 'development' && (
        <motion.div
          className="fixed top-4 right-4 bg-black/90 text-white text-xs p-3 
                     rounded font-mono z-50 max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-green-400 font-bold mb-2">Journey Guide Debug</div>
          <div>Current Node: {journeyState.currentNode}</div>
          <div>Personality: {journeyPersonality}</div>
          <div>Guidance Mode: {guidanceMode}</div>
          <div>Engagement: {journeyState.engagementLevel.toFixed(2)}</div>
          <div>Collaborative Ready: {journeyState.collaborativeReadiness.toFixed(2)}</div>
          <div>Journey Velocity: {journeyState.journeyVelocity.toFixed(2)}</div>
          <div>Struggling: {journeyState.strugglingSignals.toFixed(2)}</div>
          <div>Visited: {journeyState.visitedNodes.length}</div>
          <div>Completed: {journeyState.completedNodes.length}</div>
          <div>Insights: {activeInsights.length}</div>
          <div>Opportunities: {collaborativeOpportunities.length}</div>
        </motion.div>
      )}
    </div>
  )
}

// Hook for components to interact with the journey guide
export function useCollaborativeJourneyGuide() {
  const markNodeComplete = useCallback((nodeId: string) => {
    // Implementation for marking nodes as complete
    console.log(`Marking node complete: ${nodeId}`)
  }, [])

  const triggerInsight = useCallback((insight: Partial<JourneyInsight>) => {
    // Implementation for triggering custom insights
    console.log(`Triggering insight:`, insight)
  }, [])

  const updateCollaborativeReadiness = useCallback((change: number) => {
    // Implementation for updating collaborative readiness score
    console.log(`Updating collaborative readiness by: ${change}`)
  }, [])

  return {
    markNodeComplete,
    triggerInsight,
    updateCollaborativeReadiness
  }
}