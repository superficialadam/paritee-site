'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useUserJourney } from './UserJourneyProvider'
import { Shield, Award, Target, Users } from 'lucide-react'

export default function AdvisoryExcellenceD() {
  const sectionRef = useRef<HTMLElement>(null)
  const { recordInteraction, updateStage } = useUserJourney()
  const isInView = useInView(sectionRef, { margin: "-30%" })

  const principles = [
    {
      icon: Shield,
      title: "Senior Leadership",
      description: "Every engagement led by seasoned professionals with 10+ years experience",
      metric: "100% senior-led projects"
    },
    {
      icon: Award,
      title: "Proven Excellence",
      description: "Track record of delivering measurable results across industries",
      metric: "150+ successful projects"
    },
    {
      icon: Target,
      title: "Outcome Focus",
      description: "Success measured by your business results, not just campaign metrics",
      metric: "Average 3.2x ROI improvement"
    },
    {
      icon: Users,
      title: "True Partnership",
      description: "Long-term relationships built on trust, transparency, and shared success",
      metric: "85% client retention rate"
    }
  ]

  return (
    <motion.section 
      ref={sectionRef}
      id="advisory-excellence"
      className="relative py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => {
        updateStage('consideration')
        recordInteraction('advisory-excellence-view')
      }}
    >
      <div className="container mx-auto px-8">
        <motion.div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
            What Advisory-Led Really Means
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Not just consulting. Not just execution. A true partnership where senior strategic minds guide every decision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              className="text-center space-y-6 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/30 rounded-xl mx-auto flex items-center justify-center group-hover:bg-blue-500/30 transition-all duration-300">
                <principle.icon className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-medium text-white group-hover:text-blue-400 transition-colors">
                {principle.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {principle.description}
              </p>
              <div className="text-blue-400 font-semibold text-sm">
                {principle.metric}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}