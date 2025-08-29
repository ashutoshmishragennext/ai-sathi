'use client'
import { useResume } from '@/lib/store'
import { useState } from 'react'

export default function Profile() {
  const { profile, setProfile, setStep,  } = useResume()

  const [form, setForm] = useState({
    firstName: profile.firstName.split(' ')[0] || '',
    surname: profile.surname.split(' ')[1] || '',
    city: profile.city || '',
    profession: '',
    country: '',
    pin: '',
    phone: profile.phone || '',
    email: profile.email || '',
  })
type ProfileErrors = {
  firstName?: string
  surname?: string
  city?: string
  profession?: string
  country?: string
  pin?: string
  phone?: string
}
const [errors, setErrors] = useState<ProfileErrors>({})
  const validate = () => {
    const newErrors: any = {}
    if (!form.firstName.trim()) newErrors.firstName = 'Required'
    if (!form.surname.trim()) newErrors.surname = 'Required'
    if (!form.city.trim()) newErrors.city = 'Required'
    if (!form.profession.trim()) newErrors.profession = 'Required'
    if (!form.country.trim()) newErrors.country = 'Required'
    if (!form.pin.match(/^\d{6}$/)) newErrors.pin = '6-digit pin required'
    if (!form.phone.match(/^\d{10}$/)) newErrors.phone = '10-digit phone required'
    return newErrors
  }

  const handleSubmit = () => {
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setProfile({
        firstName: form.firstName,
        surname: form.surname,
        phone: form.phone,
        city: form.city,
        profession: form.profession,
        country: form.country,
        pin: form.pin,
        email: form.email
        
      })
      setStep(2) // Move to Education step
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>First Name</label>
          <input
            value={form.firstName}
            onChange={e => setForm({ ...form, firstName: e.target.value })}
            className="input"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        <div>
          <label>Surname</label>
          <input
            value={form.surname}
            onChange={e => setForm({ ...form, surname: e.target.value })}
            className="input"
          />
          {errors.surname && <p className="text-red-500 text-sm">{errors.surname}</p>}
        </div>

        <div>
          <label>City</label>
          <input
            value={form.city}
            onChange={e => setForm({ ...form, city: e.target.value })}
            className="input"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        <div>
          <label>Profession</label>
          <input
            value={form.profession}
            onChange={e => setForm({ ...form, profession: e.target.value })}
            className="input"
          />
          {errors.profession && <p className="text-red-500 text-sm">{errors.profession}</p>}
        </div>

        <div>
          <label>Country</label>
          <input
            value={form.country}
            onChange={e => setForm({ ...form, country: e.target.value })}
            className="input"
          />
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>

        <div>
          <label>Pin Code</label>
          <input
            value={form.pin}
            onChange={e => setForm({ ...form, pin: e.target.value })}
            className="input"
          />
          {errors.pin && <p className="text-red-500 text-sm">{errors.pin}</p>}
        </div>

        <div>
          <label>Phone Number</label>
          <input
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="input"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div>
          <label>Email (optional)</label>
          <input
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="input"
          />
        </div>
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