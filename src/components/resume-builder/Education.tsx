'use client'
import { useResume } from '@/lib/store'
import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'

type EducationEntry = {
  school: string
  location: string
  fieldOfStudy: string
  percentage: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
  isCurrentlyStudying?: boolean
}

type EducationErrors = Partial<Record<keyof EducationEntry, string>>

export default function Education() {
  const { education, setEducation, setStep, setActiveSection } = useResume()

  const [form, setForm] = useState<EducationEntry>(
    education[0] || {
      school: '',
      location: '',
      fieldOfStudy: '',
      percentage: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      isCurrentlyStudying: false
    }
  )

  useEffect(() => {
    setActiveSection('education')
  }, [setActiveSection])

  const [errors, setErrors] = useState<EducationErrors>({})

  // Dropdown options

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

  // Get valid end years based on start year
  const getValidEndYears = () => {
    if (!form.startYear) return years
    const startYearNum = parseInt(form.startYear)
    return years.filter(year => year >= startYearNum)
  }

  const validate = () => {
    const err: EducationErrors = {}
    if (!form.school.trim()) err.school = 'Required'
    if (!form.location.trim()) err.location = 'Required'
    if (!form.fieldOfStudy.trim()) err.fieldOfStudy = 'Required'
    if (!form.percentage.trim()) {
      err.percentage = 'Required'
    } else {
      const percentageNum = parseFloat(form.percentage.replace('%', ''))
      if (isNaN(percentageNum) || percentageNum > 100) {
        err.percentage = 'Percentage cannot be above 100'
      }
    }
    if (!form.startMonth.trim()) err.startMonth = 'Required'
    if (!form.startYear.trim()) err.startYear = 'Required'
    
    // Only validate end date if not currently studying
    if (!form.isCurrentlyStudying) {
      if (!form.endMonth.trim()) err.endMonth = 'Required'
      if (!form.endYear.trim()) err.endYear = 'Required'
      
      // Check if end year is before start year
      if (form.startYear && form.endYear) {
        const startYearNum = parseInt(form.startYear)
        const endYearNum = parseInt(form.endYear)
        if (endYearNum < startYearNum) {
          err.endYear = 'End year cannot be before start year'
        }
      }
    }
    
    return err
  }

  const handleSubmit = () => {
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      // Set isCurrentlyStudying flag if end dates are not provided
      const finalForm = {
        ...form,
        isCurrentlyStudying: !form.endMonth || !form.endYear
      }
      setEducation([finalForm])
      setStep(3)
    }
  }

  // Handle start year change - reset end year if it becomes invalid
  const handleStartYearChange = (value: string) => {
    const newForm = { ...form, startYear: value }
    
    // Reset end year if it's now invalid
    if (form.endYear && value) {
      const startYearNum = parseInt(value)
      const endYearNum = parseInt(form.endYear)
      if (endYearNum < startYearNum) {
        newForm.endYear = ''
        newForm.endMonth = ''
      }
    }
    
    setForm(newForm)
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
                onClick={() => setStep(2)}
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
              {/* School Name */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  School Name <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={form.school || ''}
                  onChange={(e) => setForm({ ...form, school: e.target.value })}
                  placeholder="e.g. University of Delhi"
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 ${
                    errors.school ? 'border-red-300 focus:border-red-500 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                  }`}
                />
                {errors.school && (
                  <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.school}
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
                  value={form.location || ''}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. New Delhi"
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

              {/* Field of Study */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Field of Study <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={form.fieldOfStudy || ''}
                  onChange={(e) => setForm({ ...form, fieldOfStudy: e.target.value })}
                  placeholder="e.g. Computer Science"
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 ${
                    errors.fieldOfStudy ? 'border-red-300 focus:border-red-500 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                  }`}
                />
                {errors.fieldOfStudy && (
                  <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.fieldOfStudy}
                  </p>
                )}
              </div>

              {/* Percentage */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Percentage <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={form.percentage || ''}
                  onChange={(e) => setForm({ ...form, percentage: e.target.value })}
                  placeholder="e.g. 85%"
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 ${
                    errors.percentage ? 'border-red-300 focus:border-red-500 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                  }`}
                />
                {errors.percentage && (
                  <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors.percentage}
                  </p>
                )}
              </div>

              {/* Start Month */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Start Month <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={form.startMonth || ''}
                  onChange={(e) => setForm({ ...form, startMonth: e.target.value })}
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-0 ${
                    errors.startMonth ? 'border-red-300 focus:border-red-500 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
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
                  value={form.startYear || ''}
                  onChange={(e) => handleStartYearChange(e.target.value)}
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-0 ${
                    errors.startYear ? 'border-red-300 focus:border-red-500 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
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
                  value={form.endMonth || ''}
                  onChange={(e) => setForm({ ...form, endMonth: e.target.value })}
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-0 ${
                    errors.endMonth ? 'border-red-300 focus:border-red-500 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                  }`}
                >
                  <option value="">Currently Studying</option>
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
                  value={form.endYear || ''}
                  onChange={(e) => setForm({ ...form, endYear: e.target.value })}
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-0 ${
                    errors.endYear ? 'border-red-300 focus:border-red-500 bg-red-50/50' : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                  }`}
                >
                  <option value="">Currently Studying</option>
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