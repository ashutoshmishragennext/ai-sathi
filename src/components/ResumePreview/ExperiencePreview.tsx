import { useResume } from '@/lib/store'

export default function ExperiencePreview() {
  const { experience } = useResume()

  return (
    <section className="p-5 md:p-4 mb-3">
      <h2 className="text-[#2563eb] font-bold text-lg border-b-2 border-[#e0e7ef] pb-1 mb-2">Work History</h2>
      {experience.map((job, i) => (
        <div key={i} className="bg-[#f8f9fa] border border-[#e0e7ef] p-3 rounded mb-2">
          <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
            <div>
              <div className="font-bold text-sm mb-1">{job.role}</div>
              <div className="italic text-[11px] text-gray-600 mb-1">
                {job.companyName}, {job.jobType}, {job.location}
              </div>
            </div>
            <div className="text-[11px] text-gray-500 font-medium">{job.startDate} - {job.endDate}</div>
          </div>
          <p className="text-[11px] text-[#222] mb-2 leading-snug">{job.description}</p>
          <ul className="list-disc ml-4 text-[11px] text-[#222] leading-snug">
            {job.bullets.map((point, j) => <li key={j}>{point}</li>)}
          </ul>
        </div>
      ))}
    </section>
  )
}