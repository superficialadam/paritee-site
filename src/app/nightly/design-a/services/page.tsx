import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { services } from '@/data/services'
import { cases } from '@/data/cases'
import * as Icons from 'lucide-react'
import Image from 'next/image'

export default function ServicesPage() {
  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-semibold text-white leading-tight">
            What We Do
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Our comprehensive suite of services is designed to drive measurable results across every aspect of your marketing and communications strategy.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => {
              const IconComponent = Icons[service.icon as keyof typeof Icons] as any
              const relatedCases = cases.filter(c => c.serviceId === service.id)
              
              return (
                <Card key={service.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60">
                  <CardHeader className="p-8">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition-all duration-300">
                      {IconComponent && <IconComponent className="w-8 h-8 text-blue-400" />}
                    </div>
                    <CardTitle className="text-2xl font-semibold text-white mb-4">{service.name}</CardTitle>
                    <CardDescription className="text-slate-300 leading-relaxed text-base">
                      {service.blurb}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    {relatedCases.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Related Work</h4>
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
                              <div>
                                <h5 className="text-white text-sm font-medium mb-1">{caseItem.name}</h5>
                                <p className="text-slate-400 text-xs leading-relaxed">{caseItem.excerpt.substring(0, 80)}...</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button asChild variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal text-sm">
                          <Link href="/nightly/base/cases">View all cases</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">Our Expertise</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Strategic Foundation</h3>
                <p className="text-slate-300 leading-relaxed">
                  Every great campaign starts with solid strategy. We combine market intelligence, consumer insights, and competitive analysis to build comprehensive strategies that drive real business outcomes.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Creative Excellence</h3>
                <p className="text-slate-300 leading-relaxed">
                  Our creative teams don&apos;t just make things look good—they solve problems. From brand identity to campaign execution, we create work that captures attention and drives action.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Digital Innovation</h3>
                <p className="text-slate-300 leading-relaxed">
                  We leverage the latest digital tools and platforms to reach your audience where they are. Our approach combines creativity with technology to deliver measurable results across all digital channels.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Media Excellence</h3>
                <p className="text-slate-300 leading-relaxed">
                  Smart media planning and buying that maximizes your investment. We negotiate better rates, optimize campaigns in real-time, and ensure your message reaches the right audience at the right moment.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Reputation Management</h3>
                <p className="text-slate-300 leading-relaxed">
                  Your reputation is your most valuable asset. Our PR and communications experts help you build, protect, and enhance your brand&apos;s reputation across all channels and touchpoints.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-4">Data-Driven Insights</h3>
                <p className="text-slate-300 leading-relaxed">
                  Numbers tell stories. Our analytics experts turn complex data into actionable insights that inform strategy, optimize performance, and prove ROI across all your marketing investments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-semibold text-white">Ready to Get Started?</h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Let&apos;s discuss how our services can help you achieve your goals.
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