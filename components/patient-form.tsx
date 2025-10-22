"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronUp } from "lucide-react"

export default function PatientForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    address: "",
    fruitVegetables: "",
    ironRichFoods: "",
    tiredOrWeak: "",
    energyLevels: "",
    weightLoss: "",
    chronicConditions: "",
    menstruated: "",
    bleeding: "",
    anemiaHistory: "",
    medications: "",
    physicalActivity: "",
    dizziness: "",
  })

  const [currentSection, setCurrentSection] = useState("personal")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Form submitted successfully!")
  }

  const sections = [
    { id: "personal", label: "Personal Information" },
    { id: "dietary", label: "Health & Dietary" },
    { id: "medical", label: "Medical History" },
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Section tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setCurrentSection(section.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
              currentSection === section.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        {currentSection === "personal" && (
          <Card className="p-8 border-0 bg-white animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-6">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="h-11 bg-input border-border"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Phone <span className="text-destructive">*</span>
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="h-11 bg-input border-border"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Age <span className="text-destructive">*</span>
                </label>
                <Input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter age"
                  className="h-11 bg-input border-border"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Gender <span className="text-destructive">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full h-11 px-3 rounded-lg bg-input border border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Height <span className="text-destructive">*</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="Height"
                    className="h-11 bg-input border-border flex-1"
                    required
                  />
                  <div className="flex items-center px-3 bg-muted rounded-lg text-muted-foreground font-medium">cm</div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Weight <span className="text-destructive">*</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="Weight"
                    className="h-11 bg-input border-border flex-1"
                    required
                  />
                  <div className="flex items-center px-3 bg-muted rounded-lg text-muted-foreground font-medium">Kg</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Address <span className="text-destructive">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                rows={4}
                required
              />
            </div>
          </Card>
        )}

        {/* Health & Dietary Section */}
        {currentSection === "dietary" && (
          <Card className="p-8 border-0 bg-white animate-fade-in space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Health and Dietary Habits</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-destructive mb-4">
                    How often do you eat fruits and vegetables?
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {["Daily", "Occasionally", "Rarely"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData((prev) => ({ ...prev, fruitVegetables: option }))}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                          formData.fruitVegetables === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-destructive mb-4">
                    Do you consume iron-rich foods like green leafy vegetables, red meat, or beans?
                  </p>
                  <div className="flex gap-3">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData((prev) => ({ ...prev, ironRichFoods: option }))}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                          formData.ironRichFoods === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-destructive mb-4">
                    Have you had any recent episodes of feeling unusually tired or weak?
                  </p>
                  <div className="flex gap-3">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData((prev) => ({ ...prev, tiredOrWeak: option }))}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                          formData.tiredOrWeak === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-destructive mb-4">
                    How would you rate your overall energy levels on most days?
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {["Low", "Moderate", "High"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData((prev) => ({ ...prev, energyLevels: option }))}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                          formData.energyLevels === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-destructive mb-4">
                    Do you often feel dizzy or have headaches?
                  </p>
                  <div className="flex gap-3">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData((prev) => ({ ...prev, dizziness: option }))}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                          formData.dizziness === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Medical History Section */}
        {currentSection === "medical" && (
          <Card className="p-8 border-0 bg-white animate-fade-in space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Medical History & Lifestyle</h2>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-foreground font-semibold mb-4">
                    Menstrual Health (if applicable):
                  </p>
                  <p className="text-sm font-medium text-destructive mb-4">Have you started menstruating?</p>
                  <div className="flex gap-3">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData((prev) => ({ ...prev, menstruated: option }))}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                          formData.menstruated === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground font-semibold mb-4">Medical History:</p>
                  <p className="text-sm font-medium text-destructive mb-4">
                    Have you experienced any bleeding in the past 7 days?
                  </p>
                  <div className="flex gap-3">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData((prev) => ({ ...prev, bleeding: option }))}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                          formData.bleeding === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-destructive mb-4">
                    Have you ever been diagnosed with Anemia before?
                  </p>
                  <div className="flex gap-3">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData((prev) => ({ ...prev, anemiaHistory: option }))}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                          formData.anemiaHistory === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-destructive mb-4">Are you currently taking any medications?</p>
                  <div className="flex gap-3">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData((prev) => ({ ...prev, medications: option }))}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                          formData.medications === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground font-semibold mb-4">Lifestyle:</p>
                  <p className="text-sm font-medium text-destructive mb-4">
                    Do you participate in regular physical activity or sports?
                  </p>
                  <div className="flex gap-3">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData((prev) => ({ ...prev, physicalActivity: option }))}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                          formData.physicalActivity === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-destructive mb-4">
                    Have you experienced any recent unexplained weight loss?
                  </p>
                  <div className="flex gap-3">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData((prev) => ({ ...prev, weightLoss: option }))}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                          formData.weightLoss === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-destructive mb-4">
                    Do you have any chronic health conditions?
                  </p>
                  <div className="flex gap-3">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData((prev) => ({ ...prev, chronicConditions: option }))}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                          formData.chronicConditions === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Submit button */}
        <div className="flex justify-center gap-4 pt-4">
          <Button
            type="submit"
            className="px-8 h-11 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-white font-semibold"
          >
            Submit
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © Copyright <span className="font-semibold text-foreground">Anemia Screening</span>. All Rights Reserved
          </p>
        </div>
      </form>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      >
        <ChevronUp size={24} />
      </button>
    </div>
  )
}
