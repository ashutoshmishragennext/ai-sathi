'use client'
import { useResume } from '@/lib/store'
import { useState } from 'react'

type EducationEntry = {
  school: string
  location: string
  field: string
  percentage: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
}

type EducationErrors = Partial<Record<keyof EducationEntry, string>>

export default function Education() {
  const { education, setEducation, setStep } = useResume()
  const [entries, setEntries] = useState<EducationEntry[]>(
    education.length > 0 ? education : [
      {
        school: '',
        location: '',
        field: '',
        percentage: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
      }
    ]
  )

  const [errors, setErrors] = useState<EducationErrors[]>([])

  const validateEntry = (entry: EducationEntry): EducationErrors => {
    const err: EducationErrors = {}
    if (!entry.school.trim()) err.school = 'Required'
    if (!entry.location.trim()) err.location = 'Required'
    if (!entry.field.trim()) err.field = 'Required'
    if (!entry.percentage.trim()) err.percentage = 'Required'
    if (!entry.startMonth.trim()) err.startMonth = 'Required'
    if (!entry.startYear.trim()) err.startYear = 'Required'
    if (!entry.endMonth.trim()) err.endMonth = 'Required'
    if (!entry.endYear.trim()) err.endYear = 'Required'
    return err
  }

  const handleNext = () => {
    const allErrors = entries.map(validateEntry)
    setErrors(allErrors)

    const hasErrors = allErrors.some(err => Object.keys(err).length > 0)
    if (!hasErrors) {
      setEducation(entries)
      setStep(3) // Go to Experience step
    }
  }

  const updateEntry = (index: number, field: keyof EducationEntry, value: string) => {
    const updated = [...entries]
    updated[index][field] = value
    setEntries(updated)
  }

  const addEntry = () => {
    setEntries([...entries, {
      school: '',
      location: '',
      field: '',
      percentage: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
    }])
    setErrors([...errors, {}])
  }

  const removeEntry = (index: number) => {
    const updated = [...entries]
    updated.splice(index, 1)
    setEntries(updated)
    const updatedErrors = [...errors]
    updatedErrors.splice(index, 1)
    setErrors(updatedErrors)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Education Details</h2>

      {entries.map((entry, i) => (
        <div key={i} className="mb-6 border-b pb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>School Name</label>
              <input
                value={entry.school}
                onChange={e => updateEntry(i, 'school', e.target.value)}
                className="input"
              />
              {errors[i]?.school && <p className="text-red-500 text-sm">{errors[i].school}</p>}
            </div>

            <div>
              <label>Location</label>
              <input
                value={entry.location}
                onChange={e => updateEntry(i, 'location', e.target.value)}
                className="input"
              />
              {errors[i]?.location && <p className="text-red-500 text-sm">{errors[i].location}</p>}
            </div>

            <div>
              <label>Field of Study</label>
              <input
                value={entry.field}
                onChange={e => updateEntry(i, 'field', e.target.value)}
                className="input"
              />
              {errors[i]?.field && <p className="text-red-500 text-sm">{errors[i].field}</p>}
            </div>

            <div>
              <label>Percentage</label>
              <input
                value={entry.percentage}
                onChange={e => updateEntry(i, 'percentage', e.target.value)}
                className="input"
              />
              {errors[i]?.percentage && <p className="text-red-500 text-sm">{errors[i].percentage}</p>}
            </div>

            <div>
              <label>Start Month</label>
              <input
                value={entry.startMonth}
                onChange={e => updateEntry(i, 'startMonth', e.target.value)}
                className="input"
              />
              {errors[i]?.startMonth && <p className="text-red-500 text-sm">{errors[i].startMonth}</p>}
            </div>

            <div>
              <label>Start Year</label>
              <input
                value={entry.startYear}
                onChange={e => updateEntry(i, 'startYear', e.target.value)}
                className="input"
              />
              {errors[i]?.startYear && <p className="text-red-500 text-sm">{errors[i].startYear}</p>}
            </div>

            <div>
              <label>End Month</label>
              <input
                value={entry.endMonth}
                onChange={e => updateEntry(i, 'endMonth', e.target.value)}
                className="input"
              />
              {errors[i]?.endMonth && <p className="text-red-500 text-sm">{errors[i].endMonth}</p>}
            </div>

            <div>
              <label>End Year</label>
              <input
                value={entry.endYear}
                onChange={e => updateEntry(i, 'endYear', e.target.value)}
                className="input"
              />
              {errors[i]?.endYear && <p className="text-red-500 text-sm">{errors[i].endYear}</p>}
            </div>
          </div>

          {entries.length > 1 && (
            <button
              onClick={() => removeEntry(i)}
              className="mt-4 text-red-600 hover:underline"
            >
              Remove Entry
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addEntry}
        className="mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        + Add Another Education
      </button>

      <button
        onClick={handleNext}
        className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
      >
        Next
      </button>
    </div>
  )
}