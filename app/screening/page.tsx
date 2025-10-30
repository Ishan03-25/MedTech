"use client"

import { useState, useEffect } from "react"
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
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  useEffect(() => {
    if (files.length === 0) {
      setPreviews([])
      return
    }

    const urls = files.map((f) => (f.type.startsWith("image/") ? URL.createObjectURL(f) : ""))
    setPreviews(urls)

    return () => {
      urls.forEach((u) => {
        if (u) URL.revokeObjectURL(u)
      })
    }
  }, [files])
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
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{t("newScreeningTitle")}</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {t("stepWord")} {currentStepIndex + 1} {t("ofWord")} {steps.length}: {steps[currentStepIndex].label}
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
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("progressLabel")}</span>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {currentStepIndex + 1} {t("ofWord")} {steps.length}
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
              {/* File / Photo upload area */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">{t("uploadFilesLabel") ?? "Attach photos or files (optional)"}</label>
                <input
                  type="file"
                  multiple
                  accept="image/*,application/pdf,application/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const selected = e.target.files
                    if (!selected) return
                    const array = Array.from(selected)
                    // simple size check: 10MB per file
                    const maxSize = 10 * 1024 * 1024
                    const filtered = array.filter((f) => {
                      if (f.size > maxSize) {
                        // eslint-disable-next-line no-console
                        console.warn(`${f.name} exceeds 10MB and will be skipped.`)
                        return false
                      }
                      return true
                    })
                    setFiles((prev) => [...prev, ...filtered])
                  }}
                  className="block w-full text-sm text-slate-600 bg-white file:border-0 file:bg-slate-100 file:px-3 file:py-1 file:rounded-md file:text-slate-700 dark:file:bg-slate-700"
                />

                {/* previews */}
                {previews.length > 0 || files.length > 0 ? (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {files.map((f, idx) => (
                      <div key={idx} className="border rounded p-2 bg-slate-50 dark:bg-slate-900">
                        {f.type.startsWith("image/") && previews[idx] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={previews[idx]} alt={f.name} className="w-full h-28 object-cover rounded" />
                        ) : (
                          <div className="flex flex-col items-start gap-2">
                            <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{f.name}</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">{(f.size / 1024).toFixed(0)} KB</div>
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setFiles((prev) => prev.filter((_, i) => i !== idx))
                              setPreviews((prev) => prev.filter((_, i) => i !== idx))
                            }}
                            className="text-xs text-red-600 hover:underline"
                          >
                            {t("remove") ?? "Remove"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {t("infoAllCollected")}
                </p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg h-11"
                onClick={() => {
                  // TODO: wire to upload/submit endpoint. For now, log selected files and proceed.
                  // eslint-disable-next-line no-console
                  console.log("Submitting screening with files:", files)
                  alert(`${t("submitScreening")}: ${files.length} file(s) attached`)
                }}
              >
                {t("submitScreening")}
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
            {t("previous")}
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentStepIndex === steps.length - 1}
            className="bg-gradient-to-r from-primary to-accent hover:shadow-lg"
          >
            {t("next")}
            <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
          </Button>
        </div>
      </div>
    </div>
    </LanguageProvider>
  )
}
