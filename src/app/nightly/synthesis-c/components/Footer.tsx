'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Github,
  ExternalLink,
  ArrowUp,
  Heart,
  Zap
} from 'lucide-react'

// Footer navigation structure
const footerSections = [
  {
    title: 'Services',
    links: [
      { name: 'Strategy & Consulting', href: '/nightly/synthesis-c/services#strategy' },
      { name: 'Creative & Design', href: '/nightly/synthesis-c/services#creative' },
      { name: 'Technology & Development', href: '/nightly/synthesis-c/services#technology' },
      { name: 'Marketing & Growth', href: '/nightly/synthesis-c/services#marketing' },
    ]
  },
  {
    title: 'Network',
    links: [
      { name: 'Our Agencies', href: '/nightly/synthesis-c/agencies' },
      { name: 'Team Members', href: '/nightly/synthesis-c/team' },
      { name: 'Global Presence', href: '/nightly/synthesis-c/geographies' },
      { name: 'Industry Sectors', href: '/nightly/synthesis-c/sectors' },
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'Our Work', href: '/nightly/synthesis-c/cases' },
      { name: 'News & Updates', href: '/nightly/synthesis-c/news' },
      { name: 'Contact Us', href: '/nightly/synthesis-c/contact' },
      { name: 'Privacy Policy', href: '/nightly/synthesis-c/privacy' },
    ]
  }
]

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/paritee',
    icon: Linkedin,
    hoverColor: 'hover:text-blue-400'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/paritee',
    icon: Twitter,
    hoverColor: 'hover:text-sky-400'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/paritee',
    icon: Github,
    hoverColor: 'hover:text-purple-400'
  }
]

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@paritee.com',
    href: 'mailto:hello@paritee.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567'
  },
  {
    icon: MapPin,
    label: 'Headquarters',
    value: 'New York, London, Tokyo',
    href: '/nightly/synthesis-c/geographies'
  }
]

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [currentYear] = useState(new Date().getFullYear())

  // Reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    const footerElement = document.getElementById('footer')
    if (footerElement) {
      observer.observe(footerElement)
    }

    return () => observer.disconnect()
  }, [])

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      
      // Show button when user scrolls down significantly and isn't at the bottom
      const shouldShow = scrollTop > windowHeight && (docHeight - scrollTop - windowHeight) > 200
      setShowScrollTop(shouldShow)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top handler with smooth animation
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <motion.footer
      id="footer"
      className="synthesis-footer bg-gradient-to-b from-slate-900 via-slate-950 to-black border-t border-slate-800/50 relative overflow-hidden"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <motion.div 
              className="lg:col-span-4 space-y-6"
              variants={itemVariants}
            >
              <div>
                <Link
                  href="/nightly/synthesis-c"
                  className="inline-block group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-lg p-1"
                >
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:via-blue-100 group-hover:to-white transition-all duration-300">
                    Paritee
                  </h2>
                </Link>
                <div className="mt-4">
                  <p className="text-slate-400 leading-relaxed">
                    A coalition of top-tier, advisory-led agencies united by one principle: 
                    <span className="text-slate-300 font-medium"> You deserve better.</span>
                  </p>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                  Get in Touch
                </h3>
                <div className="space-y-3">
                  {contactInfo.map((contact, index) => {
                    const IconComponent = contact.icon
                    return (
                      <motion.div
                        key={contact.label}
                        variants={itemVariants}
                        custom={index}
                      >
                        <Link
                          href={contact.href}
                          className="flex items-center gap-3 text-slate-400 hover:text-slate-300 transition-colors duration-200 group"
                          {...(contact.href.startsWith('http') && {
                            target: '_blank',
                            rel: 'noopener noreferrer'
                          })}
                        >
                          <div className="w-5 h-5 flex-shrink-0">
                            <IconComponent className="w-5 h-5 group-hover:text-blue-400 transition-colors duration-200" />
                          </div>
                          <span className="text-sm">
                            {contact.value}
                            {contact.href.startsWith('http') && (
                              <ExternalLink className="w-3 h-3 inline ml-1" />
                            )}
                          </span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <motion.div
                        key={social.name}
                        variants={itemVariants}
                        custom={index}
                      >
                        <Link
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-400 ${social.hoverColor} hover:bg-slate-700/50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950`}
                          aria-label={`Follow us on ${social.name}`}
                        >
                          <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Navigation Sections */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {footerSections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.title}
                    className="space-y-4"
                    variants={itemVariants}
                    custom={sectionIndex}
                  >
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <motion.li
                          key={link.name}
                          variants={itemVariants}
                          custom={linkIndex}
                        >
                          <Link
                            href={link.href}
                            className="text-slate-400 hover:text-slate-300 text-sm transition-colors duration-200 group inline-flex items-center"
                          >
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                              {link.name}
                            </span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <motion.div
            className="mt-12 pt-8 border-t border-slate-800/50"
            variants={itemVariants}
          >
            <div className="max-w-md">
              <h3 className="text-lg font-semibold text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Get the latest insights and news from our network of agencies.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 flex items-center gap-1"
                >
                  <span>Subscribe</span>
                  <Zap className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-slate-800/50 bg-slate-950/50"
          variants={itemVariants}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>© {currentYear} Paritee. Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>and cutting-edge technology.</span>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <Link
                  href="/nightly/synthesis-c/privacy"
                  className="text-slate-400 hover:text-slate-300 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/nightly/synthesis-c/terms"
                  className="text-slate-400 hover:text-slate-300 transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={handleScrollToTop}
        className={`fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        initial={{ scale: 0 }}
        animate={{ 
          scale: showScrollTop ? 1 : 0,
          opacity: showScrollTop ? 1 : 0
        }}
        transition={{ 
          duration: prefersReducedMotion ? 0.01 : 0.3,
          ease: [0.22, 1, 0.36, 1]
        }}
        whileHover={prefersReducedMotion ? undefined : { 
          scale: 1.1,
          boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)'
        }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>

      {/* Development Information */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm border border-slate-600/50 rounded-lg px-3 py-1 text-xs font-mono z-40">
          <span className="text-slate-400">Synthesis-C: Ultimate Technical Implementation</span>
        </div>
      )}
    </motion.footer>
  )
}