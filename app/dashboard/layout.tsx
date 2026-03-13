import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar hidden on very small screens, 64 widths wide */}
      <div className="hidden md:block w-64 shrink-0">
        <Sidebar />
      </div>
      
      {/* Main content expands to fill remaining space */}
      <div className="flex-1 w-full min-w-0">
        {children}
      </div>
    </div>
  )
}
