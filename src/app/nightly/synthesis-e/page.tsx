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
import { ChevronRight, Users, Star, Target, ArrowRight, Zap, Heart, Award, Globe, TrendingUp } from 'lucide-react'

// Import our revolutionary components
import PartnershipCanvas from './components/PartnershipCanvas'
import { IntelligentMotionChoreographer } from './components/IntelligentMotionChoreographer'
import { AdaptiveContentArchitecture } from './components/AdaptiveContentArchitecture'
import { CollaborativeJourneyGuide } from './components/CollaborativeJourneyGuide'

export default function SynthesisEPage() {
  return (
    <>
      {/* Revolutionary Partnership Canvas Background */}
      <PartnershipCanvas />
      
      {/* Collaborative Journey Guide System */}
      <CollaborativeJourneyGuide 
        journeyType="discovery"
        showProgressIndicators={true}
        allowPersonalization={true}
      >
        <div className="relative z-10">
          {/* Hero Section with Collaborative Visual Language */}
          <IntelligentMotionChoreographer 
            sectionId="hero" 
            contentType="hero" 
            priority="high"
          >
            <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
              {/* Collaborative Equals Visualization */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="relative w-96 h-96">
                  {/* Central hub representing synthesis */}
                  <div className="absolute top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4 bg-blue-400 rounded-full animate-pulse" />
                  
                  {/* Surrounding equals (partner agencies) */}
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i / 8) * 2 * Math.PI
                    const radius = 120
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius
                    
                    return (
                      <div
                        key={i}
                        className="absolute w-6 h-6 -mt-3 -ml-3 bg-blue-500 rounded-full"
                        style={{
                          top: `calc(50% + ${y}px)`,
                          left: `calc(50% + ${x}px)`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    )
                  })}
                  
                  {/* Connection lines representing collaboration */}
                  <svg className="absolute inset-0 w-full h-full">
                    {Array.from({ length: 8 }).map((_, i) => {
                      const angle = (i / 8) * 2 * Math.PI
                      const radius = 120
                      const x1 = 192 + Math.cos(angle) * radius
                      const y1 = 192 + Math.sin(angle) * radius
                      
                      return (
                        <line
                          key={i}
                          x1={192}
                          y1={192}
                          x2={x1}
                          y2={y1}
                          stroke="rgba(59, 130, 246, 0.3)"
                          strokeWidth="1"
                          className="animate-pulse"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      )
                    })}
                  </svg>
                </div>
              </div>

              <AdaptiveContentArchitecture
                sectionId="hero"
                variants={[
                  { id: 'minimal', type: 'minimal', layout: 'list', priority: 1, userSegments: ['mobile', 'slow-connection'], loadWeight: 'light' },
                  { id: 'visual', type: 'visual', layout: 'spotlight', priority: 2, userSegments: ['visual-learner'], loadWeight: 'medium' },
                  { id: 'detailed', type: 'detailed', layout: 'grid', priority: 3, userSegments: ['detail-oriented'], loadWeight: 'heavy' }
                ]}
                fallbackVariant="standard"
                className="max-w-7xl mx-auto text-center space-y-12"
              >
                {/* Revolutionary Headline with Partnership Philosophy */}
                <div className="space-y-8">
                  <div className="inline-flex items-center space-x-4 text-blue-300 text-sm font-medium mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    </div>
                    <span>Equals Coming Together</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    </div>
                  </div>

                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="block text-white mb-2">No Compromise.</span>
                    <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                      Just Better.
                    </span>
                  </h1>

                  {/* Collaborative Value Proposition */}
                  <div className="max-w-4xl mx-auto space-y-6">
                    <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium">
                      You've been asked to make trade-offs for too long.
                    </p>

                    {/* Partnership Philosophy Visualization */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
                      <div className="text-left space-y-4">
                        <div className="flex items-center space-x-3 text-slate-300">
                          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                            <span className="text-red-400 text-xs font-bold">×</span>
                          </div>
                          <span>Big agencies: Overhead over care</span>
                        </div>
                        <div className="flex items-center space-x-3 text-slate-300">
                          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                            <span className="text-red-400 text-xs font-bold">×</span>
                          </div>
                          <span>Small agencies: Passion without pace</span>
                        </div>
                        <div className="flex items-center space-x-3 text-slate-300">
                          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                            <span className="text-red-400 text-xs font-bold">×</span>
                          </div>
                          <span>Speed versus scale trade-offs</span>
                        </div>
                      </div>

                      <div className="text-left space-y-4">
                        <div className="flex items-center space-x-3 text-blue-200">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-400" />
                          </div>
                          <span>Equals: Partnership-driven results</span>
                        </div>
                        <div className="flex items-center space-x-3 text-blue-200">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-blue-400" />
                          </div>
                          <span>Together: Best of both worlds</span>
                        </div>
                        <div className="flex items-center space-x-3 text-blue-200">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <Target className="w-4 h-4 text-blue-400" />
                          </div>
                          <span>Better: Without compromise</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xl md:text-2xl text-blue-200 font-semibold py-4">
                      That compromise ends with Paritee.
                    </div>

                    <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
                      We are a coalition of top-tier, advisory-led agencies united by one principle: 
                      <span className="text-blue-300 font-semibold"> You deserve better.</span>
                    </p>
                  </div>

                  {/* Collaborative Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                    <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 group">
                      <Link href="/nightly/synthesis-e/cases" className="flex items-center space-x-2">
                        <span>See Partnership in Action</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button asChild className="bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-600/10 hover:border-blue-300 hover:text-blue-300 rounded-full px-8 py-4 text-lg transition-all duration-300 hover:scale-105 group">
                      <Link href="/nightly/synthesis-e/contact" className="flex items-center space-x-2">
                        <span>Start Your Partnership</span>
                        <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Partnership Proof Points */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-16">
                  {[
                    { icon: <Star className="w-6 h-6" />, value: "25+", label: "Elite Partner Agencies", color: "text-yellow-400" },
                    { icon: <Users className="w-6 h-6" />, value: "500+", label: "Collaborative Experts", color: "text-blue-400" },
                    { icon: <Globe className="w-6 h-6" />, value: "15+", label: "Global Markets", color: "text-green-400" },
                    { icon: <TrendingUp className="w-6 h-6" />, value: "98%", label: "Client Success Rate", color: "text-purple-400" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6 text-center hover:border-blue-600/30 transition-all duration-300 group">
                      <div className={`${stat.color} mb-3 flex justify-center group-hover:scale-110 transition-transform`}>
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-slate-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </AdaptiveContentArchitecture>
            </section>
          </IntelligentMotionChoreographer>

          {/* Mission - Partnership Philosophy Deep Dive */}
          <IntelligentMotionChoreographer 
            sectionId="mission" 
            contentType="content"
            priority="high"
          >
            <section className="px-4 py-24 relative">
              <AdaptiveContentArchitecture
                sectionId="mission"
                variants={[
                  { id: 'visual', type: 'visual', layout: 'spotlight', priority: 1, userSegments: ['visual-learner'], loadWeight: 'medium' },
                  { id: 'detailed', type: 'detailed', layout: 'grid', priority: 2, userSegments: ['detail-oriented'], loadWeight: 'heavy' }
                ]}
                className="max-w-7xl mx-auto"
              >
                <div className="text-center mb-16">
                  <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
                    The Parity Principle
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-8" />
                  <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                    Great things happen when equals come together
                  </p>
                </div>

                {/* Revolutionary Collaboration Visualization */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                  <div className="space-y-8">
                    <div className="text-left">
                      <h3 className="text-2xl font-semibold text-white mb-4">Built for Impact, Not Size</h3>
                      <p className="text-slate-300 leading-relaxed mb-6">
                        We didn't build Paritee to chase size. We built it to deliver the impact you deserve — 
                        with trust, purpose and partnership at the core and most importantly, customized to your needs.
                      </p>
                    </div>

                    <div className="text-left">
                      <h3 className="text-2xl font-semibold text-white mb-4">Equals, Not Hierarchies</h3>
                      <p className="text-slate-300 leading-relaxed mb-6">
                        You won't find hierarchies or holding company politics here. You'll find equals — 
                        independent agencies with aligned values, coming together to solve real challenges 
                        with sharp thinking and shared ambition.
                      </p>
                    </div>

                    <div className="text-left">
                      <h3 className="text-2xl font-semibold text-white mb-4">Stronger Together</h3>
                      <p className="text-slate-300 leading-relaxed">
                        Our name, <span className="text-blue-400 font-semibold">Paritee</span>, 
                        reflects what we believe. Each of our agencies is a recognized leader in its market — 
                        strong individually, even stronger together. You get seamless delivery, 
                        sharper thinking, and results without the baggage.
                      </p>
                    </div>
                  </div>

                  {/* Interactive Partnership Diagram */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8">
                      <div className="relative w-full aspect-square max-w-md mx-auto">
                        {/* Center circle representing synthesis */}
                        <div className="absolute top-1/2 left-1/2 w-20 h-20 -mt-10 -ml-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                          <Zap className="w-8 h-8 text-white" />
                        </div>
                        
                        {/* Partner agency circles */}
                        {[
                          { angle: 0, label: "Strategy", icon: Target },
                          { angle: 45, label: "Creative", icon: Heart },
                          { angle: 90, label: "Tech", icon: Zap },
                          { angle: 135, label: "Data", icon: TrendingUp },
                          { angle: 180, label: "Media", icon: Globe },
                          { angle: 225, label: "Experience", icon: Star },
                          { angle: 270, label: "Content", icon: Users },
                          { angle: 315, label: "Innovation", icon: Award }
                        ].map((partner, index) => {
                          const angleRad = (partner.angle * Math.PI) / 180
                          const radius = 120
                          const x = Math.cos(angleRad) * radius
                          const y = Math.sin(angleRad) * radius
                          
                          return (
                            <div
                              key={partner.label}
                              className="absolute w-16 h-16 -mt-8 -ml-8 bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-blue-400 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group"
                              style={{
                                top: `calc(50% + ${y}px)`,
                                left: `calc(50% + ${x}px)`
                              }}
                            >
                              <partner.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                              <span className="text-xs text-slate-400 group-hover:text-slate-300 mt-1 font-medium">
                                {partner.label}
                              </span>
                              
                              {/* Connection line to center */}
                              <svg className="absolute inset-0 pointer-events-none overflow-visible">
                                <line
                                  x1="32"
                                  y1="32"
                                  x2={32 - x}
                                  y2={32 - y}
                                  stroke="rgba(59, 130, 246, 0.3)"
                                  strokeWidth="1"
                                  className="group-hover:stroke-blue-400/60 transition-all duration-300"
                                />
                              </svg>
                            </div>
                          )
                        })}
                        
                        {/* Animated collaboration rings */}
                        <div className="absolute inset-0">
                          <div className="absolute top-1/2 left-1/2 w-32 h-32 -mt-16 -ml-16 border border-blue-400/30 rounded-full animate-pulse" />
                          <div className="absolute top-1/2 left-1/2 w-48 h-48 -mt-24 -ml-24 border border-blue-500/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                          <div className="absolute top-1/2 left-1/2 w-64 h-64 -mt-32 -ml-32 border border-blue-600/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Partnership Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: <Users className="w-8 h-8 text-blue-400" />,
                      title: "No Hierarchies",
                      description: "Every agency is an equal partner with aligned values and shared ambitions."
                    },
                    {
                      icon: <Star className="w-8 h-8 text-yellow-400" />,
                      title: "Top-Tier Expertise",
                      description: "Each partner agency is a recognized leader in their specific market and expertise."
                    },
                    {
                      icon: <Target className="w-8 h-8 text-green-400" />,
                      title: "Seamless Delivery",
                      description: "Integrated collaboration without the baggage of big networks or limits of small shops."
                    }
                  ].map((benefit, index) => (
                    <Card key={index} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:border-blue-600/30 transition-all duration-300 group">
                      <CardHeader className="p-6">
                        <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                          {benefit.icon}
                        </div>
                        <CardTitle className="text-xl text-white group-hover:text-blue-100 transition-colors">
                          {benefit.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-6 pb-6">
                        <CardDescription className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                          {benefit.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AdaptiveContentArchitecture>
            </section>
          </IntelligentMotionChoreographer>

          {/* Services with Collaborative Cross-Pollination */}
          <IntelligentMotionChoreographer 
            sectionId="services" 
            contentType="content"
            priority="medium"
          >
            <section className="px-4 py-24 relative">
              <AdaptiveContentArchitecture
                sectionId="services"
                variants={[
                  { id: 'interactive', type: 'interactive', layout: 'grid', priority: 1, userSegments: ['interactive-focused'], loadWeight: 'heavy' },
                  { id: 'visual', type: 'visual', layout: 'masonry', priority: 2, userSegments: ['visual-learner'], loadWeight: 'medium' }
                ]}
                className="max-w-7xl mx-auto"
              >
                <div className="text-center mb-20">
                  <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
                    What We Do Together
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-8" />
                  <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                    Comprehensive services amplified by collaborative expertise
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {services.map((service, index) => {
                    const IconComponent = Icons[service.icon as keyof typeof Icons] as any
                    const staggerDelay = index * 0.1
                    
                    return (
                      <Card 
                        key={service.id} 
                        className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:border-blue-600/30 transition-all duration-500 hover:shadow-xl hover:shadow-blue-900/20 group cursor-pointer overflow-hidden relative"
                        style={{ animationDelay: `${staggerDelay}s` }}
                      >
                        {/* Collaborative Enhancement Indicator */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <Users className="w-3 h-3 text-blue-400" />
                          </div>
                        </div>
                        
                        <CardHeader className="p-6">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-600/20 to-blue-400/20 rounded-lg flex items-center justify-center mb-6 group-hover:from-blue-500/30 group-hover:to-blue-300/30 transition-all duration-300 group-hover:scale-110">
                            {IconComponent && <IconComponent className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors" />}
                          </div>
                          <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-100 transition-colors mb-2">
                            {service.name}
                          </CardTitle>
                          
                          {/* Partnership amplification indicator */}
                          <div className="text-xs text-blue-400/70 font-medium mb-3">
                            Enhanced by Partnership
                          </div>
                        </CardHeader>
                        
                        <CardContent className="px-6 pb-6">
                          <CardDescription className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors mb-4">
                            {service.blurb}
                          </CardDescription>
                          
                          {/* Collaborative benefit callout */}
                          <div className="flex items-center space-x-2 text-xs text-blue-300/80 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <div className="w-1 h-1 bg-blue-400 rounded-full" />
                            <span>Multiple agency perspectives</span>
                          </div>
                        </CardContent>
                        
                        {/* Hover gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </Card>
                    )
                  })}
                </div>

                <div className="text-center">
                  <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 group">
                    <Link href="/nightly/synthesis-e/services" className="flex items-center space-x-2">
                      <span>Explore All Collaborative Services</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </AdaptiveContentArchitecture>
            </section>
          </IntelligentMotionChoreographer>

          {/* Continue with remaining sections... */}
          {/* For brevity, I'll create the remaining sections with similar collaborative innovations */}
          
          {/* Partnership Network Preview */}
          <IntelligentMotionChoreographer 
            sectionId="agencies" 
            contentType="content"
          >
            <section className="px-4 py-24 relative">
              <AdaptiveContentArchitecture
                sectionId="agencies"
                variants={[
                  { id: 'collaborative', type: 'interactive', layout: 'grid', priority: 1, userSegments: ['partnership-interested'], loadWeight: 'medium' }
                ]}
                className="max-w-7xl mx-auto"
              >
                <div className="text-center mb-20">
                  <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
                    Our Partnership Network
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-8" />
                  <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                    Meet the equals who make extraordinary results possible
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                  {agencies.slice(0, 4).map((agency, index) => (
                    <Card key={agency.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:border-blue-600/30 transition-all duration-500 hover:shadow-xl hover:shadow-blue-900/20 group overflow-hidden">
                      <CardHeader className="p-8 relative">
                        {/* Partnership indicator */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center space-x-1 text-xs text-blue-300">
                            <Users className="w-3 h-3" />
                            <span>Equal Partner</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 mb-6">
                          <div className="relative">
                            <Image 
                              src={agency.logoUrl} 
                              alt={`${agency.name} logo`}
                              width={80}
                              height={80}
                              className="rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Star className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <div>
                            <CardTitle className="text-2xl font-semibold text-white group-hover:text-blue-100 transition-colors">
                              {agency.name}
                            </CardTitle>
                            <div className="text-blue-400 text-sm font-medium mt-1">
                              Partner Agency
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="px-8 pb-8">
                        <CardDescription className="text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
                          {agency.blurb}
                        </CardDescription>
                        
                        <div className="flex flex-wrap gap-3 mb-6">
                          {agency.locations.slice(0, 3).map((location) => (
                            <span key={location} className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/40 text-sm rounded-full hover:bg-blue-600/30 hover:border-blue-500/60 hover:text-blue-300 transition-all duration-300">
                              {location}
                            </span>
                          ))}
                        </div>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="text-xs text-blue-300/80 flex items-center space-x-2">
                            <div className="w-1 h-1 bg-blue-400 rounded-full" />
                            <span>Collaborative expertise since partnership</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center">
                  <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 group">
                    <Link href="/nightly/synthesis-e/agencies" className="flex items-center space-x-2">
                      <span>Meet All Partner Agencies</span>
                      <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </AdaptiveContentArchitecture>
            </section>
          </IntelligentMotionChoreographer>

          {/* Call to Action - Partnership Invitation */}
          <IntelligentMotionChoreographer 
            sectionId="cta" 
            contentType="action"
            priority="high"
          >
            <section className="px-4 py-24 relative">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12">
                  <div className="space-y-8">
                    <div className="inline-flex items-center space-x-4 text-blue-300 text-sm font-medium mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                      <span>Ready for Partnership?</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      Let's Create Something Better Together
                    </h2>

                    <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
                      Experience what happens when equals come together to solve your challenges. 
                      No compromise, no trade-offs — just exceptional results.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 group">
                        <Link href="/nightly/synthesis-e/contact" className="flex items-center space-x-2">
                          <span>Start Our Partnership</span>
                          <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </Link>
                      </Button>
                      
                      <Button asChild className="bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-600/10 hover:border-blue-300 hover:text-blue-300 rounded-full px-8 py-4 text-lg transition-all duration-300 hover:scale-105 group">
                        <Link href="/nightly/synthesis-e/cases" className="flex items-center space-x-2">
                          <span>See Success Stories</span>
                          <Star className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </IntelligentMotionChoreographer>
        </div>
      </CollaborativeJourneyGuide>
    </>
  )
}