'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { services } from '@/data/services'
import { Target, Palette, Smartphone, Radio, Megaphone, BarChart, Play, Pause } from 'lucide-react'

const iconMap = {
  Target,
  Palette, 
  Smartphone,
  Radio,
  Megaphone,
  BarChart
}

// Mock video data - in real implementation, these would be actual video URLs
const videoData = {
  strategy: '/video/strategy-bg.mp4',
  creative: '/video/creative-bg.mp4', 
  digital: '/video/digital-bg.mp4',
  media: '/video/media-bg.mp4',
  pr: '/video/pr-bg.mp4',
  data: '/video/data-bg.mp4'
}

export default function ServicesV4C() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const toggleVideo = (serviceId: string) => {
    const newSet = new Set(playingVideos)
    if (newSet.has(serviceId)) {
      newSet.delete(serviceId)
    } else {
      newSet.add(serviceId)
    }
    setPlayingVideos(newSet)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden" id="services">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent"></div>
      
      <div className="container max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="text-red-400 text-sm font-mono tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            CREATIVE INTELLIGENCE SYSTEMS
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-mono tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            SERVICES
          </motion.h2>
          
          <motion.p 
            className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Data-driven solutions engineered for maximum performance. 
            Each service optimized through advanced analytics and creative intelligence.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap]
            const isHovered = hoveredService === service.id
            const isVideoPlaying = playingVideos.has(service.id)
            
            return (
              <motion.div
                key={service.id}
                className="group relative h-80 overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-red-500/50 transition-all duration-500 cursor-pointer"
                variants={cardVariants}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                whileHover={{ 
                  y: -10,
                  rotateX: 2,
                  rotateY: 1
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                
                {/* Video Background Overlay */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-10"
                  initial={false}
                  animate={{
                    opacity: isHovered ? 0.3 : 0,
                    scale: isHovered ? 1.1 : 1
                  }}
                >
                  {/* Simulated video effect with animated gradient */}
                  <div 
                    className="w-full h-full bg-gradient-to-br from-red-600/20 via-blue-600/20 to-purple-600/20 relative"
                    style={{
                      backgroundSize: '300% 300%',
                      animation: isHovered ? 'gradientShift 3s ease infinite' : 'none'
                    }}
                  >
                    {/* Overlay pattern to simulate video noise */}
                    <div className="absolute inset-0 opacity-20"
                         style={{
                           backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.1'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/g%3E%3C/svg%3E")`,
                           animation: isHovered ? 'pulsePattern 2s ease-in-out infinite' : 'none'
                         }}>
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-20 p-8 h-full flex flex-col justify-between">
                  
                  {/* Top Section */}
                  <div>
                    <motion.div
                      className="flex items-center justify-between mb-6"
                      animate={{
                        scale: isHovered ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className={`p-3 border ${
                          isHovered ? 'border-red-400 bg-red-500/20' : 'border-slate-600 bg-slate-800/50'
                        } transition-all duration-300`}
                        animate={{
                          rotate: isHovered ? 360 : 0,
                          borderColor: isHovered ? '#f87171' : '#64748b'
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent 
                          size={24} 
                          className={isHovered ? 'text-red-400' : 'text-slate-300'}
                        />
                      </motion.div>
                      
                      {/* Video play indicator */}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleVideo(service.id)
                        }}
                        className={`p-2 ${
                          isVideoPlaying ? 'bg-red-600' : 'bg-slate-700'
                        } hover:bg-red-600 transition-colors duration-300 opacity-0 group-hover:opacity-100`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isVideoPlaying ? (
                          <Pause size={16} className="text-white" />
                        ) : (
                          <Play size={16} className="text-white" />
                        )}
                      </motion.button>
                    </motion.div>

                    <motion.h3
                      className={`text-xl font-bold font-mono tracking-tight mb-4 transition-all duration-300 ${
                        isHovered ? 'text-red-300' : 'text-white'
                      }`}
                      animate={{
                        x: isHovered ? 5 : 0
                      }}
                    >
                      {service.name.toUpperCase()}
                    </motion.h3>
                    
                    <motion.p
                      className="text-slate-300 leading-relaxed text-sm"
                      animate={{
                        x: isHovered ? 5 : 0
                      }}
                      transition={{ delay: 0.1 }}
                    >
                      {service.blurb}
                    </motion.p>
                  </div>

                  {/* Bottom Section */}
                  <motion.div
                    className="mt-6"
                    animate={{
                      y: isHovered ? -5 : 0
                    }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Performance metrics simulation */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">PERFORMANCE</span>
                        <span className="text-red-400">{88 + index * 2}%</span>
                      </div>
                      <div className="h-1 bg-slate-700 overflow-hidden">
                        <motion.div
                          className="h-full bg-red-500"
                          initial={{ width: 0 }}
                          animate={{ 
                            width: isHovered ? `${88 + index * 2}%` : '0%'
                          }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>

                    <motion.div
                      className={`text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                        isHovered ? 'text-blue-400' : 'text-slate-500'
                      }`}
                      animate={{
                        opacity: isHovered ? 1 : 0.7
                      }}
                    >
                      ACCESS_MODULE →
                    </motion.div>
                  </motion.div>
                </div>

                {/* Glitch effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
                  animate={{
                    x: isHovered ? [-100, 100, -100] : 0,
                    opacity: isHovered ? [0, 0.3, 0] : 0
                  }}
                  transition={{
                    x: { duration: 2, repeat: Infinity },
                    opacity: { duration: 2, repeat: Infinity }
                  }}
                />

                {/* Corner accent */}
                <div className={`absolute top-4 right-4 w-2 h-2 transition-all duration-300 ${
                  isHovered ? 'bg-red-500 scale-150' : 'bg-slate-600'
                }`} />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.button
            className="group relative overflow-hidden bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-mono text-sm tracking-widest uppercase transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">INITIALIZE_CONSULTATION</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          </motion.button>
        </motion.div>
      </div>

      {/* Add keyframes for animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulsePattern {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.1; }
        }
      `}</style>
    </section>
  )
}