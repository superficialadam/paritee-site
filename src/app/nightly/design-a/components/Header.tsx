'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/nightly/design-a' },
  { name: 'Services', href: '/nightly/design-a/services' },
  { name: 'Sectors', href: '/nightly/design-a/sectors' },
  { name: 'Geographies', href: '/nightly/design-a/geographies' },
  { name: 'Agencies', href: '/nightly/design-a/agencies' },
  { name: 'Cases', href: '/nightly/design-a/cases' },
  { name: 'Team', href: '/nightly/design-a/team' },
  { name: 'News', href: '/nightly/design-a/news' },
  { name: 'Contact', href: '/nightly/design-a/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 py-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/nightly/design-a" 
            className="text-2xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent hover:from-blue-200 hover:via-blue-100 hover:to-white transition-all duration-300"
          >
            Paritee
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-5 py-3 text-slate-300 hover:text-blue-400 transition-all duration-300 rounded-full hover:bg-blue-600/10 hover:border hover:border-blue-600/30 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-300 hover:text-white hover:bg-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            mobileMenuOpen
              ? 'max-h-screen opacity-100 mt-6'
              : 'max-h-0 opacity-0'
          )}
        >
          <div className="space-y-2 py-4 border-t border-slate-700/50 mt-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-6 py-4 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 transition-all duration-300 rounded-none border-l-4 border-transparent hover:border-blue-600/50 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}