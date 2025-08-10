'use client'

import { motion } from 'framer-motion'
import { news } from '@/data/news'
import SectionCarouselV4 from './SectionCarouselV4'
import ButtonV4 from './ButtonV4'

const NewsV4 = () => {
  // Convert news data to carousel format
  const newsItems = news.slice(0, 8).map(article => ({
    title: article.title,
    description: article.excerpt,
    category: new Date(article.dateISO).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    }),
    image: article.image
  }))

  return (
    <section id="news" className="py-32 section-light">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="text-center mb-20">
          <motion.div 
            className="text-caption text-gold uppercase tracking-wider mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Latest Updates
          </motion.div>
          
          <motion.h2 
            className="text-hero text-cream mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            News & Insights
          </motion.h2>
          
          <motion.p 
            className="text-body-large text-warm-gray leading-relaxed max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Stay informed with the latest developments in creative partnerships, 
            industry insights, and strategic innovations shaping the future of collaboration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <ButtonV4 variant="tertiary" size="medium" href="#contact">
              Subscribe to Updates
            </ButtonV4>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <SectionCarouselV4 items={newsItems} title="Recent Articles" />
        </motion.div>

        {/* Featured News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          {news.slice(0, 2).map((article, index) => (
            <motion.article
              key={article.id}
              className="group p-8 border border-cream/10 hover:border-sage/30 transition-all duration-300 bg-gradient-to-b from-cream/5 to-transparent backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <div className="text-caption text-gold uppercase tracking-wider mb-4">
                {new Date(article.dateISO).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              
              <h3 className="text-subheading text-cream mb-4 group-hover:text-sage transition-colors duration-300">
                {article.title}
              </h3>
              
              <p className="text-body text-warm-gray leading-relaxed mb-6">
                {article.excerpt}
              </p>
              
              <div className="flex items-center text-sage group-hover:text-gold transition-colors duration-300">
                <span className="text-caption font-medium tracking-wide">Read More</span>
                <motion.span 
                  className="ml-2"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsV4