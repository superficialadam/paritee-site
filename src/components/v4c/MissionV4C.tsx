'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Zap, Database, Brain, Target, Cpu, Shield } from 'lucide-react'

export default function MissionV4C() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const principles = [
    {
      icon: Brain,
      title: 'CREATIVE_INTELLIGENCE',
      description: 'Fusion of human creativity with machine learning capabilities for breakthrough solutions.',
      metric: '98.7%',
      label: 'INNOVATION_INDEX'
    },
    {
      icon: Database,
      title: 'DATA_DRIVEN',
      description: 'Every decision backed by comprehensive data analysis and predictive modeling.',
      metric: '2.4s',
      label: 'RESPONSE_TIME'
    },
    {
      icon: Target,
      title: 'PERFORMANCE_FOCUSED',
      description: 'Measurable results through optimized processes and continuous improvement cycles.',
      metric: '247%',
      label: 'AVG_PERFORMANCE_LIFT'
    },
    {
      icon: Shield,
      title: 'FUTURE_READY',
      description: 'Technology-forward approach ensuring solutions that scale with emerging trends.',
      metric: '99.9%',
      label: 'SYSTEM_RELIABILITY'
    }
  ]

  const stats = [
    { label: 'CLIENTS_SERVED', value: '150+', color: 'text-red-400' },
    { label: 'PROJECTS_COMPLETED', value: '500+', color: 'text-blue-400' },
    { label: 'SUCCESS_RATE', value: '96.8%', color: 'text-green-400' },
    { label: 'UPTIME', value: '99.97%', color: 'text-yellow-400' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/10 via-transparent to-blue-950/10"></div>
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ff0000' stroke-width='1' opacity='0.1'%3E%3Cpath d='M10 10l80 80M90 10l-80 80'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className="container max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-red-400 text-sm font-mono tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            CORE_PHILOSOPHY
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-mono tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              textShadow: '2px 2px 0px rgba(255, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)'
            }}
          >
            MISSION_DIRECTIVE
          </motion.h2>
          
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
              We engineer breakthrough performance through the convergence of creative intelligence 
              and advanced data analytics. Every solution is architected for measurable impact.
            </p>
            
            {/* Mission Statement Display */}
            <motion.div
              className="bg-slate-900/50 border border-red-500/30 p-8 font-mono text-sm backdrop-blur-sm"
              whileHover={{ borderColor: 'rgba(239, 68, 68, 0.5)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-red-400 text-xs tracking-widest mb-4">MISSION_STATEMENT.TXT</div>
              <div className="text-white leading-loose">
                <motion.span
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ delay: 1, duration: 3 }}
                  className="inline-block overflow-hidden"
                >
                  "To transform businesses through the strategic application of creative intelligence, 
                  delivering measurable results that exceed expectations and define new standards 
                  for performance in the digital age."
                </motion.span>
                <motion.span
                  className="inline-block w-2 h-5 bg-red-400 ml-1 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1, duration: 0.3 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Core Principles Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {principles.map((principle, index) => {
            const IconComponent = principle.icon
            return (
              <motion.div
                key={principle.title}
                className="group relative bg-slate-900/30 border border-slate-700 hover:border-red-500/50 p-8 transition-all duration-500 overflow-hidden"
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  rotateX: 2,
                  scale: 1.02
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Background tech pattern */}
                <div 
                  className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ff0000' stroke-width='1'%3E%3Cpath d='M0 0h60v60H0z' opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }}
                />

                {/* Icon and Title */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <motion.div
                    className="p-3 border border-red-500/30 bg-red-500/10 group-hover:border-red-400 group-hover:bg-red-500/20 transition-all duration-300"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <IconComponent size={24} className="text-red-400" />
                  </motion.div>
                  
                  {/* Metric Display */}
                  <div className="text-right">
                    <div className="text-2xl font-bold font-mono text-white">{principle.metric}</div>
                    <div className="text-xs text-slate-400 font-mono">{principle.label}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-mono tracking-tight text-white mb-4 group-hover:text-red-300 transition-colors duration-300">
                  {principle.title}
                </h3>
                
                <p className="text-slate-300 leading-relaxed text-sm">
                  {principle.description}
                </p>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  initial={false}
                />

                {/* Corner accent */}
                <div className="absolute bottom-4 right-4 w-3 h-3 border border-red-500/50 rotate-45 group-hover:border-red-400 group-hover:scale-125 transition-all duration-300" />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          className="bg-slate-900/40 border border-slate-700 backdrop-blur-sm p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold font-mono text-white">PERFORMANCE_METRICS</h3>
            <motion.div
              className="flex items-center space-x-2 text-green-400 font-mono text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Cpu size={16} />
              <span>LIVE_DATA</span>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
              >
                <motion.div
                  className={`text-3xl md:text-4xl font-bold font-mono mb-2 ${stat.color}`}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.8 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-slate-400 text-sm font-mono tracking-wider">
                  {stat.label}
                </div>
                
                {/* Animated underline */}
                <motion.div
                  className={`mt-2 h-px ${stat.color.replace('text-', 'bg-')} mx-auto`}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ delay: 1.8 + index * 0.1, duration: 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}