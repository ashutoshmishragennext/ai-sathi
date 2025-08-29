'use client'
import { useResume } from '@/lib/store'
import { useState } from 'react'

export default function CareerOverview() {
  const { overview, setOverview, setStep } = useResume()
  const [text, setText] = useState(overview || '')
  const [error, setError] = useState('')

  const handleNext = () => {
    if (text.trim().length < 6) {
      setError('Minimum 6 characters required')
      return
    }
    setOverview(text.trim())
    // setStep(7) 
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Career Overview</h2>

      <label className="block mb-2">Write a brief career summary</label>
      <textarea
        value={text}
        onChange={e => {
          setText(e.target.value)
          if (e.target.value.trim().length >= 6) setError('')
        }}
        placeholder="E.g. Passionate frontend developer with 3+ years of experience..."
        className="input h-32 resize-none"
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <button
        onClick={handleNext}
        className="mt-6 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
      >
        Next
      </button>
    </div>
  )
}