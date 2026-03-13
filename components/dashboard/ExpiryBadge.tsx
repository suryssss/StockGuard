interface Props { days: number }

export default function ExpiryBadge({ days }: Props) {
  if (days <= 7)  return <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">REMOVE NOW</span>
  if (days <= 15) return <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">EXPIRING SOON</span>
  if (days <= 30) return <span className="bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded-full">RETURN NOW</span>
  if (days <= 60) return <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-1 rounded-full">ALERT SOON</span>
  return <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">OK</span>
}
