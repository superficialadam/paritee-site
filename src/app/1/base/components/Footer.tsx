'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Twitter, Linkedin, Instagram } from 'lucide-react'

const footerLinks = {
  Services: [
    { name: 'Strategic Communications', href: '#services' },
    { name: 'Public Affairs', href: '#services' },
    { name: 'Branding & Design', href: '#services' },
    { name: 'Digital & Content Marketing', href: '#services' },
    { name: 'Crisis Management', href: '#services' }
  ],
  Company: [
    { name: 'About Us', href: '#mission' },
    { name: 'Our Agencies', href: '#agencies' },
    { name: 'Team', href: '#team' },
    { name: 'News', href: '#news' },
    { name: 'Contact', href: '#contact' }
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'GDPR Compliance', href: '#' },
    { name: 'Cookie Policy', href: '#' }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="#home" className="inline-block mb-4">
              <Image
                src="/images/logo.png"
                alt="Paritee"
                width={120}
                height={40}
                className="h-10 w-auto filter brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              A coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Paritee. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              GDPR
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}