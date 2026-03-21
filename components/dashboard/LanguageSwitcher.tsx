'use client'

import { Globe } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { LANGUAGES } from '@/lib/translations'

export default function LanguageSwitcher() {
  const { language, setShowLanguageModal } = useLanguage()
  const currentLang = LANGUAGES.find(l => l.code === language)

  return (
    <button
      onClick={() => setShowLanguageModal(true)}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-200 group"
    >
      <div className="w-8 h-8 rounded-lg bg-white/[0.04] group-hover:bg-orange-500/20 flex items-center justify-center transition-all">
        <Globe className="w-4 h-4" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-sm leading-tight">Language</span>
        <span className="text-[9px] text-slate-500 group-hover:text-orange-300/70 leading-tight">
          {currentLang?.nativeName || 'English'}
        </span>
      </div>
      <div className="ml-auto px-1.5 py-0.5 bg-white/[0.06] rounded-md text-[9px] font-bold uppercase text-slate-500">
        {language.toUpperCase()}
      </div>
    </button>
  )
}
