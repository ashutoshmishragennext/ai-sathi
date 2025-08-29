import { z } from 'zod'

export const EducationSchema = z.object({
  school: z.string().min(1),
  degree: z.string().min(1),
  startYear: z.string().min(1),
  endYear: z.string().min(1),
})

export type Education = z.infer<typeof EducationSchema>

export const ExperienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  start: z.string().min(1),
  end: z.string().min(1),
  bullets: z.array(z.string()).default([]),
})

export type Experience = z.infer<typeof ExperienceSchema>

export const ProfileSchema = z.object({
  fullName: z.string().min(1),
  title: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  location: z.string().min(1),
  summary: z.string().min(10),
})

export type Profile = z.infer<typeof ProfileSchema>

export const RootSchema = z.object({
  template: z.enum(['classic', 'modern']).default('classic'),
  profile: ProfileSchema,
  education: z.array(EducationSchema).default([]),
  experience: z.array(ExperienceSchema).default([]),
  skills: z.array(z.string()).default([]),
  careerOverview: z.string().optional(),
})

export type Root = z.infer<typeof RootSchema>