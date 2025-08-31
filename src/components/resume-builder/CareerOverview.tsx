'use client'
import { useResume } from '@/lib/store'
import { useState, useEffect } from 'react'
import { ArrowLeft, FileText, User } from 'lucide-react'

export default function CareerOverview() {
  const { overview, setOverview, setStep, setActiveSection } = useResume()

  const [text, setText] = useState(overview || '')
  const [error, setError] = useState('')

  useEffect(() => {
    setActiveSection('overview')
  }, [setActiveSection])

  const handleNext = () => {
    const trimmed = text.trim()
    if (trimmed.length < 6) {
      setError('Minimum 6 characters required')
      return
    }
    setOverview(trimmed)
    setStep(6) // Move to next section
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    if (e.target.value.trim().length >= 6) setError('')
  }

  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length
  const charCount = text.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-3xl mx-auto p-4 md:p-8">

        {/* Main Form Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50 overflow-hidden">
          <div className="p-6 md:p-8">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setStep(4)}
                className="group inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">Back</span>
              </button>

              <p className="text-sm text-slate-500">
                <span className="text-red-500">*</span> Minimum 6 characters
              </p>
            </div>

            {/* Textarea Section */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Professional Summary <span className="text-red-500">*</span>
              </label>
              
              <div className="relative">
                <textarea
                  value={text}
                  onChange={handleInputChange}
                  placeholder="E.g. Passionate frontend developer with 3+ years of experience creating responsive web applications. Skilled in React, TypeScript, and modern development practices. Proven track record of delivering high-quality user experiences..."
                  className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 resize-none h-40 scrollbar-hide ${
                    error
                      ? 'border-red-300 focus:border-red-500 bg-red-50/50'
                      : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                  }`}
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                />
                
                {/* Character/Word Counter */}
                {/* <div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-slate-400">
                  <span>{charCount} chars</span>
                  <span>•</span>
                  <span>{wordCount} words</span>
                </div> */}
              </div>

              {error && (
                <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  {error}
                </p>
              )}

              {/* Helpful Tips */}
              {/* <div className="mt-4 p-4 bg-blue-50/50 border border-blue-200/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-blue-900 mb-1">Writing Tips</p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Highlight your key skills and experience</li>
                      <li>• Mention your years of experience</li>
                      <li>• Include 2-3 of your strongest technical skills</li>
                      <li>• Keep it concise but impactful</li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Error Summary */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-3">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Summary Too Short</p>
                  <p className="text-xs text-red-600 mt-1">Please write at least 6 characters for your career overview</p>
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