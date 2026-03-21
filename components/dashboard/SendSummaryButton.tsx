'use client'

import { useState } from 'react'
import { MessageCircle, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function SendSummaryButton() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSend = async () => {
    setStatus('sending')
    setMessage('')

    try {
      const res = await fetch('/api/demo/send-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setMessage('Summary sent to WhatsApp! 📱')
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to send summary')
      }
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message || 'Network error')
    }

    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 4000)
  }

  return (
    <button
      onClick={handleSend}
      disabled={status === 'sending'}
      className={`
        flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm
        transition-all active:scale-[0.97] w-full
        ${status === 'success'
          ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-200/50'
          : status === 'error'
            ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-200/50'
            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-200/50 hover:shadow-green-300/50'
        }
        disabled:opacity-60 disabled:cursor-not-allowed
      `}
    >
      {status === 'sending' && <Loader2 className="w-5 h-5 animate-spin" />}
      {status === 'success' && <CheckCircle className="w-5 h-5" />}
      {status === 'error' && <AlertCircle className="w-5 h-5" />}
      {status === 'idle' && <MessageCircle className="w-5 h-5" />}

      {status === 'idle' && `📲 ${t.sendToWhatsApp}`}
      {status === 'sending' && t.generating}
      {status === 'success' && message}
      {status === 'error' && message}
    </button>
  )
}
