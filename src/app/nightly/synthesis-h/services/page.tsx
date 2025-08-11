'use client'

import { useEffect, useState, useCallback } from 'react'
import { useHolisticIntelligence } from '../hooks/useHolisticIntelligence'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface AdaptiveService {
  id: string
  title: string
  description: string
  capabilities: string[]
  integrationLevel: number
  businessValue: string
  userBenefit: string
  holisticFeatures: string[]
}

export default function ServicesPage() {
  const { state, updateBusinessIntelligence, updateUserBehavior } = useHolisticIntelligence()
  
  const [adaptiveServices, setAdaptiveServices] = useState<AdaptiveService[]>([])
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [userInterest, setUserInterest] = useState<Record<string, number>>({})

  // Generate services that adapt to system state
  const generateAdaptiveServices = useCallback(() => {
    const baseServices: AdaptiveService[] = [
      {
        id: 'holistic-integration',
        title: 'Holistic System Integration',
        description: 'Complete integration of design, motion, code, brand, UX, and business strategy into unified living systems.',
        capabilities: [
          'Unified Intelligence Layer Implementation',
          'Cross-Component Communication Systems', 
          'Emergent Capability Development',
          'Mathematical Design System (Golden Ratio/Fibonacci)',
          'Performance Artistry Achievement'
        ],
        integrationLevel: 1.0,
        businessValue: 'Multiplicative value enhancement across all touchpoints',
        userBenefit: 'Seamless, adaptive experiences that evolve with your needs',
        holisticFeatures: [
          'Systems that learn and optimize automatically',
          'Sub-16ms response times with complex visuals',
          'Emergent behaviors that arise from integration',
          'Perfect business-experience alignment'
        ]
      },
      {
        id: 'consciousness-design',
        title: 'Consciousness-Level Design Systems',
        description: 'Design systems that exhibit awareness, adaptation, and evolution based on user behavior and system performance.',
        capabilities: [
          'Predictive User Interface Adaptation',
          'Emotional Intelligence Integration',
          'Real-time Visual Complexity Optimization',
          'Conscious Color and Typography Systems',
          'Behavioral Pattern Recognition'
        ],
        integrationLevel: 0.8,
        businessValue: 'Increased engagement through anticipatory design',
        userBenefit: 'Interfaces that understand and adapt to your preferences',
        holisticFeatures: [
          'Design elements that predict user needs',
          'Visual complexity that adapts to cognitive load',
          'Brand expression that evolves with interaction',
          'Accessibility that enhances rather than limits'
        ]
      },
      {
        id: 'performance-artistry',
        title: 'Performance Artistry Systems',
        description: 'Technical excellence that enhances rather than compromises aesthetic beauty - achieving the impossible.',
        capabilities: [
          '60FPS Complex Visual Systems',
          'Holistic Resource Optimization',
          'Adaptive Quality Management',
          'Cross-Component Performance Sharing',
          'Real-time Optimization Engines'
        ],
        integrationLevel: 0.9,
        businessValue: 'Premium experiences without performance compromise',
        userBenefit: 'Beautiful, fast experiences that work perfectly on any device',
        holisticFeatures: [
          'Visual complexity that improves performance',
          'Optimization that enables greater creativity',
          'Device-aware quality adaptation',
          'Performance that scales with visual ambition'
        ]
      },
      {
        id: 'emergent-experiences',
        title: 'Emergent Experience Development',
        description: 'Creating digital experiences with behaviors and capabilities that emerge from system integration.',
        capabilities: [
          'Creative Collaboration Systems',
          'Predictive User Journey Orchestration',
          'Business Intelligence Integration',
          'Cross-System Event Propagation',
          'Adaptive Content Architecture'
        ],
        integrationLevel: 0.7,
        businessValue: 'Unique competitive advantages through emergent capabilities',
        userBenefit: 'Experiences that surprise and delight through natural evolution',
        holisticFeatures: [
          'Behaviors that weren\'t explicitly programmed',
          'Experiences that co-create with users',
          'Systems that exhibit organic growth',
          'Capabilities that arise from harmony'
        ]
      }
    ]

    // Adapt services based on system state
    const adaptedServices = baseServices.map(service => {
      // Boost integration-related services if system harmony is high
      if (state.systemHarmony > 0.8 && service.id === 'holistic-integration') {
        return {
          ...service,
          description: service.description + ' [RECOMMENDED: Your system shows readiness for advanced integration]',
          capabilities: [...service.capabilities, 'Transcendent Harmony Achievement']
        }
      }

      // Boost performance services if FPS is good but could be better
      if (state.performance.fps > 45 && state.performance.fps < 55 && service.id === 'performance-artistry') {
        return {
          ...service,
          description: service.description + ' [OPPORTUNITY: Unlock next-level performance potential]'
        }
      }

      return service
    })

    setAdaptiveServices(adaptedServices)
  }, [state.systemHarmony, state.performance.fps])

  // Track service interest
  const handleServiceInteraction = useCallback((serviceId: string, interactionType: 'view' | 'hover' | 'click') => {
    const interestBoost = {
      view: 0.1,
      hover: 0.2,
      click: 0.5
    }

    setUserInterest(prev => ({
      ...prev,
      [serviceId]: (prev[serviceId] || 0) + interestBoost[interactionType]
    }))

    // Update holistic intelligence
    updateUserBehavior({
      interactionStyle: userInterest[serviceId] > 0.5 ? 'achiever' : 'explorer'
    })

    updateBusinessIntelligence({
      contentRelevance: {
        ...state.business.contentRelevance,
        [serviceId]: (state.business.contentRelevance[serviceId] || 0) + interestBoost[interactionType]
      },
      engagementScore: Math.min(1.0, state.business.engagementScore + 0.05)
    })
  }, [userInterest, state.business, updateUserBehavior, updateBusinessIntelligence])

  // Generate adaptive CTA based on user behavior
  const generateAdaptiveCTA = useCallback((service: AdaptiveService) => {
    const interest = userInterest[service.id] || 0
    const journeyStage = state.business.userJourneyStage

    if (journeyStage === 'decision' || journeyStage === 'action' || interest > 0.8) {
      return {
        text: 'Start Integration',
        variant: 'primary' as const,
        urgent: true
      }
    } else if (interest > 0.5) {
      return {
        text: 'Explore Integration',
        variant: 'secondary' as const,
        urgent: false
      }
    } else if (journeyStage === 'consideration') {
      return {
        text: 'Learn More',
        variant: 'secondary' as const,
        urgent: false
      }
    } else {
      return {
        text: 'Discover Possibilities',
        variant: 'outline' as const,
        urgent: false
      }
    }
  }, [userInterest, state.business.userJourneyStage])

  // Effects
  useEffect(() => {
    generateAdaptiveServices()
  }, [generateAdaptiveServices])

  useEffect(() => {
    // Track page view
    handleServiceInteraction('services-page', 'view')
  }, [handleServiceInteraction])

  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="holistic-section">
          <div className="holistic-section-content">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="text-sm text-blue-400 font-medium uppercase tracking-wider">
                  Holistic Integration Services
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Where Systems Become Living Organisms
                </h1>
                
                <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto">
                  Experience services that adapt, evolve, and create value through perfect integration 
                  of all digital touchpoints
                </p>
              </div>

              {/* Real-time Integration Status */}
              <div className="flex justify-center items-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-slate-400">
                    Integration Level: {Math.floor(state.integrationLevel * 100)}%
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-slate-400">
                    System Harmony: {Math.floor(state.systemHarmony * 100)}%
                  </span>
                </div>
                
                {state.emergentCapabilities.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                    <span className="text-slate-400">
                      {state.emergentCapabilities.length} Emergent Capabilities Active
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Adaptive Services Grid */}
        <section className="holistic-section">
          <div className="holistic-section-content">
            <div className="space-y-12">
              {adaptiveServices.map((service, index) => {
                const cta = generateAdaptiveCTA(service)
                const interest = userInterest[service.id] || 0
                
                return (
                  <div 
                    key={service.id}
                    className={`
                      holistic-card transition-all duration-500
                      ${selectedService === service.id ? 'ring-2 ring-blue-500/30' : ''}
                      ${interest > 0.3 ? 'shadow-lg shadow-blue-500/10' : ''}
                    `}
                    onMouseEnter={() => handleServiceInteraction(service.id, 'hover')}
                    style={{
                      transform: interest > 0.5 ? 'scale(1.02)' : 'scale(1)',
                      borderColor: interest > 0.3 ? `rgba(59, 130, 246, ${0.2 + interest * 0.3})` : undefined
                    }}
                  >
                    <div className="grid lg:grid-cols-3 gap-8">
                      
                      {/* Service Overview */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-semibold text-white">
                              {service.title}
                            </h3>
                            
                            {/* Integration Level Indicator */}
                            <div className="flex items-center space-x-2">
                              <div className="text-xs text-slate-400">Integration Level</div>
                              <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-1000"
                                  style={{ width: `${service.integrationLevel * 100}%` }}
                                />
                              </div>
                              <div className="text-xs text-blue-400 font-medium">
                                {Math.floor(service.integrationLevel * 100)}%
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-lg text-slate-300">
                            {service.description}
                          </p>
                        </div>

                        {/* Capabilities Grid */}
                        <div className="grid sm:grid-cols-2 gap-3">
                          {service.capabilities.map((capability, capIndex) => (
                            <div 
                              key={capIndex}
                              className="flex items-center space-x-2 text-sm text-slate-400"
                            >
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                              <span>{capability}</span>
                            </div>
                          ))}
                        </div>

                        {/* Business Value & User Benefit */}
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-green-400 mb-2">Business Value</h4>
                            <p className="text-sm text-slate-400">{service.businessValue}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-purple-400 mb-2">User Benefit</h4>
                            <p className="text-sm text-slate-400">{service.userBenefit}</p>
                          </div>
                        </div>
                      </div>

                      {/* Holistic Features & CTA */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-cyan-400 mb-4">Holistic Features</h4>
                          <div className="space-y-2">
                            {service.holisticFeatures.map((feature, featureIndex) => (
                              <div 
                                key={featureIndex}
                                className="flex items-start space-x-2 text-sm text-slate-300"
                              >
                                <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Adaptive CTA */}
                        <div className="space-y-4">
                          <button
                            onClick={() => {
                              setSelectedService(service.id)
                              handleServiceInteraction(service.id, 'click')
                            }}
                            className={`
                              w-full px-6 py-3 rounded-lg font-medium transition-all duration-300
                              ${cta.variant === 'primary' 
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105' 
                                : cta.variant === 'secondary'
                                ? 'bg-slate-800 text-white hover:bg-slate-700'
                                : 'border border-slate-600 text-slate-300 hover:border-blue-500 hover:text-blue-400'
                              }
                              ${cta.urgent ? 'animate-pulse ring-2 ring-blue-500/30' : ''}
                            `}
                          >
                            {cta.text}
                            {cta.urgent && <span className="ml-2">⚡</span>}
                          </button>
                          
                          {/* Interest Level Indicator */}
                          {interest > 0.2 && (
                            <div className="text-xs text-center text-slate-400">
                              Interest Level: {Math.floor(interest * 100)}%
                              {interest > 0.8 && <span className="text-yellow-400 ml-2">🔥 High Interest!</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Integration Philosophy */}
        <section className="holistic-section">
          <div className="holistic-section-content">
            <div className="text-center space-y-12">
              <div className="space-y-6">
                <h2>The Holistic Integration Philosophy</h2>
                <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                  We don't build websites or applications. We create living digital organisms where 
                  every element serves both individual excellence and collective harmony.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="holistic-card text-center">
                  <div className="text-3xl mb-4">🧠</div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">
                    Unified Intelligence
                  </h3>
                  <p className="text-slate-300">
                    All systems share insights and optimize together, creating emergent capabilities 
                    that arise from integration rather than individual features.
                  </p>
                </div>

                <div className="holistic-card text-center">
                  <div className="text-3xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold mb-4 text-green-400">
                    Performance Artistry
                  </h3>
                  <p className="text-slate-300">
                    Technical excellence that enhances rather than compromises aesthetic beauty, 
                    achieving complex visuals at perfect performance.
                  </p>
                </div>

                <div className="holistic-card text-center">
                  <div className="text-3xl mb-4">🤝</div>
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">
                    Business Harmony
                  </h3>
                  <p className="text-slate-300">
                    Every user interaction serves business objectives while every business decision 
                    enhances user experience - perfect alignment.
                  </p>
                </div>
              </div>

              {/* Contact Integration */}
              <div className="holistic-card bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20">
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-semibold">
                    Ready to Experience Holistic Integration?
                  </h3>
                  <p className="text-lg text-slate-300">
                    Let's create something extraordinary together - where the whole transcends the sum of its parts
                  </p>
                  <Link 
                    href="/nightly/synthesis-h/contact"
                    className="holistic-button text-lg px-8 py-4"
                  >
                    Start Your Integration Journey
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}