export interface Service {
  id: string
  name: string
  blurb: string
  icon: string
}

export const services: Service[] = [
  {
    id: 'strategy',
    name: 'Strategic Consulting',
    blurb: 'Comprehensive business strategy and market positioning',
    icon: 'Target'
  },
  {
    id: 'creative',
    name: 'Creative Services',
    blurb: 'Brand design, campaigns, and creative execution',
    icon: 'Palette'
  },
  {
    id: 'digital',
    name: 'Digital Marketing',
    blurb: 'Performance marketing and digital transformation',
    icon: 'Smartphone'
  },
  {
    id: 'media',
    name: 'Media Planning',
    blurb: 'Integrated media strategy and buying',
    icon: 'Radio'
  },
  {
    id: 'pr',
    name: 'Public Relations',
    blurb: 'Strategic communications and reputation management',
    icon: 'Megaphone'
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    blurb: 'Insights-driven marketing and measurement',
    icon: 'BarChart'
  }
]