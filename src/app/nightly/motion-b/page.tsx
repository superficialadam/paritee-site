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
import { useEffect, useState, useRef } from 'react'

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Page entry animation
  useEffect(() => {
    setIsVisible(true)

    // Setup intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    // Observe all sections
    const sections = document.querySelectorAll('.scroll-animate')
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return (
    <div className="relative">
      {/* Add CSS for animations */}
      <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          .page-enter {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .page-enter.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          .scroll-animate {
            opacity: 0;
            transform: translateY(50px) rotateX(10deg);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .scroll-animate.animate-in {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
          .hover-tilt:hover {
            transform: perspective(1000px) rotateY(5deg) rotateX(5deg) scale(1.05);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .parallax-slow {
            transform: translateY(calc(var(--scroll, 0) * 0.3px));
          }
          .parallax-fast {
            transform: translateY(calc(var(--scroll, 0) * -0.5px));
          }
          .spring-hover {
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
          .spring-hover:hover {
            transform: scale(1.12) rotateZ(2deg);
            box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.35);
          }
          .dynamic-glow:hover {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.4), 0 0 80px rgba(59, 130, 246, 0.2);
            transition: box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      <div className={`page-enter space-y-32 ${isVisible ? 'visible' : ''}`} style={{'--scroll': scrollY} as React.CSSProperties}>
      {/* Hero Section - Parallax Visual Impact */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-animate">
        {/* Dynamic Background with Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-blue-400/20 opacity-50"></div>
        
        {/* Parallax Background Layers */}
        <div className="absolute inset-0 parallax-slow">
          <Image 
            src="/images/hero/image-0-92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg"
            alt="Paritee background"
            fill
            className="object-cover opacity-20 scale-110 hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>
        {/* Floating elements for depth */}
        <div className="absolute inset-0 parallax-fast pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/30 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-500/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-blue-600/25 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Asymmetric Layout Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Large Impact Typography */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent leading-tight">
                  No Compromise.
                  <span className="block text-blue-400 mt-2">Just Better.</span>
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
              </div>
              
              <div className="space-y-6 max-w-2xl">
                <p className="text-xl text-slate-200 leading-relaxed font-medium">
                  You&apos;ve been asked to make trade-offs for too long.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Big agencies that go big on overhead but fall short on care.
                  Small agencies that bring passion but can&apos;t keep pace.
                  You&apos;ve had to choose between speed and scale.
                  Bold thinking and trusted delivery.
                </p>
                <p className="text-xl text-blue-300 leading-relaxed font-medium">
                  That compromise ends with Paritee.
                </p>
                <p className="text-lg text-slate-200 leading-relaxed">
                  We are a coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg spring-hover shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 relative overflow-hidden group">
                  <Link href="/nightly/motion-b/cases">
                    <span className="relative z-10">Explore Our Work</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </Button>
                <Button asChild className="bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-600/10 hover:border-blue-300 hover:text-blue-300 rounded-full px-8 py-4 text-lg spring-hover relative overflow-hidden group">
                  <Link href="/nightly/motion-b/contact">
                    <span className="relative z-10">Get in Touch</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Right Column - Interactive Visual Elements */}
            <div className="lg:col-span-4 flex justify-center items-center">
              <div className="relative hover-tilt">
                <div className="w-72 h-72 bg-gradient-to-br from-blue-600/20 to-blue-400/30 rounded-full blur-3xl animate-pulse hover:blur-2xl transition-all duration-500 dynamic-glow"></div>
                <div className="absolute inset-0 w-64 h-64 bg-gradient-to-tr from-blue-500/30 to-blue-300/40 rounded-full blur-2xl animate-pulse delay-1000 m-4 hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute inset-0 w-56 h-56 bg-gradient-to-bl from-blue-400/40 to-blue-200/50 rounded-full blur-xl animate-pulse delay-2000 m-8 hover:rotate-45 transition-transform duration-1000"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
      </section>

      {/* Mission Statement - Visual Impact Focus */}
      <section className="px-8 py-32 relative overflow-hidden scroll-animate">
        {/* Layered Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/10 to-slate-950"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Split Layout Design */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column - Visual Element */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-blue-400/10 rounded-none border border-blue-600/30 p-12 backdrop-blur-sm hover-tilt spring-hover dynamic-glow">
                  <div className="h-full flex flex-col justify-center space-y-8">
                    <div className="space-y-4">
                      <div className="h-2 w-16 bg-blue-400 rounded-full"></div>
                      <div className="h-2 w-24 bg-blue-500 rounded-full"></div>
                      <div className="h-2 w-20 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold text-blue-300 mb-2">Parity</h3>
                      <p className="text-slate-400 text-sm">Equals coming together</p>
                    </div>
                    <div className="space-y-4">
                      <div className="h-2 w-20 bg-blue-600 rounded-full ml-auto"></div>
                      <div className="h-2 w-24 bg-blue-500 rounded-full ml-auto"></div>
                      <div className="h-2 w-16 bg-blue-400 rounded-full ml-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Content */}
            <div className="lg:col-span-7">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">Our Mission</h2>
                  <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-8"></div>
                </div>
                
                <div className="space-y-8 max-w-3xl">
                  <p className="text-lg text-slate-200 leading-relaxed font-medium">
                    We didn&apos;t build Paritee to chase size. We built it to deliver the impact you deserve — with trust, purpose and partnership at the core and most importantly, customized to your needs.
                  </p>
                  <p className="text-base text-slate-300 leading-relaxed">
                    You won&apos;t find hierarchies or holding company politics here.
                    You&apos;ll find equals — independent agencies with aligned values, coming together to solve real challenges with sharp thinking and shared ambition.
                  </p>
                  <p className="text-base text-slate-300 leading-relaxed">
                    Our name, <span className="text-blue-400 font-medium">Paritee</span>, is rooted in the idea of parity.
                    It reflects what we believe: <span className="text-blue-300 font-medium">Great things happen when equals come together</span>. Each of our agencies is a recognized leader in its market — strong individually, even stronger together. You get seamless delivery, sharper thinking, and results without the baggage of big networks or the limits of small shops.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Bold Visual Treatment */}
      <section className="px-8 py-32 relative scroll-animate">
        {/* Section Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-transparent to-blue-950/20"></div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Asymmetric Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
            <div className="lg:col-span-8">
              <h2 className="text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">What We Do</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-6"></div>
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                Bold strategies. Sharp execution. Transformative results.
              </p>
            </div>
          </div>
          
          {/* Staggered Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = Icons[service.icon as keyof typeof Icons] as any
              const isOffset = index % 3 === 1
              return (
                <Card key={service.id} className={`bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-2xl hover:shadow-blue-900/40 spring-hover hover:border-blue-600/40 hover:bg-slate-800/60 relative overflow-hidden dynamic-glow ${isOffset ? 'lg:mt-8' : ''}`}>
                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="p-8 relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600/30 to-blue-400/30 rounded-none flex items-center justify-center mb-6 group-hover:from-blue-500/40 group-hover:to-blue-300/40 transition-all duration-400 group-hover:scale-125 group-hover:rotate-12">
                      {IconComponent && <IconComponent className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />}
                    </div>
                    <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-100 transition-colors">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8 relative z-10">
                    <CardDescription className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{service.blurb}</CardDescription>
                  </CardContent>
                  
                  {/* Hover Accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Card>
              )
            })}
          </div>
          
          <div className="text-center mt-16">
            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg spring-hover shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 relative overflow-hidden group">
              <Link href="/nightly/motion-b/services">
                <span className="relative z-10">View All Services</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-center"></div>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sectors - Bold Industry Showcase */}
      <section className="px-8 py-32 relative scroll-animate">
        {/* Diagonal Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-blue-950/20 via-blue-900/10 to-transparent transform -skew-y-1"></div>
          <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-tl from-blue-950/20 via-blue-900/10 to-transparent transform skew-y-1"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Dynamic Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">Industries We Know</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Deep expertise across the industries that drive tomorrow's economy.
            </p>
          </div>
          
          {/* Flowing Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, index) => {
              const delay = index * 100
              return (
                <Card key={sector.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-2xl hover:shadow-blue-900/30 spring-hover hover:border-blue-500/50 relative overflow-hidden dynamic-glow">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardHeader className="p-8 relative z-10">
                    {/* Industry Icon Placeholder */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600/30 to-blue-400/30 rounded-none mb-6 group-hover:from-blue-500/40 group-hover:to-blue-300/40 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-400 rounded-full group-hover:bg-blue-300 transition-colors duration-300"></div>
                    </div>
                    <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-100 transition-colors">{sector.name}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="px-8 pb-8 relative z-10">
                    <CardDescription className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{sector.description}</CardDescription>
                  </CardContent>
                  
                  {/* Animated Border */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Card>
              )
            })}
          </div>
          
          <div className="text-center mt-16">
            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg spring-hover shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 relative overflow-hidden group">
              <Link href="/nightly/motion-b/sectors">
                <span className="relative z-10">Explore All Sectors</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-center"></div>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Geographies - Global Presence Display */}
      <section className="px-8 py-32 relative overflow-hidden scroll-animate">
        {/* World Map Inspired Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/5 to-slate-950"></div>
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-20"></div>
          <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-blue-500 rounded-full opacity-20"></div>
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-blue-600 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Global Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">Our Global Footprint</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Connected across continents. Local insights. Global impact.
            </p>
          </div>
          
          {/* Enhanced Geography Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {geographies.map((geography, index) => (
              <Card key={geography.country} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-2xl hover:shadow-blue-900/30 spring-hover hover:border-blue-500/50 relative overflow-hidden dynamic-glow">
                {/* Country Flag Inspired Element */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                <CardHeader className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    {/* Globe Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600/30 to-blue-400/30 rounded-full flex items-center justify-center group-hover:from-blue-500/40 group-hover:to-blue-300/40 transition-all duration-300 group-hover:scale-110">
                      <div className="w-6 h-6 border-2 border-blue-400 rounded-full group-hover:border-blue-300 transition-colors duration-300"></div>
                    </div>
                    <CardTitle className="text-2xl font-semibold text-white group-hover:text-blue-100 transition-colors">{geography.country}</CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="px-8 pb-8">
                  {/* City Badges with Enhanced Styling */}
                  <div className="flex flex-wrap gap-3">
                    {geography.cities.map((city, cityIndex) => (
                      <span key={city} className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                        cityIndex === 0 
                          ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50 hover:bg-blue-600/40 hover:border-blue-400/70'
                          : 'bg-slate-700/60 text-slate-300 border border-slate-600/50 hover:bg-slate-600/60 hover:border-slate-500/70 hover:text-slate-200'
                      }`}>
                        {city}
                      </span>
                    ))}
                  </div>
                </CardContent>
                
                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50">
              <Link href="/nightly/motion-b/geographies">View All Locations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Agencies Preview - Bold Brand Showcase */}
      <section className="px-8 py-32 relative scroll-animate">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-transparent to-blue-950/20"></div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Asymmetric Header Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
            <div className="lg:col-span-7">
              <h2 className="text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">Our Agencies</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-6"></div>
              <p className="text-xl text-slate-300 leading-relaxed">
                Elite partners. Global reach. Local expertise. One unified vision.
              </p>
            </div>
          </div>
          
          {/* Enhanced Agency Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {agencies.slice(0, 4).map((agency, index) => (
              <Card key={agency.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-2xl hover:shadow-blue-900/30 spring-hover hover:border-blue-500/50 overflow-hidden dynamic-glow">
                {/* Header with Bold Visual Treatment */}
                <CardHeader className="p-8 relative">
                  {/* Background Gradient */}
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-600/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-6 mb-6">
                      <div className="relative">
                        <Image 
                          src={agency.logoUrl} 
                          alt={`${agency.name} logo`}
                          width={80}
                          height={80}
                          className="rounded-none object-cover group-hover:scale-110 transition-transform duration-300 shadow-lg"
                        />
                        <div className="absolute inset-0 bg-blue-400/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardTitle className="text-2xl font-semibold text-white group-hover:text-blue-100 transition-colors">{agency.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="px-8 pb-8">
                  <CardDescription className="text-slate-400 leading-relaxed mb-6 text-base group-hover:text-slate-300 transition-colors">{agency.blurb}</CardDescription>
                  
                  {/* Enhanced Location Badges */}
                  <div className="flex flex-wrap gap-3">
                    {agency.locations.slice(0, 3).map((location) => (
                      <span key={location} className="px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-600/40 text-sm rounded-full hover:bg-blue-600/30 hover:border-blue-500/60 hover:text-blue-300 transition-all duration-300 font-medium">
                        {location}
                      </span>
                    ))}
                  </div>
                </CardContent>
                
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50">
              <Link href="/nightly/motion-b/agencies">Meet All Agencies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cases Preview - Visual Storytelling Focus */}
      <section className="px-8 py-32 relative overflow-hidden scroll-animate">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-950/10 via-slate-950 to-slate-950"></div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Bold Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">Our Work</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Where bold thinking meets flawless execution. Every project tells a story of transformation.
            </p>
          </div>
          
          {/* Masonry-Style Grid with Visual Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.slice(0, 6).map((caseItem, index) => {
              const isLarge = index === 0 || index === 3
              const aspectClass = isLarge ? "aspect-[4/5]" : "aspect-video"
              
              return (
                <Card key={caseItem.id} className={`bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-2xl hover:shadow-blue-900/30 spring-hover hover:border-blue-500/50 overflow-hidden dynamic-glow relative ${isLarge ? 'md:col-span-1 lg:row-span-2' : ''}`}>
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <div className={`${aspectClass} relative overflow-hidden hover-tilt`}>
                    <Image 
                      src={caseItem.thumbnail} 
                      alt={caseItem.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Hover Content Overlay */}
                    <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white">
                        <div className="w-12 h-1 bg-blue-400 rounded-full mb-3"></div>
                        <p className="text-sm text-blue-200 font-medium">Case Study</p>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg font-semibold text-white group-hover:text-blue-100 transition-colors">{caseItem.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <CardDescription className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">{caseItem.excerpt}</CardDescription>
                  </CardContent>
                  
                  {/* Blue Accent Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Card>
              )
            })}
          </div>
          
          <div className="text-center mt-16">
            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50">
              <Link href="/nightly/motion-b/cases">View All Cases</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Preview - Human-Centered Design */}
      <section className="px-8 py-32 relative scroll-animate">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-slate-950"></div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">Meet the People</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              The faces behind the vision. Leaders who bring expertise, passion, and innovation to every project.
            </p>
          </div>
          
          {/* Enhanced Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {people.slice(0, 8).map((person, index) => (
              <Card key={person.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-blue-900/30 spring-hover hover:border-blue-500/50 text-center overflow-hidden dynamic-glow relative">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* Profile Image with Enhanced Treatment */}
                <CardHeader className="p-8 relative">
                  {/* Background Glow Effect */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <Image 
                        src={person.avatarUrl} 
                        alt={person.name}
                        fill
                        className="rounded-full object-cover group-hover:scale-110 transition-transform duration-300 border-2 border-transparent group-hover:border-blue-400/30"
                      />
                      {/* Subtle Overlay */}
                      <div className="absolute inset-0 rounded-full bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <CardTitle className="text-lg font-semibold text-white group-hover:text-blue-100 transition-colors mb-2">{person.name}</CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="px-6 pb-8">
                  <CardDescription className="text-blue-400 text-sm mb-3 font-medium group-hover:text-blue-300 transition-colors">{person.role}</CardDescription>
                  <CardDescription className="text-slate-500 text-sm group-hover:text-slate-400 transition-colors">{person.location}</CardDescription>
                </CardContent>
                
                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50">
              <Link href="/nightly/motion-b/team">Meet Everyone</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* News Preview - Dynamic Content Showcase */}
      <section className="px-8 py-32 relative overflow-hidden scroll-animate">
        {/* Flowing Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-slate-950"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-950/10 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* News Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">Latest News</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Stay connected with the latest insights, achievements, and innovations from our network.
            </p>
          </div>
          
          {/* Featured News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {news.slice(0, 3).map((newsItem, index) => {
              const isFeatured = index === 0
              return (
                <Card key={newsItem.id} className={`bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-2xl hover:shadow-blue-900/30 spring-hover hover:border-blue-500/50 overflow-hidden dynamic-glow relative ${isFeatured ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`}>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  {/* Enhanced Image Display */}
                  <div className={`${isFeatured ? 'aspect-[4/3]' : 'aspect-video'} relative overflow-hidden hover-tilt`}>
                    <Image 
                      src={newsItem.image} 
                      alt={newsItem.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {new Date(newsItem.dateISO).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-slate-300 text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      News
                    </div>
                  </div>
                  
                  <CardHeader className="p-8">
                    <CardTitle className={`${isFeatured ? 'text-xl lg:text-2xl' : 'text-lg'} font-semibold text-white group-hover:text-blue-100 transition-colors leading-tight mb-2`}>
                      {newsItem.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="px-8 pb-8">
                    <CardDescription className={`text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors mb-6 ${isFeatured ? 'text-base' : 'text-sm'}`}>
                      {newsItem.excerpt}
                    </CardDescription>
                    
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/10 p-0 h-auto font-medium transition-all duration-300 group-hover:translate-x-2">
                      Read More →
                    </Button>
                  </CardContent>
                  
                  {/* Animated Bottom Border */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Card>
              )
            })}
          </div>
          
          <div className="text-center mt-16">
            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50">
              <Link href="/nightly/motion-b/news">All News</Link>
            </Button>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}