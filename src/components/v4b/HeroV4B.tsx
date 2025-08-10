'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const HeroV4B = () => {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -300])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const scale = useTransform(scrollY, [0, 500], [1, 1.1])

  useEffect(() => {
    setMounted(true)
  }, [])

  const heroLines = [
    "WE DON'T JUST",
    "CONNECT—",
    "WE ARCHITECT",
    "CREATIVE",
    "ECOSYSTEMS"
  ]

  const subLines = [
    "Transform possibilities into realities",
    "through strategic partnerships"
  ]

  if (!mounted) return null

  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{ y: parallaxY, opacity, scale }}
    >
      <div className="container mx-auto px-8 text-center relative z-10">
        
        {/* Main Hero Typography */}
        <div className="mb-16">
          {heroLines.map((line, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <motion.h1
                className={`
                  font-black tracking-tighter leading-none text-white
                  ${index === 1 ? 'text-red-600' : ''} 
                  ${index === 3 ? 'text-white/30' : ''}
                  text-6xl md:text-8xl lg:text-9xl xl:text-[12rem]
                `}
                initial={{ y: 200, skewY: 10 }}
                animate={{ y: 0, skewY: 0 }}
                transition={{ 
                  duration: 1.2, 
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94] 
                }}
                style={{
                  transformOrigin: "center"
                }}
              >
                {line}
              </motion.h1>
            </motion.div>
          ))}
        </div>

        {/* Subtitle with Staggered Reveal */}
        <div className="mb-16 space-y-4">
          {subLines.map((line, index) => (
            <motion.p
              key={index}
              className="text-xl md:text-2xl lg:text-3xl text-white/80 font-medium tracking-wide"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 1, 
                delay: 1.5 + index * 0.3,
                ease: "easeOut" 
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
        >
          <a
            href="#mission"
            className="group bg-red-600 hover:bg-white text-white hover:text-black px-12 py-4 font-black text-lg tracking-wider transition-all duration-700 relative overflow-hidden min-w-[200px]"
          >
            <span className="relative z-10">EXPLORE</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
          </a>
          
          <a
            href="#contact"
            className="group border-2 border-white hover:border-red-600 text-white hover:text-red-600 px-12 py-4 font-black text-lg tracking-wider transition-all duration-700 relative overflow-hidden min-w-[200px]"
          >
            <span className="relative z-10">CONNECT</span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center space-y-4">
            <span className="text-white/60 text-sm font-bold tracking-widest rotate-90">
              SCROLL
            </span>
            <motion.div
              className="w-0.5 h-16 bg-white/40"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 left-8 w-32 h-32 border-l-4 border-t-4 border-red-600 opacity-30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
        />
        
        <motion.div
          className="absolute bottom-20 right-8 w-24 h-24 border-r-4 border-b-4 border-white/20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 3 }}
        />

        {/* Glitch Effect Text */}
        <motion.div
          className="absolute top-1/3 right-12 text-red-600/20 font-black text-2xl tracking-wider transform rotate-90 origin-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0.2] }}
          transition={{ duration: 2, delay: 4, ease: "easeInOut" }}
        >
          CREATIVE
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-12 text-white/10 font-black text-xl tracking-wider transform -rotate-90 origin-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0.1] }}
          transition={{ duration: 2.5, delay: 4.5, ease: "easeInOut" }}
        >
          ECOSYSTEMS
        </motion.div>
      </div>

      {/* Asymmetric Overlay Elements */}
      <motion.div
        className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-600/5 to-transparent"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, delay: 1 }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-gradient-to-r from-white/5 to-transparent"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, delay: 1.5 }}
      />
    </motion.section>
  )
}

export default HeroV4B