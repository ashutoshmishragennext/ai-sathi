'use client'
import { useResume } from '@/lib/store'
import { useState } from 'react'

export default function SkillsTab() {
  const { skills, setSkills, setStep } = useResume()
  const [input, setInput] = useState('')
  const [localSkills, setLocalSkills] = useState<string[]>(skills)

  const handleAdd = () => {
    const trimmed = input.trim()
    if (trimmed && !localSkills.includes(trimmed)) {
      setLocalSkills([...localSkills, trimmed])
      setInput('')
    }
  }

  const handleRemove = (skill: string) => {
    setLocalSkills(localSkills.filter(s => s !== skill))
  }

  const handleNext = () => {
    if (localSkills.length === 0) return alert('Please add at least one skill.')
    setSkills(localSkills)
    setStep(5) // Move to Career Overview
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Skills</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter a skill"
          className="input flex-1"
        />
        <button
          onClick={handleAdd}
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
        >
          Add
        </button>
      </div>

      {localSkills.length > 0 && (
        <ul className="space-y-2">
          {localSkills.map((skill, i) => (
            <li key={i} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded">
              <span>{skill}</span>
              <button
                onClick={() => handleRemove(skill)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleNext}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Next
      </button>
    </div>
  )
}