
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HeadingData {
  firstName: string;
  surname: string;
  profession: string;
  city: string;
  country: string;
  pin: string;
  phone: string;
  email: string;
  photo: File | null;
}

export interface EducationData {
  id: string;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  gradMonth: string;
  gradYear: string;
  endMonth: string;
  endYear: string;
  endDate: string;
  grade: string;
  description: string;
}

export interface ExperienceData {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  endMonth: string;
  endYear: string;
  startMonth: string;
  startYear: string;
  startDate: string;
  endDate: string;
  current: boolean;
  jobDescription: string;
}

export interface FormData {
  heading: HeadingData;
  education: EducationData[];
  experience: ExperienceData[];
  skills: string[];
  summary: string;
}

export interface Step {
  number: number;
  label: string;
}

export interface TabProps {
  selectedTemplate?: React.ReactElement;
  onNext?: () => void;
  onGoBack?: () => void;
  formData: any;
  updateFormData: (data: any) => void;
  fullFormData?: FormData;
}

export interface TemplateProps {
  formData?: FormData;
}