import { Variants } from 'framer-motion'
import { gsap } from 'gsap'

// Framer Motion Variants
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export const fadeInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export const fadeInRight: Variants = {
  initial: {
    opacity: 0,
    x: 60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

// GSAP Helper Functions
export const gsapHelpers = {
  // Fade in animation
  fadeIn: (element: string | Element, options: gsap.TweenVars = {}) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        ...options,
      }
    )
  },

  // Scale animation
  scaleAnimation: (element: string | Element, options: gsap.TweenVars = {}) => {
    return gsap.fromTo(
      element,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        ...options,
      }
    )
  },

  // Stagger animation for multiple elements
  staggerAnimation: (elements: string | Element[], options: gsap.TweenVars = {}) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        ...options,
      }
    )
  },

  // Parallax scroll effect
  parallax: (element: string | Element, speed: number = 0.5) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -speed
      gsap.set(el, { y: rate })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  },

  // Timeline for complex animations
  createTimeline: (options: gsap.TimelineVars = {}) => {
    return gsap.timeline({
      ease: 'power2.out',
      ...options,
    })
  },
}

// Animation presets for common use cases
export const animationPresets = {
  heroEntrance: {
    initial: { opacity: 0, y: 100 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  },
  cardHover: {
    whileHover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  },
  buttonPress: {
    whileTap: {
      scale: 0.95,
    },
  },
}