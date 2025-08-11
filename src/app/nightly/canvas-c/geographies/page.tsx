import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { geographies } from '@/data/geographies'
import { agencies } from '@/data/agencies'
import { people } from '@/data/people'
import { MapPin, Users, Building } from 'lucide-react'

export default function GeographiesPage() {
  // Get statistics for each geography
  const getGeographyStats = (geography: typeof geographies[0]) => {
    const agencyCount = agencies.filter(agency => 
      agency.locations.some(location => geography.cities.includes(location))
    ).length
    
    const peopleCount = people.filter(person => 
      geography.cities.includes(person.location)
    ).length

    return { agencyCount, peopleCount }
  }

  const totalCities = geographies.reduce((acc, geo) => acc + geo.cities.length, 0)
  const totalCountries = geographies.length
  const totalAgencies = agencies.length

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-semibold text-white leading-tight">
            Our Global Footprint
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            A network that spans continents, with local expertise that understands your market and global reach that scales with your ambitions.
          </p>
          
          {/* Global Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">{totalCountries}</div>
              <div className="text-slate-400 text-sm">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">{totalCities}</div>
              <div className="text-slate-400 text-sm">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">{totalAgencies}</div>
              <div className="text-slate-400 text-sm">Partner Agencies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Geographies Grid */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {geographies.map((geography) => {
              const stats = getGeographyStats(geography)
              const localAgencies = agencies.filter(agency => 
                agency.locations.some(location => geography.cities.includes(location))
              )
              const localPeople = people.filter(person => 
                geography.cities.includes(person.location)
              )

              return (
                <Card key={geography.country} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60">
                  <CardHeader className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-400" />
                      </div>
                      <CardTitle className="text-xl font-medium text-white">{geography.country}</CardTitle>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-400">{stats.agencyCount} agencies</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-400">{stats.peopleCount} people</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="px-6 pb-6 space-y-4">
                    {/* Cities */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Locations</h4>
                      <div className="flex flex-wrap gap-2">
                        {geography.cities.map((city) => (
                          <span key={city} className="px-3 py-1 bg-slate-700 text-slate-200 border-slate-600 text-sm rounded-full">
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Local Agencies */}
                    {localAgencies.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Partner Agencies</h4>
                        <div className="space-y-2">
                          {localAgencies.slice(0, 2).map((agency) => (
                            <div key={agency.id} className="text-sm">
                              <span className="text-white font-medium">{agency.name}</span>
                              <p className="text-slate-400 text-xs mt-1">{agency.blurb.substring(0, 80)}...</p>
                            </div>
                          ))}
                          {localAgencies.length > 2 && (
                            <p className="text-blue-400 text-xs">+{localAgencies.length - 2} more agencies</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Local Team */}
                    {localPeople.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Local Team</h4>
                        <div className="space-y-1">
                          {localPeople.slice(0, 3).map((person) => (
                            <div key={person.id} className="text-sm">
                              <span className="text-white">{person.name}</span>
                              <span className="text-slate-400 ml-2">• {person.role}</span>
                            </div>
                          ))}
                          {localPeople.length > 3 && (
                            <p className="text-blue-400 text-xs">+{localPeople.length - 3} more team members</p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Regional Capabilities */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">Regional Capabilities</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Americas</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Strong presence across North America with deep understanding of diverse markets from tech innovation in San Francisco to financial services in New York.
                </p>
                <div className="flex flex-wrap gap-2">
                  {geographies.find(g => g.country === 'United States')?.cities.map(city => (
                    <span key={city} className="px-2 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/40 text-xs rounded-full">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Europe</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Comprehensive European coverage with expertise in complex regulatory environments and diverse cultural markets.
                </p>
                <div className="space-y-2">
                  {geographies.filter(g => ['United Kingdom', 'Germany', 'France'].includes(g.country)).map(geo => (
                    <div key={geo.country} className="flex items-center space-x-2">
                      <span className="text-white text-sm font-medium">{geo.country}:</span>
                      <div className="flex flex-wrap gap-1">
                        {geo.cities.map(city => (
                          <span key={city} className="px-2 py-1 bg-emerald-600/20 text-emerald-400 border border-emerald-600/40 text-xs rounded-full">
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Asia-Pacific</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Strategic presence in key APAC markets with local teams who understand cultural nuances and business practices.
                </p>
                <div className="space-y-2">
                  {geographies.filter(g => ['Australia', 'Japan'].includes(g.country)).map(geo => (
                    <div key={geo.country} className="flex items-center space-x-2">
                      <span className="text-white text-sm font-medium">{geo.country}:</span>
                      <div className="flex flex-wrap gap-1">
                        {geo.cities.map(city => (
                          <span key={city} className="px-2 py-1 bg-amber-600/20 text-amber-400 border border-amber-600/40 text-xs rounded-full">
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-white mb-4">Global Coordination</h3>
                <p className="text-slate-300 leading-relaxed">
                  Our distributed model ensures seamless collaboration across time zones with consistent quality and integrated strategies that work locally and globally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-semibold text-white">Ready to Go Global?</h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Let&apos;s discuss how our global network can support your expansion plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/canvas-c/contact">Get in Touch</Link>
            </Button>
            <Button asChild className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/canvas-c/team">Meet Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}