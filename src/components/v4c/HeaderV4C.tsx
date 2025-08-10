'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, Database, Brain } from 'lucide-react'

export default function HeaderV4C() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    // Glitch effect interval
    const glitchInterval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 150)
    }, 5000)

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(glitchInterval)
    }
  }, [])

  const navItems = [
    { id: 'home', label: 'INIT', icon: Zap },
    { id: 'services', label: 'SERVICES', icon: Database },
    { id: 'cases', label: 'PORTFOLIO', icon: Brain },
    { id: 'team', label: 'NETWORK', icon: Zap },
    { id: 'contact', label: 'CONNECT', icon: Database }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-red-500/20' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between py-6">
          
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <motion.div
                className={`w-10 h-10 border-2 ${
                  glitch ? 'border-red-400 bg-red-500/20' : 'border-red-500 bg-red-500/10'
                } flex items-center justify-center font-mono font-bold text-lg ${
                  glitch ? 'text-red-300' : 'text-red-400'
                }`}
                animate={{
                  rotate: glitch ? [0, 2, -1, 0] : 0,
                  scale: glitch ? [1, 1.1, 0.95, 1] : 1
                }}
                transition={{ duration: 0.3 }}
              >
                P
              </motion.div>
              {glitch && (
                <div className="absolute inset-0 w-10 h-10 border-2 border-blue-400 bg-blue-500/20 flex items-center justify-center font-mono font-bold text-lg text-blue-300 translate-x-1 -translate-y-1 opacity-70">
                  P
                </div>
              )}
            </div>
            
            <motion.div
              className={`font-mono font-bold text-xl tracking-tight ${
                glitch 
                  ? 'text-red-300' 
                  : 'text-white'
              }`}
              style={{
                textShadow: glitch 
                  ? '1px 0 #ff0000, -1px 0 #00ffff' 
                  : 'none'
              }}
            >
              PARITEE
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group relative px-4 py-2 font-mono text-sm tracking-wider transition-all duration-300 hover:text-red-400 text-slate-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-2">
                    <IconComponent size={14} className="opacity-60 group-hover:opacity-100" />
                    <span>{item.label}</span>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
                  
                  {/* Bottom line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </motion.button>
              )
            })}
          </nav>

          {/* Contact Button */}
          <motion.button
            onClick={() => scrollToSection('contact')}
            className="hidden lg:block relative overflow-hidden bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-mono text-xs tracking-widest uppercase transition-all duration-300 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="relative z-10">CONNECT</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden relative z-50 p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40 bg-slate-900/98 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col justify-center items-center h-full space-y-8 font-mono"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {navItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="group flex items-center space-x-4 text-2xl tracking-widest text-white hover:text-red-400 transition-colors duration-300"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent size={24} className="opacity-60 group-hover:opacity-100" />
                    <span>{item.label}</span>
                  </motion.button>
                )
              })}
              
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-mono text-sm tracking-widest uppercase transition-all duration-300"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CONNECT
              </motion.button>
            </motion.div>

            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                className="absolute top-1/4 left-1/4 w-32 h-32 border border-red-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-20 h-20 border border-blue-500/20 rotate-45"
                animate={{ rotate: 405 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}