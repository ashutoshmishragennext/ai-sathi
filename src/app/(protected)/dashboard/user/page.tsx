'use client'
import { useResume } from '@/lib/store'
import Profile from '@/components/resume-builder/Profile'
import Education from '@/components/resume-builder/Education'
import Experience from '@/components/resume-builder/Experience'
import Skills from '@/components/resume-builder/Skills'
import CareerOverview from '@/components/resume-builder/CareerOverview'

export default function StepRenderer() {
  const { step } = useResume()

  const renderStep = () => {
    switch (step) {
      case 1: return <Profile />
      case 2: return <Education />
      case 3: return <Experience />
      case 4: return <Skills />
      case 5: return <CareerOverview />
      default: return <p className="text-red-500">Invalid step</p>
    }
  }

  return (
    <div className="w-full">
      {renderStep()}
    </div>
  )
}