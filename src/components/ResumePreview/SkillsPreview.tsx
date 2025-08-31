import { useResume } from '@/lib/store'

export default function SkillsPreview() {
  const { skills } = useResume()

  return (
    <section className="p-5 md:p-4 mb-3">
      <h2 className="text-[#2563eb] font-bold text-lg border-b-2 border-[#e0e7ef] pb-1 mb-2">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span key={i} className="bg-[#f0f4f8] border border-[#e0e7ef] text-[#2563eb] text-xs rounded-full px-2.5 py-1">
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}