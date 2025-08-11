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
    id: 'brands2life',
    name: 'Brands2Life',
    logoUrl: '/images/agencies/image-2-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp',
    blurb: 'Strategic communications agency specializing in technology and corporate reputation.',
    locations: ['London', 'New York'],
    sectors: ['technology', 'finance', 'healthcare']
  },
  {
    id: 'dva-creative',
    name: 'DVA Creative Technology Studio',
    logoUrl: '/images/agencies/image-5-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp',
    blurb: 'Digital innovation studio blending creativity with cutting-edge technology.',
    locations: ['San Francisco', 'Berlin'],
    sectors: ['technology', 'energy', 'infrastructure']
  },
  {
    id: 'fenton-fitzwilliam',
    name: 'Fenton Fitzwilliam',
    logoUrl: '/images/agencies/image-6-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp',
    blurb: 'Public affairs and strategic communications for complex challenges.',
    locations: ['Dublin', 'London'],
    sectors: ['public-sector', 'energy', 'finance']
  },
  {
    id: 'geelmuyden-kiese',
    name: 'Geelmuyden Kiese',
    logoUrl: '/images/agencies/image-2-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp',
    blurb: 'Nordic communications powerhouse with deep regional expertise.',
    locations: ['Oslo', 'Stockholm', 'Copenhagen'],
    sectors: ['energy', 'infrastructure', 'public-sector']
  },
  {
    id: 'lhlk',
    name: 'LHLK',
    logoUrl: '/images/agencies/image-5-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp',
    blurb: 'Strategic communications and public affairs across Germany.',
    locations: ['Berlin', 'Frankfurt', 'Munich'],
    sectors: ['finance', 'technology', 'healthcare']
  },
  {
    id: 'paritee-mena',
    name: 'Paritee MENA',
    logoUrl: '/images/agencies/image-6-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp',
    blurb: 'Regional expertise with global standards in the Middle East.',
    locations: ['Dubai'],
    sectors: ['energy', 'infrastructure', 'technology']
  }
]