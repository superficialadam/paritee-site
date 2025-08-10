import { news } from '@/data/news'
import SectionV3 from './SectionV3'

export default function NewsV3() {
  const formatDate = (dateISO: string) => {
    return new Date(dateISO).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <SectionV3
      id="news"
      eyebrow="Latest News"
      title="Stay Updated"
      intro="The latest insights, announcements, and thought leadership from our team and industry."
      className="bg-gray-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item, index) => (
          <article 
            key={item.id} 
            className="minimal-hover cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 from-gray-50 to-gray-200 group-hover:from-gray-100 group-hover:to-gray-300 transition-all duration-300" style={{backgroundImage: 'url(/images/hero/image-0-92a8f3_83e998ae46fa4afba1eb0524ac1b6e0df000.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                <div className="absolute bottom-4 left-4">
                  <time className="text-xs px-2 py-1 bg-white text-black font-medium">
                    {formatDate(item.dateISO)}
                  </time>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-light font-heading text-black leading-tight group-hover:text-gray-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.excerpt}
                </p>
                <div className="pt-2">
                  <span className="text-xs text-gray-400 group-hover:text-black transition-colors">
                    Read More →
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionV3>
  )
}