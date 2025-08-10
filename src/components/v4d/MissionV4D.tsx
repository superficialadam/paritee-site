'use client'

export default function MissionV4D() {
  return (
    <section className="gallery-container">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Quote */}
        <blockquote className="display-medium display-font font-light text-black leading-tight mb-12">
          "We believe exceptional creative work emerges from the intersection of 
          <span className="text-yellow-600"> strategic thinking</span> and 
          <span className="text-yellow-600"> artistic vision</span>."
        </blockquote>
        
        {/* Mission Statement */}
        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div className="text-left">
            <h3 className="card-title display-font text-black mb-6">Our Philosophy</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Like a world-class gallery, we curate rather than collect. Each agency 
              in our network represents the pinnacle of creative excellence in their 
              respective fields, selected for their unwavering commitment to craftsmanship.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We orchestrate partnerships between brands and these extraordinary creative 
              minds, ensuring every collaboration produces work worthy of permanent exhibition.
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="card-title display-font text-black mb-6">Our Approach</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Museum-quality attention to detail defines everything we do. From initial 
              strategy sessions to final execution, we maintain the highest standards 
              of creative integrity.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our process mirrors that of master curators: careful selection, thoughtful 
              presentation, and an unwavering focus on the story each piece tells.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}