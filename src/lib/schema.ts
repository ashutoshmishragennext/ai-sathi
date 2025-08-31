import { z } from 'zod'

export const EducationSchema = z.object({
  school: z.string().min(1).default('Oxford Software Institute'),
  fieldOfStudy: z.string().min(1).default('Financial Accounting'),
  percentage: z.string().default('85'),
  location: z.string().default('New Delhi, India'),
  startMonth: z.string().default('June'),
  endMonth: z.string().default('June'),
  startYear: z.string().min(1).default('2016'),
  endYear: z.string().min(1).default('2016'),
})

export type Education = z.infer<typeof EducationSchema>

export const ExperienceSchema = z.object({
  company: z.string().min(1).default('H&M'),
  role: z.string().min(1).default('Retail Sales Associate'),
  startDate: z.string().min(1).default('2016-05'),
  endDate: z.string().min(1).default('Present'),
  location: z.string().default('New Delhi, India'),
  bullets: z.array(z.string()).default([
    'Effectively upsold products by introducing accessories and add-ons',
    'Generated brand awareness and increased sales by 22%',
    'Used consultative sales approach to understand customer needs',
  ]),
})

export type Experience = z.infer<typeof ExperienceSchema>

export const HeadingSchema = z.object({
  firstName: z.string().default('Ramesh'),
  surName: z.string().default('Pathak'),
  profession: z.string().min(1).default('Retail Sales Associate'),
  email: z.string().email().default('ramesh.pathak@example.com'),
  city: z.string().default('New Delhi'),
  phone: z.string().min(6).default('9812345678'),
  country: z.string().min(1).default('India'),
  pin: z.string().max(7).default('110034'),
})

export type Profile = z.infer<typeof HeadingSchema>

export const SkillSchema = z.object({
  name: z.string().default('Sales Expertise'),
})

export type Skill = z.infer<typeof SkillSchema>

export const RootSchema = z.object({
  template: z.enum(['classic', 'modern']).default('classic'),
  heading: HeadingSchema.default(HeadingSchema.parse({})),
  education: z.array(EducationSchema).default([EducationSchema.parse({})]),
  experience: z.array(ExperienceSchema).default([ExperienceSchema.parse({})]),
  skills: z.array(z.string()).default([
    'Store opening and closing',
    'Sales expertise',
    'Accurate Money Handling',
    'Loss prevention',
    'Product promotions',
    'Guest Services',
  ]),
  careerOverview: z.string().optional().default(
    'Motivated Sales Associate with 5 years of experience boosting sales and customer loyalty through individualized service. Resourceful expert at learning customer needs, directing to desirable merchandise and upselling to meet sales quotas.'
  ),
})

export type Root = z.infer<typeof RootSchema>