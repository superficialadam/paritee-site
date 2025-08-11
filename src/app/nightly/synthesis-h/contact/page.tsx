'use client'

import { useState, useCallback, useEffect } from 'react'
import { useHolisticIntelligence } from '../hooks/useHolisticIntelligence'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface ContactIntelligence {
  readinessScore: number
  partnershipPotential: number
  integrationType: 'discovery' | 'exploration' | 'collaboration' | 'partnership'
  recommendedApproach: string
  adaptiveQuestions: string[]
}

export default function ContactPage() {
  const { 
    state, 
    updateBusinessIntelligence, 
    updateUserBehavior, 
    triggerOptimization 
  } = useHolisticIntelligence()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
    integrationGoals: [] as string[],
    currentChallenges: [] as string[]
  })
  
  const [contactIntelligence, setContactIntelligence] = useState<ContactIntelligence>({
    readinessScore: 0,
    partnershipPotential: 0,
    integrationType: 'discovery',
    recommendedApproach: '',
    adaptiveQuestions: []
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Calculate contact intelligence based on holistic system state
  const calculateContactIntelligence = useCallback(() => {
    const readinessScore = (
      state.business.engagementScore * 0.3 +
      state.integrationLevel * 0.4 +
      state.systemHarmony * 0.3
    )
    
    const partnershipPotential = state.business.partnershipAffinity
    
    let integrationType: ContactIntelligence['integrationType'] = 'discovery'
    if (readinessScore > 0.8) integrationType = 'partnership'
    else if (readinessScore > 0.6) integrationType = 'collaboration'
    else if (readinessScore > 0.3) integrationType = 'exploration'
    
    let recommendedApproach = ''
    if (integrationType === 'partnership') {
      recommendedApproach = 'You show high readiness for holistic integration partnership. Let\'s discuss comprehensive system transformation.'
    } else if (integrationType === 'collaboration') {
      recommendedApproach = 'Your engagement suggests readiness for collaborative integration. Let\'s explore specific system improvements.'
    } else if (integrationType === 'exploration') {
      recommendedApproach = 'You\'re actively exploring integration possibilities. Let\'s identify the best starting point for your needs.'
    } else {
      recommendedApproach = 'Welcome to holistic integration! Let\'s discover how systems thinking can transform your digital experience.'
    }
    
    const adaptiveQuestions = []
    if (state.emergentCapabilities.length > 0) {
      adaptiveQuestions.push('What emergent behaviors would you like your system to develop?')
    }
    if (state.systemHarmony > 0.7) {
      adaptiveQuestions.push('How important is perfect system harmony to your business goals?')
    }
    if (state.business.brandResonance > 0.8) {
      adaptiveQuestions.push('How would you like your brand values expressed through integrated experiences?')
    }
    
    setContactIntelligence({
      readinessScore,
      partnershipPotential,
      integrationType,
      recommendedApproach,
      adaptiveQuestions
    })
  }, [state])

  // Handle form changes with intelligence tracking
  const handleInputChange = useCallback((field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Update user behavior based on form interaction
    updateUserBehavior({
      interactionStyle: formData.message.length > 100 ? 'analyzer' : 
                       formData.integrationGoals.length > 2 ? 'achiever' : 'explorer'
    })
    
    // Update business intelligence based on project type and goals
    if (field === 'projectType' || field === 'integrationGoals') {
      const engagementBoost = field === 'integrationGoals' ? 0.1 : 0.05
      updateBusinessIntelligence({
        engagementScore: Math.min(1.0, state.business.engagementScore + engagementBoost),
        partnershipAffinity: Math.min(1.0, state.business.partnershipAffinity + 0.05)
      })
    }
  }, [formData, state.business, updateUserBehavior, updateBusinessIntelligence])

  // Handle form submission with holistic intelligence
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate intelligent form processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update holistic intelligence with submission data
      updateBusinessIntelligence({
        userJourneyStage: 'action',
        engagementScore: 1.0,
        partnershipAffinity: Math.min(1.0, state.business.partnershipAffinity + 0.3),
        brandResonance: Math.min(1.0, state.business.brandResonance + 0.2)
      })
      
      // Trigger system optimization
      triggerOptimization()
      
      setSubmitSuccess(true)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, state.business, updateBusinessIntelligence, triggerOptimization])

  // Integration goals options
  const integrationGoals = [
    'Unified Intelligence Layer',
    'Performance Artistry',
    'Emergent Capabilities',
    'Business-Experience Harmony',
    'Consciousness-Level Design',
    'Cross-Component Integration',
    'Mathematical Design Systems',
    'Adaptive User Experiences'
  ]

  // Current challenges options
  const challengeOptions = [
    'Fragmented User Experience',
    'Performance vs Beauty Trade-offs',
    'Siloed System Components',
    'Disconnected Business Goals',
    'Static, Non-Adaptive Interfaces',
    'Poor Cross-Device Consistency',
    'Limited System Scalability',
    'Lack of Emergent Behaviors'
  ]

  // Effects
  useEffect(() => {
    calculateContactIntelligence()
  }, [calculateContactIntelligence])

  if (submitSuccess) {
    return (
      <>
        <Header />
        <main className="pt-20">
          <section className="holistic-section">
            <div className="holistic-section-content">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <div className="text-6xl">🌟</div>
                  <h1 className="text-4xl font-bold">
                    Integration Initiated!
                  </h1>
                  <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    Your holistic integration journey has begun. Our systems are already 
                    analyzing the optimal approach for your specific needs.
                  </p>
                </div>

                <div className="holistic-card max-w-2xl mx-auto">
                  <h3 className="text-xl font-semibold mb-4 text-green-400">
                    What Happens Next?
                  </h3>
                  <div className="space-y-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">1</div>
                      <div>
                        <div className="font-medium">Intelligent Analysis</div>
                        <div className="text-sm text-slate-400">Our systems analyze your requirements and current state</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">2</div>
                      <div>
                        <div className="font-medium">Holistic Strategy</div>
                        <div className="text-sm text-slate-400">We develop a comprehensive integration approach</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-medium">3</div>
                      <div>
                        <div className="font-medium">Partnership Begins</div>
                        <div className="text-sm text-slate-400">We start creating your integrated digital organism</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-slate-400">
                  System Integration Level: {Math.floor(state.integrationLevel * 100)}% | 
                  Partnership Readiness: {Math.floor(contactIntelligence.partnershipPotential * 100)}%
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Hero Section with Intelligence */}
        <section className="holistic-section">
          <div className="holistic-section-content">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="text-sm text-blue-400 font-medium uppercase tracking-wider">
                  Partnership Intelligence Active
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Let's Create Something Extraordinary
                </h1>
                
                <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto">
                  {contactIntelligence.recommendedApproach}
                </p>
              </div>

              {/* Real-time Intelligence Display */}
              <div className="flex justify-center items-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-slate-400">
                    Readiness: {Math.floor(contactIntelligence.readinessScore * 100)}%
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-slate-400">
                    Type: {contactIntelligence.integrationType}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-slate-400">
                    Partnership: {Math.floor(contactIntelligence.partnershipPotential * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intelligent Contact Form */}
        <section className="holistic-section">
          <div className="holistic-section-content">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Basic Information */}
                <div className="holistic-card">
                  <h3 className="text-xl font-semibold mb-6">Let's Get Acquainted</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="Your company"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => handleInputChange('projectType', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                      >
                        <option value="">Select project type</option>
                        <option value="holistic-integration">Complete Holistic Integration</option>
                        <option value="system-optimization">System Optimization</option>
                        <option value="performance-artistry">Performance Artistry</option>
                        <option value="emergent-experiences">Emergent Experience Development</option>
                        <option value="consciousness-design">Consciousness-Level Design</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Integration Goals */}
                <div className="holistic-card">
                  <h3 className="text-xl font-semibold mb-6">Integration Goals</h3>
                  <p className="text-slate-400 mb-6">
                    What aspects of holistic integration interest you most?
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {integrationGoals.map((goal) => (
                      <label key={goal} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.integrationGoals.includes(goal)}
                          onChange={(e) => {
                            const newGoals = e.target.checked
                              ? [...formData.integrationGoals, goal]
                              : formData.integrationGoals.filter(g => g !== goal)
                            handleInputChange('integrationGoals', newGoals)
                          }}
                          className="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-300">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Current Challenges */}
                <div className="holistic-card">
                  <h3 className="text-xl font-semibold mb-6">Current Challenges</h3>
                  <p className="text-slate-400 mb-6">
                    What system challenges are you currently facing?
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {challengeOptions.map((challenge) => (
                      <label key={challenge} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.currentChallenges.includes(challenge)}
                          onChange={(e) => {
                            const newChallenges = e.target.checked
                              ? [...formData.currentChallenges, challenge]
                              : formData.currentChallenges.filter(c => c !== challenge)
                            handleInputChange('currentChallenges', newChallenges)
                          }}
                          className="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-300">{challenge}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Adaptive Questions */}
                {contactIntelligence.adaptiveQuestions.length > 0 && (
                  <div className="holistic-card bg-blue-600/5 border border-blue-500/20">
                    <h3 className="text-xl font-semibold mb-6 text-blue-400">
                      🧠 Intelligent Questions
                    </h3>
                    <p className="text-slate-400 mb-6">
                      Based on your system interaction, we'd love to know:
                    </p>
                    <div className="space-y-4">
                      {contactIntelligence.adaptiveQuestions.map((question, index) => (
                        <div key={index} className="text-slate-300">
                          <span className="text-cyan-400 font-medium">Q{index + 1}:</span> {question}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message */}
                <div className="holistic-card">
                  <h3 className="text-xl font-semibold mb-6">Tell Us More</h3>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors resize-vertical"
                    placeholder="Describe your vision, goals, and any specific requirements for holistic integration..."
                  />
                  <div className="mt-2 text-xs text-slate-400">
                    Characters: {formData.message.length}
                    {formData.message.length > 100 && (
                      <span className="text-green-400 ml-2">✓ Detailed message detected</span>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300
                      ${isSubmitting 
                        ? 'bg-slate-600 text-slate-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                        <span>Processing Integration Request...</span>
                      </span>
                    ) : (
                      `Begin ${contactIntelligence.integrationType === 'partnership' ? 'Partnership' : 'Collaboration'}`
                    )}
                  </button>
                  
                  <p className="mt-4 text-sm text-slate-400">
                    Based on your engagement, we recommend a {contactIntelligence.integrationType} approach
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}