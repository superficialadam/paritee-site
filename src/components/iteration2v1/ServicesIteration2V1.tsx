'use client'

import { Target, Palette, Smartphone, Radio, Megaphone, BarChart, Building, Globe, Shield } from 'lucide-react'
import { services } from '@/data/services'

const iconMap = {
  Target,
  Palette,
  Smartphone,
  Radio,
  Megaphone,
  BarChart,
  Building,
  Globe,
  Shield
}

export default function ServicesIteration2V1() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <div className="eyebrow">What We Do</div>
          <h2 className="section-title text-white">
            Our Services
          </h2>
        </div>
        
        <div className="grid grid-3">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap]
            
            return (
              <div 
                key={service.id}
                className="card p-8 text-center fade-up"
                style={{ '--stagger-delay': index } as React.CSSProperties}
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-[#D4AF37] rounded-full">
                  <IconComponent size={32} className="text-[#0E2756]" />
                </div>
                
                <h3 className="card-title text-white mb-4">
                  {service.name}
                </h3>
                
                <p className="text-[#94A3B8] leading-relaxed">
                  {service.blurb}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}