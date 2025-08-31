import { useResume } from '@/lib/store'

export default function OverviewPreview() {
  const { overview } = useResume()

  return (
    <section className="p-5 md:p-4 mb-3">
      <h2 className="text-[#2563eb] font-bold text-lg border-b-2 border-[#e0e7ef] pb-1 mb-2">Summary</h2>
      <p className="text-sm text-[#222] leading-relaxed">{overview}</p>
    </section>
  )
}