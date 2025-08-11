'use client'

import Image from 'next/image'
import { news } from '@/data/news'

export default function NewsIteration2V1() {
  const formatDate = (dateISO: string) => {
    return new Date(dateISO).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section id="news" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <div className="eyebrow">Stay Informed</div>
          <h2 className="section-title text-white">
            Latest News
          </h2>
        </div>
        
        <div className="grid grid-3">
          {news.slice(0, 4).map((article, index) => (
            <article 
              key={article.id} 
              className="card card-small p-6 fade-up"
              style={{ '--stagger-delay': index } as React.CSSProperties}
            >
              <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-[#1A3A6B]">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="text-[#D4AF37] text-sm mb-2">
                {formatDate(article.dateISO)}
              </div>
              
              <h3 className="card-title text-white mb-3 line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              
              <button className="text-[#D4AF37] text-sm font-medium hover:text-white transition-colors">
                Read More →
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}