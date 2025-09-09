// components/templates/Template3.tsx
'use client'
import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { FormData } from '../../types/resume';

interface Template3Props {
  formData?: FormData;
  onEditSummary?: () => void;
  onEditEducation?: () => void;
  onEditExperience?: () => void;
  onEditSkills?: () => void;
  onEditContact?: () => void;
  style?: React.CSSProperties;
}

const Template3: React.FC<Template3Props> = ({
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
      <div className="max-w-full mx-auto bg-white shadow-lg rounded-none overflow-hidden font-sans" style={style}>
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-1/3 bg-gray-900 text-white p-6">
            {/* Profile Section */}
            <div className="text-center mb-8">
              <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl mb-4 mx-auto">
                👨‍💼
              </div>
              <h1 className="text-xl font-bold mb-2">Michael Chen</h1>
              <p className="text-gray-300 text-sm">Product Manager</p>
            </div>

            {/* Contact Info */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide text-gray-400">Contact</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">📧</span>
                  <span>michael.chen@email.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">📱</span>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">📍</span>
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">🔗</span>
                  <span>linkedin.com/in/michaelchen</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide text-gray-400">Skills</h3>
              <div className="space-y-3">
                {[
                  { name: 'Product Strategy', level: 90 },
                  { name: 'User Research', level: 85 },
                  { name: 'Data Analysis', level: 80 },
                  { name: 'Agile/Scrum', level: 95 },
                  { name: 'A/B Testing', level: 75 }
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide text-gray-400">Languages</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>English</span>
                  <span className="text-gray-400">Native</span>
                </div>
                <div className="flex justify-between">
                  <span>Mandarin</span>
                  <span className="text-gray-400">Fluent</span>
                </div>
                <div className="flex justify-between">
                  <span>Spanish</span>
                  <span className="text-gray-400">Intermediate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-2/3 p-8 bg-white">
            {/* About Me */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">About Me</h2>
              <p className="text-gray-700 leading-relaxed text-sm">
                Results-driven Product Manager with 6+ years of experience leading cross-functional teams to deliver innovative digital products. Proven track record of increasing user engagement by 40% and revenue by $2M through data-driven product decisions and strategic roadmap planning.
              </p>
            </div>

            {/* Work Experience */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">Work Experience</h2>
              
              {/* Job 1 */}
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Senior Product Manager</h3>
                    <p className="text-blue-600 font-medium">TechCorp Inc.</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2021 - Present</span>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li>Led development of mobile app that increased user retention by 35%</li>
                  <li>Managed $5M product budget and cross-functional team of 12 members</li>
                  <li>Implemented A/B testing framework resulting in 20% conversion improvement</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Product Manager</h3>
                    <p className="text-blue-600 font-medium">StartupXYZ</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2019 - 2021</span>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li>Launched 3 major product features with 95% customer satisfaction</li>
                  <li>Conducted user research with 500+ participants to inform product strategy</li>
                  <li>Collaborated with engineering team to reduce development cycle by 30%</li>
                </ul>
              </div>

              {/* Job 3 */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Associate Product Manager</h3>
                    <p className="text-blue-600 font-medium">Digital Solutions Ltd.</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2018 - 2019</span>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li>Supported senior PM in managing product roadmap for e-commerce platform</li>
                  <li>Analyzed user behavior data to identify optimization opportunities</li>
                  <li>Created detailed product specifications and user stories</li>
                </ul>
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">Education</h2>
              
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Master of Business Administration</h3>
                    <p className="text-blue-600 font-medium">Stanford University</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2016 - 2018</span>
                </div>
                <p className="text-sm text-gray-700">Concentration in Technology Management • GPA: 3.8/4.0</p>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Bachelor of Computer Science</h3>
                    <p className="text-blue-600 font-medium">UC Berkeley</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">2012 - 2016</span>
                </div>
                <p className="text-sm text-gray-700">Magna Cum Laude • Relevant Coursework: Software Engineering, Data Structures</p>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">Certifications</h2>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Certified Scrum Product Owner (CSPO)</span>
                  <span className="text-sm text-gray-500">2022</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Google Analytics Certified</span>
                  <span className="text-sm text-gray-500">2021</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">PMP - Project Management Professional</span>
                  <span className="text-sm text-gray-500">2020</span>
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
    <div className="max-w-full mx-auto bg-white shadow-lg rounded-none overflow-hidden font-sans" style={style}>
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gray-900 text-white p-6">
          {/* Profile Section */}
          <div 
            className="text-center mb-8 relative"
            onMouseEnter={() => setPhotoHovered(true)}
            onMouseLeave={() => setPhotoHovered(false)}
          >
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl mb-4 mx-auto relative overflow-hidden">
              {heading.photo ? (
                <img 
                  src={typeof heading.photo === 'string' ? heading.photo : URL.createObjectURL(heading.photo)} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full" 
                />
              ) : (
                <span>👨‍💼</span>
              )}
              {onEditContact && photoHovered && (
                <button
                  type="button"
                  onClick={onEditContact}
                  className="absolute top-2 right-2 bg-blue-600 text-white border-none rounded px-2 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
                >
                  <Edit size={10} />
                  Edit
                </button>
              )}
            </div>
            <h1 className="text-xl font-bold mb-2">
              {heading.firstName || 'Your'} {heading.surname || 'Name'}
            </h1>
            <p className="text-gray-300 text-sm">{heading.profession || 'Your Profession'}</p>
          </div>

          {/* Contact Info */}
          <div 
            className="mb-8 relative"
            onMouseEnter={() => setContactHovered(true)}
            onMouseLeave={() => setContactHovered(false)}
          >
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide text-gray-400">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-gray-400">📧</span>
                <span className="break-all">{heading.email || 'your.email@example.com'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400">📱</span>
                <span>{heading.phone || 'Your Phone'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400">📍</span>
                <span>{heading.city || 'City'}, {heading.country || 'Country'}</span>
              </div>
            </div>
            {onEditContact && contactHovered && (
              <button
                type="button"
                onClick={onEditContact}
                className="absolute top-0 right-0 bg-blue-600 text-white border-none rounded px-2 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
              >
                <Edit size={10} />
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
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide text-gray-400">Skills</h3>
              <div className="space-y-3">
                {skills.slice(0, 6).map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill}</span>
                      <span className="text-gray-400">{85 + (index * 2)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
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
                  className="absolute top-0 right-0 bg-blue-600 text-white border-none rounded px-2 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
                >
                  <Edit size={10} />
                  Edit
                </button>
              )}
            </div>
          )}

          {/* Languages */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide text-gray-400">Languages</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>English</span>
                <span className="text-gray-400">Native</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-8 bg-white">
          {/* About Me */}
          {summary && (
            <div 
              className="mb-8 relative"
              onMouseEnter={() => setSummaryHovered(true)}
              onMouseLeave={() => setSummaryHovered(false)}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">About Me</h2>
              <p className="text-gray-700 leading-relaxed text-sm">{summary}</p>
              {onEditSummary && summaryHovered && (
                <button
                  type="button"
                  onClick={onEditSummary}
                  className="absolute top-0 right-0 bg-blue-600 text-white border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
                >
                  <Edit size={12} />
                  Edit
                </button>
              )}
            </div>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <div 
              className="mb-8 relative"
              onMouseEnter={() => setExperienceHovered(true)}
              onMouseLeave={() => setExperienceHovered(false)}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">Work Experience</h2>
              
              {experience.map((exp, index) => (
                <div key={index} className={`${index < experience.length - 1 ? 'mb-6' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-blue-600 font-medium">{exp.companyName}</p>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded whitespace-nowrap">
                      {exp.startMonth} {exp.startYear} - {exp.current ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{exp.jobDescription}</p>
                </div>
              ))}
              
              {onEditExperience && experienceHovered && (
                <button
                  type="button"
                  onClick={onEditExperience}
                  className="absolute top-0 right-0 bg-blue-600 text-white border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
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
              className="mb-8 relative"
              onMouseEnter={() => setEducationHovered(true)}
              onMouseLeave={() => setEducationHovered(false)}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">Education</h2>
              
              {education.map((edu, index) => (
                <div key={index} className={`${index < education.length - 1 ? 'mb-4' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{edu.fieldOfStudy}</h3>
                      <p className="text-blue-600 font-medium">{edu.schoolName}</p>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded whitespace-nowrap">
                      {edu.gradYear}
                    </span>
                  </div>
                  {edu.grade && (
                    <p className="text-sm text-gray-700">{edu.grade}</p>
                  )}
                  {edu.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
              
              {onEditEducation && educationHovered && (
                <button
                  type="button"
                  onClick={onEditEducation}
                  className="absolute top-0 right-0 bg-blue-600 text-white border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
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
  );
};

export default Template3;