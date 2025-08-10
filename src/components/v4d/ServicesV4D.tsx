'use client'

import { Target, Palette, Smartphone, Radio, Megaphone, BarChart } from 'lucide-react'
import { services } from '@/data/services'

const iconMap = {
  Target,
  Palette,
  Smartphone,
  Radio,
  Megaphone,
  BarChart
}

export default function ServicesV4D() {
  return (
    <section id="services" className="gallery-container">
      {/* Section Header */}
      <div className="text-center mb-16 fade-up">
        <div className="gallery-eyebrow mb-4">
          Our Expertise
        </div>
        <h2 className="section-title display-font text-black mb-6">
          Curated Services
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Each service offering represents years of refinement and specialization, 
          delivered through our network of exceptional creative partners.
        </p>
      </div>

      {/* Services Grid */}
      <div className="gallery-grid gallery-grid-3">
        {services.map((service, index) => {
          const IconComponent = iconMap[service.icon as keyof typeof iconMap]
          
          return (
            <div
              key={service.id}
              className="gallery-card p-10 group cursor-pointer stagger-child fade-up"
              style={{ '--stagger-delay': index } as React.CSSProperties}
            >
              {/* Icon */}
              <div className="mb-8 relative">
                <div className="w-16 h-16 bg-gray-50 group-hover:bg-yellow-50 border border-gray-100 group-hover:border-yellow-200 flex items-center justify-center transition-all duration-300">
                  <IconComponent 
                    size={24} 
                    className="text-gray-600 group-hover:text-yellow-600 transition-colors duration-300" 
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -top-2 -right-2 w-4 h-4 border border-gray-200 group-hover:border-yellow-400 transform rotate-45 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              </div>

              {/* Content */}
              <h3 className="card-title display-font text-black mb-4 group-hover:text-yellow-700 transition-colors duration-300">
                {service.name}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                {service.blurb}
              </p>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-black group-hover:text-yellow-600 transition-colors duration-300">
                  Learn More
                </span>
                <div className="w-6 h-px bg-gray-300 group-hover:bg-yellow-600 group-hover:w-8 transition-all duration-300"></div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/0 to-yellow-100/0 group-hover:from-yellow-50/20 group-hover:to-yellow-100/10 transition-all duration-500 pointer-events-none"></div>
            </div>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16 fade-up">
        <p className="text-gray-600 mb-8">
          Looking for a custom solution? Let's discuss your unique requirements.
        </p>
        <button className="px-10 py-4 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105">
          Start a Conversation
        </button>
      </div>
    </section>
  )
}