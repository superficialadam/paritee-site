'use client'

import { motion } from 'framer-motion'
import CtaButtons from './CtaButtons'

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-white animated-heading hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ whiteSpace: 'nowrap' }}
          >
            No Compromise. Just Better.
          </motion.h1>
          
          <motion.div 
            className="text-lg md:text-xl text-blue-100 mb-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="font-semibold">You've been asked to make trade-offs for too long.</p>
            <p>Big agencies that go big on overhead but fall short on care.</p>
            <p>Small agencies that bring passion but can't keep pace.</p>
            <p>You've had to choose between speed and scale.</p>
            <p>Bold thinking and trusted delivery.</p>
            <p className="text-2xl font-bold text-blue-300 mt-6">That compromise ends with Paritee.</p>
            <p className="mt-4">We are a coalition of top-tier, advisory-led agencies united by one principle: <span className="font-semibold">You deserve better.</span></p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CtaButtons 
              primary={{ text: 'Explore Our Work', href: '#cases' }}
              secondary={{ text: 'Get in Touch', href: '#contact' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}