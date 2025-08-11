import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { services } from '@/data/services'
import { sectors } from '@/data/sectors'
import { geographies } from '@/data/geographies'
import { agencies } from '@/data/agencies'
import { cases } from '@/data/cases'
import { people } from '@/data/people'
import { news } from '@/data/news'
import * as Icons from 'lucide-react'
import { ChevronRight, Star, Users, Award } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32">
      {/* Hero Section - Mobile-first with progressive disclosure */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero headline with F-pattern optimization */}
          <div className="text-center space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight max-w-4xl mx-auto">
              No Compromise. Just Better.
            </h1>
            
            {/* Progressive disclosure of content */}
            <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
              {/* Primary value proposition - always visible */}
              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-medium">
                You&apos;ve been asked to make trade-offs for too long.
              </p>
              
              {/* Secondary details - progressive disclosure on larger screens */}
              <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                <p className="hidden sm:block">
                  Big agencies that go big on overhead but fall short on care.
                  Small agencies that bring passion but can&apos;t keep pace.
                </p>
                <p className="sm:hidden">
                  No more choosing between speed and scale, or bold thinking and trusted delivery.
                </p>
                <p className="hidden sm:block">
                  You&apos;ve had to choose between speed and scale.
                  Bold thinking and trusted delivery.
                </p>
                <p className="text-lg sm:text-xl text-blue-200 font-medium">
                  That compromise ends with Paritee.
                </p>
                <p className="hidden lg:block">
                  We are a coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
                </p>
              </div>
            </div>

            {/* Clear CTA hierarchy with thumb-friendly zones */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 sm:mt-12">
              <Button asChild className="w-full sm:w-auto bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300 font-semibold text-lg min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950">
                <Link href="/nightly/design-c/cases" className="flex items-center justify-center space-x-2">
                  <span>Explore Our Work</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild className="w-full sm:w-auto bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950">
                <Link href="/nightly/design-c/contact" className="flex items-center justify-center space-x-2">
                  <span>Get in Touch</span>
                  <Users className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Social proof section - mobile optimized */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm rounded-none p-6 hover:border-blue-600/30 transition-all duration-300">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-blue-400 mr-2" />
                  <span className="text-2xl font-semibold text-white">25+</span>
                </div>
                <p className="text-slate-400 text-sm">Top-tier agencies</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm rounded-none p-6 hover:border-blue-600/30 transition-all duration-300">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-blue-400 mr-2" />
                  <span className="text-2xl font-semibold text-white">500+</span>
                </div>
                <p className="text-slate-400 text-sm">Expert professionals</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm rounded-none p-6 hover:border-blue-600/30 transition-all duration-300">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-blue-400 mr-2" />
                  <span className="text-2xl font-semibold text-white">15+</span>
                </div>
                <p className="text-slate-400 text-sm">Global markets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement - Mobile-first with better readability */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Built for impact, not just size
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Mobile-optimized card layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12">
              <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none hover:border-blue-600/30 transition-all duration-300 p-6">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto">
                    <Star className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Purpose-driven</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    We built Paritee to deliver impact you deserve — with trust, purpose and partnership at the core.
                  </p>
                </div>
              </Card>
              
              <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none hover:border-blue-600/30 transition-all duration-300 p-6">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Equal partners</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    No hierarchies or politics. Just equals with aligned values, solving challenges together.
                  </p>
                </div>
              </Card>
              
              <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none hover:border-blue-600/30 transition-all duration-300 p-6">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto">
                    <Award className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Stronger together</h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    Each agency leads in its market. Together, we deliver without big network baggage.
                  </p>
                </div>
              </Card>
            </div>
            
            {/* Core message with better hierarchy */}
            <div className="text-center space-y-6 bg-blue-600/5 border border-blue-600/20 backdrop-blur-sm rounded-none p-6 sm:p-8 lg:p-12">
              <blockquote className="text-lg sm:text-xl lg:text-2xl text-blue-200 font-medium leading-relaxed">
                "Great things happen when equals come together"
              </blockquote>
              <p className="text-slate-400 leading-relaxed max-w-3xl mx-auto">
                Our name, Paritee, reflects what we believe. You get seamless delivery, sharper thinking, and results without the baggage of big networks or the limits of small shops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services - Mobile-first grid with touch-friendly cards */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4">What We Do</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Comprehensive services designed to accelerate your business growth
            </p>
          </div>
          
          {/* Progressive disclosure: show fewer on mobile, more on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.slice(0, 6).map((service) => {
              const IconComponent = Icons[service.icon as keyof typeof Icons] as any
              return (
                <Card 
                  key={service.id} 
                  className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-blue-600/30 hover:bg-slate-800/60 cursor-pointer min-h-[200px] sm:min-h-[220px] active:scale-95"
                  role="button"
                  tabIndex={0}
                  aria-label={`Learn more about ${service.name}`}
                >
                  <CardHeader className="p-4 sm:p-6">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600/30 group-hover:scale-110 transition-all duration-300">
                      {IconComponent && <IconComponent className="w-6 h-6 text-blue-400" />}
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-medium text-white group-hover:text-blue-100 transition-colors duration-300">
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <CardDescription className="text-slate-400 leading-relaxed text-sm sm:text-base group-hover:text-slate-300 transition-colors duration-300">
                      {service.blurb}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          {/* Progressive disclosure for remaining services on larger screens */}
          <div className="hidden lg:grid grid-cols-3 gap-8 mt-8">
            {services.slice(6).map((service) => {
              const IconComponent = Icons[service.icon as keyof typeof Icons] as any
              return (
                <Card 
                  key={service.id} 
                  className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-blue-600/30 hover:bg-slate-800/60 cursor-pointer min-h-[220px] active:scale-95"
                  role="button"
                  tabIndex={0}
                  aria-label={`Learn more about ${service.name}`}
                >
                  <CardHeader className="p-6">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600/30 group-hover:scale-110 transition-all duration-300">
                      {IconComponent && <IconComponent className="w-6 h-6 text-blue-400" />}
                    </div>
                    <CardTitle className="text-xl font-medium text-white group-hover:text-blue-100 transition-colors duration-300">
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <CardDescription className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                      {service.blurb}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Button asChild className="w-full sm:w-auto bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300 font-semibold min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950">
              <Link href="/nightly/design-c/services" className="flex items-center justify-center space-x-2">
                <span>View All Services</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sectors - Mobile-optimized with progressive disclosure */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4">Industries We Know</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Deep expertise across key sectors driving global growth
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sectors.slice(0, 6).map((sector) => (
              <Card 
                key={sector.id} 
                className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-blue-600/30 hover:bg-slate-800/60 cursor-pointer min-h-[180px] active:scale-95"
                role="button"
                tabIndex={0}
                aria-label={`Learn more about ${sector.name} sector`}
              >
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl font-medium text-white group-hover:text-blue-100 transition-colors duration-300">{sector.name}</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                  <CardDescription className="text-slate-400 leading-relaxed text-sm sm:text-base group-hover:text-slate-300 transition-colors duration-300">{sector.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Button asChild className="w-full sm:w-auto bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300 font-semibold min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950">
              <Link href="/nightly/design-c/sectors" className="flex items-center justify-center space-x-2">
                <span>Explore All Sectors</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Geographies - Mobile-optimized */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4">Our Footprint</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Global presence with local expertise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {geographies.map((geography) => (
              <Card key={geography.country} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-medium text-white">{geography.country}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="flex flex-wrap gap-2">
                    {geography.cities.map((city) => (
                      <span key={city} className="px-3 py-1 bg-slate-700 text-slate-200 border-slate-600 text-sm rounded-full">
                        {city}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="w-full sm:w-auto bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300 font-semibold min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950">
              <Link href="/nightly/design-c/geographies" className="flex items-center justify-center space-x-2">
                <span>View All Locations</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Agencies Preview - Mobile-optimized */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4">Our Agencies</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Top-tier agencies united by shared values
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agencies.slice(0, 4).map((agency) => (
              <Card key={agency.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60">
                <CardHeader className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Image 
                      src={agency.logoUrl} 
                      alt={`${agency.name} logo`}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                    <CardTitle className="text-xl font-medium text-white">{agency.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <CardDescription className="text-slate-400 leading-relaxed mb-4">{agency.blurb}</CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agency.locations.slice(0, 3).map((location) => (
                      <span key={location} className="px-2 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/40 text-xs rounded-full">
                        {location}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="w-full sm:w-auto bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300 font-semibold min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950">
              <Link href="/nightly/design-c/agencies" className="flex items-center justify-center space-x-2">
                <span>Meet All Agencies</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cases Preview - Mobile-optimized */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4">Our Work</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Real results for real businesses
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.slice(0, 6).map((caseItem) => (
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
                  <CardTitle className="text-lg font-medium text-white">{caseItem.name}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <CardDescription className="text-slate-400 leading-relaxed text-sm">{caseItem.excerpt}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="w-full sm:w-auto bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300 font-semibold min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950">
              <Link href="/nightly/design-c/cases" className="flex items-center justify-center space-x-2">
                <span>View All Cases</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Preview - Mobile-optimized */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4">Meet the People</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              The talent behind exceptional results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {people.slice(0, 8).map((person) => (
              <Card key={person.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 text-center">
                <CardHeader className="p-6">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <Image 
                      src={person.avatarUrl} 
                      alt={person.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg font-medium text-white">{person.name}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <CardDescription className="text-slate-400 text-sm mb-2">{person.role}</CardDescription>
                  <CardDescription className="text-slate-500 text-sm">{person.location}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="w-full sm:w-auto bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300 font-semibold min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950">
              <Link href="/nightly/design-c/team" className="flex items-center justify-center space-x-2">
                <span>Meet Everyone</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* News Preview - Mobile-optimized */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4">Latest News</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Insights and updates from our network
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.slice(0, 3).map((newsItem) => (
              <Card key={newsItem.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 overflow-hidden">
                <div className="aspect-video relative">
                  <Image 
                    src={newsItem.image} 
                    alt={newsItem.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="p-6">
                  <CardDescription className="text-slate-500 text-sm mb-2">
                    {new Date(newsItem.dateISO).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardDescription>
                  <CardTitle className="text-lg font-medium text-white leading-tight">{newsItem.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <CardDescription className="text-slate-400 leading-relaxed text-sm">{newsItem.excerpt}</CardDescription>
                  <Button variant="ghost" className="text-blue-400 hover:text-blue-300 mt-4 p-0 h-auto font-normal">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="w-full sm:w-auto bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300 font-semibold min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950">
              <Link href="/nightly/design-c/news" className="flex items-center justify-center space-x-2">
                <span>All News</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}