'use client'
import { useState, useRef } from 'react'
import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser'

interface Props { shopId: string }

export default function BarcodeScanner({ shopId }: Props) {
  const [scanning, setScanning] = useState(false)
  const [productName, setProductName] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ batchNumber: '', expiryDate: '', quantity: '', purchasePrice: '' })
  const [saving, setSaving] = useState(false)
  const [reorderWarning, setReorderWarning] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsRef = useRef<IScannerControls | null>(null)

  const startScan = async () => {
    setScanning(true)
    setReorderWarning(null)
    const reader = new BrowserMultiFormatReader()

    try {
      const devices = await BrowserMultiFormatReader.listVideoInputDevices()
      // Prefer back camera (last device is usually rear camera on mobile)
      const deviceId = devices.length > 1 ? devices[devices.length - 1].deviceId : devices[0]?.deviceId

      // decodeFromVideoDevice returns IScannerControls with a .stop() method
      const controls = await reader.decodeFromVideoDevice(
        deviceId,
        videoRef.current!,
        async (result, err) => {
          if (!result) return // keep scanning until we get a result
          // Stop scanning immediately after first successful read
          controls.stop()
          controlsRef.current = null
          setScanning(false)
          setLoading(true)

          try {
            const res = await fetch(`/api/barcode?code=${result.getText()}`)
            const data = await res.json()
            setProductName(data.productName ?? '')
          } finally {
            setLoading(false)
          }
        }
      )
      controlsRef.current = controls
    } catch (err) {
      console.error('[BarcodeScanner] Camera error:', err)
      setScanning(false)
      alert('Could not access camera. Please allow camera permission and try again.')
    }
  }

  const stopScan = () => {
    controlsRef.current?.stop()
    controlsRef.current = null
    setScanning(false)
  }

  const handleSubmit = async () => {
    if (!productName || !form.expiryDate || !form.quantity) return
    setSaving(true)
    try {
      const res = await fetch('/api/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopId,
          productName,
          batchNumber: form.batchNumber || undefined,
          expiryDate: form.expiryDate,
          quantity: parseInt(form.quantity),
          purchasePrice: form.purchasePrice ? parseFloat(form.purchasePrice) : undefined,
        })
      })
      const data = await res.json()
      if (data.reorderWarning?.block) {
        setReorderWarning(
          `⛔ Reorder Warning: You have ${data.reorderWarning.qty} units expiring in ${data.reorderWarning.daysLeft} days (₹${data.reorderWarning.value} at risk). Don't reorder this product yet.`
        )
      }
      setProductName('')
      setForm({ batchNumber: '', expiryDate: '', quantity: '', purchasePrice: '' })
      // Refresh page data after a short delay
      setTimeout(() => window.location.reload(), reorderWarning ? 2500 : 800)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center gap-3">
      {!scanning && !productName && !loading && (
        <button
          onClick={startScan}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          📷 Scan Barcode
        </button>
      )}

      {loading && (
        <div className="w-full text-center bg-gray-50 border border-gray-200 py-4 font-medium text-gray-500 rounded-lg">
          Looking up product...
        </div>
      )}

      {scanning && (
        <div className="relative w-full">
          <video ref={videoRef} className="w-full rounded-lg h-56 bg-gray-900 object-cover" autoPlay muted playsInline />
          {/* Scan guide overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-28 border-2 border-white/70 rounded-lg" style={{ boxShadow: '0 0 0 9999px rgba(0,0,0,0.45)' }} />
          </div>
          <p className="text-center text-xs text-white absolute bottom-2 left-0 right-0">
            Point camera at barcode
          </p>
          <button
            onClick={stopScan}
            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
          >
            ✕ Cancel
          </button>
        </div>
      )}

      {reorderWarning && (
        <div className="w-full bg-orange-50 border border-orange-300 text-orange-800 text-sm rounded-lg p-3">
          {reorderWarning}
        </div>
      )}

      {productName !== '' && (
        <div className="bg-white border w-full border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Product</label>
            <input
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              placeholder="Enter product name..."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Batch No</label>
              <input
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={form.batchNumber}
                onChange={e => setForm(f => ({ ...f, batchNumber: e.target.value }))}
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Expiry Date *</label>
              <input
                type="date"
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={form.expiryDate}
                onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Quantity *</label>
              <input
                type="number"
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={form.quantity}
                onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
                min="1"
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Price/unit (₹)</label>
              <input
                type="number"
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={form.purchasePrice}
                onChange={e => setForm(f => ({ ...f, purchasePrice: e.target.value }))}
                min="0"
                step="0.5"
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setProductName(''); setForm({ batchNumber: '', expiryDate: '', quantity: '', purchasePrice: '' }) }}
              className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving || !form.expiryDate || !form.quantity}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-white py-2.5 rounded-lg font-medium text-sm shadow-sm"
            >
              {saving ? 'Saving...' : '✓ Save Stock'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
