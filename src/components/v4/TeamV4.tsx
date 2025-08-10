'use client'

import { motion } from 'framer-motion'
import { people } from '@/data/people'

const TeamV4 = () => {
  const teamMembers = people.slice(0, 6)

  return (
    <section id="team" className="py-32">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="text-center mb-20">
          <motion.div 
            className="text-caption text-gold uppercase tracking-wider mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Leadership
          </motion.div>
          
          <motion.h2 
            className="text-hero text-cream mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our Team
          </motion.h2>
          
          <motion.p 
            className="text-body-large text-warm-gray leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Meet the visionary leaders who orchestrate strategic partnerships 
            and drive creative excellence across our global network.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="relative mb-6 overflow-hidden">
                <div className="aspect-square bg-warm-gray/20 border border-cream/10 group-hover:border-sage/30 transition-colors duration-300">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center">
                        <span className="text-2xl text-sage font-light">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <h3 className="text-subheading text-cream mb-2 group-hover:text-sage transition-colors duration-300">
                {member.name}
              </h3>
              
              <div className="text-caption text-gold uppercase tracking-wider mb-4">
                {member.role}
              </div>
              
              <p className="text-body text-warm-gray leading-relaxed">
                {member.blurb}
              </p>
              
              {member.linkedinUrl && (
                <motion.a
                  href={member.linkedinUrl}
                  className="inline-flex items-center space-x-2 text-sage hover:text-gold transition-colors duration-300 mt-4"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-caption font-medium tracking-wide">Connect</span>
                  <span>→</span>
                </motion.a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamV4