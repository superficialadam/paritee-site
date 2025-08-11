'use client'

import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { services } from '@/data/services'
import Section from './Section'

export default function ServicesGrid() {
  return (
    <Section
      id="services"
      title="What We Do"
      intro="Comprehensive services delivered by specialists who understand your industry"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.HelpCircle
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <IconComponent className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.name}
              </h3>
              <p className="text-gray-600">
                {service.blurb}
              </p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}