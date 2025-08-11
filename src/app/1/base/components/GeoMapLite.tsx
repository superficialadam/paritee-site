'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { geographies } from '@/data/geographies'
import Section from './Section'

export default function GeoMapLite() {
  return (
    <Section
      id="geographies"
      title="Our Footprint"
      intro="Global reach with local expertise"
      className="bg-gray-50"
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {geographies.map((geo, index) => (
              <motion.div
                key={geo.country}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {geo.country}
                  </h3>
                </div>
                <div className="pl-7">
                  {geo.cities.map((city) => (
                    <motion.div
                      key={city}
                      whileHover={{ x: 5 }}
                      className="text-gray-600 py-1 cursor-pointer hover:text-blue-600 transition-colors"
                    >
                      {city}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}