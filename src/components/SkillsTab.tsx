// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from 'react';

// interface FormData {
//   heading?: any;
//   education?: any[];
//   experience?: any[];
//   skills?: string[];
//   summary?: string;
// }
// interface TemplateProps {
//   formData: {
//     heading: any;
//     education: any[];
//     experience: any[];
//     skills: string[];
//     summary: string;
//   };
// }
// interface SkillsTabProps {
//   onGoBack?: () => void;
//   onNext?: () => void;
//   formData: string[];
//   updateFormData: (data: string[]) => void;
//   selectedTemplate?: React.ReactElement<TemplateProps>;
//   fullFormData?: FormData;
// }

// const SkillsTab: React.FC<SkillsTabProps> = ({
//   onGoBack,
//   onNext,
//   formData,
//   updateFormData,
//   selectedTemplate,
//   fullFormData
// }) => {
//   const isEditingMode = !onNext || !onGoBack;
//   const [isMobile, setIsMobile] = useState(false);

//   // Check if device is mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
    
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const skills = formData && formData.length > 0 ? formData : [''];

//   // Validation function to check if all required fields are filled
//   const isFormValid = () => {
//     return skills.every(skill => skill.trim() !== '') && skills.length > 0;
//   };

//   const handleSkillChange = (index: number, value: string) => {
//     const updatedSkills = [...skills];
//     updatedSkills[index] = value;
//     updateFormData(updatedSkills);
//   };

//   const handleAddSkill = () => {
//     const updatedSkills = [...skills, ''];
//     updateFormData(updatedSkills);
//   };

//   const handleRemoveSkill = (index: number) => {
//     if (skills.length > 1) {
//       const updatedSkills = skills.filter((_, i) => i !== index);
//       updateFormData(updatedSkills);
//     }
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
//           education: fullFormData?.education || [], 
//           experience: fullFormData?.experience || [], 
//           skills: skills, 
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
//     <div className="max-w-7xl mx-auto p-4 sm:p-2 w-full box-border">
//       <div className="flex justify-between items-center mb-5 ml-4 sm:ml-25">
//         <h1 className={`text-3xl font-bold m-0 ${isMobile ? '-mt-30' : ''}`}>
//           Skills
//         </h1>
//       </div>
      
//       {/* Main content area */}
//       <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-5 sm:gap-0 mb-8 w-full`}>
        
//         {/* Left section - Form */}
//         <div className={`
//           bg-gray-50 rounded-xl p-4 overflow-y-auto box-border
//           ${isMobile ? 
//             'w-full h-[490px] -mt-11' : 
//             'w-[420px] max-w-[420px] h-[600px] ml-3'
//           }
//         `}>
//           {!isEditingMode && (
//             <button
//               onClick={onGoBack}
//               className="bg-transparent border-none text-blue-600 text-sm sm:text-xs font-semibold cursor-pointer flex items-center gap-2 mb-6 p-0"
//             >
//               <span>←</span> Go Back
//             </button>
//           )}
          
//           <div className="relative">
//             <h3 className="text-lg sm:text-base font-semibold text-slate-800 mb-2">
//               Add your technical
//             </h3>
//             <div className="text-slate-500 text-sm sm:text-xs mb-8">
//               List your key skills, technologies, and competencies
//             </div>
            
//             {/* Required field indicator */}
//             <div className="absolute -top-10 right-0 text-xs font-medium text-red-500">
//               * indicates a required field
//             </div>
            
//             <div className="flex flex-col gap-6">
//               <div className="bg-blue-50 rounded-xl p-5 sm:p-4 mb-4 shadow-sm relative w-full box-border">
//                 {skills.map((skill, index) => (
//                   <div key={index} className={index < skills.length - 1 ? 'mb-3' : ''}>
//                     <div className="flex items-center gap-3 sm:gap-2">
//                       <input
//                         type="text"
//                         value={skill}
//                         onChange={(e) => handleSkillChange(index, e.target.value)}
//                         placeholder="Enter a skill"
//                         className="flex-1 p-2 rounded border border-gray-300 text-sm bg-white box-border"
//                       />
//                       {skills.length > 1 && (
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveSkill(index)}
//                           className="bg-red-500 text-white border-none rounded px-3 py-1.5 text-xs font-semibold cursor-pointer min-w-[80px] sm:min-w-[60px]"
//                         >
//                           Remove
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={handleAddSkill}
//                   className="bg-blue-600 text-white border-none rounded px-5 py-2 text-sm font-semibold cursor-pointer mt-3 flex items-center gap-2"
//                 >
//                   + Add Skill
//                 </button>
//                 <div className={`mt-3 text-xs flex items-center gap-1.5 ${
//                   isFormValid() ? 'text-green-500' : 'text-red-500'
//                 }`}>
//                   {isFormValid() ? (
//                     <>
//                       <span>✓</span>
//                       <span>All skills are filled</span>
//                     </>
//                   ) : (
//                     <>
//                       <span>⚠</span>
//                       <span>Please fill all skill fields</span>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex justify-end gap-4 mt-8">
//             {isEditingMode ? (
//               <button
//                 type="button"
//                 onClick={handleSave}
//                 className="bg-blue-600 text-white font-bold rounded-full px-9 py-2.5 text-lg cursor-pointer border-none"
//               >
//                 Save Changes
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={onNext}
//                 disabled={!isFormValid()}
//                 className={`
//                   text-white font-bold rounded-full px-9 py-2.5 text-lg border-none
//                   ${isFormValid() 
//                     ? 'bg-purple-700 cursor-pointer' 
//                     : 'bg-gray-400 cursor-not-allowed opacity-60'
//                   }
//                   transition-all duration-200
//                 `}
//               >
//                 {isFormValid() ? 'Next' : 'Fill Required Fields'}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Right section - Template Preview with User Data */}
//         {!isMobile && (
//           <div className="flex-1 scale-75 origin-top w-[800px] h-full -mt-20 max-h-[1000px] overflow-auto">
//             {renderTemplate()}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SkillsTab;


/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

interface FormData {
  heading?: any;
  education?: any[];
  experience?: any[];
  skills?: string[];
  summary?: string;
}
interface TemplateProps {
  formData: {
    heading: any;
    education: any[];
    experience: any[];
    skills: string[];
    summary: string;
  };
}
interface SkillsTabProps {
  onGoBack?: () => void;
  onNext?: () => void;
  formData: string[];
  updateFormData: (data: string[]) => void;
  selectedTemplate?: React.ReactElement<TemplateProps>;
  fullFormData?: FormData;
}

const SkillsTab: React.FC<SkillsTabProps> = ({
  onGoBack,
  onNext,
  formData,
  updateFormData,
  selectedTemplate,
  fullFormData,
}) => {
  const isEditingMode = !onNext || !onGoBack;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const skills = formData && formData.length > 0 ? formData : [""];

  const isFormValid = () => {
    return skills.every((skill) => skill.trim() !== "") && skills.length > 0;
  };

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    updateFormData(updatedSkills);
  };

  const handleAddSkill = () => {
    const updatedSkills = [...skills, ""];
    updateFormData(updatedSkills);
  };

  const handleRemoveSkill = (index: number) => {
    if (skills.length > 1) {
      const updatedSkills = skills.filter((_, i) => i !== index);
      updateFormData(updatedSkills);
    }
  };

  const handleSave = () => {
    if (onNext) {
      onNext();
    }
  };



  return (
    <div className="max-w-7xl mx-auto p-6 w-full box-border">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Skills</h1>
      </div>

      {/* Main container */}
      <div
        className={`flex ${
          isMobile ? "flex-col" : "flex-row"
        } gap-6 w-full`}
      >
        {/* Left Form Section */}
        <div
          className={`bg-gray-50 rounded-xl p-6 shadow-sm box-border
          ${isMobile ? "w-full h-auto" : "w-[420px] h-[600px] overflow-y-auto"}
        `}
        >
          {!isEditingMode && (
            <button
              onClick={onGoBack}
              className="text-blue-600 text-sm font-semibold cursor-pointer flex items-center gap-2 mb-4"
            >
              <span>←</span> Go Back
            </button>
          )}

          <div className="relative">
            <h3 className="text-lg font-semibold text-slate-800 mb-1">
              Add your technical
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              List your key skills, technologies, and competencies
            </p>

            <div className="absolute -top-6 right-0 text-xs font-medium text-red-500">
              * Required
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-blue-50 rounded-xl p-4 shadow-sm box-border">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 mb-3 last:mb-0`}
                  >
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      placeholder="Enter a skill"
                      className="flex-1 p-2 rounded border border-gray-300 text-sm bg-white"
                    />
                    {skills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        className="bg-red-500 text-white rounded px-3 py-1.5 text-xs font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-blue-600 text-white rounded px-5 py-2 text-sm font-semibold mt-3 flex items-center gap-2"
                >
                  + Add Skill
                </button>

                <div
                  className={`mt-3 text-xs flex items-center gap-1.5 ${
                    isFormValid() ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isFormValid() ? (
                    <>
                      <span>✓</span>
                      <span>All skills are filled</span>
                    </>
                  ) : (
                    <>
                      <span>⚠</span>
                      <span>Please fill all skill fields</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            {isEditingMode ? (
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-600 text-white font-bold rounded-full px-8 py-2 text-base"
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
                      ? "bg-purple-700 text-white cursor-pointer"
                      : "bg-gray-400 text-white cursor-not-allowed opacity-60"
                  } transition-all duration-200`}
              >
                {isFormValid() ? "Next" : "Fill Required Fields"}
              </button>
            )}
          </div>
        </div>

        {/* Right Template Preview */}
       
      </div>
    </div>
  );
};

export default SkillsTab;
