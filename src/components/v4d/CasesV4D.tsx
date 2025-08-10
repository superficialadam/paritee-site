'use client'

import { useState } from 'react'
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { cases } from '@/data/cases'
import { services } from '@/data/services'
import { sectors } from '@/data/sectors'
import { agencies } from '@/data/agencies'

interface CaseModalProps {
  case_: typeof cases[0] | null
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

function CaseModal({ case_, isOpen, onClose, onNext, onPrev }: CaseModalProps) {
  if (!case_) return null

  const service = services.find(s => s.id === case_.serviceId)
  const sector = sectors.find(s => s.id === case_.sectorId)
  const agency = agencies.find(a => a.id === case_.agencyId)

  return (
    <div 
      className={`gallery-modal transition-all duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div 
        className="gallery-modal-content w-full max-w-4xl m-8 transform transition-all duration-500 scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative">
          <img
            src={case_.thumbnail}
            alt={case_.name}
            className="w-full h-80 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all duration-300 group"
          >
            <X size={20} className="text-gray-600 group-hover:text-black transition-colors" />
          </button>
          
          {/* Navigation Arrows */}
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all duration-300 group"
          >
            <ChevronLeft size={24} className="text-gray-600 group-hover:text-black transition-colors" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all duration-300 group"
          >
            <ChevronRight size={24} className="text-gray-600 group-hover:text-black transition-colors" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="display-medium display-font text-black mb-6">
                {case_.name}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {case_.excerpt}
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Sector</span>
                  <span className="text-black font-medium">{sector?.name}</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Service</span>
                  <span className="text-black font-medium">{service?.name}</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Agency</span>
                  <span className="text-black font-medium">{agency?.name}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="card-title display-font text-black mb-4">Project Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50">
                    <div className="text-2xl font-light display-font text-black mb-1">300%</div>
                    <div className="text-sm text-gray-600">Increase in Engagement</div>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <div className="text-2xl font-light display-font text-black mb-1">18mo</div>
                    <div className="text-sm text-gray-600">Time to Market</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="card-title display-font text-black mb-4">Key Achievements</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Market leadership position achieved within first year
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Award-winning creative execution across all channels
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Sustainable competitive advantage established
                  </li>
                </ul>
              </div>

              <button className="w-full px-8 py-4 bg-black text-white font-medium hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center gap-3 group">
                View Full Case Study
                <ExternalLink size={18} className="transition-transform duration-300 group-hover:scale-110" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CasesV4D() {
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (case_: typeof cases[0]) => {
    setSelectedCase(case_)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'auto'
    setTimeout(() => setSelectedCase(null), 300)
  }

  const navigateCase = (direction: 'next' | 'prev') => {
    if (!selectedCase) return
    
    const currentIndex = cases.findIndex(c => c.id === selectedCase.id)
    let newIndex
    
    if (direction === 'next') {
      newIndex = currentIndex === cases.length - 1 ? 0 : currentIndex + 1
    } else {
      newIndex = currentIndex === 0 ? cases.length - 1 : currentIndex - 1
    }
    
    setSelectedCase(cases[newIndex])
  }

  return (
    <>
      <section id="cases" className="gallery-container">
        {/* Section Header */}
        <div className="text-center mb-16 fade-up">
          <div className="gallery-eyebrow mb-4">
            Our Portfolio
          </div>
          <h2 className="section-title display-font text-black mb-6">
            Gallery of Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each project represents a unique collaboration between brand vision and creative mastery, 
            curated for impact and crafted for permanence.
          </p>
        </div>

        {/* Cases Gallery Grid */}
        <div className="gallery-grid gallery-grid-3">
          {cases.map((case_, index) => {
            const service = services.find(s => s.id === case_.serviceId)
            
            return (
              <div
                key={case_.id}
                className="gallery-card p-0 overflow-hidden group cursor-pointer stagger-child fade-up"
                style={{ '--stagger-delay': index } as React.CSSProperties}
                onClick={() => openModal(case_)}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={case_.thumbnail}
                    alt={case_.name}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-sm font-medium">View Case Study</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="text-sm text-yellow-600 font-medium mb-3">
                    {service?.name}
                  </div>
                  
                  <h3 className="card-title display-font text-black mb-4 group-hover:text-yellow-700 transition-colors duration-300">
                    {case_.name}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {case_.excerpt}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 fade-up">
          <p className="text-gray-600 mb-8">
            Ready to create your own gallery-worthy campaign?
          </p>
          <button className="px-10 py-4 bg-black text-white font-medium hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105">
            Start Your Project
          </button>
        </div>
      </section>

      {/* Case Study Modal */}
      <CaseModal
        case_={selectedCase}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={() => navigateCase('next')}
        onPrev={() => navigateCase('prev')}
      />
    </>
  )
}