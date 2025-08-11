import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { sectors } from '@/data/sectors'
import { cases } from '@/data/cases'
import { agencies } from '@/data/agencies'

export default function SectorsPage() {
  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-semibold text-white leading-tight">
            Industries We Know
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Deep sector expertise across the industries that matter most. We understand your market, your challenges, and what it takes to succeed.
          </p>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {sectors.map((sector) => {
              const relatedCases = cases.filter(c => c.sectorId === sector.id)
              const sectorAgencies = agencies.filter(a => a.sectors.includes(sector.id))
              
              return (
                <Card key={sector.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60">
                  <CardHeader className="p-8">
                    <CardTitle className="text-2xl font-semibold text-white mb-4">{sector.name}</CardTitle>
                    <CardDescription className="text-slate-300 leading-relaxed text-base mb-6">
                      {sector.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-8 space-y-6">
                    {/* Related Cases */}
                    {relatedCases.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Featured Work</h4>
                        <div className="space-y-3">
                          {relatedCases.slice(0, 2).map((caseItem) => (
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
                        </div>
                      </div>
                    )}

                    {/* Sector Agencies */}
                    {sectorAgencies.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Sector Specialists</h4>
                        <div className="flex flex-wrap gap-2">
                          {sectorAgencies.slice(0, 3).map((agency) => (
                            <span key={agency.id} className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/40 text-xs rounded-full">
                              {agency.name}
                            </span>
                          ))}
                          {sectorAgencies.length > 3 && (
                            <span className="px-3 py-1 bg-slate-600/20 text-slate-400 border border-slate-600/40 text-xs rounded-full">
                              +{sectorAgencies.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <Button asChild variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal text-sm">
                        <Link href={`/nightly/motion-b/cases?sector=${sector.id}`}>View all {sector.name.toLowerCase()} work</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sector Insights */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">Why Sector Expertise Matters</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none text-center">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-semibold text-emerald-400">1</span>
                </div>
                <CardTitle className="text-xl font-medium text-white">Deep Market Knowledge</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-slate-400 leading-relaxed">
                  We understand your industry&apos;s unique challenges, regulatory environment, and competitive landscape to create strategies that work.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none text-center">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-semibold text-amber-400">2</span>
                </div>
                <CardTitle className="text-xl font-medium text-white">Proven Track Record</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-slate-400 leading-relaxed">
                  Our portfolio speaks for itself. We&apos;ve delivered successful campaigns across diverse industries with measurable results.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none text-center">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-semibold text-blue-400">3</span>
                </div>
                <CardTitle className="text-xl font-medium text-white">Strategic Networks</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-slate-400 leading-relaxed">
                  Our agency network includes specialists in every major industry, giving you access to the best expertise for your sector.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-semibold text-white">Ready to Work with Industry Experts?</h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Let&apos;s discuss how our sector expertise can drive your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/motion-b/contact">Get in Touch</Link>
            </Button>
            <Button asChild className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/motion-b/agencies">Meet Our Agencies</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}