"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react"

import TemplateTab from "@/components/TemplateTab"
import Template1 from "@/components/Templates/template1"
import Template2 from "@/components/Templates/template2"
import EducationTab from "@/components/EductionTab"
import ExperienceTab from "@/components/ExperienceTab"
import SkillsTab from "@/components/SkillsTab"
import SummaryTab from "@/components/SummaryTab"
import FinalizeTab from "@/components/FinalizeTab"
import HeadingTab from "@/components/headingTab"

const steps = [
    { name: "Templates", icon: "🎨" },
    { name: "Profile", icon: "👤" },
    { name: "Education", icon: "🎓" },
    { name: "Experience", icon: "💼" },
    { name: "Skills", icon: "⚡" },
    { name: "Summary", icon: "📝" },
    { name: "Finalize", icon: "✨" },
]

const templateComponents = [
    <Template1 key={0} />,
    <Template2 key={1} />,
    <div
        key={2}
        className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg"
    >
        📄
    </div>,
]

const FirstPage = () => {
    const [selectedStep, setSelectedStep] = useState(0)
    const [selectedTemplateIdx, setSelectedTemplateIdx] = useState(0)
    const [showPreview, setShowPreview] = useState(false)
    const [formData, setFormData] = useState({
        heading: {
            firstName: "",
            surname: "",
            profession: "",
            city: "",
            country: "",
            pin: "",
            phone: "",
            email: "",
            photo: null,
        },
        education: [],
        experience: [],
        skills: [],
        summary: "",
    })

    const calculateCompleteness = () => {
        let completedSections = 0
        const totalSections = 5
        const heading = formData.heading
        const headingFields = [
            heading.firstName,
            heading.surname,
            heading.profession,
            heading.city,
            heading.country,
            heading.pin,
            heading.phone,
            heading.email,
        ]
        const filledHeadingFields = headingFields.filter(
            (field) => field && field.trim() !== ""
        ).length
        if (filledHeadingFields >= 6) completedSections += 1
        if (formData.summary && formData.summary.trim() !== "")
            completedSections += 1
        return Math.round((completedSections / totalSections) * 100)
    }

    const completeness = calculateCompleteness()

    const handleTemplateSelect = (idx: number) => {
        setSelectedTemplateIdx(idx)
        setSelectedStep(1)
    }

    const canGoNext = () => selectedStep < steps.length - 1
    const canGoBack = () => selectedStep > 0

    return (
        <div className="min-h-screen bg-gradient-to-br ">
            <div className="container mx-auto px-4  max-w-7xl">
                {/* Header with Steps - Mobile Optimized */}
                <div className="mb-6 lg:mb-8">
                    <div className=" backdrop-blur-sm pt-4 ">
                        {/* Desktop Stepper */}
                        <div className="hidden lg:flex justify-between items-center mb-4">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`flex-1 text-center relative group cursor-pointer transition-all duration-300 ${index <= selectedStep ? "text-purple-600" : "text-gray-400"
                                        }`}
                                    onClick={() => setSelectedStep(index)}
                                >
                                    <div className={`text-lg mb-1 transition-transform group-hover:scale-110 ${selectedStep === index ? "animate-bounce" : ""
                                        }`}>
                                        {step.icon}
                                    </div>
                                    <div className={`text-sm font-medium ${selectedStep === index ? "font-bold" : ""
                                        }`}>
                                        {step.name}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`absolute top-3 -right-2 w-4 h-0.5 transition-colors ${index < selectedStep ? "bg-purple-400" : "bg-gray-200"
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Mobile Stepper */}
                        <div className="lg:hidden">
                            <div className="flex items-center justify-between mb-3">
                                <button
                                    onClick={() => canGoBack() && setSelectedStep(selectedStep - 1)}
                                    disabled={!canGoBack()}
                                    className={`p-2 rounded-full transition-all ${canGoBack()
                                        ? "bg-purple-100 text-purple-600 hover:bg-purple-200"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                <div className="text-center flex-1 mx-4">
                                    <div className="text-2xl mb-1">{steps[selectedStep].icon}</div>
                                    <div className="text-sm font-semibold text-purple-600">
                                        {steps[selectedStep].name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Step {selectedStep + 1} of {steps.length}
                                    </div>
                                </div>

                                <button
                                    onClick={() => canGoNext() && setSelectedStep(selectedStep + 1)}
                                    disabled={!canGoNext()}
                                    className={`p-2 rounded-full transition-all ${canGoNext()
                                        ? "bg-purple-100 text-purple-600 hover:bg-purple-200"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Mobile Progress Dots */}
                            <div className="flex justify-center space-x-2 mb-3">
                                {steps.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === selectedStep
                                            ? "bg-purple-600 scale-125"
                                            : index < selectedStep
                                                ? "bg-purple-400"
                                                : "bg-gray-200"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        {/* <div className="space-y-2">
              <Progress 
                value={completeness} 
                className="h-2 "
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 font-medium">
                  {completeness}% Complete
                </p>
                <div className="lg:hidden">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{showPreview ? "Hide" : "Preview"}</span>
                  </button>
                </div>
              </div>
            </div> */}
                    </div>
                </div>

                {/* Content Layout */}
                {/* Content Layout */}
                <div className={`grid grid-cols-1 gap-6 lg:gap-8 ${selectedStep === 0 ? '' : 'xl:grid-cols-2'}`}>                    {/* Left: Form */}
                    <div className={`${showPreview ? "hidden xl:block" : "block"}`}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedStep}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <Card className="shadow-xl rounded-3xl border-0 bg-white/90 backdrop-blur-sm">
                                    <CardContent className="p-4 sm:p-6 lg:p-8">
                                        {selectedStep === 0 && (
                                            <div className="flex w-full ">
                                                <TemplateTab onUseTemplate={handleTemplateSelect} />
                                            </div>
                                        )}
                                        {selectedStep === 1 && (
                                            <HeadingTab
                                                selectedTemplate={React.cloneElement(
                                                    templateComponents[selectedTemplateIdx],
                                                    { formData }
                                                )}
                                                onNext={() => setSelectedStep(2)}
                                                onGoBack={() => setSelectedStep(0)}
                                                formData={formData.heading}
                                                updateFormData={(newHeading: any) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        heading: newHeading,
                                                    }))
                                                }
                                                fullFormData={formData}
                                            />
                                        )}
                                        {selectedStep === 2 && (
                                            <EducationTab
                                                selectedTemplate={React.cloneElement(
                                                    templateComponents[selectedTemplateIdx],
                                                    { formData }
                                                )}
                                                onGoBack={() => setSelectedStep(1)}
                                                onNext={() => setSelectedStep(3)}
                                                formData={formData.education}
                                                updateFormData={(newEducation: any) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        education: newEducation,
                                                    }))
                                                }
                                                fullFormData={formData}
                                            />
                                        )}
                                        {selectedStep === 3 && (
                                            <ExperienceTab
                                                selectedTemplate={React.cloneElement(
                                                    templateComponents[selectedTemplateIdx],
                                                    { formData }
                                                )}
                                                onGoBack={() => setSelectedStep(2)}
                                                onNext={() => setSelectedStep(4)}
                                                formData={formData.experience}
                                                updateFormData={(newExperience: any) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        experience: newExperience,
                                                    }))
                                                }
                                                fullFormData={formData}
                                            />
                                        )}
                                        {selectedStep === 4 && (
                                            <SkillsTab
                                                selectedTemplate={React.cloneElement(
                                                    templateComponents[selectedTemplateIdx],
                                                    { formData }
                                                )}
                                                onGoBack={() => setSelectedStep(3)}
                                                onNext={() => setSelectedStep(5)}
                                                formData={formData.skills}
                                                updateFormData={(newSkills: any) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        skills: newSkills,
                                                    }))
                                                }
                                                fullFormData={formData}
                                            />
                                        )}
                                        {selectedStep === 5 && (
                                            <SummaryTab
                                                selectedTemplate={React.cloneElement(
                                                    templateComponents[selectedTemplateIdx],
                                                    { formData }
                                                )}
                                                onGoBack={() => setSelectedStep(4)}
                                                onNext={() => setSelectedStep(6)}
                                                formData={formData.summary}
                                                updateFormData={(newSummary: any) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        summary: newSummary,
                                                    }))
                                                }
                                                fullFormData={formData}
                                            />
                                        )}
                                        {selectedStep === 6 && (
                                            <FinalizeTab
                                                onGoBack={() => setSelectedStep(5)}
                                                selectedTemplate={selectedTemplateIdx}
                                                formData={formData}
                                                updateHeading={(newHeading: any) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        heading: newHeading,
                                                    }))
                                                }
                                                updateEducation={(newEducation: any) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        education: newEducation,
                                                    }))
                                                }
                                                updateExperience={(newExperience: any) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        experience: newExperience,
                                                    }))
                                                }
                                                updateSkills={(newSkills: any) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        skills: newSkills,
                                                    }))
                                                }
                                                updateSummary={(newSummary: any) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        summary: newSummary,
                                                    }))
                                                }
                                            />
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right: Resume Preview */}
                    <div className={`${!showPreview || selectedStep === 0 ? "hidden xl:block" : "block"} xl:sticky xl:top-24 xl:h-fit`}>
                        {selectedStep !== 0 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Card className="shadow-2xl rounded-3xl overflow-hidden border-0 bg-white">
                                    <CardContent className="p-4 lg:p-6">
                                        <div className="mb-4 flex items-center justify-between lg:hidden">
                                            <h3 className="text-lg font-semibold text-gray-800">Live Preview</h3>
                                            <button
                                                onClick={() => setShowPreview(false)}
                                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="transform scale-90 sm:scale-95 lg:scale-100 origin-top">
                                            {React.cloneElement(templateComponents[selectedTemplateIdx], {
                                                formData,
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstPage