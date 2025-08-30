'use client'
import React from 'react';
import { Menu, X } from 'lucide-react';

interface Step {
  number: number;
  label: string;
}

interface ProgressSidebarProps {
  selectedStep: number;
  completeness: number;
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  onStepClick: (stepIndex: number) => void;
  onToggleMobileMenu: () => void;
}

const steps: Step[] = [
  { number: 1, label: 'Templates' },
  { number: 2, label: 'Profile' },
  { number: 3, label: 'Education' },
  { number: 4, label: 'Experience' },
  { number: 5, label: 'Skills' },
  { number: 6, label: 'Career Overview' },
  { number: 7, label: 'Wrap-Up' },
];

const ProgressSidebar: React.FC<ProgressSidebarProps> = ({
  selectedStep,
  completeness,
  isMobile,
  isMobileMenuOpen,
  onStepClick,
  onToggleMobileMenu,
}) => {
  return (
    <>
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <button
          onClick={onToggleMobileMenu}
          className="fixed top-4 left-4 z-50 bg-purple-900 border-2 border-white rounded-lg p-2 shadow-lg"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 h-screen bg-purple-900 text-white z-50 flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out
          ${isMobile ? 'w-1/2' : 'w-50'}
          ${isMobile ? (isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
          ${isMobile ? 'pt-20 px-6 pb-6' : 'pt-8 px-6 pb-8'}
        `}
      >
        {/* Logo */}
        <div className={`font-bold mb-5 tracking-wider ${isMobile ? 'text-center text-base' : 'text-lg'}`}>
          Build Resume
          <span className="text-purple-300 text-sm ml-1"></span>
        </div>

        {/* Steps */}
        <div className="mb-8 w-full flex-1">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              onClick={() => onStepClick(idx)}
              className={`
                flex items-center cursor-pointer transition-opacity duration-200
                ${idx < steps.length - 1 ? 'mb-3' : ''}
                ${selectedStep === idx ? 'opacity-100' : 'opacity-85'}
                ${isMobile ? 'py-1.5' : 'py-0'}
              `}
            >
              {/* Step Circle */}
              <div
                className={`
                  rounded-full border-2 border-white flex items-center justify-center font-bold text-xs flex-shrink-0 transition-all duration-200
                  ${isMobile ? 'w-6 h-6' : 'w-7 h-7'}
                  ${selectedStep === idx 
                    ? 'bg-white text-purple-700' 
                    : 'bg-transparent text-white'
                  }
                `}
              >
                {step.number}
              </div>

              {/* Step Label */}
              <span
                className={`
                  ml-2.5 text-xs transition-all duration-200
                  ${selectedStep === idx 
                    ? 'font-bold text-white drop-shadow-sm' 
                    : 'font-medium text-purple-100'
                  }
                  ${isMobile ? 'break-words' : ''}
                `}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="mt-auto w-full">
          <div className={`font-bold text-purple-300 mb-1.5 ${isMobile ? 'text-center text-xs' : 'text-sm'}`}>
            Status:
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white bg-opacity-20 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-300 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${completeness}%` }}
            />
          </div>
          
          <div className={`text-purple-100 mt-1.5 ${isMobile ? 'text-center text-xs' : 'text-sm'}`}>
            {completeness}% Complete
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressSidebar;