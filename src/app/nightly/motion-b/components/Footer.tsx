import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Linkedin, Twitter, Instagram } from 'lucide-react'

const sitemap = [
  { name: 'Home', href: '/nightly/motion-b' },
  { name: 'Services', href: '/nightly/motion-b/services' },
  { name: 'Sectors', href: '/nightly/motion-b/sectors' },
  { name: 'Geographies', href: '/nightly/motion-b/geographies' },
  { name: 'Agencies', href: '/nightly/motion-b/agencies' },
  { name: 'Cases', href: '/nightly/motion-b/cases' },
  { name: 'Team', href: '/nightly/motion-b/team' },
  { name: 'News', href: '/nightly/motion-b/news' },
  { name: 'Contact', href: '/nightly/motion-b/contact' },
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
    <footer className="bg-slate-950/80 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Paritee</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              A coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-full transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {sitemap.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Stay Connected</h4>
            <p className="text-slate-400 text-sm mb-4">
              Get the latest insights and updates from our network.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 transition-all duration-300"
              />
              <Button className="w-full bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-500 text-sm">
            © 2024 Paritee. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Designed with purpose. Built for impact.
          </p>
        </div>
      </div>
    </footer>
  )
}