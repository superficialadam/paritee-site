'use client'

import { motion } from 'framer-motion'
import { services } from '@/data/services'
import { Target, Palette, Users, Lightbulb, TrendingUp, Globe } from 'lucide-react'

const iconMap = {
  'Target': Target,
  'Palette': Palette,
  'Users': Users,
  'Lightbulb': Lightbulb,
  'TrendingUp': TrendingUp,
  'Globe': Globe,
}

const ServicesV4 = () => {
  return (
    <section id="services" className="py-32">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="text-center mb-20">
          <motion.div 
            className="text-caption text-gold uppercase tracking-wider mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What We Offer
          </motion.div>
          
          <motion.h2 
            className="text-hero text-cream mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Strategic Services
          </motion.h2>
          
          <motion.p 
            className="text-body-large text-warm-gray leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Comprehensive solutions that bridge the gap between creative vision 
            and strategic execution through our curated network of specialists.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Target
            
            return (
              <motion.div
                key={service.id}
                className="group p-8 border border-cream/10 hover:border-sage/30 transition-all duration-300 bg-gradient-to-b from-cream/5 to-transparent backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center mr-4 group-hover:bg-sage/30 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-sage" />
                  </div>
                  <div className="w-px h-8 bg-cream/20"></div>
                </div>
                
                <h3 className="text-subheading text-cream mb-4 group-hover:text-sage transition-colors duration-300">
                  {service.name}
                </h3>
                
                <p className="text-body text-warm-gray leading-relaxed mb-6">
                  {service.blurb}
                </p>
                
                <div className="flex items-center text-sage group-hover:text-gold transition-colors duration-300">
                  <span className="text-caption font-medium tracking-wide">Learn More</span>
                  <motion.span 
                    className="ml-2"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesV4