/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';

// Define types
interface EducationItem {
  id: string;
  schoolName: string;
  schoolLocation: string;
  fieldOfStudy: string;
  percentage: string;
  gradMonth: string;
  gradYear: string;
  endMonth: string;
  endYear: string;
  coursework: string;
}

interface TemplateProps {
  formData: FormData;
  onLogout?: () => void;
}

interface HeadingData {
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

interface ExperienceItem {
  id: string;
  jobTitle: string;
  employer: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface FormData {
  heading: HeadingData;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: string[];
  summary: string;
}

interface EducationTabProps {
  onGoBack?: () => void;
  onNext?: () => void;
  formData: EducationItem[];
  updateFormData: (data: EducationItem[]) => void;
  selectedTemplate: React.ReactElement<TemplateProps>;
  fullFormData: FormData;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() + 5 - i);

const emptyEducation: EducationItem = {
  id: Date.now().toString(),
  schoolName: '',
  schoolLocation: '',
  fieldOfStudy: '',
  percentage: '',
  gradMonth: '',
  gradYear: '',
  endMonth: '',
  endYear: '',
  coursework: '',
};

const EducationTab: React.FC<EducationTabProps> = (props) => {
  const { onGoBack, onNext, formData, updateFormData, selectedTemplate, fullFormData } = props;
  const isEditingMode = !onNext || !onGoBack;
  const [showCoursework, setShowCoursework] = useState<boolean[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize showCoursework state based on formData
  useEffect(() => {
    setShowCoursework(formData.map(() => false));
  }, [formData.length]);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const educations = formData && formData.length > 0 ? formData : [{ ...emptyEducation }];

  // Validation function
  const isFormValid = (): boolean => {
    return educations.every(education => {
      return (
        education.schoolName.trim() !== '' &&
        education.schoolLocation.trim() !== '' &&
        education.fieldOfStudy.trim() !== '' &&
        education.percentage.trim() !== '' &&
        education.gradMonth !== '' &&
        education.gradYear !== ''
      );
    });
  };

  const handleChange = (idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log("dataaa", name, value);
    const updatedEducations = educations.map((ed, i) => 
      i === idx ? { ...ed, [name]: value } : ed
    );
    updateFormData(updatedEducations);
  };

  const handleAddEducation = () => {
    const newEducations = [...educations, { ...emptyEducation, id: Date.now().toString() }];
    updateFormData(newEducations);
    setShowCoursework((prev) => [...prev, false]);
  };

  const handleRemoveEducation = (idx: number) => {
    if (educations.length > 1) {
      const updatedEducations = educations.filter((_, i) => i !== idx);
      updateFormData(updatedEducations);
      setShowCoursework((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const handleToggleCoursework = (idx: number) => {
    setShowCoursework((prev) => prev.map((v, i) => i === idx ? !v : v));
  };

  const handleSave = () => {
    if (onNext) {
      onNext();
    }
  };

  const renderTemplate = () => {
    if (selectedTemplate && React.isValidElement(selectedTemplate)) {
      return React.cloneElement(selectedTemplate, { 
        formData: { 
          heading: fullFormData?.heading || {}, 
          education: educations, 
          experience: fullFormData?.experience || [], 
          skills: fullFormData?.skills || [], 
          summary: fullFormData?.summary || '' 
        } 
      });
    }
    return (
      <div className="w-full h-full flex items-center justify-center text-6xl">
        <span role="img" aria-label="resume">📄</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 w-full box-border">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Education</h1>
      </div>

      {/* Main container */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-6 w-full`}>
        
        {/* Left Form Section */}
        <div className={`
          bg-gray-50 rounded-xl p-6 shadow-sm box-border
          ${isMobile ? 'w-full h-auto' : 'w-[420px] h-[600px] overflow-y-auto'}
        `}>
          {!isEditingMode && onGoBack && (
            <button
              onClick={onGoBack}
              className="text-blue-600 text-sm font-semibold cursor-pointer flex items-center gap-2 mb-4"
            >
              <span>←</span> Go Back
            </button>
          )}
          
          <div className="relative">
            <h3 className="text-lg font-semibold text-slate-800 mb-1">
              Add your educational qualifications
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Include your degrees, certifications, and academic achievements
            </p>

            <div className="absolute -top-6 right-0 text-xs font-medium text-red-500">
              * Required
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-blue-50 rounded-xl p-4 shadow-sm box-border">
                {educations.map((education, idx) => (
                  <div key={education.id} className="mb-6 last:mb-0">
                    {/* Education Entry Header */}
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-semibold text-slate-700">
                        Education {idx + 1}
                      </h4>
                      <div className="flex items-center gap-2">
                        {educations.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveEducation(idx)}
                            className="bg-red-500 text-white rounded px-3 py-1.5 text-xs font-semibold"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-3">
                      {/* Row 1 - School and Location */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-xs text-slate-700">
                            School/University *
                          </label>
                          <input
                            type="text"
                            name="schoolName"
                            value={education.schoolName}
                            onChange={(e) => handleChange(idx, e)}
                            placeholder="Enter school/university"
                            className="w-full p-2 mt-1 rounded border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-xs text-slate-700">
                            Location *
                          </label>
                          <input
                            type="text"
                            name="schoolLocation"
                            value={education.schoolLocation}
                            onChange={(e) => handleChange(idx, e)}
                            placeholder="City, State"
                            className="w-full p-2 mt-1 rounded border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Row 2 - Degree and Percentage */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-xs text-slate-700">
                            Degree & Field of Study *
                          </label>
                          <input
                            type="text"
                            name="fieldOfStudy"
                            value={education.fieldOfStudy}
                            onChange={(e) => handleChange(idx, e)}
                            placeholder="e.g., B.Tech Computer Science"
                            className="w-full p-2 mt-1 rounded border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-xs text-slate-700">
                            Grade/Percentage *
                          </label>
                          <input
                            type="text"
                            name="percentage"
                            value={education.percentage}
                            onChange={(e) => handleChange(idx, e)}
                            placeholder="e.g., 85% or 8.5 CGPA"
                            className="w-full p-2 mt-1 rounded border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Row 3 - Start Date */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-xs text-slate-700">
                            Start Month *
                          </label>
                          <select
                            name="gradMonth"
                            value={education.gradMonth}
                            onChange={(e) => handleChange(idx, e)}
                            className="w-full p-2 mt-1 rounded border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select month</option>
                            {months.map((month) => (
                              <option key={month} value={month}>{month}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="font-semibold text-xs text-slate-700">
                            Start Year *
                          </label>
                          <select
                            name="gradYear"
                            value={education.gradYear}
                            onChange={(e) => handleChange(idx, e)}
                            className="w-full p-2 mt-1 rounded border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Row 4 - End Date */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-xs text-slate-700">
                            End Month
                          </label>
                          <select
                            name="endMonth"
                            value={education.endMonth}
                            onChange={(e) => handleChange(idx, e)}
                            className="w-full p-2 mt-1 rounded border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select month</option>
                            {months.map((month) => (
                              <option key={month} value={month}>{month}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="font-semibold text-xs text-slate-700">
                            End Year
                          </label>
                          <select
                            name="endYear"
                            value={education.endYear}
                            onChange={(e) => handleChange(idx, e)}
                            className="w-full p-2 mt-1 rounded border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Coursework Toggle */}
                      <div>
                        <button
                          type="button"
                          className="text-blue-600 font-medium text-sm mb-2 flex items-center gap-1"
                          onClick={() => handleToggleCoursework(idx)}
                        >
                          {showCoursework[idx] ? '▼ Hide extra courses' : '▶ Add extra courses'}
                        </button>
                        {showCoursework[idx] && (
                          <div className="bg-white rounded-lg p-3 border border-blue-200">
                            <textarea
                              name="coursework"
                              value={education.coursework}
                              onChange={(e) => handleChange(idx, e)}
                              placeholder="List additional coursework, certifications, projects..."
                              rows={3}
                              className="w-full p-2 rounded border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                            <div className="mt-2 text-xs text-gray-600">
                              💡 <b>Tip:</b> Include online courses, workshops, certifications, or relevant projects.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Divider between education entries */}
                    {idx < educations.length - 1 && (
                      <div className="border-b border-gray-200 my-4"></div>
                    )}
                  </div>
                ))}

                {/* Add Education Button */}
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="bg-blue-600 text-white rounded px-5 py-2 text-sm font-semibold mt-3 flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  + Add Education
                </button>

                {/* Validation Status */}
                <div className={`mt-3 text-xs flex items-center gap-1.5 ${
                  isFormValid() ? 'text-green-500' : 'text-red-500'
                }`}>
                  {isFormValid() ? (
                    <>
                      <span>✓</span>
                      <span>All education fields are complete</span>
                    </>
                  ) : (
                    <>
                      <span>⚠</span>
                      <span>Please fill all required fields</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            {isEditingMode ? (
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-600 text-white font-bold rounded-full px-8 py-2 text-base hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                disabled={!isFormValid()}
                className={`font-bold rounded-full px-8 py-2 text-base border-none
                  ${
                    isFormValid()
                      ? 'bg-purple-700 text-white cursor-pointer hover:bg-purple-800'
                      : 'bg-gray-400 text-white cursor-not-allowed opacity-60'
                  } transition-all duration-200`}
              >
                {isFormValid() ? 'Next' : 'Fill Required Fields'}
              </button>
            )}
          </div>
        </div>

        {/* Right Template Preview */}
        {!isMobile && (
          <div className="flex-1 overflow-auto rounded-xl border bg-white shadow-sm p-4">
            {renderTemplate()}
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationTab;