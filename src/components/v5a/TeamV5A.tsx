'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { people } from '@/data/people'
import { ExternalLink } from 'lucide-react'

const TeamV5A = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredPerson, setHoveredPerson] = useState<string | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-black"
      id="team"
      style={{ y: backgroundY }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <div className="absolute top-1/3 right-0 w-full h-px bg-gradient-to-l from-red-600/30 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-white/30 to-transparent" />
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
            CREATIVE LEADERS
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-tight mb-8">
            Our
            <br />
            <span className="text-red-600">Team</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Visionary leaders who architect creative ecosystems and transform possibilities into realities.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-white/10">
          {people.map((person, index) => (
            <motion.div
              key={person.id}
              className="group border-r border-b border-white/10 hover:bg-red-600 transition-all duration-700 relative overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredPerson(person.id)}
              onHoverEnd={() => setHoveredPerson(null)}
              whileHover={{ y: -10 }}
            >
              <div className="p-8 h-full flex flex-col">
                
                {/* Person Image */}
                <motion.div
                  className="relative mb-6 overflow-hidden aspect-square"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 100 
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={person.avatarUrl}
                    alt={person.name}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-red-600/20 transition-all duration-700" />
                  
                  {/* Hover LinkedIn Icon */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredPerson === person.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 hover:bg-white text-black p-3 rounded-full transition-all duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </motion.div>
                </motion.div>

                {/* Person Info */}
                <div className="flex-1 flex flex-col justify-between">
                  
                  {/* Name */}
                  <motion.h3
                    className="text-xl font-black text-white group-hover:text-black transition-colors duration-700 mb-2 leading-tight"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {person.name}
                  </motion.h3>

                  {/* Role */}
                  <motion.p
                    className="text-white/80 group-hover:text-black/80 text-sm leading-relaxed mb-4 transition-colors duration-700"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.7 }}
                    viewport={{ once: true }}
                  >
                    {person.role}
                  </motion.p>

                  {/* Location */}
                  <motion.div
                    className="flex items-center justify-between mt-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.9 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-red-600 group-hover:text-black font-bold text-sm transition-colors duration-700">
                      {person.location}
                    </span>
                    
                    <div className="w-8 h-0.5 bg-red-600 group-hover:bg-black transition-colors duration-700" />
                  </motion.div>
                </div>

                {/* Team Member Number */}
                <motion.div
                  className="absolute top-4 right-4 text-3xl font-black text-white/10 group-hover:text-black/20 transition-colors duration-700"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 1.1 }}
                  viewport={{ once: true }}
                >
                  0{index + 1}
                </motion.div>

                {/* Decorative Corner */}
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20 group-hover:border-black/30 transition-colors duration-700 opacity-0 group-hover:opacity-100" />
                
                {/* Glitch Effect Typography */}
                <motion.div
                  className="absolute -top-2 -left-2 text-white/5 group-hover:text-black/10 font-black text-2xl tracking-wider transform rotate-45 transition-colors duration-700"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 1, 0, 1, 0.5] }}
                  transition={{ duration: 2, delay: index * 0.2 + 2 }}
                  viewport={{ once: true }}
                >
                  {person.name.split(' ')[0].substring(0, 3).toUpperCase()}
                </motion.div>
              </div>
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
            Join our team of creative visionaries and help architect the future of strategic marketing.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#contact"
              className="group bg-white hover:bg-red-600 text-black hover:text-white px-12 py-4 font-black text-lg tracking-wider transition-all duration-700 relative overflow-hidden"
            >
              <span className="relative z-10">JOIN US</span>
              <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </a>
            
            <a
              href="#news"
              className="group border-2 border-white hover:border-red-600 text-white hover:text-red-600 px-12 py-4 font-black text-lg tracking-wider transition-all duration-700"
            >
              <span className="relative z-10">LATEST NEWS</span>
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
          <h3 className="text-[10vw] font-black text-white leading-none tracking-tighter">
            LEADERS
          </h3>
        </motion.div>

        {/* Asymmetric Decorative Elements */}
        <motion.div
          className="absolute top-32 left-16 w-24 h-24 border-4 border-red-600/20 transform rotate-45"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 2 }}
          viewport={{ once: true }}
        />
        
        <motion.div
          className="absolute bottom-32 right-12 w-16 h-16 bg-white/10 transform -rotate-12"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.section>
  )
}

export default TeamV5A