'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface LinkV4Props {
  children: ReactNode
  href: string
  variant?: 'default' | 'subtle' | 'emphasis'
  showArrow?: boolean
  className?: string
  external?: boolean
}

const LinkV4 = ({ 
  children, 
  href, 
  variant = 'default',
  showArrow = true,
  className = '',
  external = false
}: LinkV4Props) => {
  const variants = {
    default: "text-sage hover:text-gold",
    subtle: "text-warm-gray hover:text-cream",
    emphasis: "text-cream hover:text-gold"
  }
  
  const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  
  return (
    <motion.a
      href={href}
      className={`${variants[variant]} transition-colors duration-300 inline-flex items-center space-x-2 text-caption font-medium tracking-wide ${className}`}
      whileHover={{ x: showArrow ? 4 : 0 }}
      transition={{ duration: 0.2 }}
      {...linkProps}
    >
      <span>{children}</span>
      {showArrow && (
        <motion.span
          className="text-sm"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
        >
          →
        </motion.span>
      )}
    </motion.a>
  )
}

export default LinkV4