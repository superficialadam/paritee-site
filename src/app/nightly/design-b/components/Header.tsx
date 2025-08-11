'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/nightly/design-b' },
  { name: 'Services', href: '/nightly/design-b/services' },
  { name: 'Sectors', href: '/nightly/design-b/sectors' },
  { name: 'Geographies', href: '/nightly/design-b/geographies' },
  { name: 'Agencies', href: '/nightly/design-b/agencies' },
  { name: 'Cases', href: '/nightly/design-b/cases' },
  { name: 'Team', href: '/nightly/design-b/team' },
  { name: 'News', href: '/nightly/design-b/news' },
  { name: 'Contact', href: '/nightly/design-b/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/nightly/design-b" 
            className="text-2xl font-semibold text-white hover:text-blue-400 transition-colors duration-300"
          >
            Paritee
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-slate-300 hover:text-blue-400 transition-colors duration-300 rounded-full hover:bg-blue-600/10"
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
              ? 'max-h-screen opacity-100 mt-4'
              : 'max-h-0 opacity-0'
          )}
        >
          <div className="space-y-1 py-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 transition-colors duration-300 rounded-none"
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