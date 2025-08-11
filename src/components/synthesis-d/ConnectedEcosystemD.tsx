'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useUserJourney } from './UserJourneyProvider'
import { agencies } from '@/data/agencies'

export default function ConnectedEcosystemD() {
  const sectionRef = useRef<HTMLElement>(null)
  const { recordInteraction, updateStage, journeyState } = useUserJourney()
  const isInView = useInView(sectionRef, { margin: "-30%" })

  return (
    <motion.section 
      ref={sectionRef}
      id="connected-ecosystem"
      className="relative py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => {
        updateStage('understanding')
        recordInteraction('ecosystem-view')
      }}
    >
      <div className="container mx-auto px-8">
        <motion.div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
            {journeyState.userType === 'agency-owner' 
              ? 'Join Our Network of Excellence' 
              : 'A Connected Network of Specialists'}
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Curated partnerships with top-tier agencies, creating a ecosystem where collaboration drives exceptional results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {agencies.slice(0, 6).map((agency, index) => (
            <motion.div
              key={agency.id}
              className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl border border-white/10 hover:border-blue-400/30 rounded-xl p-6 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-medium text-white mb-2 group-hover:text-blue-400 transition-colors">
                {agency.name}
              </h3>
              <div className="text-sm text-white/60 mb-4">
                {agency.locations.join(', ')}
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                {agency.blurb}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}