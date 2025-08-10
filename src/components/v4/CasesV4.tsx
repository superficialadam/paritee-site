'use client'

import { motion } from 'framer-motion'
import { cases } from '@/data/cases'
import SectionCarouselV4 from './SectionCarouselV4'
import ButtonV4 from './ButtonV4'

const CasesV4 = () => {
  // Convert cases data to carousel format
  const caseItems = cases.slice(0, 6).map(caseItem => ({
    title: caseItem.title,
    description: caseItem.blurb,
    category: caseItem.sector,
    image: caseItem.image
  }))

  return (
    <section id="cases" className="py-32 section-emphasis">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="text-center mb-20">
          <motion.div 
            className="text-caption text-gold uppercase tracking-wider mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Success Stories
          </motion.div>
          
          <motion.h2 
            className="text-hero text-cream mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Case Studies
          </motion.h2>
          
          <motion.p 
            className="text-body-large text-warm-gray leading-relaxed max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover how our strategic partnerships have delivered exceptional 
            results across diverse industries and markets worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <ButtonV4 variant="secondary" size="medium" href="#contact">
              Start Your Project
            </ButtonV4>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <SectionCarouselV4 items={caseItems} title="Featured Work" />
        </motion.div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-heading text-sage font-light mb-2">2.5x</div>
            <div className="text-caption text-gold uppercase tracking-wider">
              Average ROI
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-heading text-sage font-light mb-2">98%</div>
            <div className="text-caption text-gold uppercase tracking-wider">
              Client Satisfaction
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="text-heading text-sage font-light mb-2">150+</div>
            <div className="text-caption text-gold uppercase tracking-wider">
              Successful Projects
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-heading text-sage font-light mb-2">24mo</div>
            <div className="text-caption text-gold uppercase tracking-wider">
              Average Partnership
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CasesV4