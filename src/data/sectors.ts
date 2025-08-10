export interface Sector {
  id: string
  name: string
  description: string
}

export const sectors: Sector[] = [
  {
    id: 'automotive',
    name: 'Automotive',
    description: 'Leading automotive brands and mobility solutions'
  },
  {
    id: 'finance',
    name: 'Financial Services',
    description: 'Banking, insurance, and fintech innovation'
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Software, hardware, and digital platforms'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Pharmaceuticals, medical devices, and wellness'
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    description: 'Consumer brands and omnichannel experiences'
  },
  {
    id: 'media',
    name: 'Media & Entertainment',
    description: 'Content, streaming, and entertainment platforms'
  }
]