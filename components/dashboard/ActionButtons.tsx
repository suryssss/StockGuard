'use client'
import { useState } from 'react'
import BarcodeScanner from '@/components/entry/BarcodeScanner'
import { PlusCircle, MinusCircle, ScanLine, FileText, X } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

interface ActionButtonsProps {
  shopId: string
}

export default function ActionButtons({ shopId }: ActionButtonsProps) {
  const { t } = useLanguage()
  const [activeModal, setActiveModal] = useState<'add' | 'sell' | 'scan' | null>(null)

  const closeModal = () => setActiveModal(null)

  return (
    <>
      <div className="grid grid-cols-3 gap-3 mb-6 stagger-children">
        <button
          onClick={() => setActiveModal('scan')}
          className="group flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-4 rounded-2xl transition-all shadow-lg shadow-orange-200/50 active:scale-[0.97] hover:shadow-orange-300/50"
        >
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
            <ScanLine className="w-6 h-6" />
          </div>
          <span className="font-bold text-xs">{t.scanBarcode}</span>
        </button>
        <button
          onClick={() => setActiveModal('add')}
          className="group flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-4 rounded-2xl transition-all shadow-lg shadow-emerald-200/50 active:scale-[0.97] hover:shadow-emerald-300/50"
        >
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="font-bold text-xs">{t.upload}</span>
        </button>
        <button
          onClick={() => setActiveModal('sell')}
          className="group flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white p-4 rounded-2xl transition-all shadow-lg shadow-violet-200/50 active:scale-[0.97] hover:shadow-violet-300/50"
        >
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
            <MinusCircle className="w-6 h-6" />
          </div>
          <span className="font-bold text-xs">{t.sales}</span>
        </button>
      </div>

      {/* Modal: Scan Product */}
      {activeModal === 'scan' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <button onClick={closeModal} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors z-10">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <ScanLine className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{t.scanBarcode}</h3>
              </div>
            </div>
            <BarcodeScanner shopId={shopId} defaultMode="add" onSuccess={closeModal} />
          </div>
        </div>
      )}

      {/* Modal: Add Manual Stock */}
      {activeModal === 'add' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <button onClick={closeModal} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors z-10">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <PlusCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{t.uploadInvoice}</h3>
              </div>
            </div>
            <BarcodeScanner shopId={shopId} defaultMode="add" disableScanner={true} onSuccess={closeModal} />
          </div>
        </div>
      )}

      {/* Modal: Sell / Remove Stock */}
      {activeModal === 'sell' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <button onClick={closeModal} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors z-10">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <MinusCircle className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{t.sales}</h3>
              </div>
            </div>
            <BarcodeScanner shopId={shopId} defaultMode="sell" onSuccess={closeModal} />
          </div>
        </div>
      )}
    </>
  )
}
