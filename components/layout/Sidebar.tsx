'use client'

import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingCart, Users, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Sales', href: '/dashboard/sales', icon: ShoppingCart },
  { name: 'Distributors', href: '/dashboard/distributors', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-slate-900 min-h-screen fixed left-0 top-0 flex flex-col text-slate-300">
      <div className="flex items-center gap-3 px-6 py-8 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
          <ShieldIcon className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">KiranaCare</span>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-900/20'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {item.name}
            </Link>
          )
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-4">
          <p className="text-sm font-medium text-white mb-1">Need help?</p>
          <p className="text-xs text-slate-400">Contact our support team.</p>
        </div>
      </div>
    </div>
  )
}

function ShieldIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-3 5.99-5.11a2 2 0 0 1 2.72-.81C15 1.5 17 3 19 4a1 1 0 0 1 1 1z" />
    </svg>
  )
}
