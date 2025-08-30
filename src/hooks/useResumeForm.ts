// hooks/useResumeForm.ts

import { useState, useCallback } from 'react';
import { FormData, HeadingData, EducationData, ExperienceData } from '../types/resume';

const initialFormData: FormData = {
  heading: {
    firstName: '',
    surname: '',
    profession: '',
    city: '',
    country: '',
    pin: '',
    phone: '',
    email: '',
    photo: null,
  },
  education: [],
  experience: [],
  skills: [],
  summary: '',
};

export const useResumeForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateHeading = useCallback((newHeading: Partial<HeadingData>) => {
    setFormData(prev => ({
      ...prev,
      heading: { ...prev.heading, ...newHeading }
    }));
  }, []);

  const updateEducation = useCallback((newEducation: EducationData[]) => {
    setFormData(prev => ({
      ...prev,
      education: newEducation
    }));
  }, []);

  const updateExperience = useCallback((newExperience: ExperienceData[]) => {
    setFormData(prev => ({
      ...prev,
      experience: newExperience
    }));
  }, []);

  const updateSkills = useCallback((newSkills: string[]) => {
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  }, []);

  const updateSummary = useCallback((newSummary: string) => {
    setFormData(prev => ({
      ...prev,
      summary: newSummary
    }));
  }, []);

  const calculateCompleteness = useCallback((): number => {
    let completedSections = 0;
    const totalSections = 5;

    // Check heading section
    const heading = formData.heading;
    const headingFields = [
      heading.firstName,
      heading.surname,
      heading.profession,
      heading.city,
      heading.country,
      heading.pin,
      heading.phone,
      heading.email,
    ];
    const filledHeadingFields = headingFields.filter(
      field => field && field.trim() !== ''
    ).length;
    if (filledHeadingFields >= 6) {
      completedSections += 1;
    }

    // Check education section
    if (
      formData.education.length > 0 &&
      formData.education.some(edu => edu.schoolName && edu.schoolName.trim() !== '')
    ) {
      completedSections += 1;
    }

    // Check experience section
    if (
      formData.experience.length > 0 &&
      formData.experience.some(exp => exp.jobTitle && exp.jobTitle.trim() !== '')
    ) {
      completedSections += 1;
    }

    // Check skills section
    if (
      formData.skills.length > 0 &&
      formData.skills.some(skill => skill && skill.trim() !== '')
    ) {
      completedSections += 1;
    }

    // Check summary section
    if (formData.summary && formData.summary.trim() !== '') {
      completedSections += 1;
    }

    return Math.round((completedSections / totalSections) * 100);
  }, [formData]);

  return {
    formData,
    updateHeading,
    updateEducation,
    updateExperience,
    updateSkills,
    updateSummary,
    calculateCompleteness,
  };
};