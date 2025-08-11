'use client'

import { motion } from 'framer-motion'
import { sectors } from '@/data/sectors'
import Section from './Section'

export default function SectorsGrid() {
  return (
    <Section
      id="sectors"
      title="Industries We Know"
      intro="Deep sector expertise across critical industries"
      className="bg-gray-50"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector, index) => (
          <motion.div
            key={sector.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {sector.name}
            </h3>
            <p className="text-gray-600 text-sm">
              {sector.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}