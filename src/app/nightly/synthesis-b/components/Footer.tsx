'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Linkedin, Twitter, Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react'

const sitemap = [
  { name: 'Home', href: '/nightly/synthesis-b' },
  { name: 'Services', href: '/nightly/synthesis-b/services' },
  { name: 'Sectors', href: '/nightly/synthesis-b/sectors' },
  { name: 'Geographies', href: '/nightly/synthesis-b/geographies' },
  { name: 'Agencies', href: '/nightly/synthesis-b/agencies' },
  { name: 'Cases', href: '/nightly/synthesis-b/cases' },
  { name: 'Team', href: '/nightly/synthesis-b/team' },
  { name: 'News', href: '/nightly/synthesis-b/news' },
  { name: 'Contact', href: '/nightly/synthesis-b/contact' },
]

const legal = [
  { name: 'Privacy Policy', href: '#privacy' },
  { name: 'Terms of Service', href: '#terms' },
  { name: 'GDPR Compliance', href: '#gdpr' },
  { name: 'Accessibility', href: '#accessibility' },
]

const socialLinks = [
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Instagram', href: '#', icon: Instagram },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    })
  }

  return (
    <footer 
      className="bg-slate-950/90 border-t border-slate-800 relative motion-fade-in-up" 
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 mb-8 sm:mb-12">
          
          {/* Enhanced Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link 
              href="/nightly/synthesis-b" 
              className="inline-block mb-4 group motion-logo-hover focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-lg px-1"
            >
              <h3 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:via-blue-100 group-hover:to-white transition-all duration-300">
                Paritee
              </h3>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-base max-w-sm">
              A coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
            </p>
            
            {/* Enhanced Contact Info for Mobile */}
            <div className="space-y-3 mb-6 sm:hidden">
              <Link 
                href="mailto:hello@paritee.com"
                className="flex items-center space-x-3 text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm group focus:outline-none focus:text-blue-400"
                aria-label="Send email to hello@paritee.com"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>hello@paritee.com</span>
              </Link>
              <Link 
                href="tel:+15551234567"
                className="flex items-center space-x-3 text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm group focus:outline-none focus:text-blue-400"
                aria-label="Call +1 (555) 123-4567"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>+1 (555) 123-4567</span>
              </Link>
            </div>

            {/* Enhanced Social Links with better accessibility */}
            <div className="flex space-x-2" role="list" aria-label="Social media links">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-3 text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 rounded-full transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 motion-button group"
                  aria-label={`Follow us on ${social.name} (opens in new tab)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Enhanced Navigation with skip links */}
          <div className="sm:col-span-1">
            <h4 className="text-base sm:text-lg font-medium text-white mb-4">Navigation</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 sm:space-y-3">
                {sitemap.slice(0, 5).map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-blue-400 transition-all duration-300 text-sm sm:text-base focus:outline-none focus:text-blue-400 hover:translate-x-1 motion-reduce:hover:translate-x-0 transform inline-block focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-1 py-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Enhanced More Links Section */}
          <div className="sm:col-span-1">
            <h4 className="text-base sm:text-lg font-medium text-white mb-4">More</h4>
            <ul className="space-y-2 sm:space-y-3">
              {sitemap.slice(5).map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-blue-400 transition-all duration-300 text-sm sm:text-base focus:outline-none focus:text-blue-400 hover:translate-x-1 motion-reduce:hover:translate-x-0 transform inline-block focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-1 py-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Enhanced Legal Links with accessibility focus */}
            <div className="mt-6 sm:mt-8">
              <h5 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wider">Legal & Accessibility</h5>
              <ul className="space-y-2">
                {legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-blue-400 transition-all duration-300 text-sm focus:outline-none focus:text-blue-400 hover:translate-x-1 motion-reduce:hover:translate-x-0 transform inline-block focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-1 py-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Enhanced Newsletter Section with better UX */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-medium text-white mb-4">Stay Connected</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Get the latest insights and updates from our network of agencies.
            </p>
            <form 
              className="space-y-3" 
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter subscription"
            >
              <div>
                <label htmlFor="email-input" className="sr-only">
                  Email address for newsletter subscription
                </label>
                <input
                  id="email-input"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 transition-all duration-300 text-sm min-h-[48px] hover:bg-slate-800/70 focus:bg-slate-800/70"
                  aria-describedby="email-description email-error"
                />
                <p id="email-description" className="sr-only">
                  Subscribe to receive our newsletter with latest insights and updates
                </p>
                <div id="email-error" className="sr-only" aria-live="polite">
                  {/* Error messages will be announced here */}
                </div>
              </div>
              <Button 
                type="submit"
                className="w-full bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full transition-all duration-300 min-h-[48px] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 motion-button hover:-translate-y-0.5 motion-reduce:hover:-translate-y-0"
                aria-label="Subscribe to our newsletter"
              >
                Subscribe
              </Button>
            </form>
            
            {/* Newsletter Privacy Notice */}
            <p className="text-slate-500 text-xs mt-3 leading-relaxed">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Enhanced Bottom Bar with Back to Top */}
        <div className="pt-6 sm:pt-8 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
              <p className="text-slate-500 text-xs sm:text-sm">
                © 2024 Paritee. All rights reserved.
              </p>
              <p className="text-slate-500 text-xs sm:text-sm">
                Designed with purpose. Built for impact.
              </p>
            </div>
            
            {/* Back to Top Button */}
            <Button
              onClick={scrollToTop}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-blue-400 hover:bg-slate-800/50 rounded-full transition-all duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 motion-button group"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-4 h-4 group-hover:scale-110 group-hover:-translate-y-1 motion-reduce:group-hover:-translate-y-0 motion-reduce:group-hover:scale-100 transition-transform duration-300" />
              <span className="sr-only">Back to top</span>
            </Button>
          </div>
          
          {/* Accessibility Statement */}
          <div className="mt-6 pt-4 border-t border-slate-800/50">
            <p className="text-slate-500 text-xs text-center leading-relaxed">
              This website is designed to be accessible to all users. 
              <Link 
                href="#accessibility" 
                className="text-blue-400 hover:text-blue-300 underline focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-1"
              >
                View our accessibility statement
              </Link> or 
              <Link 
                href="mailto:accessibility@paritee.com" 
                className="text-blue-400 hover:text-blue-300 underline focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-1"
              >
                report an accessibility issue
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}