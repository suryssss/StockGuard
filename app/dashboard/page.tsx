import { prisma } from '@/lib/prisma'
import { calcAtRisk, calcRecovered, calcLost } from '@/lib/lossCalculator'
import LossCalculator from '@/components/dashboard/LossCalculator'
import BatchTable from '@/components/dashboard/BatchTable'
import DistributorScore from '@/components/dashboard/DistributorScore'
import InvoiceUpload from '@/components/entry/InvoiceUpload'
import BarcodeScanner from '@/components/entry/BarcodeScanner'

const SHOP_ID = process.env.NEXT_PUBLIC_SHOP_ID!

export default async function DashboardPage() {
  const [batches, returnLogs, distributors] = await Promise.all([
    prisma.batch.findMany({
      where: { product: { shopId: SHOP_ID } },
      include: { product: true, distributor: true },
      orderBy: { expiryDate: 'asc' }
    }),
    prisma.returnLog.findMany({
      where: { distributor: { shopId: SHOP_ID } },
      include: { batch: true }
    }),
    prisma.distributor.findMany({
      where: { shopId: SHOP_ID },
      include: { returnLogs: true }
    })
  ])

  const acceptedIds = new Set(returnLogs.filter(r => r.outcome === 'accepted').map(r => r.batchId))
  const today = new Date()

  const lossData = {
    atRisk: Math.round(calcAtRisk(batches)),
    recovered: Math.round(calcRecovered(returnLogs)),
    lost: Math.round(calcLost(batches, acceptedIds)),
    atRiskCount: batches.filter(b => {
      const d = (b.expiryDate.getTime() - today.getTime()) / 86400000
      return d > 0 && d <= 30
    }).length,
  }

  const batchesWithDays = batches.map(b => ({
    ...b,
    daysUntilExpiry: Math.ceil((b.expiryDate.getTime() - today.getTime()) / 86400000)
  }))

  const distData = distributors.map(d => ({
    id: d.id, name: d.name,
    total: d.returnLogs.length,
    accepted: d.returnLogs.filter(r => r.outcome === 'accepted').length,
    rejected: d.returnLogs.filter(r => r.outcome === 'rejected').length,
    hasEscalation: d.returnLogs.filter(r => r.outcome === 'rejected').length >= 2
  }))

  return (
    <main className="min-h-screen bg-gray-50 p-4 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">ExpiryGuard</h1>
        <p className="text-gray-500 text-sm">Ram Medical Store</p>
      </header>

      <LossCalculator data={lossData} />

      <section className="my-6 flex gap-3">
        <BarcodeScanner shopId={SHOP_ID} />
        <InvoiceUpload shopId={SHOP_ID} />
      </section>

      <BatchTable batches={batchesWithDays} />

      <section className="mt-8">
        <h2 className="text-lg font-medium mb-3">Distributors</h2>
        <DistributorScore distributors={distData} />
      </section>
    </main>
  )
}
