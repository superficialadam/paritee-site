import { cases } from '@/data/cases'

// All available images from paritee.com
const allImages = [
  {
    "filename": "image-0-92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg",
    "originalSrc": "https://static.wixstatic.com/media/92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg/v1/fill/w_980,h_600,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg",
    "alt": "image-0",
    "width": 980,
    "height": 600,
    "publicPath": "/images/hero/image-0-92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg"
  },
  {
    "filename": "image-1-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp",
    "originalSrc": "https://static.wixstatic.com/media/034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp/v1/fill/w_571,h_250,al_c,q_30,blur_30,enc_avif,quality_auto/034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp",
    "alt": "Geelmuyden Kiese Executives Appointed as Partners in Paritee",
    "width": 571,
    "height": 250,
    "publicPath": "/images/hero/image-1-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp"
  },
  {
    "filename": "image-2-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp",
    "originalSrc": "https://static.wixstatic.com/media/034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp/v1/fill/w_980,h_429,al_c,q_90,enc_avif,quality_auto/034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp",
    "alt": "Geelmuyden Kiese Executives Appointed as Partners in Paritee",
    "width": 980,
    "height": 429,
    "publicPath": "/images/agencies/image-2-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp"
  },
  {
    "filename": "image-5-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp",
    "originalSrc": "https://static.wixstatic.com/media/597932_9e81a19c2ae04035ba9db20f378a7999~mv2.jpg/v1/fill/w_571,h_250,fp_0.50_0.50,q_30,blur_30,enc_avif,quality_auto/597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp",
    "alt": "Paritee appoints two partners from Geelmuyden Kiese Group",
    "width": 571,
    "height": 250,
    "publicPath": "/images/agencies/image-5-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp"
  },
  {
    "filename": "image-6-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp",
    "originalSrc": "https://static.wixstatic.com/media/597932_9e81a19c2ae04035ba9db20f378a7999~mv2.jpg/v1/fill/w_980,h_429,fp_0.50_0.50,q_90,enc_avif,quality_auto/597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp",
    "alt": "Paritee appoints two partners from Geelmuyden Kiese Group",
    "width": 980,
    "height": 429,
    "publicPath": "/images/agencies/image-6-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp"
  },
  {
    "filename": "image-3-597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.webp",
    "originalSrc": "https://static.wixstatic.com/media/597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.jpg/v1/fill/w_571,h_250,fp_0.50_0.50,q_30,blur_30,enc_avif,quality_auto/597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.webp",
    "alt": "Paritee Secures Strategic €41 Million Growth Investment",
    "width": 571,
    "height": 250,
    "publicPath": "/images/image-3-597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.webp"
  },
  {
    "filename": "image-4-597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.webp",
    "originalSrc": "https://static.wixstatic.com/media/597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.jpg/v1/fill/w_980,h_429,fp_0.50_0.50,q_90,enc_avif,quality_auto/597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.webp",
    "alt": "Paritee Secures Strategic €41 Million Growth Investment",
    "width": 980,
    "height": 429,
    "publicPath": "/images/image-4-597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.webp"
  },
  {
    "filename": "image-7-92a8f3_4760eb49c9e0457b8840d04ef878c4a8f000.jpg",
    "originalSrc": "https://static.wixstatic.com/media/92a8f3_4760eb49c9e0457b8840d04ef878c4a8f000.jpg/v1/fill/w_980,h_517,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/92a8f3_4760eb49c9e0457b8840d04ef878c4a8f000.jpg",
    "alt": "image-8",
    "width": 980,
    "height": 517,
    "publicPath": "/images/image-7-92a8f3_4760eb49c9e0457b8840d04ef878c4a8f000.jpg"
  }
];
import { sectors } from '@/data/sectors'
import { services } from '@/data/services'
import SectionV3 from './SectionV3'

export default function CasesV3() {
  const getSectorName = (sectorId: string) => {
    return sectors.find(s => s.id === sectorId)?.name || sectorId
  }

  const getServiceName = (serviceId: string) => {
    return services.find(s => s.id === serviceId)?.name || serviceId
  }

  return (
    <SectionV3
      id="cases"
      eyebrow="Our Work"
      title="Case Studies"
      intro="Real results for real brands. Explore our most impactful campaigns and the strategies behind their success."
    >
      {/* CSS Masonry Layout */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {cases.map((caseStudy, index) => {
          // Vary heights for masonry effect
          const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-60', 'h-88']
          const height = heights[index % heights.length]
          
          return (
            <div 
              key={caseStudy.id} 
              className="break-inside-avoid mb-8 minimal-hover cursor-pointer"
            >
              <div className="bg-gray-50 border border-gray-200 hover:border-black transition-colors duration-300">
                {/* Actual image */}
                <div className={`${height} bg-gray-100 relative overflow-hidden`}>
                  <img 
                    src={allImages[(index % 8)].publicPath} 
                    alt={allImages[(index % 8)].alt || `Case study ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs px-2 py-1 bg-white text-black font-medium">
                      {getSectorName(caseStudy.sectorId)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-light font-heading text-black mb-3 leading-tight">
                    {caseStudy.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {caseStudy.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{getServiceName(caseStudy.serviceId)}</span>
                    <span className="hover:text-black transition-colors">
                      Read Case →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </SectionV3>
  )
}