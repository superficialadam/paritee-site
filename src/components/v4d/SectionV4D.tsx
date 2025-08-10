'use client'

import { ReactNode } from 'react'

interface SectionV4DProps {
  id?: string
  eyebrow?: string
  title: string
  intro?: string
  children: ReactNode
  className?: string
}

export default function SectionV4D({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = ''
}: SectionV4DProps) {
  return (
    <section id={id} className={`gallery-section ${className}`}>
      <div className="gallery-container">
        {/* Section Header */}
        <div className="text-center mb-16 fade-up">
          {eyebrow && (
            <div className="gallery-eyebrow mb-4">
              {eyebrow}
            </div>
          )}
          
          <h2 className="section-title display-font text-black mb-6">
            {title}
          </h2>
          
          {intro && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {intro}
            </p>
          )}
        </div>

        {/* Section Content */}
        <div className="fade-up stagger-children">
          {children}
        </div>
      </div>
    </section>
  )
}