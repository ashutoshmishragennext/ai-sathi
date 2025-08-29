'use client'
import { useResume } from '@/lib/store'
import { useState } from 'react'

type ExperienceEntry = {
  title: string
  type: string
  company: string
  location: string
  startMonth: string
  startYear: string
  endMonth?: string
  endYear?: string
  isCurrent: boolean
  description: string
}

type ExperienceErrors = Partial<Record<keyof ExperienceEntry, string>>

export default function ExperienceTab() {
  const { experience, setExperience, setStep } = useResume()

  const [entry, setEntry] = useState<ExperienceEntry>({
    title: '',
    type: '',
    company: '',
    location: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    isCurrent: false,
    description: '',
  })

  const [errors, setErrors] = useState<ExperienceErrors>({})

  const validate = (): ExperienceErrors => {
    const err: ExperienceErrors = {}
    if (!entry.title.trim()) err.title = 'Required'
    if (!entry.type.trim()) err.type = 'Required'
    if (!entry.company.trim()) err.company = 'Required'
    if (!entry.location.trim()) err.location = 'Required'
    if (!entry.startMonth.trim()) err.startMonth = 'Required'
    if (!entry.startYear.trim()) err.startYear = 'Required'
    if (!entry.isCurrent) {
      if (!entry.endMonth?.trim()) err.endMonth = 'Required'
      if (!entry.endYear?.trim()) err.endYear = 'Required'
    }
    if (!entry.description.trim()) err.description = 'Required'
    else if (entry.description.trim().split(/\s+/).length > 60)
      err.description = 'Max 60 words allowed'
    return err
  }

  const handleSubmit = () => {
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length === 0) {
      setExperience([...experience, entry])
      setStep(4) // Move to Skills step
    }
  }

  const toggleCurrent = () => {
    setEntry(prev => ({
      ...prev,
      isCurrent: !prev.isCurrent,
      endMonth: '',
      endYear: '',
    }))
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Experience</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Job Title</label>
          <input
            value={entry.title}
            onChange={e => setEntry({ ...entry, title: e.target.value })}
            className="input"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div>
          <label>Job Type</label>
          <input
            value={entry.type}
            onChange={e => setEntry({ ...entry, type: e.target.value })}
            className="input"
          />
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
        </div>

        <div>
          <label>Company Name</label>
          <input
            value={entry.company}
            onChange={e => setEntry({ ...entry, company: e.target.value })}
            className="input"
          />
          {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
        </div>

        <div>
          <label>Location</label>
          <input
            value={entry.location}
            onChange={e => setEntry({ ...entry, location: e.target.value })}
            className="input"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>

        <div>
          <label>Start Month</label>
          <input
            value={entry.startMonth}
            onChange={e => setEntry({ ...entry, startMonth: e.target.value })}
            className="input"
          />
          {errors.startMonth && <p className="text-red-500 text-sm">{errors.startMonth}</p>}
        </div>

        <div>
          <label>Start Year</label>
          <input
            value={entry.startYear}
            onChange={e => setEntry({ ...entry, startYear: e.target.value })}
            className="input"
          />
          {errors.startYear && <p className="text-red-500 text-sm">{errors.startYear}</p>}
        </div>

        {!entry.isCurrent && (
          <>
            <div>
              <label>End Month</label>
              <input
                value={entry.endMonth}
                onChange={e => setEntry({ ...entry, endMonth: e.target.value })}
                className="input"
              />
              {errors.endMonth && <p className="text-red-500 text-sm">{errors.endMonth}</p>}
            </div>

            <div>
              <label>End Year</label>
              <input
                value={entry.endYear}
                onChange={e => setEntry({ ...entry, endYear: e.target.value })}
                className="input"
              />
              {errors.endYear && <p className="text-red-500 text-sm">{errors.endYear}</p>}
            </div>
          </>
        )}
      </div>

      <button
        onClick={toggleCurrent}
        className={`mt-4 px-4 py-2 rounded ${
          entry.isCurrent ? 'bg-green-600 text-white' : 'bg-gray-200'
        }`}
      >
        {entry.isCurrent ? 'Set as Past Role' : 'Set as Current Role'}
      </button>

      <div className="mt-6">
        <label>Job Description (max 60 words)</label>
        <textarea
          value={entry.description}
          onChange={e => setEntry({ ...entry, description: e.target.value })}
          className="input h-24"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          {entry.description.trim().split(/\s+/).length}/60 words
        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
      >
        Next
      </button>
    </div>
  )
}