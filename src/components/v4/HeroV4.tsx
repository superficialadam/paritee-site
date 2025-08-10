'use client'

import { motion } from 'framer-motion'
import ButtonV4 from './ButtonV4'
import LogoV4 from './LogoV4'

const HeroV4 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-8 text-center">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <LogoV4 size="hero" variant="light" />
        </motion.div>
        
        <motion.h1 
          className="text-display text-cream mb-8 text-3d-subtle"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Creative Networks
        </motion.h1>
        
        <motion.p 
          className="text-body-large text-warm-gray mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          Connecting brands with the right creative partners through curated networks, 
          strategic matching, and collaborative excellence.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <ButtonV4 variant="primary" size="large" href="#services">
            Explore Services
          </ButtonV4>
          <ButtonV4 variant="secondary" size="large" href="#cases">
            View Case Studies
          </ButtonV4>
        </motion.div>
        
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <div className="text-caption text-gold uppercase tracking-wider mb-4">
            Scroll to Explore
          </div>
          <motion.div 
            className="w-6 h-10 border border-warm-gray rounded-full mx-auto flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div 
              className="w-1 h-3 bg-sage rounded-full mt-2"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroV4