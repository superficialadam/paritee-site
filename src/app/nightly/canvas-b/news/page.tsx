import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { news } from '@/data/news'
import { Calendar, ArrowRight, Award, TrendingUp, Globe, Heart } from 'lucide-react'

export default function NewsPage() {
  // Sort news by date (newest first)
  const sortedNews = [...news].sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())

  // Featured article (most recent)
  const featuredArticle = sortedNews[0]
  const otherArticles = sortedNews.slice(1)

  // Format date
  const formatDate = (dateISO: string) => {
    return new Date(dateISO).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get relative time
  const getRelativeTime = (dateISO: string) => {
    const date = new Date(dateISO)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 30) return `${diffDays} days ago`
    if (diffDays < 60) return '1 month ago'
    return `${Math.floor(diffDays / 30)} months ago`
  }

  // Category icons based on content
  const getCategoryIcon = (title: string) => {
    if (title.toLowerCase().includes('award') || title.toLowerCase().includes('recognition')) {
      return <Award className="w-4 h-4 text-amber-400" />
    }
    if (title.toLowerCase().includes('expansion') || title.toLowerCase().includes('global')) {
      return <Globe className="w-4 h-4 text-blue-400" />
    }
    if (title.toLowerCase().includes('diversity') || title.toLowerCase().includes('commitment')) {
      return <Heart className="w-4 h-4 text-emerald-400" />
    }
    return <TrendingUp className="w-4 h-4 text-slate-400" />
  }

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-semibold text-white leading-tight">
            Latest News
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Stay up to date with the latest developments, insights, and achievements from across our network of agencies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">{news.length}</div>
              <div className="text-slate-400 text-sm">Recent Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">4</div>
              <div className="text-slate-400 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-blue-400 mb-2">24/7</div>
              <div className="text-slate-400 text-sm">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-8">Featured</h2>
            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto relative">
                  <Image 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      {getCategoryIcon(featuredArticle.title)}
                      <span className="text-slate-400 text-sm flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(featuredArticle.dateISO)}</span>
                      </span>
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/40 text-xs rounded-full">
                        Featured
                      </span>
                    </div>
                    <CardTitle className="text-2xl font-semibold text-white mb-4 leading-tight">
                      {featuredArticle.title}
                    </CardTitle>
                    <CardDescription className="text-slate-300 leading-relaxed text-base mb-6">
                      {featuredArticle.excerpt}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal self-start flex items-center space-x-2 group">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Other Articles */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-8">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map((article) => (
              <Card key={article.id} className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 overflow-hidden">
                <div className="aspect-video relative">
                  <Image 
                    src={article.image} 
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    {getCategoryIcon(article.title)}
                    <span className="text-slate-500 text-xs flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{getRelativeTime(article.dateISO)}</span>
                    </span>
                  </div>
                  <CardTitle className="text-lg font-medium text-white leading-tight mb-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <CardDescription className="text-slate-400 leading-relaxed text-sm mb-4">
                    {article.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {formatDate(article.dateISO)}
                    </span>
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal text-sm">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Categories */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center">News Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 text-center">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
                <CardTitle className="text-lg font-medium text-white">Awards & Recognition</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-slate-400 text-sm">
                  Industry awards and recognition for outstanding work and innovation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 text-center">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-lg font-medium text-white">Global Expansion</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-slate-400 text-sm">
                  News about our growing global network and new market entries.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 text-center">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-emerald-400" />
                </div>
                <CardTitle className="text-lg font-medium text-white">Culture & Values</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-slate-400 text-sm">
                  Stories about our commitment to diversity, sustainability, and social impact.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm shadow-lg rounded-none group hover:shadow-xl hover:shadow-slate-900/50 transition-all duration-300 hover:border-slate-600/60 text-center">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-slate-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-slate-400" />
                </div>
                <CardTitle className="text-lg font-medium text-white">Industry Insights</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <CardDescription className="text-slate-400 text-sm">
                  Thought leadership and insights on industry trends and innovations.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-semibold text-white">Stay Informed</h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Subscribe to our newsletter to get the latest news and insights delivered directly to your inbox.
          </p>
          <div className="max-w-md mx-auto space-y-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-blue-600/60 focus:ring-2 focus:ring-blue-600/20 transition-all duration-300"
            />
            <Button className="w-full bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-semibold text-white">Want to Share News?</h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Have a story to tell or an achievement to share? We&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/canvas-b/contact">Get in Touch</Link>
            </Button>
            <Button asChild className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-600/10 hover:border-slate-500 rounded-full px-6 py-3 transition-all duration-300">
              <Link href="/nightly/canvas-b/agencies">Meet Our Agencies</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}