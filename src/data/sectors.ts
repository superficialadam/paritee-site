export interface Sector {
  id: string
  name: string
  description: string
}

export const sectors: Sector[] = [
  {
    id: 'energy',
    name: 'Energy',
    description: 'Renewable energy, utilities, and sustainable infrastructure solutions'
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Banking, insurance, fintech, and capital markets expertise'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Pharmaceuticals, medical devices, healthcare systems, and wellness'
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    description: 'Transport, utilities, smart cities, and urban development'
  },
  {
    id: 'public-sector',
    name: 'Public Sector',
    description: 'Government relations, public policy, and civic engagement'
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Software, hardware, digital platforms, and emerging tech'
  }
]