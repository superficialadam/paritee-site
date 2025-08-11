'use client'

export default function HeroIteration2V1() {
  return (
    <section 
      id="home" 
      className="section relative min-h-screen flex items-center"
    >
      <div className="container">
        <div className="max-w-4xl">
          {/* Main Headline */}
          <h1 className="display-large text-white mb-8 fade-up visible">
            No Compromise. Just Better.
          </h1>
          
          {/* Subheadline */}
          <div className="space-y-6 text-lg leading-relaxed text-[#E8EDF5] max-w-3xl fade-up visible">
            <p>
              You've been asked to make trade-offs for too long.
            </p>
            <p>
              Big agencies that go big on overhead but fall short on care.
              Small agencies that bring passion but can't keep pace.
            </p>
            <p>
              You've had to choose between speed and scale.
              Bold thinking and trusted delivery.
            </p>
            <p className="text-xl font-semibold text-white">
              That compromise ends with Paritee.
            </p>
            <p>
              We are a coalition of top-tier, advisory-led agencies united by one principle: You deserve better.
            </p>
          </div>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 fade-up visible">
            <button 
              onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-[#D4AF37] text-[#0E2756] font-semibold rounded-lg hover:bg-[#E6C547] transition-colors"
            >
              Explore Our Work
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0E2756] transition-all"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}