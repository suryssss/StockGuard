'use client'

import { AlertTriangle } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

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
                  Min: <span className="font-bold">{p.limit}</span>
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200/50">
              ⚠️ {t.lowStock}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
