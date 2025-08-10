'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { cases } from '@/data/cases'
import { ExternalLink, Play, Zap, TrendingUp, Award } from 'lucide-react'

export default function CasesV4C() {
  const [selectedCase, setSelectedCase] = useState(0)
  const [hoveredCase, setHoveredCase] = useState<number | null>(null)
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

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden" id="cases">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent"></div>
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(0, 150, 255, 0.05) 50%, transparent 60%)`,
            backgroundSize: '40px 40px'
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
            className="text-blue-400 text-sm font-mono tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            PORTFOLIO_ARCHIVE
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-mono tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            CASE_STUDIES
          </motion.h2>
          
          <motion.p
            className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Real-world implementations showcasing measurable performance improvements 
            through creative intelligence and data-driven optimization.
          </motion.p>
        </motion.div>

        {/* Featured Case */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="bg-slate-900/40 border border-blue-500/30 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              
              {/* Image Section */}
              <div className="relative h-80 lg:h-auto overflow-hidden group">
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-red-600/30 transition-all duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${cases[selectedCase].thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-500" />
                
                {/* Overlay UI */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={24} />
                  </motion.button>
                </div>

                {/* Tech overlay pattern */}
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.1'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '40px 40px'
                  }}
                />
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-blue-400 text-xs font-mono tracking-widest uppercase">
                    FEATURED_PROJECT
                  </div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-mono tracking-tight">
                  {cases[selectedCase].name.toUpperCase()}
                </h3>
                
                <div className="text-red-400 text-sm font-mono mb-6">
                  {cases[selectedCase].sectorId} • 2024
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-8">
                  {cases[selectedCase].excerpt}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div>
                    <div className="text-xl font-bold text-green-400 font-mono">+247%</div>
                    <div className="text-xs text-slate-400 font-mono">PERFORMANCE</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-400 font-mono">18.2s</div>
                    <div className="text-xs text-slate-400 font-mono">LOAD_TIME</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-red-400 font-mono">96.8%</div>
                    <div className="text-xs text-slate-400 font-mono">SUCCESS_RATE</div>
                  </div>
                </div>

                <motion.button
                  className="group flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-mono text-sm tracking-widest uppercase transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>VIEW_CASE_STUDY</span>
                  <ExternalLink size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Case Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {cases.slice(1, 7).map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              className="group relative h-80 bg-slate-900/40 border border-slate-700 hover:border-blue-500/50 overflow-hidden cursor-pointer transition-all duration-500"
              variants={cardVariants}
              onMouseEnter={() => setHoveredCase(index)}
              onMouseLeave={() => setHoveredCase(null)}
              onClick={() => setSelectedCase(index + 1)}
              whileHover={{ y: -5, rotateX: 2 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:scale-110 transition-transform duration-700"
                style={{
                  backgroundImage: `url(${caseStudy.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="absolute inset-0 bg-slate-900/70 group-hover:bg-slate-900/50 transition-colors duration-500" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="text-xs font-mono text-blue-400 tracking-widest">
                    PROJECT_{String(index + 2).padStart(2, '0')}
                  </div>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ rotate: 12 }}
                  >
                    <ExternalLink size={16} className="text-white" />
                  </motion.div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-2 font-mono tracking-tight group-hover:text-blue-300 transition-colors duration-300">
                    {caseStudy.name.toUpperCase()}
                  </h4>
                  <div className="text-sm text-slate-300 font-mono mb-4">
                    {caseStudy.sectorId}
                  </div>
                  
                  {/* Performance indicator */}
                  <div className="flex items-center space-x-2 text-xs font-mono">
                    <TrendingUp size={12} className="text-green-400" />
                    <span className="text-green-400">+{Math.floor(Math.random() * 200 + 50)}% PERFORMANCE</span>
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />

              {/* Tech corner accent */}
              <div className="absolute top-4 right-4 w-2 h-2 border border-blue-500 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Cases */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.button
            className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-mono text-sm tracking-widest uppercase transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center space-x-3">
              <Award size={16} />
              <span>VIEW_ALL_CASES</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}