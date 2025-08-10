'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { news } from '@/data/news'
import { Calendar, Clock, ArrowRight, Zap, TrendingUp, ExternalLink } from 'lucide-react'

export default function NewsV4C() {
  const [selectedArticle, setSelectedArticle] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).toUpperCase().replace(/\s/g, '_')
  }

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

  const getReadTime = () => {
    return Math.floor(Math.random() * 5 + 3) // Random between 3-7 minutes
  }

  const getPriorityLevel = (index: number) => {
    if (index === 0) return { label: 'CRITICAL', color: 'text-red-400', bg: 'bg-red-500/20' }
    if (index < 3) return { label: 'HIGH', color: 'text-yellow-400', bg: 'bg-yellow-500/20' }
    return { label: 'STANDARD', color: 'text-green-400', bg: 'bg-green-500/20' }
  }

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden" id="news">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-950/5 to-transparent"></div>
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `linear-gradient(135deg, transparent 30%, rgba(34, 197, 94, 0.05) 50%, transparent 70%)`,
            backgroundSize: '60px 60px'
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
            className="text-green-400 text-sm font-mono tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            INTELLIGENCE_FEED
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-mono tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            NEWS_STREAM
          </motion.h2>
          
          <motion.p
            className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Real-time updates on industry developments, technological breakthroughs, 
            and strategic insights from the creative intelligence frontier.
          </motion.p>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="bg-slate-900/40 border border-green-500/30 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              
              {/* Image Section */}
              <div className="relative h-80 lg:h-auto overflow-hidden group">
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-green-600/30 to-blue-600/30 transition-all duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${news[selectedArticle].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-500" />
                
                {/* Live indicator */}
                <div className="absolute top-6 left-6 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs font-mono text-red-400 tracking-wider">LIVE_FEED</span>
                </div>

                {/* Priority badge */}
                <div className="absolute top-6 right-6">
                  <div className={`px-3 py-1 ${getPriorityLevel(selectedArticle).bg} border border-current`}>
                    <span className={`text-xs font-mono tracking-wider ${getPriorityLevel(selectedArticle).color}`}>
                      {getPriorityLevel(selectedArticle).label}
                    </span>
                  </div>
                </div>

                {/* Tech overlay pattern */}
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.1'%3E%3Cpath d='M25 0v50M0 25h50'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '50px 50px'
                  }}
                />

                {/* Engagement metrics overlay */}
                <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4 text-xs font-mono">
                    <span className="text-green-400">
                      <TrendingUp size={12} className="inline mr-1" />
                      847 VIEWS
                    </span>
                    <span className="text-blue-400">
                      <Zap size={12} className="inline mr-1" />
                      94% RELEVANCE
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-green-400 text-xs font-mono tracking-widest uppercase">
                    FEATURED_ARTICLE
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {formatDate(news[selectedArticle].dateISO)}
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-mono tracking-tight leading-tight">
                  {news[selectedArticle].title.toUpperCase()}
                </h3>
                
                <div className="flex items-center space-x-4 text-sm font-mono text-slate-400 mb-6">
                  <span>BY_PARITEE_EDITORIAL</span>
                  <span>•</span>
                  <span>{getReadTime()}_MIN_READ</span>
                  <span>•</span>
                  <span className="text-green-400">VERIFIED</span>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                  {news[selectedArticle].excerpt}
                </p>

                {/* Article tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['AI', 'INNOVATION', 'DATA', 'STRATEGY', 'TECH'].slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs font-mono text-green-400 bg-green-400/10 px-3 py-1 border border-green-400/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <motion.button
                  className="group flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-mono text-sm tracking-widest uppercase transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>READ_FULL_ARTICLE</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* News Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {news.slice(1, 7).map((article, index) => {
            const priority = getPriorityLevel(index + 1)
            const readTime = getReadTime()
            
            return (
              <motion.div
                key={article.id}
                className="group relative bg-slate-900/40 border border-slate-700 hover:border-green-500/50 overflow-hidden cursor-pointer transition-all duration-500"
                variants={cardVariants}
                onClick={() => setSelectedArticle(index + 1)}
                whileHover={{ y: -5, rotateX: 2 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Image Header */}
                <div className="relative h-40 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${article.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-900/70 group-hover:bg-slate-900/50 transition-colors duration-500" />

                  {/* Priority indicator */}
                  <div className="absolute top-3 left-3">
                    <div className={`px-2 py-1 ${priority.bg} border border-current`}>
                      <span className={`text-xs font-mono tracking-wider ${priority.color}`}>
                        {priority.label}
                      </span>
                    </div>
                  </div>

                  {/* Time indicator */}
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm px-2 py-1">
                    <span className="text-xs font-mono text-white">{readTime}M</span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                    <span>{formatDate(article.dateISO)}</span>
                    <div className="flex items-center space-x-1">
                      <Clock size={10} />
                      <span>{readTime}MIN</span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-3 font-mono tracking-tight group-hover:text-green-300 transition-colors duration-300 line-clamp-2">
                    {article.title.toUpperCase()}
                  </h4>
                  
                  <div className="text-sm text-slate-400 font-mono mb-4">
                    BY_PARITEE_EDITORIAL
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs font-mono">
                      <TrendingUp size={10} className="text-green-400" />
                      <span className="text-green-400">TRENDING</span>
                    </div>
                    
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ExternalLink size={14} className="text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Tech corner accent */}
                <div className="absolute bottom-4 right-4 w-2 h-2 border border-green-500/50 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Animated border effect */}
                <motion.div
                  className="absolute inset-0 border border-green-500/0 group-hover:border-green-500/30 pointer-events-none"
                  animate={{
                    borderColor: ['rgba(34, 197, 94, 0)', 'rgba(34, 197, 94, 0.3)', 'rgba(34, 197, 94, 0)']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* View All News */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.button
            className="group relative overflow-hidden bg-green-600 hover:bg-green-700 text-white px-8 py-4 font-mono text-sm tracking-widest uppercase transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center space-x-3">
              <Zap size={16} />
              <span>ACCESS_NEWS_ARCHIVE</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}