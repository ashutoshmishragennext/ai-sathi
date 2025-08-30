/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";

// Types
interface Experience {
  jobTitle: string;
  jobType: string;
  companyName: string;
  location: string;
  jobDescription: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  currentRole: boolean;
}

interface FormData {
  heading: any;
  education: any[];
  experience: Experience[];
  skills: any[];
  summary: string;
}

interface ExperienceTabProps {
  onGoBack?: () => void;
  onNext?: () => void;
  formData?: Experience[];
  updateFormData: (data: Experience[]) => void;
  selectedTemplate?: React.ReactElement<{ formData: FormData }>;
  fullFormData?: any;
}

// Constants
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const jobTypes = [
  "Full-time", "Part-time", "Freelance",
  "Contract", "Internship", "Temporary", "Remote"
];

const emptyExperience: Experience = {
  jobTitle: "",
  jobType: jobTypes[0],
  companyName: "",
  location: "",
  jobDescription: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  currentRole: true,
};

const ExperienceTab: React.FC<ExperienceTabProps> = (props) => {
  const { onGoBack, onNext, formData, updateFormData, selectedTemplate, fullFormData } = props;
  const isEditingMode = !onNext || !onGoBack;
  const [isMobile, setIsMobile] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear + 5 - i);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const experiences = formData && formData.length > 0 ? formData : [{ ...emptyExperience }];

  const isFormValid = (): boolean => {
    return experiences.every((exp) => (
      exp.jobTitle.trim() &&
      exp.companyName.trim() &&
      exp.location.trim() &&
      exp.jobDescription.trim() &&
      exp.startMonth &&
      exp.startYear
    ));
  };

  const handleChange = (idx: number, field: keyof Experience, value: string | boolean) => {
    const updatedExperiences = experiences.map((exp, i) => {
      if (i === idx) {
        const updatedExp = { ...exp, [field]: value };

        if (field === "endMonth" || field === "endYear") {
          if (updatedExp.endMonth || updatedExp.endYear) updatedExp.currentRole = false;
        }
        if (field === "currentRole" && value === true) {
          updatedExp.endMonth = "";
          updatedExp.endYear = "";
        }
        return updatedExp;
      }
      return exp;
    });
    console.log("updatedExperiences", updatedExperiences);
    updateFormData(updatedExperiences);
  };

  const handleAddExperience = () => updateFormData([...experiences, { ...emptyExperience }]);

  const handleSave = () => { if (onNext) onNext(); };

  const renderTemplate = () => {
    if (selectedTemplate && React.isValidElement(selectedTemplate)) {
      return React.cloneElement(selectedTemplate, {
        formData: {
          heading: fullFormData?.heading || {},
          education: fullFormData?.education || [],
          experience: experiences,
          skills: fullFormData?.skills || [],
          summary: fullFormData?.summary || "",
        },
      });
    }
    return (
      <div className="w-full h-full flex items-center justify-center text-6xl">
        <span role="img" aria-label="resume">📄</span>
      </div>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto w-full p-6 md:p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`font-bold flex items-center justify-center text-slate-800 ${isMobile ? "text-2xl" : "text-3xl"}`}>
          Experience
        </h1>
      </div>

      <div className={`flex ${isMobile ? "flex-col gap-6" : "flex-row gap-8"} w-full`}>
        
        {/* Left - Form */}
        <div
          className={`
            bg-gray-50 rounded-2xl shadow-sm
            ${isMobile ? "w-full p-4" : "w-[420px] max-w-[420px] p-6"}
            flex flex-col h-[650px] overflow-y-auto
          `}
        >
          {!isEditingMode && (
            <button
              onClick={onGoBack}
              className="text-blue-600 font-medium text-sm mb-4 flex items-center gap-2"
            >
              ← Go Back
            </button>
          )}

          <h3 className="text-base font-semibold text-slate-800 mb-2">
            Add your professional experience and achievements
          </h3>
          <p className="text-xs text-red-500 mb-4">* indicates a required field</p>

          <div className="flex flex-col gap-6">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                {idx === 0 && (
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="absolute top-3 right-3 bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                )}

                {/* Fields */}
                <div className="flex flex-col gap-4">
                  
                  {/* Job Title + Type */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="font-medium text-xs">Job Title *</label>
                      <input
                        type="text"
                        value={exp.jobTitle}
                        onChange={(e) => handleChange(idx, "jobTitle", e.target.value)}
                        placeholder="e.g., Software Engineer"
                        className="w-full p-2 mt-1 rounded-md border border-gray-300 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="font-medium text-xs">Job Type *</label>
                      <select
                        value={exp.jobType}
                        onChange={(e) => handleChange(idx, "jobType", e.target.value)}
                        className="w-full p-2 mt-1 rounded-md border border-gray-300 text-sm bg-white"
                      >
                        {jobTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Company + Location */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="font-medium text-xs">Company Name *</label>
                      <input
                        type="text"
                        value={exp.companyName}
                        onChange={(e) => handleChange(idx, "companyName", e.target.value)}
                        placeholder="Company Name"
                        className="w-full p-2 mt-1 rounded-md border border-gray-300 text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="font-medium text-xs">Location *</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => handleChange(idx, "location", e.target.value)}
                        placeholder="City, State"
                        className="w-full p-2 mt-1 rounded-md border border-gray-300 text-sm"
                      />
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="font-medium text-xs">Start Month *</label>
                      <select
                        value={exp.startMonth}
                        onChange={(e) => handleChange(idx, "startMonth", e.target.value)}
                        className="w-full p-2 mt-1 rounded-md border border-gray-300 text-sm bg-white"
                      >
                        <option value="">Select month</option>
                        {months.map((m) => <option key={m}>{m}</option>)}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="font-medium text-xs">Start Year *</label>
                      <select
                        value={exp.startYear}
                        onChange={(e) => handleChange(idx, "startYear", e.target.value)}
                        className="w-full p-2 mt-1 rounded-md border border-gray-300 text-sm bg-white"
                      >
                        <option value="">Select year</option>
                        {years.map((y) => <option key={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* End Date */}
                  {!exp.currentRole && (
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="font-medium text-xs">End Month</label>
                        <select
                          value={exp.endMonth}
                          onChange={(e) => handleChange(idx, "endMonth", e.target.value)}
                          className="w-full p-2 mt-1 rounded-md border border-gray-300 text-sm bg-white"
                        >
                          <option value="">Select month</option>
                          {months.map((m) => <option key={m}>{m}</option>)}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="font-medium text-xs">End Year</label>
                        <select
                          value={exp.endYear}
                          onChange={(e) => handleChange(idx, "endYear", e.target.value)}
                          className="w-full p-2 mt-1 rounded-md border border-gray-300 text-sm bg-white"
                        >
                          <option value="">Select year</option>
                          {years.map((y) => <option key={y}>{y}</option>)}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <label className="font-medium text-xs">Job Description *</label>
                    <textarea
                      value={exp.jobDescription}
                      onChange={(e) => handleChange(idx, "jobDescription", e.target.value)}
                      placeholder="Describe your responsibilities, achievements..."
                      rows={4}
                      className="w-full p-2 mt-1 rounded-md border border-gray-300 text-sm resize-y"
                    />
                  </div>

                  {/* Current Role */}
                  <div>
                    <button
                      type="button"
                      onClick={() => handleChange(idx, "currentRole", !exp.currentRole)}
                      className={`
                        w-full py-2 rounded-full font-medium text-sm transition
                        ${exp.currentRole
                          ? "border-2 border-blue-600 bg-blue-50 text-blue-600"
                          : "border border-gray-300 bg-white text-gray-700"}
                      `}
                    >
                      {exp.currentRole ? "✓ Currently Working" : "Set as Current Role"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Validation */}
          <div className={`mt-4 text-xs flex items-center gap-1 p-2 rounded-md border ${isFormValid()
              ? "text-green-600 bg-green-50 border-green-200"
              : "text-red-500 bg-red-50 border-red-200"}`}>
            {isFormValid() ? "✓ All experience fields are complete" : "⚠ Please fill all required experience fields"}
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6">
            {isEditingMode ? (
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-600 text-white font-semibold text-sm rounded-full py-2 px-6"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                disabled={!isFormValid()}
                className={`font-semibold text-sm rounded-full py-2 px-6 transition
                  ${isFormValid()
                    ? "bg-purple-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                {isFormValid() ? "Next" : "Fill Required Fields"}
              </button>
            )}
          </div>
        </div>

        {/* Right - Template Preview */}
        {!isMobile && (
          <div className="flex-1 overflow-auto rounded-xl border bg-white shadow-sm p-4">
            {renderTemplate()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceTab;
