'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { services } from '@/data/services'
import * as LucideIcons from 'lucide-react'

const ServicesV4B = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const transformedServices = services.map((service, index) => ({
    ...service,
    transformedName: service.name.toUpperCase(),
    boldWords: service.name.split(' ').slice(0, 1).join(' ').toUpperCase(),
    description: service.blurb.replace(/^\w/, (c) => c.toUpperCase())
  }))

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-black"
      id="services"
      style={{ y: backgroundY }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-1/4 right-0 w-full h-px bg-gradient-to-l from-transparent via-red-600/20 to-transparent" />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="text-red-600 font-black text-sm tracking-[0.5em] mb-8 block">
            CAPABILITIES
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-tight mb-8">
            Strategic
            <br />
            <span className="text-red-600">Services</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            We architect comprehensive solutions that transform creative challenges into strategic advantages.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10">
          {transformedServices.map((service, index) => {
            const IconComponent = LucideIcons[service.icon as keyof typeof LucideIcons] as React.ComponentType<any>
            
            return (
              <motion.div
                key={service.id}
                className="group relative p-16 border-b border-r border-white/10 hover:bg-red-600 transition-all duration-700 overflow-hidden"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94] 
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Service Number */}
                <motion.div
                  className="absolute top-8 right-8 text-6xl font-black text-white/10 group-hover:text-black/20 transition-colors duration-700"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  0{index + 1}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="mb-8"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2 + 0.5,
                    type: "spring",
                    stiffness: 100 
                  }}
                  viewport={{ once: true }}
                >
                  {IconComponent && (
                    <IconComponent 
                      size={64} 
                      className="text-red-600 group-hover:text-white transition-colors duration-700" 
                    />
                  )}
                </motion.div>

                {/* Service Name */}
                <motion.h3
                  className="text-3xl lg:text-4xl font-black text-white group-hover:text-black transition-colors duration-700 mb-6 leading-tight"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.7 }}
                  viewport={{ once: true }}
                >
                  <span className="text-red-600 group-hover:text-white transition-colors duration-700">
                    {service.boldWords}
                  </span>
                  <br />
                  {service.transformedName.replace(service.boldWords, '').trim()}
                </motion.h3>

                {/* Service Description */}
                <motion.p
                  className="text-white/80 group-hover:text-black/80 leading-relaxed text-lg transition-colors duration-700 mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.9 }}
                  viewport={{ once: true }}
                >
                  {service.description}
                </motion.p>

                {/* Learn More Link */}
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 1.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-red-600 group-hover:text-black font-black tracking-wider transition-colors duration-700">
                    EXPLORE
                  </span>
                  <div className="w-8 h-0.5 bg-red-600 group-hover:bg-black transition-all duration-700 group-hover:w-16" />
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/20 group-hover:border-black/30 transition-colors duration-700 opacity-0 group-hover:opacity-100" />
                
                {/* Glitch Effect Typography */}
                <motion.div
                  className="absolute -bottom-4 -right-4 text-white/5 group-hover:text-black/10 font-black text-4xl tracking-wider transform rotate-12 transition-colors duration-700"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 1, 0, 1, 0.5] }}
                  transition={{ duration: 2, delay: index * 0.3 + 2 }}
                  viewport={{ once: true }}
                >
                  {service.boldWords.split(' ')[0]}
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Ready to transform your creative challenges into strategic advantages?
          </p>
          
          <a
            href="#contact"
            className="group inline-block bg-red-600 hover:bg-white text-white hover:text-black px-12 py-4 font-black text-lg tracking-wider transition-all duration-700 relative overflow-hidden"
          >
            <span className="relative z-10">START A PROJECT</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
          </a>
        </motion.div>

        {/* Large Background Typography */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          transition={{ duration: 2, delay: 2.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-[15vw] font-black text-white leading-none tracking-tighter">
            STRATEGIC
          </h3>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default ServicesV4B