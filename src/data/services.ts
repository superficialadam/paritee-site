export interface Service {
  id: string
  name: string
  blurb: string
  icon: string
}

export const services: Service[] = [
  {
    id: 'strategic-communications',
    name: 'Strategic Communications',
    blurb: 'Crafting narratives that resonate with your audiences and drive meaningful engagement.',
    icon: 'Megaphone'
  },
  {
    id: 'public-affairs',
    name: 'Public Affairs',
    blurb: 'Navigating complex policy landscapes and building relationships that matter.',
    icon: 'Building'
  },
  {
    id: 'branding-design',
    name: 'Branding & Design',
    blurb: 'Creating visual identities and experiences that capture your essence.',
    icon: 'Palette'
  },
  {
    id: 'digital-content',
    name: 'Digital & Content Marketing',
    blurb: 'Delivering digital-first strategies that connect and convert.',
    icon: 'Globe'
  },
  {
    id: 'crisis-management',
    name: 'Crisis Management',
    blurb: 'Protecting reputation and managing communications when it matters most.',
    icon: 'Shield'
  }
]