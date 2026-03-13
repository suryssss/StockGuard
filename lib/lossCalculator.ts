export function calcAtRisk(
  batches: Array<{
    expiryDate: Date;
    quantity: number;
    purchasePrice: number | null;
  }>,
): number {
  const today = new Date();
  const cutoff = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  return batches
    .filter(
      (b) => b.expiryDate > today && b.expiryDate <= cutoff && b.purchasePrice,
    )
    .reduce((s, b) => s + b.quantity * (b.purchasePrice ?? 0), 0);
}

export function calcRecovered(
  returnLogs: Array<{
    outcome: string;
    sentAt: Date;
    batch: { quantity: number; purchasePrice: number | null };
  }>,
): number {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  return returnLogs
    .filter(
      (r) =>
        r.outcome === "accepted" && r.sentAt >= start && r.batch.purchasePrice,
    )
    .reduce((s, r) => s + r.batch.quantity * (r.batch.purchasePrice ?? 0), 0);
}

export function calcLost(
  batches: Array<{
    id: string;
    expiryDate: Date;
    quantity: number;
    purchasePrice: number | null;
  }>,
  acceptedBatchIds: Set<string>,
): number {
  const today = new Date();
  return batches
    .filter(
      (b) =>
        b.expiryDate < today && !acceptedBatchIds.has(b.id) && b.purchasePrice,
    )
    .reduce((s, b) => s + b.quantity * (b.purchasePrice ?? 0), 0);
}
