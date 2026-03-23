'use client'

import { useLanguage } from '@/lib/LanguageContext'
import { useProfile } from '@/lib/hooks/useProfile'

import ExportSalesButton from './ExportSalesButton'

export default function DashboardHeader() {
  const { t } = useLanguage()
  const { profile } = useProfile()

  // Get greeting based on time
  const hour = new Date().getHours()
  let greeting = t.goodMorning
  if (hour >= 12 && hour < 17) greeting = t.goodAfternoon
  else if (hour >= 17) greeting = t.goodEvening

  const displayName = profile?.shop_name || profile?.full_name || t.appName

  return (
    <header className="mb-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="ml-12 md:ml-0">
          <p className="text-sm text-gray-500 font-medium">{greeting}, {profile?.full_name?.split(' ')[0] || 'User'} 👋</p>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-1">
            {displayName} <span className="text-orange-500">Dashboard</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1.5 font-medium">{t.lastUpdated}: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div className="flex items-center gap-3">
          <ExportSalesButton />
        </div>
      </div>
    </header>
  )
}
