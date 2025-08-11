'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const navigation = [
  { name: 'Home', href: '/nightly/synthesis-a' },
  { name: 'Services', href: '/nightly/synthesis-a/services' },
  { name: 'Sectors', href: '/nightly/synthesis-a/sectors' },
  { name: 'Geographies', href: '/nightly/synthesis-a/geographies' },
  { name: 'Agencies', href: '/nightly/synthesis-a/agencies' },
  { name: 'Cases', href: '/nightly/synthesis-a/cases' },
  { name: 'Team', href: '/nightly/synthesis-a/team' },
  { name: 'News', href: '/nightly/synthesis-a/news' },
  { name: 'Contact', href: '/nightly/synthesis-a/contact' },
]

const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const navVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header 
      className="border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-xl sticky top-0 z-50"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="max-w-7xl mx-auto px-8 py-6">
        <nav className="flex items-center justify-between">
          {/* Logo with brand-consistent gradient */}
          <motion.div variants={navItemVariants}>
            <Link 
              href="/nightly/synthesis-a" 
              className="text-2xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent hover:from-blue-200 hover:via-blue-100 hover:to-white transition-all duration-500 motion-reduce:transition-none"
            >
              Paritee
            </Link>
          </motion.div>

          {/* Desktop Navigation with refined styling */}
          <motion.div 
            className="hidden lg:flex items-center space-x-1"
            variants={navVariants}
          >
            {navigation.map((item) => (
              <motion.div key={item.name} variants={navItemVariants}>
                <Link
                  href={item.href}
                  className="group relative px-5 py-3 text-slate-300 hover:text-blue-400 transition-all duration-300 rounded-full hover:bg-blue-600/5 border border-transparent hover:border-blue-600/20 font-medium backdrop-blur-sm"
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Subtle animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-95 group-hover:scale-100" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile menu button */}
          <motion.div variants={navItemVariants}>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </motion.div>
        </nav>

        {/* Enhanced Mobile Navigation */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0
          }}
          transition={{ 
            duration: 0.3, 
            ease: [0.22, 1, 0.36, 1],
            opacity: { delay: mobileMenuOpen ? 0.1 : 0 }
          }}
          className="lg:hidden overflow-hidden"
        >
          <div className="space-y-2 py-6 border-t border-slate-700/30 mt-6">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: mobileMenuOpen ? 1 : 0, 
                  x: mobileMenuOpen ? 0 : -20 
                }}
                transition={{ 
                  delay: mobileMenuOpen ? index * 0.05 : 0,
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Link
                  href={item.href}
                  className="group flex items-center px-6 py-4 text-slate-300 hover:text-blue-400 hover:bg-slate-800/20 transition-all duration-300 rounded-none border-l-4 border-transparent hover:border-blue-600/50 font-medium relative overflow-hidden"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}