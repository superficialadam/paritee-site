'use client'

import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Menu, X, Home, Briefcase, Building2, Globe, Users, FolderOpen, UserCheck, Newspaper, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/nightly/motion-c', icon: Home },
  { name: 'Services', href: '/nightly/motion-c/services', icon: Briefcase },
  { name: 'Sectors', href: '/nightly/motion-c/sectors', icon: Building2 },
  { name: 'Geographies', href: '/nightly/motion-c/geographies', icon: Globe },
  { name: 'Agencies', href: '/nightly/motion-c/agencies', icon: Users },
  { name: 'Cases', href: '/nightly/motion-c/cases', icon: FolderOpen },
  { name: 'Team', href: '/nightly/motion-c/team', icon: UserCheck },
  { name: 'News', href: '/nightly/motion-c/news', icon: Newspaper },
  { name: 'Contact', href: '/nightly/motion-c/contact', icon: Phone },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)

  // Optimized event handlers with useCallback for performance
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && mobileMenuOpen) {
      setMobileMenuOpen(false)
      mobileMenuButtonRef.current?.focus()
    }
  }, [mobileMenuOpen])

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (mobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
      setMobileMenuOpen(false)
    }
  }, [mobileMenuOpen])

  // Handle escape key and outside clicks for mobile menu
  useEffect(() => {
    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleEscape, handleClickOutside])

  return (
    <header 
      className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50 motion-header-sticky"
      role="banner"
      style={{willChange: 'transform', contain: 'layout style'}}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center justify-between" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <Link 
            href="/nightly/motion-c" 
            className="text-xl sm:text-2xl font-semibold text-white hover:text-blue-400 transition-colors duration-200 will-change-transform focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 focus:rounded-full focus:px-2 focus:py-1 motion-logo-hover"
            aria-label="Paritee homepage"
          >
            Paritee
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-slate-300 hover:text-blue-400 transition-all duration-200 rounded-full hover:bg-blue-600/10 hover:scale-105 will-change-transform focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center space-x-2 text-sm motion-nav-item"
                  aria-label={`Go to ${item.name}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden xl:inline">{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button with enhanced touch target */}
          <Button
            ref={mobileMenuButtonRef}
            variant="ghost"
            size="lg"
            className="lg:hidden text-slate-300 hover:text-white hover:bg-slate-800 min-w-[48px] min-h-[48px] rounded-full transition-all duration-200 hover:scale-110 will-change-transform motion-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </nav>

        {/* Mobile Navigation with improved accessibility */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-250 ease-out will-change-auto',
            mobileMenuOpen
              ? 'max-h-screen opacity-100 mt-4 border-t border-slate-800 pt-4 motion-mobile-menu-open'
              : 'max-h-0 opacity-0 motion-mobile-menu-closed'
          )}
          style={{contain: 'layout style', willChange: mobileMenuOpen ? 'max-height, opacity' : 'auto'}}
          aria-hidden={!mobileMenuOpen}
        >
          <nav className="space-y-1 py-2" role="navigation" aria-label="Mobile navigation">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-4 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 transition-all duration-200 rounded-none min-h-[48px] focus:outline-none focus:bg-blue-600/10 focus:text-blue-400 active:bg-blue-600/20 hover:translate-x-1 will-change-transform motion-mobile-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label={`Go to ${item.name}`}
                >
                  <Icon className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}