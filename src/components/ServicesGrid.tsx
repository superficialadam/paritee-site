'use client'

import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { services } from '@/data/services'
import Section from './Section'

const cardVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export default function ServicesGrid() {
  return (
    <Section
      id="services"
      eyebrow="What We Do"
      title="Comprehensive Marketing Solutions"
      intro="From strategic planning to creative execution, we cover every aspect of modern marketing with uncompromising excellence."
      className="bg-stone-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{size?: number, className?: string}>
          
          return (
            <motion.div 
              key={service.id} 
              className="group cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-white border border-stone-200 rounded-lg p-8 h-full transition-all duration-300 group-hover:shadow-xl group-hover:border-stone-300">
                <div className="flex flex-col space-y-6">
                  <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-stone-900 transition-colors duration-300">
                    <IconComponent size={24} className="text-stone-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-stone-900 mb-3 group-hover:text-stone-900">
                      {service.name}
                    </h3>
                    <div className="w-0 h-0.5 bg-stone-900 group-hover:w-12 transition-all duration-500 mb-4"></div>
                    <p className="text-stone-600 leading-relaxed">
                      {service.blurb}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}