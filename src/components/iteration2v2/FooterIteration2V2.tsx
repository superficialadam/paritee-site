'use client'

import Image from 'next/image'
import { Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

const footerLinks = {
  services: [
    'Strategic Communications',
    'Public Affairs',
    'Branding & Design',
    'Digital & Content Marketing',
    'Crisis Management'
  ],
  sectors: [
    'Energy',
    'Finance',
    'Healthcare',
    'Infrastructure',
    'Public Sector',
    'Technology'
  ],
  company: [
    'About Us',
    'Our Story',
    'Careers',
    'Press',
    'Partners'
  ]
}

export default function FooterIteration2V2() {
  return (
    <footer className="bg-[#0A1E42] border-t border-white/10">
      <div className="container">
        <div className="py-16">
          <div className="grid grid-4 gap-8 mb-16">
            {/* Logo and Description */}
            <div>
              <Image 
                src="/images/logo.png" 
                alt="Paritee" 
                width={120} 
                height={40}
                className="h-10 w-auto mb-6"
              />
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                A coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
              </p>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[#94A3B8] text-sm hover:text-[#D4AF37] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Sectors */}
            <div>
              <h4 className="font-semibold text-white mb-4">Sectors</h4>
              <ul className="space-y-2">
                {footerLinks.sectors.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[#94A3B8] text-sm hover:text-[#D4AF37] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[#94A3B8] text-sm hover:text-[#D4AF37] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <div className="border-t border-white/10 pt-8 mb-8">
            <div className="max-w-md">
              <h4 className="font-semibold text-white mb-4">Stay Connected</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-rgba(255,255,255,0.05) border border-rgba(255,255,255,0.1) rounded-l-lg text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] transition-colors backdrop-blur-sm"
                />
                <button className="px-6 py-2 bg-[#D4AF37] text-[#0E2756] font-medium rounded-r-lg hover:bg-[#E6C547] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
            <div className="text-[#94A3B8] text-sm mb-4 md:mb-0">
              © 2024 Paritee. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Legal Links */}
              <div className="flex space-x-4 mr-6">
                <a href="#" className="text-[#94A3B8] text-sm hover:text-[#D4AF37] transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-[#94A3B8] text-sm hover:text-[#D4AF37] transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-[#94A3B8] text-sm hover:text-[#D4AF37] transition-colors">
                  GDPR
                </a>
              </div>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <a href="#" className="text-[#94A3B8] hover:text-[#D4AF37] transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-[#94A3B8] hover:text-[#D4AF37] transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="text-[#94A3B8] hover:text-[#D4AF37] transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="text-[#94A3B8] hover:text-[#D4AF37] transition-colors">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}