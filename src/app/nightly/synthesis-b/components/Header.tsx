'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Home, Briefcase, Building2, Globe, Users, FolderOpen, UserCheck, Newspaper, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/nightly/synthesis-b', icon: Home },
  { name: 'Services', href: '/nightly/synthesis-b/services', icon: Briefcase },
  { name: 'Sectors', href: '/nightly/synthesis-b/sectors', icon: Building2 },
  { name: 'Geographies', href: '/nightly/synthesis-b/geographies', icon: Globe },
  { name: 'Agencies', href: '/nightly/synthesis-b/agencies', icon: Users },
  { name: 'Cases', href: '/nightly/synthesis-b/cases', icon: FolderOpen },
  { name: 'Team', href: '/nightly/synthesis-b/team', icon: UserCheck },
  { name: 'News', href: '/nightly/synthesis-b/news', icon: Newspaper },
  { name: 'Contact', href: '/nightly/synthesis-b/contact', icon: Phone },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)

  // Enhanced scroll detection for sticky header animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Superior keyboard and click-outside handling from Design-C
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
        mobileMenuButtonRef.current?.focus()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (!mobileMenuOpen || e.key !== 'Tab') return
      
      const focusableElements = mobileMenuRef.current?.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      ) as NodeListOf<HTMLElement>
      
      if (!focusableElements?.length) return
      
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleFocusTrap)
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleFocusTrap)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileMenuOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <header 
      className={cn(
        "border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 ease-out motion-header-sticky transform-gpu",
        isScrolled && "scrolled shadow-lg shadow-black/20"
      )}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center justify-between" role="navigation" aria-label="Main navigation">
          {/* Logo with Motion-A's smooth gradient animation */}
          <Link 
            href="/nightly/synthesis-b" 
            className={cn(
              "text-xl sm:text-2xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent",
              "hover:from-blue-200 hover:via-blue-100 hover:to-white transition-all duration-300 ease-out",
              "hover:scale-105 motion-reduce:hover:scale-100 transform-gpu motion-logo-hover",
              "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 focus:rounded-full focus:px-2 focus:py-1"
            )}
            aria-label="Paritee homepage"
          >
            Paritee
          </Link>

          {/* Desktop Navigation with icons and smooth animations */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-slate-300 hover:text-blue-400 transition-all duration-300 ease-out rounded-full",
                    "hover:bg-blue-600/10 hover:border hover:border-blue-600/30 flex items-center space-x-2 text-sm font-medium",
                    "hover:-translate-y-0.5 motion-reduce:hover:-translate-y-0 hover:scale-102 motion-reduce:hover:scale-100",
                    "transform-gpu relative overflow-hidden group motion-nav-item motion-focus",
                    "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                  )}
                  aria-label={`Go to ${item.name}`}
                >
                  <Icon className="w-4 h-4 motion-card-icon" />
                  <span className="hidden xl:inline relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-blue-500/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button with enhanced accessibility */}
          <Button
            ref={mobileMenuButtonRef}
            variant="ghost"
            size="lg"
            className={cn(
              "lg:hidden text-slate-300 hover:text-white hover:bg-slate-800 min-w-[48px] min-h-[48px] rounded-full",
              "transition-all duration-300 ease-out hover:scale-110 motion-reduce:hover:scale-100 transform-gpu motion-menu-button",
              "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <div className={cn(
              "transition-transform duration-300 ease-out",
              mobileMenuOpen ? "rotate-180" : "rotate-0"
            )}>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </div>
          </Button>
        </nav>

        {/* Mobile Navigation with superior UX from Design-C + Motion-A animations */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-500 ease-out transform-gpu',
            mobileMenuOpen
              ? 'max-h-screen opacity-100 mt-6 translate-y-0 border-t border-slate-800 pt-4 motion-mobile-menu-open'
              : 'max-h-0 opacity-0 -translate-y-4 motion-mobile-menu-closed'
          )}
          aria-hidden={!mobileMenuOpen}
          role="dialog"
          aria-modal={mobileMenuOpen}
          aria-label="Mobile navigation menu"
        >
          <nav className="space-y-1 py-2" role="navigation" aria-label="Mobile navigation">
            {navigation.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-4 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50",
                    "transition-all duration-300 ease-out rounded-lg min-h-[48px] font-medium",
                    "hover:translate-x-1 motion-reduce:hover:translate-x-0 transform-gpu relative overflow-hidden group",
                    "focus:outline-none focus:bg-blue-600/10 focus:text-blue-400 active:bg-blue-600/20 motion-mobile-nav-item motion-focus",
                    "motion-stagger-item"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label={`Go to ${item.name}`}
                  style={{
                    '--stagger-delay': `${index * 50}ms`,
                    animationDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                    animationFillMode: 'both'
                  } as React.CSSProperties}
                >
                  <Icon className="w-5 h-5 text-blue-400 motion-card-icon" />
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}