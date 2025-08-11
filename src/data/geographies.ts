export interface Geography {
  country: string
  cities: string[]
}

export const geographies: Geography[] = [
  {
    country: 'The Nordics',
    cities: ['Copenhagen', 'Oslo', 'Stockholm']
  },
  {
    country: 'Germany',
    cities: ['Berlin', 'Frankfurt', 'Munich']
  },
  {
    country: 'MENA',
    cities: ['Dubai']
  },
  {
    country: 'UK & Ireland',
    cities: ['London', 'Dublin']
  },
  {
    country: 'USA',
    cities: ['New York', 'Minneapolis', 'San Francisco']
  }
]