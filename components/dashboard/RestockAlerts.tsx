'use client'

import { useState, useRef, useCallback } from 'react'
import { AlertTriangle, Send, Loader2, CheckCircle, Mic, MicOff, Package } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { useProfile } from '@/lib/hooks/useProfile'

interface RestockProduct {
  name: string
  stock: number
  limit: number
}

interface Props {
  products: RestockProduct[]
}

export default function RestockAlerts({ products }: Props) {
  const { t } = useLanguage()
  const { profile } = useProfile()
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMsg, setStatusMsg] = useState('')
  
  // Voice state
  const [isListening, setIsListening] = useState(false)
  const [voiceText, setVoiceText] = useState('')
  const recognitionRef = useRef<any>(null)

  const handleRestock = useCallback(async () => {
    setSending(true)
    setStatus('idle')
    setStatusMsg('')
    try {
      const res = await fetch('/api/restock/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products,
          shopName: profile?.shop_name || profile?.full_name || 'Shop',
          shopkeeperName: profile?.full_name || 'Owner',
          shopkeeperPhone: profile?.phone_number || '',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setStatus('success')
      setStatusMsg(t.restockSent)
    } catch (err: any) {
      setStatus('error')
      setStatusMsg(err.message || t.restockFailed)
    } finally {
      setSending(false)
      setTimeout(() => {
        setStatus('idle')
        setStatusMsg('')
      }, 5000)
    }
  }, [products, profile, t])

  const toggleVoice = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    // Check for Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setStatusMsg('Speech recognition not supported in this browser')
      setStatus('error')
      setTimeout(() => { setStatus('idle'); setStatusMsg('') }, 3000)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-IN'

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('')
      setVoiceText(transcript)
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }, [isListening])

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-4 mb-6 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-amber-800 text-sm">{t.restockAlerts}</h3>
        </div>
        <span className="ml-auto text-xs font-bold text-amber-700 bg-amber-200/50 px-2 py-0.5 rounded-full">{products.length}</span>
      </div>

      <div className="space-y-2">
        {products.map((p, i) => (
          <div key={i} className="flex items-center justify-between bg-white rounded-xl px-3 py-2.5 border border-amber-100 hover:shadow-sm transition-all">
            <div>
              <span className="font-semibold text-gray-900 text-sm">{p.name}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-gray-500">
                  {t.totalStock}: <span className="font-bold text-amber-700">{p.stock}</span>
                </span>
                <span className="text-[10px] text-gray-400">·</span>
                <span className="text-[10px] text-gray-500">
                  {t.minStock}: <span className="font-bold">{p.limit}</span>
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200/50">
              ⚠️ {t.lowStock}
            </span>
          </div>
        ))}
      </div>

      {/* Restock Action Buttons */}
      <div className="mt-4 pt-3 border-t border-amber-200/50 space-y-3">
        <div className="flex flex-wrap gap-2">
          {/* Restock Button */}
          <button
            onClick={handleRestock}
            disabled={sending}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.97] ${
              status === 'success'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200/50'
                : status === 'error'
                  ? 'bg-red-500 text-white shadow-lg shadow-red-200/50'
                  : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-200/50'
            } disabled:opacity-60`}
          >
            {sending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t.restockSending}
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle className="w-4 h-4" />
                {t.restockSent}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {t.restockItems}
              </>
            )}
          </button>

          {/* Voice Restock Button */}
          <button
            onClick={toggleVoice}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.97] ${
              isListening
                ? 'bg-red-500 text-white shadow-lg shadow-red-200/50 animate-pulse'
                : 'bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg shadow-violet-200/50'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4" />
                {t.restockStopListening}
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                {t.restockVoice}
              </>
            )}
          </button>
        </div>

        {/* Voice Result */}
        {voiceText && (
          <div className="bg-white rounded-xl p-3 border border-violet-100 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-1">
              <Mic className="w-3.5 h-3.5 text-violet-500" />
              <span className="text-[10px] font-bold text-violet-600 uppercase">{t.restockVoice}</span>
            </div>
            <p className="text-sm text-gray-800 font-medium">&quot;{voiceText}&quot;</p>
          </div>
        )}

        {/* Status message */}
        {statusMsg && status !== 'idle' && (
          <div className={`text-xs font-bold rounded-xl px-3 py-2 animate-fade-in-up ${
            status === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
          }`}>
            {statusMsg}
          </div>
        )}
      </div>
    </div>
  )
}
