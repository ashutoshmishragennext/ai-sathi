import { useResume } from '@/lib/store'

export default function EducationPreview() {
  const { education } = useResume()

  return (
    <section className="p-5 md:p-4 mb-3">
      <h2 className="text-[#2563eb] font-bold text-lg border-b-2 border-[#e0e7ef] pb-1 mb-2">Education</h2>
      {education.map((edu, i) => (
        <div key={i} className="bg-[#f8f9fa] border border-[#e0e7ef] p-3 rounded mb-2">
          <div className="text-[11px] text-gray-500 mb-1">{edu.startMonth} {edu.startYear}</div>
          <div className="font-bold text-sm mb-1">{edu.fieldOfStudy} - {edu.percentage}%</div>
          <div className="italic text-[11px] text-gray-600 mb-2">
            {edu.school} - {edu.location}
          </div>
        </div>
      ))}
    </section>
  )
}