'use client'

import { motion } from 'framer-motion'
import TestimonialCarouselV4 from './TestimonialCarouselV4'

const testimonials = [
  {
    quote: "Paritee transformed our approach to creative partnerships. The network quality and strategic matching exceeded all expectations.",
    author: "Sarah Chen",
    company: "GlobalTech Industries"
  },
  {
    quote: "Working with Paritee's curated network gave us access to world-class creative talent that we couldn't have found otherwise.",
    author: "Marcus Rodriguez",
    company: "Horizon Ventures"
  },
  {
    quote: "The strategic alignment and collaborative approach made all the difference. Our campaigns achieved unprecedented results.",
    author: "Emma Thompson",
    company: "Future Brands"
  }
]

const MissionV4 = () => {
  return (
    <section className="py-32 section-light">
      <div className="container mx-auto max-w-6xl px-8">
        <div className="text-center mb-20">
          <motion.div 
            className="text-caption text-gold uppercase tracking-wider mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Mission
          </motion.div>
          
          <motion.h2 
            className="text-hero text-cream mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Redefining Creative Collaboration
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-body-large text-warm-gray leading-relaxed mb-8">
              In an era where creative excellence determines market success, we believe 
              that the right partnerships can transform possibilities into realities. 
              Our platform connects visionary brands with exceptional creative talent 
              through strategic matching and collaborative frameworks.
            </p>
            
            <p className="text-body text-warm-gray leading-relaxed mb-8">
              We curate networks of specialist agencies, independent creators, and 
              strategic partners who share our commitment to pushing creative boundaries. 
              Every connection we facilitate is designed to create sustainable value 
              and lasting impact.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-heading text-sage font-light mb-2">500+</div>
                <div className="text-caption text-gold uppercase tracking-wider">
                  Creative Partners
                </div>
              </div>
              <div>
                <div className="text-heading text-sage font-light mb-2">50+</div>
                <div className="text-caption text-gold uppercase tracking-wider">
                  Global Markets
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-cream/10 to-sage/5 p-12 border border-cream/10"
          >
            <h3 className="text-subheading text-cream mb-8">Our Values</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-body font-medium text-sage mb-2">Excellence</h4>
                <p className="text-body text-warm-gray leading-relaxed">
                  We maintain the highest standards in every partnership we facilitate.
                </p>
              </div>
              <div>
                <h4 className="text-body font-medium text-sage mb-2">Innovation</h4>
                <p className="text-body text-warm-gray leading-relaxed">
                  Pushing creative boundaries through strategic collaboration.
                </p>
              </div>
              <div>
                <h4 className="text-body font-medium text-sage mb-2">Integrity</h4>
                <p className="text-body text-warm-gray leading-relaxed">
                  Building trust through transparent and ethical practices.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <TestimonialCarouselV4 testimonials={testimonials} />
        </motion.div>
      </div>
    </section>
  )
}

export default MissionV4