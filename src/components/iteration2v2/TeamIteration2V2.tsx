'use client'

import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { people } from '@/data/people'

export default function TeamIteration2V2() {
  return (
    <section id="team" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <div className="eyebrow">Our People</div>
          <h2 className="section-title text-white">
            Meet the People
          </h2>
        </div>
        
        <div className="grid grid-4">
          {people.map((person, index) => (
            <div 
              key={person.id}
              className="card card-small p-6 text-center fade-up"
              style={{ '--stagger-delay': index } as React.CSSProperties}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-[#1A3A6B]">
                <Image
                  src={person.avatarUrl}
                  alt={person.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="card-title text-white mb-2 text-sm">
                {person.name}
              </h3>
              
              <div className="text-[#D4AF37] text-xs font-medium mb-2">
                {person.role}
              </div>
              
              <div className="text-[#94A3B8] text-xs mb-4">
                {person.location}
              </div>
              
              <a 
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#D4AF37] text-xs hover:text-white transition-colors"
              >
                <ExternalLink size={12} className="mr-1" />
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}