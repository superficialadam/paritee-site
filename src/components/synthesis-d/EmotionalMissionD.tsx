'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useUserJourney } from './UserJourneyProvider'

interface EmotionalStory {
  pain: string
  insight: string
  solution: string
  outcome: string
  userTypes: ('cmo' | 'agency-owner' | 'marketer' | 'explorer')[]
}

export default function EmotionalMissionD() {
  const [currentStory, setCurrentStory] = useState(0)
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { journeyState, recordInteraction, updateStage } = useUserJourney()
  const { scrollYProgress } = useScroll({ 
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  const isInView = useInView(sectionRef, { margin: "-30%" })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8])

  // Human-centered stories that connect with different user types
  const emotionalStories: EmotionalStory[] = [
    {
      pain: "You're tired of agencies that promise the world but disappear when challenges arise.",
      insight: "Great marketing isn't just about campaigns—it's about having senior minds who care about your outcomes as much as you do.",
      solution: "At Paritee, every engagement is led by seasoned strategists who've built their reputations solving problems like yours.",
      outcome: "Finally, a marketing partner who shows up with solutions, not excuses.",
      userTypes: ['cmo', 'marketer']
    },
    {
      pain: "You've watched talented teams get overwhelmed by growth, losing the personal touch that made them special.",
      insight: "Scale doesn't have to mean compromise. The right advisory structure preserves quality while enabling expansion.",
      solution: "Our network model means you get boutique care with enterprise capability—senior advisors guide every decision.",
      outcome: "Growth that strengthens relationships instead of diluting them.",
      userTypes: ['agency-owner']
    },
    {
      pain: "You're caught between demanding deadlines and the quality standards that define your brand.",
      insight: "The best work happens when strategic thinking and creative execution are seamlessly integrated from day one.",
      solution: "Our advisory-led approach means strategy isn't an afterthought—it's the foundation that makes execution faster and better.",
      outcome: "Work that moves fast because it's built on solid strategic ground.",
      userTypes: ['marketer', 'explorer']
    }
  ]

  // Get story relevant to current user type
  const getRelevantStory = () => {
    if (!journeyState.userType) return emotionalStories[0]
    return emotionalStories.find(story => 
      story.userTypes.includes(journeyState.userType!)
    ) || emotionalStories[0]
  }

  useEffect(() => {
    setMounted(true)
    if (isInView) {
      updateStage('discovery')
      recordInteraction('emotional-mission-view')
    }
  }, [isInView, updateStage, recordInteraction])

  // Emotional progression through story beats
  useEffect(() => {
    if (!mounted || !isInView) return

    const storyBeats = Object.keys(getRelevantStory()) as (keyof EmotionalStory)[]
    
    const progressStory = () => {
      setCurrentStory(prev => {
        if (prev < storyBeats.length - 2) { // -2 to exclude userTypes
          recordInteraction(`story-beat-${storyBeats[prev]}`)
          return prev + 1
        }
        return prev
      })
    }

    // Adaptive timing based on user engagement
    const timing = journeyState.engagement.interactionCount > 3 ? 3000 : 4000
    const timer = setTimeout(progressStory, timing)
    
    return () => clearTimeout(timer)
  }, [currentStory, mounted, isInView, journeyState])

  if (!mounted) return null

  const relevantStory = getRelevantStory()
  const storyBeats = [
    relevantStory.pain,
    relevantStory.insight, 
    relevantStory.solution,
    relevantStory.outcome
  ]

  const beatTypes = ['pain', 'insight', 'solution', 'outcome']
  const currentBeat = storyBeats[currentStory]
  const currentType = beatTypes[currentStory]

  // Emotional color mapping for each beat type
  const getEmotionalStyling = (type: string) => {
    const styles = {
      pain: {
        color: 'text-red-400',
        bgGradient: 'from-red-500/10 to-red-600/5',
        accent: 'border-red-400/30'
      },
      insight: {
        color: 'text-blue-400',
        bgGradient: 'from-blue-500/10 to-blue-600/5',
        accent: 'border-blue-400/30'
      },
      solution: {
        color: 'text-emerald-400',
        bgGradient: 'from-emerald-500/10 to-emerald-600/5',
        accent: 'border-emerald-400/30'
      },
      outcome: {
        color: 'text-yellow-400',
        bgGradient: 'from-yellow-500/10 to-yellow-600/5',
        accent: 'border-yellow-400/30'
      }
    }
    return styles[type as keyof typeof styles] || styles.insight
  }

  const currentStyling = getEmotionalStyling(currentType)

  return (
    <motion.section 
      ref={sectionRef}
      id="emotional-mission"
      className="relative py-32 overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Emotional Background */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${currentStyling.bgGradient}`}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="container mx-auto px-8 relative z-10">
        
        {/* Section Introduction */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="inline-block px-4 py-2 bg-black/20 backdrop-blur border border-white/10 rounded-full text-xs text-white/70 tracking-widest mb-6"
            whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
          >
            OUR MISSION
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl font-light text-white/90 tracking-wide max-w-3xl mx-auto leading-relaxed">
            We believe great marketing happens when{' '}
            <span className="text-blue-400 font-medium">senior strategic minds</span>{' '}
            guide every decision
          </h2>
        </motion.div>

        {/* Emotional Story Display */}
        <div className="max-w-5xl mx-auto">
          
          {/* Current Story Beat */}
          <motion.div 
            className="text-center mb-16 min-h-[300px] flex items-center justify-center"
            key={`beat-${currentStory}`}
          >
            <motion.div
              className={`
                text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed
                ${currentStyling.color} max-w-4xl
              `}
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {currentBeat}
            </motion.div>
          </motion.div>

          {/* Story Progress with Emotional Context */}
          <div className="flex justify-center space-x-8 mb-16">
            {beatTypes.map((type, index) => (
              <motion.div
                key={type}
                className={`flex flex-col items-center space-y-2 cursor-pointer ${
                  index <= currentStory ? 'opacity-100' : 'opacity-30'
                }`}
                onClick={() => {
                  setCurrentStory(index)
                  recordInteraction(`manual-story-${type}`)
                }}
                whileHover={{ scale: 1.1 }}
              >
                <div className={`
                  w-3 h-3 rounded-full border-2 transition-all duration-500
                  ${index <= currentStory 
                    ? `${getEmotionalStyling(type).accent} bg-current` 
                    : 'border-white/20'
                  }
                `} />
                <div className={`
                  text-xs uppercase tracking-wider font-medium
                  ${index === currentStory 
                    ? getEmotionalStyling(type).color 
                    : 'text-white/40'
                  }
                `}>
                  {type}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Advisory-Led Differentiator */}
          <motion.div 
            className={`
              bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-xl
              border ${currentStyling.accent} rounded-2xl p-8 md:p-12
              max-w-4xl mx-auto
            `}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="text-center space-y-6">
              <h3 className="text-xl md:text-2xl font-medium text-white mb-6">
                What makes us different?
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <motion.div 
                  className="space-y-4"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-full mx-auto flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full" />
                  </div>
                  <h4 className="font-medium text-white">Senior-Led</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Every project guided by seasoned strategists, not junior account managers
                  </p>
                </motion.div>

                <motion.div 
                  className="space-y-4"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-full mx-auto flex items-center justify-center">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                  </div>
                  <h4 className="font-medium text-white">Advisory Model</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Strategic consultation drives execution, ensuring every decision serves your goals
                  </p>
                </motion.div>

                <motion.div 
                  className="space-y-4"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-500/30 rounded-full mx-auto flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  </div>
                  <h4 className="font-medium text-white">Outcome Focused</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Your success is our reputation—we measure ourselves by your results
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Human Connection Elements */}
          <motion.div 
            className="mt-20 text-center space-y-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <blockquote className="text-lg md:text-xl text-white/80 font-light italic max-w-3xl mx-auto leading-relaxed">
              "We've spent years building relationships in this industry. 
              When you work with Paritee, you're not just hiring an agency—
              you're joining a community of people who genuinely care about your success."
            </blockquote>
            
            <div className="text-sm text-white/60">
              — The Advisory Team
            </div>

            {/* Personal Touch for Different User Types */}
            {journeyState.userType && (
              <motion.div 
                className="mt-12 p-6 bg-black/20 backdrop-blur border border-white/10 rounded-xl max-w-lg mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="text-sm text-white/70">
                  {journeyState.userType === 'cmo' && "As a CMO, you need partners who understand the pressure you're under and the results you need to deliver."}
                  {journeyState.userType === 'agency-owner' && "As an agency owner, you know the challenges of scaling while maintaining quality—we've been there too."}
                  {journeyState.userType === 'marketer' && "As a marketer, you need a team that supports your vision and gives you the tools to succeed."}
                  {journeyState.userType === 'explorer' && "We understand that choosing the right marketing partner is a significant decision. We're here to earn your trust."}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Subtle Ambient Elements */}
      <motion.div
        className="absolute top-1/4 left-4 w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0 }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-4 w-px h-24 bg-gradient-to-t from-transparent via-white/10 to-transparent"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      />
    </motion.section>
  )
}