// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import React, { useState, useEffect } from 'react';

// // Define types
// interface EducationItem {
//   id: string;
//   schoolName: string;
//   schoolLocation: string;
//   fieldOfStudy: string;
//   percentage: string;
//   gradMonth: string;
//   gradYear: string;
//   endMonth: string;
//   endYear: string;
//   coursework: string;
// }
// interface TemplateProps {
//   formData: FormData;
//   onLogout?: () => void;
// }

// interface HeadingData {
//   firstName: string;
//   surname: string;
//   profession: string;
//   city: string;
//   country: string;
//   pin: string;
//   phone: string;
//   email: string;
//   photo: File | null;
// }

// interface ExperienceItem {
//   id: string;
//   jobTitle: string;
//   employer: string;
//   startDate: string;
//   endDate: string;
//   description: string;
// }

// interface FormData {
//   heading: HeadingData;
//   education: EducationItem[];
//   experience: ExperienceItem[];
//   skills: string[];
//   summary: string;
// }

// interface EducationTabProps {
//   onGoBack?: () => void;
//   onNext?: () => void;
//   formData: EducationItem[];
//   updateFormData: (data: EducationItem[]) => void;
//   selectedTemplate: React.ReactElement<TemplateProps>;
//   fullFormData: FormData;
// }

// // const degrees = [
// //   'Bachelor of Science',
// //   'Bachelor of Arts',
// //   'Bachelor of Commerce',
// //   'Master of Science',
// //   'Master of Arts',
// //   'Master of Commerce',
// //   'PhD',
// //   'Other',
// // ];

// const months = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December',
// ];

// const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() + 5 - i);

// const emptyEducation: EducationItem = {
//   id: Date.now().toString(),
//   schoolName: '',
//   schoolLocation: '',
//   fieldOfStudy: '',
//   percentage: '',
//   gradMonth: '',
//   gradYear: '',
//   endMonth: '',
//   endYear: '',
//   coursework: '',
// };

// const EducationTab: React.FC<EducationTabProps> = (props) => {
//   const { onGoBack, onNext, formData, updateFormData, selectedTemplate, fullFormData } = props;
//   const isEditingMode = !onNext || !onGoBack;
//   const [showCoursework, setShowCoursework] = useState<boolean[]>([]);
//   const [isMobile, setIsMobile] = useState(false);

//   // Initialize showCoursework state based on formData
//   useEffect(() => {
//     setShowCoursework(formData.map(() => false));
//   }, [formData.length]);

//   // Check if device is mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
    
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const educations = formData && formData.length > 0 ? formData : [{ ...emptyEducation }];

//   // Validation function to check if all required fields are filled
//   const isFormValid = (): boolean => {
//     return educations.every(education => {
//       return (
//         education.schoolName.trim() !== '' &&
//         education.schoolLocation.trim() !== '' &&
//         education.fieldOfStudy.trim() !== '' &&
//         education.percentage.trim() !== '' &&
//         education.gradMonth !== '' &&
//         education.gradYear !== ''
//       );
//     });
//   };

//   const handleChange = (idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     const updatedEducations = educations.map((ed, i) => 
//       i === idx ? { ...ed, [name]: value } : ed
//     );
//     updateFormData(updatedEducations);
//   };

//   const handleAddEducation = () => {
//     const newEducations = [...educations, { ...emptyEducation, id: Date.now().toString() }];
//     updateFormData(newEducations);
//     setShowCoursework((prev) => [...prev, false]);
//   };

//   const handleToggleCoursework = (idx: number) => {
//     setShowCoursework((prev) => prev.map((v, i) => i === idx ? !v : v));
//   };

//   const handleSave = () => {
//     if (onNext) {
//       onNext();
//     }
//   };

//   const renderTemplate = () => {
//     if (selectedTemplate && React.isValidElement(selectedTemplate)) {
//       return React.cloneElement(selectedTemplate, { 
//         formData: { 
//           heading: fullFormData?.heading || {}, 
//           education: educations, 
//           experience: fullFormData?.experience || [], 
//           skills: fullFormData?.skills || [], 
//           summary: fullFormData?.summary || '' 
//         } 
//       });
//     }
//     return (
//       <div className="w-full h-full flex items-center justify-center text-6xl">
//         <span role="img" aria-label="resume">📄</span>
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-[1400px] mx-auto p-4 md:p-8 w-full box-border">
//       <div className="flex justify-between items-center mb-5 md:mb-8 ml-2 md:ml-4">
//         <h1 className={`font-bold ${isMobile ? 'text-2xl -mt-28' : 'text-3xl'}`}>
//           Education
//         </h1>
//       </div>
      
//       {/* Main content area with flex layout */}
//       <div className={`flex ${isMobile ? 'flex-col gap-0' : 'flex-row gap-5'} mb-8 w-full`}>
        
//         {/* Left section - Form */}
//         <div className={`
//           bg-gray-50 rounded-xl p-4 md:p-6 overflow-y-auto box-border
//           ${isMobile ? 'w-full h-[620px] -mt-12' : 'w-[420px] max-w-[420px] h-[600px] ml-2'}
//         `}>
//           {!isEditingMode && onGoBack && (
//             <button
//               onClick={onGoBack}
//               className="bg-none border-none text-blue-600 text-sm md:text-base font-semibold cursor-pointer flex items-center gap-2 mb-2 p-0"
//             >
//               <span>←</span> Go Back
//             </button>
//           )}
          
//           <div className="relative">
//             <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2">
//               Add your educational qualifications
//             </h3>
            
//             {/* Required field indicator */}
//             <div className="absolute -top-7 right-0 text-xs font-medium text-red-500">
//               * indicates a required field
//             </div>

//             <div className="flex flex-col gap-6">
//               {educations.map((form, idx) => (
//                 <div key={form.id} className="relative border border-gray-300 rounded-xl p-4 md:p-6 bg-white mb-4 w-full box-border">
//                   {idx === 0 && (
//                     <button
//                       type="button"
//                       onClick={handleAddEducation}
//                       className="absolute top-3 right-3 md:top-4 md:right-4 bg-blue-600 text-white border-none rounded-full w-7 h-7 md:w-8 md:h-8 text-base md:text-lg font-bold cursor-pointer flex items-center justify-center"
//                     >
//                       +
//                     </button>
//                   )}
                  
//                   {/* Two column layout for form fields */}
//                   <div className="flex flex-col gap-4 w-full">
//                     {/* Row 1: School Name and School Location */}
//                     <div className={`flex ${isMobile ? 'gap-2' : 'gap-3'} w-full`}>
//                       <div className="flex-1">
//                         <label className="font-semibold text-xs">School/University Name *</label>
//                         <input
//                           type="text"
//                           name="schoolName"
//                           value={form.schoolName}
//                           onChange={(e) => handleChange(idx, e)}
//                           placeholder="Enter school or university name"
//                           required
//                           className="w-full p-2 mt-1 rounded border border-gray-300 text-xs box-border"
//                         />
//                       </div>
//                       <div className="flex-1">
//                         <label className="font-semibold text-xs">Location *</label>
//                         <input
//                           type="text"
//                           name="schoolLocation"
//                           value={form.schoolLocation}
//                           onChange={(e) => handleChange(idx, e)}
//                           placeholder="City, State"
//                           className="w-full p-2 mt-1 rounded border border-gray-300 text-xs box-border"
//                         />
//                       </div>
//                     </div>

//                     {/* Row 2: Field of Study and Percentage/CGPA */}
//                     <div className={`flex ${isMobile ? 'gap-2' : 'gap-3'} w-full`}>
//                       <div className="flex-1">
//                         <label className="font-semibold text-xs">Field of Study *</label>
//                         <input
//                           type="text"
//                           name="fieldOfStudy"
//                           value={form.fieldOfStudy}
//                           onChange={(e) => handleChange(idx, e)}
//                           placeholder="e.g., Computer Science, Business Administration"
//                           required
//                           className="w-full p-2 mt-1 rounded border border-gray-300 text-xs box-border"
//                         />
//                       </div>
//                       <div className="flex-1">
//                         <label className="font-semibold text-xs">Percentage *</label>
//                         <input
//                           type="text"
//                           name="percentage"
//                           value={form.percentage}
//                           onChange={(e) => handleChange(idx, e)}
//                           placeholder="e.g., 85%"
//                           className="w-full p-2 mt-1 rounded border border-gray-300 text-xs box-border"
//                         />
//                       </div>
//                     </div>

//                     {/* Row 3: Start Month and Start Year */}
//                     <div className={`flex ${isMobile ? 'gap-2' : 'gap-3'} w-full`}>
//                       <div className="flex-1">
//                         <label className="font-semibold text-xs">Start Month *</label>
//                         <select
//                           name="gradMonth"
//                           value={form.gradMonth}
//                           onChange={(e) => handleChange(idx, e)}
//                           className="w-full p-2 mt-1 rounded border border-gray-300 text-xs bg-white box-border"
//                         >
//                           <option value="">Select month</option>
//                           {months.map((month) => (
//                             <option key={month} value={month}>{month}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div className="flex-1">
//                         <label className="font-semibold text-xs">Start Year *</label>
//                         <select
//                           name="gradYear"
//                           value={form.gradYear}
//                           onChange={(e) => handleChange(idx, e)}
//                           className="w-full p-2 mt-1 rounded border border-gray-300 text-xs bg-white box-border"
//                         >
//                           <option value="">Select year</option>
//                           {years.map((year) => (
//                             <option key={year} value={year}>{year}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     {/* Row 4: End Month and End Year */}
//                     <div className={`flex ${isMobile ? 'gap-2' : 'gap-3'} w-full`}>
//                       <div className="flex-1">
//                         <label className="font-semibold text-xs">End Month *</label>
//                         <select
//                           name="endMonth"
//                           value={form.endMonth}
//                           onChange={(e) => handleChange(idx, e)}
//                           className="w-full p-2 mt-1 rounded border border-gray-300 text-xs bg-white box-border"
//                         >
//                           <option value="">Select month</option>
//                           {months.map((month) => (
//                             <option key={month} value={month}>{month}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div className="flex-1">
//                         <label className="font-semibold text-xs">End Year *</label>
//                         <select
//                           name="endYear"
//                           value={form.endYear}
//                           onChange={(e) => handleChange(idx, e)}
//                           className="w-full p-2 mt-1 rounded border border-gray-300 text-xs bg-white box-border"
//                         >
//                           <option value="">Select year</option>
//                           {years.map((year) => (
//                             <option key={year} value={year}>{year}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     {/* Row 5: Coursework Section */}
//                     <div className="w-full">
//                       <div
//                         className="cursor-pointer text-blue-600 font-semibold text-sm md:text-base mb-2"
//                         onClick={() => handleToggleCoursework(idx)}
//                       >
//                         {showCoursework[idx] ? '▼' : '▶'} Add extra courses you&apos;re proud of
//                       </div>
//                       {showCoursework[idx] && (
//                         <div className="p-3 bg-gray-50 rounded border border-gray-200 mb-2">
//                           <textarea
//                             name="coursework"
//                             value={form.coursework}
//                             onChange={(e) => handleChange(idx, e)}
//                             placeholder="List any additional coursework, achievements, or certifications..."
//                             rows={3}
//                             className="w-full p-2 rounded border border-gray-300 text-xs resize-y box-border"
//                           />
//                           <div className="mt-1.5 text-xs">
//                             <span className="text-blue-600 font-semibold cursor-pointer">Look</span> here for sample resume references
//                           </div>
//                           <div className="mt-3 bg-blue-100 rounded p-2.5 flex items-start gap-2">
//                             <span className="text-xl text-blue-600">💡</span>
//                             <div className="text-xs text-gray-700">
//                               <b>Hint</b> You can list any online courses, workshops, or certifications you&apos;ve completed outside your regular studies.Python for Beginners – Coursera

// Digital Marketing – Google

// Web Development Bootcamp – Udemy

// Advanced Excel – Microsoft
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className={`
//               text-xs flex items-center gap-1.5 p-2 rounded border
//               ${isFormValid() 
//                 ? 'text-green-600 bg-green-50 border-green-200' 
//                 : 'text-red-500 bg-red-50 border-red-200'
//               }
//             `}>
//               {isFormValid() ? (
//                 <>
//                   <span>✓</span>
//                   <span>All education fields are complete</span>
//                 </>
//               ) : (
//                 <>
//                   <span>⚠</span>
//                   <span>Please fill all required education fields</span>
//                 </>
//               )}
//             </div>
//           </div>
          
//           <div className="flex justify-end gap-4 mt-3">
//             {isEditingMode ? (
//               <button
//                 type="button"
//                 onClick={handleSave}
//                 className="border-none bg-blue-600 text-white font-bold text-lg rounded-full px-9 py-2.5 cursor-pointer"
//               >
//                 Save Changes
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={onNext}
//                 disabled={!isFormValid()}
//                 className={`
//                   border-none text-white font-bold text-lg rounded-full px-9 py-2.5 
//                   transition-all duration-200 ease-in-out
//                   ${isFormValid() 
//                     ? 'bg-purple-700 cursor-pointer' 
//                     : 'bg-gray-400 cursor-not-allowed opacity-60'
//                   }
//                 `}
//               >
//                 {isFormValid() ? 'Next' : 'Fill Required Fields'}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Right section - Template Preview with User Data */}
//         {!isMobile && (
//           <div className="flex-1 scale-75 origin-top max-w-full w-[800px] h-full overflow-auto -mt-20 max-h-[1000px]">
//             {renderTemplate()}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EducationTab;

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
    console.log("dataaa",name, value);
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
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`font-bold ${isMobile ? 'text-2xl' : 'text-3xl'}`}>Education</h1>
      </div>
      
      <div className={`flex ${isMobile ? 'flex-col gap-6' : 'flex-row gap-8'} w-full`}>
        
        {/* Left section - Form */}
        <div className={`
          bg-white shadow-sm rounded-2xl p-5 md:p-6 overflow-y-auto
          ${isMobile ? 'w-full h-[620px]' : 'w-[420px] max-w-[420px] h-[620px]'}
        `}>
          {!isEditingMode && onGoBack && (
            <button
              onClick={onGoBack}
              className="text-blue-600 text-sm font-medium mb-3 flex items-center gap-1"
            >
              ← Go Back
            </button>
          )}
          
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Add your educational qualifications
          </h3>

          <div className="space-y-6">
            {educations.map((form, idx) => (
              <div key={form.id} className="relative border border-gray-200 rounded-xl p-4 bg-gray-50">
                {idx === 0 && (
                  <button
                    type="button"
                    onClick={handleAddEducation}
                    className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-sm"
                  >
                    +
                  </button>
                )}

                <div className="space-y-4">
                  {/* Row 1 */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="font-semibold text-xs">School/University *</label>
                      <input
                        type="text"
                        name="schoolName"
                        value={form.schoolName}
                        onChange={(e) => handleChange(idx, e)}
                        placeholder="Enter school/university"
                        className="w-full p-2 mt-1 rounded border border-gray-300 text-xs"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="font-semibold text-xs">Location *</label>
                      <input
                        type="text"
                        name="schoolLocation"
                        value={form.schoolLocation}
                        onChange={(e) => handleChange(idx, e)}
                        placeholder="City, State"
                        className="w-full p-2 mt-1 rounded border border-gray-300 text-xs"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="font-semibold text-xs">Degree & Field of Study *</label>
                      <input
                        type="text"
                        name="fieldOfStudy"
                        value={form.fieldOfStudy}
                        onChange={(e) => handleChange(idx, e)}
                        placeholder="e.g., Computer Science"
                        className="w-full p-2 mt-1 rounded border border-gray-300 text-xs"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="font-semibold text-xs">Percentage *</label>
                      <input
                        type="text"
                        name="percentage"
                        value={form.percentage}
                        onChange={(e) => handleChange(idx, e)}
                        placeholder="e.g., 85%"
                        className="w-full p-2 mt-1 rounded border border-gray-300 text-xs"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="font-semibold text-xs">Start Month *</label>
                      <select
                        name="gradMonth"
                        value={form.gradMonth}
                        onChange={(e) => handleChange(idx, e)}
                        className="w-full p-2 mt-1 rounded border border-gray-300 text-xs bg-white"
                      >
                        <option value="">Select month</option>
                        {months.map((month) => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="font-semibold text-xs">Start Year *</label>
                      <select
                        name="gradYear"
                        value={form.gradYear}
                        onChange={(e) => handleChange(idx, e)}
                        className="w-full p-2 mt-1 rounded border border-gray-300 text-xs bg-white"
                      >
                        <option value="">Select year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="font-semibold text-xs">End Month *</label>
                      <select
                        name="endMonth"
                        value={form.endMonth}
                        onChange={(e) => handleChange(idx, e)}
                        className="w-full p-2 mt-1 rounded border border-gray-300 text-xs bg-white"
                      >
                        <option value="">Select month</option>
                        {months.map((month) => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="font-semibold text-xs">End Year *</label>
                      <select
                        name="endYear"
                        value={form.endYear}
                        onChange={(e) => handleChange(idx, e)}
                        className="w-full p-2 mt-1 rounded border border-gray-300 text-xs bg-white"
                      >
                        <option value="">Select year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Coursework */}
                  <div>
                    <button
                      type="button"
                      className="text-blue-600 font-medium text-sm mb-2"
                      onClick={() => handleToggleCoursework(idx)}
                    >
                      {showCoursework[idx] ? '▼ Hide extra courses' : '▶ Add extra courses'}
                    </button>
                    {showCoursework[idx] && (
                      <div className="p-3 bg-blue-50 rounded border border-blue-200">
                        <textarea
                          name="coursework"
                          value={form.coursework}
                          onChange={(e) => handleChange(idx, e)}
                          placeholder="List additional coursework, certifications..."
                          rows={3}
                          className="w-full p-2 rounded border border-gray-300 text-xs"
                        />
                        <div className="mt-3 text-xs text-gray-600">
                          💡 <b>Tip:</b> You can list online courses, workshops, or certifications here.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-4 text-xs p-2 rounded-lg border ${
            isFormValid() 
              ? 'text-green-600 bg-green-50 border-green-200' 
              : 'text-red-600 bg-red-50 border-red-200'
          }`}>
            {isFormValid() ? '✓ All education fields are complete' : '⚠ Please fill all required fields'}
          </div>
          
          <div className="flex justify-end mt-5">
            {isEditingMode ? (
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-6 py-2 shadow-sm transition"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                disabled={!isFormValid()}
                className={`font-semibold rounded-full px-6 py-2 shadow-sm transition ${
                  isFormValid()
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                {isFormValid() ? 'Next' : 'Fill Required Fields'}
              </button>
            )}
          </div>
        </div>

        {/* Right section - Template Preview */}
        {!isMobile && (
          <div className="flex-1 flex justify-center items-start">
            <div className=" p-0 rounded-xl  w-[800px] min-h-[1000px] overflow-auto">
              <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
                {renderTemplate()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationTab;
