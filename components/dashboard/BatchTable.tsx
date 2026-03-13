import ExpiryBadge from "./ExpiryBadge";

interface Batch {
  id: string;
  product: { name: string };
  batchNumber: string | null;
  daysUntilExpiry: number;
  quantity: number;
  purchasePrice: number | null;
}

interface Props {
  batches: Batch[];
}

export default function BatchTable({ batches }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Batch Inventory</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-medium">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Batch</th>
              <th className="px-4 py-3">Days</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {batches.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{b.product.name}</td>
                <td className="px-4 py-3 text-gray-500">{b.batchNumber || "N/A"}</td>
                <td className="px-4 py-3 text-gray-900">{b.daysUntilExpiry}d</td>
                <td className="px-4 py-3 text-gray-900">
                  {b.purchasePrice ? `₹${(b.quantity * b.purchasePrice).toLocaleString('en-IN')}` : "-"}
                </td>
                <td className="px-4 py-3">
                  <ExpiryBadge days={b.daysUntilExpiry} />
                </td>
              </tr>
            ))}
            {batches.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No batches tracked yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
