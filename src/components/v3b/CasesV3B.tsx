import { cases } from '@/data/cases'
import { sectors } from '@/data/sectors'
import { services } from '@/data/services'
import SectionV3B from './SectionV3B'

const allImages = [
  "/images/hero/image-0-92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg",
  "/images/hero/image-1-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp",
  "/images/agencies/image-2-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp",
  "/images/agencies/image-5-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp",
  "/images/agencies/image-6-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp",
  "/images/image-3-597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.webp",
  "/images/image-4-597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.webp",
  "/images/image-7-92a8f3_4760eb49c9e0457b8840d04ef878c4a8f000.jpg"
]

export default function CasesV3B() {
  const getSectorName = (sectorId: string) => {
    return sectors.find(s => s.id === sectorId)?.name || sectorId
  }

  const getServiceName = (serviceId: string) => {
    return services.find(s => s.id === serviceId)?.name || serviceId
  }

  return (
    <SectionV3B
      id="cases"
      eyebrow="Our Work"
      title="Case Studies"
      intro="Real results for real brands. Explore our most impactful campaigns and the strategies behind their success."
    >
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {cases.map((caseStudy, index) => {
          const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-60', 'h-88']
          const height = heights[index % heights.length]
          
          return (
            <div 
              key={caseStudy.id} 
              className="break-inside-avoid mb-8 minimal-hover cursor-pointer"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-colors duration-300">
                <div className={`${height} bg-white/10 relative overflow-hidden`}>
                  <img 
                    src={allImages[(index % 8)]} 
                    alt={`Case study ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs px-2 py-1 bg-white/90 text-black font-medium">
                      {getSectorName(caseStudy.sectorId)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-light font-heading text-white mb-3 leading-tight">
                    {caseStudy.name}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-4">
                    {caseStudy.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-xs text-white/40">
                    <span>{getServiceName(caseStudy.serviceId)}</span>
                    <span className="hover:text-white transition-colors">
                      Read Case →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </SectionV3B>
  )
}