'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface SectionV4Props {
  id?: string
  eyebrow?: string
  title: string
  intro?: string
  children: React.ReactNode
  expandable?: boolean
  defaultExpanded?: boolean
  variant?: 'light' | 'emphasis' | 'default'
  className?: string
}

const SectionV4 = ({ 
  id, 
  eyebrow, 
  title, 
  intro, 
  children, 
  expandable = false,
  defaultExpanded = true,
  variant = 'default',
  className = ''
}: SectionV4Props) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const variantClasses = {
    light: 'section-light',
    emphasis: 'section-emphasis', 
    default: ''
  }

  if (expandable) {
    return (
      <motion.section 
        id={id}
        className={`w-full border-b border-cream/5 ${className}`}
        layout
      >
        <button
          className="w-full p-16 text-left hover:bg-sage/5 transition-colors duration-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <h2 className="text-hero text-cream font-light">{title}</h2>
            <motion.div
              className="w-12 h-12 rounded-full border border-warm-gray flex items-center justify-center"
              animate={{ 
                rotate: isExpanded ? 45 : 0,
                borderColor: isExpanded ? 'var(--sage)' : 'var(--warm-gray)'
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-warm-gray text-xl">+</span>
            </motion.div>
          </div>
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="px-16 pb-16 max-w-7xl mx-auto">
                {intro && (
                  <p className="text-body-large text-warm-gray mb-12 leading-relaxed max-w-3xl">
                    {intro}
                  </p>
                )}
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    )
  }

  return (
    <section 
      id={id} 
      className={`v4-section ${variantClasses[variant]} ${className}`}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          {eyebrow && (
            <motion.div 
              className="text-caption text-gold uppercase tracking-wider mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {eyebrow}
            </motion.div>
          )}
          <motion.h2 
            className="text-heading text-cream mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          {intro && (
            <motion.p 
              className="text-body-large text-warm-gray leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {intro}
            </motion.p>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

export default SectionV4