import { useResume } from '@/lib/store'

export default function HeaderPreview() {
  const { heading } = useResume()

  return (
    <div className="bg-[#17446b] text-white py-2 text-center md:py-2.5">
      <div className="flex justify-between items-center px-4 flex-col md:flex-row md:gap-0 gap-4">
        <div className="flex flex-col items-center gap-2.5">
          <div className="w-20 h-20 rounded-full bg-[#e0e7ef] flex items-center justify-center text-4xl text-gray-400">
            <span role="img" aria-label="avatar">👩‍🎓</span>
          </div>
          <div className="text-center">
            <div className="font-bold text-2xl leading-none mb-2 md:text-xl">
              {heading.firstName} {heading.surName}
            </div>
            <div className="text-sm text-[#b6d0e2] md:text-xs">
              {heading.profession}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xs md:text-right text-center">
          <div>📍 {heading.city}, {heading.country}, {heading.pin}</div>
          <div>📞 {heading.phone}</div>
          <div>✉️ {heading.email}</div>
        </div>
      </div>
    </div>
  )
}