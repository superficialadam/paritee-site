'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react'

export default function FooterV4C() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: '#', label: 'GITHUB' },
    { icon: Linkedin, href: '#', label: 'LINKEDIN' },
    { icon: Twitter, href: '#', label: 'TWITTER' },
    { icon: Mail, href: '#', label: 'CONTACT' }
  ]

  const navigationLinks = [
    { label: 'SERVICES', href: '#services' },
    { label: 'PORTFOLIO', href: '#cases' },
    { label: 'NETWORK', href: '#team' },
    { label: 'NEWS', href: '#news' },
    { label: 'CONTACT', href: '#contact' }
  ]

  const legalLinks = [
    { label: 'PRIVACY_POLICY', href: '#' },
    { label: 'TERMS_CONDITIONS', href: '#' },
    { label: 'LEGAL_NOTICE', href: '#' }
  ]

  return (
    <footer className="relative border-t border-red-500/20 bg-slate-900/50 backdrop-blur-md overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ff0000' stroke-width='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-8 relative z-10">
        <div className="py-16">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 border-2 border-red-500 bg-red-500/10 flex items-center justify-center font-mono font-bold text-xl text-red-400">
                  P
                </div>
                <div className="font-mono font-bold text-2xl tracking-tight text-white">
                  PARITEE
                </div>
              </motion.div>
              
              <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                Innovation through creative intelligence. 
                Where data meets imagination to deliver measurable results 
                and breakthrough performance.
              </p>
              
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => {
                  const IconComponent = link.icon
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      className="group w-10 h-10 border border-slate-600 hover:border-red-400 bg-slate-800/50 hover:bg-red-500/20 flex items-center justify-center transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <IconComponent size={16} className="text-slate-400 group-hover:text-red-400 transition-colors duration-300" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-mono font-bold text-white text-lg tracking-tight mb-6 relative">
                NAVIGATION
                <div className="absolute -bottom-2 left-0 w-8 h-px bg-red-500"></div>
              </h3>
              
              <nav className="space-y-3">
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="group flex items-center space-x-2 text-slate-400 hover:text-red-400 transition-colors duration-300 font-mono text-sm"
                    >
                      <span className="w-2 h-px bg-slate-600 group-hover:bg-red-400 group-hover:w-4 transition-all duration-300"></span>
                      <span>{link.label}</span>
                    </a>
                  </motion.div>
                ))}
              </nav>
            </motion.div>

            {/* Tech Status Panel */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="font-mono font-bold text-white text-lg tracking-tight mb-6 relative">
                SYSTEM_STATUS
                <div className="absolute -bottom-2 left-0 w-8 h-px bg-blue-500"></div>
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-mono">
                  <span className="text-slate-400">UPTIME</span>
                  <span className="text-green-400">99.97%</span>
                </div>
                
                <div className="flex justify-between items-center text-sm font-mono">
                  <span className="text-slate-400">RESPONSE</span>
                  <span className="text-blue-400">&lt; 50ms</span>
                </div>
                
                <div className="flex justify-between items-center text-sm font-mono">
                  <span className="text-slate-400">STATUS</span>
                  <span className="text-red-400 flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></span>
                    ONLINE
                  </span>
                </div>
                
                <motion.div
                  className="mt-6 p-4 border border-slate-700 bg-slate-800/30"
                  whileHover={{ borderColor: '#64748b' }}
                >
                  <div className="text-xs font-mono text-slate-400 mb-2">LAST_UPDATE</div>
                  <div className="text-sm font-mono text-white">{currentYear}.08.10_14:32:01</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="font-mono font-bold text-white text-lg tracking-tight mb-6 relative">
                CONNECT
                <div className="absolute -bottom-2 left-0 w-8 h-px bg-red-500"></div>
              </h3>
              
              <div className="space-y-4 text-sm font-mono text-slate-400">
                <div>
                  <div className="text-slate-500 text-xs mb-1">EMAIL</div>
                  <a href="mailto:hello@paritee.com" className="hover:text-red-400 transition-colors duration-300">
                    hello@paritee.com
                  </a>
                </div>
                
                <div>
                  <div className="text-slate-500 text-xs mb-1">PHONE</div>
                  <a href="tel:+1234567890" className="hover:text-red-400 transition-colors duration-300">
                    +1 (234) 567-8900
                  </a>
                </div>
                
                <motion.button
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>INIT_CONTACT</span>
                  <ExternalLink size={12} />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            className="pt-8 border-t border-slate-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              
              {/* Copyright */}
              <div className="text-slate-400 font-mono text-xs">
                © {currentYear} PARITEE. ALL_RIGHTS_RESERVED.
              </div>
              
              {/* Legal Links */}
              <div className="flex space-x-6">
                {legalLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="text-slate-500 hover:text-red-400 font-mono text-xs tracking-wider transition-colors duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              
              {/* Tech Badge */}
              <motion.div
                className="flex items-center space-x-2 text-xs font-mono text-slate-500"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>POWERED_BY_CREATIVE_INTELLIGENCE</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated corner elements */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-red-500/30"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        viewport={{ once: true }}
      />
      
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-blue-500/30"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.7 }}
        viewport={{ once: true }}
      />
    </footer>
  )
}