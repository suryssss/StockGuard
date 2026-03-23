interface Distributor {
  id: string;
  name: string;
  total: number;
  accepted: number;
  rejected: number;
  hasEscalation: boolean;
}

interface Props {
  distributors: Distributor[];
}

export default function DistributorScore({ distributors }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-sm">Distributors</h3>
        <p className="text-xs text-gray-400 mt-0.5">Return reliability score</p>
      </div>
      <div className="divide-y divide-gray-50">
        {distributors.map((d) => {
          const reliability = d.total > 0 ? d.accepted / d.total : 0;
          let statusIcon = "✅";
          let statusBg = "bg-emerald-50";
          let statusText = "text-emerald-700";
          let statusLabel = "Reliable";

          if (d.hasEscalation) {
            statusIcon = "❌";
            statusBg = "bg-red-50";
            statusText = "text-red-700";
            statusLabel = "Issue";
          } else if (d.rejected > 0) {
            statusIcon = "⚠️";
            statusBg = "bg-amber-50";
            statusText = "text-amber-700";
            statusLabel = "Caution";
          }

          return (
            <div key={d.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                  {d.name.charAt(0)}
                </div>
                <div>
                  <span className="text-gray-900 font-semibold text-sm block">{d.name}</span>
                  <span className="text-[11px] text-gray-400">
                    {d.accepted}/{d.total} returns accepted
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Reliability bar */}
                <div className="hidden sm:flex items-center gap-1.5">
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        d.hasEscalation ? 'bg-red-400' : d.rejected > 0 ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                      style={{ width: `${reliability * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">{Math.round(reliability * 100)}%</span>
                </div>

                <span className={`${statusBg} ${statusText} text-[10px] font-bold px-2 py-1 rounded-lg`}>
                  {statusIcon} {statusLabel}
                </span>
                
                {d.hasEscalation && (
                  <button className="text-[10px] font-bold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition-colors border border-red-200">
                    Escalate
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {distributors.length === 0 && (
          <div className="p-8 text-center">
            <span className="text-2xl block mb-2">🤝</span>
            <p className="text-gray-500 text-sm font-medium">No distributors yet</p>
            <p className="text-gray-400 text-xs">No distributors added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
