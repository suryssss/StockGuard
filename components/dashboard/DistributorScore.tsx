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
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-200">
      {distributors.map((d) => {
        let statusIcon = "✅";
        if (d.hasEscalation) statusIcon = "❌";
        else if (d.rejected > 0) statusIcon = "⚠️";

        return (
          <div key={d.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-medium">{d.name}</span>
              <span>{statusIcon}</span>
              <span className="text-gray-500 text-sm">
                {d.accepted}/{d.total}
              </span>
            </div>
            {d.hasEscalation && (
              <button className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded hover:bg-red-100 transistion-colors">
                Escalate
              </button>
            )}
          </div>
        );
      })}
      {distributors.length === 0 && (
        <div className="p-4 text-center text-gray-500 text-sm">
          No distributor return logs recorded.
        </div>
      )}
    </div>
  );
}
