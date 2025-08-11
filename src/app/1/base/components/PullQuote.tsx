'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

interface PullQuoteProps {
  text: string
  author?: string
  role?: string
  className?: string
}

export default function PullQuote({ text, author, role, className = '' }: PullQuoteProps) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`relative bg-blue-50 p-8 rounded-xl ${className}`}
    >
      <Quote className="absolute top-4 left-4 w-8 h-8 text-blue-200" />
      <div className="pl-8">
        <p className="text-xl md:text-2xl font-medium text-gray-900 mb-4 italic">
          "{text}"
        </p>
        {(author || role) && (
          <footer className="text-sm text-gray-600">
            {author && <cite className="font-semibold not-italic">{author}</cite>}
            {author && role && <span className="mx-2">•</span>}
            {role && <span>{role}</span>}
          </footer>
        )}
      </div>
    </motion.blockquote>
  )
}