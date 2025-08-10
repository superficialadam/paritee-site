'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { people } from '@/data/people'
import Section from './Section'

export default function PeopleGrid() {
  return (
    <Section
      id="team"
      eyebrow="Meet the Team"
      title="The People Behind the Work"
      intro="Experienced leaders from diverse backgrounds, united by a shared commitment to delivering exceptional marketing results."
      className="bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {people.map((person, index) => (
          <motion.div 
            key={person.id} 
            className="group text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="relative mb-6 inline-block">
              <div 
                className="w-40 h-40 rounded-full mx-auto mb-2 relative overflow-hidden bg-gradient-to-br from-stone-200 to-stone-300 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(45deg, #e7e5e4 25%, #d6d3d1 25%, #d6d3d1 50%, #e7e5e4 50%, #e7e5e4 75%, #d6d3d1 75%, #d6d3d1)`,
                  backgroundSize: '20px 20px'
                }}
              >
                <div className="absolute inset-0 bg-stone-400 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-3xl font-bold text-white">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>
              <motion.a 
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -top-2 -right-2 w-10 h-10 bg-white border border-stone-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-stone-900 hover:text-white hover:border-stone-900 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={16} />
              </motion.a>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-heading text-stone-900 group-hover:text-stone-800 transition-colors">
                {person.name}
              </h3>
              <p className="text-stone-600 font-medium group-hover:text-stone-700 transition-colors">
                {person.role}
              </p>
              <p className="text-sm text-stone-500 uppercase tracking-wide">
                {person.location}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}