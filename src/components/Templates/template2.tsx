// import React, { useState } from 'react';

// interface FormData {
//   heading?: {
//     firstName?: string;
//     surname?: string;
//     profession?: string;
//     city?: string;
//     country?: string;
//     pin?: string;
//     phone?: string;
//     email?: string;
//     photo?: string;
//   };
//   education?: Array<{
//     gradMonth?: string;
//     gradYear?: string;
//     endMonth?: string;
//     endYear?: string;
//     fieldOfStudy?: string;
//     percentage?: string;
//     schoolName?: string;
//     schoolLocation?: string;
//     coursework?: string;
//   }>;
//   experience?: Array<{
//     startMonth?: string;
//     startYear?: string;
//     endMonth?: string;
//     endYear?: string;
//     jobTitle?: string;
//     companyName?: string;
//     jobType?: string;
//     location?: string;
//     jobDescription?: string;
//   }>;
//   skills?: string[];
//   summary?: string;
// }

// interface Template2Props {
//   formData?: FormData;
//   onEditSummary?: () => void;
//   onEditEducation?: () => void;
//   onEditExperience?: () => void;
//   onEditSkills?: () => void;
//   onEditContact?: () => void;
// }

// const Template2: React.FC<Template2Props> = ({
//   formData,
//   onEditSummary,
//   onEditEducation,
//   onEditExperience,
//   onEditSkills,
//   onEditContact
// }) => {
//   // If no formData is provided, show sample data
//   if (!formData) {
//     return (
//       <div className="flex justify-center mx-auto w-[700px] min-h-[900px] font-serif bg-gray-50 shadow-lg">
//         {/* Sidebar */}
//         <div className="w-[220px] bg-gradient-to-br from-gray-800 to-gray-700 text-white p-0 flex flex-col items-center rounded-l-lg">
//           {/* Avatar */}
//           <div className="w-full bg-gradient-to-br from-red-500 to-red-700 flex justify-center items-center h-30">
//             <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-5xl text-gray-400 border-4 border-white shadow-md">
//               <span role="img" aria-label="avatar">👩‍🎓</span>
//             </div>
//           </div>
//           {/* Name & Title */}
//           <div className="w-full pt-5 pl-6 border-b-2 border-gray-700 mb-2">
//             <div className="font-bold text-2xl leading-tight mb-0.5 font-serif"><br/>Pathak</div>
//             <div className="font-normal text-sm text-gray-300 mb-2 italic">Retail Sales Associate</div>
//           </div>
//           {/* Contact */}
//           <div className="w-full pl-6 mb-4">
//             <div className="font-bold text-base mb-2 mt-2 text-red-500">Contact</div>
//             <div className="font-semibold text-xs mb-0.5 text-gray-100">Address</div>
//             <div className="font-normal text-xs mb-2 text-gray-300">New Delhi, India, 110034</div>
//             <div className="font-semibold text-xs mb-0.5 text-gray-100">Phone</div>
//             <div className="font-normal text-xs mb-2 text-gray-300">+91 22 1234 5677</div>
//             <div className="font-semibold text-xs mb-0.5 text-gray-100">E-mail</div>
//             <div className="font-normal text-xs mb-2 break-all text-gray-300">saanvipatel@sample.in</div>
//           </div>
//           {/* Skills */}
//           <div className="w-full pl-6 bg-gray-900 min-h-30 border-t-2 border-gray-700">
//             <div className="font-bold text-base my-3 text-red-500">Skills</div>
//             <div className="font-normal text-xs mb-1 text-gray-300">Store opening and closing</div>
//             <div className="font-normal text-xs mb-1 text-gray-300">Sales expertise</div>
//             <div className="font-normal text-xs mb-1 text-gray-300">Accurate Money Handling</div>
//             <div className="font-normal text-xs mb-1 text-gray-300">Loss prevention</div>
//             <div className="font-normal text-xs mb-1 text-gray-300">Product promotions</div>
//             <div className="font-normal text-xs mb-3 text-gray-300">Guest Services</div>
//           </div>
//         </div>
//         {/* Main Content */}
//         <div className="flex-1 bg-white px-8 pt-1 relative rounded-r-lg">
//           {/* Summary */}
//           <div className="border-b-2 border-red-500 pb-2 mb-4">
//             <div className="text-white font-bold text-xl mb-0.5 bg-red-500 px-3 py-2 rounded-t-md">Summary</div>
//             <div className="text-xs text-gray-800 mb-0 leading-relaxed">
//               Motivated Sales Associate with 5 years of experience boosting sales and customer loyalty through individualized service. Resourceful expert at learning customer needs, directing to desirable merchandise and upselling to meet sales quotas. Committed to strengthening customer experiences with positivity and professionalism when answering requests and processing sales.
//             </div>
//           </div>
//           {/* Education */}
//           <div className="border-b-2 border-red-500 pb-2 mb-4">
//             <div className="text-white font-bold text-xl mb-0.5 bg-red-500 px-3 py-2 rounded-t-md">Education</div>
//             <div className="text-xs text-gray-400 mb-0.5 italic">June 2016</div>
//             <div className="font-bold text-base mb-0 text-gray-800">Financial Accounting - 85%</div>
//             <div className="italic text-xs text-gray-400 mb-0.5">Oxford Software Institute & Oxford School of English - New Delhi, India</div>
//             <div className="text-xs text-gray-800 mb-0 leading-relaxed">
//               Motivated Sales Associate with 5 years of experience boosting sales and customer loyalty through individualized service. Resourceful expert at learning customer needs, directing to desirable merchandise and upselling to meet sales quotas. Committed to strengthening customer experiences with positivity and professionalism when answering requests and processing sales.
//             </div>
//           </div>
//           {/* Work History */}
//           <div className="border-b-2 border-red-500 pb-2 mb-4">
//             <div className="text-white font-bold text-xl mb-0.5 bg-red-500 px-3 py-2 rounded-t-md">Work History</div>
//             {/* Job 1 */}
//             <div className="flex mb-0">
//               <div className="min-w-20 text-xs text-gray-400 italic">2016-05 -<br />Currently working</div>
//               <div className="ml-3">
//                 <div className="font-bold text-sm text-gray-800">Retail Sales Associate</div>
//                 <div className="italic text-xs text-gray-400 mb-0.5">H&M, Full-time, New Delhi, India</div>
//                 <div className="text-xs text-gray-800 mb-2 leading-relaxed">
//                   Managed customer interactions and sales processes. Handled inventory management and product displays. Achieved monthly sales targets through effective customer service and product knowledge.
//                 </div>
//                 <ul className="m-0 pl-5 text-xs text-gray-800 leading-relaxed">
//                   <li>Effectively upsold products by introducing accessories and other add-ons, adding ₹3000 to average monthly sales.</li>
//                   <li>Generated brand awareness and positive product impressions to increase sales 22%.</li>
//                   <li>Used consultative sales approach to understand customer needs and recommend relevant offerings.</li>
//                 </ul>
//               </div>
//             </div>
//             {/* Job 2 */}
//             <div className="flex mt-3">
//               <div className="min-w-20 text-xs text-gray-400 italic">2015-01 -<br />2016-03</div>
//               <div className="ml-3">
//                 <div className="font-bold text-sm text-gray-800">Barista</div>
//                 <div className="italic text-xs text-gray-400 mb-0.5">Starbucks, Part-time, New Delhi, India</div>
//                 <div className="text-xs text-gray-800 mb-2 leading-relaxed">
//                   Prepared and served coffee beverages. Maintained cleanliness and organization of work area. Provided excellent customer service and handled cash transactions.
//                 </div>
//                 <ul className="m-0 pl-5 text-xs text-gray-800 leading-relaxed">
//                   <li>Created over 60 drinks per hour with consistently positive customer satisfaction scores.</li>
//                   <li>Learned every menu preparation and numerous off-label drinks to meet all customer needs.</li>
//                   <li>Upsold baked goods and extra shots with beverages, increasing store sales ₹3800 per month.</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Extract data from formData with fallbacks
//   const heading = formData?.heading || {};
//   const education = formData?.education || [];
//   const experience = formData?.experience || [];
//   const skills = formData?.skills || [];
//   const summary = formData?.summary || '';

//   // Hover state for edit buttons
//   const [summaryHovered, setSummaryHovered] = useState(false);
//   const [educationHovered, setEducationHovered] = useState(false);
//   const [experienceHovered, setExperienceHovered] = useState(false);
//   const [skillsHovered, setSkillsHovered] = useState(false);
//   const [contactHovered, setContactHovered] = useState(false);
//   const [photoHovered, setPhotoHovered] = useState(false);

//   return (
//     <div className="flex justify-center mx-auto w-[700px] min-h-[900px] font-serif bg-gray-50 shadow-lg">
//       {/* Sidebar */}
//       <div className="w-[220px] bg-gradient-to-br from-gray-800 to-gray-700 text-white p-0 flex flex-col items-center rounded-l-lg">
//         {/* Avatar */}
//         <div 
//           className="w-full bg-gradient-to-br from-red-500 to-red-700 flex justify-center items-center h-30 relative"
//           onMouseEnter={() => setPhotoHovered(true)}
//           onMouseLeave={() => setPhotoHovered(false)}
//         >
//           <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-5xl text-gray-400 overflow-hidden border-4 border-white shadow-md">
//             {heading.photo ? (
//               <img src={heading.photo} alt="Profile" className="w-full h-full object-cover rounded-full" />
//             ) : (
//               <span role="img" aria-label="avatar">👩‍🎓</span>
//             )}
//           </div>
//           {onEditContact && photoHovered && (
//             <button
//               type="button"
//               onClick={onEditContact}
//               className="absolute top-2 right-2 bg-red-500 text-white border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
//             >
//               ✏️ Edit
//             </button>
//           )}
//         </div>
//         {/* Name & Title */}
//         <div className="w-full pt-5 pl-6 border-b-2 border-gray-700 mb-2">
//           <div className="font-bold text-2xl leading-tight mb-0.5 font-serif">
//             {heading.firstName || 'Your'} {heading.surname || 'Name'}
//           </div>
//           <div className="font-normal text-sm text-gray-300 mb-2 italic">
//             {heading.profession || 'Your Profession'}
//           </div>
//         </div>
//         {/* Contact */}
//         <div 
//           className="w-full pl-6 mb-4 relative"
//           onMouseEnter={() => setContactHovered(true)}
//           onMouseLeave={() => setContactHovered(false)}
//         >
//           <div className="font-bold text-base mb-2 mt-2 text-red-500 relative">
//             Contact
//             {onEditContact && contactHovered && (
//               <button
//                 type="button"
//                 onClick={onEditContact}
//                 className="absolute top-0 right-0 bg-red-500 text-white border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
//               >
//                 ✏️ Edit
//               </button>
//             )}
//           </div>
//           <div className="font-semibold text-xs mb-0.5 text-gray-100">Address</div>
//           <div className="font-normal text-xs mb-2 text-gray-300">
//             {heading.city || 'City'}, {heading.country || 'Country'}, {heading.pin || 'Pin'}
//           </div>
//           <div className="font-semibold text-xs mb-0.5 text-gray-100">Phone</div>
//           <div className="font-normal text-xs mb-2 text-gray-300">
//             {heading.phone || 'Your Phone'}
//           </div>
//           <div className="font-semibold text-xs mb-0.5 text-gray-100">E-mail</div>
//           <div className="font-normal text-xs mb-2 break-all text-gray-300">
//             {heading.email || 'your.email@example.com'}
//           </div>
//         </div>
//         {/* Skills */}
//         <div 
//           className="w-full pl-6 bg-gray-900 min-h-30 border-t-2 border-gray-700 relative"
//           onMouseEnter={() => setSkillsHovered(true)}
//           onMouseLeave={() => setSkillsHovered(false)}
//         >
//           <div className="font-bold text-base my-3 text-red-500 relative">
//             Skills
//             {onEditSkills && skillsHovered && (
//               <button
//                 type="button"
//                 onClick={onEditSkills}
//                 className="absolute top-0 right-0 bg-red-500 text-white border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
//               >
//                 ✏️ Edit
//               </button>
//             )}
//           </div>
//           {skills.length > 0 ? (
//             skills.map((skill, index) => (
//               <div key={index} className="font-normal text-xs mb-1 text-gray-300">{skill}</div>
//             ))
//           ) : (
//             <>
//               <div className="font-normal text-xs mb-1 text-gray-300">Your skills will appear here</div>
//               <div className="font-normal text-xs mb-1 text-gray-300">Add skills in the Skills tab</div>
//             </>
//           )}
//         </div>
//       </div>
//       {/* Main Content */}
//       <div className="flex-1 bg-white px-8 pt-1 relative rounded-r-lg">
//         {/* Summary */}
//         {summary && (
//           <div 
//             className="border-b-2 border-red-500 pb-2 mb-4 relative"
//             onMouseEnter={() => setSummaryHovered(true)}
//             onMouseLeave={() => setSummaryHovered(false)}
//           >
//             <div className="text-white font-bold text-xl mb-0.5 bg-red-500 px-3 py-2 rounded-t-md relative">
//               Summary
//               {onEditSummary && summaryHovered && (
//                 <button
//                   type="button"
//                   onClick={onEditSummary}
//                   className="absolute top-2 right-3 bg-white text-red-500 border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
//                 >
//                   ✏️ Edit
//                 </button>
//               )}
//             </div>
//             <div className="text-xs text-gray-800 mb-0 mt-1 leading-relaxed">
//               {summary}
//             </div>
//           </div>
//         )}
//         {/* Education */}
//         {education.length > 0 && (
//           <div 
//             className="border-b-2 border-red-500 pb-2 mb-4 relative"
//             onMouseEnter={() => setEducationHovered(true)}
//             onMouseLeave={() => setEducationHovered(false)}
//           >
//             <div className="text-white font-bold text-xl mb-0.5 bg-red-500 px-3 py-2 rounded-t-md relative">
//               Education
//               {onEditEducation && educationHovered && (
//                 <button
//                   type="button"
//                   onClick={onEditEducation}
//                   className="absolute top-2 right-3 bg-white text-red-500 border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
//                 >
//                   ✏️ Edit
//                 </button>
//               )}
//             </div>
//             {education.map((edu, index) => (
//               <div key={index} className={index < education.length - 1 ? 'mb-3' : ''}>
//                 <div className="text-xs text-gray-400 mb-0.5 italic">
//                   {edu.gradMonth} {edu.gradYear} - {edu.endMonth && edu.endYear ? `${edu.endMonth} ${edu.endYear}` : 'Present'}
//                 </div>
//                 <div className="font-bold text-base mb-0 text-gray-800">
//                   {edu.fieldOfStudy}
//                 </div>
//                 <div className="font-normal text-sm mb-0 text-red-500">
//                   Percentage - {edu.percentage}%
//                 </div>
//                 <div className="font-bold italic text-xs text-gray-400 mb-0.5">
//                   {edu.schoolName} - {edu.schoolLocation}
//                 </div>
//                 {edu.coursework && (
//                   <div className="text-xs text-gray-800 mb-0 leading-relaxed">
//                     {edu.coursework}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//         {/* Work History */}
//         {experience.length > 0 && (
//           <div 
//             className="border-b-2 border-red-500 pb-2 mb-4 relative"
//             onMouseEnter={() => setExperienceHovered(true)}
//             onMouseLeave={() => setExperienceHovered(false)}
//           >
//             <div className="text-white font-bold text-xl mb-0.5 bg-red-500 px-3 py-2 rounded-t-md relative">
//               Work History
//               {onEditExperience && experienceHovered && (
//                 <button
//                   type="button"
//                   onClick={onEditExperience}
//                   className="absolute top-2 right-3 bg-white text-red-500 border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
//                 >
//                   ✏️ Edit
//                 </button>
//               )}
//             </div>
//             {experience.map((exp, index) => (
//               <div key={index} className="flex mb-3">
//                 <div className="min-w-20 text-xs text-gray-400 italic">
//                   {exp.startMonth} {exp.startYear} - {exp.endMonth && exp.endYear ? `${exp.endMonth} ${exp.endYear}` : 'Currently working'}
//                 </div>
//                 <div className="ml-3">
//                   <div className="font-bold text-sm text-gray-800">{exp.jobTitle}</div>
//                   <div className="italic text-xs text-gray-400 mb-0.5">
//                     {exp.companyName}, {exp.jobType}, {exp.location}
//                   </div>
//                   <div className="text-xs text-gray-800 mb-2 leading-relaxed">
//                     {exp.jobDescription}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Template2;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import Image from 'next/image';

interface FormData {
  heading?: {
    firstName?: string;
    surname?: string;
    profession?: string;
    city?: string;
    country?: string;
    pin?: string;
    phone?: string;
    email?: string;
    photo?: string;
  };
  education?: Array<{
    gradMonth?: string;
    gradYear?: string;
    endMonth?: string;
    endYear?: string;
    fieldOfStudy?: string;
    percentage?: string;
    schoolName?: string;
    schoolLocation?: string;
    coursework?: string;
  }>;
  experience?: Array<{
    startMonth?: string;
    startYear?: string;
    endMonth?: string;
    endYear?: string;
    jobTitle?: string;
    companyName?: string;
    jobType?: string;
    location?: string;
    jobDescription?: string;
  }>;
  skills?: string[];
  summary?: string;
}

interface Template2Props {
  formData?: FormData;
  onEditSummary?: () => void;
  onEditEducation?: () => void;
  onEditExperience?: () => void;
  onEditSkills?: () => void;
  onEditContact?: () => void;
}

const Template2: React.FC<Template2Props> = ({
  formData,
  onEditSummary,
  onEditEducation,
  onEditExperience,
  onEditSkills,
  onEditContact
}) => {
  // ✅ hooks must always be declared first, before returns
  const [summaryHovered, setSummaryHovered] = useState(false);
  const [educationHovered, setEducationHovered] = useState(false);
  const [experienceHovered, setExperienceHovered] = useState(false);
  const [skillsHovered, setSkillsHovered] = useState(false);
  const [contactHovered, setContactHovered] = useState(false);
  const [photoHovered, setPhotoHovered] = useState(false);

  // Extract data with fallbacks
  const heading = formData?.heading || {};
  const education = formData?.education || [];
  const experience = formData?.experience || [];
  const skills = formData?.skills || [];
  const summary = formData?.summary || '';

  const isEmpty = !formData; // ✅ instead of early return, flag it

  return (
    <div className="flex justify-center mx-auto w-[700px] min-h-[900px] font-serif bg-gray-50 shadow-lg">
      {/* Sidebar */}
      <div className="w-[220px] bg-gradient-to-br from-gray-800 to-gray-700 text-white p-0 flex flex-col items-center rounded-l-lg">
        {/* Avatar */}
        <div 
          className="w-full bg-gradient-to-br from-red-500 to-red-700 flex justify-center items-center h-30 relative"
          onMouseEnter={() => setPhotoHovered(true)}
          onMouseLeave={() => setPhotoHovered(false)}
        >
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-5xl text-gray-400 overflow-hidden border-4 border-white shadow-md">
            {heading.photo ? (
              <Image
                src={heading.photo}
                alt="Profile"
                width={80}
                height={80}
                className="object-cover rounded-full"
              />
            ) : (
              <span role="img" aria-label="avatar">👩‍🎓</span>
            )}
          </div>
          {onEditContact && photoHovered && (
            <button
              type="button"
              onClick={onEditContact}
              className="absolute top-2 right-2 bg-red-500 text-white border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
            >
              ✏️ Edit
            </button>
          )}
        </div>

        {/* Name & Title */}
        <div className="w-full pt-5 pl-6 border-b-2 border-gray-700 mb-2">
          <div className="font-bold text-2xl leading-tight mb-0.5 font-serif">
            {heading.firstName || (isEmpty ? 'John' : 'Your')} {heading.surname || (isEmpty ? 'Doe' : 'Name')}
          </div>
          <div className="font-normal text-sm text-gray-300 mb-2 italic">
            {heading.profession || (isEmpty ? 'Retail Sales Associate' : 'Your Profession')}
          </div>
        </div>

        {/* Contact */}
        <div 
          className="w-full pl-6 mb-4 relative"
          onMouseEnter={() => setContactHovered(true)}
          onMouseLeave={() => setContactHovered(false)}
        >
          <div className="font-bold text-base mb-2 mt-2 text-red-500 relative">
            Contact
            {onEditContact && contactHovered && (
              <button
                type="button"
                onClick={onEditContact}
                className="absolute top-0 right-0 bg-red-500 text-white border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
              >
                ✏️ Edit
              </button>
            )}
          </div>
          <div className="font-semibold text-xs mb-0.5 text-gray-100">Address</div>
          <div className="font-normal text-xs mb-2 text-gray-300">
            {heading.city || 'New Delhi'}, {heading.country || 'India'}, {heading.pin || '110034'}
          </div>
          <div className="font-semibold text-xs mb-0.5 text-gray-100">Phone</div>
          <div className="font-normal text-xs mb-2 text-gray-300">
            {heading.phone || '+91 22 1234 5677'}
          </div>
          <div className="font-semibold text-xs mb-0.5 text-gray-100">E-mail</div>
          <div className="font-normal text-xs mb-2 break-all text-gray-300">
            {heading.email || 'saanvipatel@sample.in'}
          </div>
        </div>

        {/* Skills */}
        <div 
          className="w-full pl-6 bg-gray-900 min-h-30 border-t-2 border-gray-700 relative"
          onMouseEnter={() => setSkillsHovered(true)}
          onMouseLeave={() => setSkillsHovered(false)}
        >
          <div className="font-bold text-base my-3 text-red-500 relative">
            Skills
            {onEditSkills && skillsHovered && (
              <button
                type="button"
                onClick={onEditSkills}
                className="absolute top-0 right-0 bg-red-500 text-white border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
              >
                ✏️ Edit
              </button>
            )}
          </div>
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <div key={index} className="font-normal text-xs mb-1 text-gray-300">{skill}</div>
            ))
          ) : (
            <>
              <div className="font-normal text-xs mb-1 text-gray-300">Store opening and closing</div>
              <div className="font-normal text-xs mb-1 text-gray-300">Sales expertise</div>
              <div className="font-normal text-xs mb-1 text-gray-300">Accurate Money Handling</div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white px-8 pt-1 relative rounded-r-lg">
        {/* Summary */}
        {summary && (
          <div 
            className="border-b-2 border-red-500 pb-2 mb-4 relative"
            onMouseEnter={() => setSummaryHovered(true)}
            onMouseLeave={() => setSummaryHovered(false)}
          >
            <div className="text-white font-bold text-xl mb-0.5 bg-red-500 px-3 py-2 rounded-t-md relative">
              Summary
              {onEditSummary && summaryHovered && (
                <button
                  type="button"
                  onClick={onEditSummary}
                  className="absolute top-2 right-3 bg-white text-red-500 border-none rounded px-3 py-1 text-xs font-semibold cursor-pointer z-10 flex items-center gap-1"
                >
                  ✏️ Edit
                </button>
              )}
            </div>
            <div className="text-xs text-gray-800 mb-0 mt-1 leading-relaxed">
              {summary}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="border-b-2 border-red-500 pb-2 mb-4">
            <div className="text-white font-bold text-xl mb-0.5 bg-red-500 px-3 py-2 rounded-t-md">Education</div>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="text-xs text-gray-400 mb-0.5 italic">
                  {edu.gradMonth} {edu.gradYear} - {edu.endMonth && edu.endYear ? `${edu.endMonth} ${edu.endYear}` : 'Present'}
                </div>
                <div className="font-bold text-base text-gray-800">
                  {edu.fieldOfStudy}
                </div>
                <div className="font-normal text-sm text-red-500">
                  Percentage - {edu.percentage}%
                </div>
                <div className="italic text-xs text-gray-400">
                  {edu.schoolName} - {edu.schoolLocation}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Work History */}
        {experience.length > 0 && (
          <div className="border-b-2 border-red-500 pb-2 mb-4">
            <div className="text-white font-bold text-xl mb-0.5 bg-red-500 px-3 py-2 rounded-t-md">Work History</div>
            {experience.map((exp, index) => (
              <div key={index} className="flex mb-3">
                <div className="min-w-20 text-xs text-gray-400 italic">
                  {exp.startMonth} {exp.startYear} - {exp.endMonth && exp.endYear ? `${exp.endMonth} ${exp.endYear}` : 'Currently working'}
                </div>
                <div className="ml-3">
                  <div className="font-bold text-sm text-gray-800">{exp.jobTitle}</div>
                  <div className="italic text-xs text-gray-400">{exp.companyName}, {exp.jobType}, {exp.location}</div>
                  <div className="text-xs text-gray-800">{exp.jobDescription}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Template2;
