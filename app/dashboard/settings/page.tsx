'use client'

import { useState } from 'react'
import { Bell, Smartphone, Shield, CheckCircle2, AlertCircle, Loader2, Phone, Globe } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { LANGUAGES } from '@/lib/translations'

export default function SettingsPage() {
  const { t, language, setLanguage, setShowLanguageModal } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const [phoneNumber, setPhoneNumber] = useState('')
  const [updatingPhone, setUpdatingPhone] = useState(false)

  const triggerTestAlert = async (type: 'test' | 'report' | 'summary') => {
    setLoading(true)
    setStatus(null)
    try {
      const endpoint = type === 'summary' ? '/api/demo/send-summary' : `/api/cron/expiry-alert?${type}=true`
      const res = await fetch(endpoint, {
        method: type === 'summary' ? 'POST' : 'GET',
        headers: {
          'Authorization': 'Bearer hackathon-secret-123'
        }
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || `API Error: ${res.status}`)
      }
      
      if (data.success) {
        setStatus({ 
          type: 'success', 
          message: `${type === 'test' ? 'Test alert' : 'Expiry report'} sent successfully! Check your phone.` 
        })
      } else {
        throw new Error(data.error || 'Failed to send alert')
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'API request failed' })
    } finally {
      setLoading(false)
    }
  }

  const updatePhone = async () => {
    if (!phoneNumber) return
    setUpdatingPhone(true)
    setStatus(null)
    try {
      const res = await fetch('/api/update-shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsappNum: phoneNumber })
      })
      const data = await res.json()
      if (res.ok) {
        setStatus({ type: 'success', message: 'Phone number updated successfully! Now you can receive alerts.' })
      } else {
        throw new Error(data.error || 'Failed to update phone number')
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Update failed' })
    } finally {
      setUpdatingPhone(false)
    }
  }

  const currentLang = LANGUAGES.find(l => l.code === language)

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <div className="mb-8 font-poppins">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{t.settingsTitle}</h1>
        <p className="text-gray-500">{t.notificationSubtitle}</p>
      </div>

      <div className="space-y-6">
        {/* Language Selection Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">Language / भाषा</h2>
              <p className="text-sm text-gray-500">Choose your preferred app language</p>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-50 rounded-xl flex items-center justify-center text-lg">
                  {currentLang?.flag}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{currentLang?.name}</p>
                  <p className="text-xs text-gray-400">{currentLang?.nativeName}</p>
                </div>
              </div>
              <button
                onClick={() => setShowLanguageModal(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-orange-200/50"
              >
                Change Language
              </button>
            </div>

            {/* Quick language pills */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    language === lang.code
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  {lang.flag} {lang.nativeName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Configuration */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{t.contactDetails}</h2>
              <p className="text-sm text-gray-500">{t.contactSubtitle}</p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.whatsappNumber}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="+919876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-gray-900"
                />
                <button
                  onClick={updatePhone}
                  disabled={updatingPhone || !phoneNumber}
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 transition-all shadow-md shadow-indigo-100"
                >
                  {updatingPhone ? <Loader2 className="w-4 h-4 animate-spin" /> : t.updateNumber}
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2">Always include country code (e.g. +91). Messages will be sent here.</p>
            </div>
          </div>
        </div>

        {/* Twilio Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden text-black">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3 text-black">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-black">{t.notificationSystem}</h2>
              <p className="text-sm text-gray-500">{t.notificationSubtitle}</p>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="p-4 border border-blue-100 bg-blue-50/50 rounded-xl">
              <h3 className="text-sm font-bold text-blue-900 mb-2">{t.verificationTools}</h3>
              <p className="text-xs text-blue-700 mb-4 opacity-80">
                {t.verificationDesc}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => triggerTestAlert('test')}
                  disabled={loading}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-200 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                  {t.sendConnectivityTest}
                </button>

                <button
                  onClick={() => triggerTestAlert('report')}
                  disabled={loading}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-emerald-200 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
                  {t.sendExpiryReport}
                </button>

                <button
                  onClick={() => triggerTestAlert('summary')}
                  disabled={loading}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-indigo-200 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Smartphone className="w-4 h-4" />}
                  {t.sendDailySummary}
                </button>
              </div>

              {status && (
                <div className={`mt-4 p-4 rounded-xl flex items-start gap-3 text-sm animate-in fade-in slide-in-from-top-2 duration-300 ${
                  status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-red-50 text-red-800 border border-red-100'
                }`}>
                  {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                  <div>
                    <p className="font-semibold">{status.type === 'success' ? t.confirmed : t.actionResult}</p>
                    <p className="opacity-90">{status.message}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Section (Demo Only) */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden opacity-60">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{t.securityAccess}</h2>
              <p className="text-sm text-gray-500">{t.securitySubtitle}</p>
            </div>
          </div>
          <div className="p-6">
             <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <p className="text-sm text-gray-700 font-medium">{t.twoFactor}</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full uppercase">{t.enabled}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
