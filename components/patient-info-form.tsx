"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Calendar, Phone, MapPin, Mail } from "lucide-react"

interface PatientFormData {
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  emergencyContact: string
  emergencyPhone: string
}

export function PatientInfoForm() {
  const { lang } = useLanguage()

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      patientInformation: { en: "Patient Information", hi: "रोगी की जानकारी", bn: "রোগীর তথ্য" },
      enterDetails: { en: "Enter your personal and contact details", hi: "अपनी व्यक्तिगत और संपर्क जानकारी दर्ज करें", bn: "আপনার ব্যক্তিগত ও যোগাযোগের বিবরণ লিখুন" },
      personalInformation: { en: "Personal Information", hi: "व्यक्तिगत जानकारी", bn: "ব্যক্তিগত তথ্য" },
      fullName: { en: "Full Name", hi: "पूरा नाम", bn: "পূর্ণ নাম" },
      phone: { en: "Phone", hi: "फ़ोन", bn: "ফোন" },
      gender: { en: "Gender", hi: "लिंग", bn: "লিঙ্গ" },
      address: { en: "Address", hi: "पता", bn: "ঠিকানা" },
      contactInformation: { en: "Contact Information", hi: "संपर्क जानकारी", bn: "যোগাযোগের তথ্য" },
      email: { en: "Email", hi: "ईमेल", bn: "ইমেইল" },
      streetAddress: { en: "Street Address", hi: "सड़क पता", bn: "রাস্তার ঠিকানা" },
      emergencyContact: { en: "Emergency Contact", hi: "आपातकालीन संपर्क", bn: "জরুরি পরিচিতি" },
      saveContinue: { en: "Save & Continue", hi: "सहेजें और जारी रखें", bn: "সংরক্ষণ ও চালিয়ে যান" },
      cancel: { en: "Cancel", hi: "रद्द करें", bn: "বাতিল করুন" },
      selectGender: { en: "Select gender", hi: "লिंग चुनें", bn: "লিঙ্গ নির্বাচন করুন" },
      dateOfBirth: { en: "Date of Birth", hi: "जन्म तिथि", bn: "জন্মতারিখ" },
      city: { en: "City", hi: "शहर", bn: "শহর" },
      state: { en: "State", hi: "राज्य", bn: "রাজ্য" },
      zipCode: { en: "Zip Code", hi: "पिन कोड", bn: "পিন কোড" },
      male: { en: "Male", hi: "पुरुष", bn: "পুরুষ" },
      female: { en: "Female", hi: "महिला", bn: "মহিলা" },
      other: { en: "Other", hi: "अन्य", bn: "অন্যান্য" },
      preferNot: { en: "Prefer not to say", hi: "कहना पसंद नहीं", bn: "বলতে চাই না" },
    }
    return translations[key]?.[lang] ?? translations[key]?.["en"] ?? key
  }

  const [formData, setFormData] = useState<PatientFormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContact: "",
    emergencyPhone: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.gender) newErrors.gender = "Gender is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required"
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = "Emergency contact name is required"
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = "Emergency contact phone is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form submitted:", formData)
      // Handle form submission
    }
  }

  return (
    <Card className="border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <User className="w-5 h-5 text-primary" />
          {t("patientInformation")}
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">{t("enterDetails")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">{t("personalInformation")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("fullName")} <span className="text-destructive">*</span></label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={lang === "hi" ? "जॉन" : lang === "bn" ? "জন" : "John"}
                  className={`h-10 ${errors.firstName ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                />
                {errors.firstName && <p className="text-xs text-red-600 dark:text-red-400">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("fullName")} *</label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={lang === "hi" ? "डो" : lang === "bn" ? "ডো" : "Doe"}
                  className={`h-10 ${errors.lastName ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                />
                {errors.lastName && <p className="text-xs text-red-600 dark:text-red-400">{errors.lastName}</p>}
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {t("dateOfBirth")} *
                </label>
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`h-10 ${errors.dateOfBirth ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                />
                {errors.dateOfBirth && <p className="text-xs text-red-600 dark:text-red-400">{errors.dateOfBirth}</p>}
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("gender")} *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ${
                    errors.gender ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <option value="">{t("selectGender")}</option>
                  <option value="male">{t("male")}</option>
                  <option value="female">{t("female")}</option>
                  <option value="other">{t("other")}</option>
                  <option value="prefer-not-to-say">{t("preferNot")}</option>
                </select>
                {errors.gender && <p className="text-xs text-red-600 dark:text-red-400">{errors.gender}</p>}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">{t("contactInformation")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t("email")} *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`h-10 ${errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                />
                {errors.email && <p className="text-xs text-red-600 dark:text-red-400">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {t("phone")} *
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className={`h-10 ${errors.phone ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                />
                {errors.phone && <p className="text-xs text-red-600 dark:text-red-400">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">{t("address")}</h3>
            <div className="space-y-4">
              {/* Street Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {t("streetAddress")} *
                </label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  className={`h-10 ${errors.address ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                />
                {errors.address && <p className="text-xs text-red-600 dark:text-red-400">{errors.address}</p>}
              </div>

              {/* City, State, Zip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("city")} *</label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className={`h-10 ${errors.city ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                  />
                  {errors.city && <p className="text-xs text-red-600 dark:text-red-400">{errors.city}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("state")} *</label>
                  <Input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="NY"
                    className={`h-10 ${errors.state ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                  />
                  {errors.state && <p className="text-xs text-red-600 dark:text-red-400">{errors.state}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("zipCode")} *</label>
                  <Input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="10001"
                    className={`h-10 ${errors.zipCode ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                  />
                  {errors.zipCode && <p className="text-xs text-red-600 dark:text-red-400">{errors.zipCode}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">{t("emergencyContact")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Emergency Contact Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("fullName")} *</label>
                <Input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder={lang === "hi" ? "जेन डो" : lang === "bn" ? "জেন ডো" : "Jane Doe"}
                  className={`h-10 ${errors.emergencyContact ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                />
                {errors.emergencyContact && <p className="text-xs text-red-600 dark:text-red-400">{errors.emergencyContact}</p>}
              </div>

              {/* Emergency Contact Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t("phone")} *</label>
                <Input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  placeholder="(555) 987-6543"
                  className={`h-10 ${errors.emergencyPhone ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                />
                {errors.emergencyPhone && <p className="text-xs text-red-600 dark:text-red-400">{errors.emergencyPhone}</p>}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button type="submit" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg">
              {t("saveContinue")}
            </Button>
            <Button type="button" variant="outline" className="border-slate-200 dark:border-slate-600 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
              {t("cancel")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
