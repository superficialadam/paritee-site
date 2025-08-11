import { Section } from '@/components/Section'
import { ServicesGrid } from '@/components/ServicesGrid'
import { PullQuote } from '@/components/PullQuote'
import { CtaButtons } from '@/components/CtaButtons'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services - Ultimate UX | Paritee',
  description: 'Comprehensive marketing services from our network of top-tier agencies.',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Services Hero */}
      <section 
        id="services-hero" 
        className="py-16 sm:py-20 lg:py-24 motion-fade-in-up"
        data-section="services"
        aria-labelledby="services-hero-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            id="services-hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 motion-text-reveal"
          >
            Comprehensive Marketing Services
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto motion-text-reveal">
            From strategy to execution, our network of agencies delivers 
            integrated solutions that drive meaningful business results.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <Section
        id="services-grid"
        className="motion-fade-in-up motion-stagger-item"
        data-section="services"
      >
        <ServicesGrid />
      </Section>

      {/* Services Philosophy */}
      <section 
        id="services-philosophy" 
        className="py-16 sm:py-20 lg:py-24 motion-fade-in-up motion-stagger-item"
        data-section="services"
        aria-labelledby="philosophy-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="philosophy-heading" className="sr-only">Our Service Philosophy</h2>
          <PullQuote
            quote="Excellence is not a skill, it's an attitude."
            author="Our Philosophy"
            className="motion-text-reveal"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="services-cta" 
        className="py-16 sm:py-20 lg:py-24 motion-fade-in-up motion-stagger-item"
        data-section="contact"
        aria-labelledby="services-cta-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            id="services-cta-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 motion-text-reveal"
          >
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto motion-text-reveal">
            Let's discuss how our services can help achieve your business objectives.
          </p>
          <div className="motion-text-reveal">
            <CtaButtons />
          </div>
        </div>
      </section>
    </div>
  )
}