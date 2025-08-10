'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface SectionV3BProps {
  title?: string
  eyebrow?: string
  intro?: string
  children: React.ReactNode
  className?: string
  id?: string
}

export default function SectionV3B({ 
  title, 
  eyebrow, 
  intro, 
  children, 
  className = '', 
  id 
}: SectionV3BProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  return (
    <section id={id} className={`py-24 md:py-32 ${className}`} ref={ref}>
      <div className="container max-w-6xl mx-auto px-8">
        {(eyebrow || title || intro) && (
          <div className="mb-20 md:mb-24">
            {eyebrow && (
              <motion.div 
                className="text-xs font-medium text-white/50 uppercase tracking-widest mb-6"
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={isInView && !prefersReducedMotion ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
              >
                {eyebrow}
              </motion.div>
            )}
            {title && (
              <motion.h2 
                className="text-4xl md:text-6xl lg:text-7xl font-light font-heading tracking-tight leading-none text-white mb-8"
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={isInView && !prefersReducedMotion ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {title}
              </motion.h2>
            )}
            {intro && (
              <motion.p 
                className="text-lg md:text-xl leading-relaxed text-white/70 max-w-3xl font-light"
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={isInView && !prefersReducedMotion ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {intro}
              </motion.p>
            )}
          </div>
        )}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView && !prefersReducedMotion ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}