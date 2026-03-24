'use client'

import { useState, useMemo } from 'react'
import { Package, Search, ChevronDown, ChevronUp, AlertTriangle, Clock, Box, IndianRupee, Layers } from 'lucide-react'

interface BatchInfo {
  id: string
  batchNumber: string | null
  expiryDate: string
  quantity: number
  purchasePrice: number | null
  daysUntilExpiry: number
}

interface ProductData {
  id: string
  name: string
  totalQty: number
  totalValue: number
  batchCount: number
  expiredBatchCount: number
  daysUntilExpiry: number | null
  earliestExpiryDate: string | null
  batches: BatchInfo[]
}

interface Props {
  products: ProductData[]
  shopId: string
}

function getStatusInfo(daysUntilExpiry: number | null) {
  if (daysUntilExpiry === null) return { label: 'No Batches', color: 'text-slate-400', bg: 'bg-slate-50 dark:bg-slate-900/40', border: 'border-slate-200 dark:border-slate-800', dot: 'bg-slate-300' }
  if (daysUntilExpiry <= 0) return { label: 'EXPIRED', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' }
  if (daysUntilExpiry <= 7) return { label: 'REMOVE NOW', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' }
  if (daysUntilExpiry <= 15) return { label: 'EXPIRING SOON', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-400' }
  if (daysUntilExpiry <= 30) return { label: 'RETURN NOW', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' }
  if (daysUntilExpiry <= 60) return { label: 'ALERT SOON', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-400' }
  return { label: 'OK', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500' }
}

function getBatchStatus(days: number) {
  if (days <= 0) return { label: 'EXPIRED', color: 'text-red-600 bg-red-50 border-red-200' }
  if (days <= 7) return { label: 'REMOVE NOW', color: 'text-red-600 bg-red-50 border-red-200' }
  if (days <= 15) return { label: 'EXPIRING SOON', color: 'text-red-500 bg-red-50 border-red-200' }
  if (days <= 30) return { label: 'RETURN NOW', color: 'text-amber-600 bg-amber-50 border-amber-200' }
  if (days <= 60) return { label: 'ALERT SOON', color: 'text-amber-500 bg-amber-50 border-amber-200' }
  return { label: 'OK', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' }
}

export default function ProductsList({ products, shopId }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'qty' | 'expiry' | 'value'>('name')

  const filtered = useMemo(() => {
    let result = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    result.sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name)
        case 'qty': return b.totalQty - a.totalQty
        case 'value': return b.totalValue - a.totalValue
        case 'expiry':
          if (a.daysUntilExpiry === null) return 1
          if (b.daysUntilExpiry === null) return -1
          return a.daysUntilExpiry - b.daysUntilExpiry
        default: return 0
      }
    })

    return result
  }, [products, searchTerm, sortBy])

  const totalProducts = products.length
  const totalStock = products.reduce((s, p) => s + p.totalQty, 0)
  const totalValue = products.reduce((s, p) => s + p.totalValue, 0)
  const productsWithExpired = products.filter(p => p.expiredBatchCount > 0).length

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="ml-12 md:ml-0">
        <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
          Products <span className="text-orange-500">Inventory</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1 font-medium">
          {totalProducts} products · {totalStock} total units · ₹{totalValue.toLocaleString('en-IN')} total value
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-card rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
              <Package className="w-4 h-4 text-orange-500" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Products</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{totalProducts}</p>
        </div>

        <div className="bg-white dark:bg-card rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
              <Box className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Stock</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{totalStock.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-white dark:bg-card rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center border border-violet-100">
              <IndianRupee className="w-4 h-4 text-violet-500" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Value</span>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-slate-100">₹{totalValue.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-white dark:bg-card rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center border border-red-100">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Has Expired</span>
          </div>
          <p className="text-2xl font-black text-red-600">{productsWithExpired}</p>
        </div>
      </div>

      {/* Search & Sort */}
      <div className="bg-white dark:bg-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-300 outline-none w-full transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider whitespace-nowrap">Sort by:</span>
            {(['name', 'qty', 'expiry', 'value'] as const).map(key => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`text-[11px] font-bold px-3 py-2 rounded-xl transition-all ${
                  sortBy === key
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-900/40 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {key === 'name' ? 'Name' : key === 'qty' ? 'Quantity' : key === 'expiry' ? 'Expiry' : 'Value'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-3">
        {filtered.map(product => {
          const status = getStatusInfo(product.daysUntilExpiry)
          const isExpanded = expandedId === product.id

          return (
            <div
              key={product.id}
              className="bg-white dark:bg-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all hover:shadow-md"
            >
              {/* Product Row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : product.id)}
                className="w-full px-5 py-4 flex items-center gap-4 text-left"
              >
                {/* Status dot */}
                <div className={`w-3 h-3 rounded-full shrink-0 ${status.dot} ${product.daysUntilExpiry !== null && product.daysUntilExpiry <= 15 ? 'animate-pulse' : ''}`} />

                {/* Product info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 dark:text-slate-100 text-sm truncate">{product.name}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-[11px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      {product.batchCount} batch{product.batchCount !== 1 ? 'es' : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <Box className="w-3 h-3" />
                      {product.totalQty} units
                    </span>
                    {product.totalValue > 0 && (
                      <span className="flex items-center gap-1">
                        <IndianRupee className="w-3 h-3" />
                        ₹{product.totalValue.toLocaleString('en-IN')}
                      </span>
                    )}
                    {product.daysUntilExpiry !== null && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {product.daysUntilExpiry <= 0
                          ? `Expired ${Math.abs(product.daysUntilExpiry)}d ago`
                          : `${product.daysUntilExpiry}d to expiry`
                        }
                      </span>
                    )}
                  </div>
                </div>

                {/* Status badge */}
                <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl border shrink-0 ${status.color} ${status.bg} ${status.border}`}>
                  {status.label}
                </span>

                {/* Expired count warning */}
                {product.expiredBatchCount > 0 && (
                  <span className="text-[10px] font-black px-2.5 py-1.5 rounded-xl bg-red-600 text-white shrink-0">
                    {product.expiredBatchCount} expired
                  </span>
                )}

                {/* Expand icon */}
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {/* Expanded: Batch Details */}
              {isExpanded && product.batches.length > 0 && (
                <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40/50">
                  <div className="px-5 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Batch Details — {product.batches.length} batch{product.batches.length !== 1 ? 'es' : ''}
                    </p>
                    <div className="space-y-2">
                      {product.batches.map(batch => {
                        const batchStatus = getBatchStatus(batch.daysUntilExpiry)
                        return (
                          <div
                            key={batch.id}
                            className="bg-white dark:bg-card rounded-xl p-3.5 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center gap-3"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 font-medium">
                                <span>
                                  Batch: <span className="text-slate-700 dark:text-slate-300 font-mono font-bold">{batch.batchNumber || 'N/A'}</span>
                                </span>
                                <span>
                                  Qty: <span className="text-slate-700 dark:text-slate-300 font-bold">{batch.quantity}</span>
                                </span>
                                <span>
                                  Expiry: <span className="text-slate-700 dark:text-slate-300 font-bold">
                                    {batch.expiryDate ? new Date(batch.expiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                                  </span>
                                </span>
                                {batch.purchasePrice && (
                                  <span>
                                    Value: <span className="text-slate-700 dark:text-slate-300 font-bold">₹{(batch.quantity * batch.purchasePrice).toLocaleString('en-IN')}</span>
                                  </span>
                                )}
                                <span>
                                  {batch.daysUntilExpiry <= 0
                                    ? <span className="text-red-600 font-bold">Expired {Math.abs(batch.daysUntilExpiry)}d ago</span>
                                    : <span className={batch.daysUntilExpiry <= 15 ? 'text-amber-600 font-bold' : 'text-slate-600 dark:text-slate-400'}>{batch.daysUntilExpiry}d left</span>
                                  }
                                </span>
                              </div>
                            </div>
                            <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg border shrink-0 ${batchStatus.color}`}>
                              {batchStatus.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Expanded: No batches */}
              {isExpanded && product.batches.length === 0 && (
                <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40/50 px-5 py-8 text-center">
                  <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400 font-medium">No batches found for this product</p>
                </div>
              )}
            </div>
          )
        })}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="bg-white dark:bg-card rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm px-5 py-16 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900/40 rounded-2xl flex items-center justify-center">
                <Package className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-bold">
                {searchTerm ? 'No products match your search' : 'No products found'}
              </p>
              <p className="text-slate-400 text-sm">
                {searchTerm ? 'Try a different search term' : 'Add products from the dashboard to get started'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
