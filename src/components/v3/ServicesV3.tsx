import { services } from '@/data/services'
import SectionV3 from './SectionV3'

export default function ServicesV3() {
  return (
    <SectionV3
      id="services"
      eyebrow="What We Do"
      title="Services"
      intro="From strategic planning to creative execution, we cover every aspect of modern marketing."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="minimal-hover">
            <div className="p-8 border border-gray-200 hover:border-black transition-colors duration-300">
              <h3 className="text-xl font-light font-heading text-black mb-4">
                {service.name}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {service.blurb}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionV3>
  )
}