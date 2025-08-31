'use client'
import { useResume } from '@/lib/store'
import { useState, useEffect } from 'react'
import { Camera, ArrowLeft } from 'lucide-react'

export default function Profile() {
  const { heading, setHeading, setStep, setActiveSection } = useResume()
  const [form, setForm] = useState({ ...heading })

  useEffect(() => {
    setActiveSection('profile')
  }, [setActiveSection])

  type ProfileErrors = {
    firstName?: string
    surName?: string
    city?: string
    profession?: string
    country?: string
    pin?: string
    phone?: string
  }

  const [errors, setErrors] = useState<ProfileErrors>({})

  const validate = () => {
    const newErrors: ProfileErrors = {}
    if (!form.firstName?.trim()) newErrors.firstName = 'Required'
    if (!form.surName?.trim()) newErrors.surName = 'Required'
    if (!form.city?.trim()) newErrors.city = 'Required'
    if (!form.profession?.trim()) newErrors.profession = 'Required'
    if (!form.country?.trim()) newErrors.country = 'Required'
    if (!form.pin?.match(/^\d{6}$/)) newErrors.pin = '6-digit pin required'
    if (!form.phone?.match(/^\d{10}$/)) newErrors.phone = '10-digit phone required'
    return newErrors
  }

  const handleSubmit = () => {
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setHeading(form)
      setStep(2)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-3xl mx-auto p-4 md:p-8">

        {/* Main Form Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50 overflow-hidden">
          <div className="p-6 md:p-8">

            {/* Back + Required info ek hi section */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setStep(0)}
                className="group inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">Back</span>
              </button>

              <p className="text-sm text-slate-500">
                <span className="text-red-500">*</span> Required fields
              </p>
            </div>

            {/* Profile Photo Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center">
                    <span className="text-4xl">👤</span>
                  </div>
                </div>
                
                <label className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-3 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <Camera size={18} />
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>
              <p className="text-sm text-slate-500 mt-3 font-medium">
                Upload profile photo
              </p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'First Name', key: 'firstName', required: true, placeholder: 'e.g. Sumit' },
                { label: 'Surname', key: 'surName', required: true, placeholder: 'e.g. Raman' },
                { label: 'Profession', key: 'profession', required: true, placeholder: 'e.g. Software Engineer' },
                { label: 'City', key: 'city', required: true, placeholder: 'e.g. Noida' },
                { label: 'Country', key: 'country', required: true, placeholder: 'e.g. India' },
                { label: 'Pin Code', key: 'pin', required: true, placeholder: 'e.g. 201102' },
                { label: 'Phone', key: 'phone', required: true, placeholder: 'e.g. +91 98765 43210' },
                { label: 'Email', key: 'email', required: false, placeholder: 'e.g. aaryasharma@gmail.com' },
              ].map(({ label, key, required, placeholder }) => (
                <div key={key} className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  <div className="relative">
                    <input
                      type="text"
                      value={form[key as keyof typeof form] || ''}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      className={`w-full bg-white/50 border-2 transition-all duration-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 ${
                        errors[key as keyof ProfileErrors]
                          ? 'border-red-300 focus:border-red-500 bg-red-50/50'
                          : 'border-slate-200 focus:border-blue-500 focus:bg-white/80'
                      }`}
                    />
                  </div>
                  
                  {errors[key as keyof ProfileErrors] && (
                    <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors[key as keyof ProfileErrors]}
                    </p>
                  )}
                </div>
              ))}
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
