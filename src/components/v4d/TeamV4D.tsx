'use client'

import { Linkedin, MapPin } from 'lucide-react'
import { people } from '@/data/people'

export default function TeamV4D() {
  return (
    <section id="team" className="gallery-container">
      {/* Section Header */}
      <div className="text-center mb-16 fade-up">
        <div className="gallery-eyebrow mb-4">
          Our Curators
        </div>
        <h2 className="section-title display-font text-black mb-6">
          The Minds Behind the Magic
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Like master curators at the world's finest galleries, our team brings together 
          diverse perspectives and deep expertise to create extraordinary outcomes.
        </p>
      </div>

      {/* Team Grid */}
      <div className="gallery-grid gallery-grid-4">
        {people.map((person, index) => (
          <div
            key={person.id}
            className="gallery-card p-0 overflow-hidden group cursor-pointer stagger-child fade-up"
            style={{ '--stagger-delay': index } as React.CSSProperties}
          >
            {/* Avatar */}
            <div className="relative overflow-hidden">
              <img
                src={person.avatarUrl}
                alt={person.name}
                className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* LinkedIn Link */}
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
              >
                <Linkedin size={18} className="text-gray-600 hover:text-blue-600 transition-colors" />
              </a>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="card-title display-font text-black mb-2 group-hover:text-yellow-700 transition-colors duration-300">
                {person.name}
              </h3>
              
              <div className="text-sm text-yellow-600 font-medium mb-3">
                {person.role}
              </div>
              
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin size={14} className="mr-2 flex-shrink-0" />
                {person.location}
              </div>

              {/* Quote or expertise area could go here */}
              <div className="mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <p className="text-xs text-gray-500 italic">
                  "Excellence is never an accident. It is always the result of high intention, sincere effort, and intelligent execution."
                </p>
              </div>
            </div>

            {/* Hover Effect Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>
        ))}
      </div>

      {/* Leadership Quote */}
      <div className="mt-20 text-center fade-up">
        <div className="max-w-4xl mx-auto">
          <blockquote className="text-2xl display-font font-light text-black leading-relaxed mb-8">
            "Our role is not just to connect brands with agencies, but to curate partnerships 
            that elevate the entire creative industry."
          </blockquote>
          <footer className="text-gray-600">
            <cite className="font-medium text-black">Sarah Chen</cite>
            <span className="mx-2">•</span>
            <span className="text-sm">Chief Executive Officer</span>
          </footer>
        </div>
      </div>

      {/* Join Team CTA */}
      <div className="text-center mt-16 fade-up">
        <div className="inline-block p-8 border border-gray-200 bg-gray-50/50">
          <h3 className="card-title display-font text-black mb-4">Join Our Gallery</h3>
          <p className="text-gray-600 mb-6 max-w-md">
            We're always looking for exceptional talent to join our curatorial team.
          </p>
          <button className="px-8 py-3 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300">
            View Open Positions
          </button>
        </div>
      </div>
    </section>
  )
}