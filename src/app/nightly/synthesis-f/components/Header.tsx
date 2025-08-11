'use client'

import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Menu, X, ChevronRight, Search, Compass, Users, Briefcase, Globe, MessageCircle, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  priority: number
  predictedIntent?: 'explore' | 'navigate' | 'select' | 'browse' | 'search'
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/nightly/synthesis-f', icon: Compass, description: 'Return to homepage', priority: 1, predictedIntent: 'navigate' },
  { name: 'Services', href: '/nightly/synthesis-f/services', icon: Star, description: 'Our service offerings', priority: 2, predictedIntent: 'explore' },
  { name: 'Sectors', href: '/nightly/synthesis-f/sectors', icon: Briefcase, description: 'Industry expertise', priority: 3, predictedIntent: 'browse' },
  { name: 'Geographies', href: '/nightly/synthesis-f/geographies', icon: Globe, description: 'Global presence', priority: 4, predictedIntent: 'browse' },
  { name: 'Agencies', href: '/nightly/synthesis-f/agencies', icon: Users, description: 'Partner agencies', priority: 5, predictedIntent: 'explore' },
  { name: 'Cases', href: '/nightly/synthesis-f/cases', icon: Search, description: 'Case studies', priority: 6, predictedIntent: 'browse' },
  { name: 'Team', href: '/nightly/synthesis-f/team', icon: Users, description: 'Meet our people', priority: 7, predictedIntent: 'explore' },
  { name: 'News', href: '/nightly/synthesis-f/news', icon: MessageCircle, description: 'Latest updates', priority: 8, predictedIntent: 'browse' },
  { name: 'Contact', href: '/nightly/synthesis-f/contact', icon: MessageCircle, description: 'Get in touch', priority: 9, predictedIntent: 'select' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [userIntent, setUserIntent] = useState<string>('explore')
  const [predictedNavigation, setPredictedNavigation] = useState<string[]>([])
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  
  const headerRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const hoverTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map())
  const predictivePreloads = useRef<Set<string>>(new Set())
  
  // Advanced scroll behavior with intent prediction
  useEffect(() => {
    let ticking = false
    
    const updateScrollState = () => {
      const scrollY = window.pageYOffset
      const delta = scrollY - lastScrollY.current
      
      // Header visibility based on scroll direction and speed
      if (scrollY > 100) { // Only hide after scrolling past hero
        if (delta > 5 && scrollY > lastScrollY.current) {
          setIsVisible(false) // Hide on scroll down
        } else if (delta < -5 || scrollY < lastScrollY.current) {
          setIsVisible(true) // Show on scroll up
        }
      } else {
        setIsVisible(true)
      }
      
      setScrolled(scrollY > 20)
      lastScrollY.current = scrollY
      ticking = false
    }
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState)
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Listen for user intent updates
  useEffect(() => {
    const handleIntentUpdate = (event: CustomEvent) => {
      const { primary, predictedNext, confidence } = event.detail
      
      if (confidence > 0.6) {
        setUserIntent(primary)
        setPredictedNavigation(predictedNext)
        
        // Preload likely navigation targets
        predictivePreload(predictedNext)
      }
    }
    
    window.addEventListener('user-intent-update', handleIntentUpdate as EventListener)
    return () => window.removeEventListener('user-intent-update', handleIntentUpdate as EventListener)
  }, [])
  
  // Predictive preloading based on user intent
  const predictivePreload = useCallback((predictions: string[]) => {
    for (const prediction of predictions) {
      const matchingItem = navigation.find(item => 
        item.predictedIntent === prediction || 
        item.name.toLowerCase().includes(prediction.replace('-', ' '))
      )
      
      if (matchingItem && !predictivePreloads.current.has(matchingItem.href)) {
        // Preload the page
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = matchingItem.href
        document.head.appendChild(link)
        
        predictivePreloads.current.add(matchingItem.href)
        
        // Remove after 30 seconds to prevent memory leaks
        setTimeout(() => {
          document.head.removeChild(link)
          predictivePreloads.current.delete(matchingItem.href)
        }, 30000)
      }
    }
  }, [])
  
  // Intelligent hover handling with delay prediction
  const handleItemHover = useCallback((itemName: string, isEntering: boolean) => {
    if (isEntering) {
      // Clear any existing timeout
      const existingTimeout = hoverTimeouts.current.get(itemName)
      if (existingTimeout) {
        clearTimeout(existingTimeout)
      }
      
      // Set new timeout based on user intent
      const delay = userIntent === 'select' ? 200 : userIntent === 'explore' ? 100 : 300
      
      const timeout = setTimeout(() => {
        setActiveItem(itemName)
        
        // Preload on hover if user seems intentional
        const item = navigation.find(nav => nav.name === itemName)
        if (item && !predictivePreloads.current.has(item.href)) {
          predictivePreload([item.predictedIntent || 'navigate'])
        }
      }, delay)
      
      hoverTimeouts.current.set(itemName, timeout)
    } else {
      // Clear timeout and active state
      const timeout = hoverTimeouts.current.get(itemName)
      if (timeout) {
        clearTimeout(timeout)
        hoverTimeouts.current.delete(itemName)
      }
      
      setActiveItem(null)
    }
  }, [userIntent, predictivePreload])
  
  // Keyboard navigation with intent awareness
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault()
        // Focus search or trigger search intent
        const searchIntent = new CustomEvent('search-intent-trigger')
        window.dispatchEvent(searchIntent)
      }
      
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
        setActiveItem(null)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  // Mobile menu with predictive ordering
  const getSortedNavigation = useCallback(() => {
    const sorted = [...navigation].sort((a, b) => {
      // Boost priority based on predicted intent
      const aBoost = predictedNavigation.includes(a.predictedIntent || '') ? -10 : 0
      const bBoost = predictedNavigation.includes(b.predictedIntent || '') ? -10 : 0
      
      return (a.priority + aBoost) - (b.priority + bBoost)
    })
    
    return sorted
  }, [predictedNavigation])

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-consciousness',
          scrolled 
            ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50 shadow-excellence' 
            : 'bg-transparent',
          isVisible ? 'translate-y-0' : '-translate-y-full'
        )}
        role="banner"
      >
        <div className="excellence-content-flow">
          <div className="col-start-2 px-fibonacci-21 py-fibonacci-13">
            <nav className="flex items-center justify-between" role="navigation">
              {/* Logo with consciousness-level branding */}
              <Link 
                href="/nightly/synthesis-f"
                className={cn(
                  "group relative text-phi-xl font-semibold transition-all duration-300 ease-consciousness",
                  "bg-gradient-to-r from-white via-excellence-blue-300 to-excellence-blue-400 bg-clip-text text-transparent",
                  "hover:from-excellence-blue-400 hover:via-excellence-blue-300 hover:to-white",
                  "hover:scale-105 motion-reduce:hover:scale-100",
                  "focus:outline-none focus:ring-2 focus:ring-excellence-blue-400 focus:ring-offset-2 rounded-fibonacci-8"
                )}
                onMouseEnter={() => handleItemHover('home', true)}
                onMouseLeave={() => handleItemHover('home', false)}
              >
                <span className="relative z-10">Paritee</span>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-excellence-blue-400/20 to-excellence-blue-300/20 rounded-fibonacci-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-fibonacci-8" />
                
                {/* Breathing animation for ultimate polish */}
                <div className="absolute -inset-fibonacci-8 bg-gradient-to-r from-excellence-blue-600/10 to-excellence-blue-400/10 rounded-fibonacci-13 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-breathing" />
              </Link>

              {/* Desktop Navigation - Consciousness-Level Responsive */}
              <div className="hidden lg:flex items-center space-x-fibonacci-8">
                {getSortedNavigation().map((item) => {
                  const IconComponent = item.icon
                  const isPredicted = predictedNavigation.includes(item.predictedIntent || '')
                  const isActive = activeItem === item.name
                  
                  return (
                    <div key={item.name} className="relative">
                      <Link
                        href={item.href}
                        className={cn(
                          "group relative flex items-center space-x-fibonacci-8 px-fibonacci-13 py-fibonacci-8",
                          "text-slate-300 hover:text-excellence-blue-400 transition-all duration-300 ease-consciousness",
                          "rounded-fibonacci-8 hover:bg-excellence-blue-600/10 hover:backdrop-blur-sm",
                          "font-medium hover:-translate-y-0.5 motion-reduce:hover:-translate-y-0",
                          "hover:scale-102 motion-reduce:hover:scale-100 transform-gpu",
                          "focus:outline-none focus:ring-2 focus:ring-excellence-blue-400 focus:ring-offset-2",
                          isPredicted && "ring-1 ring-excellence-blue-500/30 bg-excellence-blue-600/5",
                          isActive && "text-excellence-blue-300 bg-excellence-blue-600/10"
                        )}
                        onMouseEnter={() => handleItemHover(item.name, true)}
                        onMouseLeave={() => handleItemHover(item.name, false)}
                        aria-label={item.description}
                      >
                        <IconComponent className={cn(
                          "w-fibonacci-13 h-fibonacci-13 transition-all duration-300 ease-consciousness",
                          "group-hover:text-excellence-blue-300 group-hover:scale-110",
                          isPredicted && "text-excellence-blue-400"
                        )} />
                        
                        <span className="relative z-10">{item.name}</span>
                        
                        {/* Predictive indicator */}
                        {isPredicted && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-excellence-blue-400 rounded-full animate-pulse-consciousness" />
                        )}
                        
                        {/* Hover background with golden ratio proportions */}
                        <div className={cn(
                          "absolute inset-0 bg-gradient-to-r from-excellence-blue-600/5 via-excellence-blue-500/10 to-excellence-blue-600/5",
                          "opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-fibonacci-8"
                        )} />
                      </Link>
                      
                      {/* Tooltip with description */}
                      <div className={cn(
                        "absolute top-full left-1/2 transform -translate-x-1/2 mt-fibonacci-8",
                        "px-fibonacci-13 py-fibonacci-8 bg-slate-900/95 backdrop-blur-xl",
                        "text-xs text-slate-300 rounded-fibonacci-8 border border-slate-700/50",
                        "opacity-0 pointer-events-none transition-all duration-300 ease-consciousness",
                        "group-hover:opacity-100 group-hover:translate-y-0 translate-y-fibonacci-8",
                        "shadow-consciousness whitespace-nowrap z-50"
                      )}>
                        {item.description}
                        
                        {/* Tooltip arrow */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-slate-900/95" />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Mobile menu button with consciousness-level feedback */}
              <button
                type="button"
                className={cn(
                  "lg:hidden relative p-fibonacci-8 text-slate-300 hover:text-white",
                  "hover:bg-slate-800/50 transition-all duration-300 ease-consciousness",
                  "rounded-fibonacci-8 hover:scale-110 motion-reduce:hover:scale-100 transform-gpu",
                  "focus:outline-none focus:ring-2 focus:ring-excellence-blue-400 focus:ring-offset-2"
                )}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                <div className={cn(
                  "transition-transform duration-300 ease-consciousness",
                  mobileMenuOpen ? "rotate-180" : "rotate-0"
                )}>
                  {mobileMenuOpen ? (
                    <X className="h-fibonacci-21 w-fibonacci-21" />
                  ) : (
                    <Menu className="h-fibonacci-21 w-fibonacci-21" />
                  )}
                </div>
                
                {/* Ripple effect on click */}
                <div className="absolute inset-0 bg-excellence-blue-400/20 rounded-fibonacci-8 scale-0 transition-transform duration-300 ease-consciousness group-active:scale-100" />
              </button>
            </nav>

            {/* Mobile Navigation - Predictively Ordered */}
            <div
              className={cn(
                'lg:hidden overflow-hidden transition-all duration-700 ease-consciousness transform-gpu',
                mobileMenuOpen
                  ? 'max-h-screen opacity-100 mt-fibonacci-21 translate-y-0'
                  : 'max-h-0 opacity-0 -translate-y-fibonacci-13'
              )}
            >
              <div className="py-fibonacci-13 border-t border-slate-700/50 mt-fibonacci-13">
                <div className="space-y-fibonacci-8">
                  {getSortedNavigation().map((item, index) => {
                    const IconComponent = item.icon
                    const isPredicted = predictedNavigation.includes(item.predictedIntent || '')
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "group flex items-center space-x-fibonacci-13 px-fibonacci-13 py-fibonacci-13",
                          "text-slate-300 hover:text-excellence-blue-400 hover:bg-slate-800/50",
                          "transition-all duration-300 ease-consciousness rounded-fibonacci-8",
                          "border-l-4 border-transparent hover:border-excellence-blue-600/50",
                          "font-medium hover:translate-x-fibonacci-8 motion-reduce:hover:translate-x-0 transform-gpu",
                          "focus:outline-none focus:ring-2 focus:ring-excellence-blue-400 focus:ring-offset-2",
                          isPredicted && "border-l-excellence-blue-500/50 bg-excellence-blue-600/5"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          animationDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                          animationFillMode: 'both'
                        }}
                      >
                        <IconComponent className={cn(
                          "w-fibonacci-21 h-fibonacci-21 transition-all duration-300 ease-consciousness",
                          "group-hover:text-excellence-blue-300 group-hover:scale-110",
                          isPredicted && "text-excellence-blue-400"
                        )} />
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="relative z-10">{item.name}</span>
                            
                            {/* Predictive indicator */}
                            {isPredicted && (
                              <div className="w-2 h-2 bg-excellence-blue-400 rounded-full animate-pulse-consciousness" />
                            )}
                          </div>
                          
                          <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                            {item.description}
                          </p>
                        </div>
                        
                        <ChevronRight className="w-fibonacci-13 h-fibonacci-13 text-slate-500 group-hover:text-excellence-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                        
                        {/* Mobile hover background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-excellence-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-fibonacci-8" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}