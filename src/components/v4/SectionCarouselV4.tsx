'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'

interface CarouselItem {
  title: string
  description: string
  category: string
  image?: string
}

interface SectionCarouselV4Props {
  items: CarouselItem[]
  title: string
}

const SectionCarouselV4 = ({ items, title }: SectionCarouselV4Props) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 420
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }
  
  return (
    <div className="py-20">
      <div className="flex justify-between items-center mb-12 max-w-7xl mx-auto px-8">
        <h3 className="text-heading text-cream">{title}</h3>
        <div className="flex space-x-3">
          <motion.button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border border-warm-gray text-warm-gray hover:border-sage hover:text-sage transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ←
          </motion.button>
          <motion.button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border border-warm-gray text-warm-gray hover:border-sage hover:text-sage transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            →
          </motion.button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth space-x-6 px-8 pb-6 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => (
          <motion.article
            key={index}
            className="min-w-[350px] p-8 border-l border-cream/10 hover:border-sage/30 transition-colors duration-300 bg-gradient-to-b from-cream/5 to-transparent backdrop-blur-sm"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              {item.image && (
                <div className="aspect-video bg-warm-gray/10 rounded-sm mb-6 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="pt-2">
                <span className="text-caption text-sage uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
              <h4 className="text-subheading text-cream">{item.title}</h4>
              <p className="text-body text-warm-gray leading-relaxed">{item.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

export default SectionCarouselV4