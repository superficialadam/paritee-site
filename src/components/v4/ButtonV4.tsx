'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonV4Props {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  href?: string
  onClick?: () => void
  className?: string
  disabled?: boolean
}

const ButtonV4 = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  href,
  onClick,
  className = '',
  disabled = false,
  ...props 
}: ButtonV4Props) => {
  const baseClasses = "relative overflow-hidden transition-all duration-300 rounded-sm inline-flex items-center justify-center"
  
  const variants = {
    primary: "bg-sage text-charcoal hover:bg-gold hover:text-charcoal border border-sage hover:border-gold",
    secondary: "bg-transparent text-sage border border-sage hover:bg-sage/10 hover:text-cream",
    tertiary: "bg-transparent text-warm-gray border border-warm-gray hover:bg-warm-gray/10 hover:text-cream hover:border-cream",
    ghost: "text-sage hover:text-gold underline-offset-4 hover:underline bg-transparent border-none"
  }
  
  const sizes = {
    small: "px-5 py-2 text-caption font-medium tracking-wide",
    medium: "px-8 py-3 text-body font-medium",
    large: "px-12 py-4 text-body-large font-medium"
  }

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : ""
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      
      {/* Subtle shimmer effect for primary buttons */}
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/10 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
    </>
  )

  const motionProps = disabled ? {} : {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2, ease: "easeOut" }
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...motionProps}
        {...props}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      className={classes}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...motionProps}
      {...props}
    >
      {content}
    </motion.button>
  )
}

export default ButtonV4