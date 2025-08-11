'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { news } from '@/data/news'
import Section from './Section'
import Image from 'next/image'

export default function NewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const item = scrollRef.current.children[index] as HTMLElement
      if (item) {
        item.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
        setCurrentIndex(index)
      }
    }
  }

  const handlePrev = () => {
    if (news.length > 0) {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : news.length - 1
      scrollToIndex(newIndex)
    }
  }

  const handleNext = () => {
    if (news.length > 0) {
      const newIndex = currentIndex < news.length - 1 ? currentIndex + 1 : 0
      scrollToIndex(newIndex)
    }
  }

  return (
    <Section
      id="news"
      title="Latest News"
      intro="Stay updated with our latest insights and announcements"
    >
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {news.slice(0, 4).map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-none w-full md:w-1/2 lg:w-1/3 snap-start"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  {article.image && (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(article.dateISO).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {article.excerpt}
                  </p>
                  <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </Section>
  )
}