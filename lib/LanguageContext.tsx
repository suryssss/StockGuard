'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { LanguageCode, translations, TranslationKeys, LANGUAGES } from './translations'

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: TranslationKeys
  showLanguageModal: boolean
  setShowLanguageModal: (show: boolean) => void
  hasSelectedLanguage: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LANGUAGE_STORAGE_KEY = 'stockguard-language'
const LANGUAGE_SELECTED_KEY = 'stockguard-language-selected'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en')
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load saved language preference
    const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode | null
    const hasSelected = localStorage.getItem(LANGUAGE_SELECTED_KEY)

    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang)
    }

    if (!hasSelected) {
      setHasSelectedLanguage(false)
    }

    setMounted(true)
  }, [])

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang)
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    localStorage.setItem(LANGUAGE_SELECTED_KEY, 'true')
    setHasSelectedLanguage(true)
  }, [])

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      showLanguageModal,
      setShowLanguageModal,
      hasSelectedLanguage,
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
