'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useUserJourney } from './UserJourneyProvider'
import { cases } from '@/data/cases'

export default function AuthenticCasesD() {
  const sectionRef = useRef<HTMLElement>(null)
  const { recordInteraction, updateStage, journeyState } = useUserJourney()

  // Filter cases based on user type preferences
  const getRelevantCases = () => {
    if (journeyState.userType === 'cmo') {
      return cases.filter(c => c.category === 'Strategy' || c.results?.length > 0).slice(0, 3)
    }
    return cases.slice(0, 4)
  }

  const relevantCases = getRelevantCases()

  return (
    <motion.section 
      ref={sectionRef}
      id="authentic-cases"
      className="relative py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => {
        updateStage('validation')
        recordInteraction('cases-view')
      }}
    >
      <div className="container mx-auto px-8">
        <motion.div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
            {journeyState.userType === 'cmo' ? 'Proven Results' : 'Real Work, Real Impact'}
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Success stories from our advisory-led partnerships, showcasing the outcomes that matter most.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {relevantCases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl border border-white/10 hover:border-blue-400/30 rounded-xl overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-video bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-white/60 text-sm">Case Study Visual</div>
              </div>
              <div className="p-6">
                <div className="text-xs text-blue-400 mb-2">{caseStudy.category}</div>
                <h3 className="text-xl font-medium text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {caseStudy.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {caseStudy.description}
                </p>
                {caseStudy.results && (
                  <div className="space-y-2">
                    {caseStudy.results.map((result, idx) => (
                      <div key={idx} className="text-xs text-emerald-400 flex items-center">
                        <span className="mr-2">→</span>
                        {result}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}