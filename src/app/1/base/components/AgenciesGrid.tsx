'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { agencies } from '@/data/agencies'
import Section from './Section'

export default function AgenciesGrid() {
  return (
    <Section
      id="agencies"
      title="Our Agencies"
      intro="Independent powerhouses united by shared values"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agencies.map((agency, index) => (
          <motion.div
            key={agency.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
          >
            <div className="relative h-32 bg-gray-100 flex items-center justify-center">
              <Image
                src={agency.logoUrl}
                alt={`${agency.name} logo`}
                width={120}
                height={60}
                className="max-w-[120px] max-h-[60px] object-contain"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {agency.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {agency.blurb}
              </p>
              <div className="mb-4">
                <p className="text-sm text-gray-500 font-medium mb-1">Locations:</p>
                <p className="text-sm text-blue-600">
                  {agency.locations.join(', ')}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                See Profile
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}