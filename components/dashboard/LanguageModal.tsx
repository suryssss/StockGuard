'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { LANGUAGES, LanguageCode } from '@/lib/translations'
import { Globe, Check, ArrowRight, Sparkles } from 'lucide-react'

export default function LanguageModal() {
  const { language, setLanguage, showLanguageModal, setShowLanguageModal, hasSelectedLanguage } = useLanguage()
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(language)
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (showLanguageModal) {
      setSelectedLang(language)
      // Small delay for mount animation
      requestAnimationFrame(() => {
        setIsVisible(true)
      })
    }
  }, [showLanguageModal, language])

  const handleConfirm = () => {
    setLanguage(selectedLang)
    handleClose()
  }

  const handleClose = () => {
    setIsClosing(true)
    setIsVisible(false)
    setTimeout(() => {
      setShowLanguageModal(false)
      setIsClosing(false)
    }, 300)
  }

  if (!showLanguageModal) return null

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible && !isClosing ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-gray-900/80 backdrop-blur-md"
        onClick={hasSelectedLanguage ? handleClose : undefined}
      />

      {/* Modal */}
      <div 
        className={`relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${
          isVisible && !isClosing
            ? 'translate-y-0 scale-100 opacity-100' 
            : 'translate-y-8 scale-95 opacity-0'
        }`}
      >
        {/* Decorative header gradient */}
        <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 px-8 pt-8 pb-12">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-300/20 rounded-full blur-2xl" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span className="text-xs font-bold text-white/80 uppercase tracking-widest">StockGuard</span>
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Choose Your Language
            </h2>
            <p className="text-sm text-orange-100 mt-1">
              Select your preferred language for the app
            </p>
          </div>
        </div>

        {/* Language grid */}
        <div className="px-6 -mt-6 relative z-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-2 grid grid-cols-2 gap-2">
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLang === lang.code
              const isEnglish = lang.code === 'en'

              return (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className={`relative flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-200 group ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-400 shadow-sm'
                      : 'bg-gray-50/50 border-2 border-transparent hover:bg-orange-50/50 hover:border-orange-200'
                  }`}
                >
                  {/* Language flag/icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all ${
                    isSelected 
                      ? 'bg-orange-500 shadow-md shadow-orange-200' 
                      : 'bg-gray-100 group-hover:bg-orange-100'
                  }`}>
                    {isSelected ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span>{lang.flag}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className={`text-sm font-bold truncate ${
                        isSelected ? 'text-orange-900' : 'text-gray-800'
                      }`}>{lang.name}</p>
                      {isEnglish && (
                        <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 text-[8px] font-bold rounded-full uppercase tracking-wider shrink-0">
                          Default
                        </span>
                      )}
                    </div>
                    <p className={`text-xs truncate ${
                      isSelected ? 'text-orange-600' : 'text-gray-400'
                    }`}>{lang.nativeName}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5">
          <button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-200/50 flex items-center justify-center gap-2 text-sm group"
          >
            <span>
              {LANGUAGES.find(l => l.code === selectedLang)?.greeting || 'Continue'} — Continue
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <p className="text-center text-[11px] text-gray-400 mt-3">
            You can change this later in Settings → Language
          </p>
        </div>
      </div>
    </div>
  )
}
