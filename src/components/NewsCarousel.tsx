'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { news } from '@/data/news'
import Section from './Section'

export default function NewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % news.length
    setCurrentIndex(newIndex)
    scrollToSlide(newIndex)
  }

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + news.length) % news.length
    setCurrentIndex(newIndex)
    scrollToSlide(newIndex)
  }

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      const slideWidth = scrollRef.current.offsetWidth
      scrollRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      })
    }
  }

  const formatDate = (dateISO: string) => {
    return new Date(dateISO).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  return (
    <Section
      id="news"
      eyebrow="Latest News"
      title="Stay Updated"
      intro="The latest insights, announcements, and thought leadership from our team and industry."
      className="bg-stone-50"
    >
      <div className="relative">
        <div 
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex space-x-8 pb-4">
            {news.map((item, index) => (
              <motion.div 
                key={item.id} 
                className="flex-shrink-0 w-full md:w-4/5 snap-start"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white border border-stone-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="md:flex h-full">
                    <div className="md:w-2/5 relative overflow-hidden">
                      <div className="aspect-video md:aspect-square bg-gray-200 from-stone-200 to-stone-300 group-hover:scale-105 transition-transform duration-500" style={{backgroundImage: 'url(/images/hero/image-0-92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        <div className="absolute inset-0 bg-stone-400 opacity-30"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-stone-600 text-sm font-medium">
                            {item.title.split(' ').slice(0, 2).join(' ')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center space-x-2 text-sm text-stone-500 mb-4">
                        <Calendar size={16} />
                        <span>{formatDate(item.dateISO)}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold font-heading text-stone-900 mb-4 leading-tight group-hover:text-stone-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-stone-600 leading-relaxed mb-6 text-lg">
                        {item.excerpt}
                      </p>
                      <div className="inline-flex items-center text-stone-900 font-medium group-hover:text-stone-700 transition-colors">
                        Read More
                        <div className="w-0 group-hover:w-8 h-0.5 bg-stone-900 ml-2 transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center space-x-6 mt-12">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-white border border-stone-300 hover:bg-stone-900 hover:text-white hover:border-stone-900 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
            aria-label="Previous news item"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex space-x-3">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  scrollToSlide(index)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-stone-900 scale-125' 
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to news item ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-white border border-stone-300 hover:bg-stone-900 hover:text-white hover:border-stone-900 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
            aria-label="Next news item"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </Section>
  )
}