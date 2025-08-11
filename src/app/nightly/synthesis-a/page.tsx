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
import { ChevronRight, Star, Users, Award, ArrowRight } from 'lucide-react'

// Brand-consistent animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    filter: "blur(4px)" 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const heroVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function SynthesisAPage() {
  return (
    <div className="space-y-32">
      {/* Hero Section - Brand-Consistent Excellence */}
      <motion.section 
        className="px-4 py-20 sm:px-8 sm:py-32 lg:py-40"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          {/* Split Layout for Visual Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column - Brand Messaging */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-6">
                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent leading-tight motion-reduce:transition-none"
                  variants={heroVariants}
                >
                  No Compromise.
                  <span className="block text-blue-400 mt-2">Just Better.</span>
                </motion.h1>
                <motion.div 
                  className="h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                  variants={itemVariants}
                />
              </div>
              
              <motion.div 
                className="space-y-6 max-w-3xl"
                variants={containerVariants}
              >
                <motion.p 
                  className="text-xl sm:text-2xl text-slate-200 leading-relaxed font-medium motion-reduce:transition-none"
                  variants={itemVariants}
                >
                  You&apos;ve been asked to make trade-offs for too long.
                </motion.p>
                <motion.p 
                  className="text-lg sm:text-xl text-slate-300 leading-relaxed motion-reduce:transition-none hidden sm:block"
                  variants={itemVariants}
                >
                  Big agencies that go big on overhead but fall short on care.
                  Small agencies that bring passion but can&apos;t keep pace.
                  You&apos;ve had to choose between speed and scale.
                  Bold thinking and trusted delivery.
                </motion.p>
                <motion.p 
                  className="text-xl sm:text-2xl text-blue-300 leading-relaxed font-semibold motion-reduce:transition-none"
                  variants={itemVariants}
                >
                  That compromise ends with Paritee.
                </motion.p>
                <motion.p 
                  className="text-lg sm:text-xl text-slate-200 leading-relaxed motion-reduce:transition-none"
                  variants={itemVariants}
                >
                  We are a coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 pt-8"
                variants={itemVariants}
              >
                <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 motion-reduce:hover:scale-100 transform-gpu shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 group">
                  <Link href="/nightly/synthesis-a/cases" className="flex items-center space-x-2">
                    <span>Explore Our Work</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button asChild className="bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-600/10 hover:border-blue-300 hover:text-blue-300 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 motion-reduce:hover:scale-100 transform-gpu group">
                  <Link href="/nightly/synthesis-a/contact" className="flex items-center space-x-2">
                    <span>Get in Touch</span>
                    <Users className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            
            {/* Right Column - Brand Stats */}
            <div className="lg:col-span-4">
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
              >
                <motion.div 
                  className="bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm rounded-none p-8 hover:border-blue-600/30 transition-all duration-500"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center mb-4">
                    <Star className="w-8 h-8 text-blue-400 mr-4" />
                    <span className="text-4xl font-bold text-white">25+</span>
                  </div>
                  <p className="text-slate-300 text-lg">Top-tier agencies united by shared values</p>
                </motion.div>
                
                <motion.div 
                  className="bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm rounded-none p-8 hover:border-blue-600/30 transition-all duration-500"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center mb-4">
                    <Users className="w-8 h-8 text-blue-400 mr-4" />
                    <span className="text-4xl font-bold text-white">500+</span>
                  </div>
                  <p className="text-slate-300 text-lg">Expert professionals driving results</p>
                </motion.div>
                
                <motion.div 
                  className="bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm rounded-none p-8 hover:border-blue-600/30 transition-all duration-500"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center mb-4">
                    <Award className="w-8 h-8 text-blue-400 mr-4" />
                    <span className="text-4xl font-bold text-white">15+</span>
                  </div>
                  <p className="text-slate-300 text-lg">Global markets with local expertise</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Mission Statement - Brand Excellence */}
      <motion.section 
        className="px-4 py-20 sm:px-8 sm:py-32 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/5 to-slate-950"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/3 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column - Visual Element */}
            <div className="lg:col-span-5">
              <motion.div 
                className="relative"
                variants={cardVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="aspect-square bg-gradient-to-br from-blue-600/15 to-blue-400/10 rounded-none border border-blue-600/20 p-12 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500">
                  <div className="h-full flex flex-col justify-center space-y-8">
                    <div className="space-y-4">
                      <div className="h-2 w-16 bg-blue-400 rounded-full"></div>
                      <div className="h-2 w-24 bg-blue-500 rounded-full"></div>
                      <div className="h-2 w-20 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-3xl font-semibold text-blue-300 mb-2">Parity</h3>
                      <p className="text-slate-400">Equals coming together</p>
                    </div>
                    <div className="space-y-4">
                      <div className="h-2 w-20 bg-blue-600 rounded-full ml-auto"></div>
                      <div className="h-2 w-24 bg-blue-500 rounded-full ml-auto"></div>
                      <div className="h-2 w-16 bg-blue-400 rounded-full ml-auto"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Column - Content */}
            <div className="lg:col-span-7">
              <motion.div className="space-y-8" variants={containerVariants}>
                <div>
                  <motion.h2 
                    className="text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6"
                    variants={itemVariants}
                  >
                    Our Mission
                  </motion.h2>
                  <motion.div 
                    className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-8"
                    variants={itemVariants}
                  />
                </div>
                
                <motion.div className="space-y-8 max-w-3xl" variants={containerVariants}>
                  <motion.p 
                    className="text-xl text-slate-200 leading-relaxed font-medium"
                    variants={itemVariants}
                  >
                    We didn&apos;t build Paritee to chase size. We built it to deliver the impact you deserve — with trust, purpose and partnership at the core and most importantly, customized to your needs.
                  </motion.p>
                  <motion.p 
                    className="text-lg text-slate-300 leading-relaxed"
                    variants={itemVariants}
                  >
                    You won&apos;t find hierarchies or holding company politics here.
                    You&apos;ll find equals — independent agencies with aligned values, coming together to solve real challenges with sharp thinking and shared ambition.
                  </motion.p>
                  <motion.div 
                    className="bg-blue-600/5 border border-blue-600/20 backdrop-blur-sm rounded-none p-8"
                    variants={itemVariants}
                  >
                    <blockquote className="text-xl text-blue-200 font-semibold leading-relaxed mb-4">
                      "Great things happen when equals come together"
                    </blockquote>
                    <p className="text-slate-300 leading-relaxed">
                      Our name, <span className="text-blue-400 font-medium">Paritee</span>, is rooted in the idea of parity.
                      Each of our agencies is a recognized leader in its market — strong individually, even stronger together. You get seamless delivery, sharper thinking, and results without the baggage of big networks or the limits of small shops.
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services - Professional Excellence */}
      <motion.section 
        className="px-4 py-20 sm:px-8 sm:py-32 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/10 via-transparent to-blue-950/10"></div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.h2 
              className="text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6"
              variants={itemVariants}
            >
              What We Do
            </motion.h2>
            <motion.div 
              className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-8"
              variants={itemVariants}
            />
            <motion.p 
              className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Comprehensive strategies. Sharp execution. Transformative results.
            </motion.p>
          </div>
          
          {/* Services Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {services.map((service, index) => {
              const IconComponent = Icons[service.icon as keyof typeof Icons] as any
              return (
                <motion.div key={service.id} variants={cardVariants}>
                  <Card className="bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-blue-900/30 transition-all duration-500 hover:border-blue-600/40 hover:bg-slate-800/50 hover:-translate-y-2 motion-reduce:hover:-translate-y-0 hover:scale-[1.02] motion-reduce:hover:scale-100 transform-gpu h-full">
                    <CardHeader className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-blue-400/20 rounded-none flex items-center justify-center mb-6 group-hover:from-blue-500/30 group-hover:to-blue-300/30 group-hover:scale-110 transition-all duration-400 transform-gpu">
                        {IconComponent && <IconComponent className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />}
                      </div>
                      <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-100 transition-colors duration-300 leading-tight">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <CardDescription className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{service.blurb}</CardDescription>
                    </CardContent>
                    
                    {/* Hover Accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
          
          <motion.div 
            className="text-center mt-16"
            variants={itemVariants}
          >
            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 motion-reduce:hover:scale-100 transform-gpu shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 group">
              <Link href="/nightly/synthesis-a/services" className="flex items-center space-x-2">
                <span>View All Services</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Agencies Preview - Brand Showcase */}
      <motion.section 
        className="px-4 py-20 sm:px-8 sm:py-32 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.h2 
              className="text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6"
              variants={itemVariants}
            >
              Our Agencies
            </motion.h2>
            <motion.div 
              className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-8"
              variants={itemVariants}
            />
            <motion.p 
              className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Elite partners. Global reach. Local expertise. One unified vision.
            </motion.p>
          </div>
          
          {/* Agencies Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            variants={containerVariants}
          >
            {agencies.slice(0, 4).map((agency, index) => (
              <motion.div key={agency.id} variants={cardVariants}>
                <Card className="bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-2xl hover:shadow-blue-900/30 transition-all duration-500 hover:border-blue-500/50 overflow-hidden hover:-translate-y-2 motion-reduce:hover:-translate-y-0 hover:scale-[1.01] motion-reduce:hover:scale-100">
                  <CardHeader className="p-8 relative">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-600/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center space-x-6 mb-6">
                        <div className="relative">
                          <Image 
                            src={agency.logoUrl} 
                            alt={`${agency.name} logo`}
                            width={80}
                            height={80}
                            className="rounded-none object-cover group-hover:scale-110 transition-transform duration-400 shadow-lg"
                          />
                          <div className="absolute inset-0 bg-blue-400/10 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                        </div>
                        <CardTitle className="text-2xl font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">{agency.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="px-8 pb-8">
                    <CardDescription className="text-slate-400 leading-relaxed mb-6 text-base group-hover:text-slate-300 transition-colors duration-300">{agency.blurb}</CardDescription>
                    
                    <div className="flex flex-wrap gap-3">
                      {agency.locations.slice(0, 3).map((location) => (
                        <span key={location} className="px-4 py-2 bg-blue-600/15 text-blue-400 border border-blue-600/30 text-sm rounded-full hover:bg-blue-600/25 hover:border-blue-500/50 hover:text-blue-300 transition-all duration-300 font-medium">
                          {location}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  
                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-16"
            variants={itemVariants}
          >
            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 motion-reduce:hover:scale-100 transform-gpu shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 group">
              <Link href="/nightly/synthesis-a/agencies" className="flex items-center space-x-2">
                <span>Meet All Agencies</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Cases Preview - Professional Portfolio */}
      <motion.section 
        className="px-4 py-20 sm:px-8 sm:py-32 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-950/5 via-slate-950 to-slate-950"></div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.h2 
              className="text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6"
              variants={itemVariants}
            >
              Our Work
            </motion.h2>
            <motion.div 
              className="h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto mb-8"
              variants={itemVariants}
            />
            <motion.p 
              className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Where bold thinking meets flawless execution. Every project tells a story of transformation.
            </motion.p>
          </div>
          
          {/* Cases Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {cases.slice(0, 6).map((caseItem, index) => (
              <motion.div key={caseItem.id} variants={cardVariants}>
                <Card className="bg-slate-800/30 border border-slate-700/40 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-2xl hover:shadow-blue-900/30 transition-all duration-500 hover:border-blue-500/50 overflow-hidden hover:-translate-y-2 motion-reduce:hover:-translate-y-0 hover:scale-[1.02] motion-reduce:hover:scale-100 transform-gpu">
                  <div className="aspect-video relative overflow-hidden">
                    <Image 
                      src={caseItem.thumbnail} 
                      alt={caseItem.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                    
                    {/* Hover Content Overlay */}
                    <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <div className="text-white">
                        <div className="w-12 h-1 bg-blue-400 rounded-full mb-3"></div>
                        <p className="text-sm text-blue-200 font-medium">Case Study</p>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">{caseItem.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <CardDescription className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors duration-300">{caseItem.excerpt}</CardDescription>
                  </CardContent>
                  
                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-16"
            variants={itemVariants}
          >
            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white border-0 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 motion-reduce:hover:scale-100 transform-gpu shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 group">
              <Link href="/nightly/synthesis-a/cases" className="flex items-center space-x-2">
                <span>View All Cases</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}