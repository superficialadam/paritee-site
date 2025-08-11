'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
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

export default function SynthesisCHomePage() {
  return (
    <div className="space-y-40 synthesis-page-content">
      {/* Hero Section - Enhanced with best features */}
      <section 
        className="px-8 py-32 synthesis-scroll-reveal" 
        data-section="hero"
        id="hero"
      >
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <motion.h1 
            className="text-5xl lg:text-6xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent leading-tight max-w-4xl mx-auto synthesis-text-reveal"
            style={{ '--text-delay': '0ms' } as React.CSSProperties}
          >
            No Compromise. Just Better.
          </motion.h1>
          
          <div className="space-y-8 max-w-3xl mx-auto">
            <motion.p 
              className="text-xl text-slate-200 leading-relaxed font-medium synthesis-text-reveal"
              style={{ '--text-delay': '200ms' } as React.CSSProperties}
            >
              You&apos;ve been asked to make trade-offs for too long.
            </motion.p>
            
            <div className="space-y-6 text-lg text-slate-200 leading-relaxed">
              <motion.p 
                className="synthesis-text-reveal"
                style={{ '--text-delay': '400ms' } as React.CSSProperties}
              >
                Big agencies that go big on overhead but fall short on care.
                Small agencies that bring passion but can&apos;t keep pace.
                You&apos;ve had to choose between speed and scale.
                Bold thinking and trusted delivery.
              </motion.p>
              
              <motion.p 
                className="text-blue-200 font-medium synthesis-text-reveal"
                style={{ '--text-delay': '600ms' } as React.CSSProperties}
              >
                That compromise ends with Paritee.
              </motion.p>
              
              <motion.p 
                className="synthesis-text-reveal"
                style={{ '--text-delay': '800ms' } as React.CSSProperties}
              >
                We are a coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
              </motion.p>
            </div>
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16 synthesis-stagger-item"
            style={{ '--stagger-delay': '1000ms' } as React.CSSProperties}
          >
            <Button asChild className="synthesis-button bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-8 py-4 text-lg transition-all duration-300">
              <Link href="/nightly/synthesis-c/cases">Explore Our Work</Link>
            </Button>
            <Button asChild className="synthesis-button bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-8 py-4 text-lg transition-all duration-300">
              <Link href="/nightly/synthesis-c/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement - Enhanced */}
      <section 
        className="px-8 py-24 synthesis-scroll-reveal" 
        data-section="mission"
        id="mission"
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            className="text-4xl font-semibold text-white mb-12 text-center synthesis-text-reveal"
            style={{ '--text-delay': '0ms' } as React.CSSProperties}
          >
            Our Mission
          </motion.h2>
          
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <motion.p 
              className="text-lg text-slate-300 leading-relaxed synthesis-text-reveal"
              style={{ '--text-delay': '200ms' } as React.CSSProperties}
            >
              We didn&apos;t build Paritee to chase size. We built it to deliver the impact you deserve — with trust, purpose and partnership at the core and most importantly, customized to your needs.
            </motion.p>
            
            <motion.p 
              className="text-lg text-slate-300 leading-relaxed synthesis-text-reveal"
              style={{ '--text-delay': '400ms' } as React.CSSProperties}
            >
              You won&apos;t find hierarchies or holding company politics here.
              You&apos;ll find equals — independent agencies with aligned values, coming together to solve real challenges with sharp thinking and shared ambition.
            </motion.p>
            
            <motion.p 
              className="text-lg text-slate-300 leading-relaxed synthesis-text-reveal"
              style={{ '--text-delay': '600ms' } as React.CSSProperties}
            >
              Our name, <span className="text-blue-200 font-semibold">Paritee</span>, is rooted in the idea of parity.
              It reflects what we believe: Great things happen when equals come together. Each of our agencies is a recognized leader in its market — strong individually, even stronger together. You get seamless delivery, sharper thinking, and results without the baggage of big networks or the limits of small shops.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services - Enhanced with advanced interactions */}
      <section 
        className="px-8 py-24 synthesis-scroll-reveal synthesis-card-grid" 
        data-section="services"
        id="services"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-semibold text-white mb-20 text-center synthesis-text-reveal"
            style={{ '--text-delay': '0ms' } as React.CSSProperties}
          >
            What We Do
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => {
              const IconComponent = Icons[service.icon as keyof typeof Icons] as any
              return (
                <motion.div
                  key={service.id}
                  className="synthesis-stagger-item"
                  style={{ '--stagger-delay': `${index * 100}ms` } as React.CSSProperties}
                >
                  <Card className="synthesis-card h-full group">
                    <CardHeader className="p-8">
                      <div className="w-14 h-14 bg-blue-600/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition-all duration-300">
                        {IconComponent && (
                          <IconComponent className="w-7 h-7 text-blue-400 synthesis-card-icon" />
                        )}
                      </div>
                      <CardTitle className="text-xl font-medium text-white leading-tight">
                        {service.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <CardDescription className="text-slate-400 leading-relaxed text-base">
                        {service.blurb}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
          
          <motion.div 
            className="text-center mt-16 synthesis-stagger-item"
            style={{ '--stagger-delay': `${services.length * 100}ms` } as React.CSSProperties}
          >
            <Button asChild className="synthesis-button bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-8 py-4 transition-all duration-300">
              <Link href="/nightly/synthesis-c/services">View All Services</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Sectors */}
      <section 
        className="px-8 py-24 synthesis-scroll-reveal synthesis-card-grid" 
        data-section="sectors"
        id="sectors"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-semibold text-white mb-20 text-center synthesis-text-reveal"
            style={{ '--text-delay': '0ms' } as React.CSSProperties}
          >
            Industries We Know
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.id}
                className="synthesis-stagger-item"
                style={{ '--stagger-delay': `${index * 100}ms` } as React.CSSProperties}
              >
                <Card className="synthesis-card h-full group">
                  <CardHeader className="p-8">
                    <CardTitle className="text-xl font-medium text-white leading-tight">
                      {sector.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <CardDescription className="text-slate-400 leading-relaxed text-base">
                      {sector.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-16 synthesis-stagger-item"
            style={{ '--stagger-delay': `${sectors.length * 100}ms` } as React.CSSProperties}
          >
            <Button asChild className="synthesis-button bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-8 py-4 transition-all duration-300">
              <Link href="/nightly/synthesis-c/sectors">Explore All Sectors</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Geographies */}
      <section 
        className="px-8 py-24 synthesis-scroll-reveal synthesis-card-grid" 
        data-section="geographies"
        id="geographies"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-semibold text-white mb-20 text-center synthesis-text-reveal"
            style={{ '--text-delay': '0ms' } as React.CSSProperties}
          >
            Our Global Footprint
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {geographies.map((geography, index) => (
              <motion.div
                key={geography.country}
                className="synthesis-stagger-item"
                style={{ '--stagger-delay': `${index * 100}ms` } as React.CSSProperties}
              >
                <Card className="synthesis-card h-full group">
                  <CardHeader className="p-8">
                    <CardTitle className="text-xl font-medium text-white leading-tight">
                      {geography.country}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <div className="flex flex-wrap gap-2">
                      {geography.cities.map((city) => (
                        <span 
                          key={city} 
                          className="px-3 py-1 bg-slate-700 text-slate-200 border-slate-600 text-sm rounded-full transition-colors duration-200 group-hover:bg-blue-600/20 group-hover:text-blue-300"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-16 synthesis-stagger-item"
            style={{ '--stagger-delay': `${geographies.length * 100}ms` } as React.CSSProperties}
          >
            <Button asChild className="synthesis-button bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-8 py-4 transition-all duration-300">
              <Link href="/nightly/synthesis-c/geographies">View All Locations</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Agencies Preview - Enhanced */}
      <section 
        className="px-8 py-24 synthesis-scroll-reveal synthesis-card-grid" 
        data-section="agencies"
        id="agencies"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-semibold text-white mb-20 text-center synthesis-text-reveal"
            style={{ '--text-delay': '0ms' } as React.CSSProperties}
          >
            Our Partner Agencies
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {agencies.slice(0, 4).map((agency, index) => (
              <motion.div
                key={agency.id}
                className="synthesis-stagger-item"
                style={{ '--stagger-delay': `${index * 100}ms` } as React.CSSProperties}
              >
                <Card className="synthesis-card h-full group">
                  <CardHeader className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image 
                          src={agency.logoUrl} 
                          alt={`${agency.name} logo`}
                          fill
                          className="rounded-full object-cover synthesis-image"
                        />
                      </div>
                      <CardTitle className="text-xl font-medium text-white leading-tight">
                        {agency.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <CardDescription className="text-slate-400 leading-relaxed mb-6 text-base">
                      {agency.blurb}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agency.locations.slice(0, 3).map((location) => (
                        <span 
                          key={location} 
                          className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/40 text-xs rounded-full transition-all duration-200 group-hover:bg-blue-600/30 group-hover:border-blue-500/50"
                        >
                          {location}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-16 synthesis-stagger-item"
            style={{ '--stagger-delay': `${4 * 100}ms` } as React.CSSProperties}
          >
            <Button asChild className="synthesis-button bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-8 py-4 transition-all duration-300">
              <Link href="/nightly/synthesis-c/agencies">Meet All Agencies</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Cases Preview - Enhanced */}
      <section 
        className="px-8 py-24 synthesis-scroll-reveal synthesis-card-grid" 
        data-section="cases"
        id="cases"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-semibold text-white mb-20 text-center synthesis-text-reveal"
            style={{ '--text-delay': '0ms' } as React.CSSProperties}
          >
            Our Best Work
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cases.slice(0, 6).map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                className="synthesis-stagger-item"
                style={{ '--stagger-delay': `${index * 100}ms` } as React.CSSProperties}
              >
                <Card className="synthesis-card h-full group overflow-hidden">
                  <div className="aspect-video relative">
                    <Image 
                      src={caseItem.thumbnail} 
                      alt={caseItem.name}
                      fill
                      className="object-cover synthesis-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardHeader className="p-8">
                    <CardTitle className="text-lg font-medium text-white leading-tight">
                      {caseItem.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <CardDescription className="text-slate-400 leading-relaxed text-base">
                      {caseItem.excerpt}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-16 synthesis-stagger-item"
            style={{ '--stagger-delay': `${6 * 100}ms` } as React.CSSProperties}
          >
            <Button asChild className="synthesis-button bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-8 py-4 transition-all duration-300">
              <Link href="/nightly/synthesis-c/cases">View All Cases</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Team Preview - Enhanced */}
      <section 
        className="px-8 py-24 synthesis-scroll-reveal synthesis-card-grid" 
        data-section="team"
        id="team"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-semibold text-white mb-20 text-center synthesis-text-reveal"
            style={{ '--text-delay': '0ms' } as React.CSSProperties}
          >
            Meet the People
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {people.slice(0, 8).map((person, index) => (
              <motion.div
                key={person.id}
                className="synthesis-stagger-item"
                style={{ '--stagger-delay': `${index * 100}ms` } as React.CSSProperties}
              >
                <Card className="synthesis-card h-full text-center group">
                  <CardHeader className="p-8">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <Image 
                        src={person.avatarUrl} 
                        alt={person.name}
                        fill
                        className="rounded-full object-cover synthesis-image"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardTitle className="text-lg font-medium text-white leading-tight">
                      {person.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <CardDescription className="text-slate-400 text-base mb-2">
                      {person.role}
                    </CardDescription>
                    <CardDescription className="text-slate-500 text-sm">
                      {person.location}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-16 synthesis-stagger-item"
            style={{ '--stagger-delay': `${8 * 100}ms` } as React.CSSProperties}
          >
            <Button asChild className="synthesis-button bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-8 py-4 transition-all duration-300">
              <Link href="/nightly/synthesis-c/team">Meet Everyone</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* News Preview - Enhanced */}
      <section 
        className="px-8 py-24 synthesis-scroll-reveal synthesis-card-grid" 
        data-section="news"
        id="news"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-semibold text-white mb-20 text-center synthesis-text-reveal"
            style={{ '--text-delay': '0ms' } as React.CSSProperties}
          >
            Latest News & Insights
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {news.slice(0, 3).map((newsItem, index) => (
              <motion.div
                key={newsItem.id}
                className="synthesis-stagger-item"
                style={{ '--stagger-delay': `${index * 100}ms` } as React.CSSProperties}
              >
                <Card className="synthesis-card h-full group overflow-hidden">
                  <div className="aspect-video relative">
                    <Image 
                      src={newsItem.image} 
                      alt={newsItem.title}
                      fill
                      className="object-cover synthesis-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardHeader className="p-8">
                    <CardDescription className="text-slate-500 text-sm mb-4">
                      {new Date(newsItem.dateISO).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </CardDescription>
                    <CardTitle className="text-lg font-medium text-white leading-tight">
                      {newsItem.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <CardDescription className="text-slate-400 leading-relaxed text-base mb-4">
                      {newsItem.excerpt}
                    </CardDescription>
                    <Button 
                      variant="ghost" 
                      className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal group-hover:translate-x-1 transition-transform duration-200"
                    >
                      Read More →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-16 synthesis-stagger-item"
            style={{ '--stagger-delay': `${3 * 100}ms` } as React.CSSProperties}
          >
            <Button asChild className="synthesis-button bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-8 py-4 transition-all duration-300">
              <Link href="/nightly/synthesis-c/news">All News & Insights</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}