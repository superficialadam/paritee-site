'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

// Navigation structure with advanced organization
const navigationItems = [
  { name: 'Home', href: '/nightly/synthesis-c', exact: true },
  { 
    name: 'Services', 
    href: '/nightly/synthesis-c/services',
    submenu: [
      { name: 'Strategy & Consulting', href: '/nightly/synthesis-c/services#strategy' },
      { name: 'Creative & Design', href: '/nightly/synthesis-c/services#creative' },
      { name: 'Technology & Development', href: '/nightly/synthesis-c/services#technology' },
      { name: 'Marketing & Growth', href: '/nightly/synthesis-c/services#marketing' }
    ]
  },
  { name: 'Our Work', href: '/nightly/synthesis-c/cases' },
  { 
    name: 'Network', 
    href: '/nightly/synthesis-c/agencies',
    submenu: [
      { name: 'Our Agencies', href: '/nightly/synthesis-c/agencies' },
      { name: 'Team', href: '/nightly/synthesis-c/team' },
      { name: 'Locations', href: '/nightly/synthesis-c/geographies' },
      { name: 'Sectors', href: '/nightly/synthesis-c/sectors' }
    ]
  },
  { name: 'News', href: '/nightly/synthesis-c/news' },
  { name: 'Contact', href: '/nightly/synthesis-c/contact' }
]

interface HeaderProps {
  className?: string
}

export function Header({ className = '' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const submenuTimeoutRef = useRef<NodeJS.Timeout>()

  // Reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Advanced scroll detection with performance optimization
  useEffect(() => {
    let ticking = false
    let lastScrollY = 0
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const shouldBeScrolled = scrollY > 20
          
          if (shouldBeScrolled !== isScrolled) {
            setIsScrolled(shouldBeScrolled)
          }
          
          lastScrollY = scrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled])

  // Intersection Observer for header visibility
  useEffect(() => {
    if (!headerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headerRef.current?.classList.remove('header-hidden')
        } else {
          headerRef.current?.classList.add('header-hidden')
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-100px 0px 0px 0px'
      }
    )

    const sentinel = document.createElement('div')
    sentinel.style.position = 'absolute'
    sentinel.style.top = '0'
    sentinel.style.height = '1px'
    sentinel.style.width = '100%'
    document.body.prepend(sentinel)

    observer.observe(sentinel)

    return () => {
      observer.disconnect()
      sentinel.remove()
    }
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveSubmenu(null)
  }, [pathname])

  // Handle outside clicks for submenus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null)
      }
    }

    if (activeSubmenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeSubmenu])

  // Keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsMobileMenuOpen(false)
      setActiveSubmenu(null)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Submenu hover handlers with debouncing
  const handleSubmenuEnter = useCallback((itemName: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current)
    }
    setActiveSubmenu(itemName)
  }, [])

  const handleSubmenuLeave = useCallback(() => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null)
    }, 150)
  }, [])

  // Check if a navigation item is active
  const isActiveItem = (href: string, exact = false) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <motion.header
      ref={headerRef}
      className={`synthesis-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg' 
          : 'bg-transparent'
      } ${className}`}
      initial={prefersReducedMotion ? false : { y: -100, opacity: 0 }}
      animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
      transition={prefersReducedMotion ? undefined : { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 z-50"
            initial={prefersReducedMotion ? false : { scale: 0.8, opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { scale: 1, opacity: 1 }}
            transition={prefersReducedMotion ? undefined : { delay: 0.2, duration: 0.4 }}
          >
            <Link
              href="/nightly/synthesis-c"
              className="synthesis-logo-hover flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg p-1"
              aria-label="Paritee Home"
            >
              <div className="relative">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:via-blue-100 group-hover:to-white transition-all duration-300">
                  Paritee
                </h1>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-full transition-all duration-300" />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main navigation">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative"
                initial={prefersReducedMotion ? false : { y: -20, opacity: 0 }}
                animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
                transition={prefersReducedMotion ? undefined : { 
                  delay: 0.3 + (index * 0.1), 
                  duration: 0.4 
                }}
                onMouseEnter={() => item.submenu && handleSubmenuEnter(item.name)}
                onMouseLeave={() => item.submenu && handleSubmenuLeave()}
              >
                <Link
                  href={item.href}
                  className={`synthesis-nav-item px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 group relative ${
                    isActiveItem(item.href, item.exact)
                      ? 'text-blue-400 bg-blue-600/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                  aria-current={isActiveItem(item.href, item.exact) ? 'page' : undefined}
                >
                  <span className="relative z-10">{item.name}</span>
                  {item.submenu && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeSubmenu === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                  
                  {/* Active indicator */}
                  {isActiveItem(item.href, item.exact) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                      layoutId="activeIndicator"
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
                    />
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-400/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10" />
                </Link>

                {/* Submenu */}
                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.name && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-lg shadow-xl overflow-hidden z-50"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
                    >
                      <div className="py-2">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors duration-150"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </nav>

          {/* CTA Button (Desktop) */}
          <motion.div
            className="hidden lg:block"
            initial={prefersReducedMotion ? false : { x: 20, opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { x: 0, opacity: 1 }}
            transition={prefersReducedMotion ? undefined : { delay: 0.5, duration: 0.4 }}
          >
            <Link
              href="/nightly/synthesis-c/contact"
              className="synthesis-button inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden synthesis-menu-button p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 z-50"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            className="lg:hidden absolute top-full left-0 right-0 bg-slate-900/98 backdrop-blur-md border-b border-slate-700/50 shadow-2xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: prefersReducedMotion ? 0.01 : 0.3,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <nav className="px-4 py-6 space-y-1" aria-label="Mobile navigation">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={prefersReducedMotion ? false : { x: -20, opacity: 0 }}
                  animate={prefersReducedMotion ? undefined : { x: 0, opacity: 1 }}
                  transition={prefersReducedMotion ? undefined : { 
                    delay: 0.1 + (index * 0.05),
                    duration: 0.3
                  }}
                  className="block"
                >
                  <Link
                    href={item.href}
                    className={`synthesis-mobile-nav-item block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActiveItem(item.href, item.exact)
                        ? 'text-blue-400 bg-blue-600/10 border-l-4 border-blue-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border-l-4 border-transparent'
                    }`}
                    aria-current={isActiveItem(item.href, item.exact) ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                  
                  {/* Mobile Submenu */}
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-slate-400 hover:text-slate-300 rounded-lg transition-colors duration-150"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              
              {/* Mobile CTA */}
              <motion.div
                className="pt-6 border-t border-slate-700/50"
                initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
                animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
                transition={prefersReducedMotion ? undefined : { 
                  delay: 0.4,
                  duration: 0.3
                }}
              >
                <Link
                  href="/nightly/synthesis-c/contact"
                  className="synthesis-button block text-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Get Started
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ top: '100%' }}
          />
        )}
      </AnimatePresence>
    </motion.header>
  )
}