import { people } from '@/data/people'
import SectionV3B from './SectionV3B'

export default function TeamV3B() {
  return (
    <SectionV3B
      id="team"
      eyebrow="Meet the Team"
      title="The People"
      intro="Experienced leaders from diverse backgrounds, united by a shared commitment to excellence."
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {people.map((person) => (
          <div key={person.id} className="minimal-hover text-center">
            <div className="space-y-4">
              <div className="w-32 h-32 bg-white/10 backdrop-blur-sm mx-auto"></div>
              <div className="space-y-2">
                <h3 className="text-lg font-light font-heading text-white">
                  {person.name}
                </h3>
                <p className="text-sm text-white/70">{person.role}</p>
                <p className="text-xs text-white/40 uppercase tracking-wide">
                  {person.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionV3B>
  )
}