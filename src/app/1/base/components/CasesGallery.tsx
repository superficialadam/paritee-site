'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Filter } from 'lucide-react'
import { cases } from '@/data/cases'
import { sectors } from '@/data/sectors'
import { services } from '@/data/services'
import Section from './Section'

export default function CasesGallery() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  
  const filteredCases = selectedFilter === 'all' 
    ? cases 
    : cases.filter(c => c.sectorId === selectedFilter || c.serviceId === selectedFilter)

  return (
    <Section
      id="cases"
      title="Our Work"
      intro="Results that speak for themselves"
    >
      {/* Filter Controls - Stubbed but visible */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            disabled // Stubbed functionality
          >
            <Filter className="w-4 h-4 inline mr-2" />
            All Work
          </button>
          {sectors.slice(0, 3).map((sector) => (
            <button
              key={sector.id}
              className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
              disabled // Stubbed functionality
            >
              {sector.name}
            </button>
          ))}
          {services.slice(0, 2).map((service) => (
            <button
              key={service.id}
              className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
              disabled // Stubbed functionality
            >
              {service.name}
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Filters are disabled in this prototype
        </p>
      </div>

      {/* Cases Gallery */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cases.slice(0, 9).map((caseItem, index) => (
          <motion.div
            key={caseItem.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer"
          >
            <div className="relative h-48 bg-gray-200 overflow-hidden">
              <Image
                src={caseItem.thumbnail}
                alt={caseItem.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {caseItem.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {caseItem.excerpt}
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Read Full Case →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}