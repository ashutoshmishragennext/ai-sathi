/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import html2pdf from "html2pdf.js";
import Template1 from "./Templates/template1";
import Template2 from "./Templates/template2";
import SummaryTab from "./SummaryTab";
import EducationTab from "./EductionTab";
import ExperienceTab from "./ExperienceTab";
import SkillsTab from "./SkillsTab";
import HeadingTab from "./headingTab";

interface FormData {
  summary: any;
  education: any;
  experience: any;
  skills: any;
  heading: any;
}

interface FinalizeTabProps {
  onGoBack: () => void;
  selectedTemplate: number;
  formData: FormData;
  updateSummary: (data: any) => void;
  updateEducation: (data: any) => void;
  updateExperience: (data: any) => void;
  updateSkills: (data: any) => void;
  updateHeading: (data: any) => void;
}

const FinalizeTab: React.FC<FinalizeTabProps> = ({
  selectedTemplate,
  formData,
  updateSummary,
  updateEducation,
  updateExperience,
  updateSkills,
  updateHeading,
}) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const templateRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCloseEdit = () => setEditingSection(null);

  const handleDownloadResume = () => {
    if (templateRef.current) {
      const opt = {
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      const original = {
        transform: templateRef.current.style.transform,
        marginTop: templateRef.current.style.marginTop,
        maxWidth: templateRef.current.style.maxWidth,
        width: templateRef.current.style.width,
      };

      templateRef.current.style.transform = "none";
      templateRef.current.style.marginTop = "0";
      templateRef.current.style.maxWidth = "100%";
      templateRef.current.style.width = "100%";

      html2pdf()
        .set(opt)
        .from(templateRef.current)
        .save()
        .then(() => {
          if (templateRef.current) {
            templateRef.current.style.transform = original.transform;
            templateRef.current.style.marginTop = original.marginTop;
            templateRef.current.style.maxWidth = original.maxWidth;
            templateRef.current.style.width = original.width;
          }
        });
    }
  };

  const getTemplateComponent = () => {
    switch (selectedTemplate) {
      case 0:
        return <Template1 formData={formData} />;
      case 1:
        return <Template2 formData={formData} />;
      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            📄
          </div>
        );
    }
  };

  const renderLeftPanel = () => {
    switch (editingSection) {
      case "summary":
        return (
          <SummaryTab
            formData={formData.summary}
            updateFormData={updateSummary}
            onNext={handleCloseEdit}
            onGoBack={handleCloseEdit}
          />
        );
      case "education":
        return (
          <EducationTab
            formData={formData.education}
            updateFormData={updateEducation}
            onNext={handleCloseEdit}
            onGoBack={handleCloseEdit}
            selectedTemplate={getTemplateComponent()}
            fullFormData={formData}
          />
        );
      case "experience":
        return (
          <ExperienceTab
            formData={formData.experience}
            updateFormData={updateExperience}
            onNext={handleCloseEdit}
            onGoBack={handleCloseEdit}
          />
        );
      case "skills":
        return (
          <SkillsTab
            formData={formData.skills}
            updateFormData={updateSkills}
            onNext={handleCloseEdit}
            onGoBack={handleCloseEdit}
          />
        );
      case "contact":
        return (
          <HeadingTab
            formData={formData.heading}
            updateFormData={updateHeading}
            onNext={handleCloseEdit}
            onGoBack={handleCloseEdit}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Your Resume is Ready!
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Congratulations! Your professional resume has been created. You
              can download it now or edit any section.
            </p>
            <button
              type="button"
              onClick={handleDownloadResume}
              className="bg-purple-700 text-white font-semibold rounded-lg px-8 py-3 text-base hover:bg-purple-800 transition duration-200 shadow-md"
            >
              📥 Download Resume
            </button>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 w-full box-border">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Finalize Resume</h1>
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
          {renderLeftPanel()}
        </div>

        {/* Right Template Preview */}
        {!isMobile && (
          <div className="flex-1 overflow-auto rounded-xl border bg-white shadow-sm p-4">
            <div ref={templateRef}>{getTemplateComponent()}</div>
          </div>
        )}
      </div>

      {/* Mobile Download Button */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <button
            type="button"
            onClick={handleDownloadResume}
            className="w-full bg-purple-700 text-white font-semibold rounded-lg px-8 py-3 text-base hover:bg-purple-800 transition-colors shadow-md"
          >
            📥 Download Resume
          </button>
        </div>
      )}
    </div>
  );
};

export default FinalizeTab;
