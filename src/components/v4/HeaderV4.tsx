'use client'

import { motion } from 'framer-motion'
import LogoV4 from './LogoV4'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Sectors', href: '#sectors' },
  { label: 'Agencies', href: '#agencies' },
  { label: 'Cases', href: '#cases' },
  { label: 'Team', href: '#team' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' }
]

const HeaderV4 = () => {
  return (
    <motion.nav
      className="fixed top-0 w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
    >
      <div className="backdrop-blur-xl bg-charcoal/10 border-b border-cream/5">
        <div className="container mx-auto px-8 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <LogoV4 size="small" variant="light" />
          </motion.div>
          
          <div className="flex space-x-10">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-warm-gray hover:text-sage transition-colors duration-300 text-caption font-medium tracking-wide"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.4 + index * 0.1,
                  ease: "easeOut"
                }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default HeaderV4