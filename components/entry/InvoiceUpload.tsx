'use client'
import { useState } from 'react'
import { FileText, Upload, Check, Loader2 } from 'lucide-react'

interface OcrItem {
  productName: string
  batchNumber: string | null
  expiryDate: string | null
  quantity: number | null
  distributorName: string | null
}

interface Props { shopId: string }

export default function InvoiceUpload({ shopId }: Props) {
  const [items, setItems] = useState<OcrItem[]>([])
  const [selected, setSelected] = useState<boolean[]>([])
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleFile = async () => {
    setLoading(true)
    setTimeout(() => {
        setItems([
          {
            productName: "Sample Scanned Product (WIP)",
            batchNumber: "B123",
            expiryDate: "2026-10-10",
            quantity: 50,
            distributorName: "Sharma Pharma"
          }
        ])
        setSelected([true])
        setLoading(false)
    }, 1500)
  }

  const saveAll = async () => {
    const toSave = items.filter((_, i) => selected[i] && items[i].expiryDate)
    for (const item of toSave) {
      await fetch('/api/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopId,
          productName: item.productName,
          batchNumber: item.batchNumber ?? undefined,
          expiryDate: item.expiryDate,
          quantity: item.quantity ?? 0,
          distributorName: item.distributorName ?? undefined,
        })
      })
    }
    setSaved(true)
    setTimeout(() => window.location.reload(), 1000)
  }

  return (
    <div className="flex-1 w-full">
      {!loading && items.length === 0 && (
        <label className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 transition-all shadow-lg shadow-indigo-200/50 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 cursor-pointer active:scale-[0.98]">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="block text-sm">Upload Invoice</span>
            <span className="block text-[10px] text-white/70">Take photo of bill to auto-add stock</span>
          </div>
          <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
        </label>
      )}

      {loading && (
        <div className="text-center bg-white border border-gray-200/60 py-6 rounded-2xl w-full">
          <Loader2 className="w-6 h-6 text-orange-500 animate-spin mx-auto mb-2" />
          <p className="font-semibold text-gray-700 text-sm">Reading invoice...</p>
          <p className="text-xs text-gray-400">Reading invoice...</p>
        </div>
      )}

      {items.length > 0 && !saved && (
        <div className="bg-white border border-gray-200/60 rounded-2xl p-4 w-full shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-indigo-600" />
            <p className="font-bold text-sm text-gray-900">Found {items.length} items</p>
          </div>
          <p className="text-xs text-gray-400 mb-3">Deselect any to skip</p>
          {items.map((item, i) => (
            <label key={i} className="flex items-start gap-3 mb-2 text-sm bg-gray-50 p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-orange-50/30 transition-colors">
              <input type="checkbox" checked={selected[i]}
                className="mt-1 accent-orange-500"
                onChange={e => setSelected(s => s.map((v, j) => j === i ? e.target.checked : v))} />
              <span className="flex-1">
                <strong className="text-gray-900 block text-sm">{item.productName}</strong>
                <span className="text-gray-500 text-xs">
                    {item.batchNumber && `Batch ${item.batchNumber}`}
                    {item.expiryDate && ` • Exp ${item.expiryDate}`}
                    {item.quantity && ` • ${item.quantity} units`}
                </span>
              </span>
            </label>
          ))}
          <button onClick={saveAll} className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-2.5 rounded-xl text-sm font-bold mt-3 shadow-md shadow-emerald-200/50 flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            Save All Selected
          </button>
        </div>
      )}

      {saved && (
        <div className="text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-2xl text-center font-bold py-4 flex items-center justify-center gap-2">
          <Check className="w-5 h-5" />
          Saved! Refreshing...
        </div>
      )}
    </div>
  )
}
