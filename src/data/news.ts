export interface NewsItem {
  id: string
  title: string
  dateISO: string
  excerpt: string
  image: string
}

export const news: NewsItem[] = [
  {
    id: 'agency-of-the-year',
    title: 'Named Agency of the Year at Global Marketing Awards',
    dateISO: '2024-11-15',
    excerpt: 'Our innovative approach to integrated marketing earned recognition at the prestigious Global Marketing Awards ceremony.',
    image: '/images/hero/image-0-92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg'
  },
  {
    id: 'sustainable-marketing',
    title: 'Leading the Charge in Sustainable Marketing Practices',
    dateISO: '2024-10-28',
    excerpt: 'New white paper explores how brands can reduce carbon footprint while maximizing campaign effectiveness.',
    image: '/images/hero/image-1-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp'
  },
  {
    id: 'ai-creative-tools',
    title: 'Launching AI-Powered Creative Intelligence Platform',
    dateISO: '2024-10-12',
    excerpt: 'Revolutionary new tool combines machine learning with human creativity to optimize campaign performance.',
    image: '/images/agencies/image-2-034c23_168424f3641144bcbc3d0d8b507809d2~mv2.webp'
  },
  {
    id: 'global-expansion',
    title: 'Expanding Operations to Asia-Pacific Region',
    dateISO: '2024-09-20',
    excerpt: 'New offices in Tokyo and Singapore strengthen our global network and local market expertise.',
    image: '/images/agencies/image-5-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp'
  },
  {
    id: 'diversity-initiative',
    title: 'Commitment to Diversity: 50% Leadership by 2025',
    dateISO: '2024-08-30',
    excerpt: 'Comprehensive diversity and inclusion program aims to create more representative leadership across all levels.',
    image: '/images/agencies/image-6-597932_9e81a19c2ae04035ba9db20f378a7999~mv2.webp'
  }
]