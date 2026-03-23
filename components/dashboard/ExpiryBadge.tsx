'use client'

import { useLanguage } from '@/lib/LanguageContext'

interface Props { days: number }

export default function ExpiryBadge({ days }: Props) {
  const { t } = useLanguage()

  if (days <= 0) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm animate-pulse">
        <span className="w-1.5 h-1.5 bg-white rounded-full" />
        {t.expiredBadge}
      </span>
    )
  }

  if (days <= 7) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm animate-pulse">
        <span className="w-1.5 h-1.5 bg-white rounded-full" />
        {t.removeNow}
      </span>
    )
  }
  
  if (days <= 15) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-red-100 border border-red-200 text-red-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
        {t.expiringSoon}
      </span>
    )
  }

  if (days <= 30) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-amber-100 border border-amber-200 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
        {t.returnNow}
      </span>
    )
  }

  if (days <= 60) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
        {t.alertSoon}
      </span>
    )
  }
  
  return (
    <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
      {t.safeBadge}
    </span>
  )
}
