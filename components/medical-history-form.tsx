"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, Cigarette, Pill } from "lucide-react"

interface MedicalFormData {
  familyAnemiaHistory: string
  personalAnemiaHistory: string
  otherBloodDisorders: string
  chronicDiseases: string
  currentMedications: string
  allergies: string
  surgeries: string
  transfusions: string
  menstrualStatus: string
  menstrualCycle: string
  pregnancies: string
  smokingStatus: string
  smokingFrequency: string
  alcoholConsumption: string
  alcoholFrequency: string
  drugUse: string
  occupationalExposure: string
  recentIllness: string
  vaccinations: string
}

export function MedicalHistoryForm() {
  const { lang } = useLanguage()

  const tLocal = (key: string) => {
    const map: Record<string, Record<string, string>> = {
      title: { en: "Medical History & Lifestyle", hi: "चिकित्सा इतिहास और जीवनशैली", bn: "চিকিৎসা ইতিহাস ও জীবনধারা" },
      description: { en: "Provide your medical history and lifestyle information", hi: "अपना चिकित्सा इतिहास और जीवनशैली जानकारी दें", bn: "আপনার চিকিৎসা ইতিহাস ও জীবনধারা সম্পর্কে তথ্য দিন" },
      medicalHistory: { en: "Medical History", hi: "चिकित्सा इतिहास", bn: "চিকিৎসা ইতিহাস" },
      familyAnemiaHistoryLabel: { en: "Family History of Anemia", hi: "एनीमिया का पारिवारिक इतिहास", bn: "অ্যানিমিয়ার পারিবারিক ইতিহাস" },
      personalAnemiaHistoryLabel: { en: "Personal History of Anemia", hi: "एनीमिया का व्यक्तिगत इतिहास", bn: "অ্যানিমিয়ার ব্যক্তিগত ইতিহাস" },
      otherBloodDisordersLabel: { en: "Other Blood Disorders", hi: "अन्य रक्त विकार", bn: "অন্যান্য রক্তজনিত রোগ" },
      chronicDiseasesLabel: { en: "Chronic Diseases", hi: "दीर्घकालिक रोग", bn: "দীর্ঘস্থায়ী রোগ" },
      currentMedicationsLabel: { en: "Current Medications", hi: "वर्तमान दवाइयाँ", bn: "বর্তমান ওষুধ" },
      allergiesLabel: { en: "Allergies", hi: "एलर्जी", bn: "অ্যালার্জি" },
      surgeriesLabel: { en: "Previous Surgeries", hi: "पिछली सर्जरी", bn: "পূর্ববর্তী অস্ত্রোপচার" },
      transfusionsLabel: { en: "Blood Transfusions", hi: "रक्त आधान", bn: "রক্ত সঞ্চালন" },
      womensHealthTitle: { en: "Women's Health (if applicable)", hi: "महिलाओं का स्वास्थ्य (यदि लागू हो)", bn: "নারীদের স্বাস্থ্য (যদি প্রযোজ্য)" },
      menstrualStatusLabel: { en: "Menstrual Status", hi: "मासिक धर्म की स्थिति", bn: "মাসিকের অবস্থা" },
      menstrualCycleLabel: { en: "Menstrual Cycle Length (days)", hi: "मासिक चक्र की लंबाई (दिन)", bn: "মাসিক চক্রের দৈর্ঘ্য (দিন)" },
      pregnanciesLabel: { en: "Number of Pregnancies", hi: "गर्भधारण की संख्या", bn: "গর্ভধারণের সংখ্যা" },
      lifestyleHabitsTitle: { en: "Lifestyle & Habits", hi: "जीवनशैली और आदतें", bn: "জীবনধারা ও অভ্যাস" },
      smokingStatusLabel: { en: "Smoking Status", hi: "धूम्रपान की स्थिति", bn: "ধূমপানের অবস্থা" },
      smokingFrequencyLabel: { en: "Smoking Frequency", hi: "धूम्रपान की आवृत्ति", bn: "ধূমপানের ঘনত্ব" },
      alcoholConsumptionLabel: { en: "Alcohol Consumption", hi: "मद्यपान", bn: "মদ্যপান" },
      alcoholFrequencyLabel: { en: "Alcohol Frequency", hi: "मद्यपान की आवृत्ति", bn: "মদ্যপানের ঘনত্ব" },
      drugUseLabel: { en: "Recreational Drug Use", hi: "मनोरंजक दवाओं का उपयोग", bn: "বিনোদনমূলক মাদক ব্যবহার" },
      occupationalExposureLabel: { en: "Occupational Exposure to Hazards", hi: "व्यावसायिक खतरों का संपर्क", bn: "পেশাগত ঝুঁকির সংস্পর্শ" },
      recentIllnessLabel: { en: "Recent Illness or Infection", hi: "हाल की बीमारी या संक्रमण", bn: "সাম্প্রতিক অসুস্থতা বা সংক্রমণ" },
      vaccinationsLabel: { en: "Recent Vaccinations", hi: "हाल के टीकाकरण", bn: "সাম্প্রতিক টিকাদান" },
      saveContinue: { en: "Save & Continue", hi: "सहेजें और जारी रखें", bn: "সংরক্ষণ ও চালিয়ে যান" },
      cancel: { en: "Cancel", hi: "रद्द करें", bn: "বাতিল করুন" },
    }
    return map[key]?.[lang] ?? map[key]?.["en"] ?? key
  }
  const [formData, setFormData] = useState<MedicalFormData>({
    familyAnemiaHistory: "",
    personalAnemiaHistory: "",
    otherBloodDisorders: "",
    chronicDiseases: "",
    currentMedications: "",
    allergies: "",
    surgeries: "",
    transfusions: "",
    menstrualStatus: "",
    menstrualCycle: "",
    pregnancies: "",
    smokingStatus: "",
    smokingFrequency: "",
    alcoholConsumption: "",
    alcoholFrequency: "",
    drugUse: "",
    occupationalExposure: "",
    recentIllness: "",
    vaccinations: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.familyAnemiaHistory) newErrors.familyAnemiaHistory = "Family anemia history is required"
    if (!formData.personalAnemiaHistory) newErrors.personalAnemiaHistory = "Personal anemia history is required"
    if (!formData.chronicDiseases) newErrors.chronicDiseases = "Chronic diseases information is required"
    if (!formData.smokingStatus) newErrors.smokingStatus = "Smoking status is required"
    if (!formData.alcoholConsumption) newErrors.alcoholConsumption = "Alcohol consumption is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Medical history form submitted:", formData)
    }
  }

  return (
    <Card className="border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <AlertCircle className="w-5 h-5 text-primary" />
          {tLocal("title")}
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">{tLocal("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Family & Personal Medical History */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">{tLocal("medicalHistory")}</h3>
            <div className="space-y-4">
              {/* Family Anemia History */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("familyAnemiaHistoryLabel")} *</label>
                <select
                  name="familyAnemiaHistory"
                  value={formData.familyAnemiaHistory}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    errors.familyAnemiaHistory ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <option value="">Select option</option>
                  <option value="yes-immediate">Yes, immediate family (parent, sibling)</option>
                  <option value="yes-extended">Yes, extended family</option>
                  <option value="no">No</option>
                  <option value="unknown">Unknown</option>
                </select>
                {errors.familyAnemiaHistory && <p className="text-xs text-red-600 dark:text-red-400">{errors.familyAnemiaHistory}</p>}
              </div>

              {/* Personal Anemia History */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("personalAnemiaHistoryLabel")} *</label>
                <select
                  name="personalAnemiaHistory"
                  value={formData.personalAnemiaHistory}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    errors.personalAnemiaHistory ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <option value="">Select option</option>
                  <option value="yes-diagnosed">Yes, previously diagnosed</option>
                  <option value="yes-suspected">Yes, suspected but not confirmed</option>
                  <option value="no">No</option>
                  <option value="unknown">Unknown</option>
                </select>
                {errors.personalAnemiaHistory && <p className="text-xs text-red-600 dark:text-red-400">{errors.personalAnemiaHistory}</p>}
              </div>

              {/* Other Blood Disorders */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("otherBloodDisordersLabel")}</label>
                <Input
                  type="text"
                  name="otherBloodDisorders"
                  value={formData.otherBloodDisorders}
                  onChange={handleChange}
                  placeholder="e.g., Thalassemia, Sickle cell disease, Hemophilia"
                  className="h-10 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Chronic Diseases */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("chronicDiseasesLabel")} *</label>
                <select
                  name="chronicDiseases"
                  value={formData.chronicDiseases}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    errors.chronicDiseases ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <option value="">Select option</option>
                  <option value="none">None</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="hypertension">Hypertension</option>
                  <option value="kidney-disease">Kidney Disease</option>
                  <option value="liver-disease">Liver Disease</option>
                  <option value="heart-disease">Heart Disease</option>
                  <option value="thyroid">Thyroid Disease</option>
                  <option value="cancer">Cancer</option>
                  <option value="multiple">Multiple conditions</option>
                  <option value="other">Other</option>
                </select>
                {errors.chronicDiseases && <p className="text-xs text-red-600 dark:text-red-400">{errors.chronicDiseases}</p>}
              </div>

              {/* Current Medications */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Pill className="w-4 h-4" />
                  {tLocal("currentMedicationsLabel")}
                </label>
                <textarea
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleChange}
                  placeholder="List all current medications with dosages"
                  className="w-full h-24 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary bg-white dark:bg-slate-700"
                />
              </div>

              {/* Allergies */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("allergiesLabel")}</label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="List any drug allergies or other allergies"
                  className="w-full h-20 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary bg-white dark:bg-slate-700"
                />
              </div>

              {/* Surgeries */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("surgeriesLabel")}</label>
                <textarea
                  name="surgeries"
                  value={formData.surgeries}
                  onChange={handleChange}
                  placeholder="List any previous surgeries with dates"
                  className="w-full h-20 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary bg-white dark:bg-slate-700"
                />
              </div>

              {/* Blood Transfusions */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("transfusionsLabel")}</label>
                <select
                  name="transfusions"
                  value={formData.transfusions}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>
          </div>

          {/* Women's Health (if applicable) */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">{tLocal("womensHealthTitle")}</h3>
            <div className="space-y-4">
              {/* Menstrual Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("menstrualStatusLabel")}</label>
                <select
                  name="menstrualStatus"
                  value={formData.menstrualStatus}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="">Select option</option>
                  <option value="regular">Regular</option>
                  <option value="irregular">Irregular</option>
                  <option value="heavy">Heavy bleeding</option>
                  <option value="light">Light bleeding</option>
                  <option value="postmenopausal">Postmenopausal</option>
                  <option value="not-applicable">Not applicable</option>
                </select>
              </div>

              {/* Menstrual Cycle */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("menstrualCycleLabel")}</label>
                <Input
                  type="number"
                  name="menstrualCycle"
                  value={formData.menstrualCycle}
                  onChange={handleChange}
                  placeholder="28"
                  className="h-10 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Pregnancies */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("pregnanciesLabel")}</label>
                <Input
                  type="number"
                  name="pregnancies"
                  value={formData.pregnancies}
                  onChange={handleChange}
                  placeholder="0"
                  className="h-10 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Lifestyle & Habits */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">{tLocal("lifestyleHabitsTitle")}</h3>
            <div className="space-y-4">
              {/* Smoking Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Cigarette className="w-4 h-4" />
                  {tLocal("smokingStatusLabel")} *
                </label>
                <select
                  name="smokingStatus"
                  value={formData.smokingStatus}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    errors.smokingStatus ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <option value="">Select option</option>
                  <option value="never">Never smoked</option>
                  <option value="former">Former smoker</option>
                  <option value="current">Current smoker</option>
                </select>
                {errors.smokingStatus && <p className="text-xs text-red-600 dark:text-red-400">{errors.smokingStatus}</p>}
              </div>

              {/* Smoking Frequency */}
              {formData.smokingStatus === "current" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("smokingFrequencyLabel")}</label>
                  <select
                    name="smokingFrequency"
                    value={formData.smokingFrequency}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="">Select frequency</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="occasional">Occasional</option>
                  </select>
                </div>
              )}

              {/* Alcohol Consumption */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("alcoholConsumptionLabel")} *</label>
                <select
                  name="alcoholConsumption"
                  value={formData.alcoholConsumption}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    errors.alcoholConsumption ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <option value="">Select option</option>
                  <option value="none">None</option>
                  <option value="occasional">Occasional</option>
                  <option value="moderate">Moderate</option>
                  <option value="heavy">Heavy</option>
                </select>
                {errors.alcoholConsumption && <p className="text-xs text-red-600 dark:text-red-400">{errors.alcoholConsumption}</p>}
              </div>

              {/* Alcohol Frequency */}
              {formData.alcoholConsumption !== "none" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("alcoholFrequencyLabel")}</label>
                  <select
                    name="alcoholFrequency"
                    value={formData.alcoholFrequency}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="">Select frequency</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="occasional">Occasional</option>
                  </select>
                </div>
              )}

              {/* Drug Use */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("drugUseLabel")}</label>
                <select
                  name="drugUse"
                  value={formData.drugUse}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="">Select option</option>
                  <option value="none">None</option>
                  <option value="past">Past use</option>
                  <option value="current">Current use</option>
                </select>
              </div>

              {/* Occupational Exposure */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("occupationalExposureLabel")}</label>
                <Input
                  type="text"
                  name="occupationalExposure"
                  value={formData.occupationalExposure}
                  onChange={handleChange}
                  placeholder="e.g., Lead, Chemicals, Radiation"
                  className="h-10 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Recent Illness */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("recentIllnessLabel")}</label>
                <Input
                  type="text"
                  name="recentIllness"
                  value={formData.recentIllness}
                  onChange={handleChange}
                  placeholder="e.g., Flu, COVID-19, Gastroenteritis"
                  className="h-10 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Vaccinations */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("vaccinationsLabel")}</label>
                <Input
                  type="text"
                  name="vaccinations"
                  value={formData.vaccinations}
                  onChange={handleChange}
                  placeholder="e.g., COVID-19, Flu, Tetanus"
                  className="h-10 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button type="submit" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg">
              {tLocal("saveContinue")}
            </Button>
            <Button type="button" variant="outline" className="border-slate-200 dark:border-slate-600 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
              {tLocal("cancel")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
