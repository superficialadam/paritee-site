'use client'

import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ChevronLeft, ChevronRight, Calendar, Pause, Play } from 'lucide-react'
import { news } from '@/data/news'
import SectionV2 from './SectionV2'

export default function NewsCarouselV2() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const SLIDE_DURATION = 5000 // 5 seconds per slide

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % news.length
    setCurrentIndex(newIndex)
    scrollToSlide(newIndex)
    resetProgress()
  }

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + news.length) % news.length
    setCurrentIndex(newIndex)
    scrollToSlide(newIndex)
    resetProgress()
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    scrollToSlide(index)
    resetProgress()
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

  const resetProgress = () => {
    setProgress(0)
    if (progressRef.current) {
      gsap.set(progressRef.current, { scaleX: 0 })
    }
  }

  const startAutoScroll = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Clear existing intervals
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)

    // Start auto-scroll
    intervalRef.current = setInterval(nextSlide, SLIDE_DURATION)

    // Start progress bar animation
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        duration: SLIDE_DURATION / 1000,
        ease: 'none',
        repeat: -1,
        onRepeat: () => {
          gsap.set(progressRef.current, { scaleX: 0 })
        }
      })
    }
  }

  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    if (progressRef.current) {
      gsap.killTweensOf(progressRef.current)
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      stopAutoScroll()
    } else {
      startAutoScroll()
    }
  }

  useEffect(() => {
    if (isPlaying) {
      startAutoScroll()
    } else {
      stopAutoScroll()
    }

    return () => stopAutoScroll()
  }, [isPlaying, currentIndex])

  const formatDate = (dateISO: string) => {
    return new Date(dateISO).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <SectionV2
      id="news"
      eyebrow="Latest News"
      title="Stay Updated"
      intro="The latest insights, announcements, and thought leadership from our team and industry."
      variant="alternate"
    >
      <div className="relative">
        {/* Progress indicator */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlayPause}
              className="w-10 h-10 bg-slate-700 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
            >
              {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white ml-0.5" />}
            </button>
            <div className="text-sm text-slate-400">
              {currentIndex + 1} / {news.length}
            </div>
          </div>
          
          <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div 
              ref={progressRef}
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transform origin-left scale-x-0"
            />
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <div className="flex space-x-8 pb-4">
            {news.map((item, index) => (
              <div 
                key={item.id} 
                className="flex-shrink-0 w-full md:w-4/5 snap-start"
              >
                <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group cursor-pointer">
                  <div className="md:flex h-full">
                    <div className="md:w-2/5 relative overflow-hidden">
                      <div className="aspect-video md:aspect-square bg-gray-200 from-slate-700 to-slate-800 relative" style={{backgroundImage: 'url(/images/hero/image-0-92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                        <div className="absolute inset-0 bg-gray-200 from-blue-500/20 to-cyan-400/20 group-hover:from-blue-500/30 group-hover:to-cyan-400/30 transition-all duration-500" style={{backgroundImage: 'url(/images/hero/image-1-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-slate-300 text-sm font-medium text-center p-4">
                            {item.title.split(' ').slice(0, 3).join(' ')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center space-x-2 text-sm text-cyan-400 mb-4">
                        <Calendar size={16} />
                        <span>{formatDate(item.dateISO)}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold font-heading text-white mb-4 leading-tight group-hover:text-blue-200 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                        {item.excerpt}
                      </p>
                      <div className="inline-flex items-center text-blue-400 font-medium hover:text-cyan-400 transition-colors">
                        Read More
                        <div className="w-0 group-hover:w-8 h-0.5 bg-blue-400 ml-2 transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center space-x-6 mt-12">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-slate-700 border border-slate-600 hover:bg-blue-500 hover:border-blue-400 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
            aria-label="Previous news item"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          
          <div className="flex space-x-3">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-400 scale-125 shadow-lg shadow-blue-400/50' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to news item ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-slate-700 border border-slate-600 hover:bg-blue-500 hover:border-blue-400 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
            aria-label="Next news item"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>
      </div>
    </SectionV2>
  )
}