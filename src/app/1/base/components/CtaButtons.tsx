'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface CtaButtonsProps {
  primary?: {
    text: string
    href: string
  }
  secondary?: {
    text: string
    href: string
  }
}

export default function CtaButtons({ primary, secondary }: CtaButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {primary && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href={primary.href}
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            {primary.text}
          </Link>
        </motion.div>
      )}
      {secondary && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href={secondary.href}
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            {secondary.text}
          </Link>
        </motion.div>
      )}
    </div>
  )
}