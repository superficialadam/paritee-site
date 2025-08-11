'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export function Footer() {
  return (
    <motion.footer 
      className="border-t border-slate-800/50 bg-slate-900/30 backdrop-blur-xl relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center space-y-6">
          {/* Brand logo */}
          <div>
            <Link 
              href="/nightly/synthesis-a" 
              className="text-3xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent hover:from-blue-200 hover:via-blue-100 hover:to-white transition-all duration-500"
            >
              Paritee
            </Link>
          </div>
          
          {/* Tagline */}
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Great things happen when equals come together.
          </p>
          
          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto" />
          
          {/* Copyright */}
          <div className="text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Paritee. A coalition of top-tier, advisory-led agencies.</p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}