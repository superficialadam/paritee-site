'use client'

import { motion } from 'framer-motion'
import Section from './Section'

export default function MissionBlock() {
  return (
    <Section
      id="mission"
      title="Our Mission"
      className="bg-gray-50"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-lg text-gray-700">
            We didn't build Paritee to chase size. We built it to deliver the impact you deserve — with trust, purpose and partnership at the core and most importantly, customized to your needs.
          </p>
          <p className="text-lg text-gray-700">
            You won't find hierarchies or holding company politics here.
          </p>
          <p className="text-lg text-gray-700">
            You'll find equals — independent agencies with aligned values, coming together to solve real challenges with sharp thinking and shared ambition.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-lg text-gray-700">
            Our name, Paritee, is rooted in the idea of parity.
          </p>
          <p className="text-lg text-gray-700">
            It reflects what we believe: Great things happen when equals come together. Each of our agencies is a recognized leader in its market — strong individually, even stronger together.
          </p>
          <p className="text-lg text-gray-700 font-semibold">
            You get seamless delivery, sharper thinking, and results without the baggage of big networks or the limits of small shops.
          </p>
        </motion.div>
      </div>
    </Section>
  )
}