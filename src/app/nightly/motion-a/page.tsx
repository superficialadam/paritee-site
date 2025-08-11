'use client'

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
import { motion } from 'framer-motion'

// Animation variants for sophisticated staggered reveals
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    filter: "blur(4px)" 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const heroVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
}

export default function HomePage() {
  return (
    <div className="space-y-40">
      {/* Hero Section */}
      <motion.section 
        className="px-8 py-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <motion.h1 
            className="text-5xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent leading-tight max-w-4xl mx-auto motion-reduce:transition-none"
            variants={heroVariants}
          >
            No Compromise. Just Better.
          </motion.h1>
          <motion.div 
            className="space-y-8 max-w-3xl mx-auto"
            variants={containerVariants}
          >
            <motion.p 
              className="text-xl text-slate-200 leading-relaxed font-medium motion-reduce:transition-none"
              variants={itemVariants}
            >
              You&apos;ve been asked to make trade-offs for too long.
            </motion.p>
            <motion.p 
              className="text-lg text-slate-200 leading-relaxed motion-reduce:transition-none"
              variants={itemVariants}
            >
              Big agencies that go big on overhead but fall short on care.
              Small agencies that bring passion but can&apos;t keep pace.
              You&apos;ve had to choose between speed and scale.
              Bold thinking and trusted delivery.
            </motion.p>
            <motion.p 
              className="text-lg text-slate-200 leading-relaxed motion-reduce:transition-none"
              variants={itemVariants}
            >
              That compromise ends with Paritee.
            </motion.p>
            <motion.p 
              className="text-lg text-slate-200 leading-relaxed motion-reduce:transition-none"
              variants={itemVariants}
            >
              We are a coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
            </motion.p>
          </motion.div>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16"
            variants={itemVariants}
          >
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 motion-reduce:hover:scale-100 transform-gpu">
              <Link href="/nightly/motion-a/cases">Explore Our Work</Link>
            </Button>
            <Button asChild className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 motion-reduce:hover:scale-100 transform-gpu">
              <Link href="/nightly/motion-a/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Statement */}
      <motion.section 
        className="px-8 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            className="text-4xl font-semibold text-white mb-12 text-center motion-reduce:transition-none"
            variants={itemVariants}
          >
            Our Mission
          </motion.h2>
          <motion.div 
            className="max-w-4xl mx-auto space-y-8 text-center"
            variants={containerVariants}
          >
            <motion.p 
              className="text-lg text-slate-300 leading-relaxed motion-reduce:transition-none"
              variants={itemVariants}
            >
              We didn&apos;t build Paritee to chase size. We built it to deliver the impact you deserve — with trust, purpose and partnership at the core and most importantly, customized to your needs.
            </motion.p>
            <motion.p 
              className="text-lg text-slate-300 leading-relaxed motion-reduce:transition-none"
              variants={itemVariants}
            >
              You won&apos;t find hierarchies or holding company politics here.
              You&apos;ll find equals — independent agencies with aligned values, coming together to solve real challenges with sharp thinking and shared ambition.
            </motion.p>
            <motion.p 
              className="text-lg text-slate-300 leading-relaxed motion-reduce:transition-none"
              variants={itemVariants}
            >
              Our name, Paritee, is rooted in the idea of parity.
              It reflects what we believe: Great things happen when equals come together. Each of our agencies is a recognized leader in its market — strong individually, even stronger together. You get seamless delivery, sharper thinking, and results without the baggage of big networks or the limits of small shops.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Services */}
      <motion.section 
        className="px-8 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-semibold text-white mb-20 text-center motion-reduce:transition-none"
            variants={itemVariants}
          >
            What We Do
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={containerVariants}
          >
            {services.map((service, index) => {
              const IconComponent = Icons[service.icon as keyof typeof Icons] as any
              return (
                <motion.div key={service.id} variants={itemVariants}>
                  <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 hover:-translate-y-1 motion-reduce:hover:-translate-y-0 hover:scale-102 motion-reduce:hover:scale-100 transform-gpu">
                    <CardHeader className="p-8">
                      <div className="w-14 h-14 bg-blue-600/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600/30 group-hover:scale-110 transition-all duration-300 transform-gpu">
                        {IconComponent && <IconComponent className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />}
                      </div>
                      <CardTitle className="text-xl font-medium text-white leading-tight group-hover:text-blue-100 transition-colors duration-300">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <CardDescription className="text-slate-400 leading-relaxed text-base group-hover:text-slate-300 transition-colors duration-300">{service.blurb}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
          <motion.div 
            className="text-center mt-16"
            variants={itemVariants}
          >
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 motion-reduce:hover:scale-100 transform-gpu">
              <Link href="/nightly/motion-a/services">View All Services</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Sectors */}
      <section className="px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-white mb-20 text-center">Industries We Know</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sectors.map((sector) => (
              <Card key={sector.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60">
                <CardHeader className="p-8">
                  <CardTitle className="text-xl font-medium text-white leading-tight">{sector.name}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <CardDescription className="text-slate-400 leading-relaxed text-base">{sector.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-16">
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/motion-a/sectors">Explore All Sectors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Geographies */}
      <section className="px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-white mb-20 text-center">Our Footprint</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {geographies.map((geography) => (
              <Card key={geography.country} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60">
                <CardHeader className="p-8">
                  <CardTitle className="text-xl font-medium text-white leading-tight">{geography.country}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
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
          <div className="text-center mt-16">
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/motion-a/geographies">View All Locations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Agencies Preview */}
      <section className="px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-white mb-20 text-center">Our Agencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {agencies.slice(0, 4).map((agency) => (
              <Card key={agency.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60">
                <CardHeader className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <Image 
                      src={agency.logoUrl} 
                      alt={`${agency.name} logo`}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                    <CardTitle className="text-xl font-medium text-white leading-tight">{agency.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <CardDescription className="text-slate-400 leading-relaxed mb-6 text-base">{agency.blurb}</CardDescription>
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
          <div className="text-center mt-16">
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/motion-a/agencies">Meet All Agencies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cases Preview */}
      <motion.section 
        className="px-8 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-semibold text-white mb-20 text-center motion-reduce:transition-none"
            variants={itemVariants}
          >
            Our Work
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={containerVariants}
          >
            {cases.slice(0, 6).map((caseItem, index) => (
              <motion.div key={caseItem.id} variants={itemVariants}>
                <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 overflow-hidden hover:-translate-y-1 motion-reduce:hover:-translate-y-0 hover:scale-102 motion-reduce:hover:scale-100 transform-gpu">
                  <div className="aspect-video relative overflow-hidden">
                    <Image 
                      src={caseItem.thumbnail} 
                      alt={caseItem.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardHeader className="p-8">
                    <CardTitle className="text-lg font-medium text-white leading-tight group-hover:text-blue-100 transition-colors duration-300">{caseItem.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <CardDescription className="text-slate-400 leading-relaxed text-base group-hover:text-slate-300 transition-colors duration-300">{caseItem.excerpt}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="text-center mt-16"
            variants={itemVariants}
          >
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 motion-reduce:hover:scale-100 transform-gpu">
              <Link href="/nightly/motion-a/cases">View All Cases</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Preview */}
      <section className="px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-white mb-20 text-center">Meet the People</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {people.slice(0, 8).map((person) => (
              <Card key={person.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 text-center">
                <CardHeader className="p-8">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <Image 
                      src={person.avatarUrl} 
                      alt={person.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg font-medium text-white leading-tight">{person.name}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <CardDescription className="text-slate-400 text-base mb-2">{person.role}</CardDescription>
                  <CardDescription className="text-slate-500 text-sm">{person.location}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-16">
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/motion-a/team">Meet Everyone</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-white mb-20 text-center">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                <CardHeader className="p-8">
                  <CardDescription className="text-slate-500 text-sm mb-4">
                    {new Date(newsItem.dateISO).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardDescription>
                  <CardTitle className="text-lg font-medium text-white leading-tight">{newsItem.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <CardDescription className="text-slate-400 leading-relaxed text-base">{newsItem.excerpt}</CardDescription>
                  <Button variant="ghost" className="text-blue-400 hover:text-blue-300 mt-4 p-0 h-auto font-normal">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-16">
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/motion-a/news">All News</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}