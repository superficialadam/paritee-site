'use client'

import { motion } from 'framer-motion'
import Section from './Section'
import PullQuote from './PullQuote'

export default function MissionBlock() {
  return (
    <Section
      id="mission"
      eyebrow="Our Mission"
      title="Redefining What's Possible"
      className="bg-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="prose prose-lg prose-stone max-w-none">
            <p className="text-xl md:text-2xl leading-relaxed text-stone-700 font-light">
              For too long, the marketing industry has operated on false choices. 
              You're told to pick between brand and performance, between creativity 
              and data, between reach and relevance.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-stone-700 font-light">
              We reject these trade-offs. Our mission is to prove that the best 
              marketing happens when you refuse to compromise—when you demand 
              both exceptional creativity and measurable results.
            </p>
          </div>

          <div className="space-y-6 pt-8">
            <h3 className="text-2xl font-bold font-heading text-stone-900">Best of Both Worlds:</h3>
            <ul className="space-y-4">
              {[
                'Creative excellence that drives emotional connection',
                'Data-driven insights that optimize performance', 
                'Global scale with local market expertise',
                'Innovation balanced with proven methodologies'
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-stone-900 rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-lg text-stone-700 leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="lg:pl-12"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <PullQuote
            quote="We don't believe in choosing between brand building and performance marketing. The future belongs to those who master both."
            author="Sarah Chen"
            title="Chief Executive Officer"
          />
        </motion.div>
      </div>
    </Section>
  )
}