import { create } from 'zustand'

type ResumeStore = {
  step: number
  setStep: (n: number) => void

  template: 'classic' | 'modern'
  setTemplate: (name: 'classic' | 'modern') => void

  heading: {
    firstName: string
    surName: string
    city: string
    profession: string
    country: string
    pin: string
    phone: string
    email: string
  }
  setHeading: (data: ResumeStore['heading']) => void

  education: {
    school: string
    location: string
    fieldOfStudy: string
    percentage: string
    startMonth: string
    startYear: string
    endMonth: string
    endYear: string
  }[]
  setEducation: (data: ResumeStore['education']) => void

  experience: {
    companyName: string
    role: string
    jobType: string
    location: string
    startDate: string
    endDate: string
    description: string
    bullets: string[]
  }[]
  setExperience: (data: ResumeStore['experience']) => void

  skills: string[]
  setSkills: (data: string[]) => void

  overview: string
  setOverview: (data: string) => void

  languages: string[]
  setLanguages: (data: string[]) => void

  activeSection: 'profile' | 'skills' | 'education' | 'experience' | 'overview' | null
  setActiveSection: (section: ResumeStore['activeSection']) => void
}

export const useResume = create<ResumeStore>((set) => ({
  step: 1,
  setStep: (n) => set((prev) => ({ ...prev, step: n })),

  template: 'classic',
  setTemplate: (name) => set((prev) => ({ ...prev, template: name })),

  heading: {
    firstName: '',
    surName: '',
    city: '',
    profession: '',
    country: '',
    pin: '',
    phone: '',
    email: '',
  },
  setHeading: (data) => set((prev) => ({ ...prev, heading: data })),

  education: [
    {
      school: '',
      location: '',
      fieldOfStudy: '',
      percentage: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
    },
  ],
  setEducation: (data) => set((prev) => ({ ...prev, education: data })),

  experience: [
    {
      companyName: '',
      role: '',
      jobType: '',
      location: ', ',
      startDate: '',
      endDate: '',
      description:
        '',
      bullets: [
        '',
      ],
    },
  ],
  setExperience: (data) => set((prev) => ({ ...prev, experience: data })),

  skills: [
    
  ],
  setSkills: (data) => set((prev) => ({ ...prev, skills: data })),

  overview:
    '',
  setOverview: (data) => set((prev) => ({ ...prev, overview: data })),

  languages: ['English', 'Hindi'],
  setLanguages: (data) => set((prev) => ({ ...prev, languages: data })),

  activeSection: null,
  setActiveSection: (section) => set((prev) => ({ ...prev, activeSection: section })),
})) 