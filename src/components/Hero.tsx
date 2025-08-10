'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import CtaButtons from './CtaButtons'

const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-stone-50"
      style={{
        backgroundImage: `linear-gradient(rgba(250, 249, 249, 0.8), rgba(250, 249, 249, 0.8)), url('/images/hero/image-0-92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      style={{
        backgroundImage: 'linear-gradient(rgba(250, 249, 249, 0.8), rgba(250, 249, 249, 0.8)), url(/images/hero/image-0-92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
      <div className="container text-center space-y-16 px-6">
        <motion.div 
          className="space-y-12"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <motion.h1 className="font-heading font-bold tracking-tight leading-[0.85]">
            <motion.div 
              className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] mb-6 text-stone-900"
              variants={wordVariants}
            >
              No Compromise.
            </motion.div>
            <motion.div 
              className="text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] text-stone-600"
              variants={wordVariants}
            >
              Just Better.
            </motion.div>
          </motion.h1>
          
          <motion.div
            className="max-w-5xl mx-auto space-y-8"
            variants={wordVariants}
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.2] text-stone-800">
              This is not a network of competing agencies.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-stone-600 max-w-4xl mx-auto font-light">
              We are united experts who refuse to accept the false trade-offs that have plagued marketing for decades. 
              No choosing between creativity and performance. No compromise between brand and conversion. 
              Just better results through better collaboration.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <CtaButtons
            primary={{ text: 'Start Your Project', href: '#contact', icon: <ArrowRight size={20} /> }}
            secondary={{ text: 'Watch Our Story', href: '#', icon: <Play size={20} /> }}
            className="mb-16"
          />
        </motion.div>

        <motion.div 
          className="pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-heading text-stone-900 mb-2">150+</div>
              <div className="text-sm uppercase tracking-wide text-stone-500">Global Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-heading text-stone-900 mb-2">25+</div>
              <div className="text-sm uppercase tracking-wide text-stone-500">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-heading text-stone-900 mb-2">500+</div>
              <div className="text-sm uppercase tracking-wide text-stone-500">Campaigns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-heading text-stone-900 mb-2">$2B+</div>
              <div className="text-sm uppercase tracking-wide text-stone-500">Media Managed</div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-stone-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-stone-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}