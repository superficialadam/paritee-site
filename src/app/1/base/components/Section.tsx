'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionProps {
  id?: string
  title?: string
  eyebrow?: string
  intro?: string
  children: ReactNode
  className?: string
}

export default function Section({ id, title, eyebrow, intro, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`${className}`}>
      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        {(title || eyebrow || intro) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            {eyebrow && (
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 animated-heading">
                {title}
              </h2>
            )}
            {intro && (
              <p className="text-lg text-gray-600">
                {intro}
              </p>
            )}
          </motion.div>
        )}
        <div className="flex-1 flex flex-col justify-center">
          {children}
        </div>
      </div>
    </section>
  )
}