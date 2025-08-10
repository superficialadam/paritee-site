'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { people } from '@/data/people'
import { Linkedin, Twitter, Mail, Code, Brain, Zap } from 'lucide-react'

export default function TeamV4C() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const getSpecialtyIcon = (person: any) => {
    const name = person.name.toLowerCase()
    if (name.includes('tech') || name.includes('developer') || name.includes('engineer')) return Code
    if (name.includes('strategy') || name.includes('director') || name.includes('lead')) return Brain
    return Zap
  }

  const getPerformanceMetric = () => {
    return Math.floor(Math.random() * 20 + 85) // Random between 85-104
  }

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden" id="team">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent"></div>
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ff0000' stroke-width='1'%3E%3Cpath d='M0 0h80v80H0z' opacity='0.1'/%3E%3Cpath d='M20 20h40v40H20z' opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

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
            INTELLIGENCE_NETWORK
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-mono tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            CORE_TEAM
          </motion.h2>
          
          <motion.p
            className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Human intelligence augmented by advanced systems. 
            Each team member optimized for maximum creative and analytical output.
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {people.map((person, index) => {
            const SpecialtyIcon = getSpecialtyIcon(person)
            const performanceScore = getPerformanceMetric()
            
            return (
              <motion.div
                key={person.id}
                className="group relative bg-slate-900/40 border border-slate-700 hover:border-red-500/50 overflow-hidden transition-all duration-500"
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  rotateX: 5,
                  scale: 1.02
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Profile Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${person.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-900/50 group-hover:bg-slate-900/30 transition-colors duration-500" />
                  
                  {/* Tech overlay */}
                  <div 
                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ff0000' stroke-width='1' opacity='0.3'%3E%3Cpath d='M0 15h30M15 0v30'/%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '30px 30px'
                    }}
                  />

                  {/* Status indicator */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-green-400">ONLINE</span>
                  </div>

                  {/* Performance score */}
                  <div className="absolute top-4 right-4 bg-red-600/80 backdrop-blur-sm px-2 py-1">
                    <span className="text-xs font-mono text-white">{performanceScore}%</span>
                  </div>

                  {/* Specialty icon */}
                  <motion.div
                    className="absolute bottom-4 left-4 p-2 bg-slate-800/80 border border-red-500/30 group-hover:border-red-400 transition-colors duration-300"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <SpecialtyIcon size={16} className="text-red-400" />
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-6 relative">
                  {/* Background pattern */}
                  <div 
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ff0000' stroke-width='1' opacity='0.1'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '40px 40px'
                    }}
                  />

                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white mb-1 font-mono tracking-tight group-hover:text-red-300 transition-colors duration-300">
                      {person.name.toUpperCase()}
                    </h3>
                    
                    <div className="text-red-400 text-sm font-mono mb-4 tracking-wide">
                      {person.role.replace(' ', '_').toUpperCase()}
                    </div>
                    
                    <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {person.bio}
                    </p>

                    {/* Skills/Expertise indicators */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['AI', 'DATA', 'CREATIVE', 'STRATEGY'].slice(0, Math.floor(Math.random() * 3) + 2).map((skill, skillIndex) => (
                        <span 
                          key={skill}
                          className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 border border-blue-400/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.a
                        href="#"
                        className="w-8 h-8 border border-slate-600 hover:border-blue-400 bg-slate-800/50 hover:bg-blue-400/20 flex items-center justify-center transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin size={14} className="text-slate-400 hover:text-blue-400" />
                      </motion.a>
                      
                      <motion.a
                        href="#"
                        className="w-8 h-8 border border-slate-600 hover:border-blue-400 bg-slate-800/50 hover:bg-blue-400/20 flex items-center justify-center transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Twitter size={14} className="text-slate-400 hover:text-blue-400" />
                      </motion.a>
                      
                      <motion.a
                        href="#"
                        className="w-8 h-8 border border-slate-600 hover:border-red-400 bg-slate-800/50 hover:bg-red-400/20 flex items-center justify-center transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail size={14} className="text-slate-400 hover:text-red-400" />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Glitch effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
                  animate={{
                    x: [-50, 50, -50],
                    opacity: [0, 0.2, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Corner tech accent */}
                <div className="absolute bottom-4 right-4 w-3 h-3 border border-red-500/50 rotate-45 group-hover:border-red-400 group-hover:scale-125 transition-all duration-300" />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Team Stats */}
        <motion.div
          className="mt-20 bg-slate-900/30 border border-slate-700 p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold font-mono text-white mb-2">NETWORK_STATISTICS</h3>
            <div className="text-sm text-slate-400 font-mono">Real-time performance metrics</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'ACTIVE_AGENTS', value: people.length.toString(), color: 'text-green-400' },
              { label: 'AVG_EFFICIENCY', value: '94.2%', color: 'text-blue-400' },
              { label: 'PROJECTS_ACTIVE', value: '47', color: 'text-red-400' },
              { label: 'COLLABORATION_INDEX', value: '98.7%', color: 'text-yellow-400' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
              >
                <div className={`text-3xl font-bold font-mono mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm font-mono tracking-wider">
                  {stat.label}
                </div>
                <motion.div
                  className={`mt-2 h-px ${stat.color.replace('text-', 'bg-')} mx-auto`}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}