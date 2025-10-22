"use client"

import { useState } from "react"
import { PatientInfoForm } from "@/components/patient-info-form"
import { LanguageProvider, useLanguage, Language, useT } from "@/components/language-context"
import { HealthDietaryForm } from "@/components/health-dietary-form"
import { MedicalHistoryForm } from "@/components/medical-history-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Check } from "lucide-react"
import Link from "next/link"

type ScreeningStep = "patient" | "health" | "medical" | "review"

export default function ScreeningPage() {
  const [currentStep, setCurrentStep] = useState<ScreeningStep>("patient")

  const t = useT()

  const steps = [
    { id: "patient", label: t("stepPatient"), number: 1 },
    { id: "health", label: t("stepHealth"), number: 2 },
    { id: "medical", label: t("stepMedical"), number: 3 },
    { id: "review", label: t("stepReview"), number: 4 },
  ]

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id as ScreeningStep)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id as ScreeningStep)
      window.scrollTo(0, 0)
    }
  }

  function LanguageSelectorInline() {
    const { lang, setLang } = useLanguage()
    return (
      <div className="flex items-center gap-2">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as Language)}
          className="h-9 px-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
          aria-label="Select language"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="bn">বাংলা</option>
        </select>
      </div>
    )
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            {/* Language selector placed on screening header */}
            <LanguageSelectorInline />
            {/* <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link> */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">New Screening</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Step {currentStepIndex + 1} of {steps.length}: {steps[currentStepIndex].label}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Progress</span>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-6">
            <div
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm mb-2 transition-colors ${
                    index < currentStepIndex
                      ? "bg-green-500 text-white"
                      : index === currentStepIndex
                        ? "bg-primary text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {index < currentStepIndex ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <span className="text-xs text-slate-600 dark:text-slate-400 text-center">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="mb-8">
          {currentStep === "patient" && <PatientInfoForm />}
          {currentStep === "health" && <HealthDietaryForm />}
          {currentStep === "medical" && <MedicalHistoryForm />}
          {currentStep === "review" && (
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">{t("reviewTitle")}</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">{t("reviewCopy")}</p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  All information has been collected. Click "Submit Screening" to complete the process.
                </p>
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg h-11">
                Submit Screening
              </Button>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            variant="outline"
            className="border-slate-200 dark:border-slate-600 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentStepIndex === steps.length - 1}
            className="bg-gradient-to-r from-primary to-accent hover:shadow-lg"
          >
            Next
            <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
          </Button>
        </div>
      </div>
    </div>
    </LanguageProvider>
  )
}
