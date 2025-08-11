import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { agencies } from '@/data/agencies'
import { cases } from '@/data/cases'
import { sectors } from '@/data/sectors'
import { MapPin, Briefcase, Award } from 'lucide-react'

export default function AgenciesPage() {
  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-semibold text-white leading-tight">
            Our Agencies
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            A carefully curated network of independent agencies, each a leader in their market. United by shared values, strengthened by collaboration.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">{agencies.length}</div>
              <div className="text-slate-400 text-sm">Partner Agencies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">{Array.from(new Set(agencies.flatMap(a => a.locations))).length}</div>
              <div className="text-slate-400 text-sm">Global Locations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">{Array.from(new Set(agencies.flatMap(a => a.sectors))).length}</div>
              <div className="text-slate-400 text-sm">Industry Sectors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Agencies Grid */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {agencies.map((agency) => {
              const agencyCases = cases.filter(c => c.agencyId === agency.id)
              const agencySectors = agency.sectors.map(sectorId => 
                sectors.find(s => s.id === sectorId)
              ).filter(Boolean)

              return (
                <Card key={agency.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60">
                  <CardHeader className="p-8">
                    <div className="flex items-start space-x-6 mb-6">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image 
                          src={agency.logoUrl} 
                          alt={`${agency.name} logo`}
                          fill
                          className="rounded-none object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-semibold text-white mb-3">{agency.name}</CardTitle>
                        <CardDescription className="text-slate-300 leading-relaxed text-base">
                          {agency.blurb}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="px-8 pb-8 space-y-6">
                    {/* Locations */}
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Locations</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {agency.locations.map((location) => (
                          <span key={location} className="px-3 py-1 bg-slate-700 text-slate-200 border-slate-600 text-sm rounded-full">
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sectors */}
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Sector Expertise</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {agencySectors.map((sector) => (
                          <span key={sector!.id} className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/40 text-sm rounded-full">
                            {sector!.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Featured Work */}
                    {agencyCases.length > 0 && (
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Award className="w-4 h-4 text-slate-400" />
                          <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Featured Work</h4>
                        </div>
                        <div className="space-y-3">
                          {agencyCases.slice(0, 2).map((caseItem) => (
                            <div key={caseItem.id} className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-none hover:bg-slate-700/50 transition-colors duration-300">
                              <Image
                                src={caseItem.thumbnail}
                                alt={caseItem.name}
                                width={50}
                                height={50}
                                className="rounded object-cover flex-shrink-0"
                              />
                              <div className="flex-1">
                                <h5 className="text-white text-sm font-medium mb-1">{caseItem.name}</h5>
                                <p className="text-slate-400 text-xs leading-relaxed">{caseItem.excerpt.substring(0, 100)}...</p>
                              </div>
                            </div>
                          ))}
                          {agencyCases.length > 2 && (
                            <p className="text-blue-400 text-sm">+{agencyCases.length - 2} more projects</p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-slate-700">
                      <Button asChild variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal">
                        <span className="cursor-pointer">See Profile</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Network Benefits */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">The Power of Partnership</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none text-center">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-xl font-medium text-white">Specialized Expertise</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-slate-400 leading-relaxed">
                  Each agency brings deep specialization in their sectors and services, giving you access to the best talent for every challenge.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none text-center">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                </div>
                <CardTitle className="text-xl font-medium text-white">Global Reach</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-slate-400 leading-relaxed">
                  Our network spans major markets worldwide, providing local expertise with global coordination for seamless execution.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none text-center">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
                <CardTitle className="text-xl font-medium text-white">Proven Track Record</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-slate-400 leading-relaxed">
                  Our agencies are industry leaders with award-winning work and measurable results across diverse markets and challenges.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Model */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">How We Work Together</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Independent Excellence</h3>
                <p className="text-slate-300 leading-relaxed">
                  Each agency maintains its independence and unique culture while adhering to shared standards of quality and collaboration. This ensures you get authentic expertise, not corporate uniformity.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Collaborative Approach</h3>
                <p className="text-slate-300 leading-relaxed">
                  When your needs require multiple specializations, our agencies work seamlessly together as one integrated team, sharing insights and coordinating efforts for maximum impact.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Quality Standards</h3>
                <p className="text-slate-300 leading-relaxed">
                  All partner agencies meet rigorous standards for creativity, strategic thinking, and client service. Regular collaboration and knowledge sharing ensures best practices across the network.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Shared Values</h3>
                <p className="text-slate-300 leading-relaxed">
                  Our agencies share core values of integrity, innovation, and client success. This alignment ensures consistent quality and approach, regardless of which agencies work on your projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-semibold text-white">Ready to Partner with the Best?</h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Let&apos;s connect you with the right agencies for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/base/contact">Get in Touch</Link>
            </Button>
            <Button asChild className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/base/cases">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}