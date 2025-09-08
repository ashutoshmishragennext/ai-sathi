// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';
// import React, { useState, useEffect } from 'react';
// import Template1 from './Templates/template1';
// import Template2 from './Templates/template2';

// // Types
// interface TemplateData {
//   color: string;
//   recommended: boolean;
//   accent: string;
//   bg: string;
//   name: string;
//   component: React.ComponentType<any>;
// }

// interface TemplateTabProps {
//   onUseTemplate?: (index: number) => void;
// }

// // Template Registry
// const templateRegistry: TemplateData[] = [
//   {
//     color: '#2563eb',
//     recommended: true,
//     accent: '#2563eb',
//     bg: '#e0e7ef',
//     name: 'Template 1',
//     component: Template1,
//   },
//   {
//     color: '#222',
//     recommended: true,
//     accent: '#222',
//     bg: '#fff',
//     name: 'Template 2',
//     component: Template2,
//   },
// ];

// const TemplateTab: React.FC<TemplateTabProps> = ({ onUseTemplate }) => {
//   const [selectedIdx, setSelectedIdx] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
    
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Fixed template renderer with proper scaling
//   const renderTemplate = (templateData: TemplateData, index: number) => {
//     const TemplateComponent = templateData.component;
    
//     // Check if component exists
//     if (!TemplateComponent) {
//       return (
//         <div className="flex items-center justify-center h-full">
//           <p className="text-red-500">Template {index + 1} not found</p>
//         </div>
//       );
//     }

//     // Sample data structure
//     const sampleData = {
//       heading: {
//         firstName: 'John',
//         surname: 'Doe',
//         email: 'john.doe@example.com',
//         phone: '+1 234 567 8900',
//         city: 'New York',
//         country: 'NY',
//         pin: '10001',
//         profession: 'Software Engineer',
//         photo: null,
//       },
//       summary: 'Passionate software engineer with 3+ years of experience in developing scalable web applications using modern technologies.',
//       experience: [
//         {
//           jobTitle: 'Software Engineer',
//           company: 'Tech Corp',
//           location: 'New York, NY',
//           startDate: '2022-01',
//           endDate: null,
//           current: true,
//           description: 'Built scalable web applications using React and Node.js.',
//         }
//       ],
//       education: [
//         {
//           degree: 'Bachelor of Science',
//           fieldOfStudy: 'Computer Science',
//           schoolName: 'University of Technology',
//           startDate: '2018-09',
//           endDate: '2022-05',
//           grade: '3.8 GPA',
//           description: 'Focused on software engineering and algorithms.',
//         }
//       ],
//       skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Git'],
//     };

//     try {
//       // Calculate proper scale to fit the preview box
//       const previewWidth = isMobile ? 350 : 450;
//       const previewHeight = isMobile ? 250 : 350;
//       const templateWidth = 800;  // Assumed template width
//       const templateHeight = 1000; // Assumed template height
      
//       // Calculate scale to fit both width and height
//       const scaleX = previewWidth / templateWidth;
//       const scaleY = previewHeight / templateHeight;
//       const scale = Math.min(scaleX, scaleY);

//       return (
//         <div className={`
//           ${isMobile ? 'w-full h-64' : 'w-[450px] h-[380px]'}
//           flex items-center justify-center overflow-hidden relative border rounded-lg
//         `}
//           style={{ backgroundColor: templateData.bg }}
//         >
//           <div 
//             className="pointer-events-none"
//             style={{
//               transform: `scale(${scale})`,
//               transformOrigin: 'center center',
//               width: `${templateWidth}px`,
//               height: `${templateHeight}px`,
//             }}
//           >
//             <TemplateComponent formData={sampleData} />
//           </div>
//         </div>
//       );
//     } catch (error) {
//       console.error(`Error rendering template ${index + 1}:`, error);
//       return (
//         <div className="flex items-center justify-center h-full">
//           <p className="text-red-500">Error loading Template {index + 1}</p>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-transparent pt-8 md:pt-32">
//       <div className={`max-w-[1100px] mx-auto ${isMobile ? 'px-4 -mt-20' : 'px-6'}`}>
//         <h1 className={`font-bold text-center text-gray-900 ${isMobile ? 'text-2xl mb-2 leading-5' : 'text-3xl mb-2 leading-10'}`}>
//           Best templates for students
//         </h1>
//         <div className={`text-gray-600 text-center ${isMobile ? 'text-base mb-6 px-4' : 'text-lg mb-9'}`}>
//           You can always change your template later. ({templateRegistry.length} templates available)
//         </div>

//         <div className={`
//           ${isMobile ? 
//             'flex flex-col items-center gap-6 mb-6' : 
//             templateRegistry.length <= 2 ? 
//               'flex flex-row gap-8 mb-10 justify-center items-start' :
//               'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 justify-items-center'
//           }
//         `}>
//           {templateRegistry.map((tpl, idx) => (
//             <div
//               key={idx}
//               onClick={() => setSelectedIdx(idx)}
//               className={`
//                 bg-white rounded-lg shadow-sm cursor-pointer transition-all duration-200 relative
//                 ${isMobile ? 'w-full max-w-[400px] h-80' : 'w-[480px] h-[420px]'}
//                 flex flex-col items-center overflow-hidden hover:shadow-lg
//                 ${selectedIdx === idx ? 'border-4 border-blue-600 shadow-xl' : 'border-4 border-gray-200'}
//               `}
//             >
//               {/* Preview container */}
//               <div className="flex-1 w-full flex items-center justify-center p-4">
//                 {renderTemplate(tpl, idx)}
//               </div>

//               {/* Template name bar at bottom */}
//               <div className="w-full bg-black bg-opacity-70 text-white text-center py-3">
//                 <span className="text-sm font-medium">{tpl.name}</span>
//               </div>

//               {/* Recommended badge */}
//               {tpl.recommended && (
//                 <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
//                   RECOMMENDED
//                 </div>
//               )}

//               {/* Mobile button */}
//               {isMobile && selectedIdx === idx && (
//                 <button
//                   onClick={(e) => {
//                     onUseTemplate && onUseTemplate(idx);
//                   }}
//                   className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-purple-700 text-white border-none font-bold text-sm rounded-full py-2 px-5 cursor-pointer shadow-lg z-20"
//                 >
//                   Use this template
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Desktop Action buttons */}
//         {!isMobile && (
//           <div className="flex flex-row justify-center gap-8 mb-8 items-center">
//             <button
//               className="bg-purple-700 text-white border-none font-bold text-lg rounded-full py-2 px-8 cursor-pointer shadow-sm hover:bg-purple-800 transition-colors"
//               onClick={() => onUseTemplate && onUseTemplate(selectedIdx)}
//             >
//               Use {templateRegistry[selectedIdx]?.name || 'this template'}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TemplateTab;



/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import Template1 from './Templates/template1';
import Template2 from './Templates/template2';

// Types
interface TemplateData {
  color: string;
  recommended: boolean;
  accent: string;
  bg: string;
  name: string;
  component: React.ComponentType<any>;
}

interface TemplateTabProps {
  onUseTemplate?: (index: number) => void;
}

// Template Registry
const templateRegistry: TemplateData[] = [
  {
    color: '#2563eb',
    recommended: true,
    accent: '#2563eb',
    bg: '#e0e7ef',
    name: 'Template 1',
    component: Template1,
  },
  {
    color: '#222',
    recommended: true,
    accent: '#222',
    bg: '#fff',
    name: 'Template 2',
    component: Template2,
  },
];

const TemplateTab: React.FC<TemplateTabProps> = ({ onUseTemplate }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fixed template renderer with proper scaling
  const renderTemplate = (templateData: TemplateData, index: number) => {
    const TemplateComponent = templateData.component;
    
    // Check if component exists
    if (!TemplateComponent) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">Template {index + 1} not found</p>
        </div>
      );
    }

    // Sample data structure
    const sampleData = {
      heading: {
        firstName: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        city: 'New York',
        country: 'NY',
        pin: '10001',
        profession: 'Software Engineer',
        photo: null,
      },
      summary: 'Passionate software engineer with 3+ years of experience in developing scalable web applications using modern technologies.',
      experience: [
        {
          jobTitle: 'Software Engineer',
          company: 'Tech Corp',
          location: 'New York, NY',
          startDate: '2022-01',
          endDate: null,
          current: true,
          description: 'Built scalable web applications using React and Node.js.',
        }
      ],
      education: [
        {
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          schoolName: 'University of Technology',
          startDate: '2018-09',
          endDate: '2022-05',
          grade: '3.8 GPA',
          description: 'Focused on software engineering and algorithms.',
        }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Git'],
    };

    try {
      // Calculate proper scale to fit the preview box
      const previewWidth = isMobile ? 350 : 450;
      const previewHeight = isMobile ? 250 : 350;
      const templateWidth = 800;  // Assumed template width
      const templateHeight = 1000; // Assumed template height
      
      // Calculate scale to fit both width and height
      const scaleX = previewWidth / templateWidth;
      const scaleY = previewHeight / templateHeight;
      const scale = Math.min(scaleX, scaleY);

      return (
        <div className={`
          ${isMobile ? 'w-full h-64' : 'w-full h-[380px]'}
          flex items-center justify-center overflow-hidden relative border rounded-lg
        `}
          style={{ backgroundColor: templateData.bg }}
        >
          <div 
            className="pointer-events-none"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              width: `${templateWidth}px`,
              height: `${templateHeight}px`,
            }}
          >
            <TemplateComponent formData={sampleData} />
          </div>
        </div>
      );
    } catch (error) {
      console.error(`Error rendering template ${index + 1}:`, error);
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">Error loading Template {index + 1}</p>
        </div>
      );
    }
  };

  const handleUseTemplate = (index: number) => {
    if (onUseTemplate) {
      onUseTemplate(index);
    }
  };

  return (
    <div className="w-full min-h-screen bg-transparent pt-32 md:pt-2">
      <div className={`max-w-[1100px] mx-auto ${isMobile ? 'px-4 -mt-20' : 'px-6'}`}>
        <h1 className={`font-bold text-center text-gray-900 ${isMobile ? 'text-2xl mb-2 leading-5' : 'text-3xl mb-2 leading-10'}`}>
          Best templates for students
        </h1>
        <div className={`text-gray-600 text-center ${isMobile ? 'text-base mb-6 px-4' : 'text-lg mb-9'}`}>
          You can always change your template later. ({templateRegistry.length} templates available)
        </div>

        <div className={`
          ${isMobile ? 
            'flex flex-col items-center gap-6 mb-6' : 
            templateRegistry.length <= 2 ? 
              'flex flex-row gap-8 mb-10 justify-center items-start' :
  'flex flex-col items-center gap-8 mb-10'          }
        `}>
          {templateRegistry.map((tpl, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`
  bg-white rounded-lg shadow-sm cursor-pointer transition-all duration-200 relative
  ${isMobile ? 'w-full max-w-[400px] h-80' : 'w-[480px] h-[420px]'}
  flex flex-col items-center overflow-hidden hover:shadow-lg
  ${selectedIdx === idx ? 'border-4 border-blue-600 shadow-xl' : 'border-4 border-gray-200'}
`}
            >
              {/* Preview container */}
              <div className="flex-1 w-full flex items-center justify-center p-4">
                {renderTemplate(tpl, idx)}
              </div>

              {/* Template name bar at bottom */}
              <div className="w-full bg-black bg-opacity-70 text-white text-center py-3">
                <span className="text-sm font-medium">{tpl.name}</span>
              </div>

              {/* Recommended badge */}
              {tpl.recommended && (
                <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                  RECOMMENDED
                </div>
              )}

              {/* Mobile button */}
              {isMobile && selectedIdx === idx && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUseTemplate(idx);
                  }}
                  className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-purple-700 text-white border-none font-bold text-sm rounded-full py-2 px-5 cursor-pointer shadow-lg z-20"
                >
                  Use this template
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Action buttons */}
        {!isMobile && (
          <div className="flex flex-row justify-center gap-8 mb-8 items-center">
            <button
              className="bg-purple-700 text-white border-none font-bold text-lg rounded-full py-2 px-8 cursor-pointer shadow-sm hover:bg-purple-800 transition-colors"
              onClick={() => handleUseTemplate(selectedIdx)}
            >
              Use {templateRegistry[selectedIdx]?.name || 'this template'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateTab;