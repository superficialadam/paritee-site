'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { people } from '@/data/people'
import Section from './Section'

export default function PeopleGrid() {
  return (
    <Section
      id="team"
      title="Meet the People"
      intro="Leadership and expertise from across our network"
      className="bg-gray-50"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {people.slice(0, 12).map((person, index) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all group"
          >
            <div className="relative h-48 bg-gray-200 overflow-hidden">
              <Image
                src={person.avatarUrl}
                alt={person.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                </a>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-1">
                {person.name}
              </h3>
              <p className="text-sm text-blue-600 font-medium mb-1">
                {person.role}
              </p>
              <p className="text-sm text-gray-500">
                {person.location}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}