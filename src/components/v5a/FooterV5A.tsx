'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

const FooterV5A = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "SERVICES",
      links: [
        { name: "Strategic Consulting", href: "#services" },
        { name: "Creative Services", href: "#services" },
        { name: "Digital Marketing", href: "#services" },
        { name: "Media Planning", href: "#services" },
        { name: "Public Relations", href: "#services" },
        { name: "Data & Analytics", href: "#services" }
      ]
    },
    {
      title: "COMPANY",
      links: [
        { name: "About", href: "#mission" },
        { name: "Our Team", href: "#team" },
        { name: "Case Studies", href: "#cases" },
        { name: "News", href: "#news" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "NETWORK",
      links: [
        { name: "Partner Agencies", href: "#agencies" },
        { name: "Global Reach", href: "#geographies" },
        { name: "Industry Sectors", href: "#sectors" },
        { name: "Collaboration", href: "#" }
      ]
    }
  ]

  const socialLinks = [
    { name: "LinkedIn", href: "#", icon: ExternalLink },
    { name: "Twitter", href: "#", icon: ExternalLink },
    { name: "Instagram", href: "#", icon: ExternalLink },
    { name: "Behance", href: "#", icon: ExternalLink }
  ]

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Legal Notice", href: "#" }
  ]

  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-red-600/20 to-transparent" />
      </div>

      <div className="container mx-auto px-8 py-20 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-20">
          
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-black text-white mb-8 tracking-tighter">
              PARITEE
            </h3>
            
            <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-md">
              We don't just connect—we architect creative ecosystems that transform 
              possibilities into realities through strategic partnerships.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h4 className="text-red-600 font-black text-sm tracking-[0.3em]">
                STAY INFORMED
              </h4>
              <div className="flex space-x-0 border border-white/20 hover:border-red-600 transition-colors duration-500">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent text-white px-6 py-4 placeholder-white/40 focus:outline-none text-lg"
                />
                <button className="bg-red-600 hover:bg-white text-white hover:text-black px-8 py-4 font-black transition-all duration-500 flex items-center space-x-2">
                  <span>SUBSCRIBE</span>
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: sectionIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-red-600 font-black text-sm tracking-[0.3em] mb-8">
                {section.title}
              </h4>
              
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: sectionIndex * 0.2 + linkIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="group text-white/70 hover:text-red-600 transition-colors duration-300 flex items-center space-x-2 font-medium"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight 
                        size={14} 
                        className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" 
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        />

        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          
          {/* Copyright */}
          <motion.div
            className="text-white/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-sm">
              © {currentYear} Paritee. All rights reserved. 
              <span className="text-red-600 font-bold ml-2">
                Architecting Creative Excellence.
              </span>
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-white/50 hover:text-red-600 transition-colors duration-300 flex items-center space-x-2"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-medium">{social.name}</span>
                <social.icon size={16} />
              </motion.a>
            ))}
          </motion.div>

          {/* Legal Links */}
          <motion.div
            className="flex items-center space-x-6 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {legalLinks.map((legal, index) => (
              <a
                key={legal.name}
                href={legal.href}
                className="text-white/50 hover:text-white transition-colors duration-300 text-sm"
              >
                {legal.name}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Back to Top */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="#home"
            className="group inline-flex items-center space-x-3 text-red-600 hover:text-white font-black tracking-wider transition-colors duration-500"
          >
            <span>BACK TO TOP</span>
            <div className="w-12 h-12 border-2 border-red-600 group-hover:border-white rounded-full flex items-center justify-center group-hover:bg-red-600 transition-all duration-500">
              <ArrowUpRight 
                size={20} 
                className="transform -rotate-45 group-hover:translate-y-1 transition-transform duration-500" 
              />
            </div>
          </a>
        </motion.div>

        {/* Large Background Typography */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          transition={{ duration: 2, delay: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-[12vw] font-black text-white leading-none tracking-tighter">
            PARITEE
          </h3>
        </motion.div>

        {/* Glitch Effect Typography */}
        <motion.div
          className="absolute top-16 right-12 text-white/5 font-black text-4xl tracking-wider transform rotate-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.1, 0, 0.1, 0.05] }}
          transition={{ duration: 3, delay: 2 }}
          viewport={{ once: true }}
        >
          ARCHITECT
        </motion.div>

        <motion.div
          className="absolute bottom-16 left-16 text-red-600/10 font-black text-3xl tracking-wider transform -rotate-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.2, 0, 0.2, 0.1] }}
          transition={{ duration: 2.5, delay: 2.5 }}
          viewport={{ once: true }}
        >
          CREATIVE
        </motion.div>
      </div>
    </footer>
  )
}

export default FooterV5A