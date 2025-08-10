'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Testimonial {
  quote: string
  author: string
  company: string
}

interface TestimonialCarouselV4Props {
  testimonials: Testimonial[]
  autoPlay?: boolean
  interval?: number
}

const TestimonialCarouselV4 = ({ 
  testimonials,
  autoPlay = true,
  interval = 5000
}: TestimonialCarouselV4Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, testimonials.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Carousel Content */}
      <div className="overflow-hidden">
        <motion.div 
          className="flex"
          animate={{ x: -currentIndex * 100 + "%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="min-w-full p-12 text-center"
              initial={{ opacity: 0.3 }}
              animate={{ 
                opacity: index === currentIndex ? 1 : 0.3,
                scale: index === currentIndex ? 1 : 0.95
              }}
              transition={{ duration: 0.5 }}
            >
              <blockquote className="text-2xl text-cream font-light mb-8 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <cite className="text-warm-gray text-body">
                — {testimonial.author}
                {testimonial.company && (
                  <span className="text-gold ml-2">
                    {testimonial.company}
                  </span>
                )}
              </cite>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <motion.button
          onClick={goToPrevious}
          className="w-10 h-10 rounded-full border border-warm-gray text-warm-gray hover:border-sage hover:text-sage transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ←
        </motion.button>

        {/* Indicators */}
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-sage w-6' 
                  : 'bg-warm-gray/50 hover:bg-warm-gray'
              }`}
            />
          ))}
        </div>

        <motion.button
          onClick={goToNext}
          className="w-10 h-10 rounded-full border border-warm-gray text-warm-gray hover:border-sage hover:text-sage transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          →
        </motion.button>
      </div>
    </div>
  )
}

export default TestimonialCarouselV4