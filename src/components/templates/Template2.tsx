'use client'
import { useResume } from "@/lib/store";
import EducationPreview from "../ResumePreview/EducationPreview";
import ExperiencePreview from "../ResumePreview/ExperiencePreview";
import OverviewPreview from "../ResumePreview/OverviewPreview";
import HeaderPreview from "../ResumePreview/ProfilePreview";
import SkillsPreview from "../ResumePreview/SkillsPreview";


export default function ResumeCard() {
  const { activeSection } = useResume()

  return (
    <div className="max-w-[793px] pt-[50px] mx-auto font-sans bg-white shadow-md rounded-none overflow-hidden">
      <HeaderPreview/>
      {activeSection === 'overview' && <OverviewPreview />}
      {activeSection === 'skills' && <SkillsPreview />}
      {activeSection === 'education' && <EducationPreview />}
      {activeSection === 'experience' && <ExperiencePreview />}
    </div>
  )
}
