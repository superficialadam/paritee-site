import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { services } from '@/data/services'
import { agencies } from '@/data/agencies'
import { cases } from '@/data/cases'
import { news } from '@/data/news'
import { ArrowRight, ExternalLink, Target, Palette, Users, BarChart, Radio, Megaphone } from 'lucide-react'

const iconMap: { [key: string]: any } = {
  Target,
  Palette,
  Users,
  BarChart,
  Radio,
  Megaphone
}

export default function SynthesisBHome() {
  return (
    <div className="space-y-32">
      {/* Hero Section with UX Excellence */}
      <section className="px-8 py-32">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h1 className="text-6xl font-semibold bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent leading-tight">
            No Compromise. Just Better.
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto">
            You've been asked to make trade-offs for too long. Big agencies that go big on overhead but fall short on care. 
            Small agencies that bring passion but can't keep pace. That compromise ends with Paritee.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-8 py-3 transition-all duration-300">
              Explore Our Work
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-8 py-3 transition-all duration-300">
              Get in Touch
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-16">
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">12+</div>
              <div className="text-slate-400 text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">6</div>
              <div className="text-slate-400 text-sm">Partner Agencies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">200+</div>
              <div className="text-slate-400 text-sm">Successful Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-8 py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="text-sm uppercase tracking-wider text-blue-400 font-medium">Our Mission</div>
          <h2 className="text-3xl font-semibold text-white leading-tight">
            Built for Excellence
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            We didn't build Paritee to chase size. We built it to deliver the impact you deserve — with trust, 
            purpose and partnership at the core and most importantly, customized to your needs.
          </p>
          <blockquote className="text-2xl font-medium text-white border-l-4 border-blue-600 pl-6 italic">
            "Great things happen when equals come together."
          </blockquote>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm uppercase tracking-wider text-blue-400 font-medium mb-4">What We Do</div>
            <h2 className="text-3xl font-semibold text-white leading-tight mb-6">Services</h2>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Comprehensive solutions across strategy, creative, and digital domains.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || Target
              return (
                <Card key={service.id} className="bg-slate-800/40 border border-slate-700/50 rounded-none p-8 hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60">
                  <CardHeader className="space-y-4 p-0 mb-6">
                    <div className="w-14 h-14 bg-blue-600/20 rounded-full flex items-center justify-center">
                      <IconComponent className="w-7 h-7 text-blue-400" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-white leading-tight">
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-slate-400 leading-relaxed">
                      {service.blurb}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm uppercase tracking-wider text-blue-400 font-medium mb-4">Our Impact</div>
            <h2 className="text-3xl font-semibold text-white leading-tight mb-6">Featured Work</h2>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Results that matter, delivered with precision and care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.slice(0, 6).map((caseItem) => (
              <Card key={caseItem.id} className="bg-slate-800/40 border border-slate-700/50 rounded-none overflow-hidden hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60">
                {caseItem.image && (
                  <div className="relative h-48 bg-slate-700">
                    <Image 
                      src={caseItem.image} 
                      alt={caseItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-blue-600/20 text-blue-400 border border-blue-600/40 text-xs">
                      {caseItem.sector}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
                    {caseItem.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {caseItem.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/nightly/synthesis-b/cases">
              <Button className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-8 py-3 transition-all duration-300">
                View All Cases
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-8 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-semibold text-white leading-tight">
            Ready to elevate your brand?
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Let's discuss how our network of specialized agencies can deliver the results you deserve.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/nightly/synthesis-b/contact">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-8 py-3 transition-all duration-300">
                Start a Conversation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/nightly/synthesis-b/cases">
              <Button className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-8 py-3 transition-all duration-300">
                Explore Our Work
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}