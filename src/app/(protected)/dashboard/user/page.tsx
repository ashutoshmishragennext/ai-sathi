'use client'

import { useState } from 'react'
import CareerOverview from '@/components/resume-builder/CareerOverview'
import Education from '@/components/resume-builder/Education'
import ExperienceTab from '@/components/resume-builder/Experience'
import Profile from '@/components/resume-builder/Heading'
import SkillsTab from '@/components/resume-builder/Skills'
import { useResume } from '@/lib/store'
import ResumeCard from "@/components/templates/Template2"
import { Menu, X } from 'lucide-react'

export default function ResumeBuilder() {
  const { step, setStep } = useResume()
  const [menuOpen, setMenuOpen] = useState(false)

  const steps = [
    { id: 1, label: "Templates" },
    { id: 2, label: "Profile" },
    { id: 3, label: "Education" },
    { id: 4, label: "Experience" },
    { id: 5, label: "Skills" },
    { id: 6, label: "Career Overview" },
    { id: 7, label: "Wrap-Up" },
  ]

  const progress = Math.round(((step - 1) / (steps.length - 1)) * 100)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-64 bg-purple-900 text-white p-6 flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Build Resume</h2>
          <ul className="space-y-4">
            {steps.map((s) => (
              <li
                key={s.id}
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-3 cursor-pointer ${
                  step === s.id ? "font-bold" : "opacity-75"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                    step === s.id
                      ? "bg-white text-purple-700 font-bold"
                      : "border-white text-white"
                  }`}
                >
                  {s.id}
                </span>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Progress bar */}
        <div className="mt-8">
          <p className="text-sm font-semibold">Status:</p>
          <div className="w-full bg-purple-700 h-2 rounded mt-1">
            <div
              className="bg-white h-2 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs mt-1">{progress}% Complete</p>
        </div>
      </aside>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          className="p-2 bg-purple-900 text-white rounded-lg shadow-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <aside className="absolute left-0 top-0 w-64 bg-purple-900 text-white p-6 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-6">Build Resume</h2>
              <ul className="space-y-4">
                {steps.map((s) => (
                  <li
                    key={s.id}
                    onClick={() => {
                      setStep(s.id)
                      setMenuOpen(false) // close after selecting
                    }}
                    className={`flex items-center gap-3 cursor-pointer ${
                      step === s.id ? "font-bold" : "opacity-75"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                        step === s.id
                          ? "bg-white text-purple-700 font-bold"
                          : "border-white text-white"
                      }`}
                    >
                      {s.id}
                    </span>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Progress bar */}
            <div className="mt-8">
              <p className="text-sm font-semibold">Status:</p>
              <div className="w-full bg-purple-700 h-2 rounded mt-1">
                <div
                  className="bg-white h-2 rounded"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs mt-1">{progress}% Complete</p>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6">
        {step === 1 && <Profile />}
        {step === 2 && <Education />}
        {step === 3 && <ExperienceTab />}
        {step === 4 && <SkillsTab />}
        {step === 5 && <CareerOverview />}
        {step === 6 && <div>Career Overview Step 2 (Wrap later)</div>}
        {step === 7 && <div>Wrap-Up</div>}
      </main>

      {/* Resume Preview */}
      <div className="flex-1 p-6 bg-gray-50 hidden md:block">
        <ResumeCard />
      </div>
    </div>
  )
}
