interface Props {
  data: { atRisk: number; recovered: number; lost: number; atRiskCount: number }
}

export default function LossCalculator({ data }: Props) {
  const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-xs text-red-500 font-medium uppercase tracking-wide">At Risk</p>
        <p className="text-2xl font-semibold text-red-700 mt-1">{fmt(data.atRisk)}</p>
        <p className="text-xs text-red-400 mt-1">{data.atRiskCount} batches ≤30 days</p>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Recovered</p>
        <p className="text-2xl font-semibold text-green-700 mt-1">{fmt(data.recovered)}</p>
        <p className="text-xs text-green-400 mt-1">This month</p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Lost</p>
        <p className="text-2xl font-semibold text-gray-700 mt-1">{fmt(data.lost)}</p>
        <p className="text-xs text-gray-400 mt-1">To date</p>
      </div>
    </div>
  )
}
