'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const sitemap = [
  { name: 'Home', href: '/nightly/design-c' },
  { name: 'Services', href: '/nightly/design-c/services' },
  { name: 'Sectors', href: '/nightly/design-c/sectors' },
  { name: 'Geographies', href: '/nightly/design-c/geographies' },
  { name: 'Agencies', href: '/nightly/design-c/agencies' },
  { name: 'Cases', href: '/nightly/design-c/cases' },
  { name: 'Team', href: '/nightly/design-c/team' },
  { name: 'News', href: '/nightly/design-c/news' },
  { name: 'Contact', href: '/nightly/design-c/contact' },
]

const legal = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'GDPR Compliance', href: '#' },
]

const socialLinks = [
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Instagram', href: '#', icon: Instagram },
]

export function Footer() {
  return (
    <footer className="bg-slate-950/80 border-t border-slate-800" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 mb-8 sm:mb-12">
          {/* Brand - Mobile-first with better spacing */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/nightly/design-c" className="inline-block mb-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-white hover:text-blue-400 transition-colors duration-300">Paritee</h3>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base max-w-sm">
              A coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
            </p>
            
            {/* Contact info for mobile */}
            <div className="space-y-3 mb-6 sm:hidden">
              <div className="flex items-center space-x-3 text-slate-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>hello@paritee.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>

            {/* Social links with better touch targets */}
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-3 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation - Mobile-optimized */}
          <div className="sm:col-span-1">
            <h4 className="text-base sm:text-lg font-medium text-white mb-4">Navigation</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 sm:space-y-3">
                {sitemap.slice(0, 5).map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base focus:outline-none focus:text-blue-400"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* More Links - Desktop only or collapsed on mobile */}
          <div className="sm:col-span-1">
            <h4 className="text-base sm:text-lg font-medium text-white mb-4">More</h4>
            <ul className="space-y-2 sm:space-y-3">
              {sitemap.slice(5).map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm sm:text-base focus:outline-none focus:text-blue-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Legal links */}
            <div className="mt-6 sm:mt-8">
              <h5 className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wider">Legal</h5>
              <ul className="space-y-2">
                {legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm focus:outline-none focus:text-blue-400"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter - Mobile-friendly form */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-medium text-white mb-4">Stay Connected</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Get the latest insights and updates from our network.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="email-input" className="sr-only">Email address</label>
                <input
                  id="email-input"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 transition-all duration-300 text-sm min-h-[48px]"
                  aria-describedby="email-description"
                />
                <p id="email-description" className="sr-only">
                  Subscribe to receive our newsletter with latest insights
                </p>
              </div>
              <Button 
                type="submit"
                className="w-full bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full transition-all duration-300 min-h-[48px] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar - Mobile-optimized */}
        <div className="pt-6 sm:pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-center sm:text-left">
          <p className="text-slate-500 text-xs sm:text-sm">
            © 2024 Paritee. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs sm:text-sm">
            Designed with purpose. Built for impact.
          </p>
        </div>
      </div>
    </footer>
  )
}