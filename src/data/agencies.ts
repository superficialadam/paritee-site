export interface Agency {
  id: string
  name: string
  logoUrl: string
  blurb: string
  locations: string[]
  sectors: string[]
}

export const agencies: Agency[] = [
  {
    id: 'creative-collective',
    name: 'Creative Collective',
    logoUrl: '/images/agencies/image-2-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp',
    blurb: 'Award-winning creative agency specializing in brand storytelling and innovative campaigns.',
    locations: ['New York', 'Los Angeles', 'London'],
    sectors: ['automotive', 'technology', 'retail']
  },
  {
    id: 'digital-dynamics',
    name: 'Digital Dynamics',
    logoUrl: '/images/agencies/image-5-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp',
    blurb: 'Performance-driven digital marketing with data-first approach and measurable results.',
    locations: ['San Francisco', 'Austin', 'Berlin'],
    sectors: ['finance', 'technology', 'healthcare']
  },
  {
    id: 'strategic-solutions',
    name: 'Strategic Solutions',
    logoUrl: '/images/agencies/image-6-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp',
    blurb: 'Global strategic consulting firm helping brands navigate complex market challenges.',
    locations: ['Chicago', 'Frankfurt', 'Tokyo'],
    sectors: ['automotive', 'finance', 'media']
  },
  {
    id: 'media-masters',
    name: 'Media Masters',
    logoUrl: '/images/agencies/image-5-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp',
    blurb: 'Integrated media planning and buying across traditional and digital channels.',
    locations: ['Miami', 'Sydney', 'Paris'],
    sectors: ['retail', 'media', 'healthcare']
  }
]