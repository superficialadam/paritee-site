'use client'

import { CalendarDays, ArrowRight, ExternalLink } from 'lucide-react'
import { news } from '@/data/news'

export default function NewsV4D() {
  const formatDate = (dateISO: string) => {
    return new Date(dateISO).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const featuredArticle = news[0]
  const otherArticles = news.slice(1)

  return (
    <section id="news" className="gallery-container">
      {/* Section Header */}
      <div className="text-center mb-16 fade-up">
        <div className="gallery-eyebrow mb-4">
          Latest Updates
        </div>
        <h2 className="section-title display-font text-black mb-6">
          Gallery News & Insights
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Stay informed about the latest developments in creative excellence, 
          industry insights, and our ongoing curation of exceptional partnerships.
        </p>
      </div>

      {/* Featured Article */}
      <div className="mb-16 fade-up">
        <div className="gallery-card p-0 overflow-hidden group cursor-pointer">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative overflow-hidden h-80 lg:h-auto">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 group-hover:to-black/40 transition-all duration-300"></div>
              
              {/* Featured Badge */}
              <div className="absolute top-6 left-6 px-4 py-2 bg-yellow-600 text-white text-sm font-medium">
                Featured Story
              </div>
            </div>

            {/* Content */}
            <div className="p-10 flex flex-col justify-center">
              <div className="flex items-center text-gray-600 text-sm mb-4">
                <CalendarDays size={16} className="mr-2" />
                {formatDate(featuredArticle.dateISO)}
              </div>
              
              <h3 className="display-medium display-font text-black mb-6 group-hover:text-yellow-700 transition-colors duration-300">
                {featuredArticle.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {featuredArticle.excerpt}
              </p>

              <button className="self-start flex items-center gap-3 px-8 py-3 bg-black text-white font-medium hover:bg-yellow-600 transition-all duration-300 group">
                Read Full Story
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Other Articles Grid */}
      <div className="gallery-grid gallery-grid-2">
        {otherArticles.map((article, index) => (
          <div
            key={article.id}
            className="gallery-card p-0 overflow-hidden group cursor-pointer stagger-child fade-up"
            style={{ '--stagger-delay': index } as React.CSSProperties}
          >
            {/* Image */}
            <div className="relative overflow-hidden h-48">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <CalendarDays size={14} className="mr-2" />
                {formatDate(article.dateISO)}
              </div>
              
              <h3 className="card-title display-font text-black mb-4 group-hover:text-yellow-700 transition-colors duration-300">
                {article.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-sm mb-6">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-black group-hover:text-yellow-600 transition-colors duration-300">
                  Read Article
                </span>
                <ExternalLink 
                  size={16} 
                  className="text-gray-400 group-hover:text-yellow-600 transition-all duration-300 transform group-hover:scale-110" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-20 text-center fade-up">
        <div className="max-w-2xl mx-auto p-12 border border-gray-200 bg-gray-50/30">
          <h3 className="card-title display-font text-black mb-4">
            Stay in the Gallery Loop
          </h3>
          <p className="text-gray-600 mb-8">
            Subscribe to our curated newsletter for the latest insights, 
            industry trends, and exclusive behind-the-scenes content.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-3 border border-gray-300 focus:border-yellow-600 focus:outline-none text-center sm:text-left flex-grow max-w-md"
            />
            <button 
              type="submit"
              className="px-8 py-3 bg-black text-white font-medium hover:bg-yellow-600 transition-all duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-xs text-gray-500 mt-4">
            Unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  )
}