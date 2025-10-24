"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

export type Language = "en" | "hi" | "bn"

interface LanguageContextType {
  lang: Language
  setLang: (l: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en")
  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    // Fallback to a safe default so components can render during Fast Refresh
    return { lang: "en" as Language, setLang: (_: Language) => {} }
  }
  return ctx
}

// Shared translations used across screening steps
export const translations: Record<string, Record<Language, string>> = {
  stepPatient: { en: "Patient Info", hi: "रोगी जानकारी", bn: "রোগীর তথ্য" },
  stepHealth: { en: "Health & Diet", hi: "स्वास्थ्य और आहार", bn: "স্বাস্থ্য ও খাবার" },
  stepMedical: { en: "Medical History", hi: "चिकित्सा इतिहास", bn: "চিকিৎসা ইতিহাস" },
  stepReview: { en: "Review", hi: "समीक्षा", bn: "পর্যালোচনা" },
  reviewTitle: { en: "Review & Submit", hi: "समीक्षा और सबमिट", bn: "পর্যালোচনা ও জমা দিন" },
  reviewCopy: { en: "Please review all the information you've provided. Once submitted, this screening will be recorded in the system.", hi: "कृपया अपनी सभी जानकारी की समीक्षा करें। एक बार जमा करने के बाद, यह स्क्रीनिंग सिस्टम में रिकॉर्ड हो जाएगी।", bn: "আপনার প্রদানকৃত সব তথ্য পর্যালোচনা করুন। জমা দেওয়ার পরে, এই স্ক্রিনিং সিস্টেমে সংরক্ষিত হবে।" },
  newScreeningTitle: { en: "New Screening", hi: "नई स्क्रीनिंग", bn: "নতুন স্ক্রিনিং" },
  progressLabel: { en: "Progress", hi: "प्रगति", bn: "অগ্রগতি" },
  stepWord: { en: "Step", hi: "कदम", bn: "ধাপ" },
  ofWord: { en: "of", hi: "में से", bn: "এর মধ্যে" },
  previous: { en: "Previous", hi: "पिछला", bn: "পূর্ববর্তী" },
  next: { en: "Next", hi: "अगला", bn: "পরবর্তী" },
  infoAllCollected: { en: "All information has been collected. Click \"Submit Screening\" to complete the process.", hi: "सारी जानकारी एकत्र कर ली गई है। प्रक्रिया पूरी करने के लिए \"स्क्रीनिंग सबमिट करें\" पर क्लिक करें।", bn: "সমস্ত তথ্য সংগ্রহ করা হয়েছে। প্রক্রিয়া সম্পূর্ণ করতে \"স্ক্রিনিং জমা দিন\" ক্লিক করুন।" },
  submitScreening: { en: "Submit Screening", hi: "स्क्रीनिंग सबमिट करें", bn: "স্ক্রিনিং জমা দিন" },
}

export function useT() {
  const { lang } = useLanguage()
  const t = (key: string) => {
    return (translations as any)[key]?.[lang] ?? (translations as any)[key]?.["en"] ?? key
  }
  return t
}
