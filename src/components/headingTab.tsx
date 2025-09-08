// import React, { useState, useRef, useEffect, ChangeEvent } from 'react';

// interface HeadingData {
//   firstName: string;
//   surname: string;
//   profession: string;
//   city: string;
//   country: string;
//   pin: string;
//   phone: string;
//   email: string;
//   photo: string | null;
// }
// interface TemplateProps {
//   formData: {
//     heading: HeadingData;
//     education: any[];
//     experience: any[];
//     skills: string[];
//     summary: string;
//   };
// }

// interface FormData {
//   heading?: HeadingData;
//   education?: any[];
//   experience?: any[];
//   skills?: string[];
//   summary?: string;
// }

// interface HeadingTabProps {
//   onGoBack?: () => void;
//   onNext?: () => void;
//   formData?: HeadingData;
//   updateFormData: (data: HeadingData) => void;
//   selectedTemplate?: React.ReactElement<TemplateProps>;
//   fullFormData?: FormData;
// }

// const HeadingTab: React.FC<HeadingTabProps> = ({
//   onGoBack,
//   onNext,
//   formData,
//   updateFormData,
//   selectedTemplate,
//   fullFormData
// }) => {
//   const isEditingMode = !onNext || !onGoBack;
//   const fileInputRef = useRef<HTMLInputElement>(null);
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

//   // Initialize with formData if it exists, otherwise use default
//   const heading = formData || {
//     firstName: '',
//     surname: '',
//     profession: '',
//     city: '',
//     country: '',
//     pin: '',
//     phone: '',
//     email: '',
//     photo: null,
//   };

//   // Validation function to check if all required fields are filled
//   const isFormValid = () => {
//     return (
//       heading.firstName.trim() !== '' &&
//       heading.surname.trim() !== '' &&
//       heading.profession.trim() !== '' &&
//       heading.city.trim() !== '' &&
//       heading.country.trim() !== '' &&
//       heading.pin.trim() !== '' &&
//       heading.phone.trim() !== '' &&
//       heading.email.trim() !== ''
//     );
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     updateFormData({ ...heading, [name]: value });
//   };

//   const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         updateFormData({ ...heading, photo: event.target?.result as string });
//       };
//       reader.readAsDataURL(file);
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
//           heading, 
//           education: fullFormData?.education || [], 
//           experience: fullFormData?.experience || [], 
//           skills: fullFormData?.skills || [], 
//           summary: fullFormData?.summary || '' 
//         } 
//       });
//     }
//     return (
//       <div className="w-full pt-8 h-full flex items-center justify-center text-6xl">
//         <span role="img" aria-label="resume">📄</span>
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4 sm:p-2 w-full box-border">
//       <div className="flex justify-between items-center mb-3 ml-4 sm:ml-23">
//         <h1 className={`flex items-center text-3xl pt-6 justify-center font-bold m-0 ${isMobile ? '-mt-30' : '-mt-3'}`}>
//           Profile 
//         </h1>
//       </div>
      
//       {/* Main content area */}
//       <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-5 sm:gap-0 mb-8 w-full`}>
        
//         {/* Left section - Form */}
//         <div className={`
//           bg-gray-50 rounded-xl p-4 overflow-y-auto box-border
//           ${isMobile ? 
//             'w-full h-[580px] -mt-10' : 
//             'w-[420px] max-w-[420px] h-[648px] -mt-3 ml-3'
//           }
//         `}>
//           {!isEditingMode && (
//             <button
//               type="button"
//               onClick={onGoBack}
//               className="text-blue-600 no-underline font-medium text-base sm:text-sm bg-transparent border-none cursor-pointer p-0 mb-0"
//             >
//               &larr; Go Back
//             </button>
//           )}
//           {!isEditingMode && (
//             <h1 className={`text-2xl font-bold m-0 mt-1 mb-2 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
//               Let's start with the basics
//             </h1>
//           )}
//           <div className="bg-blue-50 rounded-xl p-6 sm:p-5 mb-8 shadow-sm relative w-full box-border">
//             {!isEditingMode && (
//               <div className="absolute -top-16 sm:-top-18 right-0 text-red-500 text-xs font-medium">
//                 * indicates a required field
//               </div>
//             )}
//             {/* Photo Upload - First Row */}
//             <div className="flex flex-col items-start mb-1 w-full">
//               <div className="flex items-start gap-4 sm:gap-6 w-full">
//                 <div className="relative w-24 sm:w-28 h-24 sm:h-28 mb-3">
//                   <div className={`
//                     rounded-full bg-gray-100 border-2 border-blue-500 flex items-center justify-center overflow-hidden shadow-sm
//                     ${isMobile ? 'w-20 h-20' : 'w-24 h-24'}
//                   `}>
//                     {heading.photo ? (
//                       <img src={heading.photo} alt="Profile" className="w-full h-full object-cover rounded-full" />
//                     ) : (
//                       <span 
//                         role="img" 
//                         aria-label="avatar" 
//                         className={`text-gray-400 ${isMobile ? 'text-3xl' : 'text-4xl'}`}
//                       >
//                         👤
//                       </span>
//                     )}
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current?.click()}
//                     className="absolute bottom-0 right-0 bg-blue-500 text-white border-none rounded-full w-7 h-7 sm:w-9 sm:h-9 text-sm sm:text-base font-bold cursor-pointer shadow-sm flex items-center justify-center"
//                     aria-label="Upload photo"
//                   >
//                     <span role="img" aria-label="upload">📷</span>
//                   </button>
//                   <div className="text-slate-500 text-xs font-medium mt-2 whitespace-nowrap">
//                     Upload a passport size photo
//                   </div>

//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={handlePhotoUpload}
//                     className="hidden"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-3 sm:gap-4 flex-1 ml-5 sm:ml-9">
//                   <div>
//                     <label className="font-semibold text-sm">First Name *</label>
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={heading.firstName}
//                       onChange={handleChange}
//                       placeholder="Aarya"
//                       required
//                       className="w-full p-2 mt-1 mb-0 rounded border border-gray-300 text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="font-semibold text-sm">Surname *</label>
//                     <input
//                       type="text"
//                       name="surname"
//                       value={heading.surname}
//                       onChange={handleChange}
//                       placeholder="Sharma"
//                       required
//                       className="w-full p-2 mt-1 mb-0 rounded border border-gray-300 text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* Form fields */}
//             <div className="flex flex-col gap-4 w-full">
//               {/* Row 1: Profession and City */}
//               <div className="flex gap-2 sm:gap-3 w-full">
//                 <div className="flex-1">
//                   <label className="font-semibold text-sm">Profession *</label>
//                   <input
//                     type="text"
//                     name="profession"
//                     value={heading.profession}
//                     onChange={handleChange}
//                     placeholder="e.g. Software Engineer"
//                     required
//                     className="w-full p-2 mt-1 rounded border border-gray-300 text-sm box-border"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="font-semibold text-sm">City *</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={heading.city}
//                     onChange={handleChange}
//                     placeholder="Noida"
//                     required
//                     className="w-full p-2 mt-1 rounded border border-gray-300 text-sm box-border"
//                   />
//                 </div>
//               </div>

//               {/* Row 2: Country and Pin Code */}
//               <div className="flex gap-2 sm:gap-3 w-full">
//                 <div className="flex-1">
//                   <label className="font-semibold text-sm">Country *</label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={heading.country}
//                     onChange={handleChange}
//                     placeholder="India"
//                     required
//                     className="w-full p-2 mt-1 rounded border border-gray-300 text-sm box-border"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="font-semibold text-sm">Pin Code *</label>
//                   <input
//                     type="text"
//                     name="pin"
//                     value={heading.pin}
//                     onChange={handleChange}
//                     placeholder="201102"
//                     required
//                     className="w-full p-2 mt-1 rounded border border-gray-300 text-sm box-border"
//                   />
//                 </div>
//               </div>

//               {/* Row 3: Phone and Email */}
//               <div className="flex gap-2 sm:gap-3 w-full">
//                 <div className="flex-1">
//                   <label className="font-semibold text-sm">Phone *</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={heading.phone}
//                     onChange={handleChange}
//                     placeholder="+91 98765 43210"
//                     required
//                     className="w-full p-2 mt-1 rounded border border-gray-300 text-sm box-border"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="font-semibold text-sm">Email *</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={heading.email}
//                     onChange={handleChange}
//                     placeholder="aaryasharma@gmail.com"
//                     required
//                     className="w-full p-2 mt-1 rounded border border-gray-300 text-sm box-border"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className={`
//               mt-4 text-xs flex items-center gap-1.5 p-2 rounded border
//               ${isFormValid() 
//                 ? 'text-green-500 bg-green-50 border-green-200' 
//                 : 'text-red-500 bg-red-50 border-red-200'
//               }
//             `}>
//               {isFormValid() ? (
//                 <>
//                   <span>✓</span>
//                   <span>All profile fields are complete</span>
//                 </>
//               ) : (
//                 <>
//                   <span>⚠</span>
//                   <span>Please fill all required fields</span>
//                 </>
//               )}
//             </div>
//           </div>
//           <div className="flex justify-end gap-4 -mt-6">
//             {isEditingMode ? (
//               <button
//                 type="button"
//                 onClick={handleSave}
//                 className="bg-blue-500 text-white font-semibold rounded-full px-8 py-2 text-lg cursor-pointer border-none"
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
//                   transition-all duration-200 mt-3
//                 `}
//               >
//                 {isFormValid() ? 'Next' : 'Fill Required Fields'}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Right section - Template Preview with User Data */}
//         {!isMobile && (
//           <div className="flex-1 scale-75 origin-top w-[800px] h-[1100px] -mt-20 overflow-auto">
//             {renderTemplate()}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HeadingTab;


/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';

interface HeadingData {
  firstName: string;
  surname: string;
  profession: string;
  city: string;
  country: string;
  pin: string;
  phone: string;
  email: string;
  photo: string | null;
}
interface TemplateProps {
  formData: {
    heading: HeadingData;
    education: any[];
    experience: any[];
    skills: string[];
    summary: string;
  };
}

interface FormData {
  heading?: HeadingData;
  education?: any[];
  experience?: any[];
  skills?: string[];
  summary?: string;
}

interface HeadingTabProps {
  onGoBack?: () => void;
  onNext?: () => void;
  formData?: HeadingData;
  updateFormData: (data: HeadingData) => void;
  selectedTemplate?: React.ReactElement<TemplateProps>;
  fullFormData?: FormData;
}

const HeadingTab: React.FC<HeadingTabProps> = ({
  onGoBack,
  onNext,
  formData,
  updateFormData,
  selectedTemplate,
  fullFormData
}) => {
  const isEditingMode = !onNext || !onGoBack;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const heading = formData || {
    firstName: '',
    surname: '',
    profession: '',
    city: '',
    country: '',
    pin: '',
    phone: '',
    email: '',
    photo: null,
  };

  const isFormValid = () => {
    return (
      heading.firstName.trim() !== '' &&
      heading.surname.trim() !== '' &&
      heading.profession.trim() !== '' &&
      heading.city.trim() !== '' &&
      heading.country.trim() !== '' &&
      heading.pin.trim() !== '' &&
      heading.phone.trim() !== '' &&
      heading.email.trim() !== ''
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ ...heading, [name]: value });
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateFormData({ ...heading, photo: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (onNext) onNext();
  };

  // const renderTemplate = () => {
  //   if (selectedTemplate && React.isValidElement(selectedTemplate)) {
  //     return React.cloneElement(selectedTemplate, { 
  //       formData: { 
  //         heading, 
  //         education: fullFormData?.education || [], 
  //         experience: fullFormData?.experience || [], 
  //         skills: fullFormData?.skills || [], 
  //         summary: fullFormData?.summary || '' 
  //       } 
  //     });
  //   }
  //   return (
  //     <div className="w-full h-full flex items-center justify-center text-6xl">
  //       <span role="img" aria-label="resume">📄</span>
  //     </div>
  //   );
  // };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold w-full">Profile</h1>
      </div>

      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-8 w-full`}>
        {/* Left - Form */}
      <div className={`${isMobile ? 'w-full' : 'w-[420px] max-w-[420px]'} 
                bg-white rounded-xl shadow p-6
                h-auto max-h-[calc(100vh-2rem)] overflow-y-auto`}>
  {/* form content */}


          {!isEditingMode && (
            <button
              type="button"
              onClick={onGoBack}
              className="text-blue-600 font-medium mb-4"
            >
              &larr; Go Back
            </button>
          )}

          {!isEditingMode && (
            <h2 className="text-xl font-semibold mb-4">Lets start with the basics</h2>
          )}

          <div className="space-y-6">
            {/* Photo Upload */}
            <div className="flex items-start gap-6">
              <div className="relative w-24 h-24">
                <div className="w-full h-full rounded-full bg-gray-100 border-2 border-blue-500 flex items-center justify-center overflow-hidden shadow">
                  {heading.photo ? (
                    <img src={heading.photo} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-gray-400 text-4xl">👤</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow"
                >
                  📷
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <label className="block font-medium text-sm mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={heading.firstName}
                    onChange={handleChange}
                    placeholder="Aarya"
                    className="w-full p-1 rounded border border-gray-300 text-sm focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block font-medium text-sm mb-1">Surname *</label>
                  <input
                    type="text"
                    name="surname"
                    value={heading.surname}
                    onChange={handleChange}
                    placeholder="Sharma"
                    className="w-full p-2 rounded border border-gray-300 text-sm focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-sm mb-1">Profession *</label>
                <input
                  type="text"
                  name="profession"
                  value={heading.profession}
                  onChange={handleChange}
                  placeholder="Software Engineer"
                  className="w-full p-2 rounded border border-gray-300 text-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={heading.city}
                  onChange={handleChange}
                  placeholder="Noida"
                  className="w-full p-2 rounded border border-gray-300 text-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1">Country *</label>
                <input
                  type="text"
                  name="country"
                  value={heading.country}
                  onChange={handleChange}
                  placeholder="India"
                  className="w-full p-2 rounded border border-gray-300 text-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1">Pin Code *</label>
                <input
                  type="text"
                  name="pin"
                  value={heading.pin}
                  onChange={handleChange}
                  placeholder="201102"
                  className="w-full p-2 rounded border border-gray-300 text-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={heading.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full p-2 rounded border border-gray-300 text-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block font-medium text-sm mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={heading.email}
                  onChange={handleChange}
                  placeholder="aaryasharma@gmail.com"
                  className="w-full p-2 rounded border border-gray-300 text-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Status */}
            <div className={`mt-4 text-xs flex items-center gap-2 p-2 rounded border ${isFormValid() ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200'}`}>
              {isFormValid() ? '✓ All profile fields are complete' : '⚠ Please fill all required fields'}
            </div>

            {/* Action */}
            <div className="flex justify-end pt-2">
              {isEditingMode ? (
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-600 text-white font-medium rounded-full px-6 py-2 text-sm hover:bg-blue-700"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onNext}
                  disabled={!isFormValid()}
                  className={`px-6 py-2 text-sm font-semibold rounded-full text-white ${isFormValid() ? 'bg-purple-700 hover:bg-purple-800' : 'bg-gray-400 cursor-not-allowed opacity-60'}`}
                >
                  {isFormValid() ? 'Next' : 'Fill Required Fields'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right - Resume Preview */}
        {/* {!isMobile && (
          <div className="flex-1 overflow-auto rounded-xl border bg-white shadow-sm p-4">
            <div className="pt-6">{renderTemplate()}</div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default HeadingTab;
