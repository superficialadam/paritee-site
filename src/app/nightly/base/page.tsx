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

export default function HomePage() {
  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-semibold text-white leading-tight max-w-4xl mx-auto">
            No Compromise. Just Better.
          </h1>
          <div className="space-y-6 max-w-3xl mx-auto">
            <p className="text-lg text-slate-200 leading-relaxed">
              You&apos;ve been asked to make trade-offs for too long.
            </p>
            <p className="text-lg text-slate-200 leading-relaxed">
              Big agencies that go big on overhead but fall short on care.
              Small agencies that bring passion but can&apos;t keep pace.
              You&apos;ve had to choose between speed and scale.
              Bold thinking and trusted delivery.
            </p>
            <p className="text-lg text-slate-200 leading-relaxed">
              That compromise ends with Paritee.
            </p>
            <p className="text-lg text-slate-200 leading-relaxed">
              We are a coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/base/cases">Explore Our Work</Link>
            </Button>
            <Button asChild className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/base/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-8 text-center">Our Mission</h2>
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <p className="text-base text-slate-300 leading-relaxed">
              We didn&apos;t build Paritee to chase size. We built it to deliver the impact you deserve — with trust, purpose and partnership at the core and most importantly, customized to your needs.
            </p>
            <p className="text-base text-slate-300 leading-relaxed">
              You won&apos;t find hierarchies or holding company politics here.
              You&apos;ll find equals — independent agencies with aligned values, coming together to solve real challenges with sharp thinking and shared ambition.
            </p>
            <p className="text-base text-slate-300 leading-relaxed">
              Our name, Paritee, is rooted in the idea of parity.
              It reflects what we believe: Great things happen when equals come together. Each of our agencies is a recognized leader in its market — strong individually, even stronger together. You get seamless delivery, sharper thinking, and results without the baggage of big networks or the limits of small shops.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = Icons[service.icon as keyof typeof Icons] as any
              return (
                <Card key={service.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60">
                  <CardHeader className="p-6">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-all duration-300">
                      {IconComponent && <IconComponent className="w-6 h-6 text-blue-400" />}
                    </div>
                    <CardTitle className="text-xl font-medium text-white">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <CardDescription className="text-slate-400 leading-relaxed">{service.blurb}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/base/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">Industries We Know</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector) => (
              <Card key={sector.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-medium text-white">{sector.name}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <CardDescription className="text-slate-400 leading-relaxed">{sector.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/base/sectors">Explore All Sectors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Geographies */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">Our Footprint</h2>
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
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/base/geographies">View All Locations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Agencies Preview */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">Our Agencies</h2>
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
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/base/agencies">Meet All Agencies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cases Preview */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">Our Work</h2>
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
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/base/cases">View All Cases</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">Meet the People</h2>
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
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/base/team">Meet Everyone</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">Latest News</h2>
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
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/base/news">All News</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}