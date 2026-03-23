'use client'
import { useState } from 'react'
import ExpiryBadge from "./ExpiryBadge"
import { MinusCircle, Loader2, Search, Skull, AlertTriangle, Package, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

interface Batch {
  id: string
  product: { name: string }
  batchNumber: string | null
  daysUntilExpiry: number
  quantity: number
  purchasePrice: number | null
  productId: string
  expiryDate?: string
}

interface Props {
  batches: Batch[]
  shopId: string
}

export default function BatchTable({ batches, shopId }: Props) {
  const [sellingId, setSellingId] = useState<string | null>(null)
  const [sellQty, setSellQty] = useState('1')
  const [loading, setLoading] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [expiredOpen, setExpiredOpen] = useState(true)
  const [criticalOpen, setCriticalOpen] = useState(true)

  const handleSell = async (batch: Batch) => {
    const qty = parseInt(sellQty)
    if (!qty || qty < 1) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/remove-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopId,
          productName: batch.product.name,
          productId: batch.productId,
          batchId: batch.id,
          quantity: qty,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setSellingId(null)
      setSellQty('1')
      window.location.reload()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Remove entire expired batch (sell all remaining quantity to clear it)
  const handleRemoveExpired = async (batch: Batch) => {
    setRemovingId(batch.id)
    setError('')
    try {
      const res = await fetch('/api/remove-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopId,
          productName: batch.product.name,
          productId: batch.productId,
          batchId: batch.id,
          quantity: batch.quantity,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to remove')
      window.location.reload()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setRemovingId(null)
    }
  }

  const filtered = batches.filter(b =>
    b.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (b.batchNumber && b.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Three-way split
  const expiredBatches = filtered.filter(b => b.daysUntilExpiry <= 0)
  const criticalBatches = filtered.filter(b => b.daysUntilExpiry > 0 && b.daysUntilExpiry <= 15)
  const activeBatches = filtered.filter(b => b.daysUntilExpiry > 15)

  const totalExpiredValue = expiredBatches.reduce((sum, b) => sum + (b.purchasePrice ? b.quantity * b.purchasePrice : 0), 0)
  const totalCriticalValue = criticalBatches.reduce((sum, b) => sum + (b.purchasePrice ? b.quantity * b.purchasePrice : 0), 0)

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '--'
    return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <div className="space-y-6">
      {/* ═══════════════════════════════════════════════════ */}
      {/* SECTION 1: EXPIRED ITEMS                           */}
      {/* ═══════════════════════════════════════════════════ */}
      {expiredBatches.length > 0 && (
        <div className="bg-white rounded-3xl border-2 border-red-200 shadow-xl shadow-red-100/40 overflow-hidden">
          {/* Header */}
          <button
            onClick={() => setExpiredOpen(!expiredOpen)}
            className="w-full px-6 py-5 bg-gradient-to-r from-red-600 to-red-500 flex items-center gap-4 text-left"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shrink-0">
              <Skull className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-white text-base tracking-tight">
                Expired Items / एक्सपायर्ड सामान
              </h3>
              <p className="text-red-100 text-xs font-medium mt-0.5">
                {expiredBatches.length} batch{expiredBatches.length > 1 ? 'es' : ''} expired
                {totalExpiredValue > 0 && ` · ₹${totalExpiredValue.toLocaleString('en-IN')} at risk`}
              </p>
            </div>
            <span className="bg-white text-red-600 text-sm font-black px-4 py-1.5 rounded-xl shadow-sm shrink-0">
              {expiredBatches.length}
            </span>
            {expiredOpen ? (
              <ChevronUp className="w-5 h-5 text-white/80 shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white/80 shrink-0" />
            )}
          </button>

          {/* Body */}
          {expiredOpen && (
            <div className="p-4 space-y-3 bg-red-50/30">
              {expiredBatches.map(b => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl p-4 border border-red-100 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow"
                >
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                      <p className="font-bold text-slate-900 text-sm truncate">{b.product.name}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 font-medium">
                      <span>Batch: <span className="text-slate-700 font-mono">{b.batchNumber || 'N/A'}</span></span>
                      <span>Qty: <span className="text-slate-700 font-bold">{b.quantity}</span></span>
                      <span>Expired: <span className="text-red-600 font-bold">{Math.abs(b.daysUntilExpiry)} days ago</span></span>
                      {b.purchasePrice && (
                        <span>Loss: <span className="text-red-600 font-bold">₹{(b.quantity * b.purchasePrice).toLocaleString('en-IN')}</span></span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <ExpiryBadge days={b.daysUntilExpiry} />
                    <button
                      onClick={() => handleRemoveExpired(b)}
                      disabled={removingId === b.id}
                      className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 disabled:opacity-50 shadow-sm shadow-red-200"
                    >
                      {removingId === b.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      Remove / हटाएं
                    </button>
                  </div>

                  {error && removingId === b.id && (
                    <p className="text-[10px] text-red-500 font-medium w-full">{error}</p>
                  )}
                </div>
              ))}

              {/* Bulk Action */}
              {expiredBatches.length > 1 && (
                <div className="pt-2 border-t border-red-100 flex items-center justify-between">
                  <p className="text-xs text-red-600 font-bold">
                    💡 Remove all expired items to keep your inventory clean
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════ */}
      {/* SECTION 2: CRITICAL BATCHES (EXPIRING SOON)        */}
      {/* ═══════════════════════════════════════════════════ */}
      {criticalBatches.length > 0 && (
        <div className="bg-white rounded-3xl border-2 border-amber-200 shadow-xl shadow-amber-100/40 overflow-hidden">
          {/* Header */}
          <button
            onClick={() => setCriticalOpen(!criticalOpen)}
            className="w-full px-6 py-5 bg-gradient-to-r from-amber-500 to-orange-500 flex items-center gap-4 text-left"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-white text-base tracking-tight">
                Critical Batches / गंभीर बैच
              </h3>
              <p className="text-amber-100 text-xs font-medium mt-0.5">
                {criticalBatches.length} batch{criticalBatches.length > 1 ? 'es' : ''} expiring within 15 days
                {totalCriticalValue > 0 && ` · ₹${totalCriticalValue.toLocaleString('en-IN')} at risk`}
              </p>
            </div>
            <span className="bg-white text-amber-600 text-sm font-black px-4 py-1.5 rounded-xl shadow-sm shrink-0">
              {criticalBatches.length}
            </span>
            {criticalOpen ? (
              <ChevronUp className="w-5 h-5 text-white/80 shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white/80 shrink-0" />
            )}
          </button>

          {/* Body */}
          {criticalOpen && (
            <div className="p-4 space-y-3 bg-amber-50/30">
              {criticalBatches.map(b => (
                <div key={b.id} className="bg-white rounded-2xl p-4 border border-amber-100 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow">
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                      <p className="font-bold text-slate-900 text-sm truncate">{b.product.name}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 font-medium">
                      <span>Batch: <span className="text-slate-700 font-mono">{b.batchNumber || 'N/A'}</span></span>
                      <span>Qty: <span className="text-slate-700 font-bold">{b.quantity}</span></span>
                      <span>Expires in: <span className="text-amber-600 font-bold">{b.daysUntilExpiry} day{b.daysUntilExpiry > 1 ? 's' : ''}</span></span>
                      {b.purchasePrice && (
                        <span>Value: <span className="text-slate-700 font-bold">₹{(b.quantity * b.purchasePrice).toLocaleString('en-IN')}</span></span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <ExpiryBadge days={b.daysUntilExpiry} />
                    {b.quantity > 0 && (
                      sellingId === b.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            className="w-14 border border-amber-300 rounded-xl px-2 py-2 text-xs font-bold text-center focus:ring-2 focus:ring-amber-200 focus:border-amber-500 outline-none bg-amber-50"
                            value={sellQty}
                            onChange={(e) => setSellQty(e.target.value)}
                            min="1"
                            max={b.quantity}
                          />
                          <button
                            disabled={loading}
                            onClick={() => handleSell(b)}
                            className="bg-amber-500 hover:bg-amber-600 text-white text-xs w-9 h-9 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 shadow-sm font-bold"
                          >
                            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '✓'}
                          </button>
                          <button
                            onClick={() => { setSellingId(null); setError('') }}
                            className="text-slate-400 hover:text-slate-600 text-xs w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setSellingId(b.id); setSellQty('1'); setError('') }}
                          className="flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-bold transition-all bg-orange-50 hover:bg-orange-100 px-4 py-2.5 rounded-xl"
                        >
                          <MinusCircle className="w-3.5 h-3.5" /> Sell / बेचें
                        </button>
                      )
                    )}
                  </div>
                  {error && sellingId === b.id && (
                    <p className="text-[10px] text-red-500 font-medium w-full">{error}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════ */}
      {/* SECTION 3: ACTIVE INVENTORY TABLE                  */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/30 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 shrink-0">
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight">Active Inventory / सक्रिय इन्वेंटरी</h2>
              <p className="text-[11px] text-slate-400 font-medium">{activeBatches.length} active batches</p>
            </div>
          </div>
          <div className="sm:ml-auto relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search product... / खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-300 outline-none w-full sm:w-64 transition-all font-medium"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/80 text-[10px] text-slate-400 font-black uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5">Product / उत्पाद</th>
                <th className="px-5 py-3.5">Batch</th>
                <th className="px-5 py-3.5">Qty</th>
                <th className="px-5 py-3.5">Days Left</th>
                <th className="px-5 py-3.5">Value / मूल्य</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {activeBatches.map((b) => (
                <tr key={b.id} className="hover:bg-orange-50/30 transition-colors group">
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-900">{b.product.name}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-500 font-mono text-xs">{b.batchNumber || "N/A"}</td>
                  <td className="px-5 py-4 text-slate-900 font-black">{b.quantity}</td>
                  <td className="px-5 py-4">
                    <span className={`font-black ${b.daysUntilExpiry <= 30 ? 'text-amber-600' : 'text-slate-600'}`}>
                      {b.daysUntilExpiry}d
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-900 font-bold">
                    {b.purchasePrice ? `₹${(b.quantity * b.purchasePrice).toLocaleString('en-IN')}` : "-"}
                  </td>
                  <td className="px-5 py-4">
                    <ExpiryBadge days={b.daysUntilExpiry} />
                  </td>
                  <td className="px-5 py-4">
                    {b.quantity > 0 && (
                      sellingId === b.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            className="w-14 border border-slate-200 rounded-xl px-2 py-1.5 text-xs font-bold text-center focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none"
                            value={sellQty}
                            onChange={(e) => setSellQty(e.target.value)}
                            min="1"
                            max={b.quantity}
                          />
                          <button
                            disabled={loading}
                            onClick={() => handleSell(b)}
                            className="bg-orange-500 hover:bg-orange-600 text-white text-xs w-8 h-8 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 font-bold"
                          >
                            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : '✓'}
                          </button>
                          <button
                            onClick={() => { setSellingId(null); setError('') }}
                            className="text-slate-400 hover:text-slate-600 text-xs w-8 h-8 rounded-xl flex items-center justify-center hover:bg-slate-100"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setSellingId(b.id); setSellQty('1'); setError('') }}
                          className="flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-bold transition-all hover:bg-orange-50 px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100"
                        >
                          <MinusCircle className="w-3.5 h-3.5" /> Sell
                        </button>
                      )
                    )}
                    {error && sellingId === b.id && (
                      <p className="text-[10px] text-red-500 mt-0.5 font-medium">{error}</p>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                        <Package className="w-7 h-7 text-slate-300" />
                      </div>
                      <div>
                        <p className="text-slate-500 font-bold">No batches found</p>
                        <p className="text-slate-400 text-xs">कोई बैच नहीं मिला</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {filtered.length > 0 && activeBatches.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-slate-500 font-bold text-sm">All batches are either expired or critical</p>
                      <p className="text-slate-400 text-xs">Check the sections above / ऊपर की धाराएँ देखें</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
