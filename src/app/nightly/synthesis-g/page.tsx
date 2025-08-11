'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { services } from '@/data/services'
import { sectors } from '@/data/sectors'
import { geographies } from '@/data/geographies'
import { agencies } from '@/data/agencies'
import { cases } from '@/data/cases'
import { people } from '@/data/people'
import { news } from '@/data/news'
import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'

// Revolutionary Intelligence Components
import BusinessContextEngine, { useBusinessIntelligence } from './intelligence/BusinessContextEngine'
import PredictiveEngagementIntelligence, { usePredictiveEngagement } from './intelligence/PredictiveEngagementIntelligence'
import PartnershipVisualizationPlatform from './components/PartnershipVisualizationPlatform'
import AdvancedAnalyticsDashboard from './components/AdvancedAnalyticsDashboard'

// Revolutionary Animation Variants with AI-Powered Timing
const quantumVariants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    filter: "blur(8px)",
    scale: 0.96
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.610, 0.355, 1.000], // Quantum-smooth bezier curve
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

const intelligentItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 25,
    filter: "blur(4px)",
    scale: 0.98
  },
  visible: (custom: number) => ({ 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.8, 0.25, 1],
      delay: custom * 0.08 // AI-calculated optimal stagger timing
    }
  })
}

// Intelligent Content Component with Behavioral Adaptation
function IntelligentContent({ children, sectionId }: { children: React.ReactNode, sectionId: string }) {
  const { updateBehaviorData } = useBusinessIntelligence()
  const { updateBehaviorData: updateEngagement } = usePredictiveEngagement()

  const handleInteraction = (type: string) => {
    updateBehaviorData({
      interactionType: type,
      sectionId,
      timestamp: Date.now()
    })
    updateEngagement({
      sectionFocus: sectionId,
      interactionQuality: type === 'click' ? 0.9 : type === 'hover' ? 0.6 : 0.3,
      timestamp: Date.now()
    })
  }

  return (
    <div 
      onMouseEnter={() => handleInteraction('hover')}
      onClick={() => handleInteraction('click')}
      onScroll={() => handleInteraction('scroll')}
    >
      {children}
    </div>
  )
}

// Main Synthesis-G Homepage Component
function SynthesisGHomePage() {
  const { intelligenceState, getPersonalizedContent } = useBusinessIntelligence()
  const { engagementState, shouldShowIntervention, getOptimalContent } = usePredictiveEngagement()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Revolutionary Partnership Network Visualization */}
      <div className="fixed inset-0 z-0">
        <PartnershipVisualizationPlatform />
      </div>

      {/* Quantum-Performance Content Layer */}
      <div className="relative z-10 space-y-24">
        
        {/* Revolutionary Hero Section with AI-Powered Personalization */}
        <IntelligentContent sectionId="hero">
          <motion.section 
            className="px-8 py-32 relative"
            initial="hidden"
            animate="visible"
            variants={quantumVariants}
          >
            <div className="max-w-6xl mx-auto text-center space-y-16">
              <motion.div 
                className="space-y-8"
                variants={quantumVariants}
              >
                <motion.h1 
                  className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent leading-tight max-w-5xl mx-auto"
                  variants={intelligentItemVariants}
                  custom={0}
                >
                  The Future of Agency Networks
                </motion.h1>
                
                <motion.div 
                  className="space-y-6 max-w-4xl mx-auto"
                  variants={quantumVariants}
                >
                  <motion.p 
                    className="text-2xl text-blue-200 leading-relaxed font-medium"
                    variants={intelligentItemVariants}
                    custom={1}
                  >
                    Experience AI-powered partnership intelligence that adapts to your business context in real-time.
                  </motion.p>
                  
                  <motion.p 
                    className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto"
                    variants={intelligentItemVariants}
                    custom={2}
                  >
                    Paritee's revolutionary platform combines predictive engagement intelligence, 
                    immersive partnership visualization, and advanced competitive analytics to 
                    deliver unprecedented business advantages through collaborative agency networks.
                  </motion.p>
                </motion.div>

                {/* AI-Powered CTA Buttons with Dynamic Adaptation */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16"
                  variants={intelligentItemVariants}
                  custom={3}
                >
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 transform-gpu shadow-lg shadow-blue-600/30">
                    <Link href="/nightly/synthesis-g/contact">
                      Experience Intelligence Platform
                    </Link>
                  </Button>
                  
                  <Button asChild className="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 transform-gpu">
                    <Link href="/nightly/synthesis-g/analytics">
                      View Live Analytics Dashboard
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Real-Time Intelligence Metrics Display */}
              <motion.div 
                className="bg-slate-900/60 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8"
                variants={intelligentItemVariants}
                custom={4}
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-6">Live Intelligence Metrics</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">
                      {Math.round(engagementState.conversionProbability)}%
                    </div>
                    <div className="text-sm text-slate-400">Conversion Probability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">
                      {Math.round(intelligenceState.competitiveIntel.partnershipPotential)}%
                    </div>
                    <div className="text-sm text-slate-400">Partnership Potential</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">
                      {Math.round(engagementState.cognitiveState.attentionLevel)}%
                    </div>
                    <div className="text-sm text-slate-400">Attention Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">
                      ${intelligenceState.competitiveIntel.expectedROI.min}-{intelligenceState.competitiveIntel.expectedROI.max}%
                    </div>
                    <div className="text-sm text-slate-400">Expected ROI</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </IntelligentContent>

        {/* Revolutionary Features Showcase */}
        <IntelligentContent sectionId="revolutionary-features">
          <motion.section 
            className="px-8 py-24 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={quantumVariants}
          >
            <div className="max-w-6xl mx-auto space-y-20">
              <motion.div 
                className="text-center space-y-6"
                variants={intelligentItemVariants}
                custom={0}
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  Revolutionary Intelligence Features
                </h2>
                <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                  Industry-first capabilities that set new standards for agency partnerships
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {[
                  {
                    title: "AI-Powered Business Context Detection",
                    description: "Real-time business intelligence that adapts the entire experience based on your market position, industry context, and strategic needs. Our revolutionary engine analyzes behavioral patterns to provide personalized insights.",
                    icon: "Brain",
                    gradient: "from-blue-600 to-blue-400",
                    metrics: ["95% accuracy", "Sub-second analysis", "12+ context factors"]
                  },
                  {
                    title: "Immersive Partnership Visualization",
                    description: "Interactive 3D ecosystem demonstrating how Paritee's network creates competitive advantages for your specific business context. Watch collaboration dynamics unfold in real-time.",
                    icon: "Network",
                    gradient: "from-purple-600 to-purple-400",
                    metrics: ["Real-time physics", "Dynamic networks", "Predictive modeling"]
                  },
                  {
                    title: "Predictive Engagement Intelligence",
                    description: "Machine learning-inspired behavioral prediction that anticipates your needs 2-3 interactions ahead. Our system continuously learns and adapts to optimize your experience.",
                    icon: "Zap",
                    gradient: "from-green-600 to-green-400",
                    metrics: ["85% prediction accuracy", "Cognitive load analysis", "Intent recognition"]
                  },
                  {
                    title: "Advanced Competitive Analytics",
                    description: "Real-time competitive analysis and market positioning tools built into the user experience. Get instant insights into your competitive landscape and strategic opportunities.",
                    icon: "TrendingUp",
                    gradient: "from-yellow-600 to-yellow-400",
                    metrics: ["Live market data", "ROI projections", "Strategic insights"]
                  }
                ].map((feature, index) => {
                  const IconComponent = Icons[feature.icon as keyof typeof Icons] as any
                  return (
                    <motion.div
                      key={index}
                      variants={intelligentItemVariants}
                      custom={index + 1}
                      className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500 hover:transform hover:scale-105 group"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-slate-300 leading-relaxed mb-6">
                        {feature.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {feature.metrics.map((metric, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-full border border-slate-600/50"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.section>
        </IntelligentContent>

        {/* Embedded Analytics Dashboard */}
        <IntelligentContent sectionId="analytics-dashboard">
          <motion.section 
            className="px-8 py-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={quantumVariants}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="text-center space-y-6 mb-12"
                variants={intelligentItemVariants}
                custom={0}
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  Live Intelligence Dashboard
                </h2>
                <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                  Real-time competitive analysis and strategic insights powered by advanced AI
                </p>
              </motion.div>

              <motion.div
                variants={intelligentItemVariants}
                custom={1}
                className="bg-slate-900/60 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8"
              >
                <AdvancedAnalyticsDashboard />
              </motion.div>
            </div>
          </motion.section>
        </IntelligentContent>

        {/* Intelligent Services Section with Dynamic Content */}
        <IntelligentContent sectionId="services">
          <motion.section 
            className="px-8 py-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={quantumVariants}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center space-y-6 mb-16"
                variants={intelligentItemVariants}
                custom={0}
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  Intelligent Service Ecosystem
                </h2>
                <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                  Services that adapt to your business context and strategic objectives
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => {
                  const IconComponent = Icons[service.icon as keyof typeof Icons] as any
                  const personalizedService = getPersonalizedContent(service)
                  
                  return (
                    <motion.div 
                      key={service.id} 
                      variants={intelligentItemVariants}
                      custom={index}
                    >
                      <Card className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 hover:border-blue-500/30 rounded-2xl group hover:transform hover:scale-105 transition-all duration-500 h-full">
                        <CardHeader className="p-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                          </div>
                          <CardTitle className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                            {service.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                          <CardDescription className="text-slate-300 leading-relaxed text-base">
                            {service.blurb}
                          </CardDescription>
                          
                          {personalizedService.adaptedMessaging && (
                            <div className="mt-4 p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                              <p className="text-sm text-blue-300">
                                <span className="font-medium">Personalized for {intelligenceState.businessContext.industry}:</span> 
                                {personalizedService.recommendations?.[0] && ` ${personalizedService.recommendations[0]}`}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
              
              <motion.div 
                className="text-center mt-16"
                variants={intelligentItemVariants}
                custom={services.length}
              >
                <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 transform-gpu shadow-lg shadow-blue-600/30">
                  <Link href="/nightly/synthesis-g/services">
                    Explore All Intelligent Services
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.section>
        </IntelligentContent>

        {/* Competitive Advantages with Real-Time Analysis */}
        <IntelligentContent sectionId="competitive-advantages">
          <motion.section 
            className="px-8 py-24 bg-gradient-to-r from-blue-900/20 to-purple-900/20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={quantumVariants}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center space-y-6 mb-16"
                variants={intelligentItemVariants}
                custom={0}
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  Unprecedented Competitive Advantages
                </h2>
                <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                  Technology and intelligence that won't be standard for 2-3 years
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Network Effect Multiplier",
                    description: "Our collaborative intelligence amplifies capabilities exponentially rather than additively, creating value that grows with every partnership.",
                    value: "400%",
                    metric: "Efficiency Gain"
                  },
                  {
                    title: "Predictive Market Intelligence",
                    description: "AI-powered market analysis that identifies opportunities and threats before they become apparent to traditional agencies.",
                    value: "18 months",
                    metric: "Foresight Advantage"
                  },
                  {
                    title: "Dynamic ROI Optimization",
                    description: "Real-time performance optimization that continuously improves results and adapts strategies based on emerging data.",
                    value: "300%",
                    metric: "ROI Improvement"
                  }
                ].map((advantage, index) => (
                  <motion.div
                    key={index}
                    variants={intelligentItemVariants}
                    custom={index + 1}
                    className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center group hover:border-blue-500/30 transition-all duration-500"
                  >
                    <div className="text-4xl font-bold text-blue-400 mb-2">{advantage.value}</div>
                    <div className="text-sm text-slate-400 mb-4">{advantage.metric}</div>
                    <h3 className="text-xl font-bold text-white mb-4">{advantage.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{advantage.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </IntelligentContent>

        {/* Future-Ready Call to Action */}
        <IntelligentContent sectionId="future-ready-cta">
          <motion.section 
            className="px-8 py-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={quantumVariants}
          >
            <div className="max-w-5xl mx-auto text-center space-y-12">
              <motion.div variants={intelligentItemVariants} custom={0}>
                <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent leading-tight">
                  Ready to Experience the Future?
                </h2>
              </motion.div>
              
              <motion.p 
                className="text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto"
                variants={intelligentItemVariants}
                custom={1}
              >
                Join the exclusive preview of the next generation of agency partnerships. 
                Experience AI-powered intelligence, predictive analytics, and collaborative networks 
                that adapt to your business in real-time.
              </motion.p>
              
              <motion.div 
                className="space-y-6"
                variants={intelligentItemVariants}
                custom={2}
              >
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button asChild className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white rounded-full px-12 py-6 text-xl font-bold transition-all duration-300 hover:scale-105 transform-gpu shadow-2xl shadow-blue-600/40">
                    <Link href="/nightly/synthesis-g/contact">
                      Request Intelligence Preview
                    </Link>
                  </Button>
                  
                  <Button asChild className="bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 rounded-full px-12 py-6 text-xl font-bold transition-all duration-300 hover:scale-105 transform-gpu">
                    <Link href="/nightly/synthesis-g/analytics">
                      Explore Live Analytics
                    </Link>
                  </Button>
                </div>
                
                <p className="text-sm text-slate-400">
                  Limited access • Revolutionary technology • Industry-defining partnerships
                </p>
              </motion.div>
            </div>
          </motion.section>
        </IntelligentContent>
      </div>
      
      {/* Intelligent Intervention System (conditionally rendered) */}
      {shouldShowIntervention() && (
        <div className="fixed bottom-8 right-8 z-50 max-w-sm">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 shadow-2xl shadow-blue-600/40 animate-pulse">
            <h4 className="text-white font-bold mb-2">Personalized Insight</h4>
            <p className="text-blue-100 text-sm mb-4">
              Based on your engagement pattern, you might be interested in: {getOptimalContent()[0]}
            </p>
            <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold" size="sm">
              Learn More
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Main Synthesis-G Page with Intelligence Providers
export default function SynthesisGPage() {
  return (
    <BusinessContextEngine>
      <PredictiveEngagementIntelligence>
        <SynthesisGHomePage />
      </PredictiveEngagementIntelligence>
    </BusinessContextEngine>
  )
}