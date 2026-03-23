'use client'

import { useState } from 'react'
import { Download, Loader2, AlertCircle } from 'lucide-react'

interface Props {
  date?: string // YYYY-MM-DD, defaults to today
}

export default function ExportSalesButton({ date }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [whatsappLoading, setWhatsappLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleExport = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Fetch data from API
      const url = date ? `/api/sales/export?date=${date}` : '/api/sales/export'
      const res = await fetch(url)
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Failed to fetch sales data')
      if (!data.sales || data.sales.length === 0) {
        throw new Error('No sales found for this date')
      }

      // Dynamically import xlsx (client-side only)
      const importedXLSX = await import('xlsx')
      const XLSX = importedXLSX.utils ? importedXLSX : importedXLSX.default

      if (!XLSX || !XLSX.utils) {
        throw new Error('Excel library (xlsx) failed to load correctly.')
      }

      const wb = XLSX.utils.book_new()
      const shopName: string = data.shopName || 'My Shop'
      const reportDate: string = data.reportDate || new Date().toISOString().slice(0, 10)

      // ── Sheet 1: Daily Sales ─────────────────────────────────────
      const sales: any[] = data.sales || []
      const totalQty = sales.reduce((s: number, r: any) => s + (r.quantity || 0), 0)
      const totalValue = sales.reduce(
        (s: number, r: any) => s + (r.quantity || 0) * (r.purchasePrice || 0),
        0
      )

      const sheet1Data: any[][] = [
        // Banner
        ['StockGuard — Daily Sales Report'],
        [`Shop: ${shopName}`, '', `Date: ${reportDate}`],
        [],
        // Headers
        ['#', 'Product Name', 'Batch No.', 'Qty Sold', 'Unit Price (₹)', 'Sale Value (₹)', 'Expiry Date', 'Time'],
        // Rows
        ...sales.map((s: any, i: number) => [
          i + 1,
          s.productName,
          s.batchNumber || 'N/A',
          s.quantity,
          s.purchasePrice ?? '',
          s.purchasePrice ? (s.quantity * s.purchasePrice) : '',
          s.expiryDate ? s.expiryDate.slice(0, 10) : 'N/A',
          s.createdAt ? new Date(s.createdAt).toLocaleTimeString('en-IN') : '',
        ]),
        // Totals
        ['', 'TOTAL', '', totalQty, '', Math.round(totalValue * 100) / 100, '', ''],
      ]

      const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data)

      // Column widths
      ws1['!cols'] = [
        { wch: 4 }, { wch: 28 }, { wch: 14 }, { wch: 10 },
        { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 12 },
      ]
      // Merge banner row A1:H1
      ws1['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }]

      XLSX.utils.book_append_sheet(wb, ws1, 'Daily Sales')

      // ── Sheet 2: 7-Day Trend ─────────────────────────────────────
      const trend: any[] = data.trend7 || []
      const trendTotalItems = trend.reduce((s: number, r: any) => s + (r.itemsSold || 0), 0)

      const sheet2Data: any[][] = [
        ['#', 'Date', 'Items Sold', 'Unique Products'],
        ...trend.map((r: any, i: number) => [i + 1, r.date, r.itemsSold, r.uniqueProducts]),
        ['', 'TOTAL', trendTotalItems, ''],
      ]

      const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data)
      ws2['!cols'] = [{ wch: 4 }, { wch: 14 }, { wch: 12 }, { wch: 16 }]
      XLSX.utils.book_append_sheet(wb, ws2, '7-Day Trend')

      // ── Sheet 3: Product Performance ─────────────────────────────
      const perf: any[] = data.productPerf || []
      const perfTotalSold = perf.reduce((s: number, r: any) => s + (r.totalSold || 0), 0)
      const perfTotalRev = perf.reduce((s: number, r: any) => s + (r.totalRevenue || 0), 0)

      const sheet3Data: any[][] = [
        ['#', 'Product Name', 'Total Sold', 'Total Revenue (₹)', 'Avg Unit Price (₹)', '% of Revenue'],
        ...perf.map((r: any, i: number) => [
          i + 1,
          r.productName,
          r.totalSold,
          r.totalRevenue,
          r.avgUnitPrice,
          r.revenuePercent,
        ]),
        ['', 'TOTAL', perfTotalSold, Math.round(perfTotalRev * 100) / 100, '', '100'],
      ]

      const ws3 = XLSX.utils.aoa_to_sheet(sheet3Data)
      ws3['!cols'] = [{ wch: 4 }, { wch: 28 }, { wch: 12 }, { wch: 18 }, { wch: 18 }, { wch: 14 }]
      XLSX.utils.book_append_sheet(wb, ws3, 'Product Performance')

      // ── Download ─────────────────────────────────────────────────
      const safeName = shopName.replace(/[^a-zA-Z0-9]/g, '_')
      const fileName = `StockGuard_Sales_${safeName}_${reportDate}.xlsx`
      XLSX.writeFile(wb, fileName)

    } catch (err: any) {
      setError(err.message || 'Export failed')
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsApp = async () => {
    setWhatsappLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/sales/export/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'WhatsApp sending failed')
      setSuccess('Excel report sent to WhatsApp! ✅')
      setTimeout(() => setSuccess(''), 5000)
    } catch (err: any) {
      setError(err.message || 'WhatsApp sending failed')
    } finally {
      setWhatsappLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <button
          onClick={handleWhatsApp}
          disabled={whatsappLoading || loading}
          className="flex items-center gap-2.5 bg-green-600 hover:bg-green-700 active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-green-900/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {whatsappLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          )}
          {whatsappLoading ? 'Sending...' : 'WhatsApp'}
        </button>

        <button
          onClick={handleExport}
          disabled={loading || whatsappLoading}
          className="flex items-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-900/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {loading ? 'Generating...' : 'Download'}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-red-600 text-[10px] font-bold uppercase tracking-wider">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-wider animate-bounce">
          {success}
        </div>
      )}
    </div>
  )
}
