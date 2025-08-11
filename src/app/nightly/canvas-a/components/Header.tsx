'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/nightly/canvas-a' },
  { name: 'Services', href: '/nightly/canvas-a/services' },
  { name: 'Sectors', href: '/nightly/canvas-a/sectors' },
  { name: 'Geographies', href: '/nightly/canvas-a/geographies' },
  { name: 'Agencies', href: '/nightly/canvas-a/agencies' },
  { name: 'Cases', href: '/nightly/canvas-a/cases' },
  { name: 'Team', href: '/nightly/canvas-a/team' },
  { name: 'News', href: '/nightly/canvas-a/news' },
  { name: 'Contact', href: '/nightly/canvas-a/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 py-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/nightly/canvas-a" 
            className="text-2xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent hover:from-blue-200 hover:via-blue-100 hover:to-white transition-all duration-300 hover:scale-105 motion-reduce:hover:scale-100 transform-gpu"
          >
            Paritee
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-5 py-3 text-slate-300 hover:text-blue-400 transition-all duration-300 ease-out rounded-full hover:bg-blue-600/10 hover:border hover:border-blue-600/30 font-medium hover:-translate-y-0.5 motion-reduce:hover:-translate-y-0 hover:scale-102 motion-reduce:hover:scale-100 transform-gpu relative overflow-hidden group"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-blue-500/10 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300 ease-out hover:scale-110 motion-reduce:hover:scale-100 transform-gpu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-500 ease-out transform-gpu',
            mobileMenuOpen
              ? 'max-h-screen opacity-100 mt-6 translate-y-0'
              : 'max-h-0 opacity-0 -translate-y-4'
          )}
        >
          <div className="space-y-1 py-4 border-t border-slate-700/50 mt-6">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-6 py-4 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 transition-all duration-300 ease-out rounded-none border-l-4 border-transparent hover:border-blue-600/50 font-medium hover:translate-x-1 motion-reduce:hover:translate-x-0 transform-gpu relative overflow-hidden group"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  animationDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                  animationFillMode: 'both'
                }}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}