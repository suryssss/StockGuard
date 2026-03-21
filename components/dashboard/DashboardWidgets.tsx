'use client'

import { Package, TrendingDown, DollarSign, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

interface DashboardWidgetsProps {
  itemsSoldToday: number
  lowStockCount: number
  restockAlerts: number
  currentInventoryCount: number
}

export default function DashboardWidgets({ 
  itemsSoldToday, 
  lowStockCount, 
  restockAlerts, 
  currentInventoryCount 
}: DashboardWidgetsProps) {
  const { t } = useLanguage()
  
  const widgets = [
    { 
      title: t.totalStock,
      value: currentInventoryCount, 
      icon: <Package className="w-5 h-5 text-orange-600" />, 
      bg: "bg-gradient-to-br from-orange-100 to-amber-50",
      iconBg: "bg-orange-500",
      textColor: "text-orange-900",
      borderColor: "border-orange-200/60"
    },
    { 
      title: t.soldToday,
      value: itemsSoldToday, 
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />, 
      bg: "bg-gradient-to-br from-emerald-100 to-green-50",
      iconBg: "bg-emerald-500",
      textColor: "text-emerald-900",
      borderColor: "border-emerald-200/60"
    },
    { 
      title: t.lowStock,
      value: lowStockCount, 
      icon: <TrendingDown className="w-5 h-5 text-amber-600" />, 
      bg: "bg-gradient-to-br from-amber-100 to-yellow-50",
      iconBg: "bg-amber-500",
      textColor: "text-amber-900",
      borderColor: "border-amber-200/60"
    },
    { 
      title: t.restockAlert,
      value: restockAlerts, 
      icon: <AlertCircle className="w-5 h-5 text-red-600" />, 
      bg: "bg-gradient-to-br from-red-100 to-rose-50",
      iconBg: "bg-red-500",
      textColor: "text-red-900",
      borderColor: "border-red-200/60"
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 stagger-children">
      {widgets.map((widget, i) => (
        <div 
          key={i} 
          className={`relative overflow-hidden ${widget.bg} border ${widget.borderColor} rounded-2xl p-4 hover:shadow-md transition-all duration-300 cursor-default`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 ${widget.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
              <span className="text-white">{widget.icon}</span>
            </div>
          </div>
          <p className={`text-2xl font-extrabold ${widget.textColor} tracking-tight`}>{widget.value}</p>
          <p className="text-[11px] font-semibold text-gray-500 mt-1 leading-tight">{widget.title}</p>
        </div>
      ))}
    </div>
  )
}
