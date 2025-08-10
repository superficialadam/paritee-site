'use client'

import Image from 'next/image'

interface LogoV4Props {
  size?: 'small' | 'medium' | 'large' | 'hero'
  variant?: 'light' | 'dark' | 'subtle'
  className?: string
}

const LogoV4 = ({ size = 'medium', variant = 'light', className = '' }: LogoV4Props) => {
  const sizes = {
    small: 'w-24 h-12',
    medium: 'w-32 h-16', 
    large: 'w-48 h-24',
    hero: 'w-64 h-32'
  }
  
  const variants = {
    light: 'invert-0',
    dark: 'invert',
    subtle: 'opacity-80'
  }
  
  return (
    <div className={`${sizes[size]} relative ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Paritee"
        fill
        className={`object-contain ${variants[variant]}`}
        priority
      />
    </div>
  )
}

export default LogoV4