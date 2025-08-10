'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface SectionV5AProps {
  id: string
  eyebrow: string
  title: string
  intro: string
  children: ReactNode
  className?: string
}

const SectionV5A = ({ 
  id, 
  eyebrow, 
  title, 
  intro, 
  children, 
  className = '' 
}: SectionV5AProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const skew = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5])

  const titleWords = title.split(' ')

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative py-32 overflow-hidden bg-black ${className}`}
      style={{ opacity }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        
        {/* Asymmetric Grid Lines */}
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-white/10 to-transparent" />
          <div className="absolute right-1/3 top-0 w-px h-full bg-gradient-to-b from-red-600/10 to-transparent" />
        </div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          className="max-w-4xl mb-20"
          style={{ y, skewY: skew }}
        >
          {/* Eyebrow */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <span className="text-red-600 font-black text-sm tracking-[0.5em] relative">
              {eyebrow}
              <div className="absolute -bottom-2 left-0 w-24 h-0.5 bg-red-600" />
            </span>
          </motion.div>

          {/* Title with Staggered Words */}
          <div className="mb-12 overflow-hidden">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter">
              {titleWords.map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-4"
                  initial={{ y: 200, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 1, 
                    delay: index * 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  }}
                  viewport={{ once: true }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </div>

          {/* Intro Text */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium max-w-3xl">
              {intro}
            </p>
            
            {/* Decorative Quote Mark */}
            <div className="absolute -left-8 -top-4 text-6xl text-red-600/20 font-black leading-none">
              "
            </div>
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>

        {/* Asymmetric Decorative Elements */}
        <motion.div
          className="absolute top-32 right-16 w-32 h-32"
          initial={{ opacity: 0, rotate: 0, scale: 0 }}
          whileInView={{ opacity: 0.1, rotate: 45, scale: 1 }}
          transition={{ duration: 2, delay: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-full h-full border-4 border-white relative">
            <div className="absolute inset-4 border-2 border-red-600" />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-12 w-20 h-20"
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 0.2, rotate: -30 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <div className="w-full h-full bg-gradient-to-br from-red-600/30 to-white/10 transform skew-x-12" />
        </motion.div>

        {/* Glitch Text Elements */}
        <motion.div
          className="absolute top-20 left-1/4 text-white/5 font-black text-4xl tracking-wider transform -rotate-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.1, 0, 0.1, 0.05] }}
          transition={{ duration: 3, delay: 2 }}
          viewport={{ once: true }}
        >
          {title.split(' ')[0]}
        </motion.div>

        <motion.div
          className="absolute bottom-16 right-1/3 text-red-600/10 font-black text-3xl tracking-wider transform rotate-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.2, 0, 0.2, 0.1] }}
          transition={{ duration: 2.5, delay: 2.5 }}
          viewport={{ once: true }}
        >
          {eyebrow}
        </motion.div>
      </div>

      {/* Section Divider */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 1 }}
        viewport={{ once: true }}
      />
    </motion.section>
  )
}

export default SectionV5A