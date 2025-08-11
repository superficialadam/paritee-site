'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useUserJourney } from './UserJourneyProvider'
import { people } from '@/data/people'

export default function HumanTeamD() {
  const sectionRef = useRef<HTMLElement>(null)
  const { recordInteraction, updateStage } = useUserJourney()

  return (
    <motion.section 
      ref={sectionRef}
      id="human-team"
      className="relative py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => {
        updateStage('trust')
        recordInteraction('team-view')
      }}
    >
      <div className="container mx-auto px-8">
        <motion.div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
            The Minds Behind the Work
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Senior professionals who bring decades of experience and genuine passion for your success.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {people.slice(0, 6).map((person, index) => (
            <motion.div
              key={person.id}
              className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl border border-white/10 hover:border-blue-400/30 rounded-xl p-6 text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                {person.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-lg font-medium text-white mb-1 group-hover:text-blue-400 transition-colors">
                {person.name}
              </h3>
              <div className="text-sm text-blue-400 mb-2">{person.role}</div>
              <div className="text-xs text-white/60 mb-4">{person.location}</div>
              <p className="text-white/70 text-sm leading-relaxed">
                {person.bio.length > 120 ? `${person.bio.substring(0, 120)}...` : person.bio}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <blockquote className="text-lg text-white/80 italic mb-4 max-w-2xl mx-auto">
            "We're not just consultants—we're partners invested in your long-term success."
          </blockquote>
          <div className="text-sm text-white/60">— The Paritee Advisory Team</div>
        </motion.div>
      </div>
    </motion.section>
  )
}