import { people } from '@/data/people'
import SectionV3 from './SectionV3'

export default function TeamV3() {
  return (
    <SectionV3
      id="team"
      eyebrow="Meet the Team"
      title="The People"
      intro="Experienced leaders from diverse backgrounds, united by a shared commitment to excellence."
      className="bg-gray-50"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {people.map((person) => (
          <div key={person.id} className="minimal-hover text-center">
            <div className="space-y-4">
              <div className="w-32 h-32 bg-gray-200 mx-auto"></div>
              <div className="space-y-2">
                <h3 className="text-lg font-light font-heading text-black">
                  {person.name}
                </h3>
                <p className="text-sm text-gray-600">{person.role}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  {person.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionV3>
  )
}