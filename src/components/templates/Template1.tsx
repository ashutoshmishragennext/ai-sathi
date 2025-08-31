'use client';
import React from 'react';
import { Education, Experience, Skill } from '@/lib/schema';
import { useResume } from '@/lib/store';

// const {heading} = useResume()

// const transformedHeading = {
//   name: `${heading.firstName} ${heading.surname}`,
//   email: heading.email,
//   phone: heading.phone,
//   location: `${heading.city}, ${heading.country} ${heading.pin}`,
// };

type ResumeTemplateProps = {
  formData: {
    heading: {
     firstName:string
    surName: string
    city: string
    profession: string
    country: string
    pin: string
    phone:string
    email: string 
    };
    overview: string;
    education: Education[];
    experience: Experience[];
    skills: Skill[];
    languages: { name: string; level: string }[];
  };
};

export default function ResumeTemplate({ formData }: ResumeTemplateProps) {
  const { heading, overview, education, experience, skills, languages } = formData;

  return (
    <div className="p-6 space-y-6 text-gray-900 font-sans bg-white rounded shadow-md">
      {/* Header */}
      <div className="space-y-1 border-b pb-2">
        <h1 className="text-3xl font-bold">{heading.firstName}</h1>
        <p>{heading.city}</p>
        <p>{heading.email} | {heading.phone}</p>
      </div>

      {/* Summary */}
      <section>
        <h2 className="text-xl font-semibold text-blue-700">Summary</h2>
        <p className="text-gray-800">{overview}</p>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-xl font-semibold text-blue-700">Skills</h2>
        <ul className="list-disc list-inside grid grid-cols-2 gap-x-6">
          {skills.map((skill, idx) => (
            <li key={idx}>{skill.name}</li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-xl font-semibold text-blue-700">Experience</h2>
        {experience.map((exp, idx) => (
          <div key={idx} className="mb-4">
            <p className="font-semibold">{exp.role} / {exp.company} – {exp.location}</p>
            <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
           
          </div>
        ))}
      </section>

      {/* Education */}
      <section>
        <h2 className="text-xl font-semibold text-blue-700">Education & Training</h2>
        {education.map((edu, idx) => (
          <div key={idx}>
            <p className="font-semibold">{edu.fieldOfStudy}</p>
            <p className="text-sm text-gray-700">{edu.school} ({edu.startYear} - {edu.endYear})</p>
          </div>
        ))}
      </section>

      {/* Languages */}
      <section>
        <h2 className="text-xl font-semibold text-blue-700">Languages</h2>
        <ul className="list-disc list-inside">
          {languages.map((lang, idx) => (
            <li key={idx}>{lang.name}: {lang.level}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}