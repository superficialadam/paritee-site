'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useFutureInnovation } from '../hooks/useFutureInnovation'
import { useAICollaboration } from '../hooks/useAICollaboration'
import { 
  Sparkles, 
  Brain, 
  Zap, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  Github,
  Twitter,
  Linkedin,
  ArrowUp,
  Cpu,
  Atom,
  Eye,
  Headphones
} from 'lucide-react'

export function FutureFooter() {
  const { futureMode, enabledTechnologies, performanceMetrics } = useFutureInnovation()
  const { aiPersonality, generatedContent } = useAICollaboration()
  
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [aiFooterContent, setAiFooterContent] = useState<string>('')

  // Show back to top button when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Generate AI-powered footer tagline
  useEffect(() => {
    const taglines = [
      'Architecting tomorrow\'s partnerships today.',
      'Where human creativity meets artificial intelligence.',
      'Building the future of collaborative innovation.',
      'Pioneering the next generation of digital experiences.',
      'Creating impossible solutions through quantum collaboration.'
    ]
    
    const randomTagline = taglines[Math.floor(Math.random() * taglines.length)]
    setAiFooterContent(randomTagline)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { href: '/nightly/synthesis-i/services', label: 'Quantum Services' },
    { href: '/nightly/synthesis-i/cases', label: 'AI Case Studies' },
    { href: '/nightly/synthesis-i/team', label: 'Human-AI Team' },
    { href: '/nightly/synthesis-i/agencies', label: 'Partner Network' },
    { href: '/nightly/synthesis-i/news', label: 'Future Insights' }
  ]

  const technologies = [
    { id: 'webgpu_compute', name: 'WebGPU Computing', icon: Cpu },
    { id: 'ai_collaboration', name: 'AI Collaboration', icon: Brain },
    { id: 'spatial_computing', name: 'Spatial Computing', icon: Eye },
    { id: 'quantum_optimization', name: 'Quantum Optimization', icon: Atom }
  ]

  return (
    <footer className="relative bg-gradient-to-t from-black via-slate-950 to-slate-900 border-t border-white/10">
      {/* Future Technology Visualization */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-blue-400/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%',
              y: '100%',
              opacity: 0 
            }}
            animate={{
              y: '-10%',
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          
          {/* Brand & AI Assistant */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1] 
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                  Paritee
                </h3>
                <p className="text-blue-400 text-sm">Future Innovation Lab</p>
              </div>
            </div>

            <motion.p
              key={aiFooterContent}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-300 leading-relaxed"
            >
              {aiFooterContent}
            </motion.p>

            {/* AI Assistant Credit */}
            <div className="flex items-center gap-2 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <Brain className="w-4 h-4 text-purple-400" />
              <div className="text-sm">
                <div className="text-purple-300 font-medium">AI Assistant: {aiPersonality.name || 'Synthesis'}</div>
                <div className="text-gray-400 text-xs">Creative collaboration active</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' }
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-gray-300 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              Quick Access
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer text-sm"
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Technology Stack */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-green-400" />
              Future Tech
            </h4>
            <div className="space-y-3">
              {technologies.map((tech) => {
                const Icon = tech.icon
                const isEnabled = enabledTechnologies.has(tech.id)
                
                return (
                  <motion.div
                    key={tech.id}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      isEnabled 
                        ? 'bg-green-500/10 border border-green-500/20' 
                        : 'bg-gray-500/10 border border-gray-500/20'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${
                      isEnabled ? 'text-green-400' : 'text-gray-400'
                    }`} />
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${
                        isEnabled ? 'text-green-300' : 'text-gray-300'
                      }`}>
                        {tech.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {isEnabled ? 'Active' : 'Standby'}
                      </div>
                    </div>
                    {isEnabled && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Contact & Performance */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                Connect
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4 text-blue-400" />
                  future@paritee.com
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4 text-blue-400" />
                  +1 (555) FUTURE-1
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  Innovation District, Future City
                </div>
              </div>
            </div>

            {/* Real-time Performance Metrics */}
            <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-lg p-4">
              <h5 className="text-sm font-medium text-blue-300 mb-3">System Performance</h5>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">FPS</span>
                  <span className="text-green-400">{performanceMetrics.fps || 60}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mode</span>
                  <span className="text-blue-400">{futureMode.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">AI Content</span>
                  <span className="text-purple-400">{generatedContent.size} pieces</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Technologies</span>
                  <span className="text-cyan-400">{enabledTechnologies.size} active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2025 Paritee Future Innovation Lab. Pioneering tomorrow's partnerships.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
              <div className="flex items-center gap-1">
                <span>Built with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-red-400" />
                </motion.div>
                <span>by AI & Humans</span>
              </div>
            </div>
          </div>
        </div>

        {/* Future Mode Badge */}
        {futureMode === 'experimental' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 text-xs text-purple-300"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Atom className="w-3 h-3" />
              </motion.div>
              <span>Experimental Mode • Future Technologies Active</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg backdrop-blur-sm border border-blue-500/30 z-50"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </footer>
  )
}