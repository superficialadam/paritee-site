'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { cases } from '@/data/cases'

const CasesV5A = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredCase, setHoveredCase] = useState<string | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-black"
      id="cases"
      style={{ y: backgroundY }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-tl from-red-600/10 to-transparent" />
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute bottom-0 right-1/4 w-full h-px bg-gradient-to-l from-red-600/20 to-transparent" />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="mb-24 max-w-4xl"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="text-red-600 font-black text-sm tracking-[0.5em] mb-8 block">
            CREATIVE WORK
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-tight mb-8">
            Case
            <br />
            <span className="text-red-600">Studies</span>
          </h2>
          <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
            Bold solutions that transformed brands and redefined industries. 
            Each project represents our commitment to strategic creative excellence.
          </p>
        </motion.div>

        {/* Cases List */}
        <div className="space-y-0 border-t border-white/10">
          {cases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              className="group border-b border-white/10 hover:bg-red-600 transition-all duration-700 relative overflow-hidden cursor-pointer"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 1, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCase(caseStudy.id)}
              onHoverEnd={() => setHoveredCase(null)}
              whileHover={{ x: 20 }}
            >
              <div className="py-16 px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                
                {/* Case Info */}
                <div className="flex-1">
                  {/* Case Number */}
                  <motion.div
                    className="text-6xl font-black text-white/10 group-hover:text-black/20 transition-colors duration-700 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    0{index + 1}
                  </motion.div>

                  {/* Case Title */}
                  <motion.h3
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-white group-hover:text-black transition-colors duration-700 mb-6 leading-tight"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {caseStudy.name}
                  </motion.h3>

                  {/* Case Description */}
                  <motion.p
                    className="text-xl text-white/80 group-hover:text-black/80 leading-relaxed mb-8 max-w-2xl transition-colors duration-700"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.7 }}
                    viewport={{ once: true }}
                  >
                    {caseStudy.excerpt}
                  </motion.p>

                  {/* View Case Link */}
                  <motion.div
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.9 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-red-600 group-hover:text-black font-black text-lg tracking-wider transition-colors duration-700">
                      VIEW CASE
                    </span>
                    <div className="w-12 h-0.5 bg-red-600 group-hover:bg-black transition-all duration-700 group-hover:w-24" />
                  </motion.div>
                </div>

                {/* Case Thumbnail */}
                <motion.div
                  className="lg:w-80 lg:h-60 relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.15 + 1.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={caseStudy.thumbnail}
                    alt={caseStudy.name}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700" />
                  
                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-red-600/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCase === caseStudy.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-16 right-8 w-24 h-24 border-2 border-white/10 group-hover:border-black/20 transition-colors duration-700 opacity-0 group-hover:opacity-100" />
              
              {/* Glitch Effect Typography */}
              <motion.div
                className="absolute -bottom-2 left-8 text-white/5 group-hover:text-black/10 font-black text-3xl tracking-wider transform -rotate-12 transition-colors duration-700"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0, 1, 0.5] }}
                transition={{ duration: 2, delay: index * 0.2 + 2 }}
                viewport={{ once: true }}
              >
                {caseStudy.name.split(' ')[0].toUpperCase()}
              </motion.div>
            </motion.div>
          ))}
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
            Ready to create your own success story? Let's architect something extraordinary together.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#contact"
              className="group bg-red-600 hover:bg-white text-white hover:text-black px-12 py-4 font-black text-lg tracking-wider transition-all duration-700 relative overflow-hidden"
            >
              <span className="relative z-10">START PROJECT</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </a>
            
            <a
              href="#team"
              className="group border-2 border-white hover:border-red-600 text-white hover:text-red-600 px-12 py-4 font-black text-lg tracking-wider transition-all duration-700"
            >
              <span className="relative z-10">MEET THE TEAM</span>
            </a>
          </div>
        </motion.div>

        {/* Large Background Typography */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          transition={{ duration: 2, delay: 2.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-[12vw] font-black text-white leading-none tracking-tighter">
            CREATIVE
          </h3>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default CasesV5A