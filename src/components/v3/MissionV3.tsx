import SectionV3 from './SectionV3'

export default function MissionV3() {
  return (
    <SectionV3 
      id="mission"
      eyebrow="Our Mission"
      title="Redefining What's Possible"
      className="bg-gray-50"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl leading-relaxed text-black font-light drop-cap">
              For too long, the marketing industry has operated on false choices. 
              You're told to pick between brand and performance, between creativity 
              and data, between reach and relevance.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-light mt-8">
              We reject these trade-offs. Our mission is to prove that the best 
              marketing happens when you refuse to compromise—when you demand 
              both exceptional creativity and measurable results.
            </p>
          </div>

          <div className="mt-16 space-y-8">
            <h3 className="text-2xl font-light font-heading text-black">
              Best of Both Worlds
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Creative excellence that drives emotional connection',
                'Data-driven insights that optimize performance', 
                'Global scale with local market expertise',
                'Innovation balanced with proven methodologies'
              ].map((item, index) => (
                <div key={index} className="minimal-hover">
                  <div className="border-l-2 border-black pl-6 py-2">
                    <span className="text-lg text-gray-800 leading-relaxed font-light">
                      {item}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pinned pull-quote */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="bg-white p-8 border-l-4 border-black">
            <blockquote className="text-xl font-light leading-relaxed text-black mb-6">
              "We don't believe in choosing between brand building and performance marketing. 
              The future belongs to those who master both."
            </blockquote>
            <footer className="space-y-1">
              <div className="text-sm font-medium text-black">Sarah Chen</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Chief Executive Officer
              </div>
            </footer>
          </div>
        </div>
      </div>
    </SectionV3>
  )
}