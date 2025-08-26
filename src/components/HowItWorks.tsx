'use client';

import { useState, useEffect } from 'react';

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    {
      step: 1,
      title: 'Choose Template',
      description: 'Select from our collection of professional templates designed for different industries.',
      icon: '📄',
    },
    {
      step: 2,
      title: 'Fill Information',
      description: 'Input your details, experience, and skills. Our AI will help optimize your content.',
      icon: '✏️',
    },
    {
      step: 3,
      title: 'Download & Apply',
      description: 'Download your professional resume in multiple formats and start applying to jobs.',
      icon: '📥',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 relative inline-block">
            How <span className="text-blue-600">AiSaathi</span> Works
            <span className="absolute bottom-[-6px] left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 mt-2 max-w-xl mx-auto">
            Create a professional resume in just three simple steps
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-6 items-start relative">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className={`bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-transparent hover:border-blue-200 w-full max-w-[280px] mx-auto md:mx-0 opacity-0 ${isVisible ? 'animate-fadeInUp' : ''}`}
              style={{ animationDelay: `${index * 200}ms` } as React.CSSProperties}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center font-semibold text-sm shadow-md">
                {step.step}
              </div>
              <div className="text-2xl text-blue-600 mb-3 text-center">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm text-center">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[80%] w-[40%] h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-30 z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          opacity: 1;
          animation-name: fadeInUp;
          animation-duration: 0.6s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
}