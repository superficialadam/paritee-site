'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface SectionProps {
  title?: string
  eyebrow?: string
  intro?: string
  children: React.ReactNode
  className?: string
  id?: string
}

export default function Section({ title, eyebrow, intro, children, className = '', id }: SectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id={id} className={`py-20 md:py-32 ${className}`} ref={ref}>
      <div className="container">
        {(eyebrow || title || intro) && (
          <motion.div 
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            {eyebrow && (
              <div className="text-sm font-medium text-stone-600 uppercase tracking-[0.2em] mb-4">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight leading-[0.9] text-stone-900 mb-6">
                {title}
              </h2>
            )}
            {intro && (
              <p className="text-xl md:text-2xl leading-relaxed text-stone-600 max-w-4xl font-light">
                {intro}
              </p>
            )}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}