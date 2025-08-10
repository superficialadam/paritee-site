'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { news } from '@/data/news'
import { Calendar, ArrowUpRight } from 'lucide-react'

const NewsV5A = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredNews, setHoveredNews] = useState<string | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-2%', '2%'])

  const formatDate = (dateISO: string) => {
    return new Date(dateISO).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-black"
      id="news"
      style={{ y: backgroundY }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-px h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute bottom-1/4 right-1/3 w-1/3 h-px bg-gradient-to-l from-red-600/20 to-transparent" />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="mb-24 max-w-4xl"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="text-red-600 font-black text-sm tracking-[0.5em] mb-8 block">
            LATEST UPDATES
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-tight mb-8">
            Industry
            <br />
            <span className="text-red-600">News</span>
          </h2>
          <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
            Stay ahead of the curve. Breaking insights, industry innovations, 
            and strategic developments shaping the future of creative marketing.
          </p>
        </motion.div>

        {/* Featured News */}
        <div className="mb-16">
          <motion.div
            className="group relative overflow-hidden cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            onHoverStart={() => setHoveredNews(news[0].id)}
            onHoverEnd={() => setHoveredNews(null)}
            whileHover={{ y: -10 }}
          >
            <div className="lg:flex lg:items-center lg:gap-16 border border-white/10 hover:border-red-600 transition-colors duration-700 p-12">
              
              {/* Featured Image */}
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={news[0].image}
                    alt={news[0].title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-red-600/20 transition-all duration-700" />
                  
                  {/* Featured Badge */}
                  <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-2 font-black text-sm tracking-wider">
                    FEATURED
                  </div>
                </div>
              </div>

              {/* Featured Content */}
              <div className="lg:w-1/2">
                <div className="flex items-center space-x-4 mb-6">
                  <Calendar size={20} className="text-red-600" />
                  <span className="text-white/60 font-medium">
                    {formatDate(news[0].dateISO)}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-red-600 transition-colors duration-700 mb-6 leading-tight">
                  {news[0].title}
                </h3>

                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  {news[0].excerpt}
                </p>

                <div className="flex items-center space-x-4">
                  <span className="text-red-600 font-black tracking-wider">
                    READ MORE
                  </span>
                  <ArrowUpRight size={20} className="text-red-600 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                </div>
              </div>
            </div>

            {/* Glitch Effect */}
            <motion.div
              className="absolute -top-4 -right-4 text-white/5 font-black text-5xl tracking-wider transform rotate-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredNews === news[0].id ? [0, 0.1, 0, 0.1, 0.05] : 0 }}
              transition={{ duration: 2 }}
            >
              FEATURED
            </motion.div>
          </motion.div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-white/10">
          {news.slice(1).map((newsItem, index) => (
            <motion.div
              key={newsItem.id}
              className="group border-r border-b border-white/10 hover:bg-red-600 transition-all duration-700 relative overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                delay: index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredNews(newsItem.id)}
              onHoverEnd={() => setHoveredNews(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-12 h-full flex flex-col">
                
                {/* News Image */}
                <motion.div
                  className="relative mb-6 overflow-hidden aspect-video"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={newsItem.image}
                    alt={newsItem.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700" />
                  
                  {/* News Number */}
                  <div className="absolute top-4 right-4 text-3xl font-black text-white/20 group-hover:text-black/30">
                    0{index + 2}
                  </div>
                </motion.div>

                {/* News Content */}
                <div className="flex-1 flex flex-col justify-between">
                  
                  {/* Date */}
                  <motion.div
                    className="flex items-center space-x-3 mb-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Calendar size={16} className="text-red-600 group-hover:text-white" />
                    <span className="text-white/60 group-hover:text-black/60 text-sm font-medium transition-colors duration-700">
                      {formatDate(newsItem.dateISO)}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-xl font-black text-white group-hover:text-black transition-colors duration-700 mb-4 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.7 }}
                    viewport={{ once: true }}
                  >
                    {newsItem.title}
                  </motion.h3>

                  {/* Excerpt */}
                  <motion.p
                    className="text-white/80 group-hover:text-black/80 leading-relaxed mb-6 transition-colors duration-700 flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.9 }}
                    viewport={{ once: true }}
                  >
                    {newsItem.excerpt}
                  </motion.p>

                  {/* Read Link */}
                  <motion.div
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 1.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-red-600 group-hover:text-black font-black text-sm tracking-wider transition-colors duration-700">
                      READ
                    </span>
                    <ArrowUpRight 
                      size={16} 
                      className="text-red-600 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" 
                    />
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-white/20 group-hover:border-black/30 transition-colors duration-700 opacity-0 group-hover:opacity-100" />
                
                {/* Glitch Effect Typography */}
                <motion.div
                  className="absolute -bottom-2 -right-2 text-white/5 group-hover:text-black/10 font-black text-2xl tracking-wider transform rotate-45 transition-colors duration-700"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 1, 0, 1, 0.5] }}
                  transition={{ duration: 2, delay: index * 0.3 + 2 }}
                  viewport={{ once: true }}
                >
                  {newsItem.title.split(' ')[0].substring(0, 4).toUpperCase()}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Stay informed about the latest trends and innovations shaping the creative industry.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#"
              className="group bg-white hover:bg-red-600 text-black hover:text-white px-12 py-4 font-black text-lg tracking-wider transition-all duration-700 relative overflow-hidden"
            >
              <span className="relative z-10">VIEW ALL NEWS</span>
              <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </a>
            
            <a
              href="#contact"
              className="group border-2 border-white hover:border-red-600 text-white hover:text-red-600 px-12 py-4 font-black text-lg tracking-wider transition-all duration-700"
            >
              <span className="relative z-10">GET IN TOUCH</span>
            </a>
          </div>
        </motion.div>

        {/* Large Background Typography */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          transition={{ duration: 2, delay: 2.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-[8vw] font-black text-white leading-none tracking-tighter">
            NEWS
          </h3>
        </motion.div>

        {/* Asymmetric Decorative Elements */}
        <motion.div
          className="absolute top-20 right-20 w-20 h-20 border-3 border-red-600/30 transform rotate-12"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 2 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.section>
  )
}

export default NewsV5A