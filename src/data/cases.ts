export interface Case {
  id: string
  name: string
  thumbnail: string
  sectorId: string
  serviceId: string
  agencyId: string
  excerpt: string
}

export const cases: Case[] = [
  {
    id: 'electric-future',
    name: 'Electric Future Campaign',
    thumbnail: '/images/hero/image-0-92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg',
    sectorId: 'automotive',
    serviceId: 'creative',
    agencyId: 'creative-collective',
    excerpt: 'A groundbreaking campaign that redefined electric vehicle perception and drove 300% increase in test drives.'
  },
  {
    id: 'fintech-revolution',
    name: 'FinTech Revolution',
    thumbnail: '/images/hero/image-1-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp',
    sectorId: 'finance',
    serviceId: 'digital',
    agencyId: 'digital-dynamics',
    excerpt: 'Digital transformation strategy that launched a challenger bank to market leadership in 18 months.'
  },
  {
    id: 'wellness-reimagined',
    name: 'Wellness Reimagined',
    thumbnail: '/images/agencies/image-2-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp',
    sectorId: 'healthcare',
    serviceId: 'strategy',
    agencyId: 'strategic-solutions',
    excerpt: 'Strategic repositioning of a healthcare brand that increased market share by 45% in competitive landscape.'
  },
  {
    id: 'retail-renaissance',
    name: 'Retail Renaissance',
    thumbnail: '/images/agencies/image-5-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp',
    sectorId: 'retail',
    serviceId: 'media',
    agencyId: 'media-masters',
    excerpt: 'Omnichannel media strategy that revitalized a legacy retail brand for digital-first consumers.'
  },
  {
    id: 'tech-titan-launch',
    name: 'Tech Titan Launch',
    thumbnail: '/images/agencies/image-6-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp',
    sectorId: 'technology',
    serviceId: 'pr',
    agencyId: 'creative-collective',
    excerpt: 'Global PR campaign that positioned a startup as industry leader before product launch.'
  },
  {
    id: 'streaming-success',
    name: 'Streaming Success Story',
    thumbnail: '/images/image-3-597932_2b0789f37f944ffc9db9983dcdde23e5~mv2.webp',
    sectorId: 'media',
    serviceId: 'data',
    agencyId: 'digital-dynamics',
    excerpt: 'Data-driven content strategy that tripled subscriber growth for emerging streaming platform.'
  }
]