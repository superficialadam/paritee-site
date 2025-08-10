'use client'

import LogoV4 from './LogoV4'
import LinkV4 from './LinkV4'
import { news } from '@/data/news'

const FooterV4 = () => {
  const latestNews = news.slice(0, 3)

  return (
    <footer className="border-t border-cream/5 bg-charcoal/5">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="mb-8">
              <LogoV4 size="large" variant="light" />
            </div>
            <p className="text-body text-warm-gray mb-8 leading-relaxed max-w-md">
              Connecting brands with the right creative partners through curated networks and strategic matching.
            </p>
            <div className="flex space-x-6">
              <LinkV4 href="#" variant="subtle" showArrow={false}>Twitter</LinkV4>
              <LinkV4 href="#" variant="subtle" showArrow={false}>LinkedIn</LinkV4>
              <LinkV4 href="#" variant="subtle" showArrow={false}>Instagram</LinkV4>
            </div>
          </div>
          
          {/* News Section */}
          <div>
            <h4 className="text-subheading text-cream mb-8">Recent News</h4>
            <div className="space-y-6">
              {latestNews.map((item, index) => (
                <article key={index}>
                  <div className="text-caption text-gold uppercase tracking-wider mb-2">
                    {new Date(item.dateISO).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <LinkV4 href="#" variant="emphasis" className="text-body" showArrow={false}>
                    {item.title}
                  </LinkV4>
                </article>
              ))}
            </div>
          </div>
          
          {/* About Section */}
          <div>
            <h4 className="text-subheading text-cream mb-8">Company</h4>
            <nav className="space-y-4">
              <LinkV4 href="#" variant="default" showArrow={false}>Our Mission</LinkV4>
              <LinkV4 href="#" variant="default" showArrow={false}>Leadership Team</LinkV4>
              <LinkV4 href="#" variant="default" showArrow={false}>Careers</LinkV4>
              <LinkV4 href="#" variant="default" showArrow={false}>Partner Network</LinkV4>
              <LinkV4 href="#" variant="default" showArrow={false}>Case Studies</LinkV4>
            </nav>
          </div>
          
          {/* Contact Section */}
          <div>
            <h4 className="text-subheading text-cream mb-8">Contact</h4>
            <div className="space-y-4">
              <div>
                <div className="text-caption text-gold uppercase tracking-wider mb-2">Email</div>
                <LinkV4 href="mailto:hello@paritee.com" variant="emphasis" showArrow={false}>
                  hello@paritee.com
                </LinkV4>
              </div>
              <div>
                <div className="text-caption text-gold uppercase tracking-wider mb-2">Phone</div>
                <LinkV4 href="tel:+1555123456" variant="emphasis" showArrow={false}>
                  +1 (555) 123-4567
                </LinkV4>
              </div>
              <div>
                <div className="text-caption text-gold uppercase tracking-wider mb-2">Locations</div>
                <div className="space-y-1 text-body text-warm-gray">
                  <div>New York</div>
                  <div>London</div>
                  <div>Tokyo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-cream/5 mt-16 pt-8 flex justify-between items-center">
          <div className="text-caption text-warm-gray">
            © {new Date().getFullYear()} Paritee. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <LinkV4 href="#" variant="subtle" showArrow={false}>Privacy Policy</LinkV4>
            <LinkV4 href="#" variant="subtle" showArrow={false}>Terms of Service</LinkV4>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterV4