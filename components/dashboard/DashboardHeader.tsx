'use client'

import { useLanguage } from '@/lib/LanguageContext'

export default function DashboardHeader() {
  const { t } = useLanguage()

  // Get greeting based on time
  const hour = new Date().getHours()
  let greeting = t.goodMorning
  if (hour >= 12 && hour < 17) greeting = t.goodAfternoon
  else if (hour >= 17) greeting = t.goodEvening

  return (
    <header className="mb-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div className="ml-12 md:ml-0">
          <p className="text-sm text-gray-400 font-medium">{greeting} 👋</p>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {t.dashboardTitle}
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">{t.lastUpdated}: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
    </header>
  )
}
