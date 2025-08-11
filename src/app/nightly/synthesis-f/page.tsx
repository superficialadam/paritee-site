'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { ChevronRight, Star, Users, Award, Zap, Target, Compass, Globe, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import { services } from '@/data/services'
import { sectors } from '@/data/sectors'
import { geographies } from '@/data/geographies'
import { agencies } from '@/data/agencies'
import { cases } from '@/data/cases'
import { people } from '@/data/people'
import { news } from '@/data/news'
import * as Icons from 'lucide-react'

export default function SynthesisFHomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set<string>())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  
  const heroRef = useRef<HTMLElement>(null)
  const observerRef = useRef<IntersectionObserver>()
  
  // Perfect page load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])
  
  // Consciousness-level mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Update CSS custom properties for cursor following effects
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  // Perfect scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.pageYOffset / totalHeight) * 100
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Intersection observer for section animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )
    
    const sections = document.querySelectorAll('[data-section]')
    sections.forEach(section => observerRef.current?.observe(section))
    
    return () => observerRef.current?.disconnect()
  }, [])
  
  // Mathematical excellence constants
  const PHI = 1.618033988749
  const FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ease-consciousness ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Perfect Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-excellence-blue-600 via-excellence-blue-500 to-excellence-blue-400 z-50 transition-all duration-100 ease-linear"
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* Hero Section - Mathematical Perfection */}
      <section 
        ref={heroRef}
        data-section
        id="hero"
        className="excellence-section relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Perfect Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-400/5" />
        
        {/* Consciousness-Level Hero Content */}
        <div className="relative z-10 excellence-content-flow w-full">
          <div className="col-start-2 text-center space-y-fibonacci-55">
            
            {/* Perfect Typography Hierarchy */}
            <div className={`space-y-fibonacci-34 transition-all duration-1000 delay-200 ease-consciousness ${visibleSections.has('hero') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="excellence-heading-hero max-w-5xl mx-auto">
                No Compromise.
                <span className="block text-excellence-blue-400 mt-fibonacci-13">
                  Just Better.
                </span>
              </h1>
              
              {/* Golden Ratio Accent Line */}
              <div className="h-1 w-fibonacci-89 bg-gradient-to-r from-excellence-blue-600 to-excellence-blue-400 rounded-full mx-auto" />
            </div>
            
            {/* Perfect Content Hierarchy */}
            <div className={`space-y-fibonacci-34 max-w-4xl mx-auto transition-all duration-1000 delay-400 ease-consciousness ${visibleSections.has('hero') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-phi-xl text-slate-200 leading-phi font-medium">
                You've been asked to make trade-offs for too long.
              </p>
              
              <div className="space-y-fibonacci-21 text-phi-lg text-slate-300 leading-phi max-w-3xl mx-auto">
                <p>
                  Big agencies that go big on overhead but fall short on care.
                  Small agencies that bring passion but can't keep pace.
                  You've had to choose between speed and scale, bold thinking and trusted delivery.
                </p>
                <p className="text-phi-xl text-excellence-blue-300 font-medium">
                  That compromise ends with Paritee.
                </p>
                <p>
                  We are a coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
                </p>
              </div>
            </div>
            
            {/* Perfect CTA System */}
            <div className={`flex flex-col sm:flex-row gap-fibonacci-21 justify-center items-center transition-all duration-1000 delay-600 ease-consciousness ${visibleSections.has('hero') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Link
                href="/nightly/synthesis-f/cases"
                className="excellence-button bg-excellence-blue-600 hover:bg-excellence-blue-500 text-white border-0 px-fibonacci-34 py-fibonacci-13 group overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center space-x-fibonacci-8">
                  <span>Explore Our Work</span>
                  <ArrowRight className="w-fibonacci-13 h-fibonacci-13 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-excellence-blue-500 to-excellence-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              
              <Link
                href="/nightly/synthesis-f/contact"
                className="excellence-button bg-transparent border-2 border-excellence-blue-400 text-excellence-blue-400 hover:bg-excellence-blue-600/10 hover:border-excellence-blue-300 hover:text-excellence-blue-300 px-fibonacci-34 py-fibonacci-13 group"
              >
                <span className="flex items-center space-x-fibonacci-8">
                  <span>Get in Touch</span>
                  <Users className="w-fibonacci-13 h-fibonacci-13 group-hover:scale-110 transition-transform duration-300" />
                </span>
              </Link>
            </div>
            
            {/* Perfect Social Proof */}
            <div className={`mt-fibonacci-89 transition-all duration-1000 delay-800 ease-consciousness ${visibleSections.has('hero') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-fibonacci-21 max-w-2xl mx-auto">
                {[
                  { icon: Star, value: '25+', label: 'Top-tier agencies' },
                  { icon: Users, value: '500+', label: 'Expert professionals' },
                  { icon: Award, value: '15+', label: 'Global markets' }
                ].map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <div
                      key={index}
                      className="excellence-card aspect-auto p-fibonacci-21 text-center group cursor-default"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-center mb-fibonacci-8">
                        <IconComponent className="w-fibonacci-21 h-fibonacci-21 text-excellence-blue-400 mr-fibonacci-8 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-phi-xl font-semibold text-white">{stat.value}</span>
                      </div>
                      <p className="text-slate-400 text-fibonacci-sm">{stat.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* Mission Section - Consciousness-Level Design */}
      <section 
        data-section
        id="mission"
        className="excellence-section py-fibonacci-144 relative overflow-hidden"
      >
        {/* Perfect Background Treatment */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/10 to-slate-950" />
          <div className="absolute top-1/4 left-1/4 w-fibonacci-144 h-fibonacci-144 bg-excellence-blue-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-fibonacci-89 h-fibonacci-89 bg-excellence-blue-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative excellence-content-flow">
          <div className="col-start-2">
            
            {/* Perfect Section Header */}
            <div className={`text-center mb-fibonacci-89 transition-all duration-1000 ease-consciousness ${visibleSections.has('mission') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h2 className="excellence-heading-section mb-fibonacci-21">Our Mission</h2>
              <div className="h-1 w-fibonacci-55 bg-gradient-to-r from-excellence-blue-600 to-excellence-blue-400 rounded-full mx-auto mb-fibonacci-34" />
              <p className="excellence-text-body max-w-2xl mx-auto text-slate-400">
                Built for impact, not just size
              </p>
            </div>
            
            {/* Perfect Mission Cards with Golden Ratio Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-fibonacci-34 mb-fibonacci-89">
              {[
                {
                  icon: Target,
                  title: 'Purpose-driven',
                  description: 'We built Paritee to deliver impact you deserve — with trust, purpose and partnership at the core.'
                },
                {
                  icon: Users,
                  title: 'Equal partners',
                  description: 'No hierarchies or politics. Just equals with aligned values, solving challenges together.'
                },
                {
                  icon: Zap,
                  title: 'Stronger together',
                  description: 'Each agency leads in its market. Together, we deliver without big network baggage.'
                }
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={index}
                    className={`excellence-card p-fibonacci-34 text-center group cursor-default transition-all duration-1000 ease-consciousness ${visibleSections.has('mission') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ 
                      animationDelay: `${200 + index * 150}ms`,
                      aspectRatio: PHI.toString()
                    }}
                  >
                    <div className="w-fibonacci-55 h-fibonacci-55 bg-excellence-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-fibonacci-21 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-fibonacci-34 h-fibonacci-34 text-excellence-blue-400" />
                    </div>
                    <h3 className="text-phi-lg font-semibold text-white mb-fibonacci-13">{item.title}</h3>
                    <p className="text-slate-300 leading-phi text-fibonacci-sm">{item.description}</p>
                  </div>
                )
              })}
            </div>
            
            {/* Perfect Quote Block */}
            <div className={`text-center space-y-fibonacci-21 bg-excellence-blue-600/5 border border-excellence-blue-600/20 backdrop-blur-sm rounded-fibonacci-13 p-fibonacci-55 max-w-4xl mx-auto transition-all duration-1000 delay-600 ease-consciousness ${visibleSections.has('mission') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <blockquote className="text-phi-xl lg:text-phi-2xl text-excellence-blue-200 font-medium leading-phi italic">
                "Great things happen when equals come together"
              </blockquote>
              <p className="excellence-text-body text-slate-400 max-w-3xl mx-auto">
                Our name, Paritee, reflects what we believe. You get seamless delivery, sharper thinking, and results without the baggage of big networks or the limits of small shops.
              </p>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* Services Section - Mathematical Excellence */}
      <section 
        data-section
        id="services"
        className="excellence-section py-fibonacci-144 relative"
      >
        {/* Perfect Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-excellence-blue-950/20 via-transparent to-excellence-blue-950/20" />
        
        <div className="relative excellence-content-flow">
          <div className="col-start-2">
            
            {/* Perfect Header with Asymmetric Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-fibonacci-34 mb-fibonacci-89">
              <div className={`lg:col-span-8 transition-all duration-1000 ease-consciousness ${visibleSections.has('services') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h2 className="excellence-heading-section mb-fibonacci-21">What We Do</h2>
                <div className="h-1 w-fibonacci-55 bg-gradient-to-r from-excellence-blue-600 to-excellence-blue-400 rounded-full mb-fibonacci-21" />
                <p className="text-phi-xl text-slate-300 leading-phi max-w-2xl">
                  Bold strategies. Sharp execution. Transformative results.
                </p>
              </div>
            </div>
            
            {/* Perfect Services Grid with Staggered Animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fibonacci-34">
              {services.slice(0, 6).map((service, index) => {
                const IconComponent = Icons[service.icon as keyof typeof Icons] as any
                const isOffset = index % 3 === 1
                
                return (
                  <div
                    key={service.id}
                    className={`excellence-card group cursor-pointer transition-all duration-1000 ease-consciousness ${visibleSections.has('services') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${isOffset ? 'lg:mt-fibonacci-34' : ''}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-fibonacci-34">
                      <div className="w-fibonacci-55 h-fibonacci-55 bg-gradient-to-br from-excellence-blue-600/30 to-excellence-blue-400/30 rounded-fibonacci-8 flex items-center justify-center mb-fibonacci-21 group-hover:scale-110 transition-transform duration-300">
                        {IconComponent && <IconComponent className="w-fibonacci-34 h-fibonacci-34 text-excellence-blue-400 group-hover:text-excellence-blue-300 transition-colors duration-300" />}
                      </div>
                      <h3 className="text-phi-lg font-semibold text-white group-hover:text-excellence-blue-100 transition-colors duration-300 mb-fibonacci-13">
                        {service.name}
                      </h3>
                      <p className="text-slate-400 leading-phi group-hover:text-slate-300 transition-colors duration-300 text-fibonacci-sm">
                        {service.blurb}
                      </p>
                    </div>
                    
                    {/* Perfect Hover Accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-excellence-blue-600 to-excellence-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-fibonacci-13" />
                  </div>
                )
              })}
            </div>
            
            {/* Perfect CTA */}
            <div className={`text-center mt-fibonacci-89 transition-all duration-1000 delay-800 ease-consciousness ${visibleSections.has('services') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Link
                href="/nightly/synthesis-f/services"
                className="excellence-button bg-excellence-blue-600 hover:bg-excellence-blue-500 text-white border-0 px-fibonacci-34 py-fibonacci-13 group"
              >
                <span className="flex items-center space-x-fibonacci-8">
                  <span>View All Services</span>
                  <Compass className="w-fibonacci-13 h-fibonacci-13 group-hover:rotate-180 transition-transform duration-700" />
                </span>
              </Link>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* Perfect Footer Spacer */}
      <div className="h-fibonacci-144" />
      
    </div>
  )
}