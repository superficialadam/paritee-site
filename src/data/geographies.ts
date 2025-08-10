export interface Geography {
  country: string
  cities: string[]
}

export const geographies: Geography[] = [
  {
    country: 'United States',
    cities: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Austin']
  },
  {
    country: 'United Kingdom',
    cities: ['London', 'Manchester', 'Edinburgh', 'Bristol']
  },
  {
    country: 'Germany',
    cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt']
  },
  {
    country: 'France',
    cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse']
  },
  {
    country: 'Australia',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth']
  },
  {
    country: 'Japan',
    cities: ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya']
  }
]