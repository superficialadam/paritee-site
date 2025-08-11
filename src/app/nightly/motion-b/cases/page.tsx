'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cases } from '@/data/cases'
import { sectors } from '@/data/sectors'
import { services } from '@/data/services'
import { agencies } from '@/data/agencies'
import { Filter, X } from 'lucide-react'

export default function CasesPage() {
  const [selectedSector, setSelectedSector] = useState<string>('')
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedAgency, setSelectedAgency] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)

  // Filter cases based on selected filters
  const filteredCases = cases.filter(caseItem => {
    if (selectedSector && caseItem.sectorId !== selectedSector) return false
    if (selectedService && caseItem.serviceId !== selectedService) return false
    if (selectedAgency && caseItem.agencyId !== selectedAgency) return false
    return true
  })

  // Get filter data
  const getSectorName = (id: string) => sectors.find(s => s.id === id)?.name || id
  const getServiceName = (id: string) => services.find(s => s.id === id)?.name || id
  const getAgencyName = (id: string) => agencies.find(a => a.id === id)?.name || id

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedSector('')
    setSelectedService('')
    setSelectedAgency('')
  }

  // Check if any filters are active
  const hasActiveFilters = selectedSector || selectedService || selectedAgency

  // Handle URL parameters for filtering
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const sectorParam = urlParams.get('sector')
      const serviceParam = urlParams.get('service')
      const agencyParam = urlParams.get('agency')
      
      if (sectorParam) setSelectedSector(sectorParam)
      if (serviceParam) setSelectedService(serviceParam)
      if (agencyParam) setSelectedAgency(agencyParam)
    }
  }, [])

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-semibold text-white leading-tight">
            Our Work
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Real results from real partnerships. Explore our portfolio of successful campaigns and strategic initiatives across industries and markets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">{cases.length}</div>
              <div className="text-slate-400 text-sm">Featured Cases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">{sectors.length}</div>
              <div className="text-slate-400 text-sm">Industries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">{agencies.length}</div>
              <div className="text-slate-400 text-sm">Partner Agencies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-white">
              {filteredCases.length} {filteredCases.length === 1 ? 'Case' : 'Cases'}
              {hasActiveFilters && ' (filtered)'}
            </h2>
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-4 py-2 transition-all duration-300 flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>

          {/* Filter Controls */}
          {showFilters && (
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-none p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sector Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Sector</label>
                  <select 
                    data-filter="sector"
                    value={selectedSector} 
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-full text-white focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20"
                  >
                    <option value="">All Sectors</option>
                    {sectors.map(sector => (
                      <option key={sector.id} value={sector.id}>{sector.name}</option>
                    ))}
                  </select>
                </div>

                {/* Service Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Service</label>
                  <select 
                    data-filter="service"
                    value={selectedService} 
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-full text-white focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20"
                  >
                    <option value="">All Services</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                  </select>
                </div>

                {/* Agency Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Agency</label>
                  <select 
                    data-filter="agency"
                    value={selectedAgency} 
                    onChange={(e) => setSelectedAgency(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-full text-white focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20"
                  >
                    <option value="">All Agencies</option>
                    {agencies.map(agency => (
                      <option key={agency.id} value={agency.id}>{agency.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters & Clear */}
              {hasActiveFilters && (
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm text-slate-400">Active filters:</span>
                    {selectedSector && (
                      <span className="flex items-center space-x-1 px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/40 text-sm rounded-full">
                        <span>{getSectorName(selectedSector)}</span>
                        <button onClick={() => setSelectedSector('')}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedService && (
                      <span className="flex items-center space-x-1 px-3 py-1 bg-emerald-600/20 text-emerald-400 border border-emerald-600/40 text-sm rounded-full">
                        <span>{getServiceName(selectedService)}</span>
                        <button onClick={() => setSelectedService('')}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedAgency && (
                      <span className="flex items-center space-x-1 px-3 py-1 bg-amber-600/20 text-amber-400 border border-amber-600/40 text-sm rounded-full">
                        <span>{getAgencyName(selectedAgency)}</span>
                        <button onClick={() => setSelectedAgency('')}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    <Button 
                      onClick={clearAllFilters}
                      variant="ghost"
                      className="text-slate-400 hover:text-white p-0 h-auto font-normal text-sm"
                    >
                      Clear all
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Cases Grid */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          {filteredCases.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-white mb-4">No cases found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your filters to see more results.</p>
              <Button 
                onClick={clearAllFilters}
                className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((caseItem) => (
                <Card key={caseItem.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 overflow-hidden">
                  <div className="aspect-video relative">
                    <Image 
                      src={caseItem.thumbnail} 
                      alt={caseItem.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg font-medium text-white mb-2">{caseItem.name}</CardTitle>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/40 text-xs rounded-full">
                        {getSectorName(caseItem.sectorId)}
                      </span>
                      <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 border border-emerald-600/40 text-xs rounded-full">
                        {getServiceName(caseItem.serviceId)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <CardDescription className="text-slate-400 leading-relaxed text-sm mb-4">
                      {caseItem.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        by {getAgencyName(caseItem.agencyId)}
                      </span>
                      <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal text-sm">
                        Read Full Case
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-semibold text-white">Ready to Create Your Success Story?</h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Let&apos;s discuss how we can help you achieve similar results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/motion-b/contact">Get in Touch</Link>
            </Button>
            <Button asChild className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/motion-b/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}