'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { Mail, Lock, Loader2, AlertCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import LanguageModal from '@/components/dashboard/LanguageModal'

export default function LoginPage() {
  const router = useRouter()
  const { t, hasSelectedLanguage, setShowLanguageModal } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password')
      return
    }

    setLoading(true)
    setError('')

    try {
      const supabase = createSupabaseBrowserClient()

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (authError) {
        throw new Error(authError.message)
      }

      if (data.session) {
        // If user hasn't selected a language yet, show the language modal
        if (!hasSelectedLanguage) {
          setLoginSuccess(true)
          setShowLanguageModal(true)
        } else {
          window.location.href = '/dashboard'
        }
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  // When language modal closes after login, redirect to dashboard
  const handleLanguageModalClose = () => {
    if (loginSuccess) {
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex">
      {/* Language Modal */}
      <LanguageModalWrapper onComplete={handleLanguageModalClose} loginSuccess={loginSuccess} />

      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mb-6">
              <ShieldIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-extrabold text-white leading-tight tracking-tight">
              StockGuard
            </h1>
            <p className="text-xl text-orange-100 mt-2 font-medium">{t.appName !== 'StockGuard' ? t.appName : 'स्टॉक गार्ड'}</p>
          </div>
          
          <p className="text-lg text-white/90 leading-relaxed max-w-md">
            {t.appTagline}
          </p>

          <div className="mt-12 flex items-center gap-6">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-white">₹15K+</p>
              <p className="text-xs text-white/60 mt-1">{t.avgSavedYear}</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-extrabold text-white">5 min</p>
              <p className="text-xs text-white/60 mt-1">{t.setupTime}</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-extrabold text-white">WhatsApp</p>
              <p className="text-xs text-white/60 mt-1">{t.alertsOnPhone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-4 shadow-lg shadow-orange-200">
              <ShieldIcon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">StockGuard</h1>
            <p className="text-xs text-gray-400 mt-0.5">{t.appName !== 'StockGuard' ? t.appName : 'स्टॉक गार्ड'}</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/60 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{t.welcomeBack}</h2>
            <p className="text-gray-400 text-sm mb-6">{t.signInSubtitle}</p>

            {error && (
              <div className="bg-red-50 border border-red-200/60 rounded-xl px-4 py-3 mb-5 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.email}</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
                    placeholder={t.emailPlaceholder}
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.password}</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-200/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.signingIn}
                  </>
                ) : (
                  <>
                    {t.signIn}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm">
                {t.noAccount}{' '}
                <Link href="/signup" className="text-orange-600 hover:text-orange-700 font-semibold transition-colors">
                  {t.register}
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-[10px] text-gray-400 mt-4">
            {t.poweredBy}
          </p>
        </div>
      </div>
    </div>
  )
}

// Wrapper component to handle language modal completion
function LanguageModalWrapper({ onComplete, loginSuccess }: { onComplete: () => void; loginSuccess: boolean }) {
  const { showLanguageModal } = useLanguage()
  
  // Watch for modal closing after login
  const [wasShowing, setWasShowing] = useState(false)
  
  if (showLanguageModal && !wasShowing) {
    setWasShowing(true)
  }
  
  if (!showLanguageModal && wasShowing && loginSuccess) {
    // Modal just closed after login
    setTimeout(() => {
      onComplete()
    }, 100)
    setWasShowing(false)
  }

  return <LanguageModal />
}

function ShieldIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-3 5.99-5.11a2 2 0 0 1 2.72-.81C15 1.5 17 3 19 4a1 1 0 0 1 1 1z" />
    </svg>
  )
}
