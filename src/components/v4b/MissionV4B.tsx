'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const MissionV4B = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  
  const missionStatements = [
    {
      text: "We architect creative ecosystems where innovation thrives",
      emphasis: "architect creative ecosystems"
    },
    {
      text: "Strategic partnerships that transform possibilities into realities",
      emphasis: "transform possibilities"
    },
    {
      text: "Bold thinking meets sophisticated execution",
      emphasis: "Bold thinking"
    }
  ]

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      id="mission"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-red-600 transform rotate-45" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 border-2 border-white transform -rotate-12" />
        <div className="absolute top-1/2 right-1/2 w-32 h-32 bg-red-600/20 transform rotate-12" />
      </motion.div>

      <div className="container mx-auto px-8 text-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="text-red-600 font-black text-sm tracking-[0.5em] mb-8 block">
            MISSION
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight">
            Strategic Creative
            <br />
            <span className="text-red-600">Leadership</span>
          </h2>
        </motion.div>

        {/* Mission Statements */}
        <motion.div 
          className="space-y-16 mb-20"
          style={{ y: textY }}
        >
          {missionStatements.map((statement, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.4,
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              viewport={{ once: true }}
            >
              {/* Quote Number */}
              <div className="absolute -left-16 top-0 text-6xl font-black text-red-600/20">
                0{index + 1}
              </div>
              
              <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white/90 leading-relaxed font-medium max-w-4xl mx-auto">
                {statement.text.split(statement.emphasis).map((part, partIndex) => (
                  <span key={partIndex}>
                    {part}
                    {partIndex === 0 && (
                      <motion.span 
                        className="text-red-600 font-black"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.4 + 0.5 }}
                        viewport={{ once: true }}
                      >
                        {statement.emphasis}
                      </motion.span>
                    )}
                  </span>
                ))}
              </blockquote>

              {/* Decorative Line */}
              <motion.div
                className="w-24 h-1 bg-red-600 mx-auto mt-8"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: index * 0.4 + 0.8 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            We don't follow trends—we set them. Through strategic partnerships 
            and innovative thinking, we create lasting impact in the creative landscape.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#services"
              className="group bg-white hover:bg-red-600 text-black hover:text-white px-10 py-4 font-black text-lg tracking-wider transition-all duration-500 relative overflow-hidden"
            >
              <span className="relative z-10">OUR APPROACH</span>
              <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </a>
            
            <a
              href="#cases"
              className="group border-2 border-red-600 hover:border-white text-red-600 hover:text-white px-10 py-4 font-black text-lg tracking-wider transition-all duration-500"
            >
              <span className="relative z-10">VIEW WORK</span>
            </a>
          </div>
        </motion.div>

        {/* Large Typography Background */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.03 }}
          transition={{ duration: 2, delay: 2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-[20vw] font-black text-white leading-none tracking-tighter">
            BOLD
          </h3>
        </motion.div>

        {/* Asymmetric Elements */}
        <motion.div
          className="absolute top-20 right-8 w-2 h-32 bg-red-600"
          initial={{ height: 0 }}
          whileInView={{ height: '8rem' }}
          transition={{ duration: 1, delay: 2.5 }}
          viewport={{ once: true }}
        />
        
        <motion.div
          className="absolute bottom-20 left-8 w-16 h-16 border-l-4 border-b-4 border-white/30"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 3 }}
          viewport={{ once: true }}
        />

        {/* Glitch Effect Typography */}
        <motion.div
          className="absolute top-1/3 left-12 text-white/5 font-black text-6xl tracking-wider transform rotate-90 origin-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.1, 0, 0.1, 0.05] }}
          transition={{ duration: 3, delay: 3.5 }}
          viewport={{ once: true }}
        >
          CREATE
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-16 text-red-600/10 font-black text-5xl tracking-wider transform -rotate-45 origin-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.2, 0, 0.2, 0.1] }}
          transition={{ duration: 2.5, delay: 4 }}
          viewport={{ once: true }}
        >
          BOLD
        </motion.div>
      </div>
    </motion.section>
  )
}

export default MissionV4B