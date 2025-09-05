/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect } from 'react'
import HeadingTab from './headingTab';
import TemplateTab from './TemplateTab';
import Template1 from './Templates/template1';
import EducationTab from './EductionTab';
import ExperienceTab from './ExperienceTab';
import SkillsTab from './SkillsTab';
import SummaryTab from './SummaryTab';
import FinalizeTab from './FinalizeTab';
import Template2 from './Templates/template2';
import InterviewPrepPricing from './languify/pricing';


const steps = [
  { number: 1, label: 'Templates'},
  { number: 2, label: 'Profile' },
  { number: 3, label: 'Education' },
  { number: 4, label: 'Experience' },
  { number: 5, label: 'Skills' },
  { number: 6, label: 'Career Overview' },
  { number: 7, label: 'Wrap-Up' },
];

const templateComponents = [
  <Template1 key={0} />,
  <Template2 key={1} />,
  <div key={2} style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:60}}><span role="img" aria-label="resume">📄</span></div>,
];

const FirstPage = ({ }) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [selectedTemplateIdx, setSelectedTemplateIdx] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showInterviewPrep, setShowInterviewPrep] = useState(false); // New state for interview prep
  
  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Centralized state for all form data
  const [formData, setFormData] = useState({
    heading: {
      firstName: '',
      surname: '',
      profession: '',
      city: '',
      country: '',
      pin: '',
      phone: '',
      email: '',
      photo: null,
    },
    education: [],
    experience: [],
    skills: [],
    summary: '',
  });

  // Calculate resume completeness
  const calculateCompleteness = () => {
    let completedSections = 0; 
    const totalSections = 5; // heading, education, experience, skills, summary

    // Check heading section (20% - 4 points)
    const heading = formData.heading;
    const headingFields = [heading.firstName, heading.surname, heading.profession, heading.city, heading.country, heading.pin, heading.phone, heading.email];
    const filledHeadingFields = headingFields.filter(field => field && field.trim() !== '').length;
    if (filledHeadingFields >= 6) { // At least 6 out of 8 fields filled
      completedSections += 1;
    }

    // Check summary section (20% - 4 points)
    if (formData.summary && formData.summary.trim() !== '') {
      completedSections += 1;
    }

    return Math.round((completedSections / totalSections) * 100);
  };

  const completeness = calculateCompleteness();

  const handleStepClick = (stepIndex: React.SetStateAction<number>) => {
    setSelectedStep(stepIndex);
    setShowInterviewPrep(false); // Hide interview prep when clicking steps
  };

  const handleInterviewPrepClick = () => {
    setShowInterviewPrep(true);
    setIsMobileMenuOpen(false); // Close mobile menu when clicking
  };

  const handleBackToResume = () => {
    setShowInterviewPrep(false);
  };

  const handleTemplateSelect = (templateIndex: React.SetStateAction<number>) => {
    setSelectedTemplateIdx(templateIndex);
    setSelectedStep(1);
    setShowInterviewPrep(false);
  };

  const handleNextEducation = () => {
    setSelectedStep(2);
  };

  const handleNextExperience = () => {
    setSelectedStep(3);
  };

  const handleNextSkills = () => {
    setSelectedStep(4);
  };

  const handleNextSummary = () => {
    setSelectedStep(5);
  };

  const handleNextFinalize = () => {
    setSelectedStep(6);
  };

  const handleGoBack = (stepIndex: React.SetStateAction<number>) => {
    setSelectedStep(stepIndex);
  };

  const updateHeading = (newHeading: any) => {
    setFormData(prev => ({
      ...prev,
      heading: newHeading
    }));
  };

  const updateEducation = (newEducation: any) => {
    setFormData(prev => ({
      ...prev,
      education: newEducation
    }));
  };

  const updateExperience = (newExperience: any) => {
    setFormData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const updateSkills = (newSkills: any) => {
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const updateSummary = (newSummary: any) => {
    setFormData(prev => ({
      ...prev,
      summary: newSummary
    }));
  };

  return (
    <div style={{ background: '#f3e8ff', minHeight: '100vh' }}>
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1000,
          background: '#2a003f',
          border: '2px solid white',
          borderRadius: '8px',
          padding: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div style={{
            width: 16,
            height: 1.5,
            background: 'white',
            margin: '4px 0',
            transition: '0.3s',
            transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }} />
          <div style={{
            width: 24,
            height: 2,
            background: 'white',
            margin: '4px 0',
            transition: '0.3s',
            opacity: isMobileMenuOpen ? 0 : 1,
          }} />
          <div style={{
            width: 24,
            height: 2,
            background: 'white',
            margin: '4px 0',
            transition: '0.3s',
            transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }} />
        </div>
      )}

      {/* Sidebar */}
      <div style={{
        background: '#2a003f',
        color: 'white',
        width: isMobile ? '60%' : 240,
        height: isMobile ? '100vh' : '100vh',
        position: 'absolute',
        top: 0,
        left: isMobile ? (isMobileMenuOpen ? 0 : '-100%') : 0,
        padding: isMobile ? '80px 24px 24px' : '32px 24px',
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        zIndex: 10,
        boxSizing: 'border-box',
        transition: 'left 0.3s ease',
        overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ 
          fontWeight: 700, 
          fontSize: isMobile ? 16 : 18, 
          marginBottom: 10, 
          letterSpacing: 1,
          textAlign: isMobile ? 'center' : 'left',
          width: '100%',
        }}>
          Build Resume<span style={{ color: '#c4b5fd', fontSize: isMobile ? 14 : 13, marginLeft: 4 }}></span>
        </div>

         {/* Interview Prep Button */}
        <div style={{ width: '100%', marginBottom: 30 }}>
  <button
    onClick={handleInterviewPrepClick}
    style={{
      width: '100%',
      padding: isMobile ? '12px 16px' : '14px 18px',
      background: showInterviewPrep
        ? 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)' // lighter → darker purple
        : 'linear-gradient(135deg, #9333EA 0%, #6D28D9 100%)',
      border: 'none',
      borderRadius: '12px',
      color: 'white',
      fontSize: isMobile ? 13 : 14,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      boxShadow: showInterviewPrep
        ? '0 6px 20px rgba(168, 85, 247, 0.4)'
        : '0 4px 15px rgba(147, 51, 234, 0.3)',
      transform: showInterviewPrep ? 'translateY(-1px)' : 'none',
    }}
    onMouseOver={(e) => {
      if (!showInterviewPrep) {
        e.currentTarget.style.background =
          'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)';
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow =
          '0 6px 20px rgba(168, 85, 247, 0.4)';
      }
    }}
    onMouseOut={(e) => {
      if (!showInterviewPrep) {
        e.currentTarget.style.background =
          'linear-gradient(135deg, #9333EA 0%, #6D28D9 100%)';
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow =
          '0 4px 15px rgba(147, 51, 234, 0.3)';
      }
    }}
  >
    <span style={{ marginRight: 8, fontSize: 16 }}>🎯</span>
    Interview Prep
  </button>
</div>


        {/* Divider */}
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          marginBottom: 20,
        }} />

        {/* Resume Builder Section Header */}
        <div style={{
          fontSize: isMobile ? 11 : 12,
          fontWeight: 600,
          color: '#c4b5fd',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 16,
          width: '100%',
        }}>
          Resume Builder
        </div>
        
        {/* Stepper */}
        <div style={{ marginBottom: 30, width: '100%' }}>
          {steps.map((step, idx) => (
            <div
              key={step.number}
              onClick={() => handleStepClick(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: idx < steps.length - 1 ? 12 : 0,
                cursor: 'pointer',
                opacity: !showInterviewPrep && selectedStep === idx ? 1 : 0.7,
                padding: isMobile ? '8px 0' : '6px 0',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                background: !showInterviewPrep && selectedStep === idx 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'transparent',
                paddingLeft: !showInterviewPrep && selectedStep === idx ? '8px' : '0',
              }}
              onMouseOver={(e) => {
                if (showInterviewPrep || selectedStep !== idx) {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }
              }}
              onMouseOut={(e) => {
                if (showInterviewPrep || selectedStep !== idx) {
                  e.currentTarget.style.opacity = '0.7';
                  e.currentTarget.style.background = 'transparent';
                } else {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}
            >
              {/* Step circle or check */}
              <div style={{
                width: isMobile ? 24 : 28,
                height: isMobile ? 24 : 28,
                borderRadius: '50%',
                background: !showInterviewPrep && selectedStep === idx ? 'white' : 'transparent',
                border: '2px solid white',
                color: !showInterviewPrep && selectedStep === idx ? '#7c3aed' : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: isMobile ? 10 : 12,
                position: 'relative',
                zIndex: 1,
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}>
                {step.number}
              </div>
              {/* Step label */}
              <span style={{
                marginLeft: 12,
                fontWeight: !showInterviewPrep && selectedStep === idx ? 700 : 500,
                color: !showInterviewPrep && selectedStep === idx ? 'white' : '#ede9fe',
                fontSize: isMobile ? 11 : 13,
                transition: 'color 0.2s',
                wordBreak: 'break-word',
              }}>{step.label}</span>
            </div>
          ))}
        </div>
        
        {/* Progress bar - only show when not in interview prep */}
        {!showInterviewPrep && (
          <div style={{ marginTop: 'auto', width: '100%' }}>
            <div style={{ 
              fontSize: isMobile ? 12 : 14, 
              fontWeight: 700, 
              color: '#c4b5fd', 
              marginBottom: 8,
              textAlign: isMobile ? 'center' : 'left',
            }}>
              Resume Progress:
            </div>
            <div style={{
              width: '100%', 
              height: 8, 
              background: 'rgba(255,255,255,0.2)', 
              borderRadius: 4,
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${calculateCompleteness()}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, #c4b5fd, #8B5CF6)',
                borderRadius: 4,
                transition: 'width 0.3s ease',
              }} />
            </div>
            <div style={{ 
              fontSize: isMobile ? 11 : 13, 
              color: '#ede9fe', 
              marginTop: 8,
              textAlign: isMobile ? 'center' : 'left',
            }}>
              {calculateCompleteness()}% Complete
            </div>
          </div>
        )}

        {/* Back to Resume button - only show when in interview prep */}
        {showInterviewPrep && (
          <div style={{ marginTop: 'auto', width: '100%', paddingTop: 20 }}>
            <button
              onClick={handleBackToResume}
              style={{
                width: '100%',
                padding: isMobile ? '12px 16px' : '14px 18px',
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '8px',
                color: '#ede9fe',
                fontSize: isMobile ? 12 : 13,
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.color = '#ede9fe';
              }}
            >
              ← Back to Resume Builder
            </button>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 5,
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div style={{
        marginLeft: isMobile ? 0 : 240,
        minHeight: '100vh',
        maxHeight: '100vh',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: isMobile ? '80px 16px 16px' : '0',
        width: isMobile ? '100%' : 'auto',
      }}>
        {/* Show Interview Prep or Resume Builder based on state */}
        {showInterviewPrep ? (
          <div style={{ width: '100%', height: '100%' }}>
            <InterviewPrepPricing />
          </div>
        ) : (
          <>
            {selectedStep === 0 && <TemplateTab onUseTemplate={handleTemplateSelect} />}
            {selectedStep === 1 && (
              <HeadingTab 
                selectedTemplate={React.cloneElement(templateComponents[selectedTemplateIdx], { formData })}
                onNext={handleNextEducation} 
                onGoBack={() => handleGoBack(0)}
                formData={formData.heading}
                updateFormData={updateHeading}
                fullFormData={formData}
              />
            )}
            {selectedStep === 2 && (
              <EducationTab 
                selectedTemplate={React.cloneElement(templateComponents[selectedTemplateIdx], { formData })}
                onGoBack={() => handleGoBack(1)} 
                onNext={handleNextExperience}
                formData={formData.education}
                updateFormData={updateEducation}
                fullFormData={formData}
              />
            )}
            {selectedStep === 3 && (
              <ExperienceTab 
                selectedTemplate={React.cloneElement(templateComponents[selectedTemplateIdx], { formData })}
                onGoBack={() => handleGoBack(2)}
                onNext={handleNextSkills}
                formData={formData.experience}
                updateFormData={updateExperience}
                fullFormData={formData}
              />
            )}
            {selectedStep === 4 && (
              <SkillsTab 
                selectedTemplate={React.cloneElement(templateComponents[selectedTemplateIdx], { formData })}
                onGoBack={() => handleGoBack(3)}
                onNext={handleNextSummary}
                formData={formData.skills}
                updateFormData={updateSkills}
                fullFormData={formData}
              />
            )}
            {selectedStep === 5 && (
              <SummaryTab 
                selectedTemplate={React.cloneElement(templateComponents[selectedTemplateIdx], { formData })}
                onGoBack={() => handleGoBack(4)}
                onNext={handleNextFinalize}
                formData={formData.summary}
                updateFormData={updateSummary}
                fullFormData={formData}
              />
            )}
            {selectedStep === 6 && (
              <FinalizeTab 
                onGoBack={() => handleGoBack(5)}
                selectedTemplate={selectedTemplateIdx}
                formData={formData}
                updateSummary={updateSummary}
                updateEducation={updateEducation}
                updateExperience={updateExperience}
                updateSkills={updateSkills}
                updateHeading={updateHeading}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default FirstPage