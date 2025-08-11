import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { services } from '@/data/services'
import { cases } from '@/data/cases'
import * as Icons from 'lucide-react'
import Image from 'next/image'
import { ChevronRight, ArrowRight } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32">
      {/* Hero Section - Mobile-first with breadcrumb navigation */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb for better navigation */}
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-slate-400">
              <li>
                <Link href="/nightly/canvas-c" className="hover:text-blue-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <ChevronRight className="w-4 h-4" />
              <li className="text-white" aria-current="page">Services</li>
            </ol>
          </nav>

          <div className="text-center space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight">
              What We Do
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
              Our comprehensive suite of services is designed to drive measurable results across every aspect of your marketing and communications strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - Mobile-first with enhanced touch interaction */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {services.map((service) => {
              const IconComponent = Icons[service.icon as keyof typeof Icons] as any
              const relatedCases = cases.filter(c => c.serviceId === service.id)
              
              return (
                <Card 
                  key={service.id} 
                  className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-blue-600/30 hover:bg-slate-800/60 active:scale-95"
                >
                  <CardHeader className="p-6 sm:p-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-600/30 group-hover:scale-110 transition-all duration-300">
                      {IconComponent && <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" />}
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4 group-hover:text-blue-100 transition-colors duration-300">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="text-slate-300 leading-relaxed text-sm sm:text-base group-hover:text-slate-200 transition-colors duration-300">
                      {service.blurb}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
                    {relatedCases.length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-slate-700/50">
                        <h4 className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">Related Work</h4>
                        <div className="space-y-3">
                          {relatedCases.slice(0, 2).map((caseItem) => (
                            <div 
                              key={caseItem.id} 
                              className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-none hover:bg-slate-700/50 transition-colors duration-300 cursor-pointer active:bg-slate-700/60 min-h-[60px]"
                              role="button"
                              tabIndex={0}
                              aria-label={`View case study: ${caseItem.name}`}
                            >
                              <Image
                                src={caseItem.thumbnail}
                                alt={caseItem.name}
                                width={45}
                                height={45}
                                className="rounded object-cover flex-shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <h5 className="text-white text-sm font-medium mb-1 truncate">{caseItem.name}</h5>
                                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                                  {caseItem.excerpt.substring(0, 60)}...
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button asChild variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal text-sm flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800">
                          <Link href="/nightly/canvas-c/cases">
                            <span>View all cases</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
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

      {/* CTA Section - Mobile-optimized with enhanced CTAs */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-600/5 border border-blue-600/20 backdrop-blur-sm rounded-none p-6 sm:p-8 lg:p-12 text-center space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">Ready to Get Started?</h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Let's discuss how our services can help you achieve your goals and drive real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild className="w-full sm:w-auto bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300 font-semibold min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950">
                <Link href="/nightly/canvas-c/contact" className="flex items-center justify-center space-x-2">
                  <span>Get in Touch</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild className="w-full sm:w-auto bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950">
                <Link href="/nightly/canvas-c/cases" className="flex items-center justify-center space-x-2">
                  <span>View Our Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}