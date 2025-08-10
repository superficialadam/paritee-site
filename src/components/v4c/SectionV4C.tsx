'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface SectionV4CProps {
  id?: string
  eyebrow: string
  title: string
  intro: string
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  className?: string
}

export default function SectionV4C({ 
  id, 
  eyebrow, 
  title, 
  intro, 
  children, 
  direction = 'up',
  className = ''
}: SectionV4CProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const controls = useAnimation()
  const contentControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
      contentControls.start("visible")
    }
  }, [isInView, controls, contentControls])

  // Animation variants based on direction
  const getHeaderVariants = () => {
    const baseVariant = { opacity: 0 }
    const visibleVariant = { opacity: 1 }

    switch (direction) {
      case 'left':
        return {
          hidden: { ...baseVariant, x: -100, rotateY: -15 },
          visible: { 
            ...visibleVariant, 
            x: 0, 
            rotateY: 0,
            transition: { duration: 0.8, ease: "easeOut" }
          }
        }
      case 'right':
        return {
          hidden: { ...baseVariant, x: 100, rotateY: 15 },
          visible: { 
            ...visibleVariant, 
            x: 0, 
            rotateY: 0,
            transition: { duration: 0.8, ease: "easeOut" }
          }
        }
      case 'down':
        return {
          hidden: { ...baseVariant, y: -100, rotateX: 15 },
          visible: { 
            ...visibleVariant, 
            y: 0, 
            rotateX: 0,
            transition: { duration: 0.8, ease: "easeOut" }
          }
        }
      default: // up
        return {
          hidden: { ...baseVariant, y: 100, rotateX: -15 },
          visible: { 
            ...visibleVariant, 
            y: 0, 
            rotateX: 0,
            transition: { duration: 0.8, ease: "easeOut" }
          }
        }
    }
  }

  const getContentVariants = () => {
    const baseVariant = { opacity: 0 }
    const visibleVariant = { opacity: 1 }

    switch (direction) {
      case 'left':
        return {
          hidden: { ...baseVariant, x: -60 },
          visible: { 
            ...visibleVariant, 
            x: 0,
            transition: { 
              duration: 1, 
              ease: "easeOut",
              delay: 0.3,
              staggerChildren: 0.1 
            }
          }
        }
      case 'right':
        return {
          hidden: { ...baseVariant, x: 60 },
          visible: { 
            ...visibleVariant, 
            x: 0,
            transition: { 
              duration: 1, 
              ease: "easeOut",
              delay: 0.3,
              staggerChildren: 0.1 
            }
          }
        }
      case 'down':
        return {
          hidden: { ...baseVariant, y: -60 },
          visible: { 
            ...visibleVariant, 
            y: 0,
            transition: { 
              duration: 1, 
              ease: "easeOut",
              delay: 0.3,
              staggerChildren: 0.1 
            }
          }
        }
      default: // up
        return {
          hidden: { ...baseVariant, y: 60 },
          visible: { 
            ...visibleVariant, 
            y: 0,
            transition: { 
              duration: 1, 
              ease: "easeOut",
              delay: 0.3,
              staggerChildren: 0.1 
            }
          }
        }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section 
      ref={sectionRef} 
      id={id}
      className={`py-20 relative overflow-hidden ${className}`}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-transparent"></div>
        
        {/* Animated scan lines */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `linear-gradient(45deg, 
              transparent 40%, 
              rgba(255, 0, 0, 0.1) 50%, 
              transparent 60%
            )`,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      <div className="container max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="mb-16"
          variants={getHeaderVariants()}
          initial="hidden"
          animate={controls}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Eyebrow */}
          <motion.div
            className="relative mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-red-400 text-sm font-mono tracking-[0.3em] uppercase relative">
              {/* Glitch effect on eyebrow */}
              <span className="relative z-10">{eyebrow}</span>
              <motion.span
                className="absolute inset-0 text-blue-400 opacity-0"
                animate={{
                  opacity: isInView ? [0, 0.7, 0] : 0,
                  x: isInView ? [0, 2, 0] : 0
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                {eyebrow}
              </motion.span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-mono tracking-tight relative"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* 3D Typography effect */}
            <span 
              className="relative z-10"
              style={{
                textShadow: `
                  2px 2px 0px rgba(255, 0, 0, 0.3),
                  4px 4px 0px rgba(0, 0, 0, 0.2),
                  0 0 20px rgba(255, 255, 255, 0.1)
                `
              }}
            >
              {title}
            </span>
            
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-red-500 via-blue-500 to-red-500"
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: '100%', opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </motion.h2>

          {/* Intro */}
          <motion.p
            className="text-lg text-slate-300 max-w-3xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {intro}
          </motion.p>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={getContentVariants()}
          initial="hidden"
          animate={contentControls}
          className="relative"
        >
          {/* Add tech-styled wrapper around children */}
          <motion.div
            className="relative"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {/* Background tech elements */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-red-500/30"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1, duration: 0.6 }}
              />
              <motion.div
                className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-blue-500/30"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.6 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-blue-500/30"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.4, duration: 0.6 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-red-500/30"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.6, duration: 0.6 }}
              />
            </div>

            {/* Children with animation variants applied */}
            <motion.div variants={childVariants}>
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Section divider with tech styling */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-red-500/50 to-transparent"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ delay: 2, duration: 0.8 }}
      />

      {/* Add global styles for tech cards used in children */}
      <style jsx global>{`
        .tech-card {
          animation: cardFloat 6s ease-in-out infinite;
          animation-fill-mode: both;
        }
        
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0) rotateX(0); }
          33% { transform: translateY(-5px) rotateX(1deg); }
          66% { transform: translateY(2px) rotateX(-0.5deg); }
        }
      `}</style>
    </section>
  )
}