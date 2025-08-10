'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

export default function HeroV4C() {
  const [glitchActive, setGlitchActive] = useState(false)
  const [matrixText, setMatrixText] = useState('')
  const controls = useAnimation()
  const titleRef = useRef<HTMLDivElement>(null)
  
  const matrixChars = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ'
  const finalTitle = 'PARITEE'
  const finalTagline = 'INNOVATION THROUGH CREATIVE INTELLIGENCE'
  const finalSubline = 'Where data meets imagination'

  useEffect(() => {
    // Matrix text reveal animation
    const animateMatrixReveal = async () => {
      // Start with random matrix characters
      for (let phase = 0; phase < 3; phase++) {
        for (let i = 0; i < 20; i++) {
          const randomText = Array.from({ length: finalTitle.length }, () => 
            matrixChars[Math.floor(Math.random() * matrixChars.length)]
          ).join('')
          setMatrixText(randomText)
          await new Promise(resolve => setTimeout(resolve, 50))
        }
      }

      // Gradually reveal the real title
      for (let i = 0; i <= finalTitle.length; i++) {
        const revealed = finalTitle.slice(0, i)
        const remaining = Array.from({ length: finalTitle.length - i }, () => 
          matrixChars[Math.floor(Math.random() * matrixChars.length)]
        ).join('')
        setMatrixText(revealed + remaining)
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      setMatrixText(finalTitle)
    }

    // Glitch effect intervals
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)

    // Start matrix animation after mount
    setTimeout(animateMatrixReveal, 500)

    // Cleanup
    return () => {
      clearInterval(glitchInterval)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  }

  const slideInVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const slideInRightVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.4 }
    }
  }

  return (
    <motion.div 
      className="hero-v4c min-h-screen flex flex-col justify-center relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="animate-pulse">
          <defs>
            <pattern id="grid-v4c" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ff0000" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-v4c)" />
        </svg>
      </div>

      <div className="container max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Main Title */}
          <motion.div variants={slideInVariants} className="space-y-8">
            
            {/* Matrix-style title */}
            <div className="relative">
              <motion.div
                ref={titleRef}
                className={`text-6xl md:text-8xl font-bold font-mono tracking-tighter ${
                  glitchActive ? 'animate-pulse text-red-400' : 'text-white'
                }`}
                style={{
                  textShadow: glitchActive 
                    ? '2px 0 #ff0000, -2px 0 #00ffff, 0 0 20px #ff0000' 
                    : '0 0 30px rgba(255,255,255,0.5)',
                  transform: glitchActive 
                    ? 'translate(2px, 0) skew(2deg)' 
                    : 'translate(0)',
                  filter: glitchActive ? 'hue-rotate(90deg)' : 'none'
                }}
                animate={{
                  rotateX: [0, 2, 0],
                  rotateY: [0, -1, 0],
                  scale: [1, 1.01, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {matrixText || 'LOADING...'}
              </motion.div>
              
              {/* Glitch overlay */}
              {glitchActive && (
                <div className="absolute inset-0 text-6xl md:text-8xl font-bold font-mono tracking-tighter text-blue-400 opacity-50 translate-x-1 -translate-y-1">
                  {matrixText}
                </div>
              )}
            </div>

            {/* Tagline */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <div className="text-red-400 text-sm font-mono tracking-[0.3em] uppercase">
                {finalTagline.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 + index * 0.05 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              
              <motion.div
                className="text-2xl md:text-3xl text-slate-300 font-light max-w-lg leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
              >
                {finalSubline}
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.8 }}
            >
              <motion.button
                className="group relative overflow-hidden bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-mono text-sm tracking-wide uppercase transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">INITIALIZE_CONTACT</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </motion.button>
              
              <motion.button
                className="group relative overflow-hidden border border-blue-400 hover:border-blue-300 text-blue-400 hover:text-blue-300 px-8 py-4 font-mono text-sm tracking-wide uppercase transition-all duration-300 hover:bg-blue-400/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">ACCESS_PORTFOLIO</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Tech Visualization */}
          <motion.div 
            variants={slideInRightVariants}
            className="relative"
          >
            
            {/* Main tech display */}
            <div className="relative bg-slate-900/30 border border-red-500/30 backdrop-blur-sm p-8 font-mono text-sm">
              
              {/* Header */}
              <div className="flex justify-between items-center mb-6 text-red-400">
                <span>SYSTEM_STATUS</span>
                <span className="animate-pulse">●</span>
              </div>
              
              {/* Status lines */}
              <div className="space-y-2 text-slate-300">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 4, duration: 2 }}
                  className="overflow-hidden"
                >
                  <span className="text-green-400">&gt;</span> CREATIVE_INTELLIGENCE: ONLINE
                </motion.div>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 4.5, duration: 2 }}
                  className="overflow-hidden"
                >
                  <span className="text-blue-400">&gt;</span> DATA_STREAMS: ACTIVE
                </motion.div>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 5, duration: 2 }}
                  className="overflow-hidden"
                >
                  <span className="text-red-400">&gt;</span> PERFORMANCE_OPTIMIZATION: 98.7%
                </motion.div>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 5.5, duration: 2 }}
                  className="overflow-hidden"
                >
                  <span className="text-yellow-400">&gt;</span> NETWORK_STATUS: CONNECTED
                </motion.div>
              </div>

              {/* Progress bars */}
              <div className="mt-8 space-y-4">
                {[
                  { label: 'STRATEGIC_ANALYSIS', value: 94, color: 'bg-red-500' },
                  { label: 'CREATIVE_OUTPUT', value: 87, color: 'bg-blue-500' },
                  { label: 'PERFORMANCE_METRICS', value: 96, color: 'bg-green-500' }
                ].map((item, index) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-1 bg-slate-700 overflow-hidden">
                      <motion.div
                        className={`h-full ${item.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ delay: 6 + index * 0.3, duration: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 border border-red-500/50 bg-red-500/10"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            <motion.div
              className="absolute -bottom-6 -left-6 w-12 h-12 border border-blue-500/50 bg-blue-500/10 rotate-45"
              animate={{
                rotate: [45, 405],
                y: [0, -10, 0]
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 text-xs font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center space-y-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>SCROLL_TO_EXPLORE</span>
          <div className="w-px h-8 bg-red-500"></div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}