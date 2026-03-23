'use client'

import { useState } from 'react'
import { Download, Loader2, AlertCircle } from 'lucide-react'

interface Props {
  date?: string // YYYY-MM-DD, defaults to today
}

export default function ExportSalesButton({ date }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleExport = async () => {
    setLoading(true)
    setError('')

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

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handleExport}
        disabled={loading}
        className="flex items-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-900/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {loading ? 'Generating...' : 'Export Daily Excel'}
      </button>

      {error && (
        <div className="flex items-center gap-1.5 text-red-600 text-xs font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </div>
      )}
    </div>
  )
}
