import { create } from 'zustand'
type ResumeStore = {
  step: number
  setStep: (n: number) => void

  template: string
  setTemplate: (name: string) => void

  profile: {
    firstName: string
    surname: string
    city: string
    profession: string
    country: string
    pin: string
    phone: string
    email: string
  }
  setProfile: (data: ResumeStore['profile']) => void

  education: any[]
  experience: any[]
  skills: string[]
  overview: string
  languages: any[]

  setEducation: (data: any[]) => void
  setExperience: (data: any[]) => void
  setSkills: (data: string[]) => void
  setOverview: (data: string) => void
  setLanguages: (data: any[]) => void
}

type ProfileErrors = {
  firstName?: string
  surname?: string
  city?: string
  profession?: string
  country?: string
  pin?: string
  phone?: string
}


export const useResume = create<ResumeStore>((set) => ({

  step: 1,
  setStep: (n: number) => set({ step: n }),

  template: '',
  setTemplate: (name: string) => set({ template: name }),

  profile: {
    firstName: '',
    surname: '',
    city: '',
    profession: '',
    country: '',
    pin: '',
    phone: '',
    email: '',
  },

  setProfile: (data) => set({ profile: data }),

  // Other resume sections
  education: [],
  experience: [],
  skills: [],
  overview: '',
  languages: [],

  setEducation: (data) => set({ education: data }),
  setExperience: (data) => set({ experience: data }),
  setSkills: (data) => set({ skills: data }),
  setOverview: (data) => set({ overview: data }),
  setLanguages: (data) => set({ languages: data }),
}))