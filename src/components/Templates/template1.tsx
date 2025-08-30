// components/templates/Template1.tsx
'use client'
import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { FormData } from '../../types/resume';

interface Template1Props {
  formData?: FormData;
  onEditSummary?: () => void;
  onEditEducation?: () => void;
  onEditExperience?: () => void;
  onEditSkills?: () => void;
  onEditContact?: () => void;
}

const Template1: React.FC<Template1Props> = ({
  formData,
  onEditSummary,
  onEditEducation,
  onEditExperience,
  onEditSkills,
  onEditContact,
}) => {
  // Hover states for edit buttons
  const [summaryHovered, setSummaryHovered] = useState(false);
  const [educationHovered, setEducationHovered] = useState(false);
  const [experienceHovered, setExperienceHovered] = useState(false);
  const [skillsHovered, setSkillsHovered] = useState(false);
  const [contactHovered, setContactHovered] = useState(false);
  const [photoHovered, setPhotoHovered] = useState(false);

  // If no formData is provided, show sample data
  if (!formData) {
    return (
      <div className="max-w-full mx-auto bg-white shadow-lg rounded-none overflow-hidden font-sans">
        {/* Header Section */}
        <div className="bg-blue-800 text-white p-5 text-center">
          <div className="flex justify-between items-center flex-col md:flex-row gap-4">
            {/* Left Side - Photo, Name, Profession */}
            <div className="flex flex-col items-center gap-2.5">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-600">
                👩‍🎓
              </div>
              
              {/* Name & Title */}
              <div className="text-center">
                <div className="font-bold text-2xl md:text-xl leading-tight mb-2">
                  Ramesh Pathak
                </div>
                <div className="font-normal text-sm text-blue-200">
                  Retail Sales Associate
                </div>
              </div>
            </div>
            
            {/* Right Side - Contact Info */}
            <div className="flex flex-col gap-2 text-xs text-right md:text-center">
              <div>📍 New Delhi, India, 110034</div>
              <div>📞 +91 22 1234 5677</div>
              <div>✉️ saanvipatel@sample.in</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-5">
          {/* Summary */}
          <div className="mb-3">
            <div className="text-blue-600 font-bold text-lg mb-2 py-1.5 border-b-2 border-gray-200">
              Summary
            </div>
            <div className="text-sm text-gray-800 leading-relaxed">
              Motivated Sales Associate with 5 years of experience boosting sales and customer loyalty through individualized service. Resourceful expert at learning customer needs, directing to desirable merchandise and upselling to meet sales quotas. Committed to strengthening customer experiences with positivity and professionalism when answering requests and processing sales.
            </div>
          </div>

          {/* Skills */}
          <div className="mb-3">
            <div className="text-blue-600 font-bold text-lg mb-2 py-1.5 border-b-2 border-gray-200">
              Skills
            </div>
            <div className="flex flex-wrap gap-2">
              {['Store opening and closing', 'Sales expertise', 'Accurate Money Handling', 'Loss prevention', 'Product promotions', 'Guest Services'].map((skill, index) => (
                <div key={index} className="bg-blue-50 px-2.5 py-1 rounded-2xl text-xs text-blue-600 border border-gray-200">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-3">
            <div className="text-blue-600 font-bold text-lg mb-2 py-1.5 border-b-2 border-gray-200">
              Education
            </div>
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <div className="text-xs text-gray-600 mb-1">June 2016</div>
              <div className="font-bold text-sm mb-1">Financial Accounting - 85%</div>
              <div className="italic text-xs text-gray-700 mb-1.5">
                Oxford Software Institute & Oxford School of English - New Delhi, India
              </div>
              <div className="text-xs text-gray-800 leading-snug">
                Motivated Sales Associate with 5 years of experience boosting sales and customer loyalty through individualized service.
              </div>
            </div>
          </div>

          {/* Work History */}
          <div className="mb-3">
            <div className="text-blue-600 font-bold text-lg mb-2 py-1.5 border-b-2 border-gray-200">
              Work History
            </div>
            
            {/* Job 1 */}
            <div className="bg-gray-50 p-3 rounded border border-gray-200 mb-2">
              <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                <div>
                  <div className="font-bold text-sm mb-1">Retail Sales Associate</div>
                  <div className="italic text-xs text-gray-700">H&M, Full-time, New Delhi, India</div>
                </div>
                <div className="text-xs text-gray-600 font-medium">2016-05 - Currently working</div>
              </div>
              <div className="text-xs text-gray-800 mb-2 leading-snug">
                Managed customer interactions and sales processes. Handled inventory management and product displays.
              </div>
              <ul className="text-xs text-gray-800 leading-snug pl-4 space-y-1">
                <li>Effectively upsold products by introducing accessories, adding ₹3000 to average monthly sales.</li>
                <li>Generated brand awareness and positive product impressions to increase sales 22%.</li>
                <li>Used consultative sales approach to understand customer needs.</li>
              </ul>
            </div>

            {/* Job 2 */}
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                <div>
                  <div className="font-bold text-sm mb-1">Barista</div>
                  <div className="italic text-xs text-gray-700">Starbucks, Part-time, New Delhi, India</div>
                </div>
                <div className="text-xs text-gray-600 font-medium">2015-01 - 2016-03</div>
              </div>
              <div className="text-xs text-gray-800 mb-2 leading-snug">
                Prepared and served coffee beverages. Maintained cleanliness and provided excellent customer service.
              </div>
              <ul className="text-xs text-gray-800 leading-snug pl-4 space-y-1">
                <li>Created over 60 drinks per hour with consistently positive customer satisfaction scores.</li>
                <li>Learned every menu preparation to meet all customer needs.</li>
                <li>Upsold baked goods, increasing store sales ₹3800 per month.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Extract data from formData with fallbacks
  const heading = formData?.heading || {};
  const education = formData?.education || [];
  const experience = formData?.experience || [];
  const skills = formData?.skills || [];
  const summary = formData?.summary || '';

  return (
    <div className="max-w-full mx-auto bg-white shadow-lg rounded-none overflow-hidden font-sans">
      {/* Header Section */}
      <div 
        className="bg-blue-800 text-white py-2.5 px-5 text-center relative"
        onMouseEnter={() => setContactHovered(true)}
        onMouseLeave={() => setContactHovered(false)}
      >
        <div className="flex justify-between items-center flex-col md:flex-row gap-4">
          {/* Left Side - Photo, Name, Profession */}
          <div className="flex flex-col items-center gap-2.5">
            {/* Avatar */}
            <div 
              className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-600 relative overflow-hidden"
              onMouseEnter={() => setPhotoHovered(true)}
              onMouseLeave={() => setPhotoHovered(false)}
            >
              {heading.photo ? (
                <img 
                  src={typeof heading.photo === 'string' ? heading.photo : URL.createObjectURL(heading.photo)} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full" 
                />
              ) : (
                <span>👩‍🎓</span>
              )}
              {onEditContact && photoHovered && (
                <button
                  type="button"
                  onClick={onEditContact}
                  className="absolute top-2 right-2 bg-blue-600 text-white border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
                >
                  <Edit size={12} />
                  Edit
                </button>
              )}
            </div>
            
            {/* Name & Title */}
            <div className="text-center">
              <div className="font-bold text-2xl md:text-xl leading-tight mb-2">
                {heading.firstName || 'Your'} {heading.surname || 'Name'}
              </div>
              <div className="font-normal text-sm text-blue-200">
                {heading.profession || 'Your Profession'}
              </div>
            </div>
          </div>
          
          {/* Right Side - Contact Info */}
          <div className="flex flex-col gap-2 text-xs text-right md:text-center relative">
            <div>📍 {heading.city || 'City'}, {heading.country || 'Country'}, {heading.pin || 'Pin'}</div>
            <div>📞 {heading.phone || 'Your Phone'}</div>
            <div>✉️ {heading.email || 'your.email@example.com'}</div>
            {onEditContact && contactHovered && (
              <button
                type="button"
                onClick={onEditContact}
                className="absolute -top-2.5 right-0 bg-blue-600 text-white border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
              >
                <Edit size={12} />
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5">
        {/* Summary */}
        {summary && (
          <div 
            className="mb-3 relative"
            onMouseEnter={() => setSummaryHovered(true)}
            onMouseLeave={() => setSummaryHovered(false)}
          >
            <div className="text-blue-600 font-bold text-lg mb-2 py-1.5 border-b-2 border-gray-200 relative">
              Summary
              {onEditSummary && summaryHovered && (
                <button
                  type="button"
                  onClick={onEditSummary}
                  className="absolute top-1.5 right-0 bg-blue-600 text-white border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
                >
                  <Edit size={12} />
                  Edit
                </button>
              )}
            </div>
            <div className="text-sm text-gray-800 leading-relaxed">
              {summary}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div 
            className="mb-3 relative"
            onMouseEnter={() => setSkillsHovered(true)}
            onMouseLeave={() => setSkillsHovered(false)}
          >
            <div className="text-blue-600 font-bold text-lg mb-2 py-1.5 border-b-2 border-gray-200 relative">
              Skills
              {onEditSkills && skillsHovered && (
                <button
                  type="button"
                  onClick={onEditSkills}
                  className="absolute top-1.5 right-0 bg-blue-600 text-white border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
                >
                  <Edit size={12} />
                  Edit
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="bg-blue-50 px-2.5 py-1 rounded-2xl text-xs text-blue-600 border border-gray-200">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div 
            className="mb-3 relative"
            onMouseEnter={() => setEducationHovered(true)}
            onMouseLeave={() => setEducationHovered(false)}
          >
            <div className="text-blue-600 font-bold text-lg mb-2 py-1.5 border-b-2 border-gray-200 relative">
              Education
              {onEditEducation && educationHovered && (
                <button
                  type="button"
                  onClick={onEditEducation}
                  className="absolute top-1.5 right-0 bg-blue-600 text-white border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
                >
                  <Edit size={12} />
                  Edit
                </button>
              )}
            </div>
            {education.map((edu, index) => (
              <div key={index} className={`bg-gray-50 p-3 rounded border border-gray-200 ${index < education.length - 1 ? 'mb-2' : ''}`}>
                <div className="text-xs text-gray-600 mb-1">
                  {edu.gradMonth} {edu.gradYear} - {edu.endMonth} {edu.endYear} 
                </div>
                <div className="font-bold text-sm mb-1">
                  {edu.fieldOfStudy}
                </div>
                {edu.grade && (
                  <div className="font-normal text-xs mb-1">
                    Grade - {edu.grade}
                  </div>
                )}
                <div className="font-bold italic text-xs text-gray-700 mb-1.5">
                  {edu.schoolName}
                </div>
                {edu.description && (
                  <div className="text-xs text-gray-800 leading-snug">
                    {edu.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Work History */}
        {experience.length > 0 && (
          <div 
            className="mb-3 relative"
            onMouseEnter={() => setExperienceHovered(true)}
            onMouseLeave={() => setExperienceHovered(false)}
          >
            <div className="text-blue-600 font-bold text-lg mb-2 py-1.5 border-b-2 border-gray-200 relative">
              Work History
              {onEditExperience && experienceHovered && (
                <button
                  type="button"
                  onClick={onEditExperience}
                  className="absolute top-1.5 right-0 bg-blue-600 text-white border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
                >
                  <Edit size={12} />
                  Edit
                </button>
              )}
            </div>
            {experience.map((exp, index) => (
              <div key={index} className={`bg-gray-50 p-3 rounded border border-gray-200 ${index < experience.length - 1 ? 'mb-2' : ''}`}>
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <div>
                    <div className="font-bold text-sm mb-1">{exp.jobTitle}</div>
                    <div className="italic text-xs text-gray-700">
                      {exp.companyName}, {exp.location}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    {exp.startMonth},{exp.startYear} - {exp.current ? 'Currently working' : exp.endMonth + ',' + exp.endYear}
                  </div>
                </div>
                <div className="text-xs text-gray-800 mb-2 leading-snug">
                  {exp.jobDescription}
                </div>
                {/* Add responsibilities if they exist */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Template1;