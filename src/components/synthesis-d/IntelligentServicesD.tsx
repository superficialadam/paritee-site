'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useUserJourney } from './UserJourneyProvider'
import { services } from '@/data/services'
import { Target, Zap, Users, Lightbulb, BarChart3, Megaphone } from 'lucide-react'

interface AdaptiveService {
  id: string
  name: string
  description: string
  icon: any
  userTypes: ('cmo' | 'agency-owner' | 'marketer' | 'explorer')[]
  value: 'strategic' | 'tactical' | 'creative' | 'analytical'
  complexity: 'entry' | 'intermediate' | 'advanced'
  outcomes: string[]
  advisoryApproach: string
}

export default function IntelligentServicesD() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'advisory'>('overview')
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { journeyState, recordInteraction, updateStage, getAdaptiveContent } = useUserJourney()
  const { scrollYProgress } = useScroll({ 
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  const isInView = useInView(sectionRef, { margin: "-20%" })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  // Enhanced service data with advisory approach
  const adaptiveServices: AdaptiveService[] = [
    {
      id: 'strategic-consulting',
      name: 'Strategic Consulting',
      description: 'Senior-led strategic guidance that aligns your marketing investments with business outcomes',
      icon: Target,
      userTypes: ['cmo', 'agency-owner'],
      value: 'strategic',
      complexity: 'advanced',
      outcomes: ['Clear strategic direction', 'Improved ROI', 'Executive alignment'],
      advisoryApproach: 'Our senior strategists become your extended leadership team, providing ongoing strategic counsel rather than one-time recommendations.'
    },
    {
      id: 'creative-excellence',
      name: 'Creative Excellence',
      description: 'Award-winning creative that breaks through the noise while driving measurable results',
      icon: Lightbulb,
      userTypes: ['marketer', 'explorer'],
      value: 'creative',
      complexity: 'intermediate',
      outcomes: ['Breakthrough campaigns', 'Brand differentiation', 'Cultural relevance'],
      advisoryApproach: 'Creative directors work alongside your team to ensure every creative decision serves both brand and business objectives.'
    },
    {
      id: 'performance-optimization',
      name: 'Performance Optimization',
      description: 'Data-driven optimization that maximizes every marketing dollar across all channels',
      icon: BarChart3,
      userTypes: ['cmo', 'marketer'],
      value: 'analytical',
      complexity: 'advanced',
      outcomes: ['Improved conversion rates', 'Lower acquisition costs', 'Better attribution'],
      advisoryApproach: 'Performance advisors provide real-time insights and strategic adjustments to keep your campaigns ahead of market changes.'
    },
    {
      id: 'brand-development',
      name: 'Brand Development',
      description: 'Comprehensive brand strategy and identity development that resonates with your audience',
      icon: Zap,
      userTypes: ['agency-owner', 'explorer'],
      value: 'strategic',
      complexity: 'intermediate',
      outcomes: ['Strong brand positioning', 'Consistent messaging', 'Market differentiation'],
      advisoryApproach: 'Brand strategists work intimately with leadership to ensure your brand reflects your authentic vision and market opportunity.'
    },
    {
      id: 'team-augmentation',
      name: 'Team Augmentation',
      description: 'Senior marketing professionals who integrate seamlessly with your existing team',
      icon: Users,
      userTypes: ['cmo', 'agency-owner', 'marketer'],
      value: 'tactical',
      complexity: 'entry',
      outcomes: ['Enhanced team capability', 'Knowledge transfer', 'Faster execution'],
      advisoryApproach: 'Experienced professionals who mentor your team while delivering results, leaving your organization stronger.'
    },
    {
      id: 'integrated-campaigns',
      name: 'Integrated Campaigns',
      description: 'Multi-channel campaigns that create cohesive experiences across all touchpoints',
      icon: Megaphone,
      userTypes: ['marketer', 'explorer'],
      value: 'tactical',
      complexity: 'intermediate',
      outcomes: ['Consistent messaging', 'Improved attribution', 'Higher engagement'],
      advisoryApproach: 'Campaign advisors ensure strategic cohesion across channels while optimizing for channel-specific performance.'
    }
  ]

  useEffect(() => {
    setMounted(true)
    if (isInView) {
      updateStage('exploration')
      recordInteraction('services-view')
    }
  }, [isInView, updateStage, recordInteraction])

  // Filter services based on user type and journey stage
  const getRelevantServices = () => {
    if (!journeyState.userType) return adaptiveServices

    // Prioritize services based on user type
    const userServices = adaptiveServices
      .filter(service => service.userTypes.includes(journeyState.userType!))
      .sort((a, b) => {
        // CMOs prefer strategic services
        if (journeyState.userType === 'cmo') {
          if (a.value === 'strategic' && b.value !== 'strategic') return -1
          if (b.value === 'strategic' && a.value !== 'strategic') return 1
        }
        
        // Agency owners want strategic and tactical balance
        if (journeyState.userType === 'agency-owner') {
          if (a.value === 'strategic' && b.value === 'creative') return -1
          if (b.value === 'strategic' && a.value === 'creative') return 1
        }
        
        return 0
      })

    // Include some general services for exploration
    const generalServices = adaptiveServices.filter(service => 
      service.userTypes.includes('explorer') && 
      !userServices.find(us => us.id === service.id)
    )

    return [...userServices, ...generalServices.slice(0, 2)]
  }

  const relevantServices = getRelevantServices()

  // Adaptive view mode based on engagement level
  useEffect(() => {
    const { interactionCount, timeSpent } = journeyState.engagement
    
    if (interactionCount > 8 || timeSpent > 120000) {
      setViewMode('advisory')
    } else if (interactionCount > 4 || timeSpent > 60000) {
      setViewMode('detailed')
    } else {
      setViewMode('overview')
    }
  }, [journeyState.engagement])

  if (!mounted) return null

  return (
    <motion.section 
      ref={sectionRef}
      id="intelligent-services"
      className="relative py-32 overflow-hidden"
      style={{ y }}
    >
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container mx-auto px-8 relative z-10">
        
        {/* Adaptive Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="inline-block px-4 py-2 bg-black/20 backdrop-blur border border-blue-400/20 rounded-full text-xs text-blue-400/80 tracking-widest mb-6"
            whileHover={{ scale: 1.05, borderColor: 'rgba(59, 130, 246, 0.4)' }}
          >
            {journeyState.userType === 'cmo' ? 'STRATEGIC SERVICES' :
             journeyState.userType === 'agency-owner' ? 'PARTNERSHIP SERVICES' :
             journeyState.userType === 'marketer' ? 'MARKETING SERVICES' :
             'OUR SERVICES'}
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide">
            {journeyState.userType === 'cmo' ? 'Executive-Level Marketing Leadership' :
             journeyState.userType === 'agency-owner' ? 'Strategic Partnership Solutions' :
             journeyState.userType === 'marketer' ? 'Marketing Excellence, Delivered' :
             'Comprehensive Marketing Solutions'}
          </h2>
          
          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            {journeyState.userType === 'cmo' ? 'Senior advisory services designed for C-suite marketing leaders who need strategic partners, not just vendors.' :
             journeyState.userType === 'agency-owner' ? 'Collaborative solutions that help agencies scale while maintaining the quality and relationships that define them.' :
             'Advisory-led services that combine strategic insight with flawless execution, delivered by senior marketing professionals.'}
          </p>
        </motion.div>

        {/* View Mode Controls */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex bg-black/20 backdrop-blur border border-white/10 rounded-full p-1">
            {[
              { mode: 'overview', label: 'Overview' },
              { mode: 'detailed', label: 'Details' },
              { mode: 'advisory', label: 'Advisory Approach' }
            ].map(({ mode, label }) => (
              <button
                key={mode}
                onClick={() => {
                  setViewMode(mode as typeof viewMode)
                  recordInteraction(`view-mode-${mode}`)
                }}
                className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${
                  viewMode === mode
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {relevantServices.map((service, index) => (
            <motion.div
              key={service.id}
              className={`
                group relative bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl
                border border-white/10 hover:border-blue-400/30 rounded-xl p-6
                cursor-pointer transition-all duration-500
                ${selectedService === service.id ? 'border-blue-400/50 bg-blue-500/10' : ''}
              `}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => {
                setSelectedService(selectedService === service.id ? null : service.id)
                recordInteraction(`service-select-${service.id}`)
              }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Service Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 group-hover:border-blue-500/50 transition-all duration-300">
                  <service.icon className="h-6 w-6 text-blue-400" />
                </div>
                
                {/* Complexity indicator */}
                <div className={`
                  text-xs px-2 py-1 rounded-full border
                  ${service.complexity === 'advanced' ? 'text-red-400 border-red-400/30 bg-red-500/10' :
                    service.complexity === 'intermediate' ? 'text-yellow-400 border-yellow-400/30 bg-yellow-500/10' :
                    'text-green-400 border-green-400/30 bg-green-500/10'}
                `}>
                  {service.complexity}
                </div>
              </div>

              {/* Service Content */}
              <h3 className="text-xl font-medium text-white mb-3 group-hover:text-blue-400 transition-colors">
                {service.name}
              </h3>

              {/* Adaptive Content Display */}
              {viewMode === 'overview' && (
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
              )}

              {viewMode === 'detailed' && (
                <div className="space-y-4 mb-4">
                  <p className="text-white/70 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div>
                    <div className="text-xs text-blue-400 font-medium mb-2">Key Outcomes:</div>
                    <ul className="space-y-1">
                      {service.outcomes.map((outcome, idx) => (
                        <li key={idx} className="text-xs text-white/60 flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {viewMode === 'advisory' && (
                <div className="space-y-4 mb-4">
                  <p className="text-white/70 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="p-3 bg-blue-500/10 border border-blue-400/20 rounded-lg">
                    <div className="text-xs text-blue-400 font-medium mb-2">Advisory Approach:</div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {service.advisoryApproach}
                    </p>
                  </div>
                </div>
              )}

              {/* Expansion Indicator */}
              <motion.div
                className="flex items-center text-xs text-blue-400/80 hover:text-blue-400"
                animate={{ x: selectedService === service.id ? 5 : 0 }}
              >
                <span className="mr-2">
                  {selectedService === service.id ? 'Click to collapse' : 'Click to expand'}
                </span>
                <motion.div
                  animate={{ rotate: selectedService === service.id ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Personalized Service Recommendations */}
        {journeyState.userType && (
          <motion.div 
            className="mt-20 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-8">
              <h3 className="text-xl font-medium text-white mb-4 text-center">
                Recommended for {journeyState.userType.replace('-', ' ')}
              </h3>
              
              <div className="text-center space-y-4">
                <p className="text-white/80 leading-relaxed">
                  {journeyState.userType === 'cmo' && 
                    "Based on your role, we recommend starting with Strategic Consulting to align your marketing investments with business outcomes, followed by Performance Optimization to maximize ROI."}
                  {journeyState.userType === 'agency-owner' && 
                    "For agency partnerships, we suggest exploring Team Augmentation and Strategic Consulting to scale your capabilities while maintaining your unique value proposition."}
                  {journeyState.userType === 'marketer' && 
                    "As a marketing professional, Creative Excellence and Integrated Campaigns can help you deliver breakthrough results while building your professional reputation."}
                  {journeyState.userType === 'explorer' && 
                    "We recommend starting with a Strategic Consulting conversation to understand your unique challenges and identify the right service mix for your goals."}
                </p>
                
                <motion.button
                  className="inline-flex items-center px-6 py-3 bg-blue-500/20 border border-blue-400/30 text-blue-400 rounded-full hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    recordInteraction('personalized-consultation-request')
                    document.getElementById('personalized-contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Discuss Your Needs
                  <motion.span className="ml-2" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    →
                  </motion.span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}