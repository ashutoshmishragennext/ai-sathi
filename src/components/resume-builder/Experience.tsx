'use client'
import { useResume } from '@/lib/store'
import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'

type ExperienceEntry = {
  role: string
  jobType: string
  companyName: string
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
  const { experience, setExperience, setStep, setActiveSection } = useResume()

  const [entry, setEntry] = useState<ExperienceEntry>({
    role: '',
    jobType: '',
    companyName: '',
    location: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    isCurrent: false,
    description: '',
  })

  useEffect(() => {
    setActiveSection('experience')
  }, [setActiveSection])

  const [errors, setErrors] = useState<ExperienceErrors>({})

  // Dropdown options
  const jobTypeOptions = [
    'Full-time',
    'Part-time',
    'Contract',
    'Temporary',
    'Internship',
    'Freelance',
    'Remote',
    'Hybrid'
  ]

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

  // Get valid end years based on start year
  const getValidEndYears = () => {
    if (!entry.startYear) return years
    const startYearNum = parseInt(entry.startYear)
    return years.filter(year => year >= startYearNum)
  }

  const validate = (): ExperienceErrors => {
    const err: ExperienceErrors = {}
    if (!entry.role.trim()) err.role = 'Required'
    if (!entry.jobType.trim()) err.jobType = 'Required'
    if (!entry.companyName.trim()) err.companyName = 'Required'
    if (!entry.location.trim()) err.location = 'Required'
    if (!entry.startMonth.trim()) err.startMonth = 'Required'
    if (!entry.startYear.trim()) err.startYear = 'Required'
    if (!entry.isCurrent) {
      if (!entry.endMonth?.trim()) err.endMonth = 'Required'
      if (!entry.endYear?.trim()) err.endYear = 'Required'
      
      // Check if end year is before start year
      if (entry.startYear && entry.endYear) {
        const startYearNum = parseInt(entry.startYear)
        const endYearNum = parseInt(entry.endYear)
        if (endYearNum < startYearNum) {
          err.endYear = 'End year cannot be before start year'
        }
      }
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
      const formattedEntry = {
        ...entry,
        startDate: `${entry.startYear}-${entry.startMonth}`,
        endDate: entry.isCurrent ? 'Present' : `${entry.endYear}-${entry.endMonth}`,
        bullets: [],
      }
      setExperience([...experience, formattedEntry])
      setStep(4)
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

  // Handle start year change - reset end year if it becomes invalid
  const handleStartYearChange = (value: string) => {
    const newEntry = { ...entry, startYear: value }
    
    // Reset end year if it's now invalid
    if (entry.endYear && value) {
      const startYearNum = parseInt(value)
      const endYearNum = parseInt(entry.endYear)
      if (endYearNum < startYearNum) {
        newEntry.endYear = ''
        newEntry.endMonth = ''
      }
    }
    
    setEntry(newEntry)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        {/* Main Form Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50 overflow-hidden">
          <div className="p-6 md:p-8">

            {/* Back + Required info header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setStep(3)}
                className="group inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">Back</span>
              </button>

              <p className="text-sm text-slate-500">
                <span className="text-red-500">*</span> Required fields
              </p>
            </div>


            {/* Form Grid */}
            <div className="grid grid-cols-2 gap-6">
             

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Title <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={entry.role || ''}
                  onChange={(e) => setEntry({ ...entry, role: e.target.value })}
                  placeholder="e.g. Software Engineer"
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 ${
                    errors.location ? 'border-red-300 focus:border-red-500 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                  }`}
                />
                {errors.location && (
                  <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.location}
                  </p>
                )}
              </div>

              {/* Job Type Dropdown */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Type <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={entry.jobType || ''}
                  onChange={(e) => setEntry({ ...entry, jobType: e.target.value })}
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-0 ${
                    errors.jobType
                      ? 'border-red-300 focus:border-red-500 bg-red-50/50'
                      : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                  }`}
                >
                  <option value="">Select Job Type</option>
                  {jobTypeOptions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.jobType && (
                  <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.jobType}
                  </p>
                )}
              </div>

              {/* company name */}

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Compnay Name <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={entry.companyName || ''}
                  onChange={(e) => setEntry({ ...entry, companyName: e.target.value })}
                  placeholder="Company Name"
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 ${
                    errors.location ? 'border-red-300 focus:border-red-500 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                  }`}
                />
                {errors.location && (
                  <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.location}
                  </p>
                )}

              </div>

              {/* Location */}

              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Location <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={entry.location || ''}
                  onChange={(e) => setEntry({ ...entry, location: e.target.value })}
                  placeholder="City, State"
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 ${
                    errors.location ? 'border-red-300 focus:border-red-500 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                  }`}
                />
                {errors.location && (
                  <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.location}
                  </p>
                )}
              </div>


              {/* Start Month */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Start Month <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={entry.startMonth || ''}
                  onChange={(e) => setEntry({ ...entry, startMonth: e.target.value })}
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-0 ${
                    errors.startMonth
                      ? 'border-red-300 focus:border-red-500 bg-red-50/50'
                      : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                  }`}
                >
                  <option value="">Select Month</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                {errors.startMonth && (
                  <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.startMonth}
                  </p>
                )}
              </div>

              {/* Start Year */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Start Year <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={entry.startYear || ''}
                  onChange={(e) => handleStartYearChange(e.target.value)}
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-0 ${
                    errors.startYear
                      ? 'border-red-300 focus:border-red-500 bg-red-50/50'
                      : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                  }`}
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.startYear && (
                  <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.startYear}
                  </p>
                )}
              </div>

              {/* End Month */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  End Month
                </label>
                <select
                  value={entry.endMonth || ''}
                  onChange={(e) => setEntry({ ...entry, endMonth: e.target.value })}
                  disabled={entry.isCurrent}
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-0 ${
                    entry.isCurrent ? 'opacity-50 cursor-not-allowed' : ''
                  } ${
                    errors.endMonth
                      ? 'border-red-300 focus:border-red-500 bg-red-50/50'
                      : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                  }`}
                >
                  <option value="">Currently Working</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                {errors.endMonth && (
                  <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.endMonth}
                  </p>
                )}
              </div>

              {/* End Year */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  End Year
                </label>
                <select
                  value={entry.endYear || ''}
                  onChange={(e) => setEntry({ ...entry, endYear: e.target.value })}
                  disabled={entry.isCurrent}
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-0 ${
                    entry.isCurrent ? 'opacity-50 cursor-not-allowed' : ''
                  } ${
                    errors.endYear
                      ? 'border-red-300 focus:border-red-500 bg-red-50/50'
                      : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                  }`}
                >
                  <option value="">Currently Working</option>
                  {getValidEndYears().map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.endYear && (
                  <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.endYear}
                  </p>
                )}
              </div>
            </div>

            {/* Current Job Toggle */}
            <div className="mt-6">
              <button
                onClick={toggleCurrent}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  entry.isCurrent 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {entry.isCurrent ? '✓ Current Role' : 'Set as Current Role'}
              </button>
            </div>

            {/* Job Description */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Job Description <span className="text-red-500 ml-1">*</span>
                <span className="text-xs font-normal text-slate-500 ml-2">(max 60 words)</span>
              </label>
              <textarea
                value={entry.description}
                onChange={e => setEntry({ ...entry, description: e.target.value })}
                placeholder="Describe your key responsibilities and achievements..."
                rows={4}
                className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 resize-none ${
                  errors.description
                    ? 'border-red-300 focus:border-red-500 bg-red-50/50'
                    : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.description}
                </p>
              )}
              <p className="text-xs text-slate-500 mt-1">
                {entry.description.trim().split(/\s+/).filter(word => word.length > 0).length}/60 words
              </p>
            </div>

            {/* Error Summary */}
            {Object.keys(errors).length > 0 && (
              <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-3">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Please complete required fields</p>
                  <p className="text-xs text-red-600 mt-1">All fields marked with * are mandatory</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSubmit}
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