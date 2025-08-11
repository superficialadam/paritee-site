'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useUserJourney } from './UserJourneyProvider'

export default function NarrativeHeroD() {
  const [currentBeat, setCurrentBeat] = useState(0)
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { journeyState, recordInteraction, updateStage } = useUserJourney()
  const { scrollY } = useScroll()
  const isInView = useInView(sectionRef, { margin: "-20%" })

  const parallaxY = useTransform(scrollY, [0, 1000], [0, -200])
  const opacity = useTransform(scrollY, [0, 600], [1, 0.3])

  // Sophisticated narrative structure
  const storyBeats = [
    "You've been told to choose.",
    "Scale or care. Speed or quality.",
    "Bold thinking or reliable delivery.",
    "But what if you didn't have to?",
    "Paritee is advisory-led marketing at its finest.",
    "Where senior strategic minds craft every solution.",
    "No more compromises.",
    "Just better."
  ]

  useEffect(() => {
    setMounted(true)
    if (isInView) {
      updateStage('discovery')
      recordInteraction('hero-narrative')
    }
  }, [isInView, updateStage, recordInteraction])

  // Story progression
  useEffect(() => {
    if (!mounted || !isInView) return

    const timer = setTimeout(() => {
      setCurrentBeat(prev => {
        if (prev < storyBeats.length - 1) {
          recordInteraction(`story-beat-${prev}`)
          return prev + 1
        }
        return prev
      })
    }, 2500)

    return () => clearTimeout(timer)
  }, [currentBeat, mounted, isInView, storyBeats.length, recordInteraction])

  if (!mounted) return null

  const currentStoryBeat = storyBeats[currentBeat]

  return (
    <motion.section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ y: parallaxY, opacity }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-900" />

      <div className="container mx-auto px-8 relative z-10">
        
        {/* Brand Mark */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-light tracking-wider text-white/80 mb-2">
            PARITEE
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto" />
        </motion.div>

        {/* Dynamic Narrative */}
        <div className="text-center space-y-8 max-w-5xl mx-auto">
          <div className="min-h-[200px] md:min-h-[300px] flex items-center justify-center">
            <motion.h2
              key={`story-${currentBeat}`}
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-tight text-white"
              initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ 
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {currentStoryBeat}
            </motion.h2>
          </div>

          {/* Story Progress */}
          <div className="flex justify-center space-x-2">
            {storyBeats.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index <= currentBeat 
                    ? 'w-8 bg-blue-400 opacity-100' 
                    : 'w-4 bg-white/20 opacity-50'
                }`}
              />
            ))}
          </div>

          {/* CTA appears when story completes */}
          {currentBeat >= storyBeats.length - 1 && (
            <motion.div
              className="pt-16 space-y-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.a
                  href="#intelligent-services"
                  className="group bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-8 py-4 font-semibold text-lg tracking-wide transition-all duration-500"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => recordInteraction('explore-services')}
                >
                  <span className="relative z-10">Explore Services</span>
                </motion.a>
                
                <motion.a
                  href="#emotional-mission"
                  className="text-white/70 hover:text-white underline-offset-4 hover:underline transition-colors"
                  onClick={() => recordInteraction('learn-more')}
                >
                  Learn more
                </motion.a>
              </div>

              {/* Scroll Indicator */}
              <motion.div
                className="pt-8"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex flex-col items-center space-y-3 text-white/40">
                  <div className="text-xs tracking-widest">DISCOVER MORE</div>
                  <div className="w-px h-12 bg-gradient-to-b from-transparent via-current to-transparent" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Ambient Elements */}
        <motion.div
          className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-8 w-px h-24 bg-gradient-to-t from-transparent via-white/20 to-transparent"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />
      </div>
    </motion.section>
  )
}