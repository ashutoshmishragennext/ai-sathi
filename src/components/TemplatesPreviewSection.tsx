'use client';

import React, { useState, useEffect, useRef } from 'react';
import Template1 from './Templates/template1';
import Template2 from './Templates/template2';
import Template3 from './Templates/template3';
import Template4 from './Templates/template4';
// import Template5 from './Templates/template5';

interface TemplateData {
  color: string;
  recommended: boolean;
  accent: string;
  bg: string;
  name: string;
  component: React.ComponentType<any>;
  category: string;
}

const templateRegistry: TemplateData[] = [
  {
    color: '#2563eb',
    recommended: true,
    accent: '#2563eb',
    bg: '#e0e7ef',
    name: 'CA Intern',
    component: Template1,
    category: 'professional',
  },
  {
    color: '#222',
    recommended: true,
    accent: '#222',
    bg: '#fff',
    name: 'CS Intern',
    component: Template2,
    category: 'modern',
  },
  {
    color: '#dc2626',
    recommended: false,
    accent: '#dc2626',
    bg: '#fef2f2',
    name: 'CMA Intern',
    component: Template3,
    category: 'creative',
  },
  {
    color: '#fc3434',        
    recommended:false,    
    accent: '#298585ednt-color',    
    bg: '#background-color',     
    name: 'General Purpose',  
    component: Template4,        
    category: 'Medical',  
  },
 

];

const TemplatesPreview = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  // Define filteredTemplates before useEffect
  const filteredTemplates = activeCategory === 'all'
    ? templateRegistry
    : templateRegistry.filter((template) => template.category === activeCategory);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (isAutoScrolling && filteredTemplates.length > 0) {
      scrollInterval.current = setInterval(() => {
        setSelectedIdx((prevIdx) => {
          const newIdx = (prevIdx + 1) % filteredTemplates.length;
          scrollToTemplate(newIdx);
          return newIdx;
        });
      }, 2000);
    }

    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, [isAutoScrolling, filteredTemplates.length]);

  const scrollToTemplate = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const templateWidth = container.children[0]?.clientWidth || 0;
      const scrollPosition = index * templateWidth;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleTemplateClick = (index: number) => {
    setSelectedIdx(index);
    scrollToTemplate(index);
    setIsAutoScrolling(false);

    // Resume auto scrolling after 5 seconds
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 5000);
  };

  const templateCategories = [
    { id: 'all', name: 'All Templates' },
    { id: 'professional', name: 'Professional' },
    { id: 'modern', name: 'Modern' },
    { id: 'creative', name: 'Creative' },
    { id: 'minimalist', name: 'Minimalist' },
  ];

 const renderTemplate = (templateData: TemplateData, index: number) => {
  const TemplateComponent = templateData.component;

  if (!TemplateComponent) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-red-500">Template {templateData.name} not found</p>
      </div>
    );
  }

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
      },
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
      },
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Git'],
  };

  try {
    return (
      <div className="relative h-[30rem] w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
        <div className="scale-50 origin-top-left w-[200%] h-[200%]">
          <TemplateComponent formData={sampleData} />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-center py-3">
          <span className="text-sm font-medium">{templateData.name}</span>
        </div>
        {templateData.recommended && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            RECOMMENDED
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error(`Error rendering template ${templateData.name}:`, error);
    return (
      <div className="flex items-center justify-center h-96 rounded-lg border border-gray-200 bg-gray-100">
        <p className="text-red-500">Error loading {templateData.name} template</p>
      </div>
    );
  }
};

  const handleUseTemplate = (index: number) => {
    console.log(`Selected template: ${filteredTemplates[index].name}`);
    // Implement template selection logic here
  };

  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional Resume Templates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of ATS-friendly templates designed for different career fields
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {templateCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setSelectedIdx(0); // Reset to first template when category changes
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-purple-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Templates Container with Horizontal Scroll */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 mb-8 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredTemplates.map((tpl, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[28rem] snap-start cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => handleTemplateClick(idx)}
            >
              {renderTemplate(tpl, idx)}
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mb-8">
          {filteredTemplates.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleTemplateClick(idx)}
              className={`w-3 h-3 rounded-full mx-1 transition-colors duration-200 ${
                idx === selectedIdx ? 'bg-purple-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`View ${filteredTemplates[idx]?.name || 'template'}`}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-row justify-center gap-8 mb-8 items-center">
          <button
            className="bg-purple-700 text-white border-none font-bold text-lg rounded-full py-2 px-8 cursor-pointer shadow-sm hover:bg-purple-800 transition-colors"
            onClick={() => handleUseTemplate(selectedIdx)}
          >
            Use {filteredTemplates[selectedIdx]?.name || 'this template'}
          </button>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-purple-100 rounded-2xl p-10 text-black shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to create your resume?</h3>
          <p className="text-purple-700 mb-6 max-w-2xl mx-auto">
            Join thousands of users who have landed their dream jobs with professionally designed resumes from AiSaathi
          </p>
          <button className="bg-purple-900 text-white font-semibold py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md transform hover:scale-105">
            Generate Your Resume Now
          </button>
        </div>

        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </section>
  );
};

export default TemplatesPreview;