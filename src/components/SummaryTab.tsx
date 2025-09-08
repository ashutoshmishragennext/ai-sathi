// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from 'react';

// // Types
// interface SummaryTabProps {
//   onGoBack?: () => void;
//   onNext?: () => void;
//   formData?: string;
//   updateFormData: (data: string) => void;
//   selectedTemplate?: React.ReactElement<TemplateProps>;
//   fullFormData?: any;
// }
// interface TemplateProps {
//   formData: {
//     heading: any;
//     education: any[];
//     experience: any[];
//     skills: any[];
//     summary: string;
//   };
// }
// const SummaryTab: React.FC<SummaryTabProps> = (props) => {
//   const { onGoBack, onNext, formData, updateFormData, selectedTemplate, fullFormData } = props;
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

//   const summary = formData || '';

//   // Validation function to check if summary is filled
//   const isFormValid = (): boolean => {
//     return summary.trim().length >= 50; // Minimum 50 characters for a meaningful summary
//   };

//   const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     updateFormData(e.target.value);
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
//           skills: fullFormData?.skills || [], 
//           summary: summary 
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
//     <div className="max-w-[1400px] mx-auto w-full p-4 md:p-8 box-border">
//       <div className="flex justify-between items-center mb-5 ml-2 md:ml-0">
//         <h1 className={`font-bold m-0 ${isMobile ? 'text-xl -mt-28' : 'text-3xl'}`}>
//           Career Overview
//         </h1>
//       </div>
      
//       {/* Main content area with flex layout */}
//       <div className={`flex ${isMobile ? 'flex-col gap-0' : 'flex-row gap-5'} mb-8 w-full`}>
        
//         {/* Left section - Form */}
//         <div className={`
//           bg-gray-50 rounded-xl overflow-y-auto box-border
//           ${isMobile ? 
//             'w-full h-[470px] p-3 -mt-11' : 
//             'w-[420px] max-w-[420px] h-[600px] p-4 ml-2'}
//         `}>
//           {!isEditingMode && (
//             <button
//               onClick={onGoBack}
//               className="bg-transparent border-none text-blue-600 font-semibold cursor-pointer flex items-center gap-2 mb-6 p-0 text-sm"
//             >
//               <span>←</span> Go Back
//             </button>
//           )}
          
//           <div className="relative">
//             <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2">
//               Write a compelling summary of your background and goals
//             </h3>
            
//             {/* Required field indicator */}
//             <div className="absolute -top-8 md:-top-10 right-0 text-xs font-medium text-red-500">
//               * indicates a required field
//             </div>
            
//             <div className="flex flex-col gap-6">
//               <div className="bg-blue-50 rounded-xl p-4 md:p-5 mb-4 shadow-sm relative w-full box-border">
//                 <textarea
//                   value={summary}
//                   onChange={handleSummaryChange}
//                   placeholder="Write a brief summary about your background, experience, and goals..."
//                   rows={6}
//                   className="w-full p-3 text-sm border border-gray-300 rounded outline-none bg-white resize-y min-h-[200px] box-border"
//                 />
//                 <div className={`mt-2 text-xs flex justify-between items-center ${summary.trim().length >= 50 ? 'text-green-600' : 'text-red-500'}`}>
//                   <span>
//                     {summary.trim().length >= 50 ? '✓ Summary is complete' : `Write at least ${50 - summary.trim().length} more characters`}
//                   </span>
//                   <span className="font-medium">
//                     {summary.trim().length}/50 characters
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex justify-end gap-4 mt-8">
//             {isEditingMode ? (
//               <button
//                 type="button"
//                 onClick={handleSave}
//                 className="border-none bg-blue-600 text-white font-bold text-lg rounded-full py-2 px-9 cursor-pointer"
//               >
//                 Save Changes
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={onNext}
//                 disabled={!isFormValid()}
//                 className={`
//                   border-none text-white font-bold text-lg rounded-full py-2 px-9 transition-all duration-200
//                   ${isFormValid() ? 
//                     'bg-purple-700 cursor-pointer' : 
//                     'bg-gray-400 cursor-not-allowed opacity-60'}
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

// export default SummaryTab;


/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

// Types
interface SummaryTabProps {
  onGoBack?: () => void;
  onNext?: () => void;
  formData?: string;
  updateFormData: (data: string) => void;
  selectedTemplate?: React.ReactElement<TemplateProps>;
  fullFormData?: any;
}
interface TemplateProps {
  formData: {
    heading: any;
    education: any[];
    experience: any[];
    skills: any[];
    summary: string;
  };
}

const SummaryTab: React.FC<SummaryTabProps> = (props) => {
  const { onGoBack, onNext, formData, updateFormData, selectedTemplate, fullFormData } = props;
  const isEditingMode = !onNext || !onGoBack;
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const summary = formData || "";

  // Validation function
  const isFormValid = (): boolean => {
    return summary.trim().length >= 50;
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData(e.target.value);
  };

  const handleSave = () => {
    if (onNext) {
      onNext();
    }
  };

  // const renderTemplate = () => {
  //   if (selectedTemplate && React.isValidElement(selectedTemplate)) {
  //     return React.cloneElement(selectedTemplate, {
  //       formData: {
  //         heading: fullFormData?.heading || {},
  //         education: fullFormData?.education || [],
  //         experience: fullFormData?.experience || [],
  //         skills: fullFormData?.skills || [],
  //         summary: summary,
  //       },
  //     });
  //   }
  //   return (
  //     <div className="w-full h-full flex items-center justify-center text-6xl">
  //       <span role="img" aria-label="resume">
  //         📄
  //       </span>
  //     </div>
  //   );
  // };

  return (
    <div className="max-w-[1400px] mx-auto w-full p-4 md:p-8 box-border">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`font-bold m-0 ${isMobile ? "text-xl" : "text-3xl"}`}>
          Career Overview
        </h1>
      </div>

      {/* Main Layout */}
      <div
        className={`flex ${
          isMobile ? "flex-col gap-6" : "flex-row gap-8"
        } w-full`}
      >
        {/* Left Section - Form */}
        <div
          className={`
          bg-gray-50 rounded-xl overflow-y-auto box-border shadow-sm
          ${isMobile ? "w-full h-[480px] p-4" : "w-[420px] h-[600px] p-5"}
        `}
        >
          {!isEditingMode && (
            <button
              onClick={onGoBack}
              className="bg-transparent border-none text-blue-600 font-semibold cursor-pointer flex items-center gap-2 mb-4 p-0 text-sm"
            >
              <span>←</span> Go Back
            </button>
          )}

          <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-3">
            Write a compelling summary of your background and goals
          </h3>

          {/* Required note */}
          <div className="text-xs font-medium text-red-500 mb-4">
            * indicates a required field
          </div>

          {/* Textarea */}
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm relative w-full box-border">
            <textarea
              value={summary}
              onChange={handleSummaryChange}
              placeholder="Write a brief summary about your background, experience, and goals..."
              rows={6}
              className="w-full p-3 text-sm border border-gray-300 rounded outline-none bg-white resize-y min-h-[200px] box-border"
            />
            <div
              className={`mt-2 text-xs flex justify-between items-center ${
                summary.trim().length >= 50
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              <span>
                {summary.trim().length >= 50
                  ? "✓ Summary is complete"
                  : `Write at least ${50 - summary.trim().length} more characters`}
              </span>
              <span className="font-medium">
                {summary.trim().length}/50 characters
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6">
            {isEditingMode ? (
              <button
                type="button"
                onClick={handleSave}
                className="border-none bg-blue-600 text-white font-bold text-lg rounded-full py-2 px-8 cursor-pointer"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                disabled={!isFormValid()}
                className={`border-none text-white font-bold text-lg rounded-full py-2 px-8 transition-all duration-200 ${
                  isFormValid()
                    ? "bg-purple-700 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed opacity-60"
                }`}
              >
                {isFormValid() ? "Next" : "Fill Required Fields"}
              </button>
            )}
          </div>
        </div>

        {/* Right Section - Preview */}
       
      </div>
    </div>
  );
};

export default SummaryTab;
