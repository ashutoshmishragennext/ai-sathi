'use client'
import { useResume } from '@/lib/store'
import { useState, useEffect } from 'react'
import { ArrowLeft, Plus, X, Lightbulb } from 'lucide-react'

export default function SkillsTab() {
  const { skills, setSkills, setStep, setActiveSection } = useResume()

  const [input, setInput] = useState('')
  const [localSkills, setLocalSkills] = useState<string[]>(skills)
  const [error, setError] = useState('')

  useEffect(() => {
    setActiveSection('skills')
  }, [setActiveSection])

  const handleAdd = () => {
    const trimmed = input.trim()
    if (!trimmed) {
      setError('Please enter a skill')
      return
    }
    if (localSkills.some(skill => skill.toLowerCase() === trimmed.toLowerCase())) {
      setError('This skill is already added')
      return
    }
    if (trimmed.length > 30) {
      setError('Skill name should be less than 30 characters')
      return
    }
    
    setLocalSkills([...localSkills, trimmed])
    setInput('')
    setError('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  const handleRemove = (skill: string) => {
    setLocalSkills(localSkills.filter(s => s !== skill))
    setError('')
  }

  const handleNext = () => {
    if (localSkills.length === 0) {
      setError('Please add at least one skill')
      return
    }
    setSkills(localSkills)
    setStep(5)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    if (error) setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-3xl mx-auto p-4 md:p-8">

        {/* Main Form Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50 overflow-hidden">
          <div className="p-6 md:p-8">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setStep(3)}
                className="group inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">Back</span>
              </button>

              <p className="text-sm text-slate-500">
                <span className="text-red-500">*</span> At least one skill required
              </p>
            </div>

            {/* Add Skill Input */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Add New Skill <span className="text-red-500">*</span>
              </label>
              
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g. React, Python, Project Management"
                    className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 ${
                      error
                        ? 'border-red-300 focus:border-red-500 bg-red-50/50'
                        : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                    }`}
                  />
                </div>
                
                <button
                  onClick={handleAdd}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/25 flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  {error}
                </p>
              )}
            </div>

            {/* Skills List */}
            {localSkills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">
                  Added Skills ({localSkills.length})
                </h3>
                
                <div className="grid gap-3">
                  {localSkills.map((skill, i) => (
                    <div
                      key={i}
                      className="bg-white/60 border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-white/80 hover:border-slate-300 transition-all duration-200"
                    >
                      <span className="font-medium text-slate-800">{skill}</span>
                      <button
                        onClick={() => handleRemove(skill)}
                        className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all duration-200 flex items-center justify-center"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Summary */}
            {error && localSkills.length === 0 && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-3">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Skills Required</p>
                  <p className="text-xs text-red-600 mt-1">Please add at least one skill to continue</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/25"
              >
                Continue
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}