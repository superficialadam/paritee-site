import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Linkedin, Twitter, Instagram } from 'lucide-react'

const sitemap = [
  { name: 'Home', href: '/nightly/motion-a' },
  { name: 'Services', href: '/nightly/motion-a/services' },
  { name: 'Sectors', href: '/nightly/motion-a/sectors' },
  { name: 'Geographies', href: '/nightly/motion-a/geographies' },
  { name: 'Agencies', href: '/nightly/motion-a/agencies' },
  { name: 'Cases', href: '/nightly/motion-a/cases' },
  { name: 'Team', href: '/nightly/motion-a/team' },
  { name: 'News', href: '/nightly/motion-a/news' },
  { name: 'Contact', href: '/nightly/motion-a/contact' },
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
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent mb-6 hover:from-blue-200 hover:via-blue-100 hover:to-white transition-all duration-300 cursor-default">Paritee</h3>
            <p className="text-slate-400 leading-relaxed mb-8 text-base">
              A coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-3 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-full transition-all duration-300 border border-transparent hover:border-slate-600/50 hover:scale-110 motion-reduce:hover:scale-100 transform-gpu hover:-translate-y-0.5 motion-reduce:hover:-translate-y-0 group"
                >
                  <social.icon className="w-5 h-5 group-hover:rotate-12 motion-reduce:group-hover:rotate-0 transition-transform duration-300" />
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
                    className="text-slate-400 hover:text-blue-400 transition-all duration-300 text-base hover:translate-x-1 motion-reduce:hover:translate-x-0 inline-block transform-gpu relative group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300 ease-out"></span>
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
                    className="text-slate-400 hover:text-blue-400 transition-all duration-300 text-base hover:translate-x-1 motion-reduce:hover:translate-x-0 inline-block transform-gpu relative group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300 ease-out"></span>
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
                className="w-full px-5 py-3 bg-slate-800/40 border border-slate-700/50 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 focus:bg-slate-800/60 transition-all duration-300 transform-gpu focus:scale-102 motion-reduce:focus:scale-100"
              />
              <Button className="w-full bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-5 py-3 transition-all duration-300 font-medium hover:scale-105 motion-reduce:hover:scale-100 transform-gpu hover:-translate-y-0.5 motion-reduce:hover:-translate-y-0">
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