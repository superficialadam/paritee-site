import { services } from '@/data/services'
import SectionV3B from './SectionV3B'

export default function ServicesV3B() {
  return (
    <SectionV3B
      id="services"
      eyebrow="What We Do"
      title="Services"
      intro="From strategic planning to creative execution, we cover every aspect of modern marketing."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="minimal-hover">
            <div className="p-8 border border-white/20 hover:border-white/40 transition-colors duration-300 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-light font-heading text-white mb-4">
                {service.name}
              </h3>
              <p className="text-white/70 leading-relaxed text-sm">
                {service.blurb}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionV3B>
  )
}