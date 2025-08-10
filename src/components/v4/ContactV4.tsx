'use client'

import { motion } from 'framer-motion'
import ButtonV4 from './ButtonV4'
import LinkV4 from './LinkV4'

const ContactV4 = () => {
  return (
    <section id="contact" className="py-32 section-emphasis">
      <div className="container mx-auto max-w-4xl px-8">
        <div className="text-center mb-16">
          <motion.div 
            className="text-caption text-gold uppercase tracking-wider mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Get Started
          </motion.div>
          
          <motion.h2 
            className="text-hero text-cream mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Let's Create Together
          </motion.h2>
          
          <motion.p 
            className="text-body-large text-warm-gray leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to transform your creative vision into reality? Connect with our 
            team to explore strategic partnerships tailored to your unique needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-subheading text-cream mb-4">Start a Conversation</h3>
              <p className="text-body text-warm-gray leading-relaxed mb-6">
                Whether you're looking to expand your creative capabilities or join our 
                network of partners, we're here to help you succeed.
              </p>
              <ButtonV4 variant="primary" size="large" href="mailto:hello@paritee.com">
                Get in Touch
              </ButtonV4>
            </div>
            
            <div className="pt-8 border-t border-cream/10">
              <h4 className="text-body font-medium text-sage mb-4">Direct Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-gold">Email:</span>
                  <LinkV4 href="mailto:hello@paritee.com" variant="emphasis" showArrow={false}>
                    hello@paritee.com
                  </LinkV4>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gold">Phone:</span>
                  <LinkV4 href="tel:+1555123456" variant="emphasis" showArrow={false}>
                    +1 (555) 123-4567
                  </LinkV4>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-b from-cream/10 to-sage/5 p-8 border border-cream/10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-subheading text-cream mb-6">Partnership Opportunities</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-sage mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-body font-medium text-sage mb-1">For Brands</h4>
                  <p className="text-body text-warm-gray">
                    Access our curated network of creative specialists
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-sage mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-body font-medium text-sage mb-1">For Agencies</h4>
                  <p className="text-body text-warm-gray">
                    Join our network and expand your client opportunities
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-sage mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-body font-medium text-sage mb-1">For Freelancers</h4>
                  <p className="text-body text-warm-gray">
                    Connect with strategic projects and long-term partnerships
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-cream/10">
              <ButtonV4 variant="secondary" size="medium" href="#services">
                Learn More
              </ButtonV4>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-caption text-warm-gray mb-4">
            Follow our journey
          </div>
          <div className="flex justify-center space-x-8">
            <LinkV4 href="#" variant="subtle" showArrow={false}>LinkedIn</LinkV4>
            <LinkV4 href="#" variant="subtle" showArrow={false}>Twitter</LinkV4>
            <LinkV4 href="#" variant="subtle" showArrow={false}>Instagram</LinkV4>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactV4