'use client'

import { useLanguage } from '@/lib/LanguageContext'

type SectionKey = 'lossCalculator' | 'quickActions' | 'overview' | 'batchTable' | 'distributorScore' | 'invoiceUpload' | 'restockAlerts'

export default function SectionLabel({ sectionKey }: { sectionKey: SectionKey }) {
  const { t } = useLanguage()
  return (
    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">
      {t[sectionKey]}
    </p>
  )
}
