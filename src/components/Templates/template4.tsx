// components/templates/Template4.tsx
'use client'
import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { FormData } from '../../types/resume';

interface Template4Props {
  formData?: FormData;
  onEditSummary?: () => void;
  onEditEducation?: () => void;
  onEditExperience?: () => void;
  onEditSkills?: () => void;
  onEditContact?: () => void;
  style?: React.CSSProperties;
}

const Template4: React.FC<Template4Props> = ({
  formData,
  onEditSummary,
  onEditEducation,
  onEditExperience,
  onEditSkills,
  onEditContact,
  style
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
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden font-sans" style={style}>
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Sarah Johnson</h1>
              <p className="text-xl text-blue-100">UX/UI Designer</p>
            </div>
            <div className="text-right text-blue-100">
              <p className="flex items-center justify-end gap-2 mb-1">
                <span>📧</span>
                sarah.johnson@email.com
              </p>
              <p className="flex items-center justify-end gap-2 mb-1">
                <span>📱</span>
                +1 (555) 987-6543
              </p>
              <p className="flex items-center justify-end gap-2">
                <span>📍</span>
                New York, NY
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* Profile */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">PROFILE</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Creative UX/UI designer with 5+ years of experience creating intuitive and engaging digital experiences.
                  Passionate about user-centered design and solving complex problems through elegant solutions.
                  Proven track record of improving user satisfaction by 45% across various platforms and applications.
                </p>
              </div>

              {/* Experience */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">EXPERIENCE</h2>
                </div>
                
                <div className="mb-6 relative pl-6 border-l-2 border-blue-200">
                  <div className="absolute -left-1.5 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">Senior UX Designer</h3>
                    <span className="text-sm text-white bg-blue-600 px-3 py-1 rounded-full">2020 - Present</span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">CreativeMinds Studio</p>
                  <p className="text-gray-700 mb-3">
                    Led design for enterprise SaaS products, conducted user research, and created design systems used by 20+ designers.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Increased user engagement by 55% through redesign of core workflows</li>
                    <li>Reduced customer support tickets by 30% through improved UX</li>
                    <li>Mentored 3 junior designers and established design review process</li>
                  </ul>
                </div>

                <div className="mb-6 relative pl-6 border-l-2 border-blue-200">
                  <div className="absolute -left-1.5 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">UI Designer</h3>
                    <span className="text-sm text-white bg-blue-600 px-3 py-1 rounded-full">2018 - 2020</span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">TechInnovate Inc.</p>
                  <p className="text-gray-700 mb-3">
                    Designed interfaces for mobile and web applications, collaborated with developers, and conducted usability testing.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Designed award-winning mobile app with 4.8-star rating on app stores</li>
                    <li>Created design system that reduced development time by 25%</li>
                    <li>Conducted 50+ user interviews to inform product decisions</li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">EDUCATION</h2>
                </div>
                
                <div className="mb-6 relative pl-6 border-l-2 border-blue-200">
                  <div className="absolute -left-1.5 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">Master of Design in Interaction Design</h3>
                    <span className="text-sm text-white bg-blue-600 px-3 py-1 rounded-full">2016 - 2018</span>
                  </div>
                  <p className="text-blue-600 font-medium">Parsons School of Design</p>
                  <p className="text-gray-600 mt-1">GPA: 3.9/4.0 • Dean's List</p>
                </div>

                <div className="relative pl-6 border-l-2 border-blue-200">
                  <div className="absolute -left-1.5 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">Bachelor of Fine Arts in Graphic Design</h3>
                    <span className="text-sm text-white bg-blue-600 px-3 py-1 rounded-full">2012 - 2016</span>
                  </div>
                  <p className="text-blue-600 font-medium">Rhode Island School of Design</p>
                  <p className="text-gray-600 mt-1">Magna Cum Laude • Portfolio Award</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1">
              {/* Profile Photo */}
              <div className="mb-8 text-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mx-auto flex items-center justify-center text-white text-6xl mb-4 shadow-lg">
                  SJ
                </div>
              </div>

              {/* Contact */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl mb-8 shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-blue-600 mr-3 rounded-full"></span>
                  CONTACT
                </h3>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-700">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">📧</span>
                    sarah.johnson@email.com
                  </p>
                  <p className="flex items-center text-gray-700">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">📱</span>
                    +1 (555) 987-6543
                  </p>
                  <p className="flex items-center text-gray-700">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">📍</span>
                    New York, NY
                  </p>
                  <p className="flex items-center text-gray-700">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">🔗</span>
                    linkedin.com/in/sarahjohnson
                  </p>
                  <p className="flex items-center text-gray-700">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">🎨</span>
                    behance.net/sarahjohnson
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-blue-600 mr-3 rounded-full"></span>
                  SKILLS
                </h3>
                <div className="space-y-4">
                  {[
                    { skill: 'User Research', level: 95 },
                    { skill: 'UI Design', level: 90 },
                    { skill: 'Wireframing', level: 85 },
                    { skill: 'Prototyping', level: 88 },
                    { skill: 'Design Systems', level: 92 },
                    { skill: 'Usability Testing', level: 87 }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-800">{item.skill}</p>
                        <span className="text-xs text-blue-600 font-semibold">{item.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full" 
                          style={{ width: `${item.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-blue-600 mr-3 rounded-full"></span>
                  TOOLS
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['Figma', 'Sketch', 'Adobe XD', 'InVision', 'Framer', 'Photoshop', 'Illustrator', 'Miro'].map((tool, index) => (
                    <span key={index} className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Awards */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-blue-600 mr-3 rounded-full"></span>
                  AWARDS
                </h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl shadow-sm">
                    <p className="font-semibold text-blue-600">Awwwards Site of the Day</p>
                    <p className="text-sm text-gray-600">2022 - Fintech Dashboard Design</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl shadow-sm">
                    <p className="font-semibold text-blue-600">CSS Design Awards</p>
                    <p className="text-sm text-gray-600">2021 - Best UI Design</p>
                  </div>
                </div>
              </div>
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
    <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden font-sans" style={style}>
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {heading.firstName || 'Your'} {heading.surname || 'Name'}
            </h1>
            <p className="text-xl text-blue-100">{heading.profession || 'Your Profession'}</p>
          </div>
          <div className="text-right text-blue-100">
            <p className="flex items-center justify-end gap-2 mb-1">
              <span>📧</span>
              {heading.email || 'your.email@example.com'}
            </p>
            <p className="flex items-center justify-end gap-2 mb-1">
              <span>📱</span>
              {heading.phone || 'Your Phone'}
            </p>
            <p className="flex items-center justify-end gap-2">
              <span>📍</span>
              {heading.city || 'City'}, {heading.country || 'Country'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Profile */}
            {summary && (
              <div 
                className="mb-8 relative"
                onMouseEnter={() => setSummaryHovered(true)}
                onMouseLeave={() => setSummaryHovered(false)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">PROFILE</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">{summary}</p>
                {onEditSummary && summaryHovered && (
                  <button
                    type="button"
                    onClick={onEditSummary}
                    className="absolute top-0 right-0 bg-blue-600 text-white border-none rounded-full px-3 py-2 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1 shadow-md"
                  >
                    <Edit size={12} />
                    Edit
                  </button>
                )}
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div 
                className="mb-8 relative"
                onMouseEnter={() => setExperienceHovered(true)}
                onMouseLeave={() => setExperienceHovered(false)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">EXPERIENCE</h2>
                </div>
                
                {experience.map((exp, index) => (
                  <div key={index} className={`mb-6 relative pl-6 border-l-2 border-blue-200 ${index < experience.length - 1 ? 'mb-6' : ''}`}>
                    <div className="absolute -left-1.5 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{exp.jobTitle || 'Job Title'}</h3>
                      <span className="text-sm text-white bg-blue-600 px-3 py-1 rounded-full whitespace-nowrap">
                        {exp.startMonth} {exp.startYear} - {exp.current ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium mb-2">{exp.companyName || 'Company Name'}</p>
                    <p className="text-gray-700 leading-relaxed">{exp.jobDescription}</p>
                  </div>
                ))}
                
                {onEditExperience && experienceHovered && (
                  <button
                    type="button"
                    onClick={onEditExperience}
                    className="absolute top-0 right-0 bg-blue-600 text-white border-none rounded-full px-3 py-2 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1 shadow-md"
                  >
                    <Edit size={12} />
                    Edit
                  </button>
                )}
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div 
                className="relative"
                onMouseEnter={() => setEducationHovered(true)}
                onMouseLeave={() => setEducationHovered(false)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-1 h-8 bg-blue-600 mr-3 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">EDUCATION</h2>
                </div>
                
                {education.map((edu, index) => (
                  <div key={index} className={`relative pl-6 border-l-2 border-blue-200 ${index < education.length - 1 ? 'mb-6' : ''}`}>
                    <div className="absolute -left-1.5 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{edu.fieldOfStudy || 'Field of Study'}</h3>
                      <span className="text-sm text-white bg-blue-600 px-3 py-1 rounded-full">{edu.gradYear}</span>
                    </div>
                    <p className="text-blue-600 font-medium">{edu.schoolName || 'School Name'}</p>
                    {edu.grade && (
                      <p className="text-sm text-gray-600 mt-1">{edu.grade}</p>
                    )}
                    {edu.description && (
                      <p className="text-sm text-gray-700 mt-1 leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                ))}
                
                {onEditEducation && educationHovered && (
                  <button
                    type="button"
                    onClick={onEditEducation}
                    className="absolute top-0 right-0 bg-blue-600 text-white border-none rounded-full px-3 py-2 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1 shadow-md"
                  >
                    <Edit size={12} />
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            {/* Profile Photo */}
            <div 
              className="mb-8 text-center relative"
              onMouseEnter={() => setPhotoHovered(true)}
              onMouseLeave={() => setPhotoHovered(false)}
            >
              <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mx-auto flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg">
                {heading.firstName?.charAt(0) || 'Y'}{heading.surname?.charAt(0) || 'N'}
              </div>
              {onEditContact && photoHovered && (
                <button
                  type="button"
                  onClick={onEditContact}
                  className="absolute top-2 right-1/2 transform translate-x-1/2 bg-blue-600 text-white border-none rounded-full px-3 py-2 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1 shadow-md"
                >
                  <Edit size={12} />
                  Edit Photo
                </button>
              )}
            </div>

            {/* Contact */}
            <div 
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl mb-8 shadow-md relative"
              onMouseEnter={() => setContactHovered(true)}
              onMouseLeave={() => setContactHovered(false)}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-blue-600 mr-3 rounded-full"></span>
                CONTACT
              </h3>
              <div className="space-y-3">
                <p className="flex items-center text-gray-700">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">📧</span>
                  {heading.email || 'your.email@example.com'}
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">📱</span>
                  {heading.phone || 'Your Phone'}
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">📍</span>
                  {heading.city || 'City'}, {heading.country || 'Country'}
                </p>
              </div>
              {onEditContact && contactHovered && (
                <button
                  type="button"
                  onClick={onEditContact}
                  className="absolute top-4 right-4 bg-blue-600 text-white border-none rounded-full px-3 py-2 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1 shadow-md"
                >
                  <Edit size={12} />
                  Edit
                </button>
              )}
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div 
                className="mb-8 relative"
                onMouseEnter={() => setSkillsHovered(true)}
                onMouseLeave={() => setSkillsHovered(false)}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-blue-600 mr-3 rounded-full"></span>
                  SKILLS
                </h3>
                <div className="space-y-4">
                  {skills.slice(0, 6).map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-800">{skill}</p>
                        <span className="text-xs text-blue-600 font-semibold">{85 + (index * 2)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full" 
                          style={{ width: `${85 + (index * 2)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                {onEditSkills && skillsHovered && (
                  <button
                    type="button"
                    onClick={onEditSkills}
                    className="absolute top-0 right-0 bg-blue-600 text-white border-none rounded-full px-3 py-2 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1 shadow-md"
                  >
                    <Edit size={12} />
                    Edit
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template4;