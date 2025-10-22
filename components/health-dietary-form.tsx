"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Apple, Droplet, Activity } from "lucide-react"

interface HealthFormData {
  currentHeight: string
  currentWeight: string
  bloodPressure: string
  dietType: string
  meatConsumption: string
  vegetableServings: string
  fruitServings: string
  dairyConsumption: string
  ironRichFoods: string
  vitaminCIntake: string
  exerciseFrequency: string
  exerciseDuration: string
  sleepHours: string
  stressLevel: string
  waterIntake: string
  supplements: string
}

export function HealthDietaryForm() {
  const { lang } = useLanguage()

  const tLocal = (key: string) => {
    const map: Record<string, Record<string, string>> = {
      title: { en: "Health & Dietary Habits", hi: "स्वास्थ्य और आहार की आदतें", bn: "স্বাস্থ্য ও খাবারের অভ্যাস" },
      description: { en: "Provide information about your health metrics and dietary habits", hi: "अपने स्वास्थ्य मेट्रिक्स और आहार संबंधी आदतों के बारे में जानकारी दें", bn: "আপনার স্বাস্থ্য ও খাদ্যাভ্যাস সম্পর্কে তথ্য দিন" },
      healthMetrics: { en: "Health Metrics", hi: "स्वास्थ्य मेट्रिक्स", bn: "স্বাস্থ্য সূচক" },
      dietaryHabits: { en: "Dietary Habits", hi: "आहार संबंधी आदतें", bn: "খাদ্যাভ্যাস" },
      height: { en: "Height (cm)", hi: "ऊंचाई (सेमी)", bn: "উচ্চতা (সেমি)" },
      weight: { en: "Weight (kg)", hi: "वजन (किग्रा)", bn: "ওজন (কেজি)" },
      saveContinue: { en: "Save & Continue", hi: "सहेजें और जारी रखें", bn: "সংরক্ষণ ও চালিয়ে যান" },
      cancel: { en: "Cancel", hi: "रद्द करें", bn: "বাতিল করুন" },
    }
    return map[key]?.[lang] ?? map[key]?.["en"] ?? key
  }
  const [formData, setFormData] = useState<HealthFormData>({
    currentHeight: "",
    currentWeight: "",
    bloodPressure: "",
    dietType: "",
    meatConsumption: "",
    vegetableServings: "",
    fruitServings: "",
    dairyConsumption: "",
    ironRichFoods: "",
    vitaminCIntake: "",
    exerciseFrequency: "",
    exerciseDuration: "",
    sleepHours: "",
    stressLevel: "",
    waterIntake: "",
    supplements: "",
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

    if (!formData.currentHeight.trim()) newErrors.currentHeight = "Height is required"
    if (!formData.currentWeight.trim()) newErrors.currentWeight = "Weight is required"
    if (!formData.bloodPressure.trim()) newErrors.bloodPressure = "Blood pressure is required"
    if (!formData.dietType) newErrors.dietType = "Diet type is required"
    if (!formData.meatConsumption) newErrors.meatConsumption = "Meat consumption frequency is required"
    if (!formData.vegetableServings) newErrors.vegetableServings = "Vegetable servings is required"
    if (!formData.fruitServings) newErrors.fruitServings = "Fruit servings is required"
    if (!formData.dairyConsumption) newErrors.dairyConsumption = "Dairy consumption is required"
    if (!formData.ironRichFoods) newErrors.ironRichFoods = "Iron-rich foods frequency is required"
    if (!formData.vitaminCIntake) newErrors.vitaminCIntake = "Vitamin C intake is required"
    if (!formData.exerciseFrequency) newErrors.exerciseFrequency = "Exercise frequency is required"
    if (!formData.exerciseDuration.trim()) newErrors.exerciseDuration = "Exercise duration is required"
    if (!formData.sleepHours.trim()) newErrors.sleepHours = "Sleep hours is required"
    if (!formData.stressLevel) newErrors.stressLevel = "Stress level is required"
    if (!formData.waterIntake.trim()) newErrors.waterIntake = "Water intake is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Health form submitted:", formData)
    }
  }

  return (
    <Card className="border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <Apple className="w-5 h-5 text-primary" />
          {tLocal("title")}
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">{tLocal("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Health Metrics Section */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">{tLocal("healthMetrics")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Height */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("height")} <span className="text-destructive">*</span></label>
                <Input
                  type="number"
                  name="currentHeight"
                  value={formData.currentHeight}
                  onChange={handleChange}
                  placeholder="170"
                  className={`h-10 ${errors.currentHeight ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                />
                {errors.currentHeight && <p className="text-xs text-red-600 dark:text-red-400">{errors.currentHeight}</p>}
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{tLocal("weight")} <span className="text-destructive">*</span></label>
                <Input
                  type="number"
                  name="currentWeight"
                  value={formData.currentWeight}
                  onChange={handleChange}
                  placeholder="70"
                  className={`h-10 ${errors.currentWeight ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                />
                {errors.currentWeight && <p className="text-xs text-red-600 dark:text-red-400">{errors.currentWeight}</p>}
              </div>

              {/* Blood Pressure */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Droplet className="w-4 h-4" />
                  Blood Pressure (mmHg) *
                </label>
                <Input
                  type="text"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  placeholder="120/80"
                  className={`h-10 ${errors.bloodPressure ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                />
                {errors.bloodPressure && <p className="text-xs text-red-600 dark:text-red-400">{errors.bloodPressure}</p>}
              </div>
            </div>
          </div>

          {/* Dietary Habits Section */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">{tLocal("dietaryHabits")}</h3>
            <div className="space-y-4">
              {/* Diet Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Primary Diet Type *</label>
                <select
                  name="dietType"
                  value={formData.dietType}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    errors.dietType ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <option value="">Select diet type</option>
                  <option value="omnivore">Omnivore</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="pescatarian">Pescatarian</option>
                  <option value="other">Other</option>
                </select>
                {errors.dietType && <p className="text-xs text-red-600 dark:text-red-400">{errors.dietType}</p>}
              </div>

              {/* Meat Consumption */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Meat Consumption Frequency *</label>
                <select
                  name="meatConsumption"
                  value={formData.meatConsumption}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    errors.meatConsumption ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <option value="">Select frequency</option>
                  <option value="daily">Daily</option>
                  <option value="3-4-times-week">3-4 times per week</option>
                  <option value="1-2-times-week">1-2 times per week</option>
                  <option value="rarely">Rarely</option>
                  <option value="never">Never</option>
                </select>
                {errors.meatConsumption && <p className="text-xs text-red-600 dark:text-red-400">{errors.meatConsumption}</p>}
              </div>

              {/* Vegetable Servings */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Vegetable Servings per Day *</label>
                <select
                  name="vegetableServings"
                  value={formData.vegetableServings}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    errors.vegetableServings ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <option value="">Select servings</option>
                  <option value="0">None</option>
                  <option value="1">1 serving</option>
                  <option value="2">2 servings</option>
                  <option value="3">3 servings</option>
                  <option value="4-plus">4+ servings</option>
                </select>
                {errors.vegetableServings && <p className="text-xs text-red-600 dark:text-red-400">{errors.vegetableServings}</p>}
              </div>

              {/* Fruit Servings */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Fruit Servings per Day *</label>
                <select
                  name="fruitServings"
                  value={formData.fruitServings}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    errors.fruitServings ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <option value="">Select servings</option>
                  <option value="0">None</option>
                  <option value="1">1 serving</option>
                  <option value="2">2 servings</option>
                  <option value="3">3 servings</option>
                  <option value="4-plus">4+ servings</option>
                </select>
                {errors.fruitServings && <p className="text-xs text-red-600 dark:text-red-400">{errors.fruitServings}</p>}
              </div>

              {/* Dairy Consumption */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Dairy Consumption *</label>
                <select
                  name="dairyConsumption"
                  value={formData.dairyConsumption}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    errors.dairyConsumption ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <option value="">Select consumption level</option>
                  <option value="high">High (daily)</option>
                  <option value="moderate">Moderate (3-4 times/week)</option>
                  <option value="low">Low (1-2 times/week)</option>
                  <option value="none">None</option>
                </select>
                {errors.dairyConsumption && <p className="text-xs text-red-600 dark:text-red-400">{errors.dairyConsumption}</p>}
              </div>

              {/* Iron-Rich Foods */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Iron-Rich Foods Consumption *</label>
                <select
                  name="ironRichFoods"
                  value={formData.ironRichFoods}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    errors.ironRichFoods ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <option value="">Select frequency</option>
                  <option value="daily">Daily</option>
                  <option value="3-4-times-week">3-4 times per week</option>
                  <option value="1-2-times-week">1-2 times per week</option>
                  <option value="rarely">Rarely</option>
                  <option value="never">Never</option>
                </select>
                {errors.ironRichFoods && <p className="text-xs text-red-600 dark:text-red-400">{errors.ironRichFoods}</p>}
              </div>

              {/* Vitamin C Intake */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Vitamin C Intake *</label>
                <select
                  name="vitaminCIntake"
                  value={formData.vitaminCIntake}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    errors.vitaminCIntake ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <option value="">Select intake level</option>
                  <option value="high">High (citrus, berries daily)</option>
                  <option value="moderate">Moderate (3-4 times/week)</option>
                  <option value="low">Low (1-2 times/week)</option>
                  <option value="none">None</option>
                </select>
                {errors.vitaminCIntake && <p className="text-xs text-red-600 dark:text-red-400">{errors.vitaminCIntake}</p>}
              </div>

              {/* Supplements */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Supplements</label>
                <Input
                  type="text"
                  name="supplements"
                  value={formData.supplements}
                  onChange={handleChange}
                  placeholder="e.g., Iron supplement, Vitamin B12, Multivitamin"
                  className="h-10 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Lifestyle Section */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Lifestyle Habits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Exercise Frequency */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Exercise Frequency *</label>
                <select
                  name="exerciseFrequency"
                  value={formData.exerciseFrequency}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    errors.exerciseFrequency ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <option value="">Select frequency</option>
                  <option value="daily">Daily</option>
                  <option value="4-5-times-week">4-5 times per week</option>
                  <option value="2-3-times-week">2-3 times per week</option>
                  <option value="once-week">Once per week</option>
                  <option value="rarely">Rarely</option>
                  <option value="never">Never</option>
                </select>
                {errors.exerciseFrequency && <p className="text-xs text-red-600 dark:text-red-400">{errors.exerciseFrequency}</p>}
              </div>

              {/* Exercise Duration */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Average Exercise Duration (minutes) *</label>
                <Input
                  type="number"
                  name="exerciseDuration"
                  value={formData.exerciseDuration}
                  onChange={handleChange}
                  placeholder="30"
                  className={`h-10 ${errors.exerciseDuration ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                />
                {errors.exerciseDuration && <p className="text-xs text-red-600 dark:text-red-400">{errors.exerciseDuration}</p>}
              </div>

              {/* Sleep Hours */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Average Sleep Hours per Night *</label>
                <Input
                  type="number"
                  name="sleepHours"
                  value={formData.sleepHours}
                  onChange={handleChange}
                  placeholder="7"
                  step="0.5"
                  className={`h-10 ${errors.sleepHours ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                />
                {errors.sleepHours && <p className="text-xs text-red-600 dark:text-red-400">{errors.sleepHours}</p>}
              </div>

              {/* Stress Level */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Stress Level *</label>
                <select
                  name="stressLevel"
                  value={formData.stressLevel}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    errors.stressLevel ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <option value="">Select stress level</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="very-high">Very High</option>
                </select>
                {errors.stressLevel && <p className="text-xs text-red-600 dark:text-red-400">{errors.stressLevel}</p>}
              </div>

              {/* Water Intake */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Daily Water Intake (glasses) *</label>
                <Input
                  type="number"
                  name="waterIntake"
                  value={formData.waterIntake}
                  onChange={handleChange}
                  placeholder="8"
                  className={`h-10 ${errors.waterIntake ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                />
                {errors.waterIntake && <p className="text-xs text-red-600 dark:text-red-400">{errors.waterIntake}</p>}
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
