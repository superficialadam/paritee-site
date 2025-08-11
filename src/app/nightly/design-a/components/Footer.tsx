import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Linkedin, Twitter, Instagram } from 'lucide-react'

const sitemap = [
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
    <footer className="bg-slate-950/90 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent mb-6">Paritee</h3>
            <p className="text-slate-400 leading-relaxed mb-8 text-base">
              A coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-3 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-full transition-all duration-300 border border-transparent hover:border-slate-600/50"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="text-lg font-medium text-white mb-6">Navigation</h4>
            <ul className="space-y-3">
              {sitemap.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300 text-base hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-medium text-white mb-6">Legal</h4>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300 text-base hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-medium text-white mb-6">Stay Connected</h4>
            <p className="text-slate-400 text-base mb-6">
              Get the latest insights and updates from our network.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-3 bg-slate-800/40 border border-slate-700/50 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 transition-all duration-300"
              />
              <Button className="w-full bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-5 py-3 transition-all duration-300 font-medium">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-slate-500 text-base">
            © 2024 Paritee. All rights reserved.
          </p>
          <p className="text-slate-500 text-base font-medium">
            Designed with purpose. Built for impact.
          </p>
        </div>
      </div>
    </footer>
  )
}